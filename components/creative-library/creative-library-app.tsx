'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, FolderKanban, Sparkles, Filter, Check, Layers, Image as ImageIcon, Video } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  COLLECTIONS,
  TYPE_FILTERS,
  MOCK_CREATIVES,
  type CreativeAsset,
} from './creative-library-data'
import { CreativeCard } from './creative-card'
import { CreativePreviewModal } from './creative-preview-modal'

export function CreativeLibraryApp() {
  const [selectedCollection, setSelectedCollection] = useState<string>('All Collections')
  const [selectedType, setSelectedType] = useState<string>('All Formats')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedAsset, setSelectedAsset] = useState<CreativeAsset | null>(null)

  const filteredAssets = useMemo(() => {
    return MOCK_CREATIVES.filter((asset) => {
      // Collection filter
      if (selectedCollection !== 'All Collections' && asset.collection !== selectedCollection) {
        return false
      }
      // Type filter
      if (selectedType === 'Video' && asset.type !== 'VIDEO') return false
      if (selectedType === 'Static' && asset.type !== 'STATIC') return false
      if (selectedType === 'Carousel' && asset.type !== 'CAROUSEL') return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesName = asset.name.toLowerCase().includes(q)
        const matchesTag = asset.tag.toLowerCase().includes(q)
        const matchesCol = asset.collection.toLowerCase().includes(q)
        if (!matchesName && !matchesTag && !matchesCol) return false
      }

      return true
    })
  }, [selectedCollection, selectedType, searchQuery])

  return (
    <section id="library-demo" aria-labelledby="library-demo-heading" className="relative isolate py-12 md:py-16">
      <div className="container-site">
        {/* Main Application Container */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_60px_-20px_oklch(0_0_0/0.08)] dark:border-white/[0.09] dark:shadow-[0_60px_120px_-40px_oklch(0_0_0/0.85),0_0_0_1px_oklch(0_0_0/0.4),inset_0_1px_0_oklch(1_0_0/0.06)]">
          {/* Window Chrome */}
          <div className="flex h-11 items-center justify-between border-b border-hairline bg-surface-2/30 px-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-2.5 rounded-full bg-border dark:bg-white/[0.08]" />
                ))}
              </div>
              <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <span className="hidden sm:inline">Workspace</span>
                <span className="hidden text-muted-foreground/40 sm:inline">/</span>
                <span>Assets</span>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-foreground/90 font-medium">Creative Library</span>
              </p>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-signal" />
              Synced &amp; Ready
            </span>
          </div>

          {/* Library Control Bar */}
          <div className="flex flex-col gap-4 border-b border-hairline p-4 md:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Search input */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search creatives by name, format, or tag..."
                  className="h-10 w-full rounded-lg border border-border bg-surface-2/60 pl-10 pr-4 text-[13.5px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10.5px] text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Format Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {TYPE_FILTERS.map((type) => {
                  const active = selectedType === type
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        'inline-flex h-8 items-center gap-1.5 rounded-md px-3 font-mono text-[11px] transition-all',
                        active
                          ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                          : 'bg-surface-2/60 text-muted-foreground hover:bg-surface-2 hover:text-foreground',
                      )}
                    >
                      {type === 'Video' && <Video className="size-3" />}
                      {type === 'Static' && <ImageIcon className="size-3" />}
                      {type === 'Carousel' && <Layers className="size-3" />}
                      <span>{type}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Collection Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2">
              <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
                Collections:
              </span>
              <div className="flex gap-1.5">
                {COLLECTIONS.map((col) => {
                  const active = selectedCollection === col
                  return (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedCollection(col)}
                      className={cn(
                        'shrink-0 rounded-md px-2.5 py-1 text-[12px] transition-colors',
                        active
                          ? 'bg-white/[0.08] text-foreground font-medium ring-1 ring-white/15'
                          : 'text-muted-foreground hover:bg-white/[0.03] hover:text-foreground',
                      )}
                    >
                      {col}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Grid of Mock Creative Assets */}
          <div className="p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>
                Showing <strong className="text-foreground">{filteredAssets.length}</strong> of{' '}
                {MOCK_CREATIVES.length} assets
              </span>
              <span>Click asset to view details</span>
            </div>

            {filteredAssets.length > 0 ? (
              <motion.div
                layout
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              >
                <AnimatePresence>
                  {filteredAssets.map((asset) => (
                    <CreativeCard
                      key={asset.id}
                      asset={asset}
                      onSelect={(a) => setSelectedAsset(a)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-[15px] font-medium text-foreground">No matching creatives</p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCollection('All Collections')
                    setSelectedType('All Formats')
                    setSearchQuery('')
                  }}
                  className="mt-4 rounded-md bg-white/[0.06] px-3.5 py-1.5 font-mono text-[11px] text-foreground hover:bg-white/[0.1]"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Detail Inspection */}
        <CreativePreviewModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      </div>
    </section>
  )
}
