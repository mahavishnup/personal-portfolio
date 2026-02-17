'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

// Public action — subscribe from footer
export async function subscribeNewsletter(
  prevState: unknown,
  formData: FormData
) {
  const email = formData.get('email') as string

  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' }
  }

  try {
    await prisma.newsletter.create({
      data: { email: email.toLowerCase().trim() },
    })
    revalidatePath('/admin/newsletters')
    return { success: 'Thanks for subscribing!' }
  } catch {
    return { error: 'This email is already subscribed.' }
  }
}

// Admin actions
async function checkAuth() {
  const session = await getSession()
  if (!session) redirect('/login')
  return session
}

export async function getNewsletters() {
  await checkAuth()
  return prisma.newsletter.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function deleteNewsletterAction(id: string) {
  await checkAuth()
  try {
    await prisma.newsletter.delete({ where: { id } })
    revalidatePath('/admin/newsletters')
    return { success: true }
  } catch {
    return { error: 'Failed to delete subscriber.' }
  }
}
