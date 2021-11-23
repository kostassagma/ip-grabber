import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";
import { API } from "../../../lib/constants";

export async function middleware(req: NextRequest) {
  const ip = req.ip?req.ip:"127.0.0.1"
  const id = req.page!.params!.room
  
  return NextResponse.redirect(`${API}/l?ip=${ip}&id=${id}`)
}
