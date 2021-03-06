// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { passwordStrength } from "check-password-strength";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";
import { createHash } from "crypto";
import { JWT_SECRET_KEY, REFRESH_TOKEN_KEY } from "../../../../lib/constants";
import { SignJWT } from "jose";
import checkParamPresence from "../../../../lib/checkParamPresence";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [err, { username, password, code }] = checkParamPresence(
    ["username", "password", "code"],
    req,
    res,
    "POST"
  );
  if (err) return;
  const rememberMe = req.body.rememberMe;

  if (code.length !== 6) {
    return res.status(400).json({ Err: "Code Lenght Isnt 6 digits" });
  }
  if (passwordStrength(password).id !== 3) {
    return res.status(400).json({ Err: "Weak Password" });
  }
  try {
    let { db } = await connectToDatabase();
    let invite = await db.collection("invites").findOne({ code });

    if (!invite || invite.used) {
      return res.status(404).send({ Err: "Invalid Invite" });
    }
    let exists = await db.collection("users").findOne({ username });

    if (exists) {
      return res.status(409).send({ Err: "Username Taken" });
    }

    const hashedPassword = await createHash("sha256")
      .update(password)
      .digest("hex");

    await db
      .collection("users")
      .insertOne({ username, password: hashedPassword, tokenVersion: 0 });

    await db.collection("invites").updateOne(
      {
        code,
      },
      { $set: { used: true } }
    );

    const user = await db.collection("users").findOne({ username });

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
    return res.status(500).json({ Err: "Something Went Wrong" });
  }
}
