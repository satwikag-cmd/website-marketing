'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
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
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative z-40 overflow-hidden border-b border-primary/20 bg-primary/[0.09] backdrop-blur-xl"
      >
        <div className="container-site flex items-center justify-between gap-3 py-2 text-[12.5px] sm:text-[13px]">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            <p className="truncate text-foreground">
              <span className="font-semibold text-primary">Welcome, {firstName}!</span>{' '}
              <span className="text-foreground/80">
                Our team will connect with you shortly to set up your account.
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground focus-visible:outline-2"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
