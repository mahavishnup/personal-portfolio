import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  // Create Admin User
  const user = await prisma.user.upsert({
    where: { email: 'admin@mahavishnu.tech' },
    update: {},
    create: {
      email: 'admin@mahavishnu.tech',
      name: 'Mahavishnu',
      password: 'hashed_password_here', // In real app, hash this!
      role: 'ADMIN',
    },
  })

  // Create Dummy Projects
  await prisma.project.createMany({
    data: [
      {
        title: 'E-Commerce Platform',
        slug: 'e-commerce-platform',
        description: 'A full-featured e-commerce platform built with Next.js and Stripe.',
        techStack: { frontend: 'Next.js', backend: 'Node.js', db: 'PostgreSQL' },
        featured: true,
        coverImage: '/projects/ecommerce.jpg',
      },
      {
        title: 'AI Chatbot',
        slug: 'ai-chatbot',
        description: 'An AI-powered chatbot using OpenAI API.',
        techStack: { frontend: 'React', ai: 'OpenAI', backend: 'Python' },
        featured: true,
        coverImage: '/projects/chatbot.jpg',
      },
      {
        title: 'Portfolio Website',
        slug: 'portfolio-website',
        description: 'My personal portfolio website using 3D elements.',
        techStack: { frontend: 'Next.js', library: 'Three.js' },
        featured: false,
        coverImage: '/projects/portfolio.jpg',
      },
    ],
    skipDuplicates: true,
  })

  // Create Dummy Blogs
  await prisma.blog.createMany({
    data: [
      {
        title: 'Getting Started with Next.js 16',
        slug: 'getting-started-nextjs-16',
        excerpt: 'Everything you need to know about the new features in Next.js 16.',
        content: '# Next.js 16 is here...\n\nIt introduces amazing features like...',
        published: true,
        tags: ['Next.js', 'React', 'Web Development'],
      },
      {
        title: 'Mastering Tailwind CSS',
        slug: 'mastering-tailwind-css',
        excerpt: 'Tips and tricks to write cleaner CSS with Tailwind.',
        content: '# Tailwind CSS\n\nUtility-first CSS framework...',
        published: true,
        tags: ['CSS', 'Tailwind'],
      },
    ],
    skipDuplicates: true,
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
