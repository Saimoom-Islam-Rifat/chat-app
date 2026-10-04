import dns from "node:dns";
import { connect } from "mongoose";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export default async function connectDB() {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("MongoDB Atlas is connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}
