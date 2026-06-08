import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'Free one-on-one session to understand your business, financials, and compliance needs.',
    icon: '💬',
  },
  {
    number: '02',
    title: 'Document Collection',
    description: 'We send a tailored checklist and guide you through gathering every required document.',
    icon: '📂',
  },
  {
    number: '03',
    title: 'Analysis & Planning',
    description: 'Our CAs analyse your financials, spot savings, and build your compliance roadmap.',
    icon: '🔍',
  },
  {
    number: '04',
    title: 'Filing & Registration',
    description: 'We handle all government filings — GST, ITR, MCA forms — accurately and on time.',
    icon: '📋',
  },
  {
    number: '05',
    title: 'Review & Delivery',
    description: 'Detailed reports, certificates, and acknowledgements delivered with clear explanations.',
    icon: '✅',
  },
  {
    number: '06',
    title: 'Ongoing Support',
    description: 'Continuous support for compliance deadlines and regulatory changes — year-round.',
    icon: '🔄',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative py-16 md:py-24 bg-[#F5F5F3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 animate-fadeInUp">
          <div>
            <p className="text-sm font-semibold text-link tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Our Process
            </h2>
          </div>
          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b-2 border-accent pb-0.5 hover:text-accent transition-colors self-start md:self-auto"
          >
            See full process
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Steps — horizontal stepper */}
        <div className="relative">

          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block absolute h-0.5 bg-accent/40"
            style={{ top: '24px', left: 'calc(8.333% + 24px)', right: 'calc(8.333% + 24px)' }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center group animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {/* Number circle */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-accent border-4 border-[#F5F5F3] flex items-center justify-center font-bold text-foreground text-sm mb-5 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
