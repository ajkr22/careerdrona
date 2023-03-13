import mongoose from "mongoose";

const Schema = mongoose.Schema;

//model - based on schema - each instance is a new document
const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
