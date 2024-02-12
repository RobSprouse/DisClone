import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema({
     members: [
          {
               type: Schema.Types.ObjectId,
               ref: "User",
          },
     ],
     messages: [
          {
               type: Schema.Types.ObjectId,
               ref: "Message",
          },
     ],
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;
