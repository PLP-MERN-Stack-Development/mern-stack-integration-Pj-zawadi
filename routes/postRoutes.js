import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { validateRequest } from "../middleware/validateRequests.js";
import { body } from "express-validator";

const router = express.Router();

router.route("/")
  .get(getPosts)
  .post(
    [
      body("title").notEmpty().withMessage("Title is required"),
      body("content").notEmpty().withMessage("Content is required"),
    ],
    validateRequest,
    createPost
  );

router.route("/:id")
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

export default router;
