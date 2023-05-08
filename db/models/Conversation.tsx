import mongoose from "mongoose";

const { Schema } = mongoose;

const conversationSchema = new Schema({
  participants: { type: Array, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  // message: { type: String, required: true },
  timestamp: { type: String, required: true, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default Conversation;
