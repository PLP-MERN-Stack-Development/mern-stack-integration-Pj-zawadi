import express from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/categoryController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { body } from "express-validator";

const router = express.Router();

router.route("/")
  .get(getCategories)
  .post(
    [body("name").notEmpty().withMessage("Category name is required")],
    validateRequest,
    createCategory
  );

export default router;
