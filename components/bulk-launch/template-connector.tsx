'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { LAUNCH_ROWS, TIMING, appearAt, type RowStatus } from './bulk-launch-data'

const WIDTH = 64
const HEADER = 32
const ROW = 56
const HEIGHT = HEADER + ROW * LAUNCH_ROWS.length
const ORIGIN_Y = HEIGHT / 2

export function TemplateConnector({ progress, statuses }: { progress: MotionValue<number>; statuses: RowStatus[] }) {
  return (
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none" aria-hidden="true" className="block">
      <circle cx={2} cy={ORIGIN_Y} r="3" className="fill-primary" />
      {LAUNCH_ROWS.map((row, i) => (
        <Branch key={row.id} index={i} targetY={HEADER + ROW * i + ROW / 2} progress={progress} status={statuses[i]} />
      ))}
    </svg>
  )
}

function Branch({
  index,
  targetY,
  progress,
  status,
}: {
  index: number
  targetY: number
  progress: MotionValue<number>
  status: RowStatus
}) {
  const start = appearAt(index)
  const pathLength = useTransform(progress, [start - 0.04, start + TIMING.appearSpan * 0.8], [0, 1])
  const endOpacity = useTransform(progress, [start + 0.02, start + TIMING.appearSpan], [0, 1])
  const active = status === 'preparing' || status === 'launching'
  const live = status === 'live'

  return (
    <g className={cn('transition-colors duration-500', live ? 'text-signal' : active ? 'text-primary' : 'text-white/20')}>
      {/* Background guide path */}
      <path
        d={`M2 ${ORIGIN_Y} C ${WIDTH * 0.55} ${ORIGIN_Y}, ${WIDTH * 0.45} ${targetY}, ${WIDTH - 4} ${targetY}`}
        stroke="currentColor"
        strokeOpacity={0.15}
        strokeWidth="1"
      />
      {/* Animated active path */}
      <motion.path
        d={`M2 ${ORIGIN_Y} C ${WIDTH * 0.55} ${ORIGIN_Y}, ${WIDTH * 0.45} ${targetY}, ${WIDTH - 4} ${targetY}`}
        stroke="currentColor"
        strokeWidth={active || live ? 1.5 : 1}
        style={{ pathLength }}
      />
      {/* Target connection node */}
      <motion.circle
        cx={WIDTH - 3}
        cy={targetY}
        r={active || live ? 2.5 : 2}
        fill="currentColor"
        style={{ opacity: endOpacity }}
      />
    </g>
  )
}

