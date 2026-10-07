import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adcanopus.com'
  const currentDate = new Date()

  const routes = [
    '',
    '/features/bulk-campaign-launch',
    '/features/automation',
    '/features/creative-library',
    '/features/multi-ad-account-reporting',
    '/meta-ads',
    '/solutions/ecommerce',
    '/solutions/media-buyers',
    '/solutions/affiliate-marketers',
    '/pricing',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
