import { BlogEditor } from '@/components/admin/blog-editor'
import { createBlogAction } from '@/app/actions/blog'

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
      </div>
      <BlogEditor action={createBlogAction} />
    </div>
  )
}
