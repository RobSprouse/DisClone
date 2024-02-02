import bcrypt from "bcrypt";
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
     {
          username: {
               type: String,
               required: true,
               unique: true,
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
     },
     // set this to use virtual below
     {
          toJSON: {
               virtuals: true,
          },
     },
);

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
     if (this.isModified("password")) {
          this.password = await bcrypt.hash(this.password, 10);
     }
     next();
});

// Method to check the entered password against the hash
userSchema.methods.isCorrectPassword = async function (password) {
     return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
