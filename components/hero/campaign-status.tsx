'use client'

import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'
import { AnimatedNumber } from './animated-number'
import { LAUNCH_DURATION_MS } from './use-launch-sequence'
import type { CampaignStatus } from './campaign-data'

const LABELS: Record<CampaignStatus, string> = {
  draft: 'Draft',
  queued: 'Queued',
  launching: 'Launching',
  live: 'Live',
}

const formatPct = (v: number) => `${Math.round(v)}%`

export function StatusPill({ status, className }: { status: CampaignStatus; className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex h-6 items-center gap-1.5 overflow-hidden rounded-[5px] pl-2 pr-2.5 font-mono text-[10.5px] uppercase tracking-[0.06em] transition-[background-color,color,box-shadow] duration-300',
        status === 'draft' && 'text-muted-foreground shadow-[inset_0_0_0_1px_oklch(1_0_0/0.1)]',
        status === 'queued' && 'bg-white/[0.04] text-foreground/80 shadow-[inset_0_0_0_1px_oklch(1_0_0/0.12)]',
        status === 'launching' && 'bg-primary/10 text-primary shadow-[inset_0_0_0_1px_oklch(0.83_0.135_74/0.35)]',
        status === 'live' && 'bg-signal/10 text-signal shadow-[inset_0_0_0_1px_oklch(0.82_0.125_168/0.3)]',
        className,
      )}
    >
      <StatusGlyph status={status} />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={status}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="inline-flex items-center gap-1"
        >
          {LABELS[status]}
          {status === 'launching' && (
            <AnimatedNumber
              value={100}
              from={0}
              duration={LAUNCH_DURATION_MS / 1000}
              ease="linear"
              format={formatPct}
              className="opacity-70"
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function StatusGlyph({ status }: { status: CampaignStatus }) {
  if (status === 'launching') {
    return (
      <svg viewBox="0 0 12 12" className="size-2.5 animate-spin [animation-duration:900ms]" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.6" />
        <path d="M6 1.5a4.5 4.5 0 0 1 4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (status === 'live') {
    return (
      <span className="relative flex size-1.5" aria-hidden="true">
        <motion.span
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full bg-signal"
        />
        <span className="relative size-1.5 rounded-full bg-signal" />
      </span>
    )
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        'size-1.5 rounded-full',
        status === 'draft' ? 'border border-muted-foreground/60' : 'bg-foreground/50',
      )}
    />
  )
}

export function LaunchProgress({ status, className }: { status: CampaignStatus; className?: string }) {
  const filled = status === 'launching' || status === 'live'
  return (
    <div className={cn('relative h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]', className)}>
      <motion.div
        initial={false}
        animate={{ scaleX: filled ? 1 : 0 }}
        transition={
          status === 'launching'
            ? { duration: LAUNCH_DURATION_MS / 1000, ease: [0.45, 0.05, 0.4, 1] }
            : { duration: 0.5, ease: EASE_OUT }
        }
        style={{ originX: 0 }}
        className={cn(
          'absolute inset-0 rounded-full transition-colors duration-500',
          status === 'live' ? 'bg-signal' : 'bg-primary',
        )}
      />
    </div>
  )
}
