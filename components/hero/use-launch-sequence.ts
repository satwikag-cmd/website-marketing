'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { CAMPAIGNS, type CampaignStatus } from './campaign-data'

export const LAUNCH_DURATION_MS = 1500

export type LaunchPhase = 'idle' | 'launching' | 'complete'

export type LaunchSequenceState = {
  cycle: number
  phase: LaunchPhase
  statuses: CampaignStatus[]
  automationFired: boolean
}

const initialState = (cycle: number): LaunchSequenceState => ({
  cycle,
  phase: 'idle',
  statuses: CAMPAIGNS.map(() => 'draft'),
  automationFired: false,
})

const settledState: LaunchSequenceState = {
  cycle: 0,
  phase: 'complete',
  statuses: CAMPAIGNS.map(() => 'live'),
  automationFired: true,
}

type Options = { startDelay?: number; holdDuration?: number }

/**
 * Drives the hero demo: Draft → Queued → Launching → Live for each campaign,
 * then an automation rule fires, holds, and replays.
 */
export function useLaunchSequence({ startDelay = 2200, holdDuration = 9000 }: Options = {}) {
  const reduceMotion = useReducedMotion()
  const [state, setState] = useState<LaunchSequenceState>(() => initialState(0))

  useEffect(() => {
    if (reduceMotion) {
      setState(settledState)
      return
    }

    const timers: number[] = []
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms))
    const setStatus = (index: number, status: CampaignStatus) =>
      setState((prev) => ({
        ...prev,
        statuses: prev.statuses.map((s, i) => (i === index ? status : s)),
      }))

    const begin = state.cycle === 0 ? startDelay : 1200
    const stagger = 650

    at(begin, () => setState((prev) => ({ ...prev, phase: 'launching' })))
    CAMPAIGNS.forEach((_, i) => {
      at(begin + 120 + i * 90, () => setStatus(i, 'queued'))
      at(begin + 700 + i * stagger, () => setStatus(i, 'launching'))
      at(begin + 700 + i * stagger + LAUNCH_DURATION_MS, () => setStatus(i, 'live'))
    })

    const allLive = begin + 700 + (CAMPAIGNS.length - 1) * stagger + LAUNCH_DURATION_MS
    at(allLive + 250, () => setState((prev) => ({ ...prev, phase: 'complete' })))
    at(allLive + 1400, () => setState((prev) => ({ ...prev, automationFired: true })))
    at(allLive + 1400 + holdDuration, () => setState(initialState(state.cycle + 1)))

    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [state.cycle, reduceMotion, startDelay, holdDuration])

  const liveCount = state.statuses.filter((s) => s === 'live').length
  return { ...state, liveCount }
}
