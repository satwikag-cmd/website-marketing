'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowDown, ArrowRight, ChevronRight } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'
import { ActionLink } from '@/components/site/action-link'

export interface SolutionHeroProps {
  breadcrumbLabel: string
  eyebrow: string
  headline: string
  description: string
  audienceFlow: string
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
})

export function SolutionHero({
  breadcrumbLabel,
  eyebrow,
  headline,
  description,
  audienceFlow,
}: SolutionHeroProps) {
  const scrollToCards = () => {
    const el = document.getElementById('solution-capabilities')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section aria-labelledby="solution-hero-heading" className="relative isolate pt-24 pb-12 md:pt-32 md:pb-16">
      {/* Subtle background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(50%_40%_at_50%_20%,oklch(0.83_0.135_74/0.08),transparent_70%)]"
      />

      <div className="container-site">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <ChevronRight className="size-3 text-white/20" aria-hidden="true" />
            <li className="text-muted-foreground">Solutions</li>
            <ChevronRight className="size-3 text-white/20" aria-hidden="true" />
            <li className="text-foreground" aria-current="page">
              {breadcrumbLabel}
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            {...fadeUp(0.05)}
            className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            <span>{eyebrow}</span>
            <span className="hidden text-white/20 sm:inline">·</span>
            <span className="hidden font-mono text-[10.5px] text-foreground/70 sm:inline">
              {audienceFlow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.12)}
            id="solution-hero-heading"
            className="text-balance text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[1] tracking-[-0.04em] text-foreground"
          >
            {headline}
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            {...fadeUp(0.22)}
            className="mt-6 text-pretty text-[16.5px] leading-relaxed text-muted-foreground md:text-[18px]"
          >
            {description}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            {...fadeUp(0.32)}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:w-fit"
          >
            <ActionLink href="#start-trial" size="lg">
              <span>Start Free Trial</span>
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/action:translate-x-0.5"
                aria-hidden="true"
              />
            </ActionLink>
            <button
              type="button"
              onClick={scrollToCards}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-surface-2/60 px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-surface-2 hover:border-white/[0.18] focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span>Explore Capabilities</span>
              <ArrowDown className="size-3.5 text-muted-foreground" aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
