import { BlogEditor } from '@/components/admin/blog-editor'
import { updateBlogAction } from '@/app/actions/blog'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface EditBlogPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params
  const post = await prisma.blog.findUnique({
    where: { id },
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
      </div>
      <BlogEditor post={post} action={updateBlogAction} />
    </div>
  )
}
