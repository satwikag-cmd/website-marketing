'use client'

import { cn } from '@/lib/utils'
import { AnimatedNumber } from './animated-number'
import {
  METRIC_BASE,
  SPEND_SHARE,
  computeMetrics,
  formatCurrency,
  formatInteger,
  formatPercent,
  formatRoas,
  getAccount,
  type CampaignStatus,
  type Metrics,
} from './campaign-data'

type MetricDef = {
  key: keyof Metrics
  label: string
  format: (v: number) => string
}

const METRICS: MetricDef[] = [
  { key: 'spend', label: 'Spend', format: formatCurrency },
  { key: 'roas', label: 'ROAS', format: formatRoas },
  { key: 'ctr', label: 'CTR', format: formatPercent },
  { key: 'conversions', label: 'Conversions', format: formatInteger },
]

function Delta({ current, base }: { current: number; base: number }) {
  const pct = ((current - base) / base) * 100
  return (
    <AnimatedNumber
      value={pct}
      format={(v) => (v < 0.05 ? '—' : `+${v.toFixed(1)}%`)}
      className={cn('font-mono text-[10.5px] transition-colors duration-500', pct > 0.05 ? 'text-signal' : 'text-muted-foreground')}
    />
  )
}

export function MetricsList({ statuses, layout = 'list' }: { statuses: CampaignStatus[]; layout?: 'list' | 'grid' }) {
  const metrics = computeMetrics(statuses)
  return (
    <dl className={cn(layout === 'grid' ? 'grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border' : 'divide-y divide-hairline')}>
      {METRICS.map((m) => (
        <div
          key={m.key}
          className={cn(
            'group/metric flex flex-col gap-1',
            layout === 'grid' ? 'bg-surface p-3' : 'py-3 first:pt-0 last:pb-0',
          )}
        >
          <dt className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground">
            {m.label}
            <Delta current={metrics[m.key]} base={METRIC_BASE[m.key]} />
          </dt>
          <dd className="text-[22px] font-medium leading-none tracking-[-0.03em] text-foreground">
            <AnimatedNumber value={metrics[m.key]} format={m.format} duration={1.4} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function AccountSplit() {
  return (
    <div>
      <div className="flex h-1.5 gap-0.5 overflow-hidden rounded-full">
        {SPEND_SHARE.map(({ accountId, share }) => (
          <span
            key={accountId}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ width: `${share * 100}%`, background: getAccount(accountId).tone }}
          />
        ))}
      </div>
      <ul className="mt-3 space-y-1.5">
        {SPEND_SHARE.map(({ accountId, share }) => {
          const account = getAccount(accountId)
          return (
            <li key={accountId} className="flex items-center justify-between text-[11.5px]">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="size-1.5 rounded-[2px]" style={{ background: account.tone }} />
                {account.name}
              </span>
              <span className="font-mono tabular-nums text-foreground/80">{`${Math.round(share * 100)}%`}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function MetricsPanel({ statuses, className }: { statuses: CampaignStatus[]; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface/95 p-4 shadow-[0_30px_80px_-20px_oklch(0_0_0/0.7),inset_0_1px_0_oklch(1_0_0/0.05)] backdrop-blur-md',
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[13px] font-medium tracking-[-0.01em] text-foreground">Performance</p>
          <p className="font-mono text-[10.5px] text-muted-foreground">Today · 3 ad accounts</p>
        </div>
        <span className="rounded-[5px] border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          24H
        </span>
      </div>
      <MetricsList statuses={statuses} />
      <div className="mt-4 border-t border-hairline pt-4">
        <p className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground">Spend by account</p>
        <AccountSplit />
      </div>
    </div>
  )
}
