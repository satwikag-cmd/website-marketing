'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowRight, ChevronDown, Layers, Menu, Sparkles, Wand2, BarChart3, ShoppingBag, Target, Users2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'
import { Logo } from './logo'
import { ActionLink } from './action-link'
import { ThemeToggle } from './theme-toggle'

const FEATURES_NAV = [
  {
    label: 'Bulk Campaign Launch',
    href: '/features/bulk-campaign-launch',
    description: 'Launch multiple campaigns across ad accounts in seconds',
    icon: Layers,
  },
  {
    label: 'Automation',
    href: '/features/automation',
    description: 'Automate budget rules, triggers, and status controls',
    icon: Wand2,
  },
  {
    label: 'Creative Library',
    href: '/features/creative-library',
    description: 'Manage, group, and deploy high-performing ad creatives',
    icon: Sparkles,
  },
  {
    label: 'Multi-Ad Account Reporting',
    href: '/features/multi-ad-account-reporting',
    description: 'Unified cross-account performance data and metrics',
    icon: BarChart3,
  },
]

const SOLUTIONS_NAV = [
  {
    label: 'E-commerce',
    href: '/solutions/ecommerce',
    description: 'Scale product catalog and DTC sales workflows',
    icon: ShoppingBag,
  },
  {
    label: 'Media Buyers',
    href: '/solutions/media-buyers',
    description: 'Manage multi-client ad accounts with rapid execution',
    icon: Target,
  },
  {
    label: 'Affiliate Marketers',
    href: '/solutions/affiliate-marketers',
    description: 'High-velocity creative testing and campaign management',
    icon: Users2,
  },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'features' | 'solutions' | null>(null)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))

  const elevated = scrolled || menuOpen

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          elevated
            ? 'border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label="Primary"
          className="container-site grid h-16 grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]"
        >
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {/* Features Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setActiveDropdown('features')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={cn(
                  'group relative inline-flex h-9 items-center gap-1 rounded-md px-3.5 text-[13.5px] transition-colors duration-200 focus-visible:outline-2',
                  activeDropdown === 'features' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-expanded={activeDropdown === 'features'}
              >
                Features
                <ChevronDown
                  className={cn(
                    'size-3.5 transition-transform duration-200',
                    activeDropdown === 'features' && 'rotate-180 text-primary',
                  )}
                  aria-hidden="true"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-primary/80 transition-transform duration-300 ease-out',
                    activeDropdown === 'features' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'features' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-2"
                  >
                    <div className="w-[340px] overflow-hidden rounded-xl border border-white/[0.09] bg-surface p-2 shadow-[0_20px_40px_-15px_oklch(0_0_0/0.8)] backdrop-blur-2xl">
                      <div className="space-y-0.5">
                        {FEATURES_NAV.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors duration-150 hover:bg-white/[0.04]"
                            >
                              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-muted-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
                                <Icon className="size-3.5" aria-hidden="true" />
                              </span>
                              <div className="min-w-0">
                                <p className="text-[13px] font-medium text-foreground transition-colors group-hover:text-primary">
                                  {item.label}
                                </p>
                                <p className="line-clamp-1 text-[11px] text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Solutions Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={cn(
                  'group relative inline-flex h-9 items-center gap-1 rounded-md px-3.5 text-[13.5px] transition-colors duration-200 focus-visible:outline-2',
                  activeDropdown === 'solutions' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-expanded={activeDropdown === 'solutions'}
              >
                Solutions
                <ChevronDown
                  className={cn(
                    'size-3.5 transition-transform duration-200',
                    activeDropdown === 'solutions' && 'rotate-180 text-primary',
                  )}
                  aria-hidden="true"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-primary/80 transition-transform duration-300 ease-out',
                    activeDropdown === 'solutions' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-2"
                  >
                    <div className="w-[320px] overflow-hidden rounded-xl border border-white/[0.09] bg-surface p-2 shadow-[0_20px_40px_-15px_oklch(0_0_0/0.8)] backdrop-blur-2xl">
                      <div className="space-y-0.5">
                        {SOLUTIONS_NAV.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors duration-150 hover:bg-white/[0.04]"
                            >
                              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-muted-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
                                <Icon className="size-3.5" aria-hidden="true" />
                              </span>
                              <div className="min-w-0">
                                <p className="text-[13px] font-medium text-foreground transition-colors group-hover:text-primary">
                                  {item.label}
                                </p>
                                <p className="line-clamp-1 text-[11px] text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Direct Links */}
            <li>
              <Link
                href="/meta-ads"
                className="group relative inline-flex h-9 items-center rounded-md px-3.5 text-[13.5px] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2"
              >
                Meta Ads
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3.5 bottom-1.5 h-px origin-left scale-x-0 bg-primary/80 transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </Link>
            </li>

            <li>
              <Link
                href="/pricing"
                className="group relative inline-flex h-9 items-center rounded-md px-3.5 text-[13.5px] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2"
              >
                Pricing
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3.5 bottom-1.5 h-px origin-left scale-x-0 bg-primary/80 transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </Link>
            </li>
          </ul>

          <div className="hidden items-center justify-end gap-2 md:flex">
            <ThemeToggle />
            <ActionLink href="#sign-in" variant="ghost" size="sm">
              Sign in
            </ActionLink>
            <ActionLink href="#start-trial" variant="primary" size="sm" className="pr-2.5">
              Start Free Trial
              <ArrowRight
                className="size-3.5 transition-transform duration-200 group-hover/action:translate-x-0.5"
                aria-hidden="true"
              />
            </ActionLink>
          </div>

          <div className="flex items-center gap-1.5 justify-self-end md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-2 focus-visible:outline-2"
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="overflow-hidden border-t border-hairline bg-background/95 backdrop-blur-xl md:hidden"
            >
              <div className="container-site max-h-[calc(100vh-4.5rem)] overflow-y-auto pb-6 pt-3">
                {/* Mobile Features Section */}
                <div className="pb-3">
                  <p className="px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
                    Features
                  </p>
                  <div className="mt-1 space-y-1">
                    {FEATURES_NAV.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-md px-2 py-2 text-[14px] text-foreground/90 transition-colors hover:bg-white/[0.04] hover:text-primary"
                      >
                        <item.icon className="size-4 text-muted-foreground" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Solutions Section */}
                <div className="border-t border-hairline py-3">
                  <p className="px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
                    Solutions
                  </p>
                  <div className="mt-1 space-y-1">
                    {SOLUTIONS_NAV.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-md px-2 py-2 text-[14px] text-foreground/90 transition-colors hover:bg-white/[0.04] hover:text-primary"
                      >
                        <item.icon className="size-4 text-muted-foreground" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Direct Links */}
                <div className="border-t border-hairline py-3 space-y-1">
                  <Link
                    href="/meta-ads"
                    onClick={() => setMenuOpen(false)}
                    className="flex h-10 items-center rounded-md px-2 text-[14.5px] text-foreground/90 transition-colors hover:text-primary"
                  >
                    Meta Ads
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setMenuOpen(false)}
                    className="flex h-10 items-center rounded-md px-2 text-[14.5px] text-foreground/90 transition-colors hover:text-primary"
                  >
                    Pricing
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-hairline pt-4">
                  <ActionLink href="#sign-in" variant="secondary" size="md">
                    Sign in
                  </ActionLink>
                  <ActionLink href="#start-trial" variant="primary" size="md">
                    Start Free Trial
                  </ActionLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

