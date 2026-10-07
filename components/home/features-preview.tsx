'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Layers, Wand2, Sparkles, BarChart3, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
})

export function FeaturesPreview() {
  return (
    <section id="features" aria-labelledby="features-preview-heading" className="relative isolate py-20 md:py-28">
      <div className="container-site">
        <div className="mb-14 md:mb-20">
          <motion.p
            {...reveal()}
            className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            Core Capabilities
          </motion.p>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <motion.h2
              {...reveal(0.05)}
              id="features-preview-heading"
              className="text-balance text-[clamp(2.2rem,4.5vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.04em] text-foreground"
            >
              Engineered for precision.
              <br />
              <span className="text-muted-foreground">Built for Meta Ads.</span>
            </motion.h2>
            <motion.p
              {...reveal(0.12)}
              className="max-w-md text-pretty text-[15.5px] leading-relaxed text-muted-foreground md:text-[16.5px]"
            >
              Four foundational tools integrated into a streamlined operating system for advertisers and media buying teams.
            </motion.p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 1. Bulk Campaign Launch */}
          <FeatureCard
            href="/features/bulk-campaign-launch"
            badge="01 — Campaign Creation"
            title="Bulk Campaign Launch"
            description="Create, duplicate, and dispatch structured campaigns across multiple ad accounts simultaneously from a single template."
            icon={Layers}
            delay={0.1}
          >
            <BulkLaunchMiniVisual />
          </FeatureCard>

          {/* 2. Automation */}
          <FeatureCard
            href="/features/automation"
            badge="02 — Workflow Automation"
            title="Automation"
            description="Build automated workflows around your Meta advertising operations and reduce repetitive campaign management work."
            icon={Wand2}
            delay={0.18}
          >
            <AutomationMiniVisual />
          </FeatureCard>

          {/* 3. Creative Library */}
          <FeatureCard
            href="/features/creative-library"
            badge="03 — Asset Management"
            title="Creative Library"
            description="Organize, tag, and distribute creative assets across campaigns with quick previewing and structured asset grouping."
            icon={Sparkles}
            delay={0.26}
          >
            <CreativeLibraryMiniVisual />
          </FeatureCard>

          {/* 4. Multi-Ad Account Reporting */}
          <FeatureCard
            href="/features/multi-ad-account-reporting"
            badge="04 — Unified Analytics"
            title="Multi-Ad Account Reporting"
            description="Consolidate performance data across all your Meta ad accounts into a synchronized dashboard with unified metrics."
            icon={BarChart3}
            delay={0.34}
          >
            <ReportingMiniVisual />
          </FeatureCard>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  href,
  badge,
  title,
  description,
  icon: Icon,
  delay,
  children,
}: {
  href: string
  badge: string
  title: string
  description: string
  icon: typeof Layers
  delay: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/60 p-6 transition-all duration-300 hover:border-white/[0.16] hover:bg-surface/80 md:p-8"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
            {badge}
          </span>
          <span className="flex size-8 items-center justify-center rounded-lg bg-white/[0.04] text-muted-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
            <Icon className="size-4" aria-hidden="true" />
          </span>
        </div>

        <h3 className="mt-4 text-[21px] font-medium tracking-[-0.025em] text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Custom Mini Visualization Container */}
        <div className="my-6 overflow-hidden rounded-xl border border-white/[0.06] bg-background/50 p-4">
          {children}
        </div>
      </div>

      <Link
        href={href}
        className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground transition-colors group-hover:text-primary"
      >
        <span>Explore {title}</span>
        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </motion.div>
  )
}

/* 1. Micro-Visual: Bulk Campaign Launch */
function BulkLaunchMiniVisual() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary" />
          <span className="font-mono text-[11px] font-medium text-foreground">Template: Summer · {'{strategy}'}</span>
        </div>
        <span className="font-mono text-[10px] text-primary">Fanout 4x</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {[
          { name: 'Broad Prospecting', acc: 'Lumen', status: 'Live' },
          { name: 'Retargeting 7D', acc: 'Northwind', status: 'Live' },
          { name: 'UGC Test', acc: 'Fieldhouse', status: 'Live' },
          { name: 'Advantage+ Shopping', acc: 'Lumen', status: 'Live' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-[11px]"
          >
            <span className="truncate text-foreground/90 font-medium">{item.name}</span>
            <span className="flex items-center gap-1 font-mono text-[9.5px] text-signal">
              <span className="size-1 rounded-full bg-signal" />
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 2. Micro-Visual: Automation */
function AutomationMiniVisual() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between rounded-md border border-hairline bg-surface/70 px-3 py-2 font-mono text-[11px]">
        <span className="text-muted-foreground">TRIGGER</span>
        <span className="text-foreground">Scheduled Daily Check</span>
        <span className="text-primary font-medium">Active</span>
      </div>

      <div className="flex items-center justify-center">
        <span className="h-3 w-px bg-primary/40" />
      </div>

      <div className="flex items-center justify-between rounded-md border border-signal/30 bg-signal/5 px-3 py-2 font-mono text-[11px]">
        <span className="text-muted-foreground">ACTION</span>
        <span className="text-foreground">Verify Pacing Across Accounts</span>
        <span className="flex items-center gap-1 text-signal font-medium">
          <Check className="size-3" /> Done
        </span>
      </div>
    </div>
  )
}

/* 3. Micro-Visual: Creative Library */
function CreativeLibraryMiniVisual() {
  const assets = [
    { name: 'Product Reel 01', type: '9:16 Video', tone: 'linear-gradient(135deg, oklch(0.35 0.08 240), oklch(0.2 0.04 260))' },
    { name: 'Lifestyle UGC', type: '4:5 Static', tone: 'linear-gradient(135deg, oklch(0.4 0.1 75), oklch(0.25 0.05 60))' },
    { name: 'Feature Hook', type: '1:1 Video', tone: 'linear-gradient(135deg, oklch(0.35 0.08 170), oklch(0.2 0.04 180))' },
  ]
  return (
    <div className="grid grid-cols-3 gap-2">
      {assets.map((asset, i) => (
        <div key={i} className="overflow-hidden rounded-lg border border-hairline bg-surface">
          <div className="h-12 w-full" style={{ background: asset.tone }} />
          <div className="p-1.5">
            <p className="truncate text-[10.5px] font-medium text-foreground">{asset.name}</p>
            <p className="font-mono text-[9px] text-muted-foreground">{asset.type}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* 4. Micro-Visual: Multi-Ad Account Reporting */
function ReportingMiniVisual() {
  const accounts = [
    { name: 'Lumen Goods', spend: '$12.4k', roas: '3.4x' },
    { name: 'Northwind Outdoors', spend: '$8.6k', roas: '2.9x' },
    { name: 'Fieldhouse Sport', spend: '$5.1k', roas: '4.1x' },
  ]
  return (
    <div className="space-y-1.5">
      {accounts.map((acc, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-md border border-hairline bg-surface px-2.5 py-1.5 font-mono text-[11px]"
        >
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-signal" />
            <span className="text-foreground/90">{acc.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{acc.spend}</span>
            <span className="text-signal">{acc.roas}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
