import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
     text: {
          type: String,
          required: true,
     },
     userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
     },
     channelId: {
          type: Schema.Types.ObjectId,
          ref: "Channel",
     },
     conversationId: {
          type: Schema.Types.ObjectId,
          ref: "Conversation",
     },
     timestamp: {
          type: Date,
          default: Date.now,
     },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
