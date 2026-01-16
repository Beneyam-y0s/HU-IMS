import Request from "../models/Request.js";

// POST: Create a new request
export const requestController = async (req, res) => {
  try {
    const { name, email, department, category, specificItem, description } = req.body;

    const newRequest = new Request({
      name,
      email,
      department,
      category,
      specificItem,
      description,
      status: "pending", // default status
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

// GET: Fetch all requests
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Get requests error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "not approved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: error.message });
  }
};
