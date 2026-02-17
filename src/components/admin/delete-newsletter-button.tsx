'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeleteNewsletterButtonProps {
  id: string
  deleteAction: (id: string) => Promise<{ success?: boolean; error?: string }>
}

export function DeleteNewsletterButton({
  id,
  deleteAction,
}: DeleteNewsletterButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Remove this subscriber?')) return
    setLoading(true)
    await deleteAction(id)
    router.refresh()
    setLoading(false)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={loading}
      className="text-destructive hover:text-destructive"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
