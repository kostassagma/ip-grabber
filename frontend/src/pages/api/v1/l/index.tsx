// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { time } from "console";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ip } = req.query;
  if (!id || !ip) {
    return res.redirect("/");
  }
  try {
    let { db } = await connectToDatabase();

    const room = await db.collection("rooms").findOne({ id });

    if (!room) {
      throw new Error();
    }
    console.log(room.link);
    // let visitors = room.visitors;
    // visitors.push({
    //   ip,
    //   time: new Date().toLocaleDateString(undefined, {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     second: "2-digit",
    //   }),
    // });
    // await db.collection("rooms").updateOne({ id }, { $set: { visitors } });
    await db.collection("visitors").insertOne({
      roomId: id,
      ip,
      time: new Date().toLocaleDateString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    });
    return res.redirect(room.link);
  } catch (e) {
    return res.redirect("/");
  }
}
