import User from "../models/User.js";

export async function searchUsers(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const users = await User.find({
      name: { $regex: query, $options: "i" },
    }).select("_id name email");

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("User search error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}
