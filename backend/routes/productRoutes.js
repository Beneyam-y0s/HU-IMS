import express from "express";
import {
  getProducts,
  registerProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();


router.get("/", getProducts);

router.post("/", registerProduct);


router.delete("/:id", deleteProduct);

export default router;
