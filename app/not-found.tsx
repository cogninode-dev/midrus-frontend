import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] font-bold text-surface-3 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-accent-muted rounded-3xl flex items-center justify-center animate-float border border-accent-subtle">
              <svg className="w-10 h-10 text-link" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-foreground mb-3">Page not found</h2>
        <p className="text-foreground-secondary text-sm mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover active:bg-accent-active transition-all duration-200 active:scale-[0.98] shadow-sm"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-1 text-foreground font-semibold rounded-lg border border-border hover:bg-surface-2 hover:border-border-strong transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
