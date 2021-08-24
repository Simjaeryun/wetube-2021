import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
