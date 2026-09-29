import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | MIDRUS',
  description: 'Get in touch with MIDRUS for accounting, GST & tax consultancy, company registration, or financial advisory services.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
