import Hero from '@/components/home/hero'
import About from '@/components/home/about'
import Projects from '@/components/home/projects'
import SkillsServices from '@/components/home/skills-services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mahavishnu — Engineering Scalable Web Solutions',
  description:
    'Senior Laravel-focused Full-Stack Developer with 5+ years of experience building scalable web applications. View my portfolio, projects, and blog.',
  openGraph: {
    title: 'Mahavishnu — Engineering Scalable Web Solutions',
    description:
      'Senior Full-Stack Developer specializing in Laravel, Next.js, and modern web architecture.',
  },
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About />
      <Projects />
      <SkillsServices />
    </main>
  )
}
