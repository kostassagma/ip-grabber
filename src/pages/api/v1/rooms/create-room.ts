// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import checkParamPresence from "../../../../lib/checkParamPresence";
import { nanoid } from "nanoid";
import { connectToDatabase } from "../../../../lib/mongodb";
import { JWT_SECRET_KEY } from "../../../../lib/constants";
import { serialize } from "cookie";
import { jwtVerify } from "jose";
import { urlToPath } from "../../../../lib/checkValidUrl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [err, {link}] = checkParamPresence(["link"], req, res, "POST")
  if (err) return;
  
  const { jit } = req.cookies;
  if (!jit) {
    return res.status(401).send({ Err: "Not Authenticated" });
  }

  let owner:any = ""
  try {
    const { payload, protectedHeader } = await jwtVerify(
      jit,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );
    if (!payload.user) {
      throw new Error()
    }
    owner = payload.user
  } catch (err) {
    res.setHeader(
      "Set-Cookie",
      serialize("jit", "", { maxAge: -1, path: "/" })
    );
    return res.status(401).send({ Err: "Not Authenticated" });
  }

  const linkDets = urlToPath(link)

  if (!linkDets) {
    return res.status(400).json({Err: "Invalid Link"})
  }

  try {
    let { db } = await connectToDatabase()

    const id = await getUniqueId()

    await db.collection("rooms").insertOne({
      id,
      link,
      origin: linkDets.hostname,
      owner,
      visitors: []
    });

    return res.status(200).json({ id }); 
  } catch(e) {
    return res.status(500).json({Err: "Something Went Wrong"})
  }
}

async function getUniqueId():Promise<string> {
  let id = nanoid()
  let {db} = await connectToDatabase()

  const exists = await db.collection("rooms").findOne({ id });

  if (exists) {
    return await getUniqueId()
  }

  return id
}
