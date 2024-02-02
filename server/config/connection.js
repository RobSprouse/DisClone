// COMMENT: imports mongoose
import mongoose from "mongoose";

// COMMENT: sets up the connection to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/disclone");

// COMMENT: exports the connection
export default mongoose.connection;
