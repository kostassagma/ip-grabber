import { NextApiRequest, NextApiResponse } from "next";

type response = [boolean, any];

export default function checkParamPresence(
  params: string[],
  req: NextApiRequest,
  res: NextApiResponse,
  method: "GET" | "POST"
): response {
  // Checking If Method Is Acceptable
  if (req.method !== method) {
    res.status(405).json({ Err: `This route accepts ${method} requests only` });
    return [true, {}];
  }

  // Checking if parameters are present
  if (method === "GET") {
    // Checking Url Parameters for GET requests
    params.map((param) => {
      let arg = req.query[param];
      if (!arg) {
        res.status(400).json({ Err: `${param} missing` });
        return [true, {}];
      }
    });
  } else {
    // Checking Body for POST/UPDATE/DELETE requests
    params.map((param) => {
      let arg = req.body[param];
      if (!arg) {
        res.status(400).json({ Err: `${param} missing` });
        return [true, {}];
      }
    });
  }
  return [false, { ...req.body }];
}
