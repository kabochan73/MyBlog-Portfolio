import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const response = NextResponse.json({ ok: true });
  response.cookies.set("is_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  response.cookies.set("admin_token", token, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });
  return response;
}
