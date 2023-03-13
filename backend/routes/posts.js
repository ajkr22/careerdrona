import express from "express";
import {
  addComment,
  addCommentLike,
  addLike,
  addPost,
  DeletePost,
  editPost,
  getAllLatestPost,
  getAllPost,
  getAllTopPost,
  getEditPost,
  getNotifications,
  getPost,
  getTagPosts,
  getTags,
  totalNotifications,
} from "../controllers/posts.js";

import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "posts");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("coverimage"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

router.get("/relevant", getAllPost);
router.get("/latest", getAllLatestPost);
router.get("/top", getAllTopPost);
router.post("/create", addPost);
router.post("/totalnotifications", totalNotifications);
router.post("/notificationsdata", getNotifications);
router.post("/edit", editPost);
router.post("/delete", DeletePost);
router.post("/comment", addComment);
router.post("/like", addLike);
router.post("/comment/like", addCommentLike);
router.get("/tags", getTags);
router.get("/tag/:tag", getTagPosts);
router.get("/:username/:title", getPost);
router.post("/getpost", getEditPost);

export default router;
