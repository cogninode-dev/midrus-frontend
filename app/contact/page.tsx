'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { apiContact } from '@/lib/api'
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'

const serviceOptions = [
  { id: 'accounting', label: 'Accounting & Bookkeeping', icon: '📒' },
  { id: 'tax', label: 'GST & Income Tax', icon: '🧾' },
  { id: 'registration', label: 'Company Registration', icon: '🏢' },
  { id: 'audit', label: 'Audit & Assurance', icon: '🔍' },
  { id: 'financial', label: 'Financial Advisory', icon: '💰' },
  { id: 'manpower', label: 'Manpower Supply', icon: '👥' },
  { id: 'other', label: 'Other / General', icon: '💬' },
]

const contactDetails = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'manoj@midrusindia.com',
    href: 'mailto:manoj@midrusindia.com',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Phone',
    value: '+91 94882 22454',
    href: 'tel:+919488222454',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Office',
    value: 'Plot No 601/7036, IGIT Road, Sarang, Dhenkanal, Odisha',
    href: '#',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: 'Hours',
    value: 'Mon – Sat, 9:00 AM – 6:00 PM IST',
    href: '#',
  },
]

type FormData = {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const messageWithService = formData.service
        ? `[Service: ${formData.service}]\n\n${formData.message}`
        : formData.message
      await apiContact(formData.name, formData.email, messageWithService, formData.phone, formData.company)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-white text-foreground">
      <Navigation />

      {/* ── Breadcrumb ── */}
      <div className="bg-[#F5F5F3] border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-foreground-muted">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* ── Main Split Layout ── */}
      <div className="min-h-[calc(100vh-120px)] grid grid-cols-1 lg:grid-cols-5">

        {/* ── Left Panel ── */}
        <div className="lg:col-span-2 bg-foreground text-white relative overflow-hidden flex flex-col">
          {/* Background blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-accent rounded-full blur-3xl opacity-10" />
            <div className="absolute bottom-0 -left-20 w-64 h-64 bg-accent rounded-full blur-3xl opacity-8" />
          </div>

          <div className="relative z-10 flex flex-col h-full p-8 md:p-10 lg:p-12">
            {/* Heading */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/15 border border-accent/30 rounded-full text-accent text-xs font-semibold mb-5 tracking-wide">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                Free first consultation
              </div>
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight mb-4">
                Let&apos;s talk<br />
                <span className="text-accent">about your</span><br />
                business.
              </h1>
              <p className="text-white/55 leading-relaxed text-sm max-w-xs">
                Tell us what you need. We&apos;ll listen, assess, and give you a clear plan — no jargon, no pressure.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-5 mb-auto">
              {contactDetails.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  className="group flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 text-accent group-hover:bg-accent group-hover:text-foreground transition-all duration-200">
                    {d.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-0.5">{d.label}</p>
                    <p className="text-sm text-white/80 group-hover:text-white transition-colors leading-snug">{d.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { val: '< 24h', label: 'Response' },
                  { val: '500+', label: 'Clients' },
                  { val: 'Free', label: 'First Call' },
                ].map((b) => (
                  <div key={b.label}>
                    <p className="text-xl font-bold text-accent">{b.val}</p>
                    <p className="text-xs text-white/40 mt-0.5">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Panel (Form) ── */}
        <div className="lg:col-span-3 flex items-center justify-center bg-white px-6 py-14 md:px-12 lg:px-16 xl:px-20">
          {submitted ? (
            <div className="w-full max-w-md text-center">
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6 animate-scaleIn">
                <CheckCircle2 className="w-10 h-10 text-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Message sent!</h2>
              <p className="text-foreground-secondary leading-relaxed mb-2">
                Thank you for reaching out. One of our experts will get back to you within 24 business hours.
              </p>
              <p className="text-sm text-foreground-muted mb-10">
                We&apos;ll reach you at <span className="font-semibold text-foreground">{formData.email}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' })
                  }}
                  className="px-6 py-3 bg-foreground text-white font-semibold rounded-sm hover:bg-accent hover:text-foreground transition-all text-sm"
                >
                  Send Another Message
                </button>
                <Link href="/" className="px-6 py-3 border border-border text-foreground font-semibold rounded-sm hover:border-accent transition-all text-sm text-center">
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-lg">
              {/* Form header */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Send us a message</h2>
                <p className="text-sm text-foreground-secondary">All fields marked <span className="text-error">*</span> are required.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-start gap-3 p-4 bg-error-bg border border-error/20 rounded-lg text-error text-sm">
                    <span className="mt-0.5 flex-shrink-0">⚠️</span>
                    {error}
                  </div>
                )}

                {/* Service picker */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    I&apos;m interested in…
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, service: p.service === opt.label ? '' : opt.label }))}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-150 ${
                          formData.service === opt.label
                            ? 'bg-foreground text-white border-foreground'
                            : 'bg-white text-foreground border-border hover:border-foreground hover:bg-[#F5F5F3]'
                        }`}
                      >
                        <span>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="block text-sm font-semibold text-foreground">
                      Company <span className="text-foreground-muted font-normal text-xs">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                      Email Address <span className="text-error">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground">
                      Phone Number <span className="text-error">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements, questions, or what you'd like help with…"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-foreground text-white font-semibold rounded-sm hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm active:scale-[0.98]"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending your message…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-foreground-muted text-center mt-3">
                    We never share your data. First consultation is always free.
                  </p>
                </div>
              </form>

              {/* Company details */}
              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-xs text-foreground-muted mb-2 font-semibold uppercase tracking-widest">Registered Office</p>
                <p className="text-sm text-foreground font-semibold">MIDRUS India Private Limited</p>
                <p className="text-xs text-foreground-secondary mt-1">CIN: U69200OD2024PTC044993</p>
                <p className="text-xs text-foreground-secondary">Plot No 601/7036, IGIT Road Sarang, Parjang, Dhenkanal – 600100, Odisha</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
