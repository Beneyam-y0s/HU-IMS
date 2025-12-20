import Product from "../models/Product.js";

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// POST register product
export const registerProduct = async (req, res) => {
  try {
    const { name, productId, category, buyDate, status, department } = req.body;

    // Check if product ID already exists
    const existing = await Product.findOne({ productId });
    if (existing) {
      return res.status(400).json({ message: "Product ID already exists" });
    }

    const newProduct = new Product({
      name,
      productId,
      category,
      buyDate,
      status,
      department,
    });

    await newProduct.save();
    res.status(201).json({ product: newProduct });
  } catch (err) {
    console.error("Register product error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
