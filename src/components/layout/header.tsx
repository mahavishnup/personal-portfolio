'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/mode-toggle'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact Us', href: '/contact-us' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const pathname = usePathname()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-background/80 border-border/50 border-b py-3 shadow-sm backdrop-blur-md'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tighter md:text-2xl"
        >
          <span className="from-primary bg-gradient-to-r to-purple-500 bg-clip-text text-transparent">
            Mahavishnu
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'hover:text-primary group relative text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  layoutId="underline"
                  className="bg-primary absolute right-0 -bottom-1 left-0 h-[2px]"
                />
              )}
              <span className="bg-primary absolute right-0 -bottom-1 left-0 h-[2px] origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Actions & Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          <Button
            asChild
            variant="default"
            size="sm"
            className="hidden rounded-full md:flex"
          >
            <a href="https://github.com/sponsors/mahavishnup" target="_blank">
              Sponsor Me
            </a>
          </Button>

          {/* Mobile Toggle */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-border/50 w-full overflow-y-auto border-l sm:w-[400px]"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col px-2 pt-8">
                {/* Logo */}
                <Link
                  href="/"
                  onClick={() => setSheetOpen(false)}
                  className="mb-10 inline-flex items-center gap-2"
                >
                  <span className="from-primary bg-linear-to-r to-purple-500 bg-clip-text text-2xl font-bold tracking-tighter text-transparent">
                    Mahavishnu
                  </span>
                </Link>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        'group flex items-center gap-4 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200',
                        pathname === link.href
                          ? 'bg-primary/10 text-primary border-primary border-l-2'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground border-l-2 border-transparent'
                      )}
                    >
                      <span
                        className={cn(
                          'text-xs font-bold tabular-nums',
                          pathname === link.href
                            ? 'text-primary'
                            : 'text-muted-foreground/40'
                        )}
                      >
                        0{index + 1}
                      </span>
                      {link.name}
                    </Link>
                  ))}
                </nav>

                {/* Bottom section */}
                <div className="mt-auto flex flex-col gap-5 pt-8 pb-8">
                  {/* Divider */}
                  <div className="from-border via-border/50 h-px bg-linear-to-r to-transparent" />

                  {/* Theme toggle */}
                  <div className="bg-muted/30 flex items-center justify-between rounded-lg px-4 py-3">
                    <span className="text-muted-foreground text-sm font-medium">
                      Appearance
                    </span>
                    <ThemeToggle />
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    size="lg"
                    className="from-primary shadow-primary/25 hover:shadow-primary/30 w-full rounded-full bg-gradient-to-r to-purple-600 text-base font-semibold shadow-lg transition-shadow hover:shadow-xl"
                  >
                    <a
                      href="https://github.com/sponsors/mahavishnup"
                      target="_blank"
                    >
                      Sponsor Me
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div
        className="bg-primary absolute right-0 bottom-0 left-0 h-[3px] origin-left"
        style={{ scaleX }}
      />
    </header>
  )
}
