import { NextRequest, NextResponse } from "next/server";
import CheckForAuth from "../../middleware/authOnly";

export async function middleware(req: NextRequest) {
  try {
    return await CheckForAuth(req)
  } catch(e) {
    return NextResponse.redirect("/login?remove")
  }
}
