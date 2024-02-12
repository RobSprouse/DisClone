import { gql } from "@apollo/client";

// COMMENT: defines the messageAdded subscription and exports it,
const MESSAGE_ADDED = gql`
     subscription OnMessageAdded($channelId: String, $conversationId: String) {
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
