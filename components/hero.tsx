'use client'

import Link from 'next/link'

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

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 animate-fadeInUp">

            {/* Trust pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-accent/20 border border-accent/40 rounded-full text-xs sm:text-sm font-semibold text-foreground max-w-full">
              <span className="w-2 h-2 shrink-0 bg-green-500 rounded-full animate-pulse"></span>
              <span className="truncate">Trusted by 500+ businesses across India</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                Focus on growing your business. We'll handle your{' '}
                <span className="text-accent">taxes, compliance,</span>{' '}
                and{' '}
                <span className="text-accent">regulatory filings.</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-grey max-w-xl leading-relaxed">
                MIDRUS provides expert <strong>Accounting</strong>, <strong>GST & Tax Consultancy</strong>,{' '}
                <strong>Company Registration</strong>, and <strong>Financial Advisory</strong> services — so
                you can focus on growing your business.
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

          {/* Right Side — Stats & Service Card */}
          <div className="space-y-4 animate-slideInLeft">

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
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

            {/* Service highlight card */}
            <div className="p-5 sm:p-6 bg-foreground text-white rounded-lg">
              <p className="text-xs sm:text-sm font-semibold text-accent mb-3 uppercase tracking-wide">
                What we do
              </p>
              <ul className="space-y-2 text-sm text-grey-light">
                {[
                  'Accounting & Bookkeeping',
                  'GST & Income Tax Consultancy',
                  'Company Registration',
                  'Audit & Assurance',
                  'Financial Advisory Services',
                  'Manpower Supply Services',
                ].map((service) => (
                  <li key={service} className="flex items-center gap-2">
                    <span className="text-accent shrink-0">→</span>
                    {service}
                  </li>
                ))}
              </ul>
              <Link
                href="#services"
                className="inline-block mt-4 text-sm font-semibold text-accent hover:underline"
              >
                Explore all services →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
