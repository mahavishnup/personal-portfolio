'use server'

import { prisma } from '@/lib/prisma'
import { projects } from '@/lib/static-data'

export async function getDashboardStats() {
  const [blogsCount, messagesCount, newsletterCount] = await Promise.all([
    prisma.blog.count(),
    prisma.message.count(),
    prisma.newsletter.count(),
  ])

  return {
    blogsCount,
    projectsCount: projects.length,
    messagesCount,
    newsletterCount,
    servicesCount: 4,
  }
}

export async function getMonthlyContentCreation() {
  const currentYear = new Date().getFullYear()
  const startDate = new Date(currentYear, 0, 1)
  const endDate = new Date(currentYear, 11, 31)

  const blogs = await prisma.blog.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      createdAt: true,
    },
  })

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const data = months.map((month, index) => {
    const blogsInMonth = blogs.filter(
      (blog) => blog.createdAt.getMonth() === index
    ).length

    return {
      name: month,
      blogs: blogsInMonth,
      projects: 0,
    }
  })

  return data
}

export async function getRecentMessages() {
  return await prisma.message.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  })
}
