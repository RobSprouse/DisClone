// COMMENT: imports gql from apollo/client needed to define the queries for the client side
import { gql } from "@apollo/client";

// COMMENT: defines the user query and exports it
export const GET_USER = gql`
     query GetUser {
          user {
               _id
               username
               email
               firstName
               lastName
               image
               channels {
                    _id
                    name
                    image
               }
               conversations {
                    _id
                    members {
                         _id
                         username
                         image
                    }
               }
          }
     }
`;

// COMMENT: defines the getAllUsers query and exports it
export const GET_ALL_USERS = gql`
     query GetAllUsers {
          getAllUsers {
               _id
               username
               image
          }
     }
`;

// COMMENT: defines the getAllChannels query and exports it
export const GET_ALL_CHANNELS = gql`
     query GetAllChannels {
          getAllChannels {
               _id
               name
               image
          }
     }
`;

export const GET_MESSAGES = gql`
     query GetMessages($id: ID!, $type: String!) {
          getMessages(id: $id, type: $type) {
               messages {
                    _id
                    text
                    user {
                         _id
                         username
                         image
                    }
                    timestamp
                    updatedAt
               }
               data {
                    ... on Channel {
                         _id
                         name
                         image
                    }
                    ... on Conversation {
                         _id
                         members {
                              _id
                              username
                              image
                         }
                    }
               }
          }
     }
`;

export const REFRESH_TOKEN_QUERY = gql`
     query RefreshToken {
          refreshToken {
               accessToken
          }
     }
`;
