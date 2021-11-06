// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { passwordStrength } from "check-password-strength";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { createHash } from "crypto";
import { JWT_SECRET_KEY } from "../../lib/constants";
import { SignJWT } from "jose";
import { serialize } from "cookie";
import checkParamPresence from "../../lib/checkParamPresence";

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
    // fetch the posts
    let exists = await db.collection("users").findOne({ username });

    if (exists) {
      return res.status(409).send({ Err: "Username Taken" });
    }

    const hashedPassword = await createHash("sha256")
      .update(password)
      .digest("hex");

    await db
      .collection("users")
      .insertOne({ username, password: hashedPassword });

    const user = await db.collection("users").findOne({username})

    const token = await new SignJWT({ user: user._id })
      .setProtectedHeader({ alg: "HS256" })
      .setJti("ebskhsb")
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(JWT_SECRET_KEY));

    res.setHeader("Set-Cookie", serialize("jit", token, { path: "/" }));
    res.status(200).send({ OK: "Created Account" });
  } catch (e) {
    return res.status(500).json({ Err: "Something Went Wrong" });
  }
}
