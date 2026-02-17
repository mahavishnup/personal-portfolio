import { ExperienceTimeline } from '@/components/about/experience-timeline'
import { Button } from '@/components/ui/button'
import { Download, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About Us',
  description:
    'Senior Laravel-focused Full-Stack Developer with 5+ years of experience. Learn about my journey, skills, and professional experience.',
  openGraph: {
    title: 'About Mahavishnu',
    description:
      'Senior Full-Stack Developer with 5+ years building scalable web solutions.',
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 pb-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
            About Me
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
            Passionate about building scalable, high-performance web
            applications. Bridging the gap between robust backend architecture
            and modern frontend experiences.
          </p>
        </div>

        {/* Profile Section */}
        <div className="mb-24 grid items-center gap-12 md:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="from-primary absolute inset-0 rotate-3 rounded-3xl bg-linear-to-tr to-purple-500 opacity-20 blur-2xl"></div>
            <div className="border-muted bg-muted relative h-full w-full overflow-hidden rounded-3xl border-2">
              {/* Placeholder for actual profile image */}
              <Image
                src="/profile-1.jpeg" // Ensure this exists or fallback
                alt="Mahavishnu"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">The Journey</h2>
            <div className="text-muted-foreground space-y-4 text-lg">
              <p>
                Hello! I&apos;m Mahavishnu, a Full-Stack Developer based in
                Tamil Nadu, India. My coding journey started during my B.Tech in
                Information Technology at Paavai Engineering College (2017–21),
                where I fell in love with building things for the web.
              </p>
              <p>
                After interning at Byrut Business Solutions, I went on to
                deliver 20+ client-facing tourism and e-commerce projects there
                over nearly four years — including a booking platform for
                hotels, ferries, cabs, and boats used by 25,000+ users/month.
              </p>
              <p>
                Since Jul 2024, I&apos;ve been at Hectadata Pvt Ltd (Malaysia,
                remote), building enterprise-grade applications with Laravel,
                FastAPI, and React.js. I&apos;m passionate about clean
                architecture, payment integrations, WhatsApp automation, and
                CI/CD pipelines.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/contact-us">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <Link href="/Mahavishnu_P_CV.pdf" target="_blank" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:ml-[15%] md:text-left">
            Professional Experience
          </h2>
          <ExperienceTimeline />
        </div>
      </div>
    </main>
  )
}
