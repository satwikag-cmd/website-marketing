import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { HomeCta } from '@/components/home/home-cta'
import { Footer } from '@/components/site/footer'
import { SolutionHero } from '@/components/solutions/solution-hero'
import { SolutionCard } from '@/components/solutions/solution-card'
import { Zap, LayoutGrid, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solutions for Affiliate Marketers | Adcanopus',
  description:
    'Built for affiliate marketers testing different offers, creatives, and campaign structures across multiple Meta ad accounts. Move quickly without repetitive setup.',
}

export default function AffiliateMarketersSolutionPage() {
  return (
    <>
      <Navbar />
      <main>
        <SolutionHero
          breadcrumbLabel="Affiliate Marketers"
          eyebrow="Solutions — Affiliate Marketers"
          audienceFlow="Offers → Creative Variations → Campaign Tests → Reporting"
          headline="High-Velocity Creative & Offer Testing."
          description="Built for affiliate marketers testing different offers, creatives, and campaign structures across multiple Meta ad accounts. Move quickly without repeating the same setup for every test."
        />

        {/* Capabilities Section */}
        <section
          id="solution-capabilities"
          aria-labelledby="capabilities-heading"
          className="container-site pb-20 md:pb-28"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1: Rapid Campaign Testing */}
            <SolutionCard
              index={0}
              icon={<Zap className="size-4" aria-hidden="true" />}
              visualTag="Angle Deploy"
              visualDetail={
                <div className="flex items-center gap-1.5 rounded-lg border border-hairline bg-background/50 px-3 py-2 font-mono text-[11px] text-muted-foreground">
                  <span className="text-foreground">1 Offer Setup</span>
                  <span className="text-primary font-bold">→</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                    Multiple Test Angles
                  </span>
                </div>
              }
              title="Rapid Campaign Testing"
              description="Create and launch multiple campaign variations without repeating the same setup manually for every test."
              featureName="Bulk Campaign Launch"
              featureHref="/features/bulk-campaign-launch"
            />

            {/* Card 2: Creative Organization */}
            <SolutionCard
              index={1}
              icon={<LayoutGrid className="size-4" aria-hidden="true" />}
              visualTag="Variation Hub"
              visualDetail={
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10.5px]">
                  <span className="rounded border border-hairline bg-background/50 px-2 py-1 text-foreground">
                    Hook A · B
                  </span>
                  <span className="rounded border border-hairline bg-background/50 px-2 py-1 text-foreground">
                    Angle 01 · 02
                  </span>
                  <span className="rounded border border-hairline bg-background/50 px-2 py-1 text-foreground">
                    CTA Variants
                  </span>
                </div>
              }
              title="Creative Organization"
              description="Keep different ad creatives and variations organized so you can quickly find the right asset for each test."
              featureName="Creative Library"
              featureHref="/features/creative-library"
            />

            {/* Card 3: Multi-Account Reporting */}
            <SolutionCard
              index={2}
              icon={<BarChart3 className="size-4" aria-hidden="true" />}
              visualTag="Return Tracking"
              visualDetail={
                <div className="flex items-center justify-between rounded-lg border border-hairline bg-background/50 px-3 py-2 font-mono text-[11px]">
                  <span className="text-muted-foreground">Multi-Account Spends</span>
                  <span className="flex items-center gap-1.5 text-primary font-medium">
                    <span className="size-1.5 rounded-full bg-signal" />
                    Blended Return
                  </span>
                </div>
              }
              title="Multi-Account Reporting"
              description="Monitor performance across multiple Meta ad accounts from one centralized reporting view."
              featureName="Multi-Ad Account Reporting"
              featureHref="/features/multi-ad-account-reporting"
            />
          </div>
        </section>

        <HomeCta />
      </main>
      <Footer />
    </>
  )
}
