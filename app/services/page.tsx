import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'accounting',
    title: 'Accounting & Bookkeeping',
    tagline: 'Virtual bookkeeping across 5 platforms',
    description: 'Comprehensive virtual bookkeeping across Tally ERP, Xero, Zoho Books, MYOB & MS Dynamics — accurate, precise, and timely financial statements with IT-enhanced reporting.',
    icon: '📒',
    highlights: ['Tally ERP', 'Xero', 'Zoho Books', 'MYOB', 'MS Dynamics'],
    href: '/services/accounting',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    tag: 'Most Popular',
  },
  {
    id: 'tax',
    title: 'GST & Income Tax Consultancy',
    tagline: 'Full compliance, maximum deductions',
    description: 'Expert GST filing, income tax returns, and tax planning for individuals and businesses. We ensure full compliance while maximising deductions and minimising liabilities.',
    icon: '🧾',
    highlights: ['GST Filing', 'ITR Filing', 'Tax Planning', 'Notices'],
    href: '/services/tax',
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
    tag: 'High Demand',
  },
  {
    id: 'registration',
    title: 'Company Registration',
    tagline: 'Incorporate in days, not weeks',
    description: 'End-to-end assistance with company incorporation, MCA filings, GST registration, and all legal formalities to get your business up and running quickly.',
    icon: '🏢',
    highlights: ['Pvt Ltd', 'LLP', 'OPC', 'GST Registration'],
    href: '/services/registration',
    color: 'bg-violet-50 border-violet-200 hover:border-violet-400',
    tag: 'Fast Track',
  },
  {
    id: 'audit',
    title: 'Audit & Assurance',
    tagline: 'ICAI-registered CAs, zero compromise',
    description: 'Statutory audit, internal audit, tax audit, GST audit, and forensic investigations conducted by ICAI-registered Chartered Accountants — objective, thorough, and deadline-driven.',
    icon: '🔍',
    highlights: ['Statutory Audit', 'Internal Audit', 'Tax Audit', 'Forensic'],
    href: '/services/audit',
    color: 'bg-rose-50 border-rose-200 hover:border-rose-400',
    tag: 'Certified CAs',
  },
  {
    id: 'financial-advisory',
    title: 'Financial Advisory',
    tagline: 'Strategy that moves your business forward',
    description: 'Strategic financial planning, investment guidance, cash flow management, and business forecasting to help you make informed decisions and achieve long-term financial goals.',
    icon: '💰',
    highlights: ['Financial Planning', 'Cash Flow', 'Investment', 'Forecasting'],
    href: '/services/financial-advisory',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    tag: 'Growth Focused',
  },
  {
    id: 'manpower',
    title: 'Manpower Supply',
    tagline: 'Skilled, verified professionals on demand',
    description: 'Reliable staffing and manpower solutions for businesses of all sizes. We connect you with skilled, verified professionals across accounting, administration, and operations.',
    icon: '👥',
    highlights: ['Accounting Staff', 'Admin Support', 'Operations', 'Verified'],
    href: '/services/manpower',
    color: 'bg-sky-50 border-sky-200 hover:border-sky-400',
    tag: 'Staffing',
  },
]

const stats = [
  { val: '500+', label: 'Businesses Served' },
  { val: '10+', label: 'Years Experience' },
  { val: '6', label: 'Service Verticals' },
  { val: '99%', label: 'Client Retention' },
]

export default function ServicesPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-foreground text-white overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-80 h-80 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent">Services</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Professional Financial Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              Everything Your<br />
              <span className="text-accent">Business Needs</span>
            </h1>
            <p className="text-lg text-white/65 leading-relaxed max-w-xl">
              From day-to-day bookkeeping to corporate strategy — MIDRUS delivers expert financial and compliance services under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-accent py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{s.val}</p>
                <p className="text-sm font-medium text-foreground/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Service Portfolio</h2>
            <p className="text-foreground-secondary max-w-xl mx-auto">
              Each service is delivered by domain specialists — not generalists. Click any card to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <Link
                key={s.id}
                href={s.href}
                className={`group relative flex flex-col p-7 rounded-xl border-2 ${s.color} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fadeInUp`}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {/* Tag */}
                <div className="flex items-start justify-between mb-5">
                  <span className="text-4xl">{s.icon}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white/80 border border-border rounded-full text-foreground-secondary">
                    {s.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1.5">{s.title}</h3>
                <p className="text-sm font-medium text-link mb-3">{s.tagline}</p>
                <p className="text-sm text-foreground-secondary leading-relaxed flex-1">{s.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {s.highlights.map((h) => (
                    <span key={h} className="text-xs px-2.5 py-1 bg-white border border-border rounded-full text-foreground-secondary font-medium">
                      {h}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold text-foreground group-hover:text-link transition-colors">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why MIDRUS ── */}
      <section className="py-20 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
                One Firm.<br />All Your Financial Needs.
              </h2>
              <p className="text-foreground-secondary leading-relaxed mb-8">
                Instead of juggling multiple vendors — an accountant here, a tax consultant there — MIDRUS gives you a single, expert team that handles everything. Seamless coordination, unified strategy, one relationship.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-white font-semibold rounded-sm hover:bg-accent hover:text-foreground transition-all duration-300">
                Get a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: '🎯', title: 'Domain Specialists', desc: 'Each service is staffed by experts in that specific area — not generalists wearing many hats.' },
                { icon: '🔒', title: 'Full Confidentiality', desc: 'Your financial data is handled with strict confidentiality — NDA-backed engagements on request.' },
                { icon: '⚡', title: 'Deadline-Driven', desc: 'We build deadlines into our process from day one. No surprises, no last-minute rushes.' },
                { icon: '📈', title: 'Growth-Oriented', desc: 'We look beyond compliance — spotting opportunities that help your business grow stronger.' },
              ].map((w) => (
                <div key={w.title} className="p-5 bg-white rounded-xl border border-border hover:border-accent hover:shadow-md transition-all duration-200">
                  <div className="text-3xl mb-3">{w.icon}</div>
                  <h4 className="font-bold text-foreground mb-1.5 text-sm">{w.title}</h4>
                  <p className="text-xs text-foreground-secondary leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Not Sure Where to Start?</h2>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">
            Book a free 30-minute consultation. We&apos;ll listen, assess, and recommend exactly what your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-foreground text-white font-semibold rounded-sm hover:bg-foreground/90 transition-all">
              Book Free Consultation
            </Link>
            <Link href="/process" className="px-8 py-4 border-2 border-foreground text-foreground font-semibold rounded-sm hover:bg-white transition-all">
              See How We Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
