// COMMENT: imports the gql tagged template function from the apollo-server-express package
import { gql } from "apollo-server-express";

// COMMENT: defines the typeDefs and exports them
const typeDefs = gql`
     type User {
          _id: ID!
          username: String
          email: String
          firstName: String
          lastName: String
          image: String
          channels: [Channel!]
          conversations: [Conversation!]
     }

     type UsersResponse {
          users: [User!]!
     }

     type Message {
          _id: ID!
          text: String!
          user: User!
          timestamp: String!
          updatedAt: String!
          channelId: ID
          conversationId: ID
     }

     union ChannelOrConversation = Channel | Conversation

     type MessagesResponse {
          messages: [Message!]!
          data: ChannelOrConversation
     }

     type Channel {
          _id: ID!
          name: String
          image: String
          members: [User]
          moderator: User
     }

     type Conversation {
          _id: ID!
          members: [User!]!
          messages: [Message!]!
     }

     type Query {
          user: User!
          getAllUsers: [User!]!
          getAllChannels: [Channel!]!
          getMessages(id: ID!, type: String!): MessagesResponse!
          refreshToken: Auth
     }

     type Auth {
          accessToken: String!
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
          addChannel(name: String!, image: String): Channel
          addMessage(text: String!, id: ID!, type: String!): Message!
          addChannelMember(channelId: ID!): Channel
     }

     type Subscription {
          messageAdded(channelId: ID, conversationId: ID): Message!
     }
`;

export default typeDefs;
