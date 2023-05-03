import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../db/connect";
import Message from "../../../../db/models/Message";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      const message = await Message.find();
      response.status(200).json(message);
      break;
    case "POST":
      try {
        const messageData = request.body;
        const message = new Message(messageData);
        await message.save();
        response.status(201).json({ staus: "Message created" });
      } catch (e: any) {
        if (e instanceof Error) {
          console.error(e);
        } else {
          response.status(400).json({ error: e.message });
        }
      }
      break;
  }
}
