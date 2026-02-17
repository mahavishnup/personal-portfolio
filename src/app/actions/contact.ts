'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/auth'

export async function submitContactAction(
  prevState: unknown,
  formData: FormData
) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string
  const honeypot = formData.get('website') as string

  // Honeypot anti-spam: if this hidden field is filled, it's a bot
  if (honeypot) {
    // Silently pretend success so bots think they succeeded
    return { success: true, error: null }
  }

  if (!name || !email || !message) {
    return { error: 'All fields are required', success: false }
  }

  try {
    // Save to database
    await prisma.message.create({
      data: {
        name,
        email,
        message,
      },
    })

    // Simulate email sending (Log to console)
    console.log(
      `[Email Sent] To: admin@mahavishnu.com | From: ${email} | Subject: New Contact Form Submission`
    )
    console.log(`Message: ${message}`)

    return { success: true, error: null }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      error: 'Failed to send message. Please try again later.',
      success: false,
    }
  }
}

export async function deleteMessageAction(id: string) {
  const session = await getSession()
  if (!session) {
    return { error: 'Unauthorized' }
  }

  try {
    await prisma.message.delete({
      where: { id },
    })
    revalidatePath('/admin/messages')
    return { success: true }
  } catch (error) {
    console.error('Delete message error:', error)
    return { error: 'Failed to delete message' }
  }
}
