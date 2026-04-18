import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();

  revalidatePath("/");
  if (slug) {
    revalidatePath(`/posts/${slug}`);
  }

  return NextResponse.json({ revalidated: true });
}
