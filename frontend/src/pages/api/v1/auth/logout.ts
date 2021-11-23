// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import checkParamPresence from "../../../../lib/checkParamPresence";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Chacking Method And Parameters
  const [err] = checkParamPresence([], req, res, "POST");
  if (err) return
  res.setHeader("Set-Cookie", serialize("jit", "", { maxAge: -1, path: "/" }));
  res.status(200).send({ OK: "Logged Out" });
}
