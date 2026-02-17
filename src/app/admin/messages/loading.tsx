import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function MessagesLoading() {
  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-36" />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b pb-4">
              <Skeleton className="h-4 w-1/5" />
              <Skeleton className="h-4 w-1/5" />
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-4 w-1/6" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-2">
                <Skeleton className="h-4 w-1/5" />
                <Skeleton className="h-4 w-1/5" />
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="h-4 w-1/6" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
