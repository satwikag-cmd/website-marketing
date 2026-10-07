'use client'

import { useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'
import { CampaignConsole } from './campaign-console'
import { MetricsPanel } from './metrics-panel'
import { AutomationEvent } from './automation-event'
import type { useLaunchSequence } from './use-launch-sequence'

type Sequence = ReturnType<typeof useLaunchSequence>

export function ProductStage({ sequence }: { sequence: Sequence }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] })

  const rotateX = useTransform(scrollYProgress, [0.35, 1], reduceMotion ? [0, 0] : [16, 0])
  const scale = useTransform(scrollYProgress, [0.35, 1], reduceMotion ? [1, 1] : [0.94, 1])
  const panelY = useTransform(scrollYProgress, [0.35, 1], reduceMotion ? [0, 0] : [36, -12])
  const toastY = useTransform(scrollYProgress, [0.35, 1], reduceMotion ? [0, 0] : [24, -4])

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ perspective: 2200 }}>
      <motion.div
        initial={{ opacity: 0, y: 64 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.55, ease: EASE_OUT }}
      >
        <motion.div
          style={{ rotateX, scale, transformOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
          className="relative"
        >
          <div
            role="img"
            aria-label="Adcanopus campaign manager: four Meta campaigns across three ad accounts move from draft to live while spend, ROAS, CTR and conversions update."
            className="relative"
          >
            <div aria-hidden="true" className="w-[82%]">
              <CampaignConsole
                statuses={sequence.statuses}
                phase={sequence.phase}
                liveCount={sequence.liveCount}
                automationFired={sequence.automationFired}
              />
            </div>

            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.25, ease: EASE_OUT }}
              style={{ y: panelY }}
              className="absolute right-0 top-[26%] w-[25%] min-w-[260px]"
            >
              <MetricsPanel statuses={sequence.statuses} />
            </motion.div>

            <motion.div aria-hidden="true" style={{ y: toastY }} className="absolute -bottom-6 left-[4%] w-[340px]">
              <AnimatePresence>
                {sequence.automationFired && (
                  <motion.div
                    key={sequence.cycle}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  >
                    <AutomationEvent />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
