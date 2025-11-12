import Post from "../models/Post.js";
import asyncHandler from "express-async-handler";

// @desc Get all posts
// @route GET /api/posts
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("category");
  res.json(posts);
});

// @desc Get a single post
// @route GET /api/posts/:id
export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("category");
  if (post) res.json(post);
  else res.status(404).json({ message: "Post not found" });
});

// @desc Create a post
// @route POST /api/posts
export const createPost = asyncHandler(async (req, res) => {
  const { title, content, image, category } = req.body;
  const newPost = await Post.create({ title, content, image, category });
  res.status(201).json(newPost);
});

// @desc Update a post
// @route PUT /api/posts/:id
export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  post.image = req.body.image || post.image;
  post.category = req.body.category || post.category;

  const updated = await post.save();
  res.json(updated);
});

// @desc Delete a post
// @route DELETE /api/posts/:id
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  await post.deleteOne();
  res.json({ message: "Post removed" });
});
