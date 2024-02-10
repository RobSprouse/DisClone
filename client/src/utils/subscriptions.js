import { gql } from "@apollo/client";

// COMMENT: defines the messageAdded subscription and exports it, 
/* COMMENT: EXAMPLE:
      export const CHANNEL_MESSAGE_ADDED = gql`
           subscription ChannelMessageAdded($channelId: ID!) {
                channelMessageAdded(channelId: $channelId) {
                     _id
                     content
                     createdAt
                     user {
                          _id
                          username
                          image
                     }
                }
           }
      `;
       */

      