'use client'

import { motion } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'
import { LaunchStepper } from './launch-stepper'
import { LaunchWindow } from './launch-window'
import { useStoryProgress } from './use-story-progress'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
})

export function BulkLaunch() {
  const { containerRef, progress, snapshot, goToStage } = useStoryProgress()

  return (
    <section id="interactive-demo" aria-labelledby="bulk-launch-heading" className="relative isolate overflow-x-clip scroll-mt-16">
      <div className="container-site pt-4 md:pt-8">
        <motion.p
          {...reveal()}
          className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          <span className="h-px w-8 bg-primary" aria-hidden="true" />
          {'Interactive Walkthrough'}
        </motion.p>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
          <motion.h2
            {...reveal(0.05)}
            id="bulk-launch-heading"
            className="text-balance text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-foreground"
          >
            From One Blueprint to All Accounts.
          </motion.h2>
          <motion.p
            {...reveal(0.15)}
            className="max-w-sm text-pretty text-[15.5px] leading-relaxed text-muted-foreground md:text-[16.5px] lg:pb-[0.2em]"
          >
            Scroll or use the stepper to explore how a single template duplicates, launches, and verifies across destination accounts.
          </motion.p>
        </div>
      </div>

      <div ref={containerRef} className="relative lg:h-[300vh]">
        <div className="relative py-12 md:py-16 lg:sticky lg:top-16 lg:flex lg:h-[calc(100svh-4rem)] lg:items-center lg:py-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[15%] -z-10 h-[70%] bg-[radial-gradient(45%_50%_at_50%_45%,oklch(0.83_0.135_74/0.07),transparent_70%)]"
          />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="container-site"
          >
            <div className="mb-5">
              <LaunchStepper progress={progress} stage={snapshot.stage} onSelectStage={goToStage} />
            </div>
            <LaunchWindow progress={progress} snapshot={snapshot} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
