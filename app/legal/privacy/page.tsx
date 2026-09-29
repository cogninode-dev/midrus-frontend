import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import LegalDocumentView from '@/components/legal-document'
import { privacyPolicy } from '@/lib/legal-content'

export const metadata = {
  title: 'Privacy Policy | MIDRUS',
  description: 'What personal data MIDRUS collects, why, and the rights you have over it.',
}

export default function PrivacyPage() {
  return (
    <main className="bg-white text-foreground">
      <Navigation />

      <div className="bg-[#F5F5F3] border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-foreground-muted">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Privacy Policy</span>
          </nav>
        </div>
      </div>

      <LegalDocumentView document={privacyPolicy} />

      <Footer />
    </main>
  )
}
