// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import checkParamPresence from "../../../lib/checkParamPresence";
import { urlToPath } from "../../../lib/checkValidUrl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [err, {a}] = checkParamPresence(["a"], req, res, "GET")
  if (err) return
  const path = urlToPath(a)
  if (!path) {
    return res.status(400).json({Err: "Invalid Url"})
  }
  res.status(200).json(path);
}
