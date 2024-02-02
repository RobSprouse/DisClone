import mongoose from "mongoose";
const { Schema } = mongoose;

const channelSchema = new Schema({
     name: {
          type: String,
          required: true,
     },
     messages: [
          {
               type: Schema.Types.ObjectId,
               ref: "Message",
          },
     ],
     members: [
          {
               type: Schema.Types.ObjectId,
               ref: "User",
          },
     ],
     image: {
          type: String,
          default: "https://via.placeholder.com/150",
     },
     moderator: {
          type: Schema.Types.ObjectId,
          ref: "User",
     },
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
