// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send({ Err: "Invite Code Not Provided" });
  }
  if (code.length !== 6) {
    return res.status(400).json({ Err: "Code Lenght Isnt 6 digits" });
  }
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let invite = await db.collection("invites").findOne({ code });

    if (!invite || invite.used) {
      return res.status(404).send({ Err: "Invite Code Not Found" });
    }

    res.status(200).send({ OK: "Valid Invite" });
  } catch (e) {
    return res.status(500).json({ Err: "Something Went Wrong" });
  }
}
