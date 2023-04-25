import { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "../../../../db/connect";
// import User from "../../../../db/models/User";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) { 
  // await dbConnect();

  const body = request.body
  console.log(body);

  if(!body.location) {
    return response.status(400).json({ data: 'data not found' })
  }
  response.status(200).json({ data: `${body.location}` })

  

}