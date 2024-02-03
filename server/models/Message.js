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
          index: true,
     },
     conversationId: {
          type: Schema.Types.ObjectId,
          ref: "Conversation",
          index: true,
     },
     timestamp: {
          type: Date,
          default: Date.now,
          index: true,
     },

     updatedAt: {
          type: Date,
          default: Date.now,
     },
});

// Apply pre-update middleware to update 'updatedAt' field
messageSchema.pre('findOneAndUpdate', function (next) {
     this.set({ updatedAt: new Date() });
     next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
