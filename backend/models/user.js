import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, //'unique' adds index => fastens the querying prcoess
  password: { type: String, required: true, minLength: 6 },
  username: { type: String, unique: true },
  role: { type: String, default: "user" },
  avatar: { type: String, default: "" },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  education: { type: String, default: "" },
  experience: { type: String, default: "" },
  joinDate: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  bookmarks: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);
export default User;
