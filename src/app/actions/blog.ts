'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

// Helper to check auth
async function checkAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return session
}

export async function createBlogAction(prevState: unknown, formData: FormData) {
  await checkAuth()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const coverImage = formData.get('coverImage') as string
  const tagsString = formData.get('tags') as string
  const published = formData.get('published') === 'on'

  if (!title || !slug || !content) {
    return { error: 'Title, slug, and content are required' }
  }

  // Parse tags (comma separated)
  const tags = tagsString
    ? tagsString
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : []

  try {
    await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags,
        published,
      },
    })
  } catch (error) {
    console.error('Create blog error:', error)
    return { error: 'Failed to create post. Slug might be taken.' }
  }

  revalidatePath('/blogs')
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

export async function updateBlogAction(prevState: unknown, formData: FormData) {
  await checkAuth()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const coverImage = formData.get('coverImage') as string
  const tagsString = formData.get('tags') as string
  const published = formData.get('published') === 'on'

  if (!id || !title || !slug || !content) {
    return { error: 'Missing required fields' }
  }

  const tags = tagsString
    ? tagsString
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : []

  try {
    await prisma.blog.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags,
        published,
      },
    })
  } catch (error) {
    console.error('Update blog error:', error)
    return { error: 'Failed to update post.' }
  }

  revalidatePath('/blogs')
  revalidatePath(`/blogs/${slug}`)
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

export async function deleteBlogAction(id: string) {
  await checkAuth()

  try {
    await prisma.blog.delete({
      where: { id },
    })
    revalidatePath('/blogs')
    revalidatePath('/admin/blogs')
    return { success: true }
  } catch (error) {
    console.error('Delete blog error:', error)
    return { error: 'Failed to delete post' }
  }
}

export async function clearBlogCoverImage(blogId: string) {
  await checkAuth()

  try {
    await prisma.blog.update({
      where: { id: blogId },
      data: { coverImage: '' },
    })
    revalidatePath('/blogs')
    revalidatePath('/admin/blogs')
  } catch (error) {
    console.error('Clear cover image error:', error)
  }
}
