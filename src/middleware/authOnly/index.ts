import { serialize } from "cookie";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { JWT_SECRET_KEY } from "../../lib/constants";
import getJWTKey from "../../lib/getJWTKey";

export default async function CheckForAuth(req: NextRequest) {
  console.log("HEllo World");
  const jit = req.cookies["jit"];
  console.log(jit);

  if (!jit) {
    throw new Error()
  }
  try {
    const { payload, protectedHeader } = await jwtVerify(
      jit,
      getJWTKey()
    );
    if (!payload.user) {
      throw new Error("user missing from");
    }
  } catch (err) {
    throw new Error()
  }
  return null;
}
