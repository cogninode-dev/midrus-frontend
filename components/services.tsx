'use client'

import Link from 'next/link'
import { DecorativeCircle } from './decorative-shapes'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  href: string
}

const services: Service[] = [
  {
    id: 'accounting',
    title: 'Accounting & Bookkeeping',
    description: 'Comprehensive virtual bookkeeping across Tally ERP, Xero, Zoho, MYOB & MS Dynamics — accurate, precise, and timely financial statements with IT-enhanced reporting.',
    icon: '📒',
    href: '/services/accounting',
  },
  {
    id: 'tax',
    title: 'GST & Income Tax Consultancy',
    description: 'Expert GST filing, income tax returns, and tax planning for individuals and businesses. We ensure full compliance while maximizing deductions and minimizing liabilities.',
    icon: '🧾',
    href: '/services/tax',
  },
  {
    id: 'registration',
    title: 'Company Registration',
    description: 'End-to-end assistance with company incorporation, MCA filings, GST registration, and all legal formalities to get your business up and running quickly.',
    icon: '🏢',
    href: '/services/registration',
  },
  {
    id: 'audit',
    title: 'Audit & Assurance',
    description: 'Statutory audit, internal audit, tax audit, GST audit, and forensic investigations conducted by ICAI-registered Chartered Accountants — objective, thorough, and deadline-driven.',
    icon: '🔍',
    href: '/services/audit',
  },
  {
    id: 'financial-advisory',
    title: 'Financial Advisory Services',
    description: 'Strategic financial planning, investment guidance, cash flow management, and business forecasting to help you make informed decisions and achieve long-term financial goals.',
    icon: '💰',
    href: '/services/financial-advisory',
  },
  {
    id: 'manpower',
    title: 'Manpower Supply Services',
    description: 'Reliable staffing and manpower solutions for businesses of all sizes. We connect you with skilled, verified professionals across accounting, administration, and operations roles.',
    icon: '👥',
    href: '/services/manpower',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Services
          </h2>
          <p className="text-base md:text-lg text-grey max-w-lg leading-relaxed">
            At MIDRUS, we offer professional financial and legal services to help businesses start, grow, and stay compliant.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative p-6 md:p-8 bg-grey-light rounded-lg border-2 border-border hover:border-accent hover:bg-accent hover:text-foreground transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex flex-col h-full">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-grey group-hover:text-foreground/90 flex-grow leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                  <span className="text-sm font-semibold">Learn more</span>
                  <span className="text-lg">→</span>
                </div>
              </div>

              {/* Background accent circle */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <DecorativeCircle
        size="xl"
        position="absolute -top-20 right-0"
        className="opacity-20"
      />
      <DecorativeCircle
        size="lg"
        position="absolute bottom-10 -left-32"
        className="opacity-15"
      />
    </section>
  )
}
