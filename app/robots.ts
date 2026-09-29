import type { MetadataRoute } from 'next'

// TODO: update once a custom domain (e.g. midrusindia.com) is pointed at
// this deployment — see NEXT_PUBLIC_SITE_URL.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://midrus.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Customer-only areas: no SEO value, and account/session-gated pages
      // shouldn't be indexed or show up in search results.
      disallow: ['/dashboard', '/login', '/signup', '/forgot-password'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
