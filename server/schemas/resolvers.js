// COMMENT: imports the required modules
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { Channel, Conversation, User, Message } from "../models/models.js";
import { signToken, verifyToken } from "../utils/auth.js";

const auth = (fn) => async (parent, args, context, info) => {
     /* FIXME: uncomment to implement authentication
           if (!context.accessToken) {
                throw new AuthenticationError("Not Authenticated");
           }
           const validToken = verifyToken(context.accessToken);
           if (!validToken) {
                throw new AuthenticationError("Invalid token");
           }
       */
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
               const messages = await Message.find({ [key]: id }).populate("user");
               const data = await Model.findById(id);
           
               // Log usernames from messages
               messages.forEach((message) => {
                   console.log("Username:", message.user.username);
               });
           
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
               /* FIXME: uncomment to implement authentication
                     const valid = user && (await bcrypt.compare(password, user.password));
      
                     if (!user || !valid) {
                          throw new UserInputError("Invalid username or password");
                     } */
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
          addChannel: auth(async (_, { name }) => {
               const channel = await Channel.create({ name });
               const user = await User.findById(channel.moderator);
               user.channels.push(channel._id);
               await user.save();
               return channel;
          }),
     },
};

export default resolvers;
