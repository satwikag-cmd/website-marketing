'use client'

import { useId, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE_IN_OUT } from '@/lib/motion'
import { cn } from '@/lib/utils'

const POINTS = 24
const WIDTH = 640
const HEIGHT = 170
const PAD_Y = 14

const baseSpend = Array.from({ length: POINTS }, (_, i) => 0.28 + 0.1 * Math.sin(i / 2.6) + i * 0.011)
const baseRoas = Array.from({ length: POINTS }, (_, i) => 0.42 + 0.08 * Math.cos(i / 3.1) + i * 0.006)

const boostedSpend = baseSpend.map((v, i) => (i >= 16 ? v + (i - 15) * 0.034 : v))
const boostedRoas = baseRoas.map((v, i) => (i >= 16 ? v + (i - 15) * 0.026 : v))

type Point = [number, number]

function toPoints(values: number[]): Point[] {
  return values.map((v, i) => [(i / (values.length - 1)) * WIDTH, HEIGHT - PAD_Y - v * (HEIGHT - PAD_Y * 2)])
}

function smoothPath(points: Point[]) {
  let d = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`
  }
  return d
}

const areaPath = (line: string) => `${line} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`

const series = (boosted: boolean) => {
  const spend = boosted ? boostedSpend : baseSpend
  const roas = boosted ? boostedRoas : baseRoas
  const spendLine = smoothPath(toPoints(spend))
  return {
    spend,
    roas,
    spendLine,
    spendArea: areaPath(spendLine),
    roasLine: smoothPath(toPoints(roas)),
  }
}

const SERIES = { base: series(false), boosted: series(true) }

type PerformanceChartProps = {
  boosted: boolean
  drawDelay?: number
  className?: string
  interactive?: boolean
}

export function PerformanceChart({ boosted, drawDelay = 0.9, className, interactive = true }: PerformanceChartProps) {
  const gradientId = useId()
  const ref = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const data = boosted ? SERIES.boosted : SERIES.base

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    setHover(Math.round(ratio * (POINTS - 1)))
  }

  const hoverX = hover !== null ? (hover / (POINTS - 1)) * 100 : 0
  const pointY = (v: number) => ((HEIGHT - PAD_Y - v * (HEIGHT - PAD_Y * 2)) / HEIGHT) * 100

  return (
    <div
      ref={ref}
      className={cn('relative select-none', interactive && 'cursor-crosshair', className)}
      onPointerMove={interactive ? handleMove : undefined}
      onPointerLeave={interactive ? () => setHover(null) : undefined}
    >
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="block h-auto w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((y) => (
          <line
            key={y}
            x1="0"
            x2={WIDTH}
            y1={HEIGHT * y}
            y2={HEIGHT * y}
            stroke="oklch(1 0 0 / 0.06)"
            strokeDasharray="2 4"
          />
        ))}

        <motion.path
          initial={{ opacity: 0, d: data.spendArea }}
          animate={{ opacity: 1, d: data.spendArea }}
          transition={{ opacity: { duration: 1, delay: drawDelay + 0.6 }, d: { duration: 1.4, ease: EASE_IN_OUT } }}
          fill={`url(#${gradientId})`}
        />
        <motion.path
          initial={{ pathLength: 0, d: data.spendLine }}
          animate={{ pathLength: 1, d: data.spendLine }}
          transition={{
            pathLength: { duration: 1.8, delay: drawDelay, ease: EASE_IN_OUT },
            d: { duration: 1.4, ease: EASE_IN_OUT },
          }}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <motion.path
          initial={{ pathLength: 0, d: data.roasLine }}
          animate={{ pathLength: 1, d: data.roasLine }}
          transition={{
            pathLength: { duration: 1.8, delay: drawDelay + 0.25, ease: EASE_IN_OUT },
            d: { duration: 1.4, ease: EASE_IN_OUT },
          }}
          fill="none"
          stroke="var(--signal)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <AnimatePresence>
        {hover !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-y-0 w-px bg-white/15" style={{ left: `${hoverX}%` }} />
            <span
              className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary"
              style={{ left: `${hoverX}%`, top: `${pointY(data.spend[hover])}%` }}
            />
            <span
              className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-signal"
              style={{ left: `${hoverX}%`, top: `${pointY(data.roas[hover])}%` }}
            />
            <div
              className={cn(
                'absolute top-1 min-w-[132px] rounded-md border border-border bg-surface-3/95 px-2.5 py-2 font-mono text-[10.5px] shadow-xl backdrop-blur',
                hover > POINTS * 0.6 ? '-translate-x-[calc(100%+10px)]' : 'translate-x-[10px]',
              )}
              style={{ left: `${hoverX}%` }}
            >
              <div className="mb-1.5 text-muted-foreground">{`${String(hover).padStart(2, '0')}:00 — today`}</div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Spend
                </span>
                <span className="tabular-nums text-foreground">{`$${Math.round(data.spend[hover] * 1480).toLocaleString('en-US')}`}</span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-signal" />
                  ROAS
                </span>
                <span className="tabular-nums text-foreground">{`${(2.2 + data.roas[hover] * 2.4).toFixed(2)}x`}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
