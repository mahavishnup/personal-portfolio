'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Client-only mount check (avoids hydration mismatch)
  useEffect(() => {
    if (!('ontouchstart' in window)) {
      setMounted(true)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => setIsHovering(false)

    window.addEventListener('mousemove', moveCursor)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleHoverStart)
    window.addEventListener('mouseout', handleHoverEnd)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleHoverStart)
      window.removeEventListener('mouseout', handleHoverEnd)
    }
  }, [cursorX, cursorY, isVisible, mounted])

  if (!mounted) return null

  return (
    <motion.div
      className="border-primary/50 pointer-events-none fixed top-0 left-0 z-9999 hidden rounded-full border mix-blend-difference md:block"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: isHovering ? -20 : -10,
        y: isHovering ? -20 : -10,
        width: isHovering ? 40 : 20,
        height: isHovering ? 40 : 20,
        opacity: isVisible ? 1 : 0,
        backgroundColor: isHovering
          ? 'rgba(var(--primary), 0.1)'
          : 'transparent',
      }}
    />
  )
}
