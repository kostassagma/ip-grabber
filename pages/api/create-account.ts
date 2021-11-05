// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { passwordStrength } from "check-password-strength";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { createHash } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      "Method Not Acccepted": "This Route Only Accepts Post Requests",
    });
  }

  const { username, password, code } = req.body;
  if (!username) {
    return res.status(400).json({ "Bad Request": "Missing Username" });
  }
  if (!password) {
    return res.status(400).json({ "Bad Request": "Missing Password" });
  }
  if (!code) {
    return res.status(400).json({ "Bad Request": "Missing Invitation Code" });
  }
  if (!code) {
    return res.status(400).send({ "Bad Request": "Invite Code Not Provided" });
  }
  if (code.length !== 6) {
    return res.status(400).json({ "Bad Request": "Code Lenght Isnt 6 digits" });
  }
  if (passwordStrength(password).id !== 3) {
    return res.status(400).json({ "Bad Request": "Weak Password" });
  }
  try {
    let { db } = await connectToDatabase();
    let invite = await db.collection("invites").findOne({ code });

    if (!invite || invite.used) {
      return res.status(404).send({ "Not Found": "Invite Code Not Found" });
    }
    // fetch the posts
    let exists = await db.collection("users").findOne({ username });

    if (exists) {
      return res.status(409).send({ Conflict: "Username Taken" });
    }

    const hashedPassword = await createHash("sha256")
      .update(password)
      .digest("hex");

    await db
      .collection("users")
      .insertOne({ username, password: hashedPassword });

    res.status(200).send({ OK: "Created Account" });
  } catch (e) {
    return res.status(500).json({ Error: "Something Went Wrong" });
  }
}
