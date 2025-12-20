import Category from "../models/Category.js";

// GET all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// POST create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category already exists
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const newCategory = new Category({ name, description });
    await newCategory.save();

    res.status(201).json({ category: newCategory });
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE category
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
