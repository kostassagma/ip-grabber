import { NextRequest, NextResponse } from "next/server";
import { API } from "../../../lib/constants";

export async function middleware(req: NextRequest) {
  const id = req.page!.params!.room
  
  return NextResponse.redirect(`${API}/l?id=${id}`)
}
