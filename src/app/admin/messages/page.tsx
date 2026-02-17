import { prisma } from '@/lib/prisma'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteMessageButton } from '@/components/admin/delete-message-button'

async function getMessages() {
  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return messages
}

export default async function AdminMessagesPage() {
  const messages = await getMessages()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No messages found.
                </TableCell>
              </TableRow>
            ) : (
              messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{msg.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {msg.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md truncate">
                    {msg.message}
                  </TableCell>
                  <TableCell>
                    {new Date(msg.createdAt).toLocaleDateString()}{' '}
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteMessageButton id={msg.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
