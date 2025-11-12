import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";

// @desc Get all categories
// @route GET /api/categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// @desc Create a category
// @route POST /api/categories
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const exists = await Category.findOne({ name });
  if (exists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({ name });
  res.status(201).json(category);
});
