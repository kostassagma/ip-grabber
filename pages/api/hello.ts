// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { SignJWT, jwtVerify } from "jose";
import { JWT_SECRET_KEY } from "../../lib/constants";
import checkParamPresence from "../../lib/checkParamPresence";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const [err, {a, b, c}] = checkParamPresence(["a", "b", "c"], req, res, "GET")
  if (err) return
  res.status(200).json({ name: "John Doe" });
}
