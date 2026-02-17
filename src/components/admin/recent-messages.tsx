import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Message } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'

interface RecentMessagesProps {
  messages: Message[]
}

export function RecentMessages({ messages }: RecentMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="text-muted-foreground flex items-center justify-center p-8">
        No recent messages
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {messages.map((message) => (
        <div key={message.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${message.name}`}
              alt={message.name}
            />
            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm leading-none font-medium">{message.name}</p>
            <p className="text-muted-foreground text-sm">{message.email}</p>
          </div>
          <div className="text-muted-foreground ml-auto text-sm">
            {formatDistanceToNow(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
