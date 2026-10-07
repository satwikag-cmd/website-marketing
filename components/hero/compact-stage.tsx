'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'
import { CAMPAIGNS, getAccount } from './campaign-data'
import { LaunchProgress, StatusPill } from './campaign-status'
import { MetricsList, AccountSplit } from './metrics-panel'
import { PerformanceChart } from './performance-chart'
import { AutomationEvent } from './automation-event'
import type { useLaunchSequence } from './use-launch-sequence'

type Sequence = ReturnType<typeof useLaunchSequence>

/** Recomposed product visual for mobile and tablet: launch queue first, then the numbers. */
export function CompactStage({ sequence }: { sequence: Sequence }) {
  const { statuses, phase, liveCount, automationFired, cycle } = sequence
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
      role="img"
      aria-label="Adcanopus campaign manager: four Meta campaigns across three ad accounts move from draft to live while performance metrics update."
      className="lg:hidden"
    >
      <div
        aria-hidden="true"
        className="grid gap-3 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
      >
        <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-surface shadow-[0_40px_80px_-30px_oklch(0_0_0/0.8),inset_0_1px_0_oklch(1_0_0/0.06)]">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3.5">
            <div>
              <p className="text-[14px] font-medium tracking-[-0.02em]">Bulk launch</p>
              <p className="font-mono text-[10.5px] text-muted-foreground">
                <span className="text-foreground">{liveCount}</span>
                {' of 4 live · 3 accounts'}
              </p>
            </div>
            <span
              className={cn(
                'inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[12px] font-medium transition-colors duration-500',
                phase === 'complete'
                  ? 'bg-signal/10 text-signal shadow-[inset_0_0_0_1px_oklch(0.82_0.125_168/0.3)]'
                  : 'bg-primary text-primary-foreground',
              )}
            >
              <Rocket className="size-3" />
              {phase === 'idle' ? 'Launch all' : phase === 'launching' ? 'Launching' : 'All live'}
            </span>
          </div>
          <ul>
            {CAMPAIGNS.map((c, i) => {
              const account = getAccount(c.accountId)
              return (
                <li key={c.id} className="relative border-b border-hairline px-4 py-3 last:border-b-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        className="flex size-6 shrink-0 items-center justify-center rounded-[5px] font-mono text-[9px] font-semibold text-background"
                        style={{ background: account.tone }}
                      >
                        {account.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[12.5px] font-medium">{c.name}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{`${c.ads} ads · ${account.name}`}</p>
                      </div>
                    </div>
                    <StatusPill status={statuses[i]} className="shrink-0" />
                  </div>
                  <LaunchProgress status={statuses[i]} className="mt-2.5 h-[2px]" />
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <MetricsList statuses={statuses} layout="grid" />
          <div className="rounded-2xl border border-white/[0.09] bg-surface p-4">
            <div className="mb-2 flex items-center justify-between font-mono text-[10.5px] text-muted-foreground">
              <span>Spend vs ROAS · 24h</span>
              <span className="flex gap-2">
                <span className="h-0.5 w-3 self-center rounded-full bg-primary" />
                <span className="h-0.5 w-3 self-center rounded-full bg-signal" />
              </span>
            </div>
            <PerformanceChart boosted={liveCount === CAMPAIGNS.length} drawDelay={1.2} interactive={false} />
            <div className="mt-4 hidden border-t border-hairline pt-4 md:block">
              <AccountSplit />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-3 min-h-[92px]" aria-hidden="true">
        <AnimatePresence>
          {automationFired && (
            <motion.div
              key={cycle}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="absolute inset-x-0 top-0"
            >
              <AutomationEvent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
