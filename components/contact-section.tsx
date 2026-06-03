'use client'

import { useState } from 'react'
import { apiContact } from '@/lib/api'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' })
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
      await apiContact(formData.name, formData.email, formData.message, formData.phone, formData.company)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-foreground text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
              Let&apos;s work together
            </h2>
            <p className="text-lg text-grey-light leading-relaxed">
              Ready to simplify your accounting, taxes, or company registration? Get in touch with our team today and let&apos;s discuss how MIDRUS can keep your business compliant and growing.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 pt-4">
              <div className="group">
                <p className="text-sm text-grey-light/70 mb-2 font-semibold uppercase tracking-wide">Email</p>
                <a
                  href="mailto:manoj@midrusindia.com"
                  className="text-accent hover:underline font-semibold text-lg group-hover:text-white transition-colors duration-300"
                >
                  manoj@midrusindia.com
                </a>
              </div>
              <div className="group">
                <p className="text-sm text-grey-light/70 mb-2 font-semibold uppercase tracking-wide">Phone</p>
                <a
                  href="tel:+919488222454"
                  className="text-accent hover:underline font-semibold text-lg group-hover:text-white transition-colors duration-300"
                >
                  +91 94882 22454
                </a>
              </div>
              <div className="group">
                <p className="text-sm text-grey-light/70 mb-2 font-semibold uppercase tracking-wide">Address</p>
                <p className="font-semibold text-grey-light leading-relaxed">
                  Plot No 601/7036, IGIT Road Sarang,<br />
                  Sarang, Parjang, Dhenkanal - 600100,<br />
                  Odisha, India.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white/10 p-5 sm:p-8 rounded-lg backdrop-blur-sm border border-white/20 animate-slideInLeft hover:border-accent/50 transition-colors duration-300">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-white text-sm">
                  {error}
                </div>
              )}
              {submitted && (
                <div className="p-3 bg-accent/20 border border-accent/40 rounded-lg text-white text-sm font-medium">
                  ✓ Message sent! We&apos;ll get back to you shortly.
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white text-foreground rounded placeholder-grey focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 hover:shadow-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white text-foreground rounded placeholder-grey focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 hover:shadow-lg"
                  required
                  suppressHydrationWarning
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-white">
                    Phone <span className="text-white/50 font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-white text-foreground rounded placeholder-grey focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 hover:shadow-lg"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold mb-2 text-white">
                    Company <span className="text-white/50 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="w-full px-4 py-3 bg-white text-foreground rounded placeholder-grey focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 hover:shadow-lg"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="w-full px-4 py-3 bg-white text-foreground rounded placeholder-grey focus:outline-none focus:ring-2 focus:ring-accent resize-none transition-all duration-300 hover:shadow-lg"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || submitted}
                className="w-full px-6 py-3 bg-accent text-foreground font-semibold rounded hover:bg-white disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl active:scale-95 transform"
              >
                {loading ? 'Sending…' : submitted ? 'Message Sent ✓' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
