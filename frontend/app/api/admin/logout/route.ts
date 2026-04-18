import { NextResponse } from "next/server";

export async function POST() {
  await fetch(`${process.env.API_URL}/admin/logout`, {
    method: "POST",
    credentials: "include",
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.delete("is_admin");
  response.cookies.delete("admin_token");

  return response;
}
