import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { ChevronRight, User } from 'lucide-react'

const team = [
  {
    name: 'Manoj Sahoo',
    role: 'Founder & Managing Director',
    bio: 'Seasoned finance and compliance expert with deep experience in GST, income tax, and corporate law across Odisha.',
    detail: 'Manoj founded MIDRUS with a vision to make professional-grade accounting and compliance services accessible to businesses of every size — from solo founders to established enterprises.',
    expertise: ['GST Compliance', 'Income Tax', 'Corporate Law', 'Financial Strategy'],
  },
  {
    name: 'Dusasan Sahoo',
    role: 'Director',
    bio: 'Leads strategic operations and business development, ensuring MIDRUS delivers consistent quality across all client engagements.',
    detail: "With a sharp eye for operational excellence, Dusasan oversees the firm's growth initiatives and ensures every client relationship is managed with the highest level of care and accountability.",
    expertise: ['Business Strategy', 'Operations Management', 'Client Relations', 'Quality Assurance'],
  },
  {
    name: 'Sunil Behera',
    role: 'Manager',
    bio: 'Oversees day-to-day operations, client coordination, and service delivery to maintain the highest standards of client satisfaction.',
    detail: 'Sunil is the operational backbone of MIDRUS — coordinating across teams, managing timelines, and ensuring that every deliverable reaches clients accurately and on schedule.',
    expertise: ['Operations', 'Client Coordination', 'Service Delivery', 'Process Management'],
  },
]

const values = [
  { icon: '🎯', title: 'Precision First', desc: 'We verify every figure, every filing, every report — because accuracy is non-negotiable in finance.' },
  { icon: '🤝', title: 'Client-Centric', desc: 'Your business goals define our work. We tailor every engagement to your specific needs and situation.' },
  { icon: '📱', title: 'Always Accessible', desc: "A dedicated point of contact for every client. You're never left waiting or wondering." },
  { icon: '📈', title: 'Growth-Oriented', desc: 'We look beyond compliance — spotting opportunities that help your business grow stronger financially.' },
]

export default function TeamPage() {
  return (
    <main className="bg-white text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-foreground text-white overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-80 h-80 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent">Our Team</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-accent rounded-full" />
              The People Behind MIDRUS
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              Experts You Can<br /><span className="text-accent">Actually Trust</span>
            </h1>
            <p className="text-lg text-white/65 leading-relaxed max-w-xl">
              Our team is composed of qualified CAs, finance professionals, and operations specialists — each committed to delivering exceptional outcomes for every client.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">Leadership</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Meet the Team</h2>
          </div>

          <div className="space-y-10">
            {team.map((member, idx) => (
              <div
                key={member.name}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`flex flex-col items-center md:items-start gap-6 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="w-32 h-32 rounded-2xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
                    <User className="w-16 h-16 text-foreground/40" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-sm font-semibold text-link mb-4">{member.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((e) => (
                        <span key={e} className="px-3 py-1 bg-accent/10 border border-accent/20 text-foreground text-xs font-semibold rounded-full">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                  <p className="text-lg text-foreground font-medium leading-relaxed mb-4">{member.bio}</p>
                  <p className="text-foreground-secondary leading-relaxed">{member.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 bg-white rounded-xl border border-border hover:border-accent hover:shadow-md transition-all duration-200 text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">{v.icon}</div>
                <h4 className="font-bold text-foreground mb-2">{v.title}</h4>
                <p className="text-sm text-foreground-secondary leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Work With Our Team</h2>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">Get in touch and let our experts take the complexity out of your financial management.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-foreground text-white font-semibold rounded-sm hover:bg-foreground/90 transition-all">
              Contact the Team
            </Link>
            <Link href="/services" className="px-8 py-4 border-2 border-foreground text-foreground font-semibold rounded-sm hover:bg-white transition-all">
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
