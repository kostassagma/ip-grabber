// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import checkParamPresence from "../../../../lib/checkParamPresence";
import { jwtVerify } from "jose";
import { JWT_SECRET_KEY } from "../../../../lib/constants";
import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [err, {}] = checkParamPresence([], req, res, "GET");
  if (err) return;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ Err: "Not Authenticated" });
  }
  // console.log(token);
  try {
    const { payload, protectedHeader } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );
    if (!payload) {
      throw new Error("")
    }
    if (!payload.user) {
      throw new Error("")
    }
    if (typeof payload.user !== "string") {
      throw new Error("")
    }
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({
      _id: new ObjectId(payload.user)
    })
    if (!user) {
      throw new Error("")
    }
    return res.status(200).send({username: user.username})
  } catch (err) {
    return res.status(401).send({ Err: "Not Authenticated" });
  }
}
