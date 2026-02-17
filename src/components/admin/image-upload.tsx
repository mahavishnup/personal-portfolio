'use client'

import { useState, useTransition } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Upload, X } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  bucket: string
  folder?: string
  modelId?: string // use model ID as filename to avoid duplicates
  defaultImage?: string
  onUpload: (url: string) => void
  onRemoveFromDb?: () => Promise<void> // auto-save empty URL to DB on remove
}

export function ImageUpload({
  bucket,
  folder = '',
  modelId,
  defaultImage,
  onUpload,
  onRemoveFromDb,
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImage)
  const [isUploading, startTransition] = useTransition()
  const supabase = createClient()

  const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1 MB

  // Helper: extract storage path from a public URL
  const getStoragePath = (url: string): string | null => {
    const parts = url.split(`/storage/v1/object/public/${bucket}/`)
    return parts.length === 2 ? parts[1] : null
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be under 1 MB')
      e.target.value = ''
      return
    }

    startTransition(async () => {
      try {
        // Delete old image from storage before uploading new one
        if (imageUrl) {
          const oldPath = getStoragePath(imageUrl)
          if (oldPath) {
            await supabase.storage.from(bucket).remove([oldPath])
          }
        }

        const fileExt = file.name.split('.').pop()
        // Use modelId for deterministic filename, fallback to random
        const fileName = modelId
          ? `${modelId}.${fileExt}`
          : `${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = folder ? `${folder}/${fileName}` : fileName

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, { upsert: true })

        if (uploadError) {
          throw uploadError
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

        setImageUrl(data.publicUrl)
        onUpload(data.publicUrl)
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Error uploading image')
      }
    })
  }

  const handleRemove = async () => {
    if (imageUrl) {
      try {
        const oldPath = getStoragePath(imageUrl)
        if (oldPath) {
          await supabase.storage.from(bucket).remove([oldPath])
        }
      } catch (error) {
        console.error('Error deleting image from storage:', error)
      }
    }
    setImageUrl(undefined)
    onUpload('')

    // Auto-save empty URL to DB so it stays in sync
    if (onRemoveFromDb) {
      await onRemoveFromDb()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {imageUrl ? (
          <div className="relative aspect-video w-40 overflow-hidden rounded-md border">
            <Image
              src={imageUrl}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
            <button
              onClick={handleRemove}
              className="bg-destructive hover:bg-destructive/90 absolute top-1 right-1 rounded-full p-1 text-white shadow-sm"
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="bg-muted/50 flex aspect-video w-40 items-center justify-center rounded-md border border-dashed">
            <Upload className="text-muted-foreground h-6 w-6" />
          </div>
        )}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image-upload">Cover Image</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </div>
      </div>
      {isUploading && (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Loader2 className="h-3 w-3 animate-spin" />
          Uploading...
        </div>
      )}
    </div>
  )
}
