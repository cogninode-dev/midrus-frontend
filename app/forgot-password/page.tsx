'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, KeyRound, Eye, EyeOff, Loader2, RefreshCw, CheckCircle, X } from 'lucide-react'
import { apiPasswordResetRequest, apiPasswordResetConfirm, apiPasswordResetRequest as apiResendResetOtp } from '@/lib/api'

type Step = 'email' | 'otp' | 'password' | 'done'

export default function ForgotPasswordPage() {
  const [step, setStep]       = useState<Step>('email')
  const [email, setEmail]     = useState('')
  const [otp, setOtp]         = useState('')
  const [newPassword, setNewPassword]     = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)

  const otpRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (step === 'otp') otpRef.current?.focus()
  }, [step])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [resendCooldown])

  // ─── Step 1: send OTP ──────────────────────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await apiPasswordResetRequest(email.trim().toLowerCase())
      setStep('otp')
      setResendCooldown(60)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return
    try {
      await apiResendResetOtp(email)
      setResendCooldown(60)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP.')
    }
  }

  // ─── Step 2: verify OTP ────────────────────────────────────────────────────
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) { setError('Enter the 6-digit OTP.'); return }
    setError('')
    setStep('password')
  }

  // ─── Step 3: set new password ──────────────────────────────────────────────
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); return }
    setError('')
    setLoading(true)
    try {
      await apiPasswordResetConfirm(email, otp, newPassword)
      setStep('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed.')
    } finally {
      setLoading(false)
    }
  }

  // ─── Shared layout wrapper ─────────────────────────────────────────────────
  const Wrap = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fadeInUp">
        <div className="mb-8 text-center">
          <Image src="/logo.png" alt="MIDRUS" width={56} height={56} className="object-contain mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">MIDRUS</h1>
        </div>
        <div className="bg-surface-1 border border-border rounded-2xl p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )

  const ErrorBanner = () => error ? (
    <div className="mb-5 p-3 bg-error-bg border border-error/20 rounded-lg text-error text-sm flex items-center gap-2 animate-scaleIn">
      <X className="w-4 h-4 flex-shrink-0" />
      {error}
    </div>
  ) : null

  // ─── Done ──────────────────────────────────────────────────────────────────
  if (step === 'done') return (
    <Wrap>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Password Reset!</h2>
        <p className="text-foreground-secondary text-sm mb-8">
          Your password has been updated successfully. You can now sign in with your new password.
        </p>
        <Link
          href="/login"
          className="w-full py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover transition-all text-center block"
        >
          Back to Sign In
        </Link>
      </div>
    </Wrap>
  )

  // ─── Step 3: new password ──────────────────────────────────────────────────
  if (step === 'password') return (
    <Wrap>
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-14 h-14 bg-accent-muted rounded-full flex items-center justify-center mb-4">
          <KeyRound className="w-7 h-7 text-link" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Set New Password</h2>
        <p className="text-foreground-secondary text-sm">Choose a strong password for your account.</p>
      </div>

      <ErrorBanner />

      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-surface-1 border border-border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              placeholder="Min. 6 characters"
              required
            />
            <button type="button" onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground-muted hover:text-foreground transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-surface-1 border border-border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
            placeholder="Re-enter new password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover disabled:bg-surface-3 disabled:text-foreground-muted disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Resetting…</> : 'Reset Password'}
        </button>
      </form>
    </Wrap>
  )

  // ─── Step 2: OTP ──────────────────────────────────────────────────────────
  if (step === 'otp') return (
    <Wrap>
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

      <ErrorBanner />

      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Enter OTP</label>
          <input
            ref={otpRef}
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
          disabled={otp.length !== 6}
          className="w-full py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover disabled:bg-surface-3 disabled:text-foreground-muted disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          Verify OTP
        </button>
      </form>

      <div className="mt-5 text-center space-y-3">
        <div>
          <p className="text-sm text-foreground-muted mb-2">Didn't receive the email?</p>
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:text-link-hover disabled:text-foreground-muted disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
          </button>
        </div>
        <button
          onClick={() => { setStep('email'); setOtp(''); setError('') }}
          className="text-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          ← Change email
        </button>
      </div>
    </Wrap>
  )

  // ─── Step 1: email ────────────────────────────────────────────────────────
  return (
    <Wrap>
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-14 h-14 bg-accent-muted rounded-full flex items-center justify-center mb-4">
          <KeyRound className="w-7 h-7 text-link" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Forgot Password?</h2>
        <p className="text-foreground-secondary text-sm">
          Enter your registered email and we'll send you a reset OTP.
        </p>
      </div>

      <ErrorBanner />

      <form onSubmit={handleSendOtp} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-surface-1 border border-border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
            placeholder="you@example.com"
            required
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover disabled:bg-surface-3 disabled:text-foreground-muted disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending OTP…</> : 'Send Reset OTP'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
          ← Back to Sign In
        </Link>
      </div>
    </Wrap>
  )
}
