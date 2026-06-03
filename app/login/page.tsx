'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { apiResendLoginOtp } from '@/lib/api'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, ShieldCheck, Mail, RefreshCw, X } from 'lucide-react'
import Image from 'next/image'

type Step = 'credentials' | 'otp'

export default function LoginPage() {
  const [step, setStep]           = useState<Step>('credentials')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [forgotSent, setForgotSent] = useState(false)

  // OTP step
  const [otp, setOtp]                   = useState('')
  const [otpError, setOtpError]         = useState('')
  const [otpLoading, setOtpLoading]     = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const otpInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const { login, loginVerify } = useAuth()

  useEffect(() => {
    if (step === 'otp') otpInputRef.current?.focus()
  }, [step])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [resendCooldown])

  // ─── Step 1: credentials ───────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await login(email, password)
      if (result?.otp_required) {
        setStep('otp')
        setResendCooldown(60)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // ─── Step 2: OTP ───────────────────────────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) { setOtpError('Enter the 6-digit OTP'); return }
    setOtpLoading(true)
    setOtpError('')
    try {
      await loginVerify(email, otp)
      router.push('/dashboard')
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setOtpLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return
    try {
      await apiResendLoginOtp(email)
      setResendCooldown(60)
      setOtpError('')
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : 'Failed to resend OTP')
    }
  }

  // ─── OTP screen ────────────────────────────────────────────────────────────
  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-fadeInUp">
          <div className="mb-8 text-center">
            <Image src="/logo.png" alt="MIDRUS" width={56} height={56} className="object-contain mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-2">MIDRUS</h1>
          </div>

          <div className="bg-surface-1 border border-border rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 bg-accent-muted rounded-full flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-link" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Check your email</h2>
              <p className="text-foreground-secondary text-sm">
                We sent a 6-digit OTP to{' '}
                <span className="font-semibold text-foreground">{email}</span>
              </p>
            </div>

            {otpError && (
              <div className="mb-4 p-3 bg-error-bg border border-error/20 rounded-lg text-error text-sm flex items-center gap-2 animate-scaleIn">
                <X className="w-4 h-4 flex-shrink-0" />
                {otpError}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Enter OTP</label>
                <input
                  ref={otpInputRef}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] bg-surface-1 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  placeholder="······"
                />
              </div>

              <button
                type="submit"
                disabled={otpLoading || otp.length !== 6}
                className="w-full py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover active:bg-accent-active disabled:bg-surface-3 disabled:text-foreground-muted disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {otpLoading
                  ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying…</>
                  : 'Verify & Sign In'}
              </button>
            </form>

            <div className="mt-5 text-center space-y-3">
              <div>
                <p className="text-sm text-foreground-muted mb-2">Didn't receive the email?</p>
                <button
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:text-link-hover disabled:text-foreground-muted disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                </button>
              </div>
              <button
                onClick={() => { setStep('credentials'); setOtp(''); setOtpError('') }}
                className="text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                ← Back to sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── Credentials screen ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image src="/logo.png" alt="MIDRUS" width={56} height={56} className="object-contain mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">MIDRUS</h1>
          <p className="text-foreground-secondary text-sm">Accounting, Tax &amp; Compliance Portal</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="w-4 h-4 text-success" />
          <p className="text-xs text-foreground-muted">Trusted by 200+ businesses for compliance &amp; filings</p>
        </div>

        <div className="bg-surface-1 border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">Sign In</h2>

          {error && (
            <div className="mb-6 p-4 bg-error-bg border border-error/20 rounded-lg text-error text-sm flex items-center gap-2 animate-scaleIn">
              <X className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          {forgotSent && (
            <div className="mb-6 p-4 bg-accent-muted border border-accent/30 rounded-lg text-foreground text-sm flex items-center gap-2 animate-scaleIn">
              <Mail className="w-4 h-4 flex-shrink-0 text-link" />
              Please contact <span className="font-semibold mx-1">admin@midrus.com</span> to reset your password.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email" id="email" value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-surface-1 border border-border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200"
                placeholder="you@example.com" required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                  Password
                </label>
                <button type="button"
                  className="text-xs text-link font-semibold hover:text-link-hover hover:underline transition-colors"
                  onClick={() => setForgotSent(true)}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} id="password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-surface-1 border border-border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200"
                  placeholder="••••••••" required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground-muted hover:text-foreground transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-accent/40"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover active:bg-accent-active disabled:bg-surface-3 disabled:text-foreground-muted disabled:cursor-not-allowed transition-all duration-200 mt-8 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading
                ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in…</>
                : 'Sign In'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-foreground-muted">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

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
