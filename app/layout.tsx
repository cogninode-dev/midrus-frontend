import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/app/auth-context'
import './globals.css'

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

// TODO: update once a custom domain (e.g. midrusindia.com) is pointed at
// this deployment — see NEXT_PUBLIC_SITE_URL.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://midrus.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MIDRUS | Accounting, Tax & Company Registration',
    template: '%s',
  },
  description: 'MIDRUS provides professional accounting, GST & income tax consultancy, and company registration services across India.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'MIDRUS',
    title: 'MIDRUS | Accounting, Tax & Company Registration',
    description: 'Professional accounting, GST & income tax consultancy, and company registration services across India.',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary',
    title: 'MIDRUS | Accounting, Tax & Company Registration',
    description: 'Professional accounting, GST & income tax consultancy, and company registration services across India.',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AuthProvider>
      </body>
    </html>
  )
}
