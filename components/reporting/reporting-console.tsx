'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BarChart3, ChevronDown, ChevronRight, Layers, ArrowUpRight, Check, Activity, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'
import { REPORT_ACCOUNTS, AGGREGATE_METRICS, type AccountReport } from './reporting-data'

export function ReportingConsole() {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)

  const toggleAccount = (id: string) => {
    setSelectedAccountId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="reporting-demo" aria-labelledby="reporting-demo-heading" className="relative isolate py-12 md:py-16">
      <div className="container-site">
        {/* Main Product Panel Container */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_60px_-20px_oklch(0_0_0/0.08)] dark:border-white/[0.09] dark:shadow-[0_60px_120px_-40px_oklch(0_0_0/0.85),0_0_0_1px_oklch(0_0_0/0.4),inset_0_1px_0_oklch(1_0_0/0.06)]">
          {/* Window Chrome */}
          <div className="flex h-11 items-center justify-between border-b border-hairline bg-surface-2/40 px-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-2.5 rounded-full bg-border dark:bg-white/[0.08]" />
                ))}
              </div>
              <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <span className="hidden sm:inline">Workspace</span>
                <span className="hidden text-muted-foreground/40 sm:inline">/</span>
                <span>Analytics</span>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-foreground/90 font-medium">Unified Reporting</span>
              </p>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-signal" />
              3 accounts connected
            </span>
          </div>

          {/* Aggregated Summary Row */}
          <div className="border-b border-hairline bg-background/25 px-5 py-4 md:px-6">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded bg-primary/15 text-primary">
                  <BarChart3 className="size-3" />
                </span>
                <span className="text-[13.5px] font-medium text-foreground">
                  Aggregated Performance Summary
                </span>
              </div>
              <span className="font-mono text-[10.5px] text-muted-foreground hidden sm:inline">
                Blended 7-Day Performance
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 pt-1">
              <div className="rounded-xl border border-hairline bg-surface/80 p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Connected Accounts
                </p>
                <p className="mt-1 font-mono text-[20px] font-medium tracking-tight text-foreground">
                  {AGGREGATE_METRICS.totalAccounts}
                </p>
                <p className="font-mono text-[10px] text-signal">● All Synced</p>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/80 p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Combined Spend
                </p>
                <p className="mt-1 font-mono text-[20px] font-medium tracking-tight text-foreground">
                  {AGGREGATE_METRICS.totalSpend}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">Across 3 accounts</p>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/80 p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Blended ROAS
                </p>
                <p className="mt-1 font-mono text-[20px] font-medium tracking-tight text-signal">
                  {AGGREGATE_METRICS.blendedRoas}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">Weighted Return</p>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/80 p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Average CTR
                </p>
                <p className="mt-1 font-mono text-[20px] font-medium tracking-tight text-foreground">
                  {AGGREGATE_METRICS.avgCtr}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">Cross-account avg</p>
              </div>
            </div>
          </div>

          {/* Aggregation Visual Flow Header */}
          <div className="flex items-center justify-between border-b border-hairline bg-surface-2/20 px-5 py-3 md:px-6">
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <span className="text-foreground font-medium">3 Ad Accounts</span>
              <span className="text-muted-foreground/50">───→</span>
              <span>Consolidated Account Breakdown</span>
            </div>
            <span className="font-mono text-[10.5px] text-muted-foreground hidden sm:inline">
              Click row to inspect details
            </span>
          </div>

          {/* Account Rows Table */}
          <div className="p-4 md:p-6">
            {/* Table Header */}
            <div className="hidden grid-cols-[minmax(0,2.5fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_100px] gap-4 border-b border-hairline pb-2.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground md:grid px-3">
              <span>Account Name</span>
              <span className="text-right">Spend</span>
              <span className="text-right">ROAS</span>
              <span className="text-right">CTR</span>
              <span className="text-right">Status</span>
            </div>

            {/* Account List */}
            <div className="mt-2 space-y-2">
              {REPORT_ACCOUNTS.map((account) => {
                const isExpanded = selectedAccountId === account.id
                return (
                  <div
                    key={account.id}
                    className={cn(
                      'group rounded-xl border transition-all duration-200',
                      isExpanded
                        ? 'border-primary/40 bg-surface-2/70 shadow-md'
                        : 'border-border bg-surface hover:border-primary/30 hover:bg-surface-2/40 dark:border-white/[0.07] dark:bg-surface/50 dark:hover:border-white/[0.14] dark:hover:bg-surface/80',
                    )}
                  >
                    <div
                      onClick={() => toggleAccount(account.id)}
                      className="flex cursor-pointer flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:justify-between md:grid md:grid-cols-[minmax(0,2.5fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_100px] md:gap-4 md:px-3"
                    >
                      {/* Account Identifier */}
                      <div className="flex items-center gap-3">
                        <span
                          className="flex size-7 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-bold text-background shadow-sm"
                          style={{ background: account.tone }}
                        >
                          {account.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[13.5px] font-medium text-foreground group-hover:text-primary transition-colors">
                            {account.name}
                          </p>
                          <p className="font-mono text-[10.5px] text-muted-foreground">
                            Meta Ad Account · {account.campaignCount} active {account.campaignCount === 1 ? 'campaign' : 'campaigns'}
                          </p>
                        </div>
                      </div>

                      {/* Spend */}
                      <div className="flex items-center justify-between sm:justify-end md:text-right">
                        <span className="font-mono text-[10px] uppercase text-muted-foreground md:hidden">Spend:</span>
                        <span className="font-mono text-[13px] text-foreground font-medium">
                          {account.spendFormatted}
                        </span>
                      </div>

                      {/* ROAS */}
                      <div className="flex items-center justify-between sm:justify-end md:text-right">
                        <span className="font-mono text-[10px] uppercase text-muted-foreground md:hidden">ROAS:</span>
                        <span className="font-mono text-[13px] text-signal font-semibold">
                          {account.roas}
                        </span>
                      </div>

                      {/* CTR */}
                      <div className="flex items-center justify-between sm:justify-end md:text-right">
                        <span className="font-mono text-[10px] uppercase text-muted-foreground md:hidden">CTR:</span>
                        <span className="font-mono text-[13px] text-foreground/90">
                          {account.ctr}
                        </span>
                      </div>

                      {/* Status / Chevron */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 md:text-right">
                        <span className="inline-flex items-center gap-1 rounded bg-signal/10 px-2 py-0.5 font-mono text-[10px] text-signal">
                          <span className="size-1 rounded-full bg-signal" />
                          Live
                        </span>
                        <ChevronDown
                          className={cn(
                            'size-3.5 text-muted-foreground transition-transform duration-200 group-hover:text-foreground',
                            isExpanded && 'rotate-180 text-primary',
                          )}
                        />
                      </div>
                    </div>

                    {/* Expandable Account Detail Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                          className="overflow-hidden border-t border-hairline/80 bg-background/40 px-4 py-3 text-[12px]"
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between font-mono text-[11px] text-muted-foreground">
                            <div>
                              <span className="text-foreground/90">Top Strategy:</span>{' '}
                              <span>{account.topCampaign}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span>Account ID: {account.id}-meta-01</span>
                              <span className="text-signal">● Healthy Pacing</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
