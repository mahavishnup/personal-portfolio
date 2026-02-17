import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { projects } from '@/lib/static-data'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) return { title: 'Project Not Found' }

  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://mahavishnudevhub.com'

  return {
    title: project.title,
    description: project.description?.slice(0, 160),
    openGraph: {
      title: `${project.title} | Mahavishnu`,
      description: project.description?.slice(0, 160),
      type: 'article',
      url: `${BASE_URL}/projects/${project.slug}`,
      images: project.coverImage
        ? [{ url: project.coverImage, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description?.slice(0, 160),
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  const techStack = project.techStack || []

  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://mahavishnudevhub.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: `${BASE_URL}/projects/${project.slug}`,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    ...(project.coverImage && { image: project.coverImage }),
    author: {
      '@type': 'Person',
      name: 'Mahavishnu',
      url: BASE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen py-20 pb-32">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          {/* Back Button */}
          <Button
            asChild
            variant="ghost"
            className="mb-8 rounded-full"
            size="sm"
          >
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          {/* Cover Image */}
          {project.coverImage && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Title & Tech Stack */}
          <h1 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl">
            {project.title}
          </h1>

          {techStack.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {techStack.map((tech: string) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mb-10 flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button asChild className="rounded-full">
                <Link href={project.liveUrl} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" className="rounded-full">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown>{project.description || ''}</ReactMarkdown>
          </div>
        </div>
      </main>
    </>
  )
}
