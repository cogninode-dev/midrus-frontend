import type { MetadataRoute } from 'next'

// TODO: update once a custom domain (e.g. midrusindia.com) is pointed at
// this deployment — see NEXT_PUBLIC_SITE_URL.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://midrus.vercel.app'

const routes = [
  '',
  '/services',
  '/services/accounting',
  '/services/audit',
  '/services/financial-advisory',
  '/services/manpower',
  '/services/registration',
  '/services/tax',
  '/team',
  '/process',
  '/contact',
  '/legal/terms',
  '/legal/privacy',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))
}
