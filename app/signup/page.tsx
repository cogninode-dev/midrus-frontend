'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { apiResendOtp } from '@/lib/api'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, Check, X, ShieldCheck, Mail, RefreshCw } from 'lucide-react'
import Image from 'next/image'

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score: 1, label: 'Weak',   color: 'bg-error' }
  if (score === 2) return { score: 2, label: 'Fair',   color: 'bg-warning' }
  if (score === 3) return { score: 3, label: 'Good',   color: 'bg-accent-hover' }
  return              { score: 4, label: 'Strong', color: 'bg-success' }
}

type Step = 'form' | 'otp'

export default function SignupPage() {
  const [step, setStep]       = useState<Step>('form')
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // OTP step state
  const [otp, setOtp]           = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const otpInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const { signup, signupVerify } = useAuth()

  const emailValid       = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email), [formData.email])
  const passwordStrength = useMemo(() => getPasswordStrength(formData.password), [formData.password])

  useEffect(() => {
    if (step === 'otp') otpInputRef.current?.focus()
  }, [step])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [resendCooldown])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
  }

  // ─── Step 1: Register ───────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!emailValid)             { setError('Please enter a valid email address'); return }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const result = await signup(formData.email, formData.password, formData.name)
      if (result?.otp_required) { setStep('otp'); setResendCooldown(60) }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  // ─── Step 2: Verify OTP → log in immediately ────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) { setOtpError('Enter the 6-digit OTP'); return }
    setOtpLoading(true)
    setOtpError('')
    try {
      await signupVerify(formData.email, otp)
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
      await apiResendOtp(formData.email)
      setResendCooldown(60)
      setOtpError('')
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : 'Failed to resend OTP')
    }
  }

  // ─── OTP verification screen ─────────────────────────────────────────────────
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
              <h2 className="text-2xl font-bold text-foreground mb-2">Verify your email</h2>
              <p className="text-foreground-secondary text-sm">
                We sent a 6-digit OTP to <span className="font-semibold text-foreground">{formData.email}</span>
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
                {otpLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying…</> : 'Verify Email'}
              </button>
            </form>

            <div className="mt-5 text-center">
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
          </div>
        </div>
      </div>
    )
  }

  // ─── Registration form ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image src="/logo.png" alt="MIDRUS" width={56} height={56} className="object-contain mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">MIDRUS</h1>
          <p className="text-foreground-secondary text-sm">Create your account to get started</p>
        </div>

        <div className="bg-surface-1 border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">Create Account</h2>

          {error && (
            <div className="mb-6 p-4 bg-error-bg border border-error/20 rounded-lg text-error text-sm flex items-center gap-2 animate-scaleIn">
              <X className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
              <div className="relative">
                <input
                  type="text" id="name" name="name" value={formData.name}
                  onChange={handleChange} onBlur={() => handleBlur('name')}
                  className={`w-full px-4 py-3 pr-10 bg-surface-1 border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 ${touched.name && formData.name.length > 0 ? 'border-success/50' : 'border-border'}`}
                  placeholder="John Doe" required
                />
                {touched.name && formData.name.length > 0 && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success" />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email" id="email" name="email" value={formData.email}
                  onChange={handleChange} onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-3 pr-10 bg-surface-1 border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 ${touched.email ? emailValid ? 'border-success/50' : formData.email.length > 0 ? 'border-error/50' : 'border-border' : 'border-border'}`}
                  placeholder="you@example.com" required
                />
                {touched.email && formData.email.length > 0 && (
                  emailValid
                    ? <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success" />
                    : <X className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-error" />
                )}
              </div>
              {touched.email && formData.email.length > 0 && !emailValid && (
                <p className="mt-1.5 text-xs text-error">Please enter a valid email address</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} id="password" name="password"
                  value={formData.password} onChange={handleChange} onBlur={() => handleBlur('password')}
                  className="w-full px-4 py-3 pr-12 bg-surface-1 border border-border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200"
                  placeholder="••••••••" required minLength={6}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground-muted hover:text-foreground transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-accent/40"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password.length > 0 && (
                <div className="mt-3 animate-scaleIn">
                  <div className="flex gap-1.5 mb-1.5">
                    {[1, 2, 3, 4].map(level => (
                      <div key={level} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${level <= passwordStrength.score ? passwordStrength.color : 'bg-surface-3'}`} />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${passwordStrength.score <= 1 ? 'text-error' : passwordStrength.score === 2 ? 'text-warning' : passwordStrength.score === 3 ? 'text-accent-active' : 'text-success'}`}>
                    {passwordStrength.label}{formData.password.length < 6 && ' — min 6 characters'}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover active:bg-accent-active disabled:bg-surface-3 disabled:text-foreground-muted disabled:cursor-not-allowed transition-all duration-200 mt-8 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating account…</> : 'Sign Up'}
            </button>
          </form>

          <p className="mt-4 text-xs text-foreground-muted text-center leading-relaxed">
            By signing up, you agree to our{' '}
            <span className="text-link font-medium cursor-pointer hover:underline">Terms of Service</span>{' '}
            and{' '}
            <span className="text-link font-medium cursor-pointer hover:underline">Privacy Policy</span>
          </p>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-foreground-muted">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <p className="text-center text-sm text-foreground-secondary">
            Already have an account?{' '}
            <Link href="/login" className="text-link font-semibold hover:text-link-hover hover:underline transition-colors">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-success" />
          <p className="text-xs text-foreground-muted">Your data is encrypted and secure</p>
        </div>
      </div>
    </div>
  )
}
