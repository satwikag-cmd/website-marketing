import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { HomeCta } from '@/components/home/home-cta'
import { Footer } from '@/components/site/footer'
import { ActionLink } from '@/components/site/action-link'
import { Check, ArrowRight, PhoneCall } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing | Adcanopus',
  description:
    'Simple, transparent pricing for modern Meta advertisers and teams. Scale campaign execution, creative management, and reporting.',
}

const PLANS = [
  {
    name: 'Starter',
    description: 'For teams getting started with streamlined Meta Ads campaign management.',
    price: '$299',
    period: 'per workspace / month',
    badge: null,
    features: [
      'Bulk Campaign Launch workflow',
      'Creative Library asset organizer',
      'Workflow rule automation',
      'Multi-ad account reporting',
      'Standard support',
    ],
    ctaText: 'Start Free Trial',
    ctaVariant: 'secondary' as const,
    ctaHref: '#start-trial',
  },
  {
    name: 'Pro',
    description: 'For growing teams managing campaigns across multiple Meta ad accounts.',
    price: '$499',
    period: 'per workspace / month',
    badge: 'Most Popular',
    features: [
      'Unlimited Bulk Campaign Launches',
      'Full Creative Library with asset tagging',
      'Advanced workflow automation',
      'Consolidated multi-account reporting & metrics',
      'Priority support',
    ],
    ctaText: 'Start Free Trial',
    ctaVariant: 'primary' as const,
    ctaHref: '#start-trial',
  },
  {
    name: 'Enterprise',
    description: 'For larger teams and agencies with advanced account and workflow requirements.',
    price: 'Custom',
    period: 'tailored to your scale',
    badge: null,
    features: [
      'High-volume Bulk Campaign Launches',
      'Enterprise creative management & tagging',
      'Custom automation workflows & operations',
      'Advanced multi-account aggregated reporting',
      'Dedicated account & onboarding support',
    ],
    ctaText: 'Book a Call',
    ctaVariant: 'secondary' as const,
    ctaHref: '#book-call',
  },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-28">
        <section className="container-site pb-16 md:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Simple, Transparent Pricing
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
            </p>
            <h1 className="text-balance text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[1] tracking-[-0.04em] text-foreground">
              Invest In Execution Speed.
            </h1>
            <p className="mt-5 text-pretty text-[16.5px] leading-relaxed text-muted-foreground md:text-[18px]">
              Every plan includes access to core Meta Ads workflows with transparent workspace billing.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 md:p-8 transition-all duration-300 ${
                  plan.badge
                    ? 'border-primary/50 bg-surface shadow-[0_20px_50px_-20px_oklch(0.83_0.135_74/0.25)] ring-1 ring-primary/30'
                    : 'border-border bg-surface/70 hover:border-primary/30 hover:bg-surface dark:border-white/[0.08] dark:bg-surface/40 dark:hover:border-white/[0.14]'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-0.5 font-mono text-[10.5px] font-semibold text-primary-foreground">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-[20px] font-medium text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="my-6 border-y border-hairline py-5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[38px] font-semibold tracking-tight text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-[13px] text-muted-foreground">
                        {plan.price === 'Custom' ? plan.period : `/${plan.period}`}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 font-mono text-[12.5px] text-muted-foreground">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <Check className="size-4 shrink-0 text-signal" />
                        <span className="text-foreground/90">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <ActionLink href={plan.ctaHref} variant={plan.ctaVariant} size="lg" className="w-full">
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="size-4" />
                  </ActionLink>
                </div>
              </div>
            ))}
          </div>
        </section>

        <HomeCta />
      </main>
      <Footer />
    </>
  )
}
