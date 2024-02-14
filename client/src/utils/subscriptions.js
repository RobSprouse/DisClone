import { gql } from "@apollo/client";

const MESSAGE_ADDED = gql`
     subscription OnMessageAdded($channelId: ID, $conversationId: ID) {
          messageAdded(channelId: $channelId, conversationId: $conversationId) {
               _id
               text
               channelId
               conversationId
               user {
                    _id
                    username
               }
          }
     }
`;

export default MESSAGE_ADDED;
