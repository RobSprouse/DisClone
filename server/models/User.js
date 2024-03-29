import bcrypt from "bcrypt";
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
     {
          username: {
               type: String,
               required: true,
               unique: false,
          },
          email: {
               type: String,
               required: true,
               unique: true,
               match: [/.+@.+\..+/, "Must use a valid email address"],
          },
          password: {
               type: String,
               required: true,
          },
          firstName: {
               type: String,
               required: true,
          },
          lastName: {
               type: String,
               required: true,
          },
          image: {
               type: String,
               default: "https://avatars.githubusercontent.com/u/47702913",
          },
     },
     // set this to use virtual below
     {
          toJSON: {
               virtuals: true,
          },
     },
);

userSchema.pre("save", async function (next) {
     if (this.isModified("password")) {
          this.password = await bcrypt.hash(this.password, 10);
     }
     next();
});

// // Method to check the entered password against the hash
// userSchema.methods.isCorrectPassword = async function (password) {
//      return bcrypt.compare(password, this.password);
// };

userSchema.virtual("channels", {
     ref: "Channel",
     localField: "_id",
     foreignField: "members",
     justOne: false,
});

userSchema.virtual("conversations", {
     ref: "Conversation",
     localField: "_id",
     foreignField: "members",
     justOne: false,
});

const User = mongoose.model("User", userSchema);

export default User;
