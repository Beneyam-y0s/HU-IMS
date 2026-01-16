import express from "express";
import { requestController, updateRequestStatus} from "../controllers/requestController.js";
import { getRequests } from "../controllers/requestController.js";


const router = express.Router();

router.post("/", requestController);
router.get("/", getRequests);
router.patch("/:id/status", updateRequestStatus);

export default router;
