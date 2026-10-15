'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useAuth } from './auth-context'

export function SignedOutBanner() {
  const { signedOutNotice, setSignedOutNotice } = useAuth()

  useEffect(() => {
    if (!signedOutNotice) return
    const timer = setTimeout(() => {
      setSignedOutNotice(false)
    }, 8000)
    return () => clearTimeout(timer)
  }, [signedOutNotice, setSignedOutNotice])

  if (!signedOutNotice) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative z-40 overflow-hidden border-b border-border bg-surface-2/90 backdrop-blur-md"
      >
        <div className="container-site flex items-center justify-between gap-3 py-2 text-[13px]">
          <p className="text-muted-foreground">
            You have been signed out.
          </p>

          <button
            type="button"
            onClick={() => setSignedOutNotice(false)}
            aria-label="Dismiss banner"
            className="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-3 hover:text-foreground focus-visible:outline-2"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
