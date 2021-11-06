// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import checkParamPresence from "../../lib/checkParamPresence";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [err, {}] = checkParamPresence([], req, res, "GET")
  if (err) return
  res.status(200).json([
    {
      id: "1",
      link: "https://skroutz.gr"
    },
    {
      id: "2",
      link: "https://skroutz.gr"
    },
    {
      id: "3",
      link: "https://skroutz.gr"
    },
    {
      id: "4",
      link: "https://skroutz.gr"
    }
  ]);
}
