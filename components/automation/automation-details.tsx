'use client'

import { motion } from 'motion/react'
import { Sliders, Filter, PlayCircle, Eye } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
})

const AUTOMATION_STEPS = [
  {
    step: '01',
    phase: 'Configure',
    title: 'Trigger Definition',
    description: 'Establish time-based schedules, manual trigger points, or asset updates that initiate workflow routines.',
    icon: Sliders,
  },
  {
    step: '02',
    phase: 'Filter',
    title: 'Condition Matching',
    description: 'Specify which connected Meta accounts, campaigns, or asset types meet the criteria for execution.',
    icon: Filter,
  },
  {
    step: '03',
    phase: 'Execute',
    title: 'Action Execution',
    description: 'Dispatch operations, stage creative assets for campaign fanout, or trigger team status notifications.',
    icon: PlayCircle,
  },
  {
    step: '04',
    phase: 'Monitor',
    title: 'Continuous Tracking',
    description: 'Track all automated operations in a clear audit log with execution timestamps and operational statuses.',
    icon: Eye,
  },
]

export function AutomationDetails() {
  return (
    <section aria-labelledby="automation-workflow-heading" className="relative isolate border-t border-hairline py-20 md:py-28">
      <div className="container-site">
        <div className="max-w-2xl">
          <motion.p
            {...reveal()}
            className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            Automation Architecture
          </motion.p>
          <motion.h2
            {...reveal(0.08)}
            id="automation-workflow-heading"
            className="text-balance text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground"
          >
            How Workflow Automation works.
          </motion.h2>
          <motion.p
            {...reveal(0.16)}
            className="mt-4 text-pretty text-[15.5px] leading-relaxed text-muted-foreground md:text-[17px]"
          >
            A clear 4-step framework designed to eliminate repetitive operational tasks across your Meta ad accounts.
          </motion.p>
        </div>

        {/* 4-Phase Grid */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/40 backdrop-blur-sm">
          <div className="grid divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {AUTOMATION_STEPS.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.step}
                  {...reveal(0.1 + i * 0.08)}
                  className="group relative flex flex-col justify-between p-6 transition-colors duration-200 hover:bg-white/[0.02] md:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                        {item.step} · {item.phase}
                      </span>
                      <span className="flex size-7 items-center justify-center rounded-md bg-white/[0.04] text-muted-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                    </div>

                    <h3 className="mt-5 text-[17px] font-medium tracking-[-0.02em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 pt-4 border-t border-hairline/60 font-mono text-[10.5px] text-muted-foreground">
                    <span className="size-1 rounded-full bg-primary" />
                    <span>Stage {item.step} of 04</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
