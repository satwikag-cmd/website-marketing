'use client'

import { motion } from 'motion/react'
import { Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'
import { AD_ACCOUNTS, CAMPAIGNS } from '@/components/hero/campaign-data'
import { AccountChip } from './launch-row'
import { LAUNCH_ROWS } from './bulk-launch-data'

const CREATIVES = CAMPAIGNS.flatMap((c) => c.creatives).slice(0, 4)

export function TemplateCard({ visible, stage }: { visible: number; stage: number }) {
  const duplicating = stage === 1
  return (
    <div className="relative">
      {duplicating && visible > 0 && (
        <motion.div
          key={visible}
          aria-hidden="true"
          initial={{ opacity: 0.7, x: 0, scale: 1 }}
          animate={{ opacity: 0, x: 32, scale: 0.97 }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className="pointer-events-none absolute inset-0 rounded-xl border border-primary/50"
        />
      )}
      <div
        className={cn(
          'relative rounded-xl border bg-surface-2/50 transition-[border-color,box-shadow] duration-500',
          duplicating
            ? 'border-primary/30 shadow-[0_0_0_4px_oklch(0.83_0.135_74/0.06),0_20px_40px_-20px_oklch(0.83_0.135_74/0.25)]'
            : 'border-white/[0.08] shadow-[inset_0_1px_0_oklch(1_0_0/0.04)]',
        )}
      >
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
          <p className="flex items-center gap-2 text-[12.5px] font-medium text-foreground">
            <span className="flex size-5 items-center justify-center rounded-[5px] bg-primary/12 text-primary">
              <Layers className="size-3" aria-hidden="true" />
            </span>
            Campaign Blueprint
          </p>
          <span className="font-mono text-[10px] text-muted-foreground">TPL-01</span>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-3.5 lg:grid-cols-1 lg:gap-y-0 lg:py-1.5">
          <Field label="Blueprint name">
            {'Summer · '}
            <span className="text-primary">{'{strategy}'}</span>
          </Field>
          <Field label="Destinations">
            <span className="flex -space-x-1">
              {AD_ACCOUNTS.map((a) => (
                <AccountChip key={a.id} tone={a.tone} initials={a.initials} className="ring-2 ring-surface-2" />
              ))}
            </span>
            <span className="ml-2">3 accounts</span>
          </Field>
          <Field label="Total budget">
            <span className="font-mono tabular-nums text-foreground">$4,350</span>
            <span className="ml-1 text-muted-foreground">/ day</span>
          </Field>
          <Field label="Campaigns">4 mapped</Field>
          <Field label="Creative bundle" className="col-span-2 lg:col-span-1">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {CREATIVES.map((bg, i) => (
                <span
                  key={i}
                  className="relative size-5 overflow-hidden rounded-[4px] ring-2 ring-surface-2"
                  style={{ background: bg }}
                >
                  <span className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-white/50" />
                </span>
              ))}
            </span>
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">60 total ads</span>
          </Field>
        </dl>

        <div className="flex items-center justify-between border-t border-hairline px-4 py-2.5">
          <span className="font-mono text-[10.5px] text-muted-foreground">Fanned out</span>
          <span className="flex items-center gap-2">
            <span className="flex gap-1" aria-hidden="true">
              {LAUNCH_ROWS.map((r, i) => (
                <span
                  key={r.id}
                  className={cn('h-1 w-3 rounded-full transition-colors duration-300', i < visible ? 'bg-primary' : 'bg-white/[0.08]')}
                />
              ))}
            </span>
            <span className="font-mono text-[10.5px] tabular-nums text-foreground">{`${visible} / ${LAUNCH_ROWS.length}`}</span>
          </span>
        </div>

        <span
          aria-hidden="true"
          className={cn(
            'absolute -right-[5px] top-1/2 hidden size-2.5 -translate-y-1/2 rounded-full border-2 border-surface transition-colors duration-500 lg:block',
            stage >= 1 ? 'bg-primary shadow-[0_0_8px_oklch(0.83_0.135_74/0.6)]' : 'bg-white/25',
          )}
        />
      </div>
    </div>
  )
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('min-w-0 lg:flex lg:h-9 lg:items-center lg:justify-between lg:gap-3', className)}>
      <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 flex min-w-0 items-center truncate text-[12px] text-foreground/90 lg:mt-0">{children}</dd>
    </div>
  )
}

