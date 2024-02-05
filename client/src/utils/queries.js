// COMMENT: imports gql from apollo/client needed to define the queries for the client side
import { gql } from "@apollo/client";

// COMMENT: defines the user query and exports it
export const GET_USER = gql`
     query GetUser($_id: ID!) {
          user(_id: $_id) {
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
                    members {
                         _id
                         username
                    }
                    moderator {
                         _id
                         username
                    }
               }
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
          }
     }
`;

// COMMENT: defines the getAllChannels query and exports it
export const GET_ALL_CHANNELS = gql`
     query GetAllChannels {
          getAllChannels {
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

// COMMENT: defines the getChannels query and exports it
export const GET_CHANNELS = gql`
     query GetChannels {
          getChannels {
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

// COMMENT: defines the getConversations query and exports it
export const GET_CONVERSATIONS = gql`
     query GetConversations {
          getConversations {
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

// COMMENT: defines the getChannelMessages query and exports it
export const GET_CHANNEL_MESSAGES = gql`
     query GetChannelMessages($channelId: ID!) {
          getChannelMessages(channelId: $channelId) {
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

// COMMENT: defines the getConversationMessages query and exports it
export const GET_CONVERSATION_MESSAGES = gql`
     query GetConversationMessages($conversationId: ID!) {
          getConversationMessages(conversationId: $conversationId) {
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
