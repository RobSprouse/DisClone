// COMMENT: imports the gql tagged template function from the apollo-server-express package
import { gql } from "apollo-server-express";

// COMMENT: defines the typeDefs and exports them
export const typeDefs = gql`
     type User {
          _id: ID!
          username: String!
          email: String!
     }

     type Auth {
          accessToken: String
          refreshToken: String
     }

     type Mutation {
          login(username: String!, password: String!): Auth
          signup(username: String!, email: String!, password: String!): Auth
     }
`;

