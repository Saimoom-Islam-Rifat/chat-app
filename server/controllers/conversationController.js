import Conversation from "../models/Conversation.js";

export async function createConversation(req, res) {
  try {
    const { userId } = req.user;
    const { otherUserId } = req.body;

    if (!otherUserId) {
      return res.status(400).json({
        message: "Other user ID is required",
      });
    }

    const existingConversation = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] },
    });

    if (existingConversation) {
      return res.status(200).json({
        conversation: existingConversation,
      });
    }
    const conversation = await Conversation.create({
      participants: [userId, otherUserId],
    });

    return res.status(201).json({
      conversation,
    });
  } catch (error) {
    console.error("Create conversation error:", error);

    return res.status(500).json({
      message: "server error",
    });
  }
}
