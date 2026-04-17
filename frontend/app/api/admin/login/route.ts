import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("is_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return response;
}
