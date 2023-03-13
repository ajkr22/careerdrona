import Tag from "../models/tags.js";
import Post from "../models/posts.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

function generateCode() {
  let code = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    const randomChar = chars[randomIndex];
    code += randomChar;
  }
  return code;
}

function createUrlTitle(title) {
  const urlTitle = title
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");

  // Remove any consecutive hyphens
  return urlTitle.replace(/-{2,}/g, "-") + "-" + generateCode();
}

export const addComment = async (req, res) => {
  if (req.user) {
    const comment = new Comment({
      body: req.body.body,
      post: req.body.post,
      author: req.body.author,
      likes: [],
    });

    comment.save(async (err, post) => {
      if (err) {
        return res.json({ error: true, message: "Comment was not saved" });
      } else {
        const result = await Post.updateOne(
          { _id: req.body.post },
          { $push: { comments: req.body.author } }
        );
        return res.json("Comment Saved!");
      }
    });
  }
};

export const addLike = async (req, res) => {
  if (req.user) {
    const post = await Post.findById(req.body.post);
    const index = post.likes.indexOf(req.body.author);
    if (index === -1) {
      // Value doesn't exist in array, add it
      await post.updateOne({ $push: { likes: req.body.author } });
      res.json({ message: "Like added for this Post" });
    } else {
      // Value exists in array, remove it
      await post.updateOne({ $pull: { likes: req.body.author } });
      res.json({ message: "Like removed from this Post" });
    }
  }
};

export const addCommentLike = async (req, res) => {
  if (req.user) {
    const comment = await Comment.findById(req.body.comment);
    const index = comment.likes.indexOf(req.body.author);
    if (index === -1) {
      // Value doesn't exist in array, add it
      await comment.updateOne({ $push: { likes: req.body.author } });
      res.json({ message: "Like added for this Comment" });
    } else {
      // Value exists in array, remove it
      await comment.updateOne({ $pull: { likes: req.body.author } });
      res.json({ message: "Like removed from this Comment" });
    }
  }
};

export const getPost = async (req, res) => {
  const username = req.params.username;
  const title = req.params.title;

  try {
    const author = await User.findOne({ username: username });
    if (author) {
      const post = await Post.findOne({ author: author._id, titleURL: title });
      // console.log(post);
      const comments = await Comment.find({ post: post._id })
        .populate("author", "name username avatar role")
        .sort({ date: -1 });
      res.json({ post, author, comments });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getEditPost = async (req, res) => {
  if (req.user != null) {
    const postid = req.body.postid;
    try {
      const post = await Post.findOne({ _id: postid });
      res.json({ post });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
};

export const getAllPost = async function (req, res) {
  var posts = await Post.find()
    .populate("author", "name username avatar role")
    .sort({ date: 1 });
  res.json(posts);
};

export const DeletePost = async function (req, res) {
  if (req.user != null) {
    try {
      Post.findByIdAndDelete(req.body.post, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.json({ error: true, message: "Not Authorized" });
  }
};

export const getAllLatestPost = async function (req, res) {
  var posts = await Post.find()
    .populate("author", "name username avatar role")
    .sort({ date: -1 });
  res.json(posts);
};

export const getAllTopPost = async function (req, res) {
  var posts = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$author" },
    {
      $lookup: {
        from: "users",
        localField: "likes",
        foreignField: "_id",
        as: "likesDetails",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "commentsDetails",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        tags: 1,
        comments: 1,
        image: 1,
        likes: 1,
        titleURL: 1,
        createdAt: 1,
        likesCount: { $size: "$likes" },
        commentsCount: { $size: "$comments" },
        author: { username: 1, email: 1, avatar: 1, name: 1, role: 1 },
      },
    },
    { $sort: { likesCount: -1, commentsCount: -1 } },
  ]);
  res.json(posts);
};

export const getTags = async function (req, res) {
  var tags = await Tag.find();
  res.json(tags);
};

export const getTagPosts = async function (req, res) {
  const tag = req.params.tag;
  var posts = await Post.find({ tags: tag })
    .populate("author", "name username avatar role")
    .sort({ date: -1 });
  res.json(posts);
};

export const addPost = async (req, res) => {
  if (req.user) {
    let tags =[ req.body.tags];
    let find = await Tag.findOne({ name: tags[0] });
    if (!find) {
      const newItem = new Tag({ name: tags[0] });
      await newItem.save();
    }


    var author = await User.findOne({ email: req.user._json.email });

    const newPost = new Post({
      title: req.body.title,
      image: req.body.image,
      body: req.body.body,
      tags: tags,
      titleURL: createUrlTitle(req.body.title),
      author: author._id,
      likes: [],
      bookmarks: [],
      comments: [],
    });

    newPost.save((err, post) => {
      if (err) {
        return res.json({ error: true, message: "Post was not saved" });
      } else {
        return res.json({ post, username: author.username });
      }
    });
  } else {
    res.json({ error: true, message: "Not Authorized" });
  }
};

export const totalNotifications = async (req, res) => {
  if (req.user && req.body.user) {
    const id = req.body.user._id;

    var now = new Date();
    var startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const userPosts = await Post.find({ author: id });
    const comments = await Comment.find({
      post: { $in: userPosts.map((post) => post._id) },
      author: { $ne: id },
      date: { $gte: startOfToday },
    }).populate("author", "username name avatar");
    return res.json(comments.length);
  } else {
    res.json({ error: true, message: "Not Authorized" });
  }
};

export const getNotifications = async (req, res) => {
  if (req.user && req.body.user) {
    const id = req.body.user._id;

    var now = new Date();
    var startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const userPosts = await Post.find({ author: id });
    const comments = await Comment.find({
      post: { $in: userPosts.map((post) => post._id) },
      author: { $ne: id },
    })
      .populate("author", "username name avatar role")
      .populate("post", "title titleURL")
      .sort({ date: -1 });
    return res.json(comments);
  } else {
    res.json({ error: true, message: "Not Authorized" });
  }
};

export const editPost = async (req, res) => {
  if (req.user && req.body.postid) {
    const postid = req.body.postid;

    let tags = req.body.tags.map((item) => item.text);
    tags.forEach(async (item) => {
      let find = await Tag.findOne({ name: item });
      if (!find) {
        const newItem = new Tag({ name: item });
        await newItem.save();
      }
    });

    var author = await User.findOne({ email: req.user._json.email });

    var updatepost = await Post.findByIdAndUpdate(
      postid,
      {
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
        tags: tags,
      },
      { new: true }
    )
      .then((post) => {
        if (!post) {
          return res.json({ error: true, message: "Post not found" });
        }

        return res.json({ post, username: author.username });
      })
      .catch((err) => {
        return res.json({
          error: true,
          message: "Internal server error",
        });
      });
  } else {
    res.json({ error: true, message: "Not Authorized" });
  }
};
