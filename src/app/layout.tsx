import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { env } from '@/env'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const BASE_URL = env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Mahavishnu — Senior Full-Stack Developer',
    template: '%s | Mahavishnu',
  },
  description:
    'Senior Full-Stack Developer with 5+ years building scalable booking platforms, SaaS apps, and e-commerce solutions with Laravel, React, Next.js & FastAPI.',
  keywords: [
    'Laravel Developer',
    'Full-Stack Developer',
    'PHP Developer',
    'Next.js Developer',
    'React Developer',
    'FastAPI Developer',
    'Python Developer',
    'Booking Platform',
    'Tourism',
    'Travel',
    'E-commerce',
    'SaaS',
    'Razorpay',
    'Inertia.js',
    'DigitalOcean',
    'Mahavishnu',
    'Tamil Nadu',
  ],
  authors: [{ name: 'Mahavishnu', url: BASE_URL }],
  creator: 'Mahavishnu',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Mahavishnu — DevHub',
    title: 'Mahavishnu — Senior Full-Stack Developer',
    description:
      'Senior Full-Stack Developer with 5+ years building booking platforms, SaaS apps & e-commerce solutions.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Mahavishnu — Engineering Scalable Web Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahavishnu — Engineering Scalable Web Solutions',
    description:
      'Senior Laravel-focused Full-Stack Developer. Portfolio, tutorials, and architecture insights.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
