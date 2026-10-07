'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { STAGE_RANGES } from './bulk-launch-data'

const STEPS = ['Template', 'Duplicate', 'Launch', 'Live']

type LaunchStepperProps = {
  progress: MotionValue<number>
  stage: number
  onSelectStage?: (index: number) => void
}

export function LaunchStepper({ progress, stage, onSelectStage }: LaunchStepperProps) {
  return (
    <ol aria-label="Bulk launch phases" className="grid grid-cols-4 gap-2 md:gap-3">
      {STEPS.map((label, i) => (
        <Step
          key={label}
          index={i}
          label={label}
          progress={progress}
          state={i < stage ? 'done' : i === stage ? 'active' : 'todo'}
          onSelect={onSelectStage ? () => onSelectStage(i) : undefined}
        />
      ))}
    </ol>
  )
}

function Step({
  index,
  label,
  progress,
  state,
  onSelect,
}: {
  index: number
  label: string
  progress: MotionValue<number>
  state: 'done' | 'active' | 'todo'
  onSelect?: () => void
}) {
  const [from, to] = STAGE_RANGES[index]
  const scaleX = useTransform(progress, [from, to], [0, 1])
  const Component = onSelect ? 'button' : 'div'

  return (
    <li aria-current={state === 'active' ? 'step' : undefined} className="min-w-0">
      <Component
        type={onSelect ? 'button' : undefined}
        onClick={onSelect}
        className={cn(
          'group block w-full text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
          onSelect && 'cursor-pointer',
        )}
      >
        <div className="relative h-px overflow-hidden bg-white/[0.08]">
          <motion.div
            style={{ scaleX, originX: 0 }}
            className={cn('absolute inset-0 transition-colors duration-300', index === 3 ? 'bg-signal' : 'bg-primary')}
          />
        </div>
        <p
          className={cn(
            'mt-2.5 flex items-center gap-2 truncate text-[12px] transition-colors duration-300 md:text-[13px]',
            state === 'todo' ? 'text-muted-foreground/70 group-hover:text-muted-foreground' : 'text-foreground',
          )}
        >
          <span
            className={cn(
              'font-mono text-[10.5px] transition-colors duration-300',
              state === 'active' ? 'text-primary' : state === 'done' ? 'text-signal/90' : 'text-muted-foreground',
            )}
          >
            {`0${index + 1}`}
          </span>
          <span className="truncate">{label}</span>
        </p>
      </Component>
    </li>
  )
}

