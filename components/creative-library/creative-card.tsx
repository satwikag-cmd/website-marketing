'use client'

import { motion } from 'motion/react'
import { Play, Eye, Layers, Image as ImageIcon, Video, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CreativeAsset } from './creative-library-data'

type CreativeCardProps = {
  asset: CreativeAsset
  onSelect: (asset: CreativeAsset) => void
}

export function CreativeCard({ asset, onSelect }: CreativeCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      onClick={() => onSelect(asset)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-surface/60 transition-all duration-300 hover:border-white/[0.2] hover:bg-surface/90 hover:shadow-[0_20px_40px_-20px_oklch(0_0_0/0.7)]"
    >
      {/* Mock Creative Preview Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-hairline bg-background/80 p-3 sm:aspect-[16/11]">
        {/* Ad Canvas Rendering */}
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-white/[0.06] bg-gradient-to-br from-surface to-background/95 p-3 shadow-inner">
          {/* Top Header inside Ad */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded bg-black/40 px-2 py-0.5 font-mono text-[9px] font-medium tracking-wide text-foreground backdrop-blur-sm">
              {asset.type === 'VIDEO' ? (
                <Video className="size-2.5 text-primary" />
              ) : asset.type === 'CAROUSEL' ? (
                <Layers className="size-2.5 text-primary" />
              ) : (
                <ImageIcon className="size-2.5 text-primary" />
              )}
              {asset.format}
            </span>

            {asset.badgeText && (
              <span className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                {asset.badgeText}
              </span>
            )}
          </div>

          {/* Center Graphic */}
          <div className="my-auto flex flex-col items-center justify-center text-center">
            {asset.type === 'VIDEO' ? (
              <div className="relative flex size-10 items-center justify-center rounded-full bg-white/10 text-primary shadow-[0_0_20px_-3px_currentColor] transition-transform duration-300 group-hover:scale-110">
                <Play className="size-4 fill-current pl-0.5" />
                {asset.duration && (
                  <span className="absolute -bottom-4 font-mono text-[8.5px] text-muted-foreground">
                    {asset.duration}
                  </span>
                )}
              </div>
            ) : asset.type === 'CAROUSEL' ? (
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className="size-7 rounded-md border border-white/15 bg-surface-2/90 shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className={cn('size-1 rounded-full', dot === 0 ? 'bg-primary' : 'bg-white/20')}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-primary uppercase">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Bottom Headline & Simulated CTA inside Ad */}
          <div className="space-y-1">
            <p className="line-clamp-1 text-[11px] font-semibold text-foreground/95">
              {asset.mockHeadline}
            </p>
            <div className="flex items-center justify-between">
              <p className="line-clamp-1 text-[9.5px] text-muted-foreground">
                {asset.mockSubtext}
              </p>
              <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-[8.5px] font-medium text-primary">
                {asset.mockCta}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Action Overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-surface px-3 py-1.5 text-[11.5px] font-medium text-foreground shadow-lg">
            <Eye className="size-3.5 text-primary" />
            <span>Preview Asset</span>
          </span>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <div className="p-3.5">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[13.5px] font-medium text-foreground group-hover:text-primary transition-colors">
            {asset.name}
          </p>
          <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
            {asset.type}
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-hairline/60 pt-2 font-mono text-[10.5px] text-muted-foreground">
          <span className="truncate text-foreground/80">{asset.collection}</span>
          <span className="shrink-0 rounded bg-white/[0.04] px-1.5 py-0.5 text-primary/90">
            {asset.tag}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
