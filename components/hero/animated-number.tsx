'use client'

import { useEffect } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'
import { cn } from '@/lib/utils'

type AnimatedNumberProps = {
  value: number
  format: (value: number) => string
  from?: number
  duration?: number
  ease?: 'linear' | 'out'
  className?: string
}

export function AnimatedNumber({
  value,
  format,
  from,
  duration = 1.1,
  ease = 'out',
  className,
}: AnimatedNumberProps) {
  const reduceMotion = useReducedMotion()
  const motionValue = useMotionValue(from ?? value)
  const text = useTransform(motionValue, (v) => format(v))

  useEffect(() => {
    if (reduceMotion) {
      motionValue.set(value)
      return
    }
    const controls = animate(motionValue, value, {
      duration,
      ease: ease === 'linear' ? 'linear' : EASE_OUT,
    })
    return () => controls.stop()
  }, [value, duration, ease, reduceMotion, motionValue])

  return <motion.span className={cn('tabular-nums', className)}>{text}</motion.span>
}
