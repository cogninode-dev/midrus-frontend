import Link from 'next/link'
import { ChevronRight, UserCheck, Briefcase, ClipboardList, Star, Clock, Shield } from 'lucide-react'

const roles = [
  { icon: '📊', title: 'Accounting & Finance', roles: ['Accountants', 'Bookkeepers', 'Financial Analysts', 'Payroll Executives', 'Audit Assistants'] },
  { icon: '🏢', title: 'Administration', roles: ['Office Managers', 'Executive Assistants', 'Data Entry Operators', 'HR Executives', 'Receptionists'] },
  { icon: '⚙️', title: 'Operations', roles: ['Operations Managers', 'Procurement Officers', 'Logistics Coordinators', 'Quality Executives', 'Store Managers'] },
  { icon: '💻', title: 'IT & Tech Support', roles: ['IT Support Executives', 'ERP Operators', 'System Administrators', 'Data Analysts', 'Tally Operators'] },
]

const process = [
  { step: '01', title: 'Requirement Briefing', desc: 'You share the role, skills required, and timeline. We align on expectations.' },
  { step: '02', title: 'Candidate Sourcing', desc: 'We tap our verified talent pool and advertise the role on relevant platforms.' },
  { step: '03', title: 'Screening & Verification', desc: 'Background checks, skill assessments, and reference verification — before shortlisting.' },
  { step: '04', title: 'Interview & Selection', desc: 'You interview shortlisted candidates. We coordinate scheduling and feedback.' },
  { step: '05', title: 'Onboarding Support', desc: 'We support the joining process and remain your point of contact post-placement.' },
  { step: '06', title: 'Replacement Guarantee', desc: "If a placement doesn't work out within 90 days, we replace at no extra cost." },
]

export default function ManpowerPage() {
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
            <span className="text-accent">Manpower Supply</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-sm font-semibold mb-6">
              <UserCheck className="w-4 h-4" />
              Manpower Supply Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              The Right People.<br /><span className="text-accent">Right When You Need Them.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
              Reliable staffing and manpower solutions for businesses of all sizes. We connect you with skilled, verified professionals across accounting, administration, and operations roles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-accent text-foreground font-semibold rounded-sm hover:bg-accent-hover transition-all duration-300 text-center">
                Request Talent
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
              { val: '500+', label: 'Candidates Placed' },
              { val: '4', label: 'Industry Verticals' },
              { val: '90 Days', label: 'Replacement Guarantee' },
              { val: '100%', label: 'Background Verified' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{s.val}</p>
                <p className="text-sm font-medium text-foreground/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles We Place */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">Our Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Roles We Recruit For</h2>
            <p className="text-foreground-secondary max-w-xl mx-auto">From entry-level assistants to senior managers — our talent network spans all functional areas your business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((r, idx) => (
              <div key={r.title} className="p-7 rounded-lg border-2 border-border bg-white hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{r.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-4">{r.title}</h3>
                <ul className="space-y-2">
                  {r.roles.map((role) => (
                    <li key={role} className="flex items-center gap-2 text-sm text-foreground-secondary">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">Our Promise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Businesses Choose Us for Staffing</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <UserCheck className="w-6 h-6" />, title: 'Thoroughly Verified', desc: 'Every candidate undergoes document verification, reference checks, and skill assessments before we present them to you.' },
              { icon: <Clock className="w-6 h-6" />, title: 'Fast Turnaround', desc: 'We present shortlisted profiles within 5–7 working days of receiving your requirement — speed without compromising quality.' },
              { icon: <Star className="w-6 h-6" />, title: 'Domain Specialists', desc: 'We focus on finance, accounting, and ops roles — so our talent pool is deep and specialised, not generic.' },
              { icon: <Shield className="w-6 h-6" />, title: '90-Day Guarantee', desc: "If a placed candidate doesn't work out within 90 days, we replace them free of charge — your satisfaction is guaranteed." },
              { icon: <Briefcase className="w-6 h-6" />, title: 'Flexible Engagement', desc: 'Full-time, part-time, contract, or temporary — we supply talent in whatever model works best for your business.' },
              { icon: <ClipboardList className="w-6 h-6" />, title: 'Post-Placement Support', desc: 'We stay in touch after placement — ensuring the candidate is settling in and performing to your expectations.' },
            ].map((w) => (
              <div key={w.title} className="p-6 bg-white rounded-lg border border-border hover:border-accent hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-link mb-4 group-hover:bg-accent group-hover:text-foreground transition-all duration-300">
                  {w.icon}
                </div>
                <h4 className="font-bold text-foreground mb-2">{w.title}</h4>
                <p className="text-sm text-foreground-secondary leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Hiring Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((s, idx) => (
              <div key={s.step} className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-accent/40 hover:bg-white/10 transition-all duration-300 animate-fadeInUp" style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold mb-4">{s.step}</div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Need Skilled Finance & Admin Staff?</h2>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">Share your staffing requirements and we&apos;ll send you shortlisted, verified candidates within the week.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-foreground text-white font-semibold rounded-sm hover:bg-foreground/90 transition-all duration-300">
              Request Talent Today
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
