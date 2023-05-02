import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date(), required: true },
  isRead: { type: Boolean, required: true },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
