import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { HomeCta } from '@/components/home/home-cta'
import { Footer } from '@/components/site/footer'
import { SolutionHero } from '@/components/solutions/solution-hero'
import { SolutionCard } from '@/components/solutions/solution-card'
import { Layers, BarChart3, FolderKanban } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solutions for Media Buyers & Agencies | Adcanopus',
  description:
    'Built for performance agencies and freelance media buyers managing multiple client ad accounts. Standardize launches, organize creatives, and consolidate reporting.',
}

export default function MediaBuyersSolutionPage() {
  return (
    <>
      <Navbar />
      <main>
        <SolutionHero
          breadcrumbLabel="Media Buyers"
          eyebrow="Solutions — Media Buyers"
          audienceFlow="Clients → Accounts → Campaign Launch → Reporting"
          headline="Execute Across Client Accounts In Seconds."
          description="Built for performance agencies and freelance media buyers managing multiple client ad accounts. Standardize campaign launches, reduce repetitive setup, and keep client performance visible from one place."
        />

        {/* Capabilities Section */}
        <section
          id="solution-capabilities"
          aria-labelledby="capabilities-heading"
          className="container-site pb-20 md:pb-28"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1: Cross-Client Campaign Launch */}
            <SolutionCard
              index={0}
              icon={<Layers className="size-4" aria-hidden="true" />}
              visualTag="Agency Fanout"
              visualDetail={
                <div className="flex items-center gap-1.5 rounded-lg border border-hairline bg-background/50 px-3 py-2 font-mono text-[11px] text-muted-foreground">
                  <span className="text-foreground">Agency Standard</span>
                  <span className="text-primary font-bold">→</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                    Client 01 · 02 · 03
                  </span>
                </div>
              }
              title="Cross-Client Campaign Launch"
              description="Start from a standardized campaign structure and adapt it across multiple client ad accounts without rebuilding everything manually."
              featureName="Bulk Campaign Launch"
              featureHref="/features/bulk-campaign-launch"
            />

            {/* Card 2: Multi-Account Visibility */}
            <SolutionCard
              index={1}
              icon={<BarChart3 className="size-4" aria-hidden="true" />}
              visualTag="Client Reporting"
              visualDetail={
                <div className="flex items-center justify-between rounded-lg border border-hairline bg-background/50 px-3 py-2 font-mono text-[11px]">
                  <span className="text-muted-foreground">Cross-Client Roster</span>
                  <span className="flex items-center gap-1.5 text-primary font-medium">
                    <span className="size-1.5 rounded-full bg-signal" />
                    Single Command View
                  </span>
                </div>
              }
              title="Multi-Account Visibility"
              description="Review performance across the Meta ad accounts you manage without switching between separate reporting views."
              featureName="Multi-Ad Account Reporting"
              featureHref="/features/multi-ad-account-reporting"
            />

            {/* Card 3: Centralized Creative Management */}
            <SolutionCard
              index={2}
              icon={<FolderKanban className="size-4" aria-hidden="true" />}
              visualTag="Client Asset Hubs"
              visualDetail={
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10.5px]">
                  <span className="rounded border border-hairline bg-background/50 px-2 py-1 text-foreground">
                    Reels 9:16
                  </span>
                  <span className="rounded border border-hairline bg-background/50 px-2 py-1 text-foreground">
                    Feed 4:5
                  </span>
                  <span className="rounded border border-hairline bg-background/50 px-2 py-1 text-foreground">
                    By Client Tag
                  </span>
                </div>
              }
              title="Centralized Creative Management"
              description="Keep client creatives organized by format, campaign, or category so the right assets are easier to find and reuse."
              featureName="Creative Library"
              featureHref="/features/creative-library"
            />
          </div>
        </section>

        <HomeCta />
      </main>
      <Footer />
    </>
  )
}
