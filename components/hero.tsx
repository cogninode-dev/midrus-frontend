'use client'

import Link from 'next/link'
import PhoneMockup from '@/components/phone-mockup'

const stats = [
  { value: '500+', label: 'Businesses Served' },
  { value: '10+', label: 'Years Experience' },
  { value: '₹50Cr+', label: 'Tax Savings' },
  { value: '98%', label: 'Client Retention' },
]

const badges = [
  { icon: '✅', text: 'GST Compliant' },
  { icon: '✅', text: 'MCA Registered' },
  { icon: '✅', text: 'Certified Accountants' },
]

/** A phrase highlighted the way a rounded highlighter pen would mark it — each
 * wrapped line gets its own snug rounded background (box-decoration-break),
 * instead of one block stretching the full line width. */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-accent-subtle rounded-2xl px-2 sm:px-3 py-0.5 sm:py-1 box-decoration-clone"
    >
      {children}
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 animate-fadeInUp">

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.3]">
                We handle your <Chip>taxes, compliance,</Chip> and{' '}
                <Chip>regulatory filings.</Chip>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-grey max-w-xl leading-relaxed">
                Expert <strong>Accounting</strong>, <strong>GST &amp; Tax Consultancy</strong>,{' '}
                <strong>Company Registration</strong>, and <strong>Financial Advisory</strong> 
                so you can focus on growing your business.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {badges.map((b) => (
                <span
                  key={b.text}
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-grey font-medium"
                >
                  {b.icon} {b.text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-white font-semibold rounded-sm hover:bg-accent hover:text-foreground transition-all duration-300 active:scale-95"
              >
                Get Free Consultation
              </Link>
              <Link
                href="#services"
                className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 border border-black text-black font-semibold rounded-sm hover:bg-grey-light transition-all duration-300 active:scale-95"
              >
                View Services
              </Link>
            </div>

            {/* Phone CTA */}
            <p className="text-sm text-grey">
              Or call us directly:{' '}
              <a
                href="tel:+919488222454"
                className="font-bold text-foreground hover:text-accent transition-colors"
              >
                +91 94882 22454
              </a>
            </p>
          </div>

          {/* Right Side — the real app, shown in a phone frame */}
          <div className="animate-slideInLeft" aria-hidden="true">
            <PhoneMockup />
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-14 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 sm:p-6 bg-grey-light rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all duration-300 text-center group"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 leading-none">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-grey mt-1.5 font-medium leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
