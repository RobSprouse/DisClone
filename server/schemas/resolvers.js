// COMMENT: imports the required modules
import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server-express";
import { User } from "../models/models.js";
import { signToken } from "../utils/auth.js";

// COMMENT: defines the resolvers
export const resolvers = {
     Mutation: {
          // COMMENT: login resolver, takes in the username and password and returns the access and refresh tokens
          login: async (_, { username, password }, { res }) => {
               const user = await User.findOne({ username });
               if (!user) {
                    throw new UserInputError("Invalid username or password");
               }

               const valid = await bcrypt.compare(password, user.password);
               if (!valid) {
                    throw new UserInputError("Invalid username or password");
               }

               const { accessToken, refreshToken } = signToken(user, res);
               return { accessToken, refreshToken };
          },
          // COMMENT: signup resolver, takes in the username, email, and password and returns the access and refresh tokens
          signup: async (_, { username, email, password }, { res }) => {
               const user = await User.create({ username, email, password: await bcrypt.hash(password, 10) });
               const { accessToken, refreshToken } = signToken(user, res);
               return { accessToken, refreshToken };
          },
     },
};
