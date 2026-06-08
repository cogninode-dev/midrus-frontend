import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { ChevronRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'We start by understanding your business structure, financial situation, and compliance needs through a free one-on-one consultation.',
    detail: 'No paperwork, no obligations — just an honest conversation about where you are and where you need to be. This session helps us design the exact scope of engagement for you.',
    icon: '💬',
  },
  {
    number: '02',
    title: 'Document Collection',
    description: 'Our team guides you through the required documents — bank statements, invoices, registration papers — making the process simple and stress-free.',
    detail: "We send you a clear checklist tailored to your service. A dedicated point of contact is assigned to assist you at every step — you never have to figure it out alone.",
    icon: '📂',
  },
  {
    number: '03',
    title: 'Analysis & Planning',
    description: 'We analyse your financials, identify tax-saving opportunities, and create a compliance roadmap tailored to your business.',
    detail: 'This is where expertise matters. Our CAs and financial advisors review everything in detail — spotting issues, opportunities, and the optimal path forward.',
    icon: '🔍',
  },
  {
    number: '04',
    title: 'Filing & Registration',
    description: 'We handle all government filings — GST returns, ITR, MCA forms, and company incorporation — accurately and on time.',
    detail: 'Every submission is double-checked before it goes out. We track portal acknowledgements, follow up on pending approvals, and keep you informed throughout.',
    icon: '📋',
  },
  {
    number: '05',
    title: 'Review & Delivery',
    description: 'You receive detailed reports, certificates, and acknowledgements with clear explanations of every action taken on your behalf.',
    detail: "We don't just drop a file in your inbox. We walk you through the key numbers, what they mean for your business, and what you should track going forward.",
    icon: '✅',
  },
  {
    number: '06',
    title: 'Ongoing Support',
    description: 'We provide continuous support for compliance deadlines, notices, and any changes in tax laws or regulations affecting your business.',
    detail: 'Tax laws change. New deadlines arise. We proactively alert you when something needs attention and handle it — so nothing slips through the cracks.',
    icon: '🔄',
  },
]

export default function ProcessPage() {
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
            <span className="text-accent">Our Process</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-accent rounded-full" />
              Simple. Transparent. Reliable.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              How We Work<br /><span className="text-accent">With You</span>
            </h1>
            <p className="text-lg text-white/65 leading-relaxed max-w-xl">
              A clear, structured process — so you always know what&apos;s happening, what comes next, and what we need from you.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="space-y-0">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-14 ${idx !== steps.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center text-2xl font-bold text-foreground flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="text-3xl">{step.icon}</div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">{step.description}</p>
                </div>

                <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="p-6 bg-[#F5F5F3] rounded-2xl border border-border hover:border-accent hover:shadow-md transition-all duration-200">
                    <p className="text-xs font-semibold text-link uppercase tracking-widest mb-3">What happens</p>
                    <p className="text-foreground-secondary leading-relaxed text-sm">{step.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">Step 1 is free. Book your consultation and let&apos;s talk about what your business needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-foreground text-white font-semibold rounded-sm hover:bg-foreground/90 transition-all">
              Book Free Consultation
            </Link>
            <Link href="/services" className="px-8 py-4 border-2 border-foreground text-foreground font-semibold rounded-sm hover:bg-white transition-all">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
