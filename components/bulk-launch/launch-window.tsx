'use client'

import { AnimatePresence, motion, type MotionValue } from 'motion/react'
import { ArrowDown, ArrowUpRight, Check, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'
import { AnimatedNumber } from '@/components/hero/animated-number'
import { formatInteger } from '@/components/hero/campaign-data'
import { LaunchRow, ROW_GRID } from './launch-row'
import { TemplateCard } from './template-card'
import { TemplateConnector } from './template-connector'
import { LAUNCH_ROWS, totalsFor, type Snapshot } from './bulk-launch-data'

type LaunchWindowProps = { progress: MotionValue<number>; snapshot: Snapshot }

export function LaunchWindow({ progress, snapshot }: LaunchWindowProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_60px_-20px_oklch(0_0_0/0.08)] dark:border-white/[0.09] dark:shadow-[0_60px_120px_-40px_oklch(0_0_0/0.85),0_0_0_1px_oklch(0_0_0/0.4),inset_0_1px_0_oklch(1_0_0/0.06)]">
      <WindowChrome />
      <LaunchToolbar snapshot={snapshot} />

      <div className="flex flex-col gap-4 p-4 md:p-5 lg:flex-row lg:items-center lg:gap-0">
        <div className="lg:w-[280px] lg:shrink-0 xl:w-[300px]">
          <TemplateCard visible={snapshot.visible} stage={snapshot.stage} />
        </div>

        <div className="flex items-center justify-center gap-2 font-mono text-[10.5px] text-muted-foreground lg:hidden" aria-hidden="true">
          <span className="h-px w-8 bg-border dark:bg-white/10" />
          <ArrowDown className={cn('size-3 transition-colors duration-500', snapshot.stage >= 1 && 'text-primary')} />
          <span className="h-px w-8 bg-border dark:bg-white/10" />
        </div>

        <div className="hidden shrink-0 lg:block">
          <TemplateConnector progress={progress} statuses={snapshot.statuses} />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className={cn(
              'hidden h-8 items-center px-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground',
              ROW_GRID,
            )}
          >
            <span>Campaign</span>
            <span>Ad account</span>
            <span className="text-right">Budget</span>
            <span className="text-right">Ads</span>
            <span>Status</span>
          </div>
          <ul aria-label="Campaigns in this launch">
            {LAUNCH_ROWS.map((row, i) => (
              <li key={row.id}>
                <LaunchRow row={row} index={i} progress={progress} status={snapshot.statuses[i]} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <LaunchFooter snapshot={snapshot} />
    </div>
  )
}

function WindowChrome() {
  return (
    <div className="flex h-11 items-center justify-between border-b border-hairline bg-surface-2/30 px-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-border dark:bg-white/[0.08]" />
          ))}
        </div>
        <p className="flex min-w-0 items-center gap-1.5 truncate font-mono text-[11px] text-muted-foreground">
          <span className="hidden sm:inline">Workspace</span>
          <span className="hidden text-muted-foreground/40 sm:inline">/</span>
          <span>Launches</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="truncate text-foreground/90 font-medium">Summer Campaign</span>
        </p>
      </div>
      <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10.5px] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-signal" />
        Synced
      </span>
    </div>
  )
}

function LaunchToolbar({ snapshot }: { snapshot: Snapshot }) {
  const { stage, live } = snapshot
  const label = stage < 2 ? 'Launch 4 campaigns' : stage === 2 ? 'Launching…' : 'All 4 live'

  return (
    <div className="flex items-center justify-between gap-4 border-b border-hairline px-4 py-4 md:px-5">
      <div className="min-w-0">
        <p className="text-[15px] font-medium tracking-[-0.02em] text-foreground">Bulk Campaign Launch</p>
        <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">
          4 campaigns · 3 destination accounts · 60 ads
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <div className="hidden items-center gap-2.5 sm:flex">
          <div className="flex gap-1" aria-hidden="true">
            {LAUNCH_ROWS.map((r, i) => (
              <span
                key={r.id}
                className={cn('h-1 w-6 rounded-full transition-colors duration-500', i < live ? 'bg-signal' : 'bg-white/[0.08]')}
              />
            ))}
          </div>
          <span className="font-mono text-[10.5px] text-muted-foreground">
            <span className="tabular-nums text-foreground">{live}</span>
            {' of 4 live'}
          </span>
        </div>
        <motion.span
          animate={stage === 2 ? { scale: [1, 0.95, 1] } : { scale: 1 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className={cn(
            'inline-flex h-8 items-center gap-2 rounded-md px-3 text-[12.5px] font-medium transition-[background-color,color,box-shadow,filter] duration-300',
            stage === 3
              ? 'bg-signal/10 text-signal shadow-[inset_0_0_0_1px_oklch(0.82_0.125_168/0.3)]'
              : 'bg-primary text-primary-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.35)] hover:brightness-110',
          )}
        >
          {stage === 3 ? <Check className="size-3.5" aria-hidden="true" /> : <Rocket className="size-3.5" aria-hidden="true" />}
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{stage === 3 ? 'Live' : stage === 2 ? 'Launching' : 'Launch'}</span>
        </motion.span>
      </div>
    </div>
  )
}

function LaunchFooter({ snapshot }: { snapshot: Snapshot }) {
  const { stage, visible, live, summary } = snapshot
  const message =
    stage === 0
      ? 'Blueprint ready · 4 campaigns mapped across 3 accounts'
      : stage === 1
        ? `Fanning out blueprint · ${visible} of 4 campaigns ready`
        : stage === 2
          ? `Launching campaigns · ${live} of 4 live`
          : 'All 4 campaigns live across 3 accounts'

  return (
    <div className="flex min-h-16 items-center border-t border-hairline bg-background/30 px-4 py-3 md:px-5">
      <AnimatePresence mode="wait" initial={false}>
        {summary ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3"
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-x-8">
              <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-signal">
                <span className="flex size-4 items-center justify-center rounded-full bg-signal/15">
                  <Check className="size-2.5" aria-hidden="true" />
                </span>
                Launch verified
              </span>
              <SummaryStat value={4} label="campaigns launched" />
              <SummaryStat value={3} label="accounts synced" />
              <SummaryStat value={60} label="ads active" />
            </div>
            <span className="group/report hidden cursor-default items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">
              <span className="size-1.5 rounded-full bg-signal" />
              Meta Ads Synced
            </span>
          </motion.div>
        ) : (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground"
          >
            <span
              className={cn(
                'size-1.5 rounded-full',
                stage === 3 ? 'bg-signal' : stage === 0 ? 'bg-white/30' : 'animate-pulse bg-primary',
              )}
              aria-hidden="true"
            />
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SummaryStat({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <AnimatedNumber
        value={value}
        from={0}
        format={formatInteger}
        duration={0.9}
        className="text-[17px] font-medium tracking-[-0.02em] text-foreground"
      />
      <span className="font-mono text-[11.5px] text-muted-foreground">{label}</span>
    </span>
  )
}

