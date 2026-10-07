'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Wand2, Clock, Layers, Sparkles, Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const WORKFLOWS = [
  {
    id: 'scheduled-delivery',
    name: 'Scheduled Delivery Routine',
    category: 'Schedule Workflow',
    trigger: 'Daily at 08:00 UTC',
    condition: 'Connected Meta Accounts = Active',
    action: 'Verify Campaign Pacing & Delivery',
    icon: Clock,
    status: 'Active',
  },
  {
    id: 'asset-rotation',
    name: 'Creative Asset Ingestion',
    category: 'Asset Workflow',
    trigger: 'New asset tagged in Creative Library',
    condition: 'Format = 9:16 Video or 1:1 Static',
    action: 'Stage for Bulk Campaign Fanout',
    icon: Sparkles,
    status: 'Active',
  },
  {
    id: 'reporting-sync',
    name: 'Cross-Account Data Ingestion',
    category: 'Reporting Workflow',
    trigger: 'Recurring 4-hour cycle',
    condition: 'All 3 connected Meta ad accounts',
    action: 'Synchronize Unified Performance Console',
    icon: Layers,
    status: 'Active',
  },
]

export function AutomationConsole() {
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>('scheduled-delivery')

  return (
    <section id="automation-demo" aria-labelledby="automation-demo-heading" className="relative isolate py-12 md:py-16">
      <div className="container-site">
        <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-surface shadow-[0_60px_120px_-40px_oklch(0_0_0/0.85),0_0_0_1px_oklch(0_0_0/0.4),inset_0_1px_0_oklch(1_0_0/0.06)]">
          {/* Window Chrome */}
          <div className="flex h-11 items-center justify-between border-b border-hairline bg-background/40 px-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-2.5 rounded-full bg-white/[0.08]" />
                ))}
              </div>
              <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <span className="hidden sm:inline">Workspace</span>
                <span className="hidden text-white/20 sm:inline">/</span>
                <span>Automation</span>
                <span className="text-white/20">/</span>
                <span className="text-foreground/90">Workflow Engine</span>
              </p>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-signal" />
              3 workflows active
            </span>
          </div>

          {/* Workflow Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline bg-background/20 px-5 py-4 md:px-6">
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded bg-primary/15 text-primary">
                <Wand2 className="size-3" />
              </span>
              <span className="text-[13.5px] font-medium text-foreground">
                Workflow Rules &amp; Triggers
              </span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              Trigger → Condition → Action Architecture
            </span>
          </div>

          {/* Workflow List */}
          <div className="p-4 md:p-6 space-y-3">
            {WORKFLOWS.map((wf) => {
              const isSelected = activeWorkflowId === wf.id
              const Icon = wf.icon
              return (
                <div
                  key={wf.id}
                  onClick={() => setActiveWorkflowId(wf.id)}
                  className={cn(
                    'cursor-pointer rounded-xl border p-4 transition-all duration-200 md:p-5',
                    isSelected
                      ? 'border-primary/40 bg-surface-2/70 shadow-md'
                      : 'border-white/[0.07] bg-surface/50 hover:border-white/[0.14] hover:bg-surface/80',
                  )}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-primary">
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <p className="text-[14px] font-medium text-foreground">{wf.name}</p>
                        <p className="font-mono text-[10.5px] text-muted-foreground">{wf.category}</p>
                      </div>
                    </div>

                    <span className="inline-flex w-fit items-center gap-1.5 rounded bg-signal/10 px-2.5 py-1 font-mono text-[10.5px] text-signal">
                      <span className="size-1.5 rounded-full bg-signal" />
                      {wf.status}
                    </span>
                  </div>

                  {/* Flow pipeline */}
                  <div className="mt-4 grid gap-2 rounded-lg border border-hairline/80 bg-background/50 p-3 text-[11.5px] sm:grid-cols-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        Trigger
                      </span>
                      <p className="mt-0.5 text-foreground/90">{wf.trigger}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        Condition
                      </span>
                      <p className="mt-0.5 text-foreground/90">{wf.condition}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                        Action
                      </span>
                      <p className="mt-0.5 text-foreground/90">{wf.action}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
