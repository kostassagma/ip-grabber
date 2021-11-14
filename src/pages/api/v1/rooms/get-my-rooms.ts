// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from "cookie";
import { jwtVerify } from "jose";
import type { NextApiRequest, NextApiResponse } from "next";
import checkParamPresence from "../../../../lib/checkParamPresence";
import { JWT_SECRET_KEY } from "../../../../lib/constants";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [err, {}] = checkParamPresence([], req, res, "GET");
  if (err) return;
  const { jit } = req.cookies;
  if (!jit) {
    return res.status(401).send({ Err: "Not Authenticated" });
  }
  let owner: any = "";
  try {
    const { payload, protectedHeader } = await jwtVerify(
      jit,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );
    if (!payload.user) {
      throw new Error();
    }
    owner = payload.user;
  } catch (err) {
    res.setHeader(
      "Set-Cookie",
      serialize("jit", "", { maxAge: -1, path: "/" })
    );
    return res.status(401).send({ Err: "Not Authenticated" });
  }

  try {
    let { db } = await connectToDatabase()

    const rooms = await db.collection("rooms").find({owner}).toArray()

    return res.status(200).send(JSON.parse(JSON.stringify(rooms)))
  } catch(e) {
    return res.status(500).json({Err: "Something Went Wrong"})
  }
  // res.status(200).json([
  //   {
  //     id: "1",
  //     link: "https://skroutz.gr",
  //   },
  //   {
  //     id: "2",
  //     link: "https://skroutz.gr",
  //   },
  //   {
  //     id: "3",
  //     link: "https://skroutz.gr",
  //   },
  //   {
  //     id: "4",
  //     link: "https://skroutz.gr",
  //   },
  // ]);
}
