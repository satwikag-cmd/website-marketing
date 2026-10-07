'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, ChartColumnIncreasing, ChevronDown, Images, Rocket, Search, Workflow } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'
import { AnimatedNumber } from './animated-number'
import { LaunchProgress, StatusPill } from './campaign-status'
import { PerformanceChart } from './performance-chart'
import {
  AD_ACCOUNTS,
  AUTOMATION_TARGET,
  CAMPAIGNS,
  formatCurrency,
  getAccount,
  type Campaign,
  type CampaignStatus,
} from './campaign-data'
import type { LaunchPhase } from './use-launch-sequence'

type ConsoleProps = {
  statuses: CampaignStatus[]
  phase: LaunchPhase
  liveCount: number
  automationFired: boolean
}

const GRID = 'grid grid-cols-[minmax(0,2.5fr)_minmax(0,1.35fr)_minmax(0,0.85fr)_minmax(0,1.15fr)] gap-4'

export function CampaignConsole({ statuses, phase, liveCount, automationFired }: ConsoleProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_60px_-20px_oklch(0_0_0/0.08)] dark:border-white/[0.09] dark:shadow-[0_60px_120px_-40px_oklch(0_0_0/0.85),0_0_0_1px_oklch(0_0_0/0.4),inset_0_1px_0_oklch(1_0_0/0.06)]">
      <ConsoleChrome />
      <div className="grid xl:grid-cols-[188px_minmax(0,1fr)]">
        <ConsoleSidebar />
        <div className="min-w-0">
          <LaunchHeader phase={phase} liveCount={liveCount} />
          <div className="px-5 lg:pr-[14%] xl:pr-[10%]">
            <div className={cn(GRID, 'border-b border-hairline pb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground')}>
              <span>Campaign</span>
              <span>Ad account</span>
              <span className="text-right">Budget / day</span>
              <span>Status</span>
            </div>
            {CAMPAIGNS.map((campaign, i) => (
              <CampaignRow
                key={campaign.id}
                campaign={campaign}
                status={statuses[i]}
                index={i}
                scaled={automationFired && i === AUTOMATION_TARGET.campaignIndex}
              />
            ))}
          </div>
          <ChartSection boosted={liveCount === CAMPAIGNS.length} />
        </div>
      </div>
    </div>
  )
}

function ConsoleChrome() {
  return (
    <div className="flex h-11 items-center justify-between border-b border-hairline bg-surface-2/30 px-4">
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-border dark:bg-white/[0.08]" />
          ))}
        </div>
        <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <span>Workspace</span>
          <span className="text-muted-foreground/40">/</span>
          <span>Launches</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-foreground/90 font-medium">BFCM Wave 2</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden h-7 items-center gap-2 rounded-md border border-border bg-surface px-2.5 text-[11px] text-muted-foreground lg:flex">
          <Search className="size-3" aria-hidden="true" />
          Search campaigns
          <kbd className="ml-4 font-mono text-[10px] text-white/30">{'⌘K'}</kbd>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-signal" />
          Synced
        </span>
      </div>
    </div>
  )
}

const NAV = [
  { icon: Rocket, label: 'Launch', active: true },
  { icon: Workflow, label: 'Automation' },
  { icon: Images, label: 'Creative library' },
  { icon: ChartColumnIncreasing, label: 'Reporting' },
]

function ConsoleSidebar() {
  return (
    <aside className="hidden border-r border-hairline bg-background/25 p-3 xl:block">
      <ul className="space-y-0.5">
        {NAV.map(({ icon: Icon, label, active }) => (
          <li
            key={label}
            className={cn(
              'flex h-8 items-center gap-2.5 rounded-md px-2.5 text-[12.5px] transition-colors',
              active ? 'bg-surface-2 text-foreground font-medium' : 'text-muted-foreground hover:bg-surface-2/60 hover:text-foreground',
            )}
          >
            <Icon className={cn('size-3.5', active && 'text-primary')} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
      <p className="mb-2 mt-6 px-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Ad accounts</p>
      <ul className="space-y-0.5">
        {AD_ACCOUNTS.map((account) => (
          <li
            key={account.id}
            className="flex h-8 items-center gap-2.5 rounded-md px-2.5 text-[12px] text-muted-foreground transition-colors hover:bg-surface-2/60 hover:text-foreground"
          >
            <span
              className="flex size-4 items-center justify-center rounded-[4px] font-mono text-[8px] font-semibold text-background"
              style={{ background: account.tone }}
            >
              {account.initials}
            </span>
            <span className="truncate">{account.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

function LaunchHeader({ phase, liveCount }: { phase: LaunchPhase; liveCount: number }) {
  const label = phase === 'idle' ? 'Launch all' : phase === 'launching' ? 'Launching…' : 'All live'
  return (
    <div className="flex items-center justify-between gap-4 px-5 pb-4 pt-5">
      <div>
        <p className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.02em] text-foreground">
          Bulk launch
          <span className="font-mono text-[11px] font-normal text-muted-foreground">{`4 campaigns · 3 accounts · 60 ads`}</span>
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex gap-1" aria-hidden="true">
            {CAMPAIGNS.map((c, i) => (
              <span
                key={c.id}
                className={cn('h-1 w-6 rounded-full transition-colors duration-500', i < liveCount ? 'bg-signal' : 'bg-muted-foreground/25 dark:bg-white/[0.08]')}
              />
            ))}
          </div>
          <span className="font-mono text-[10.5px] text-muted-foreground">
            <span className="tabular-nums text-foreground">{liveCount}</span>
            {' of 4 live'}
          </span>
        </div>
      </div>
      <motion.span
        animate={phase === 'launching' ? { scale: [1, 0.94, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className={cn(
          'inline-flex h-8 items-center gap-2 rounded-md px-3 text-[12.5px] font-medium transition-[background-color,color,box-shadow] duration-500',
          phase === 'complete'
            ? 'bg-signal/10 text-signal shadow-[inset_0_0_0_1px_oklch(0.82_0.125_168/0.3)]'
            : 'bg-primary text-primary-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.35)]',
        )}
      >
        <Rocket className="size-3.5" aria-hidden="true" />
        {label}
      </motion.span>
    </div>
  )
}

function CreativeStack({ creatives }: { creatives: string[] }) {
  return (
    <span className="flex -space-x-1.5" aria-hidden="true">
      {creatives.map((bg, i) => (
        <span
          key={i}
          className="relative size-6 overflow-hidden rounded-[5px] ring-2 ring-surface"
          style={{ background: bg }}
        >
          <span className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-white/50" />
        </span>
      ))}
    </span>
  )
}

function CampaignRow({
  campaign,
  status,
  index,
  scaled,
}: {
  campaign: Campaign
  status: CampaignStatus
  index: number
  scaled: boolean
}) {
  const account = getAccount(campaign.accountId)
  const budget = scaled ? campaign.dailyBudget * AUTOMATION_TARGET.budgetMultiplier : campaign.dailyBudget
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 + index * 0.08, ease: EASE_OUT }}
      className={cn(
        GRID,
        'group/row relative -mx-2 items-center rounded-md border-b border-hairline px-2 py-3 transition-colors duration-200 last:border-b-0 hover:bg-surface-2/40 dark:hover:bg-white/[0.025]',
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <CreativeStack creatives={campaign.creatives} />
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-medium text-foreground">{campaign.name}</p>
          <p className="relative h-4 overflow-hidden font-mono text-[10.5px] text-muted-foreground">
            <span className="block transition-transform duration-300 group-hover/row:-translate-y-4">
              {`${campaign.adSets} ad sets · ${campaign.ads} ads · ${campaign.objective}`}
            </span>
            <span className="flex items-center gap-1 text-foreground/80 transition-transform duration-300 group-hover/row:-translate-y-4">
              {`ID ${campaign.code}`}
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </span>
          </p>
        </div>
      </div>
      <div className="flex min-w-0 items-center gap-2 text-[12px] text-muted-foreground">
        <span
          className="flex size-4 shrink-0 items-center justify-center rounded-[4px] font-mono text-[8px] font-semibold text-background"
          style={{ background: account.tone }}
        >
          {account.initials}
        </span>
        <span className="truncate">{account.name}</span>
      </div>
      <div className="text-right font-mono text-[12px]">
        <AnimatedNumber
          value={budget}
          format={formatCurrency}
          className={cn('transition-colors duration-700', scaled ? 'text-signal' : 'text-foreground/90')}
        />
      </div>
      <div>
        <StatusPill status={status} />
      </div>
      <div className="absolute inset-x-2 -bottom-px">
        <LaunchProgress status={status} className="h-px bg-transparent" />
      </div>
    </motion.div>
  )
}

function ChartSection({ boosted }: { boosted: boolean }) {
  return (
    <div className="mt-2 border-t border-hairline px-5 pb-5 pt-4">
      <div className="mb-3 flex items-center justify-between lg:pr-[22%] xl:pr-[18%]">
        <div className="flex items-center gap-4 font-mono text-[10.5px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 rounded-full bg-primary" />
            Spend
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 rounded-full bg-signal" />
            ROAS
          </span>
        </div>
        <span className="flex items-center gap-1 rounded-md border border-border px-2 py-1 font-mono text-[10.5px] text-muted-foreground">
          All accounts
          <ChevronDown className="size-3" aria-hidden="true" />
        </span>
      </div>
      <PerformanceChart boosted={boosted} drawDelay={1.4} className="lg:pr-[22%] xl:pr-[18%]" />
    </div>
  )
}
