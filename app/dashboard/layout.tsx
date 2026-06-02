'use client'

import DashboardNav from '@/components/dashboard-nav'
import { useAuth } from '@/app/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, ArrowLeft, Home } from 'lucide-react'

const breadcrumbMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/services': 'Services',
  '/dashboard/profile': 'Profile',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !isLoggedIn) router.push('/login')
  }, [isLoggedIn, loading, router])

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-foreground-muted">Loading…</p>
      </div>
    </div>
  )

  if (!isLoggedIn) return null

  const isHome = pathname === '/dashboard'

  // Build breadcrumb segments
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.map((_, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/')
    return { href, label: breadcrumbMap[href] || segments[i] }
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="pt-32 md:pt-28 pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb + Back Bar */}
          <div className="flex items-center gap-3 mb-6">
            {!isHome && (
              <button
                onClick={() => router.back()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground-secondary hover:text-foreground bg-surface-1 border border-border hover:border-border-strong rounded-lg transition-all duration-200 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <nav className="flex items-center gap-1 text-sm text-foreground-muted" aria-label="Breadcrumb">
              <Link href="/dashboard" className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Home className="w-3.5 h-3.5" />
              </Link>
              {crumbs.slice(1).map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-foreground-muted/50" />
                  {i === crumbs.length - 2 ? (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-foreground transition-colors">{crumb.label}</Link>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {children}
        </div>
      </main>
    </div>
  )
}
