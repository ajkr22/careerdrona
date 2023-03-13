import User from "../models/user.js";
import path from "path";
import { v4 as uuid } from "uuid";
import Post from "../models/posts.js";
import Comment from "../models/comment.js";

export const getUserProfile = async (req, res) => {
  const username = req.params.username;

  try {
    const author = await User.findOne({ username: username });
    if (author) {
      const post = await Post.find({ author: author._id });

      var likes = 0;
      post.map((p) => {
        likes += p.likes.length;
      });

      const comments = await Comment.find({ author: author._id })
        .populate("post", "title titleURL")
        .sort({ date: -1 });

      res.json({ post, author, comments, likes });
    } else {
      res.status(500).json({ message: "This user does not exist!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getDashboard = async (req, res) => {
  if (req.user != null) {
    const username = req.body.username;
    try {
      const author = await User.findOne({ username: username });
      if (author) {
        const post = await Post.find({ author: author._id });

        var likes = 0;
        post.map((p) => {
          likes += p.likes.length;
        });

        var comments = 0;
        post.map((p) => {
          comments += p.comments.length;
        });

        res.json({ post, author, comments, likes });
      } else {
        res.status(500).json({ message: "This user does not exist!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.json({ error: true, message: "Not Authorized" });
  }
};

export const UpdateUser = async (req, res) => {
  if (req.user != null) {
    let user;
    try {
      // check if request user exists
      var existingUsername = await User.findOne({
        username: req.body.inputs.username,
        email: req.body.inputs.email,
      });

      if (existingUsername) {
        console.log(req.body.inputs);
        user = await User.findByIdAndUpdate(
          req.body.inputs._id,
          {
            name: req.body.inputs.name,
            username: req.body.inputs.username,
            avatar: req.body.newavatar,
            bio: req.body.inputs.bio,
            location: req.body.inputs.location,
            education: req.body.inputs.education,
            experience: req.body.inputs.experience,
          },
          { new: true }
        )
          .then((doc) => {
            if (!doc) {
              return res.json({ error: true, message: "User not found" });
            }

            return res.json(doc);
          })
          .catch((err) => {
            return res.json({
              error: true,
              message: "Internal server error",
            });
          });
      } else {
        var alreadyTaken = await User.findOne({
          username: req.body.inputs.username,
        });
        if (alreadyTaken) {
          return res.json({
            error: true,
            message: `Username '${req.body.inputs.username}' has already been taken`,
          });
        } else {
          user = await User.findByIdAndUpdate(
            req.body.inputs._id,
            {
              name: req.body.inputs.name,
              username: req.body.inputs.username,
              avatar: req.body.newavatar,
              bio: req.body.inputs.bio,
              location: req.body.inputs.location,
              education: req.body.inputs.education,
              experience: req.body.inputs.experience,
            },
            { new: true }
          )
            .then((doc) => {
              if (!doc) {
                return res.json({ error: true, message: "User not found" });
              }

              return res.json(doc);
            })
            .catch((err) => {
              return res.json({
                error: true,
                message: "Internal server error",
              });
            });
        }
      }
    } catch (err) {
      // console.log(err);
      return res.json({
        error: true,
        message: `Something went wrong`,
      });
    }
  } else {
    res.json({ error: true, message: "Not Authorized" });
  }
};
