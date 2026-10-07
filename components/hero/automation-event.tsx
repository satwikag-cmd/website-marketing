'use client'

import { Workflow } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AUTOMATION_TARGET, CAMPAIGNS, formatCurrency } from './campaign-data'

export function AutomationEvent({ className }: { className?: string }) {
  const target = CAMPAIGNS[AUTOMATION_TARGET.campaignIndex]
  const next = target.dailyBudget * AUTOMATION_TARGET.budgetMultiplier
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border border-border bg-surface-2/95 p-3 pr-4 shadow-[0_24px_60px_-18px_oklch(0_0_0/0.75),inset_0_1px_0_oklch(1_0_0/0.06)] backdrop-blur-md',
        className,
      )}
    >
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/12 text-primary shadow-[inset_0_0_0_1px_oklch(0.83_0.135_74/0.3)]">
        <Workflow className="size-3.5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[12.5px] font-medium text-foreground">
          Rule triggered
          <span className="font-mono text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground">
            Scale winners
          </span>
        </p>
        <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted-foreground">
          {`ROAS > ${AUTOMATION_TARGET.roasThreshold.toFixed(1)} on `}
          <span className="text-foreground/90">{target.name}</span>
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px]">
          <span className="text-muted-foreground line-through decoration-muted-foreground/50">{formatCurrency(target.dailyBudget)}</span>
          <span className="text-muted-foreground">{'→'}</span>
          <span className="text-signal">{`${formatCurrency(next)}/day`}</span>
          <span className="rounded-[4px] bg-signal/10 px-1 text-[10px] text-signal">+20%</span>
        </p>
      </div>
    </div>
  )
}
