import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { ActionLink } from '@/components/site/action-link'
import { ArrowRight, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found | Adcanopus',
  description: 'The requested page could not be found.',
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative isolate flex min-h-[calc(100vh-16rem)] items-center justify-center pt-28 pb-20">
        {/* Subtle background radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_40%,oklch(0.83_0.135_74/0.06),transparent_70%)]"
        />

        <div className="container-site max-w-2xl text-center">
          <p className="mb-4 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            404 — Page Not Found
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
          </p>

          <h1 className="text-balance text-[clamp(2.5rem,5.5vw,4rem)] font-medium leading-[1] tracking-[-0.04em] text-foreground">
            Lost In The Orbit.
          </h1>

          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-muted-foreground md:text-[17.5px]">
            The page you are looking for does not exist, has been removed, or is temporarily unavailable.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ActionLink href="/" size="lg">
              <Home className="size-4" aria-hidden="true" />
              <span>Return Home</span>
            </ActionLink>
            <ActionLink href="/meta-ads" variant="secondary" size="lg">
              <span>View Platform Overview</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </ActionLink>
          </div>

          <div className="mt-12 rounded-xl border border-hairline bg-surface/50 p-6 text-left">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Popular Destinations:
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Link
                href="/features/bulk-campaign-launch"
                className="font-mono text-[12.5px] text-foreground/90 transition-colors hover:text-primary"
              >
                → Bulk Campaign Launch
              </Link>
              <Link
                href="/features/creative-library"
                className="font-mono text-[12.5px] text-foreground/90 transition-colors hover:text-primary"
              >
                → Creative Library
              </Link>
              <Link
                href="/features/multi-ad-account-reporting"
                className="font-mono text-[12.5px] text-foreground/90 transition-colors hover:text-primary"
              >
                → Multi-Ad Account Reporting
              </Link>
              <Link
                href="/pricing"
                className="font-mono text-[12.5px] text-foreground/90 transition-colors hover:text-primary"
              >
                → Pricing Plans
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
