// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from 'request-ip'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const detectedIp = requestIp.getClientIp(req)

  res.status(200).json({ detectedIp  });
}
