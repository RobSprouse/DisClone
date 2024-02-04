// COMMENT: imports the required modules
import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server-express";
import { Channel, Conversation, User, Message } from "../models/models.js";
import { signToken } from "../utils/auth.js";

// COMMENT: defines the resolvers
const resolvers = {
     Query: {
          user: async (_, __, { user }) => {
               const userId = user._id;
               const userData = await User.findById(userId).populate("channelsData").populate("conversationsData");
               return userData;
          },
          getUsers: async (_, __, { user }) => {
               const users = await User.find({ _id: { $ne: user._id } }).select("_id username");
               return users;
          },
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
          createChannel: async (_, { name, image }, { user, res }) => {
               const channel = await Channel.create({
                    name,
                    image,
                    members: [user.id],
                    moderator: user.id,
               });

               await User.findByIdAndUpdate(user.id, {
                    $push: { channels: channel.id },
               });

               // COMMENT: Get the new access token from res.locals
               const newAccessToken = res.locals.newAccessToken;

               // COMMENT: Return the new access token along with the channel data
               return {
                    channel,
                    accessToken: newAccessToken,
               };
          },
          createConversation: async (_, { name }, { user, res }) => {
               const conversation = await Conversation.create({
                    name,
                    members: [user.id],
               });

               await User.findByIdAndUpdate(user.id, {
                    $push: { conversations: conversation.id },
               });

               const newAccessToken = res.locals.newAccessToken;

               return {
                    conversation,
                    accessToken: newAccessToken,
               };
          },

          sendMessage: async (_, { channelId, text }, { user }) => {
               const message = await Message.create({
                    text,
                    userId: user.id,
                    channelId,
               });
               return message;
          },
     },
};

export default resolvers;
