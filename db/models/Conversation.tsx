import mongoose from "mongoose";

const { Schema } = mongoose;

const conversationSchema = new Schema({
  participants: { type: Array, required: true },
});

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default Conversation;
