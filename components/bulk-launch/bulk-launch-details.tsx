'use client'

import { motion } from 'motion/react'
import { Layers, GitBranch, Rocket, CheckCircle2 } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
})

const WORKFLOW_STEPS = [
  {
    step: '01',
    phase: 'Template Setup',
    title: 'Single Blueprint',
    description: 'Configure your campaign parameters, daily budgets, and creative asset bundles once in a centralized setup.',
    icon: Layers,
  },
  {
    step: '02',
    phase: 'Destination Mapping',
    title: 'Multi-Account Fanout',
    description: 'Select destination Meta ad accounts and map strategies directly without duplicating setup manually.',
    icon: GitBranch,
  },
  {
    step: '03',
    phase: 'API Dispatch',
    title: 'Staged Launch',
    description: 'Track real-time validation, preparation, and progressive deployment as campaigns are pushed to Meta Ads.',
    icon: Rocket,
  },
  {
    step: '04',
    phase: 'Verification',
    title: 'Live Account Sync',
    description: 'Confirm live campaign status, active ad totals, and synchronized destination accounts from one unified view.',
    icon: CheckCircle2,
  },
]

export function BulkLaunchDetails() {
  return (
    <section aria-labelledby="workflow-heading" className="relative isolate border-t border-hairline py-20 md:py-28">
      <div className="container-site">
        <div className="max-w-2xl">
          <motion.p
            {...reveal()}
            className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            Execution Workflow
          </motion.p>
          <motion.h2
            {...reveal(0.08)}
            id="workflow-heading"
            className="text-balance text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground"
          >
            How Bulk Campaign Launch works.
          </motion.h2>
          <motion.p
            {...reveal(0.16)}
            className="mt-4 text-pretty text-[15.5px] leading-relaxed text-muted-foreground md:text-[17px]"
          >
            A systematic four-stage pipeline designed to eliminate repetitive manual creation and deploy Meta campaigns with clarity.
          </motion.p>
        </div>

        {/* Integrated Linear Workflow Pipeline */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/40 backdrop-blur-sm">
          <div className="grid divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((item, i) => {
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

