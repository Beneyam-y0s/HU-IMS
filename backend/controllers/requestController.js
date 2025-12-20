import Request from "../models/Request.js";

export const requestController = async (req, res) => {
  try {
    const {name, email, department, category, specificItem, description } = req.body;

    const newRequest = new Request({
      name,
      email,
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
