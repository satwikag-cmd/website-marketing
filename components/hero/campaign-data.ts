export type CampaignStatus = 'draft' | 'queued' | 'launching' | 'live'

export type AdAccount = {
  id: string
  name: string
  initials: string
  tone: string
}

export type Campaign = {
  id: string
  code: string
  name: string
  accountId: AdAccount['id']
  dailyBudget: number
  adSets: number
  ads: number
  objective: string
  creatives: string[]
}

export const AD_ACCOUNTS: AdAccount[] = [
  { id: 'lumen', name: 'Lumen Skincare', initials: 'LS', tone: 'oklch(0.8 0.11 60)' },
  { id: 'northwind', name: 'Northwind Apparel', initials: 'NA', tone: 'oklch(0.74 0.08 235)' },
  { id: 'fieldhouse', name: 'Fieldhouse Goods', initials: 'FG', tone: 'oklch(0.78 0.09 150)' },
]

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp-a',
    code: '2384 0917',
    name: 'BFCM — Prospecting Broad',
    accountId: 'lumen',
    dailyBudget: 1200,
    adSets: 4,
    ads: 12,
    objective: 'Sales',
    creatives: [
      'linear-gradient(140deg, oklch(0.78 0.09 60), oklch(0.5 0.08 40))',
      'linear-gradient(160deg, oklch(0.88 0.04 80), oklch(0.62 0.07 55))',
      'linear-gradient(120deg, oklch(0.6 0.06 30), oklch(0.35 0.04 20))',
    ],
  },
  {
    id: 'cmp-b',
    code: '2384 1142',
    name: 'Retargeting — 7D Viewers',
    accountId: 'northwind',
    dailyBudget: 650,
    adSets: 2,
    ads: 6,
    objective: 'Sales',
    creatives: [
      'linear-gradient(150deg, oklch(0.62 0.07 240), oklch(0.32 0.04 250))',
      'linear-gradient(130deg, oklch(0.82 0.03 230), oklch(0.52 0.06 240))',
    ],
  },
  {
    id: 'cmp-c',
    code: '2384 1308',
    name: 'UGC Creative Test — Hooks v3',
    accountId: 'fieldhouse',
    dailyBudget: 400,
    adSets: 6,
    ads: 18,
    objective: 'Conversions',
    creatives: [
      'linear-gradient(150deg, oklch(0.74 0.08 150), oklch(0.4 0.05 160))',
      'linear-gradient(110deg, oklch(0.86 0.05 110), oklch(0.56 0.07 140))',
      'linear-gradient(170deg, oklch(0.55 0.05 170), oklch(0.3 0.03 180))',
    ],
  },
  {
    id: 'cmp-d',
    code: '2384 1455',
    name: 'Advantage+ Shopping — Evergreen',
    accountId: 'lumen',
    dailyBudget: 2100,
    adSets: 1,
    ads: 24,
    objective: 'Sales',
    creatives: [
      'linear-gradient(140deg, oklch(0.84 0.08 75), oklch(0.58 0.1 55))',
      'linear-gradient(160deg, oklch(0.7 0.05 40), oklch(0.4 0.05 30))',
    ],
  },
]

export const AUTOMATION_TARGET = { campaignIndex: 0, budgetMultiplier: 1.2, roasThreshold: 3.5 }

export type Metrics = { spend: number; roas: number; ctr: number; conversions: number }

export const METRIC_BASE: Metrics = { spend: 12480, roas: 3.42, ctr: 1.84, conversions: 1204 }

export const METRIC_LIFT: Metrics[] = [
  { spend: 1840, roas: 0.14, ctr: 0.16, conversions: 138 },
  { spend: 920, roas: 0.11, ctr: 0.12, conversions: 96 },
  { spend: 610, roas: 0.05, ctr: 0.09, conversions: 61 },
  { spend: 2650, roas: 0.14, ctr: 0.1, conversions: 117 },
]

export const SPEND_SHARE = [
  { accountId: 'lumen', share: 0.54 },
  { accountId: 'northwind', share: 0.27 },
  { accountId: 'fieldhouse', share: 0.19 },
]

export function getAccount(id: string) {
  return AD_ACCOUNTS.find((a) => a.id === id) ?? AD_ACCOUNTS[0]
}

export function computeMetrics(statuses: CampaignStatus[]): Metrics {
  return statuses.reduce<Metrics>(
    (acc, status, i) => {
      if (status !== 'live') return acc
      const lift = METRIC_LIFT[i]
      return {
        spend: acc.spend + lift.spend,
        roas: acc.roas + lift.roas,
        ctr: acc.ctr + lift.ctr,
        conversions: acc.conversions + lift.conversions,
      }
    },
    { ...METRIC_BASE },
  )
}

export const formatCurrency = (v: number) =>
  `$${Math.round(v).toLocaleString('en-US')}`
export const formatRoas = (v: number) => `${v.toFixed(2)}x`
export const formatPercent = (v: number) => `${v.toFixed(2)}%`
export const formatInteger = (v: number) => Math.round(v).toLocaleString('en-US')
