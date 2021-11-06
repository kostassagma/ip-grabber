// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import checkParamPresence from "../../lib/checkParamPresence";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [err, {id}] = checkParamPresence(["id"], req, res, "GET")
  if (err) return;
  
  return res.status(200).json({
    link: "skroutz.gr",
    id: id,
    visitors: [
      {
        ip: "192.1.2.3",
        time: "22:20:10"
      },
      {
        ip: "192.1.2.3",
        time: "22:20:10"
      },
      {
        ip: "192.1.2.3",
        time: "22:20:10"
      }
    ]
  });
}
