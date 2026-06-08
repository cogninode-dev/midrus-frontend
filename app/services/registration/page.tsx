import Link from 'next/link'
import { ChevronRight, Building2, Briefcase, Users, User, Globe, FileCheck, CheckCircle2, Clock } from 'lucide-react'

const registrationTypes = [
  {
    icon: <Building2 className="w-7 h-7" />,
    title: 'Private Limited Company',
    popular: true,
    time: '7–10 Working Days',
    desc: 'The most preferred structure for startups and growing businesses. Limited liability, separate legal entity, and easy fundraising capability.',
    points: ['DIN & DSC for Directors', 'MOA & AOA Drafting', 'Certificate of Incorporation', 'PAN, TAN & Bank Account'],
  },
  {
    icon: <Briefcase className="w-7 h-7" />,
    title: 'LLP Formation',
    popular: false,
    time: '7–10 Working Days',
    desc: 'Combines the flexibility of a partnership with limited liability. Ideal for professional firms, consultancies, and service businesses.',
    points: ['DPIN & DSC', 'LLP Agreement Drafting', 'Certificate of Incorporation', 'PAN & TAN Registration'],
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Partnership Firm',
    popular: false,
    time: '3–5 Working Days',
    desc: 'Simple to set up with a registered partnership deed. Best suited for small businesses with known and trusted partners.',
    points: ['Partnership Deed Drafting', 'Firm PAN Registration', 'Current Account Assistance', 'GST Registration'],
  },
  {
    icon: <User className="w-7 h-7" />,
    title: 'Sole Proprietorship',
    popular: false,
    time: '2–3 Working Days',
    desc: 'The simplest business structure for solo entrepreneurs. No registration required by law, but we help with GST, Shop Act, and Udyam registration.',
    points: ['Udyam (MSME) Registration', 'GST Registration', 'Shop & Establishment Act', 'Bank Account Opening'],
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: 'One Person Company (OPC)',
    popular: false,
    time: '7–10 Working Days',
    desc: 'A private limited company with a single shareholder and director. Gives solo founders the protection of a corporate structure.',
    points: ['DIN & DSC', 'MOA & AOA Drafting', 'Certificate of Incorporation', 'Nominee Director Consent'],
  },
  {
    icon: <FileCheck className="w-7 h-7" />,
    title: 'GST & Other Registrations',
    popular: false,
    time: '3–7 Working Days',
    desc: 'We handle all ancillary registrations your business needs to operate legally — from GST to Udyam to Professional Tax.',
    points: ['GST Registration', 'Udyam / MSME Certificate', 'Professional Tax', 'Import Export Code (IEC)'],
  },
]

export default function RegistrationPage() {
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
            <span className="text-accent">Company Registration</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-sm font-semibold mb-6">
              <Building2 className="w-4 h-4" />
              Company Registration Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Register Your<br /><span className="text-accent">Business in Days</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
              End-to-end assistance with company incorporation, MCA filings, GST registration, and all legal formalities to get your business up and running quickly — with zero hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-accent text-foreground font-semibold rounded-sm hover:bg-accent-hover transition-all duration-300 text-center">
                Start Registration
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
              { val: '200+', label: 'Companies Registered' },
              { val: '7 Days', label: 'Average Turnaround' },
              { val: '100%', label: 'Digital Process' },
              { val: '0', label: 'Rejection Rate' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{s.val}</p>
                <p className="text-sm font-medium text-foreground/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Types */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">Business Structures</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Choose the Right Structure</h2>
            <p className="text-foreground-secondary max-w-xl mx-auto">We help you pick the right business entity and handle the entire registration process from start to finish.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registrationTypes.map((r, idx) => (
              <div key={r.title} className={`relative p-7 rounded-lg border-2 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fadeInUp ${r.popular ? 'border-accent' : 'border-border hover:border-accent'}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                {r.popular && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 bg-accent text-foreground text-xs font-bold rounded-full">Most Popular</div>
                )}
                <div className="w-12 h-12 bg-[#F5F5F3] rounded-lg flex items-center justify-center text-foreground group-hover:bg-accent transition-all duration-300 mb-5">
                  {r.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{r.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-link font-semibold mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  {r.time}
                </div>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-5">{r.desc}</p>
                <ul className="space-y-1.5">
                  {r.points.map((p) => (
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

      {/* Process */}
      <section className="py-20 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">From Idea to Incorporated in 4 Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We help you choose the right structure based on your goals, partners, and funding plans.' },
              { step: '02', title: 'Document Collection', desc: 'You share basic identity documents. We take care of all MCA and government portals.' },
              { step: '03', title: 'Filing & Approval', desc: 'We file with MCA, follow up with authorities, and respond to any queries.' },
              { step: '04', title: 'Certificate & Post-Setup', desc: 'You receive your Certificate of Incorporation plus PAN, TAN, and bank account assistance.' },
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Start Your Business?</h2>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">Get your company registered in as little as 7 working days with our expert team handling everything.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-foreground text-white font-semibold rounded-sm hover:bg-foreground/90 transition-all duration-300">
              Start Registration Today
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
