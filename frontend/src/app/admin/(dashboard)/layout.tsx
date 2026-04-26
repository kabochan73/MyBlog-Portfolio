import AdminHeader from '@/app/_components/admin/AdminHeader'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminHeader />
      <div className="mx-auto max-w-5xl px-4 py-8">
        {children}
      </div>
    </div>
  )
}
