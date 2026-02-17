'use client'

import { useActionState, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Loader2 } from 'lucide-react'
import type { Prisma } from '@prisma/client'

type BlogWithTags = Prisma.BlogGetPayload<object>

import { ImageUpload } from '@/components/admin/image-upload'
import { MarkdownEditor } from '@/components/admin/markdown-editor'
import { clearBlogCoverImage } from '@/app/actions/blog'

interface BlogEditorProps {
  post?: BlogWithTags
  action: (
    prevState: unknown,
    formData: FormData
  ) => Promise<{ error?: string }>
}

export function BlogEditor({ post, action }: BlogEditorProps) {
  const initialState = { error: undefined as string | undefined }
  const [state, formAction, isPending] = useActionState(action, initialState)
  const [coverImage, setCoverImage] = useState(post?.coverImage || '')

  return (
    <form action={formAction} className="mx-auto max-w-4xl space-y-8 pb-20">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Post Title"
            defaultValue={post?.title}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            placeholder="post-url-slug"
            defaultValue={post?.slug}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            placeholder="Short description for the card..."
            defaultValue={post?.excerpt || ''}
            rows={2}
          />
        </div>

        <div className="grid gap-2">
          <Label>Cover Image</Label>
          <input type="hidden" name="coverImage" value={coverImage} />
          <ImageUpload
            bucket="portfolio-assets"
            folder="blog-covers"
            modelId={post?.id}
            defaultImage={coverImage}
            onUpload={setCoverImage}
            onRemoveFromDb={
              post ? () => clearBlogCoverImage(post.id) : undefined
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            name="tags"
            placeholder="Next.js, React, Tutorial"
            defaultValue={
              Array.isArray(post?.tags)
                ? (post.tags as string[]).join(', ')
                : ''
            }
          />
        </div>

        <div className="grid gap-2">
          <Label>Content (Markdown)</Label>
          <MarkdownEditor name="content" defaultValue={post?.content || ''} />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            name="published"
            defaultChecked={post?.published}
          />
          <Label htmlFor="published">Published</Label>
        </div>

        {state?.error && (
          <p className="text-destructive text-sm font-medium">{state.error}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button disabled={isPending} type="submit">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  )
}
