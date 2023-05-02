import Ably from "ably/promises";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY as any);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "boxi",
  });
  response.status(200).json(tokenRequestData);
}
