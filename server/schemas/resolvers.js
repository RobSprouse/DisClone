// COMMENT: imports the required modules
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { Channel, Conversation, User, Message } from "../models/models.js";
import { signToken, verifyToken } from "../utils/auth.js";
import { withFilter, PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const auth = (fn) => async (parent, args, context, info) => {
     if (!context.accessToken) {
          throw new AuthenticationError("Not Authenticated");
     }
     const validToken = verifyToken(context.accessToken);
     if (!validToken) {
          throw new AuthenticationError("Invalid token");
     }

     return fn(parent, args, context, info);
};

// COMMENT: defines the resolvers
const resolvers = {
     ChannelOrConversation: {
          __resolveType(obj) {
               if (obj.name) {
                    return "Channel";
               }

               if (obj.members) {
                    return "Conversation";
               }

               return null;
          },
     },
     Query: {
          refreshToken: (_, __, { req, res }) => {
               return;
          },

          user: auth(async (_, __, { payLoad }) => {
               return await User.findById(payLoad.data._id)
                    .populate("channels")
                    .populate({
                         path: "conversations",
                         populate: { path: "members" },
                    });
          }),
          getAllUsers: auth(async () => await User.find()),
          getAllChannels: auth(async () => await Channel.find()),
          getMessages: auth(async (_, { id, type }) => {
               const key = type === "channel" ? "channelId" : "conversationId";
               const Model = type === "channel" ? Channel : Conversation;
               const messages = await Message.find({ [key]: id })
                    .populate("user")
                    .sort("timestamp");
               const data = await Model.findById(id);
               return {
                    messages,
                    data,
               };
          }),
     },
     Mutation: {
          // COMMENT: login resolver, takes in the username and password and returns the access and refresh tokens
          login: async (_, { username, password }, { res }) => {
               const user = await User.findOne({ username });
               const valid = user && (await bcrypt.compare(password, user.password));
               if (!user || !valid) {
                    throw new UserInputError("Invalid username or password");
               }
               const { accessToken } = signToken(user, res);
               return { accessToken };
          },
          // COMMENT: signup resolver, takes in the username, email, and password and returns the access and refresh tokens
          signup: async (_, { username, email, password, firstName, lastName, image }, { res }) => {
               const user = await User.create({ username, email, password, firstName, lastName, image });
               const { accessToken } = signToken(user, res);
               return { accessToken };
          },
          logout: (_, __, { res }) => {
               const options = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
               };
               res.clearCookie("refresh_token", options);
               res.clearCookie("access_token", options);
               // console.log("Refresh and access tokens cleared from cookies");
               return true;
          },
          addChannel: auth(async (_, { name, image }, { payLoad }) => {
               const channel = await Channel.create({ name, image });
               channel.members.push(payLoad.data._id);
               await channel.save();
               return channel;
          }),
          // TODO: mutation to add a message to the conversation or channel
          addMessage: auth(async (_, { text, id, type }, { payLoad }) => {
               const key = type === "channel" ? "channelId" : "conversationId";
               const Model = type === "channel" ? Channel : Conversation;
               const message = await Message.create({ text, [key]: id, userId: payLoad.data._id });
               const populatedMessage = await Message.findById(message._id).populate("user");
               await Model.findByIdAndUpdate(id, { $push: { messages: message._id } });
               try {
                    // Include the id in the payload when you publish the event
                    pubsub.publish("MESSAGE_ADDED", { messageAdded: { ...populatedMessage._doc, [key]: id } });
               } catch (error) {
                    console.error("Error publishing message:", error);
               }
               return populatedMessage;
          }),
          addChannelMember: auth(async (_, { channelId }, { payLoad }) => {
               const userId = payLoad.data._id;
               const channel = await Channel.findById(channelId);
               channel.members.push(userId);
               await channel.save();
               return channel;
          }),
     },
     Subscription: {
          messageAdded: {
               subscribe: withFilter(
                    () => pubsub.asyncIterator("MESSAGE_ADDED"),
                    (payload, variables) => {
                         const shouldSendUpdate =
                              (variables.channelId &&
                                   payload.messageAdded.channelId.toString() === variables.channelId) ||
                              (variables.conversationId &&
                                   payload.messageAdded.conversationId.toString() === variables.conversationId);

                         if (shouldSendUpdate) {
                              console.log(
                                   "Sending MESSAGE_ADDED update with payload:",
                                   payload,
                                   "and variables:",
                                   variables,
                              );
                         }

                         return shouldSendUpdate;
                    },
               ),
          },
     },
};

export default resolvers;
export { pubsub };
