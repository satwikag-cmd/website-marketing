export type AccountReport = {
  id: string
  name: string
  initials: string
  tone: string
  spend: number
  spendFormatted: string
  roas: string
  ctr: string
  campaignCount: number
  topCampaign: string
  status: 'Active'
}

export const REPORT_ACCOUNTS: AccountReport[] = [
  {
    id: 'lumen',
    name: 'Lumen Goods',
    initials: 'L',
    tone: 'oklch(0.83 0.135 74)',
    spend: 12450,
    spendFormatted: '$12,450',
    roas: '3.42x',
    ctr: '2.14%',
    campaignCount: 2,
    topCampaign: 'Advantage+ Shopping · Broad Prospecting',
    status: 'Active',
  },
  {
    id: 'northwind',
    name: 'Northwind Outdoors',
    initials: 'N',
    tone: 'oklch(0.75 0.14 200)',
    spend: 8620,
    spendFormatted: '$8,620',
    roas: '2.88x',
    ctr: '1.92%',
    campaignCount: 1,
    topCampaign: 'Retargeting 7D Viewers',
    status: 'Active',
  },
  {
    id: 'fieldhouse',
    name: 'Fieldhouse Sport',
    initials: 'F',
    tone: 'oklch(0.7 0.16 140)',
    spend: 5180,
    spendFormatted: '$5,180',
    roas: '4.15x',
    ctr: '2.68%',
    campaignCount: 1,
    topCampaign: 'UGC Creative Test · Lookalike 1%',
    status: 'Active',
  },
]

export const AGGREGATE_METRICS = {
  totalAccounts: 3,
  totalSpend: '$26,250',
  blendedRoas: '3.42x',
  avgCtr: '2.24%',
}
