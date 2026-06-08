import Link from 'next/link'
import { ChevronRight, Receipt, FileText, Calculator, TrendingDown, Calendar, CheckCircle2 } from 'lucide-react'

const services = [
  {
    icon: <Receipt className="w-7 h-7" />,
    title: 'GST Registration',
    desc: 'End-to-end GST registration for businesses, professionals, and e-commerce sellers. We handle documentation, portal submission, and GSTIN issuance.',
    points: ['Business GST Registration', 'Composition Scheme Setup', 'Amendment & Cancellation', 'E-commerce Compliance'],
  },
  {
    icon: <FileText className="w-7 h-7" />,
    title: 'GST Return Filing',
    desc: 'Accurate and on-time filing of all GST returns — GSTR-1, GSTR-3B, GSTR-9, GSTR-9C — with ITC reconciliation and error resolution.',
    points: ['GSTR-1 / GSTR-3B Filing', 'GSTR-9 Annual Return', 'ITC Reconciliation', 'Nil Return Filing'],
  },
  {
    icon: <Calculator className="w-7 h-7" />,
    title: 'Income Tax Returns',
    desc: 'Filing of ITR for individuals, HUFs, firms, companies, and trusts. We maximise your deductions while ensuring full compliance with the Income Tax Act.',
    points: ['Individual ITR (All Forms)', 'Business & Corporate ITR', 'Capital Gains Computation', 'Form 26AS Reconciliation'],
  },
  {
    icon: <TrendingDown className="w-7 h-7" />,
    title: 'Tax Planning & Optimisation',
    desc: 'Strategic tax planning to legally minimise your liability. We analyse your financials and structure transactions to reduce your overall tax burden.',
    points: ['Advance Tax Planning', 'Investment-Linked Deductions', 'HUF & Trust Structuring', 'Business Restructuring Advice'],
  },
  {
    icon: <Calendar className="w-7 h-7" />,
    title: 'TDS / TCS Compliance',
    desc: 'Complete TDS management — deduction, deposit, return filing, and certificate issuance. We ensure zero penalties on TDS defaults.',
    points: ['TDS Deduction & Deposit', 'Quarterly Return Filing', 'Form 16 / 16A Issuance', 'TDS Mismatch Resolution'],
  },
  {
    icon: <CheckCircle2 className="w-7 h-7" />,
    title: 'Notices & Assessments',
    desc: 'Expert handling of income tax and GST notices, scrutiny assessments, and appeals — protecting your interests at every stage.',
    points: ['Notice Response Drafting', 'Assessment Representation', 'Appeals (CIT / ITAT)', 'Rectification Applications'],
  },
]

export default function TaxPage() {
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
            <span className="text-accent">GST & Income Tax</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-sm font-semibold mb-6">
              <Receipt className="w-4 h-4" />
              Tax Consultancy Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              GST & Income Tax <span className="text-accent">Consultancy</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
              Expert GST filing, income tax returns, and tax planning for individuals and businesses. We ensure full compliance while maximising deductions and minimising liabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-accent text-foreground font-semibold rounded-sm hover:bg-accent-hover transition-all duration-300 text-center">
                Get Tax Consultation
              </Link>
              <a href="tel:+919488222454" className="px-8 py-4 border border-white/30 text-white font-semibold rounded-sm hover:border-accent hover:text-accent transition-all duration-300 text-center">
                Call: +91 94882 22454
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-accent py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '₹50Cr+', label: 'Tax Savings Delivered' },
              { val: '1000+', label: 'Returns Filed Annually' },
              { val: '0', label: 'Missed Deadlines' },
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

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete Tax & GST Services</h2>
            <p className="text-foreground-secondary max-w-xl mx-auto">From registration to returns to notices — one team handles your entire tax compliance lifecycle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
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

      {/* Key Deadlines */}
      <section className="py-20 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">Stay Compliant</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Key Tax Deadlines We Never Miss</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { deadline: '11th Monthly', label: 'GSTR-1 Filing', color: 'border-blue-300 bg-blue-50' },
              { deadline: '20th Monthly', label: 'GSTR-3B Filing', color: 'border-green-300 bg-green-50' },
              { deadline: '31st July', label: 'ITR for Individuals', color: 'border-orange-300 bg-orange-50' },
              { deadline: '31st Oct', label: 'Tax Audit Report', color: 'border-purple-300 bg-purple-50' },
            ].map((d) => (
              <div key={d.label} className={`p-6 rounded-lg border-2 ${d.color} text-center`}>
                <p className="text-xl font-bold text-foreground mb-1">{d.deadline}</p>
                <p className="text-sm text-foreground-secondary">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pay Less Tax. Stay Fully Compliant.</h2>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">Our tax team ensures you never overpay and never miss a deadline.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-foreground text-white font-semibold rounded-sm hover:bg-foreground/90 transition-all duration-300">
              Book Free Consultation
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
