'use client'

import { Mail } from 'lucide-react'
import type { LegalDocument } from '@/lib/legal-content'
import { legalUpdated, legalVersion, SUPPORT_EMAIL } from '@/lib/legal-content'

export default function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{document.title}</h1>
      <p className="text-sm text-foreground-muted mb-8">
        Last updated {legalUpdated} · Version {legalVersion}
      </p>

      <p className="text-foreground-secondary leading-relaxed whitespace-pre-line">
        {document.intro}
      </p>

      {document.sections.map((section) => (
        <section key={section.heading} className="mt-8">
          <h2 className="text-lg font-bold text-foreground mb-3">{section.heading}</h2>
          {section.paragraphs?.map((p, i) => (
            <p key={i} className="text-foreground-secondary leading-relaxed whitespace-pre-line mb-3">
              {p}
            </p>
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul className="space-y-2">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-foreground-secondary leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <a
        href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(document.title + ' question')}`}
        className="mt-10 inline-flex items-center gap-2 px-5 py-3 border border-border-strong rounded-full text-sm font-semibold text-foreground hover:bg-grey-light transition-all duration-200"
      >
        <Mail className="w-4 h-4" />
        Questions? {SUPPORT_EMAIL}
      </a>
    </div>
  )
}
