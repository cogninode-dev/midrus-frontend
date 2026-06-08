import Link from 'next/link'
import { ChevronRight, FileSearch, ClipboardCheck, ShieldCheck, AlertCircle, Users, Layers, CheckCircle2 } from 'lucide-react'

const auditTypes = [
  {
    icon: <FileSearch className="w-7 h-7" />,
    title: 'Statutory Audit',
    badge: 'Mandatory',
    badgeColor: 'bg-red-100 text-red-700',
    desc: 'Comprehensive examination of financial records as required by the Companies Act. We ensure full compliance with regulatory standards and produce auditor reports that meet MCA requirements.',
    points: ['Balance Sheet Review', 'P&L Examination', 'Compliance Verification', "Auditor's Report"],
  },
  {
    icon: <ClipboardCheck className="w-7 h-7" />,
    title: 'Internal Audit',
    badge: 'Advisory',
    badgeColor: 'bg-blue-100 text-blue-700',
    desc: 'An independent, objective review of your internal controls and risk management processes — helping you identify weaknesses before they become liabilities.',
    points: ['Control Assessment', 'Risk Mapping', 'Process Review', 'Improvement Recommendations'],
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: 'Tax Audit',
    badge: 'Income Tax Act',
    badgeColor: 'bg-orange-100 text-orange-700',
    desc: 'Mandated under Section 44AB of the Income Tax Act. We examine your books, verify deductions, and submit Form 3CA/3CB with precision and within deadlines.',
    points: ['Section 44AB Compliance', 'Form 3CA / 3CB Filing', 'Tax Computation Review', 'Disclosure Statements'],
  },
  {
    icon: <Layers className="w-7 h-7" />,
    title: 'GST Audit',
    badge: 'GST Act',
    badgeColor: 'bg-purple-100 text-purple-700',
    desc: 'Verification of GST returns, reconciliation of turnover and ITC, and assessment of compliance — ensuring your GST position is clean and defensible.',
    points: ['GSTR Reconciliation', 'ITC Verification', 'Turnover Reconciliation', 'GSTR-9C Preparation'],
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Due Diligence',
    badge: 'Transaction Support',
    badgeColor: 'bg-green-100 text-green-700',
    desc: 'Financial due diligence for M&A, fundraising, and partnerships. We provide investors and acquirers with a clear, verified picture of your financial health.',
    points: ['Financial Statement Analysis', 'Liability Assessment', 'Cash Flow Review', 'Quality of Earnings Report'],
  },
  {
    icon: <AlertCircle className="w-7 h-7" />,
    title: 'Forensic Audit',
    badge: 'Investigation',
    badgeColor: 'bg-gray-100 text-gray-700',
    desc: 'Investigative auditing to detect fraud, misappropriation, or irregularities. We trace financial misconduct and prepare reports suitable for legal proceedings.',
    points: ['Fraud Detection', 'Transaction Tracing', 'Evidence Documentation', 'Legal-Ready Reports'],
  },
]

const whyUs = [
  { icon: '🎓', title: 'Qualified Auditors', desc: 'All audits are led by Chartered Accountants registered with ICAI.' },
  { icon: '📋', title: 'Regulatory Expertise', desc: 'Deep knowledge of Companies Act, Income Tax Act, GST Act, and SEBI regulations.' },
  { icon: '🔒', title: 'Confidentiality', desc: 'Strict data security protocols — your financial records are always safe with us.' },
  { icon: '⚡', title: 'Deadline-Driven', desc: 'We never miss a statutory deadline — your compliance is our commitment.' },
  { icon: '📊', title: 'Clear Reporting', desc: 'Audit reports in plain language — executives and boards understand exactly what we found.' },
  { icon: '🤝', title: 'Year-Round Support', desc: "Our audit relationship doesn't end at submission — we support you throughout the year." },
]

export default function AuditPage() {
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
            <span className="text-accent">Audit & Assurance</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-sm font-semibold mb-6">
              <ShieldCheck className="w-4 h-4" />
              Audit & Assurance Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Audit & <span className="text-accent">Assurance</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
              Independent, thorough, and objective examination of your financial records to ensure accuracy, regulatory compliance, and stakeholder confidence — delivered by ICAI-registered Chartered Accountants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-accent text-foreground font-semibold rounded-sm hover:bg-accent-hover transition-all duration-300 text-center active:scale-95">
                Request Audit Engagement
              </Link>
              <a href="tel:+919488222454" className="px-8 py-4 border border-white/30 text-white font-semibold rounded-sm hover:border-accent hover:text-accent transition-all duration-300 text-center">
                Call Us: +91 94882 22454
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
              { val: '6+', label: 'Audit Categories' },
              { val: '300+', label: 'Audits Completed' },
              { val: '100%', label: 'On-Time Delivery' },
              { val: 'ICAI', label: 'Registered CAs' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{s.val}</p>
                <p className="text-sm font-medium text-foreground/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Types */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comprehensive Audit Services</h2>
            <p className="text-foreground-secondary max-w-xl mx-auto">
              From mandatory statutory audits to forensic investigations — we cover every aspect of audit and assurance for businesses of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditTypes.map((audit, idx) => (
              <div
                key={audit.title}
                className="p-7 rounded-lg border-2 border-border bg-white hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-[#F5F5F3] rounded-lg flex items-center justify-center text-foreground group-hover:bg-accent transition-all duration-300">
                    {audit.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${audit.badgeColor}`}>{audit.badge}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{audit.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-5">{audit.desc}</p>
                <ul className="space-y-1.5">
                  {audit.points.map((p) => (
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

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">Why Midrus</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Audit You Can Trust. Assurance That Matters.
              </h2>
              <p className="text-foreground-secondary leading-relaxed mb-6">
                An audit isn&apos;t just a compliance requirement — it&apos;s a tool for building trust with investors, banks, and regulatory bodies. Our audit team goes beyond the checklist to give you real insights into your business health.
              </p>
              <p className="text-foreground-secondary leading-relaxed mb-8">
                Every engagement is personally reviewed by a senior Chartered Accountant. We deliver not just a report — but confidence.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-white font-semibold rounded-sm hover:bg-accent hover:text-foreground transition-all duration-300">
                Start Your Audit Engagement
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyUs.map((w) => (
                <div key={w.title} className="p-5 bg-white rounded-lg border border-border hover:border-accent hover:shadow-md transition-all duration-300 group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{w.icon}</div>
                  <h4 className="font-bold text-foreground mb-1.5 text-sm">{w.title}</h4>
                  <p className="text-xs text-foreground-secondary leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-24 bg-foreground text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-3">Our Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">How We Conduct Your Audit</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Engagement Letter', desc: 'We formalise scope, timeline, and responsibilities before any work begins.' },
              { step: '02', title: 'Planning & Risk Assessment', desc: 'We identify high-risk areas and tailor our audit procedures accordingly.' },
              { step: '03', title: 'Fieldwork & Evidence Gathering', desc: 'Deep-dive into records, transactions, and controls with minimal disruption to your team.' },
              { step: '04', title: 'Report & Management Letter', desc: 'Signed audit report plus a management letter highlighting findings and improvements.' },
            ].map((s) => (
              <div key={s.step} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-5 bg-accent/10 border-2 border-accent/30 rounded-full flex items-center justify-center text-xl font-bold text-accent group-hover:bg-accent group-hover:text-foreground transition-all duration-300">
                  {s.step}
                </div>
                <h4 className="font-bold text-white mb-2">{s.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Need an Audit Engagement?</h2>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
            Talk to our senior CA team today. We&apos;ll scope your engagement, answer your questions, and get you a clear proposal — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-foreground text-white font-semibold rounded-sm hover:bg-foreground/90 transition-all duration-300">
              Contact Our Team
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
