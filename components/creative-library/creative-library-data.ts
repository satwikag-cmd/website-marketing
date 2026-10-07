export type AssetType = 'VIDEO' | 'STATIC' | 'CAROUSEL'
export type AspectRatio = '9:16' | '1:1' | '4:5'

export type CreativeAsset = {
  id: string
  name: string
  type: AssetType
  format: AspectRatio
  collection: string
  tag: string
  duration?: string
  slides?: number
  accentColor: string
  mockHeadline: string
  mockSubtext: string
  mockCta: string
  badgeText?: string
}

export const COLLECTIONS = [
  'All Collections',
  'Product Launch',
  'Testimonials',
  'Summer Campaign',
  'Retargeting',
] as const

export const TYPE_FILTERS = [
  'All Formats',
  'Video',
  'Static',
  'Carousel',
] as const

export const MOCK_CREATIVES: CreativeAsset[] = [
  {
    id: 'cr-01',
    name: 'Product Demo',
    type: 'VIDEO',
    format: '9:16',
    collection: 'Product Launch',
    tag: 'Feature Focus',
    duration: '0:15',
    accentColor: 'oklch(0.83 0.135 74)',
    mockHeadline: 'The New Standard in Performance',
    mockSubtext: 'Engineered for seamless daily workflows',
    mockCta: 'Shop Now',
    badgeText: 'HD 1080p',
  },
  {
    id: 'cr-02',
    name: 'Customer Story',
    type: 'VIDEO',
    format: '9:16',
    collection: 'Testimonials',
    tag: 'Social Proof',
    duration: '0:30',
    accentColor: 'oklch(0.82 0.125 168)',
    mockHeadline: '“Changed our daily routine forever.”',
    mockSubtext: 'Alex M. — Verified Customer',
    mockCta: 'Watch Story',
    badgeText: 'UGC Reel',
  },
  {
    id: 'cr-03',
    name: 'Summer Offer',
    type: 'STATIC',
    format: '1:1',
    collection: 'Summer Campaign',
    tag: 'Promotion',
    accentColor: 'oklch(0.78 0.16 55)',
    mockHeadline: 'Summer Edition Now Live',
    mockSubtext: 'Complimentary shipping on orders over $50',
    mockCta: 'Claim Offer',
    badgeText: 'Seasonal',
  },
  {
    id: 'cr-04',
    name: 'Feature Comparison',
    type: 'CAROUSEL',
    format: '4:5',
    collection: 'Product Launch',
    tag: 'Comparison',
    slides: 3,
    accentColor: 'oklch(0.75 0.14 220)',
    mockHeadline: 'Traditional Setup vs Adcanopus',
    mockSubtext: 'Side-by-side workflow breakdown',
    mockCta: 'Swipe Details',
    badgeText: '3 Slides',
  },
  {
    id: 'cr-05',
    name: 'Founder Story',
    type: 'VIDEO',
    format: '9:16',
    collection: 'Product Launch',
    tag: 'Brand Story',
    duration: '0:45',
    accentColor: 'oklch(0.83 0.135 74)',
    mockHeadline: 'Why We Built This From Scratch',
    mockSubtext: 'Elena R. — Product Co-Founder',
    mockCta: 'Learn More',
    badgeText: 'Story Cut',
  },
  {
    id: 'cr-06',
    name: 'Lifestyle Ad',
    type: 'STATIC',
    format: '4:5',
    collection: 'Retargeting',
    tag: 'Lifestyle',
    accentColor: 'oklch(0.72 0.14 300)',
    mockHeadline: 'Designed For Modern Life',
    mockSubtext: 'Precision craftsmanship in every detail',
    mockCta: 'Explore Collection',
    badgeText: 'DTC Focus',
  },
  {
    id: 'cr-07',
    name: 'Unboxing Experience',
    type: 'VIDEO',
    format: '9:16',
    collection: 'Testimonials',
    tag: 'Unboxing',
    duration: '0:20',
    accentColor: 'oklch(0.82 0.125 168)',
    mockHeadline: 'First Look & Package Reveal',
    mockSubtext: 'Unboxing the new edition',
    mockCta: 'Order Now',
    badgeText: 'Unboxing',
  },
  {
    id: 'cr-08',
    name: 'Seasonal Catalog',
    type: 'CAROUSEL',
    format: '4:5',
    collection: 'Summer Campaign',
    tag: 'Catalog',
    slides: 4,
    accentColor: 'oklch(0.78 0.16 55)',
    mockHeadline: 'Best-Selling Summer Styles',
    mockSubtext: 'Explore our latest collection curated for you',
    mockCta: 'Browse Catalog',
    badgeText: '4 Slides',
  },
]
