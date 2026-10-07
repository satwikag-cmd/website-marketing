'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { formatCurrency, getAccount } from '@/components/hero/campaign-data'
import { LaunchStatus } from './launch-status'
import { TIMING, appearAt, launchAt, type LaunchRowData, type RowStatus } from './bulk-launch-data'

export const ROW_GRID =
  'lg:grid lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.5fr)_minmax(0,0.8fr)_minmax(0,0.45fr)_124px] lg:gap-3'

type LaunchRowProps = {
  row: LaunchRowData
  index: number
  progress: MotionValue<number>
  status: RowStatus
}

export function LaunchRow({ row, index, progress, status }: LaunchRowProps) {
  const start = appearAt(index)
  const opacity = useTransform(progress, [start, start + TIMING.appearSpan], [0, 1])
  const y = useTransform(progress, [start, start + TIMING.appearSpan], [12, 0])
  const slotOpacity = useTransform(progress, [start, start + TIMING.appearSpan], [1, 0])

  const launch = launchAt(index) + TIMING.prepare
  const fill = useTransform(progress, [launch, launch + TIMING.run], [0, 1])
  const percent = useTransform(fill, (v) => `${Math.round(v * 100)}%`)

  const account = getAccount(row.accountId)
  const active = status === 'preparing' || status === 'launching'

  return (
    <div className="relative h-16 lg:h-14">
      <motion.div
        aria-hidden="true"
        style={{ opacity: slotOpacity }}
        className="absolute inset-x-0 inset-y-1.5 rounded-lg border border-dashed border-white/[0.08]"
      />
      <motion.div
        style={{ opacity, y }}
        className={cn(
          'group/row absolute inset-0 flex items-center gap-3 rounded-lg px-3 transition-colors duration-200 hover:bg-white/[0.03] lg:items-center',
          ROW_GRID,
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full transition-colors duration-500',
            status === 'live' ? 'bg-signal' : active ? 'bg-primary' : 'bg-white/15',
          )}
        />

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 truncate text-[12.5px] font-medium text-foreground">
            <span className="font-mono text-[10.5px] font-normal text-muted-foreground">{row.id}</span>
            <span className="truncate">{row.name}</span>
          </p>
          <p className="relative mt-0.5 h-4 overflow-hidden font-mono text-[10.5px] text-muted-foreground">
            <span className="flex items-center gap-1.5 transition-transform duration-300 group-hover/row:-translate-y-4">
              <AccountChip tone={account.tone} initials={account.initials} className="lg:hidden" />
              <span className="truncate lg:hidden">{account.name}</span>
              <span className="hidden truncate lg:inline">{row.audience}</span>
            </span>
            <span className="block truncate text-foreground/80 transition-transform duration-300 group-hover/row:-translate-y-4">
              {`${formatCurrency(row.budget)}/day · ${row.ads} ads`}
            </span>
          </p>
        </div>

        <div className="hidden min-w-0 items-center gap-2 text-[12px] text-muted-foreground lg:flex">
          <AccountChip tone={account.tone} initials={account.initials} />
          <span className="truncate">{account.name}</span>
        </div>

        <p className="hidden text-right font-mono text-[12px] tabular-nums text-foreground/90 lg:block">
          {formatCurrency(row.budget)}
        </p>
        <p className="hidden text-right font-mono text-[12px] tabular-nums text-muted-foreground lg:block">{row.ads}</p>

        <div className="shrink-0">
          <LaunchStatus status={status} percent={percent} />
        </div>

        <div aria-hidden="true" className="absolute inset-x-3 bottom-0 h-px overflow-hidden bg-hairline">
          <motion.div
            style={{ scaleX: fill, originX: 0 }}
            className={cn('absolute inset-0 transition-colors duration-500', status === 'live' ? 'bg-signal/70' : 'bg-primary')}
          />
          {status === 'preparing' && (
            <motion.span
              initial={{ x: '-100%' }}
              animate={{ x: '400%' }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-primary/70 to-transparent"
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}

export function AccountChip({ tone, initials, className }: { tone: string; initials: string; className?: string }) {
  return (
    <span
      className={cn(
        'flex size-4 shrink-0 items-center justify-center rounded-[4px] font-mono text-[8px] font-semibold text-background',
        className,
      )}
      style={{ background: tone }}
    >
      {initials}
    </span>
  )
}
