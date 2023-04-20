import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      const user = await User.find();
      response.status(200).json(user);
      break;
    case "POST":
      try {
        const userData = request.body;
        const user = new User(userData);
        await user.save();
        response.status(201).json({ staus: "user created" });
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
