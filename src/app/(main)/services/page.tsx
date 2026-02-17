import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import {
  Code2,
  Globe,
  Layout,
  Server,
  CheckCircle2,
  Briefcase,
  Wrench,
  Cpu,
  Palette,
  Database,
  Shield,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { services } from '@/lib/static-data'

export const metadata = {
  title: 'Services',
  description:
    'Professional web development services including Full-Stack apps, Laravel architecture, APIs, and technical consulting.',
  openGraph: {
    title: 'Services — Mahavishnu',
    description:
      'Full-Stack development, Laravel APIs, frontend engineering, and technical consulting.',
  },
}

// Map of icon name strings to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="text-primary h-10 w-10" />,
  Server: <Server className="text-primary h-10 w-10" />,
  Layout: <Layout className="text-primary h-10 w-10" />,
  Code2: <Code2 className="text-primary h-10 w-10" />,
  Briefcase: <Briefcase className="text-primary h-10 w-10" />,
  Wrench: <Wrench className="text-primary h-10 w-10" />,
  Cpu: <Cpu className="text-primary h-10 w-10" />,
  Palette: <Palette className="text-primary h-10 w-10" />,
  Database: <Database className="text-primary h-10 w-10" />,
  Shield: <Shield className="text-primary h-10 w-10" />,
  Zap: <Zap className="text-primary h-10 w-10" />,
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen py-20 pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
            My Services
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl md:text-xl/relaxed">
            I help businesses and individuals turn their ideas into reality with
            high-quality, scalable code.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <Card
              key={service.id}
              className="border-muted/50 hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="bg-primary/10 mb-4 inline-block rounded-2xl p-3">
                  {iconMap[service.icon] || (
                    <Globe className="text-primary h-10 w-10" />
                  )}
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary/5 border-primary/20 mt-20 rounded-3xl border p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to start your project?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            Let&apos;s collaborate to build something amazing. I&apos;m
            currently open for freelance projects and consulting opportunities.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-8 text-lg"
            >
              <Link href="/contact-us">Get a Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full px-8 text-lg"
            >
              <Link href="/projects">View Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
