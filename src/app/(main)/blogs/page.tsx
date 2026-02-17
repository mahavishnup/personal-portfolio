import { prisma } from '@/lib/prisma'
import { BlogFilter } from '@/components/blog/blog-filter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Coding insights, Laravel deep dives, architecture guides, and web development tutorials by Mahavishnu.',
  openGraph: {
    title: 'Blog — Mahavishnu',
    description:
      'Tutorials, architecture guides, and insights on Laravel, Next.js, and full-stack development.',
  },
}

async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return blogs
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs()

  // Extract all unique tags
  const allTags = Array.from(
    new Set(
      blogs.flatMap((blog) =>
        Array.isArray(blog.tags) ? (blog.tags as string[]) : []
      )
    )
  ).sort()

  return (
    <main className="container mx-auto min-h-screen px-4 py-20 md:px-6">
      <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
          The Blog
        </h1>
        <p className="text-muted-foreground max-w-2xl md:text-xl/relaxed">
          Sharing my journey, tutorials, and technical deep dives into the world
          of full-stack development.
        </p>
      </div>

      <BlogFilter blogs={blogs} allTags={allTags} />
    </main>
  )
}
