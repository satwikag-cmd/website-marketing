import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { HomeCta } from '@/components/home/home-cta'
import { Footer } from '@/components/site/footer'
import { SolutionHero } from '@/components/solutions/solution-hero'
import { SolutionCard } from '@/components/solutions/solution-card'
import { Layers, FolderKanban, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solutions for E-commerce & DTC Brands | Adcanopus',
  description:
    'Built for e-commerce teams managing multiple products, creatives, and Meta ad accounts. Launch campaigns faster, organize assets, and track performance.',
}

export default function EcommerceSolutionPage() {
  return (
    <>
      <Navbar />
      <main>
        <SolutionHero
          breadcrumbLabel="E-commerce"
          eyebrow="Solutions — E-commerce"
          audienceFlow="Products → Creatives → Campaigns → Reporting"
          headline="Scale DTC Sales & Product Catalogs on Meta."
          description="Built for e-commerce teams managing multiple products, creatives, and Meta ad accounts. Launch campaigns faster, organize creative assets, and keep performance visible as your catalog grows."
        />

        {/* Capabilities Section */}
        <section
          id="solution-capabilities"
          aria-labelledby="capabilities-heading"
          className="container-site pb-20 md:pb-28"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1: Bulk Campaign Launch */}
            <SolutionCard
              index={0}
              icon={<Layers className="size-4" aria-hidden="true" />}
              visualTag="Bulk Launch"
              visualDetail={
                <div className="flex items-center gap-1.5 rounded-lg border border-hairline bg-background/50 px-3 py-2 font-mono text-[11px] text-muted-foreground">
                  <span className="text-foreground">Catalog Template</span>
                  <span className="text-primary font-bold">→</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                    All DTC Accounts
                  </span>
                </div>
              }
              title="Faster Campaign Launches"
              description="Create a campaign structure once and launch it across the accounts you manage without repeating the same setup manually."
              featureName="Bulk Campaign Launch"
              featureHref="/features/bulk-campaign-launch"
            />

            {/* Card 2: Creative Library */}
            <SolutionCard
              index={1}
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
              title="Organized Creative Management"
              description="Keep product images, videos, and other ad creatives organized so your team can quickly find the right assets for new campaigns."
              featureName="Creative Library"
              featureHref="/features/creative-library"
            />

            {/* Card 3: Multi-Ad Account Reporting */}
            <SolutionCard
              index={2}
              icon={<BarChart3 className="size-4" aria-hidden="true" />}
              visualTag="Consolidated View"
              visualDetail={
                <div className="flex items-center justify-between rounded-lg border border-hairline bg-background/50 px-3 py-2 font-mono text-[11px]">
                  <span className="text-muted-foreground">3 DTC Accounts</span>
                  <span className="flex items-center gap-1.5 text-primary font-medium">
                    <span className="size-1.5 rounded-full bg-signal" />
                    1 Consolidated View
                  </span>
                </div>
              }
              title="Unified Account Reporting"
              description="See performance across multiple Meta ad accounts from one centralized reporting view."
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
