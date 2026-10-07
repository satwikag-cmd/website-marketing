'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'

export interface MetaAdsCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
  visualTag: string
  visualDetail: ReactNode
  index: number
}

const cardReveal = (index: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: 0.08 + index * 0.08, ease: EASE_OUT },
})

export function MetaAdsCard({
  icon,
  title,
  description,
  href,
  visualTag,
  visualDetail,
  index,
}: MetaAdsCardProps) {
  return (
    <motion.div
      {...cardReveal(index)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 md:p-8 transition-all duration-300 hover:border-primary/40 hover:bg-surface hover:shadow-[0_20px_40px_-15px_oklch(0_0_0/0.07)] dark:border-white/[0.08] dark:bg-surface/60 dark:hover:border-white/[0.18] dark:hover:bg-surface-2/50 dark:hover:shadow-[0_24px_48px_-20px_oklch(0_0_0/0.8)]"
    >
      {/* Subtle top edge highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div>
        {/* Header row: Icon & Visual Tag */}
        <div className="flex items-center justify-between gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/15">
            {icon}
          </span>
          <span className="inline-flex items-center rounded-full border border-hairline bg-surface-2/80 px-2.5 py-1 font-mono text-[10.5px] text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-foreground">
            {visualTag}
          </span>
        </div>

        {/* Micro-UI Product Preview Fragment */}
        <div className="mt-5">{visualDetail}</div>

        {/* Title */}
        <h3 className="mt-5 text-[18px] font-medium tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Footer Link to Confirmed Feature Route */}
      <div className="mt-8 pt-4 border-t border-hairline">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground"
        >
          <span>Explore Feature</span>
          <ArrowRight
            className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 text-primary"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.div>
  )
}
