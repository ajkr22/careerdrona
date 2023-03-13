import mongoose from "mongoose";
// const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    firstname: {
      type: String,
      //   required: [true, "Please add the firstname"],
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phoneno: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
