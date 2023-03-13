import express from "express";
import multer from "multer";
import {
  getDashboard,
  getUserProfile,
  UpdateUser,
} from "../controllers/users.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("avatar"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

router.post("/update", UpdateUser);
router.get("/profile/:username", getUserProfile);
router.post("/dashboard/", getDashboard);

export default router;
