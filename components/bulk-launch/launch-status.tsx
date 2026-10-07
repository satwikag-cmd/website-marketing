'use client'

import { AnimatePresence, motion, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'
import type { RowStatus } from './bulk-launch-data'

const LABELS: Record<RowStatus, string> = {
  pending: 'Pending',
  ready: 'Ready',
  preparing: 'Preparing',
  launching: 'Launching',
  live: 'Live',
}

export function LaunchStatus({ status, percent }: { status: RowStatus; percent: MotionValue<string> }) {
  return (
    <span
      className={cn(
        'relative inline-flex h-6 items-center gap-1.5 overflow-hidden rounded-[5px] pl-2 pr-2.5 font-mono text-[10.5px] uppercase tracking-[0.06em] transition-[background-color,color,box-shadow] duration-300',
        (status === 'pending' || status === 'ready') && 'text-muted-foreground shadow-[inset_0_0_0_1px_oklch(1_0_0/0.1)]',
        status === 'preparing' && 'bg-white/[0.04] text-foreground/85 shadow-[inset_0_0_0_1px_oklch(1_0_0/0.14)]',
        status === 'launching' && 'bg-primary/10 text-primary shadow-[inset_0_0_0_1px_oklch(0.83_0.135_74/0.35)]',
        status === 'live' && 'bg-signal/10 text-signal shadow-[inset_0_0_0_1px_oklch(0.82_0.125_168/0.3)]',
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
          {status === 'launching' && <motion.span className="tabular-nums opacity-70">{percent}</motion.span>}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function StatusGlyph({ status }: { status: RowStatus }) {
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
  if (status === 'preparing') {
    return (
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        className="size-1.5 rounded-full bg-primary"
      />
    )
  }
  return <span aria-hidden="true" className="size-1.5 rounded-full border border-muted-foreground/60" />
}
