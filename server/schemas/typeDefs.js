// COMMENT: imports the gql tagged template function from the apollo-server-express package
import { gql } from "apollo-server-express";

// COMMENT: defines the typeDefs and exports them
const typeDefs = gql`
     type User {
          _id: ID!
          username: String!
          email: String!
          firstName: String!
          lastName: String!
          image: String!
          channels: [Channel!]!
          conversations: [Conversation!]!
     }

     type UsersResponse {
          users: [User!]!
          accessToken: String!
     }

     type Message {
          _id: ID!
          text: String!
          user: User!
          channel: Channel!
          timestamp: String!
     }

     type MessageData {
          messages: [Message!]!
          accessToken: String!
     }

     type Channel {
          _id: ID!
          name: String!
          image: String!
          members: [User!]!
          moderator: User!
     }

     type ChannelData {
          channels: [Channel!]!
          accessToken: String!
     }

     type ChannelResponse {
          channel: Channel!
          accessToken: String!
     }

     type Conversation {
          _id: ID!
          members: [User!]!
          messages: [Message!]!
     }

     type ConversationData {
          conversations: [Conversation!]!
          accessToken: String!
     }

     type Query {
          user: User!
          getUsers: UsersResponse!
          getAllChannels: ChannelData!
          getChannels: ChannelData!
          getAllConversations: ConversationData!
          getConversations: ConversationData!
          getChannelMessages(channelId: ID!): MessageData!
          getConversationMessages(conversationId: ID!): MessageData!
     }

     type Auth {
          accessToken: String
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
          logout: Boolean!
          createChannel(name: String!, image: String): ChannelResponse!
          createConversation(recipientId: ID!): ConversationData!
          addToConversation(conversationId: ID!, recipientId: ID!): ConversationData!
          sendChannelMessage(channelId: ID!, text: String!): MessageData!
          sendConversationMessage(conversationId: ID!, text: String!): MessageData!
     }
`;

export default typeDefs;
