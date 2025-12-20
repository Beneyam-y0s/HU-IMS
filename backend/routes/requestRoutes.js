import express from "express";
import { requestController } from "../controllers/requestController.js";


const router = express.Router();

router.post("/", requestController);

export default router;
