import AdminHeader from '@/app/_components/admin/AdminHeader'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <AdminHeader />
      <div className="mx-auto max-w-5xl px-4 py-8">
        {children}
      </div>
    </div>
  )
}
