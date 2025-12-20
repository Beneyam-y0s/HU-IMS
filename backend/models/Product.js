import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    buyDate: { type: Date, required: true },
    status: { type: String, enum: ["new", "used", "damaged"], default: "new" },
    department: {
      type: String,
      enum: [
        "IT",
        "Information Science",
        "Information System",
        "Computer Science",
        "Software",
        "Shared",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
