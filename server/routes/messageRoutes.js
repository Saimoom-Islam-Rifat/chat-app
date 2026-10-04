import express from "express";
import { sendMessage, getMessage } from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:conversationId", authMiddleware, getMessage);

export default router;
