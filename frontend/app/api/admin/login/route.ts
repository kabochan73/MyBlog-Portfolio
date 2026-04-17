import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${process.env.API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("is_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
