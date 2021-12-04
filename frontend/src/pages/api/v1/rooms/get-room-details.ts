// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { jwtVerify } from "jose";
import type { NextApiRequest, NextApiResponse } from "next";
import checkParamPresence from "../../../../lib/checkParamPresence";
import { JWT_SECRET_KEY } from "../../../../lib/constants";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [err, { id }] = checkParamPresence(["id"], req, res, "GET");
  if (err) return;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ Err: "Not Authenticated" });
  }
  let owner: any = "";
  try {
    const { payload, protectedHeader } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );
    if (!payload.user) {
      throw new Error();
    }
    owner = payload.user;
  } catch (err) {
    return res.status(401).send({ Err: "Not Authenticated" });
  }

  try {
    let { db } = await connectToDatabase();

    const room = await db.collection("rooms").findOne({ owner, id });

    if (!room) {
      return res.status(404).json({ Err: "Room Not Found" });
    }

    const visitors = await db
      .collection("visitors")
      .find({ roomId: id })
      .toArray();

    return res.status(200).json({ ...room, visitors });
  } catch (e) {
    return res.status(500).json({ Err: "Something Went Wrong" });
  }
}
