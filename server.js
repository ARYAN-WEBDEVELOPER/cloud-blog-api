require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const User = require("./models/User");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("MongoDB API Running");
});
// CREATE A POST
app.post("/posts", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    const post = await Post.create({
      title,
      content,
      authorId,
    });

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// GET ALL POSTS
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId", "name email");

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// DELETE A POST
app.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(
      req.params.id
    );

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// GET A SINGLE POST
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// CREATE A USER
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// TOP 3 RECENT POSTS
app.get("/posts/recent/top3", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("authorId", "name email");

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// GET ALL POSTS OF A AUTHOR
app.get("/users/:userId/posts", async (req, res) => {
  try {
    const posts = await Post.find({
      authorId: req.params.userId,
    }).populate("authorId", "name email");

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});