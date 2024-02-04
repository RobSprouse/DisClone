// COMMENT: imports the gql tagged template function from the apollo-server-express package
import { gql } from "apollo-server-express";

// COMMENT: defines the typeDefs and exports them
const typeDefs = gql`
     type Query {
          user: User
          getUsers: [User]
     }

     type User {
          _id: ID
          username: String!
          email: String!
          password: String!
          firstName: String!
          lastName: String!
          image: String
     }

     type DirectMessage {
          id: ID!
          text: String!
          userId: ID!
          recipientId: ID!
          timestamp: String!
     }

     type Message {
          id: ID!
          text: String!
          userId: ID!
          channelId: ID!
          timestamp: String!
     }

     type Channel {
          id: ID!
          name: String!
          messages: [Message!]!
          members: [User!]!
          image: String
     }

     type Conversation {
          id: ID!
          name: String!
          members: [User!]!
          messages: [Message!]!
     }

     type Auth {
          accessToken: String
          refreshToken: String
     }

     type Mutation {
          login(username: String!, password: String!): Auth
          signup(
               username: String!
               email: String!
               password: String!
               firstName: String!
               lastName: String!
               image: String
          ): Auth
          sendMessage(text: String!, userId: ID!, channelId: ID!): Message!
          createChannel(name: String!): Channel!
          sendDirectMessage(text: String!, userId: ID!, recipientId: ID!): DirectMessage!
          joinChannel(userId: ID!, channelId: ID!): User!
          createConversation(name: String!): Conversation!
     }
`;

export default typeDefs;
