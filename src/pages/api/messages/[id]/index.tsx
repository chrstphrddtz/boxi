import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../db/connect";
import Message from "../../../../../db/models/Message";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await dbConnect();
  const { id } = request.query;

  switch (request.method) {
    case "GET":
      const message = await Message.findById(id);
      response.status(200).json(message);
      break;
    case "PUT":
      const messageToUpdate = await Message.findByIdAndUpdate(id, {
        $set: request.body,
      });
      response.status(200).json(messageToUpdate);
      break;
    case "DELETE":
      const messageToDelete = await Message.findByIdAndDelete(id);
      response.status(200).json(messageToDelete);
    default:
      return response.status(400).json({ status: "Not Found!" });
  }
}
