'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useAuth } from './auth-context'

export function WelcomeModal() {
  const { user, showWelcomeModal, setShowWelcomeModal } = useAuth()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowWelcomeModal(false)
      }
    }
    if (showWelcomeModal) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showWelcomeModal, setShowWelcomeModal])

  if (!showWelcomeModal || !user) return null

  const displayName = user.displayName ? user.displayName.split(' ')[0] : 'there'

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setShowWelcomeModal(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Card */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setShowWelcomeModal(false)}
            aria-label="Close dialog"
            className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
          >
            <X className="size-4" aria-hidden="true" />
          </button>

          <div className="space-y-3">
            <h2 id="welcome-modal-title" className="text-[19px] font-semibold tracking-tight text-foreground">
              Welcome, {displayName}!
            </h2>
            <p className="text-[14.5px] leading-relaxed text-muted-foreground">
              Your account will be ready shortly. We’ll notify you by email once the setup is complete.

            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setShowWelcomeModal(false)}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-surface-2 px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-surface-3 focus-visible:outline-2"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
