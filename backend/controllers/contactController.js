// import { Contact } from "../models/contactModel.js";
import Contact from "../models/contactModel.js";
// import { asyncHandler } from "express-async-handler";

import asyncHandler from "express-async-handler";

// const asyncHandler = require("express-async-handler");
// import pkg from "express-async-handler";
// const { asyncHandler } = pkg;

//@desc Get all contacts
//@route GET /api/contacts
//@access private

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create all contacts
//@route POST /api/contacts
//@access private

export const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { firstname, lastname, phoneno, email, domain, question } = req.body;
  if (!firstname || !lastname || !phoneno || !email || !domain || !question) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    firstname,
    lastname,
    phoneno,
    email,
    domain,
    question,
  });
  res.status(201).json(contact);
});

//@desc get contact
//@route GET /api/contacts/:id
//@access private

export const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id
//@access private

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updateContact);
});

//@desc delete contact
//@route  DELETE /api/contacts/:id
//@access private

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.remove();
  res.status(200).json(contact);
});
