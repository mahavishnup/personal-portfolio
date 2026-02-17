// ─── Static Projects & Services ─────────────────────────────────────
// These are hardcoded instead of DB-backed to save free-tier usage.
// Edit this file directly to add / remove / update items.

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  coverImage: string
  featured: boolean
  createdAt: string // ISO date string for compatibility
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  features: string[]
}

// ─── Projects ───────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: '1',
    title: 'Hotel & Ferry Booking Platform',
    slug: 'hotel-ferry-booking-platform',
    description:
      'A production booking platform for hotels, ferries, cabs, and boats serving 25,000+ users/month. Features multi-property management, real-time availability, Razorpay payment integration, WhatsApp booking confirmations, and a full admin dashboard.',
    techStack: [
      'Laravel',
      'React.js',
      'Inertia.js',
      'MySQL',
      'Razorpay',
      'DigitalOcean',
    ],
    coverImage: '',
    featured: true,
    createdAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Water Distribution & Quality Assurance',
    slug: 'water-distribution-quality-assurance',
    description:
      'A Laravel-based system for tracking water distribution logistics and monitoring quality assurance metrics. Includes GIS mapping, quality test reporting, and automated alerts for compliance.',
    techStack: ['Laravel', 'Blade', 'MySQL', 'Bootstrap'],
    githubUrl:
      'https://github.com/mahavishnup/water-distribution-and-quality-assurance',
    coverImage: '',
    featured: true,
    createdAt: '2022-06-10T00:00:00Z',
  },
  {
    id: '3',
    title: 'Face Unlock Web App',
    slug: 'face-unlock-webapp',
    description:
      'A real-time face detection web application using ReactJS + PostgreSQL. Implements multi-frame face detection and verification to securely unlock web app login sessions.',
    techStack: ['ReactJS', 'PostgreSQL', 'JavaScript', 'Web APIs'],
    githubUrl: 'https://github.com/mahavishnup/face-unlock-webapp',
    coverImage: '',
    featured: true,
    createdAt: '2021-03-20T00:00:00Z',
  },
  {
    id: '4',
    title: 'Private & Anonymous Search Engine',
    slug: 'private-anonymous-search-engine',
    description:
      'A privacy-focused internal search app designed to protect user and organisation data while searching. Features anonymous browsing, encrypted queries, and zero-logging architecture.',
    techStack: ['PHP', 'MySQL', 'JavaScript'],
    githubUrl:
      'https://github.com/mahavishnup/private-and-anonymous-search-engine',
    coverImage: '',
    featured: false,
    createdAt: '2021-02-15T00:00:00Z',
  },
  {
    id: '5',
    title: 'PHP Library Management System',
    slug: 'php-library-management-system',
    description:
      'A clean admin panel for book tracking and lending. Features book cataloguing, member management, borrowing history, and due-date alerts.',
    techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    githubUrl: 'https://github.com/mahavishnup',
    coverImage: '',
    featured: false,
    createdAt: '2020-11-10T00:00:00Z',
  },
  {
    id: '6',
    title: 'NLP Based Chatbot',
    slug: 'nlp-based-chatbot',
    description:
      'An intelligent chatbot powered by Natural Language Processing. Understands user intent, handles multi-turn conversations, and provides contextual responses.',
    techStack: ['JavaScript', 'NLP', 'Node.js'],
    githubUrl: 'https://github.com/mahavishnup/NLP-based-chatbot',
    coverImage: '',
    featured: false,
    createdAt: '2020-09-05T00:00:00Z',
  },
]

// ─── Services ───────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id: 'full-stack',
    title: 'Full-Stack Web App Development',
    slug: 'full-stack-web-app-development',
    description:
      'End-to-end development of scalable web applications using Laravel, React.js, Inertia.js, or Next.js stack.',
    icon: 'Globe',
    features: [
      'Custom SaaS Platforms',
      'E-commerce Solutions',
      'CMS Development',
      'Real-time Applications',
    ],
  },
  {
    id: 'laravel',
    title: 'Laravel Architecture & APIs',
    slug: 'laravel-architecture-apis',
    description:
      'Robust backend systems built with Laravel. Focusing on performance, security, and clean architecture patterns.',
    icon: 'Server',
    features: [
      'RESTful APIs',
      'Database Design (MySQL/PostgreSQL)',
      'Job Queues & Caching',
      'Third-party Integrations',
    ],
  },
  {
    id: 'frontend',
    title: 'Modern Frontend Engineering',
    slug: 'modern-frontend-engineering',
    description:
      'Crafting pixel-perfect, responsive, and accessible user interfaces using React, Next.js, and Tailwind CSS.',
    icon: 'Layout',
    features: [
      'Single Page Applications (SPA)',
      'Server Side Rendering (SSR)',
      'Interactive UI/UX',
      'Performance Optimization',
    ],
  },
  {
    id: 'consulting',
    title: 'Technical Consulting & Code Review',
    slug: 'technical-consulting-code-review',
    description:
      'Helping businesses make the right technology choices and improving existing codebases for better maintainability.',
    icon: 'Code2',
    features: [
      'System Architecture Design',
      'Code Audits & Refactoring',
      'Performance Tuning',
      'DevOps & Deployment Strategy',
    ],
  },
]
