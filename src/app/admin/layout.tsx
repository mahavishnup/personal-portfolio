import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/admin/app-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'
import { AdminFooter } from '@/components/admin/admin-footer'
import { cookies } from 'next/headers'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const sidebarState = cookieStore.get('sidebar:state')
  const defaultOpen = sidebarState ? sidebarState.value === 'true' : true

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex min-h-screen w-full flex-col">
        <AdminHeader />
        <div className="flex-1 p-4 md:p-6">{children}</div>
        <AdminFooter />
      </main>
    </SidebarProvider>
  )
}
