import express from "express";
import Thread from "../models/thread.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  deleteThread,
  getAllThreads,
  getSpecificThread,
  postChatToThread,
  deleteAllThreads,
} from "../controller/chat.js";

const router = express.Router();
// test
router.post("/test", authMiddleware, async (req, res) => {
  try {
    const existing = await Thread.findOne({ threadId: "abc" });

    if (existing) {
      return res.status(400).json({ message: "Thread already exists" });
    }
    const thread = new Thread({
      threadId: "abc",
      userId: req.user._id,
    });
    const result = await thread.save();
    return res.status(201).json({ message: "Test thread created", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get all threads
router.get("/threads", authMiddleware, getAllThreads);

// get specific thread
router.get("/thread/:threadId", authMiddleware, getSpecificThread);

// delete specific thread
router.delete("/thread/:threadId", authMiddleware, deleteThread);

// post chat to thread
router.post("/chat", authMiddleware, postChatToThread);

// delete All threads
router.delete("/threads", authMiddleware, deleteAllThreads);

export default router;
