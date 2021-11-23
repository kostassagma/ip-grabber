import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";
import CheckForAuth from "../../middleware/authOnly";

export async function middleware(req: NextRequest) {
  const { search } = req.nextUrl;
  if (!search.includes("remove")) {
    try {
      await CheckForAuth(req);
      return NextResponse.redirect("/dash");
    } catch (e) {}
  }
}
