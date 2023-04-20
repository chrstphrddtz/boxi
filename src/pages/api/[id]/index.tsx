import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await dbConnect();
  const { id } = request.query;

  switch (request.method) {
    case "GET":
      const user = await User.findById(id);
      response.status(200).json(user);
      break;
    case "PUT":
      const userToUpdate = await User.findByIdAndUpdate(id, {
        $set: request.body,
      });
      response.status(200).json(userToUpdate);
      break;
    case "DELETE":
      const userToDelete = await User.findByIdAndDelete(id);
      response.status(200).json(userToDelete);
    default:
      return response.status(400).json({ status: "Not Found!" });
  }
}
