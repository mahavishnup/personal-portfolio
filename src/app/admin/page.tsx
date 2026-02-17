import {
  getDashboardStats,
  getMonthlyContentCreation,
  getRecentMessages,
} from '@/app/actions/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Overview } from '@/components/admin/overview'
import { RecentMessages } from '@/components/admin/recent-messages'
import {
  FileText,
  FolderKanban,
  MessageSquare,
  Mail,
  Briefcase,
} from 'lucide-react'

export default async function DashboardPage() {
  const [stats, monthlyData, recentMessages] = await Promise.all([
    getDashboardStats(),
    getMonthlyContentCreation(),
    getRecentMessages(),
  ])

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogsCount}</div>
            <p className="text-muted-foreground text-xs">
              Published & draft posts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderKanban className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projectsCount}</div>
            <p className="text-muted-foreground text-xs">Showcased projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messagesCount}</div>
            <p className="text-muted-foreground text-xs">
              Contact form submissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Mail className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newsletterCount}</div>
            <p className="text-muted-foreground text-xs">
              Newsletter subscribers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Briefcase className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.servicesCount}</div>
            <p className="text-muted-foreground text-xs">Active services</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Content Overview</CardTitle>
            <p className="text-muted-foreground text-sm">
              Blogs & Projects created per month this year
            </p>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={monthlyData} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <p className="text-muted-foreground text-sm">
              {stats.messagesCount > 0
                ? `You have ${stats.messagesCount} message${stats.messagesCount !== 1 ? 's' : ''} total.`
                : 'No messages yet.'}
            </p>
          </CardHeader>
          <CardContent>
            <RecentMessages messages={recentMessages} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
