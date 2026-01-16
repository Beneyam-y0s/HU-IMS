import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["tech", "furniture", "other"],
      required: true,
    },

    specificItem: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "not approved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
