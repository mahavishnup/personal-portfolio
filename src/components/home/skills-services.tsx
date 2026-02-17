import { Badge } from '@/components/ui/badge'
import { Code2, Database, Layout, Server, ArrowUpRight } from 'lucide-react'

const skills = [
  'Laravel',
  'PHP',
  'Livewire',
  'FilamentPHP',
  'React.js',
  'Next.js',
  'Inertia.js',
  'TypeScript',
  'Python',
  'FastAPI',
  'Tailwind CSS',
  'Bootstrap',
  'jQuery',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Git',
  'Docker',
  'DigitalOcean',
  'REST APIs',
  'Supabase',
  'Prisma',
]

const services = [
  {
    title: 'Full-Stack Development',
    description:
      'Building robust, scalable web applications from concept to deployment using Laravel and Next.js.',
    icon: <Code2 className="h-6 w-6" />,
    gradient: 'from-violet-500 to-purple-600',
    num: '01',
  },
  {
    title: 'API Design & Integration',
    description:
      'Designing RESTful and GraphQL APIs that are secure, documented, and high-performing.',
    icon: <Server className="h-6 w-6" />,
    gradient: 'from-blue-500 to-cyan-500',
    num: '02',
  },
  {
    title: 'Database Architecture',
    description:
      'Optimizing database schemas and queries for speed and reliability using PostgreSQL and MySQL.',
    icon: <Database className="h-6 w-6" />,
    gradient: 'from-emerald-500 to-teal-500',
    num: '03',
  },
  {
    title: 'Frontend Engineering',
    description:
      'Creating responsive, interactive, and accessible user interfaces with React and Tailwind CSS.',
    icon: <Layout className="h-6 w-6" />,
    gradient: 'from-orange-500 to-rose-500',
    num: '04',
  },
]

export default function SkillsServices() {
  return (
    <section
      id="services"
      className="bg-muted/30 relative max-w-full overflow-hidden py-24"
    >
      {/* Background Gradients */}
      <div className="bg-primary/20 absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/20 opacity-30 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="from-foreground to-muted-foreground bg-linear-to-r bg-clip-text text-3xl font-bold tracking-tighter text-transparent md:text-5xl">
            Skills & Services
          </h2>
          <p className="text-muted-foreground max-w-xl md:text-xl/relaxed">
            Leveraging cutting-edge technologies to deliver exceptional digital
            solutions.
          </p>
        </div>

        {/* Skills Marquee */}
        <div className="mx-auto mb-12 w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] md:mb-16">
          <div className="animate-infinite-scroll flex w-max gap-2 hover:[animation-play-state:paused] md:gap-4">
            {[...skills, ...skills, ...skills].map((skill, i) => (
              <Badge
                key={`${skill}-${i}`}
                variant="secondary"
                className="bg-background/50 border-primary/20 hover:border-primary/50 cursor-default px-3 py-1.5 text-sm font-medium whitespace-nowrap backdrop-blur-sm transition-colors md:px-4 md:py-2 md:text-base"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card hover:border-primary/30 hover:shadow-primary/5 relative overflow-hidden rounded-xl border px-5 py-5 transition-all duration-300 hover:shadow-xl md:p-6"
            >
              {/* Gradient top bar */}
              <div
                className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${service.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              {/* Number */}
              <span className="text-muted-foreground/20 group-hover:text-primary/10 absolute top-3 right-4 text-4xl font-black transition-colors md:top-4 md:right-6 md:text-5xl">
                {service.num}
              </span>

              {/* Icon */}
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${service.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="group-hover:text-primary mb-2 text-xl font-semibold transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Arrow indicator */}
              <div className="text-muted-foreground/40 group-hover:text-primary mt-4 transition-all duration-300 group-hover:translate-x-1">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
