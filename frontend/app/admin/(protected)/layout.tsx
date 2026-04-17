import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminHeader from "@/components/admin/AdminHeader";
import { apiFetch } from "@/lib/api";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    await apiFetch("/admin/posts", { headers: { Cookie: cookieHeader } });
  } catch {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminHeader />
      <main className="max-w-4xl mx-auto px-4 py-10 w-full">{children}</main>
    </>
  );
}
