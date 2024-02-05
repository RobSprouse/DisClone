import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema(
     {
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
     },
     {
          toJSON: {
               virtuals: true,
          },
     },
);

// Apply pre-update middleware to update 'updatedAt' field
messageSchema.pre("findOneAndUpdate", function (next) {
     this.set({ updatedAt: new Date() });
     next();
});

messageSchema.virtual("user", {
     ref: "User", // The model to use
     localField: "userId", // Find people where `localField`
     foreignField: "_id", // is equal to `foreignField`
     justOne: true, // Only get one document
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
