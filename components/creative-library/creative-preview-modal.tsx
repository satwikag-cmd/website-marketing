'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Play, Video, Image as ImageIcon, Layers, Tag, Folder, CheckCircle, Smartphone } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'
import type { CreativeAsset } from './creative-library-data'

type ModalProps = {
  asset: CreativeAsset | null
  onClose: () => void
}

export function CreativePreviewModal({ asset, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (asset) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [asset, onClose])

  return (
    <AnimatePresence>
      {asset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-surface shadow-[0_40px_80px_-20px_oklch(0_0_0/0.9)] lg:flex-row"
          >
            {/* Left Preview Stage */}
            <div className="flex flex-1 items-center justify-center bg-background/90 p-6 sm:p-8">
              <div
                className={`relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.1] bg-gradient-to-br from-surface to-background/95 p-4 shadow-2xl ${
                  asset.format === '9:16'
                    ? 'aspect-[9/16] w-[220px] sm:w-[240px]'
                    : asset.format === '4:5'
                      ? 'aspect-[4/5] w-[240px] sm:w-[260px]'
                      : 'aspect-square w-[240px] sm:w-[260px]'
                }`}
              >
                {/* Simulated Meta Sponsor Header */}
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center font-mono text-[9px] font-bold text-primary">
                    A
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-foreground">Brand Account</p>
                    <p className="font-mono text-[8px] text-muted-foreground">Sponsored</p>
                  </div>
                </div>

                {/* Center Creative Graphic */}
                <div className="my-auto flex flex-col items-center justify-center text-center">
                  {asset.type === 'VIDEO' ? (
                    <div className="flex size-14 items-center justify-center rounded-full bg-primary/20 text-primary shadow-lg">
                      <Play className="size-6 fill-current pl-1" />
                    </div>
                  ) : asset.type === 'CAROUSEL' ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex -space-x-3">
                        {[0, 1, 2].map((dot) => (
                          <div
                            key={dot}
                            className="size-10 rounded-lg border border-white/20 bg-surface-2 shadow-md"
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[9px] text-muted-foreground">
                        {asset.slides} Slide Carousel
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-center">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                        Static Creative
                      </span>
                    </div>
                  )}
                </div>

                {/* Ad Bottom Details */}
                <div className="space-y-1.5 rounded-lg bg-black/40 p-2.5 backdrop-blur-sm">
                  <p className="text-[12px] font-semibold text-foreground">
                    {asset.mockHeadline}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {asset.mockSubtext}
                  </p>
                  <div className="pt-1">
                    <span className="block w-full rounded bg-primary py-1 text-center font-mono text-[10px] font-semibold text-primary-foreground">
                      {asset.mockCta}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Inspection Panel */}
            <div className="flex w-full flex-col justify-between border-t border-hairline bg-surface p-6 sm:p-7 lg:w-[320px] lg:border-l lg:border-t-0">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                    Asset Details
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                    aria-label="Close preview"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <h3 className="mt-3 text-[19px] font-medium tracking-tight text-foreground">
                  {asset.name}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  ID: {asset.id}
                </p>

                <dl className="mt-6 space-y-3 font-mono text-[11.5px]">
                  <div className="flex items-center justify-between border-b border-hairline/60 pb-2">
                    <dt className="text-muted-foreground">Asset Type</dt>
                    <dd className="font-medium text-foreground">{asset.type}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-hairline/60 pb-2">
                    <dt className="text-muted-foreground">Aspect Ratio</dt>
                    <dd className="font-medium text-foreground">{asset.format}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-hairline/60 pb-2">
                    <dt className="text-muted-foreground">Collection</dt>
                    <dd className="font-medium text-foreground">{asset.collection}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-hairline/60 pb-2">
                    <dt className="text-muted-foreground">Angle Tag</dt>
                    <dd className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                      {asset.tag}
                    </dd>
                  </div>
                  {asset.duration && (
                    <div className="flex items-center justify-between border-b border-hairline/60 pb-2">
                      <dt className="text-muted-foreground">Length</dt>
                      <dd className="font-medium text-foreground">{asset.duration}</dd>
                    </div>
                  )}
                  {asset.slides && (
                    <div className="flex items-center justify-between border-b border-hairline/60 pb-2">
                      <dt className="text-muted-foreground">Cards</dt>
                      <dd className="font-medium text-foreground">{asset.slides} slides</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="mt-6 rounded-lg border border-hairline bg-background/50 p-3">
                <div className="flex items-center gap-2 font-mono text-[11px] text-signal">
                  <CheckCircle className="size-3.5" />
                  <span>Ready for campaign launch</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
