import Link from 'next/link'
import { CheckCircle2, ChevronRight, Monitor, Shield, TrendingUp, Zap, BarChart3, Lock } from 'lucide-react'

const softwares = [
  {
    name: 'Tally ERP',
    badge: 'Most Popular',
    desc: "India's most trusted accounting software — we handle everything from ledger management and inventory to payroll and GST compliance using Tally ERP.",
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'M.Y.O.B',
    badge: 'Global Standard',
    desc: 'Mind Your Own Business — a powerful platform for small and medium enterprises. We use MYOB for precise payroll, BAS, and financial reporting.',
    color: 'bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    name: 'Xero',
    badge: 'Cloud-Based',
    desc: 'A cloud-first accounting solution trusted by businesses worldwide. We leverage Xero for real-time bank reconciliation, invoicing, and cash-flow tracking.',
    color: 'bg-sky-50 border-sky-200',
    badgeColor: 'bg-sky-100 text-sky-700',
  },
  {
    name: 'Zoho Books',
    badge: 'All-in-One',
    desc: "Zoho's integrated finance suite lets us manage your accounts, expenses, inventory, and compliance — all in one place, all in real time.",
    color: 'bg-orange-50 border-orange-200',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    name: 'MS Dynamics',
    badge: 'Enterprise-Grade',
    desc: 'Microsoft Dynamics 365 for large-scale financial management. We deploy and operate MS Dynamics to give your enterprise end-to-end financial visibility.',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-100 text-green-700',
  },
]

const bookkeepingFeatures = [
  { icon: '✅', title: 'Accurate Financial Statements', desc: 'Every figure checked and verified. We deliver financial statements you can rely on — error-free, audit-ready.' },
  { icon: '🎯', title: 'Precise Record Keeping', desc: 'Meticulous transaction recording across all accounts, categories, and periods — nothing slips through.' },
  { icon: '⏱️', title: 'Timely Reporting', desc: "Monthly, quarterly, and annual reports delivered on schedule — so you're always informed and never caught off guard." },
  { icon: '📐', title: 'Flexible Engagements', desc: 'Part-time, full-time, or project-based — our virtual team scales to your workload without the overhead of in-house staff.' },
  { icon: '📈', title: 'Scalable Solutions', desc: "Handles the growth with you. Whether you're a startup or a listed company, our processes scale effortlessly." },
  { icon: '🏆', title: 'Highest Quality Standards', desc: 'We are committed to delivering only the best — every engagement is reviewed at multiple levels before final delivery.' },
]

const itBenefits = [
  { icon: <Zap className="w-5 h-5" />, title: 'Process Automation', desc: 'Repetitive bookkeeping tasks automated — invoicing, bank feeds, reconciliation — saving hundreds of hours annually.' },
  { icon: <Shield className="w-5 h-5" />, title: 'Data Security', desc: 'End-to-end encryption, role-based access control, and secure cloud storage keep your financial data protected at all times.' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Real-Time Insights', desc: 'Live dashboards give you a clear view of cash position, receivables, payables, and P&L — anytime, anywhere.' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Enhanced Efficiency', desc: 'Modern IT workflows cut turnaround time drastically — reports that used to take days are generated in hours.' },
  { icon: <Monitor className="w-5 h-5" />, title: 'Seamless Integration', desc: 'Our IT setup integrates with your CRM, ERP, and banking channels — a truly connected financial ecosystem.' },
  { icon: <Lock className="w-5 h-5" />, title: 'Compliance Assurance', desc: 'Automated compliance checks flag discrepancies before they become issues — ensuring regulatory accuracy always.' },
]

export default function AccountingPage() {
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
            <span className="text-accent">Accounting & Bookkeeping</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Virtual Bookkeeping Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Accounting &<br />
              <span className="text-accent">Bookkeeping Services</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
              Midrus Associate&apos;s virtual bookkeeping services team has extensive experience and expertise in a wide range of accounting software — delivering accurate, precise, and timely financial statements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-accent text-foreground font-semibold rounded-sm hover:bg-accent-hover transition-all duration-300 text-center active:scale-95">
                Get Free Consultation
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
              { val: '500+', label: 'Businesses Served' },
              { val: '5', label: 'Accounting Platforms' },
              { val: '10+', label: 'Years Experience' },
              { val: '99%', label: 'Accuracy Rate' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{s.val}</p>
                <p className="text-sm font-medium text-foreground/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Expertise */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">Our Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Accounting Software We Master</h2>
            <p className="text-foreground-secondary max-w-xl mx-auto">
              Our team is certified and deeply experienced across every major accounting platform — so you never have to worry about compatibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwares.map((sw, idx) => (
              <div
                key={sw.name}
                className={`relative p-7 rounded-lg border-2 ${sw.color} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fadeInUp`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground">{sw.name}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sw.badgeColor}`}>{sw.badge}</span>
                </div>
                <p className="text-sm text-foreground-secondary leading-relaxed">{sw.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-link text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Certified Team
                </div>
              </div>
            ))}

            <div className="relative p-7 rounded-lg border-2 border-dashed border-border bg-surface-2 hover:border-accent hover:bg-accent-muted transition-all duration-300 flex flex-col justify-center items-center text-center">
              <div className="text-4xl mb-3">+</div>
              <h3 className="text-lg font-bold text-foreground mb-2">Your Current Software</h3>
              <p className="text-sm text-foreground-secondary">Already using a different platform? We adapt to your existing setup with zero disruption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bookkeeping Features */}
      <section className="py-20 md:py-28 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">What Sets Us Apart</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Virtual Bookkeeping Built on Precision & Trust
              </h2>
              <p className="text-foreground-secondary leading-relaxed mb-8">
                We take pride in our flexibility and scalability while being committed to the highest levels of quality. Our virtual team works as an extension of your business — not just a vendor.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-white font-semibold rounded-sm hover:bg-accent hover:text-foreground transition-all duration-300">
                Start Today
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {bookkeepingFeatures.map((f) => (
                <div key={f.title} className="p-5 bg-white rounded-lg border border-border hover:border-accent hover:shadow-md transition-all duration-300 group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{f.icon}</div>
                  <h4 className="font-bold text-foreground mb-1.5 text-sm">{f.title}</h4>
                  <p className="text-xs text-foreground-secondary leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IT-Enhanced Finance */}
      <section className="py-20 md:py-28 bg-foreground text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-accent text-sm font-semibold mb-5">
              <Monitor className="w-4 h-4" />
              Technology-Driven Approach
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">IT-Enhanced Finance & Accounting</h2>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              At Midrus Associate, advanced IT solutions streamline finance and accounting by automating processes, ensuring accuracy, and enhancing data security — improving efficiency, reducing costs, and providing real-time financial insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {itBenefits.map((b, idx) => (
              <div
                key={b.title}
                className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent/40 transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-foreground transition-all duration-300">
                  {b.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Simple Onboarding, Seamless Execution</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Initial Consultation', desc: 'We understand your current accounting setup, pain points, and goals.' },
              { step: '02', title: 'Platform Setup', desc: 'We configure your preferred accounting software and migrate existing data.' },
              { step: '03', title: 'Ongoing Bookkeeping', desc: 'Daily/weekly transactions recorded, reconciled, and categorised accurately.' },
              { step: '04', title: 'Reports & Review', desc: 'Regular financial statements delivered. You stay informed; we handle the details.' },
            ].map((s) => (
              <div key={s.step} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-5 bg-accent/10 border-2 border-accent/30 rounded-full flex items-center justify-center text-xl font-bold text-foreground group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                  {s.step}
                </div>
                <h4 className="font-bold text-foreground mb-2">{s.title}</h4>
                <p className="text-sm text-foreground-secondary leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Clean Up Your Books?</h2>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
            Get a free consultation with our accounting experts and see how we can transform your financial management.
          </p>
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
