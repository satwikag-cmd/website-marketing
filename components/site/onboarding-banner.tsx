'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from './auth-context'

export function OnboardingBanner() {
  const { user } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  if (!user || dismissed) return null

  const firstName = user.displayName ? user.displayName.split(' ')[0] : 'there'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="overflow-hidden border-t border-primary/20 bg-primary/[0.08] backdrop-blur-md"
      >
        <div className="container-site flex items-center justify-between gap-3 py-2 text-[13px]">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            <p className="truncate text-foreground">
              <span className="font-semibold text-primary">Welcome, {firstName}!</span>{' '}
              <span className="text-muted-foreground">
                Our team will connect with you shortly to set up your account.
              </span>
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 font-medium">
            <Link
              href="/pricing"
              className="hidden items-center gap-1 rounded-md px-2 py-0.5 text-[12px] text-primary transition-colors hover:bg-primary/10 sm:inline-flex"
            >
              <span>Explore Plans</span>
              <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss banner"
              className="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground focus-visible:outline-2"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
