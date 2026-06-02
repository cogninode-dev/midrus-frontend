'use client'

interface ProcessStep {
  number: string
  title: string
  description: string
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'We start by understanding your business structure, financial situation, and compliance needs through a free one-on-one consultation.',
  },
  {
    number: '02',
    title: 'Document Collection',
    description: 'Our team guides you through the required documents — bank statements, invoices, registration papers — making the process simple and stress-free.',
  },
  {
    number: '03',
    title: 'Analysis & Planning',
    description: 'We analyse your financials, identify tax-saving opportunities, and create a compliance roadmap tailored to your business.',
  },
  {
    number: '04',
    title: 'Filing & Registration',
    description: 'We handle all government filings — GST returns, ITR, MCA forms, and company incorporation — accurately and on time.',
  },
  {
    number: '05',
    title: 'Review & Delivery',
    description: 'You receive detailed reports, certificates, and acknowledgements with clear explanations of every action taken on your behalf.',
  },
  {
    number: '06',
    title: 'Ongoing Support',
    description: 'We provide continuous support for compliance deadlines, notices, and any changes in tax laws or regulations affecting your business.',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16 text-balance animate-fadeInUp">
          Our Process
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Connector line for even items */}
              {index % 2 === 0 && index !== steps.length - 1 && (
                <div className="absolute -bottom-16 left-12 w-0.5 h-16 bg-gradient-to-b from-accent to-transparent hidden md:block"></div>
              )}

              <div className="flex gap-6">
                {/* Step Number Circle */}
                <div className="flex-shrink-0">
                  <div className="relative flex items-center justify-center w-24 h-24 bg-accent text-foreground rounded-full font-bold text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-foreground group-hover:text-accent">
                    {step.number}
                    {/* Pulsing ring effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-accent opacity-0 group-hover:opacity-30 animate-pulse"></div>
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-base text-grey leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Hover background */}
              <div className="absolute inset-0 -z-10 bg-grey-light rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -m-6 p-6"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
