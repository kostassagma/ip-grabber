// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import checkParamPresence from "../../lib/checkParamPresence";
import { jwtVerify } from "jose";
import { JWT_SECRET_KEY } from "../../lib/constants";
import { serialize } from "cookie";

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
  // console.log(token);
  try {
    const { payload, protectedHeader } = await jwtVerify(
      jit,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );
    console.log(payload);
    console.log(protectedHeader);
    return res.status(200).send({userId: payload.user})
  } catch (err) {
    res.setHeader(
      "Set-Cookie",
      serialize("jit", "", { maxAge: -1, path: "/" })
    );
    return res.status(401).send({ Err: "Not Authenticated" });
  }

  // console.log(a);

  // return res.status(200).json({ name: "John Doe" });
}
