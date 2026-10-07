import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { HomeCta } from '@/components/home/home-cta'
import { Footer } from '@/components/site/footer'
import { MetaAdsHero } from '@/components/meta-ads/meta-ads-hero'
import { MetaAdsCard } from '@/components/meta-ads/meta-ads-card'
import { Layers, Wand2, FolderKanban, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Meta Ads Platform | Adcanopus',
  description:
    'Built specifically for Meta Ads workflows, bringing campaign execution, creative management, automation, and multi-account reporting into one focused platform.',
}

export default function MetaAdsPage() {
  return (
    <>
      <Navbar />
      <main>
        <MetaAdsHero />

        {/* Four Confirmed Platform Pillars */}
        <section
          id="platform-capabilities"
          aria-labelledby="platform-capabilities-heading"
          className="container-site pb-20 md:pb-28"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1: Bulk Campaign Launch */}
            <MetaAdsCard
              index={0}
              icon={<Layers className="size-4" aria-hidden="true" />}
              visualTag="Execution"
              visualDetail={
                <div className="flex items-center gap-1.5 rounded-lg border border-hairline bg-background/50 px-3 py-2 font-mono text-[11px] text-muted-foreground">
                  <span className="text-foreground">Template</span>
                  <span className="text-primary font-bold">→</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                    01 · 02 · 03 Accounts
                  </span>
                </div>
              }
              title="Bulk Campaign Launch"
              description="Create a campaign structure once and launch it across multiple Meta ad accounts without repeating the same setup manually."
              href="/features/bulk-campaign-launch"
            />

            {/* Card 2: Automation */}
            <MetaAdsCard
              index={1}
              icon={<Wand2 className="size-4" aria-hidden="true" />}
              visualTag="Workflows"
              visualDetail={
                <div className="flex items-center gap-1.5 rounded-lg border border-hairline bg-background/50 px-3 py-2 font-mono text-[11px] text-muted-foreground">
                  <span className="text-foreground">Trigger</span>
                  <span className="text-white/30">→</span>
                  <span className="text-foreground">Condition</span>
                  <span className="text-primary font-bold">→</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                    Action
                  </span>
                </div>
              }
              title="Automation"
              description="Build automated workflows around your Meta advertising operations and reduce repetitive campaign management work."
              href="/features/automation"
            />

            {/* Card 3: Creative Library */}
            <MetaAdsCard
              index={2}
              icon={<FolderKanban className="size-4" aria-hidden="true" />}
              visualTag="Creative Hub"
              visualDetail={
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10.5px]">
                  <span className="rounded border border-hairline bg-background/50 px-2 py-1 text-foreground">
                    Video 9:16
                  </span>
                  <span className="rounded border border-hairline bg-background/50 px-2 py-1 text-foreground">
                    Static 1:1
                  </span>
                  <span className="rounded border border-hairline bg-background/50 px-2 py-1 text-foreground">
                    Carousel
                  </span>
                </div>
              }
              title="Creative Library"
              description="Keep your ad creatives organized in one place so you can quickly find the right assets when building campaigns."
              href="/features/creative-library"
            />

            {/* Card 4: Multi-Account Reporting */}
            <MetaAdsCard
              index={3}
              icon={<BarChart3 className="size-4" aria-hidden="true" />}
              visualTag="Analytics"
              visualDetail={
                <div className="flex items-center justify-between rounded-lg border border-hairline bg-background/50 px-3 py-2 font-mono text-[11px]">
                  <span className="text-muted-foreground">3 Ad Accounts</span>
                  <span className="flex items-center gap-1.5 text-primary font-medium">
                    <span className="size-1.5 rounded-full bg-signal" />
                    1 Unified View
                  </span>
                </div>
              }
              title="Multi-Account Reporting"
              description="View performance across multiple Meta ad accounts from one centralized reporting view."
              href="/features/multi-ad-account-reporting"
            />
          </div>
        </section>

        <HomeCta />
      </main>
      <Footer />
    </>
  )
}
