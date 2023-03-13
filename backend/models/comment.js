import mongoose from "mongoose";

//schema = blueprint of post (it must contain title, image, etc.)
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: { type: String, required: true },
    date: { type: Date, default: Date.now },
    post: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
    author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    likes: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
