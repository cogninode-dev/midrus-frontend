'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Image src="/logo.png" alt="MIDRUS" width={56} height={56} className="object-contain mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">MIDRUS</h1>
          <p className="text-foreground-secondary text-sm">Accounting, Tax & Compliance Portal</p>
        </div>

        {/* Trust Line */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="w-4 h-4 text-success" />
          <p className="text-xs text-foreground-muted">Trusted by 200+ businesses for compliance & filings</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-1 border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">Sign In</h2>

          {error && (
            <div className="mb-6 p-4 bg-error-bg border border-error/20 rounded-lg text-error text-sm flex items-center gap-2 animate-scaleIn">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              {error}
            </div>
          )}
          {forgotSent && (
            <div className="mb-6 p-4 bg-accent-muted border border-accent/30 rounded-lg text-foreground text-sm flex items-center gap-2 animate-scaleIn">
              <svg className="w-4 h-4 flex-shrink-0 text-link" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Please contact <span className="font-semibold mx-1">admin@midrus.com</span> to reset your password.
            </div>
          )}

          <form onSubmit={handleSubmit} method="POST" className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-surface-1 border border-border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-link font-semibold hover:text-link-hover hover:underline transition-colors"
                  onClick={() => setForgotSent(true)}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-surface-1 border border-border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground-muted hover:text-foreground transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-accent/40"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover active:bg-accent-active disabled:bg-surface-3 disabled:text-foreground-muted disabled:cursor-not-allowed transition-all duration-200 mt-8 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-xs text-foreground-muted">OR</span>
            <div className="h-px flex-1 bg-border"></div>
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm text-foreground-secondary">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-link font-semibold hover:text-link-hover hover:underline transition-colors">
              Sign up here
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
