import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // `cors` also takes care of handling OPTIONS requests
  // console.log("hello");
  return new Response(req.ip)
  
}
