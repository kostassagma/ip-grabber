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
  const [err, { id }] = checkParamPresence(["id"], req, res, "GET");
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

    const room = await db.collection("rooms").findOne({owner, id})

    if (!room) {
      return res.status(404).json({Err: "Room Not Found"})
    }

    return res.status(200).send(room)
  } catch(e) {
    return res.status(500).json({Err: "Something Went Wrong"})
  }

  // return res.status(200).json({
  //   link: "skroutz.gr",
  //   id: id,
  //   visitors: [
  //     {
  //       ip: "192.1.2.3",
  //       time: "22:20:10",
  //     },
  //     {
  //       ip: "192.1.2.3",
  //       time: "22:20:10",
  //     },
  //     {
  //       ip: "192.1.2.3",
  //       time: "22:20:10",
  //     },
  //   ],
  // });
}
