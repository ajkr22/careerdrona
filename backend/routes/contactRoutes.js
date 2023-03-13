import express from "express";
import {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

// const { getContact } = require("../controllers/contactController");

router.get("/", getContacts);

router.post("/", createContact);

router.get("/:id", getContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

// module.exports = router;

export default router;
