import Request from "../models/Request.js";

export const requestController = async (req, res) => {
  try {
    // 1. Added universityID to the destructured body
    const { name, email, universityID, department, category, specificItem, description } = req.body;

    // 2. Pass universityID into the new Request object
    const newRequest = new Request({
      name,
      email,
      universityID, // <--- Add this
      department,
      category,
      specificItem,
      description,
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      request: newRequest,
    });
  } catch (error) {
    console.error("Request error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};