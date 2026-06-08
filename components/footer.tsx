'use client'

import Link from 'next/link'
import { MapPin, Building2, Globe, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-foreground text-white py-12 md:py-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-3 animate-fadeInUp">
            <h3 className="text-2xl font-bold mb-4 text-accent">MIDRUS</h3>
            <p className="text-grey-light text-sm leading-relaxed">
              Your trusted partner for accounting, tax, and company registration services across India.
            </p>
            <div className="pt-2 space-y-2.5 text-xs text-grey-light leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                <p>Plot No 601/7036, IGIT Road Sarang,<br />Sarang, Parjang, Dhenkanal - 600100,<br />Odisha, India.</p>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <p>CIN: U69200OD2024PTC044993</p>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-accent shrink-0" />
                <a href="https://www.midrus.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  www.midrus.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                <a href="mailto:manoj@midrusindia.com" className="hover:text-accent transition-colors">
                  manoj@midrusindia.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                <a href="tel:+919488222454" className="hover:text-accent transition-colors">
                  +91 94882 22454
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-grey-light">
              <li>
                <Link href="/team" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-3 text-sm text-grey-light">
              <li>
                <Link href="/services/accounting" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Accounting & Bookkeeping
                </Link>
              </li>
              <li>
                <Link href="/services/tax" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  GST & Income Tax
                </Link>
              </li>
              <li>
                <Link href="/services/registration" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Company Registration
                </Link>
              </li>
              <li>
                <Link href="/services/audit" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Audit & Assurance
                </Link>
              </li>
              <li>
                <Link href="/services/financial-advisory" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Financial Advisory
                </Link>
              </li>
              <li>
                <Link href="/services/manpower" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Manpower Supply
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-bold mb-4 text-white">Follow Us</h4>
            <ul className="space-y-3 text-sm text-grey-light">
              <li>
                <Link href="#" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-grey-dark pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-grey-light">
            <p className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              &copy; {currentYear} MIDRUS India Private Limited. All rights reserved.
            </p>
            <div className="flex gap-6 md:justify-end animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <Link href="#" className="hover:text-accent transition-colors duration-300 hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-accent transition-colors duration-300 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
