// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ip = req.headers.get?('x-forwarded-for'):"localhost"
  
  res.status(200).json({ ip })
}
