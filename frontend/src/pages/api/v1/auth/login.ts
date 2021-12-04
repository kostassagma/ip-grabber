// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SignJWT } from "jose";
import { JWT_SECRET_KEY, REFRESH_TOKEN_KEY } from "../../../../lib/constants";
import { createHash } from "crypto";
import { connectToDatabase } from "../../../../lib/mongodb";
import checkParamPresence from "../../../../lib/checkParamPresence";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Chacking Method And Parameters
  const [err, { username, password }] = checkParamPresence(
    ["username", "password"],
    req,
    res,
    "POST"
  );
  if (err) return;

  const rememberMe = req.body.rememberMe;

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return res.status(404).json({ Err: "User Not Found" });
    }

    const hashedPassword = await createHash("sha256")
      .update(password)
      .digest("hex");

    if (hashedPassword !== user.password) {
      return res.status(401).json({ Err: "Invalid Password" });
    }
    const token = await new SignJWT({ user: user._id })
      .setProtectedHeader({ alg: "HS256" })
      .setJti("ebskhsb")
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(JWT_SECRET_KEY));

      if (rememberMe) {
      const refreshToken = await new SignJWT({
        user: user._id,
        version: user.tokenVersion,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setJti("ebskhsb")
        .setIssuedAt()
        .setExpirationTime("2d")
        .sign(new TextEncoder().encode(REFRESH_TOKEN_KEY));

      res.setHeader(
        "Set-Cookie",
        serialize("refresh", refreshToken, {
          path: "/",
        })
      );
    }

    res.status(200).send({ accessToken: token });
  } catch (e) {
    return res.status(500).send({ Err: "Something Went Wrong" });
  }
}
