import Link from 'next/link'
import { Logo } from './logo'

const FOOTER_COLUMNS = [
  {
    title: 'Features',
    links: [
      { label: 'Bulk Campaign Launch', href: '/features/bulk-campaign-launch' },
      { label: 'Automation', href: '/features/automation' },
      { label: 'Creative Library', href: '/features/creative-library' },
      { label: 'Multi-Ad Account Reporting', href: '/features/multi-ad-account-reporting' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'E-commerce', href: '/solutions/ecommerce' },
      { label: 'Media Buyers', href: '/solutions/media-buyers' },
      { label: 'Affiliate Marketers', href: '/solutions/affiliate-marketers' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Meta Ads', href: '/meta-ads' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-background/50">
      <div className="container-site py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-muted-foreground">
              Advertising technology platform helping advertisers manage and scale Meta advertising workflows with bulk campaign launches, automation, creative management, and unified reporting.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-foreground/90">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-6 font-mono text-[11px] text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Adcanopus. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-signal" />
              Meta Ads Infrastructure
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
