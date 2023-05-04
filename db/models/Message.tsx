import mongoose from "mongoose";
import User from "./User";

const { Schema } = mongoose;

const messageSchema = new Schema({
  name: { type: String, required: true },
  // sender: { type: Schema.Types.ObjectId, ref: User },
  // receiver: { type: Schema.Types.ObjectId, ref: User },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
