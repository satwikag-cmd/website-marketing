'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import { STAGE_TARGETS, snapshotAt } from './bulk-launch-data'

const DESKTOP_QUERY = '(min-width: 1024px)'
const AUTOPLAY_SECONDS = 7.5

export function useStoryProgress() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)
  const reduceMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  const [snapshot, setSnapshot] = useState(() => snapshotAt(0))

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 })
  const inView = useInView(containerRef, { once: true, amount: 0.35 })

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useMotionValueEvent(smoothScroll, 'change', (v) => {
    if (isDesktop && !reduceMotion) progress.set(v)
  })

  useEffect(() => {
    if (reduceMotion) {
      progress.set(1)
      return
    }
    if (isDesktop) {
      progress.set(smoothScroll.get())
      return
    }
    if (isDesktop === false && inView) {
      const controls = animate(progress, 1, { duration: AUTOPLAY_SECONDS, ease: 'linear', delay: 0.3 })
      return () => controls.stop()
    }
  }, [reduceMotion, isDesktop, inView, progress, smoothScroll])

  useMotionValueEvent(progress, 'change', (v) => {
    const next = snapshotAt(v)
    setSnapshot((prev) => (prev.key === next.key ? prev : next))
  })

  const goToStage = useCallback((stageIndex: number) => {
    const targetP = STAGE_TARGETS[stageIndex] ?? 0
    if (isDesktop && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const containerTop = rect.top + scrollY
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight
      if (totalScrollable > 0) {
        const targetScrollY = containerTop + targetP * totalScrollable
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
        return
      }
    }
    animate(progress, targetP, { duration: 0.6, ease: [0.16, 1, 0.3, 1] })
  }, [isDesktop, progress])

  return { containerRef, progress, snapshot, goToStage }
}

