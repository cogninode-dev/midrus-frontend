import Link from 'next/link'
import { ChevronRight, TrendingUp, PieChart, DollarSign, BarChart2, Target, Lightbulb, CheckCircle2 } from 'lucide-react'

const advisoryServices = [
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: 'Strategic Financial Planning',
    desc: 'We develop comprehensive financial plans aligned with your business goals — covering revenue targets, cost structures, capital allocation, and long-term growth strategies.',
    points: ['5-Year Financial Projections', 'Budget & Forecast Preparation', 'Break-Even Analysis', 'Scenario Planning'],
  },
  {
    icon: <PieChart className="w-7 h-7" />,
    title: 'Investment Guidance',
    desc: 'Expert advice on where to deploy surplus capital — from fixed deposits and mutual funds to real estate and equity instruments — tailored to your risk appetite.',
    points: ['Risk Profiling', 'Portfolio Structuring', 'Tax-Efficient Investments', 'Returns Optimisation'],
  },
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: 'Cash Flow Management',
    desc: 'We help you understand, predict, and improve your cash position — ensuring you always have liquidity when you need it and surplus funds working for you.',
    points: ['Cash Flow Forecasting', 'Working Capital Optimisation', 'Receivables Management', 'Payment Cycle Analysis'],
  },
  {
    icon: <BarChart2 className="w-7 h-7" />,
    title: 'Business Forecasting',
    desc: 'Data-driven forecasting models that help you anticipate market shifts, plan hiring, and make confident capital expenditure decisions.',
    points: ['Revenue Forecasting', 'Cost & Margin Analysis', 'Sensitivity Analysis', 'KPI Dashboard Setup'],
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: 'Business Valuation',
    desc: 'Independent valuation of your business for fundraising, M&A, buyouts, or ESOP setup — using multiple methodology frameworks.',
    points: ['DCF Valuation', 'Comparable Company Analysis', 'Asset-Based Valuation', 'ESOP & Sweat Equity Valuation'],
  },
  {
    icon: <Lightbulb className="w-7 h-7" />,
    title: 'Financial Restructuring',
    desc: 'When a business faces financial stress, we help redesign the balance sheet — debt restructuring, asset monetisation, and cost realignment.',
    points: ['Debt Rescheduling Support', 'Cost Rationalisation', 'Subsidiary Restructuring', 'NCLT Resolution Planning'],
  },
]

export default function FinancialAdvisoryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-foreground text-white overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-72 h-72 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent">Financial Advisory</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              Financial Advisory Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Smarter Decisions.<br /><span className="text-accent">Stronger Financials.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
              Strategic financial planning, investment guidance, cash flow management, and business forecasting — helping you make informed decisions and achieve long-term financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-accent text-foreground font-semibold rounded-sm hover:bg-accent-hover transition-all duration-300 text-center">
                Get Expert Advice
              </Link>
              <a href="tel:+919488222454" className="px-8 py-4 border border-white/30 text-white font-semibold rounded-sm hover:border-accent hover:text-accent transition-all duration-300 text-center">
                Call: +91 94882 22454
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '₹100Cr+', label: 'Assets Advised' },
              { val: '150+', label: 'Advisory Clients' },
              { val: '98%', label: 'Client Retention' },
              { val: '10+', label: 'Years Experience' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{s.val}</p>
                <p className="text-sm font-medium text-foreground/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Services */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Financial Advisory Built for Business Growth</h2>
            <p className="text-foreground-secondary max-w-xl mx-auto">Our advisors bring deep financial expertise — combining data, experience, and judgement to guide you at every stage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisoryServices.map((s, idx) => (
              <div key={s.title} className="p-7 rounded-lg border-2 border-border bg-white hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-12 h-12 bg-[#F5F5F3] rounded-lg flex items-center justify-center text-foreground group-hover:bg-accent transition-all duration-300 mb-5">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-foreground-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-link flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Advisory Matters */}
      <section className="py-20 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-3">Our Approach</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Financial Clarity at Every Stage</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Many businesses run on gut instinct alone — and that works until it doesn&apos;t. Our advisory team helps you replace uncertainty with clear, data-driven financial intelligence.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Whether you&apos;re raising your first funding round, planning an acquisition, or managing rapid growth — we give you the financial framework to make decisions with confidence.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-foreground font-semibold rounded-sm hover:bg-accent-hover transition-all duration-300">
                Schedule an Advisory Call
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: '📊', title: 'Data-Driven', desc: 'Every recommendation backed by financial models and real data.' },
                { icon: '🎯', title: 'Goal-Aligned', desc: 'Advice built around your specific business objectives.' },
                { icon: '🔄', title: 'Ongoing Support', desc: 'We stay engaged — monitoring results and adapting the plan.' },
                { icon: '🛡️', title: 'Risk-Aware', desc: 'We identify financial risks before they become crises.' },
              ].map((w) => (
                <div key={w.title} className="p-5 bg-white/5 border border-white/10 rounded-lg hover:border-accent/40 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl mb-3">{w.icon}</div>
                  <h4 className="font-bold text-white mb-1.5 text-sm">{w.title}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Let&apos;s Build Your Financial Strategy</h2>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">Start with a free financial health check. Our advisors will identify your biggest opportunities and risks.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-foreground text-white font-semibold rounded-sm hover:bg-foreground/90 transition-all duration-300">
              Get Free Financial Review
            </Link>
            <Link href="/services" className="px-8 py-4 border-2 border-foreground text-foreground font-semibold rounded-sm hover:bg-white transition-all duration-300">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
