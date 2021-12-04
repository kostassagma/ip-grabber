// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify, SignJWT } from "jose";
import { JWT_SECRET_KEY, REFRESH_TOKEN_KEY } from "../../../../lib/constants";
import { connectToDatabase } from "../../../../lib/mongodb";
import checkParamPresence from "../../../../lib/checkParamPresence";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Chacking Method And Parameters
  const [err, {}] = checkParamPresence([], req, res, "POST");
  if (err) return;

  const refreshToken = req.cookies.refresh;
  if (!refreshToken) {
    return res.status(400).json({ Err: "No refresh token cookie" });
  }
  let userId = "";
  try {
    const { payload, protectedHeader } = await jwtVerify(
      refreshToken,
      new TextEncoder().encode(REFRESH_TOKEN_KEY)
    );
    const { db } = await connectToDatabase();
    // @ts-ignore
    let userIdFromPayload:string = payload.user
    const user = await db.collection("users").findOne({ _id: new ObjectId(userIdFromPayload) });
    // console.log(payload);
    
    if (!user) {
      throw new Error("User Not Found");
    }
    if (user.tokenVersion != payload.version) {
      throw new Error("Invalid Version");
    }
    userId = user._id;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ Err: "Invalid refresh token" });
  }

  try {
    const token = await new SignJWT({ user: userId })
      .setProtectedHeader({ alg: "HS256" })
      .setJti("ebskhsb")
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(JWT_SECRET_KEY));

    res.status(200).send({ accessToken: token });
  } catch (e) {
    return res.status(500).send({ Err: "Something Went Wrong" });
  }
}
