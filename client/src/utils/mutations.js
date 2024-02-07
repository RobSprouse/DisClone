// COMMENT: imports gql from apollo/client needed to define the mutations for the client side
import { gql } from "@apollo/client";

// COMMENT: defines the login mutation and exports it
export const LOGIN_USER = gql`
     mutation login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
               accessToken
          }
     }
`;

// COMMENT: defines the signup mutation and exports it
export const SIGNUP_USER = gql`
     mutation SignupUser(
          $username: String!
          $email: String!
          $password: String!
          $firstName: String!
          $lastName: String!
          $image: String
     ) {
          signup(
               username: $username
               email: $email
               password: $password
               firstName: $firstName
               lastName: $lastName
               image: $image
          ) {
               accessToken
          }
     }
`;

export const LOGOUT_USER = gql`
     mutation {
          logout
     }
`;

export const CREATE_CHANNEL = gql`
     mutation CreateChannel($name: String!, $image: String) {
          createChannel(name: $name, image: $image) {
               channels {
                    _id
                    name
                    image
                    members {
                         _id
                         username
                    }
                    moderator {
                         _id
                         username
                    }
               }
               accessToken
          }
     }
`;

export const CREATE_CONVERSATION = gql`
     mutation CreateConversation($recipientId: ID!) {
          createConversation(recipientId: $recipientId) {
               conversations {
                    _id
                    members {
                         _id
                         username
                    }
                    messages {
                         _id
                         text
                         user {
                              _id
                              username
                         }
                         timestamp
                    }
               }
               accessToken
          }
     }
`;

export const ADD_TO_CONVERSATION = gql`
     mutation AddToConversation($conversationId: ID!, $recipientId: ID!) {
          addToConversation(conversationId: $conversationId, recipientId: $recipientId) {
               conversations {
                    _id
                    members {
                         _id
                         username
                    }
                    messages {
                         _id
                         text
                         user {
                              _id
                              username
                         }
                         timestamp
                    }
               }
               accessToken
          }
     }
`;

export const SEND_CHANNEL_MESSAGE = gql`
     mutation SendChannelMessage($channelId: ID!, $text: String!) {
          sendChannelMessage(channelId: $channelId, text: $text) {
               messages {
                    _id
                    text
                    user {
                         _id
                         username
                    }
                    channel {
                         _id
                         name
                    }
                    timestamp
               }
               accessToken
          }
     }
`;

export const SEND_CONVERSATION_MESSAGE = gql`
     mutation SendConversationMessage($conversationId: ID!, $text: String!) {
          sendConversationMessage(conversationId: $conversationId, text: $text) {
               messages {
                    _id
                    text
                    user {
                         _id
                         username
                    }
                    timestamp
               }
               accessToken
          }
     }
`;
