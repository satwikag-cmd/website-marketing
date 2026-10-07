export type RowStatus = 'pending' | 'ready' | 'preparing' | 'launching' | 'live'

export type LaunchRowData = {
  id: string
  name: string
  accountId: string
  budget: number
  ads: number
  audience: string
}

export const LAUNCH_ROWS: LaunchRowData[] = [
  { id: '01', name: 'Prospecting — Broad', accountId: 'lumen', budget: 1200, ads: 12, audience: 'Broad · US 25–54' },
  { id: '02', name: 'Retargeting — 7D Viewers', accountId: 'northwind', budget: 650, ads: 6, audience: 'Video viewers · 7D' },
  { id: '03', name: 'UGC Creative Test', accountId: 'fieldhouse', budget: 400, ads: 18, audience: 'Lookalike · 1%' },
  { id: '04', name: 'Advantage+ Shopping', accountId: 'lumen', budget: 2100, ads: 24, audience: 'Advantage+ audience' },
]

/*
  The whole story is driven by one 0→1 progress value.
  Desktop maps it to scroll position; smaller screens play it on a timer.
*/
export const TIMING = {
  appear: 0.1,
  appearGap: 0.075,
  appearSpan: 0.06,
  launch: 0.42,
  launchGap: 0.06,
  prepare: 0.05,
  run: 0.12,
  summary: 0.82,
}

export const appearAt = (i: number) => TIMING.appear + i * TIMING.appearGap
export const launchAt = (i: number) => TIMING.launch + i * TIMING.launchGap
export const LAUNCH_END = launchAt(LAUNCH_ROWS.length - 1) + TIMING.prepare + TIMING.run

export const STAGE_RANGES: [number, number][] = [
  [0, TIMING.appear],
  [TIMING.appear, TIMING.launch],
  [TIMING.launch, LAUNCH_END],
  [LAUNCH_END, TIMING.summary],
]

export const STAGE_TARGETS: number[] = [0, 0.32, 0.62, 0.92]

export function statusAt(p: number, i: number): RowStatus {
  if (p < appearAt(i) + TIMING.appearSpan * 0.5) return 'pending'
  const start = launchAt(i)
  if (p < start) return 'ready'
  if (p < start + TIMING.prepare) return 'preparing'
  if (p < start + TIMING.prepare + TIMING.run) return 'launching'
  return 'live'
}

export function stageAt(p: number) {
  if (p < TIMING.appear) return 0
  if (p < TIMING.launch) return 1
  if (p < LAUNCH_END) return 2
  return 3
}

export type Snapshot = {
  stage: number
  statuses: RowStatus[]
  visible: number
  live: number
  summary: boolean
  key: string
}

export function snapshotAt(p: number): Snapshot {
  const statuses = LAUNCH_ROWS.map((_, i) => statusAt(p, i))
  const stage = stageAt(p)
  const summary = p >= TIMING.summary
  return {
    stage,
    statuses,
    visible: statuses.filter((s) => s !== 'pending').length,
    live: statuses.filter((s) => s === 'live').length,
    summary,
    key: `${stage}|${statuses.join()}|${summary}`,
  }
}

export function totalsFor(visible: number) {
  const rows = LAUNCH_ROWS.slice(0, visible)
  return {
    campaigns: rows.length,
    accounts: new Set(rows.map((r) => r.accountId)).size,
    ads: rows.reduce((sum, r) => sum + r.ads, 0),
  }
}
