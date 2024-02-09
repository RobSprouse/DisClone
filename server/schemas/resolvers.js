// COMMENT: imports the required modules
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { Channel, Conversation, User, Message } from "../models/models.js";
import { signToken, verifyToken } from "../utils/auth.js";

const auth = (fn) => async (_, args, context, info) => {
     if (!context.accessToken) {
          throw new AuthenticationError("Not Authenticated");
     }
     const validToken = verifyToken(context.accessToken);
     if (!validToken) {
          throw new AuthenticationError("Invalid token");
     }

     return fn(_, args, context, info);
};

// COMMENT: defines the resolvers
const resolvers = {
     Query: {
          user: auth(async (_, args, { __, payLoad }) => {
               const userId = payLoad.data._id;
               const userData = await User.findById(userId)
                    .populate({
                         path: "channels",
                         model: "Channel",
                    })
                    .populate({
                         path: "conversations",
                         model: "Conversation",
                         populate: {
                              path: "members",
                              model: "User",
                         },
                    });
               return userData;
          }),
          getUsers: auth(async (_, __, { res, }) => {
               const users = await User.find();
               return users;
          }),
          getAllUsers: auth(async (_, __, { res }) => {
               const users = await User.find();
               return { users };
          }),
          getAllChannels: auth(async (_, __, { res }) => {
               const channels = await Channel.find();
               return { channels };
          }),
     },
     Mutation: {
          // COMMENT: login resolver, takes in the username and password and returns the access and refresh tokens
          login: async (_, { username, password }, { res }) => {
               const user = await User.findOne({ username });
               // const valid = user && (await bcrypt.compare(password, user.password));

               // if (!user || !valid) {
               //      throw new UserInputError("Invalid username or password");
               // }
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
               res.clearCookie("refresh_token", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
               });
               res.clearCookie("access_token", {
                    httpOnly: false, // make it accessible from JavaScript
                    secure: process.env.NODE_ENV === "production", // use HTTPS in production
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-origin, 'lax' for same-origin
               });
               // console.log("Refresh and access tokens cleared from cookies");
               return true;
          },
     },
};

export default resolvers;