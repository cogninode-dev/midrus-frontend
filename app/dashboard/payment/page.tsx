'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Download, Smartphone, CreditCard, ExternalLink, Loader2, FileText, Eye, Receipt } from 'lucide-react'
import { useAuth } from '@/app/auth-context'
import { apiGetInvoices } from '@/lib/api'
import { InvoiceData, InvoiceItem } from '@/lib/invoice-store'
import dynamic from 'next/dynamic'

const InvoiceViewer = dynamic(() => import('@/components/invoice'), { ssr: false })

type PaymentConfig = {
  upiId: string
  payeeName: string
  qrPdf: string
  supportedApps: { name: string; bg: string; text: string; border: boolean }[]
  instructions: string[]
}

// Shape returned by Django API → InvoiceData used by the viewer
function toInvoiceData(raw: Record<string, unknown>): InvoiceData {
  const rawItems = (raw.items as Record<string, unknown>[] | undefined) ?? []
  const items: InvoiceItem[] = rawItems.map((it) => ({
    id:          Number(it.id),
    serviceName: String(it.service_name),
    month:       Number(it.month),
    monthName:   String(it.month_name),
    year:        Number(it.year),
    hsnCode:     String(it.hsn_code ?? '998311'),
    amount:      Number(it.amount),
  }))
  return {
    id:              String(raw.id),
    invoiceNumber:   String(raw.invoice_number),
    customer:        String(raw.customer),
    customerEmail:   String(raw.customer_email),
    customerAddress: String(raw.customer_address ?? ''),
    customerGST:     String(raw.customer_gst ?? ''),
    customerCompany: String(raw.customer_company ?? ''),
    customerPhone:   String(raw.customer_phone ?? ''),
    items,
    gstRate:         Number(raw.gst_rate),
    subtotal:        Number(raw.subtotal),
    gstAmount:       Number(raw.gst_amount),
    total:           Number(raw.total),
    uploadedPdfUrl:  raw.uploaded_pdf_url ? String(raw.uploaded_pdf_url) : null,
    notes:           String(raw.notes ?? ''),
    date:            String(raw.created_at),
  }
}

export default function PaymentPage() {
  const { user } = useAuth()
  const [config, setConfig]               = useState<PaymentConfig | null>(null)
  const [loadingConfig, setLoadingConfig] = useState(true)
  const [copied, setCopied]               = useState(false)
  const [showQR, setShowQR]               = useState(false)
  const [invoices, setInvoices]           = useState<InvoiceData[]>([])
  const [loadingInvoices, setLoadingInvoices] = useState(true)
  const [viewingInvoice, setViewingInvoice]   = useState<InvoiceData | null>(null)

  useEffect(() => {
    fetch('/api/payment')
      .then((r) => r.json())
      .then((data) => { setConfig(data); setLoadingConfig(false) })
      .catch(() => setLoadingConfig(false))
  }, [])

  useEffect(() => {
    if (!user) return
    apiGetInvoices()
      .then((data: Record<string, unknown>[]) => setInvoices(data.map(toInvoiceData)))
      .catch(() => {})
      .finally(() => setLoadingInvoices(false))
  }, [user])

  const copyUPI = async () => {
    if (!config) return
    await navigator.clipboard.writeText(config.upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loadingConfig) {
    return (
      <div className="min-h-screen bg-surface-2 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-foreground-secondary" />
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-surface-2 flex items-center justify-center">
        <p className="text-foreground-secondary text-sm">Unable to load payment details. Please try again.</p>
      </div>
    )
  }

  const upiLink = `upi://pay?pa=${config.upiId}&pn=${encodeURIComponent(config.payeeName)}&cu=INR`

  return (
    <div className="min-h-screen bg-surface-2 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-foreground-secondary text-sm mt-1">
            View your invoices and pay securely via UPI.
          </p>
        </div>

        {/* ─── Invoices Section ─────────────────────────────────────────── */}
        <div className="bg-surface-1 rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Receipt className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Your Invoices</p>
              <p className="text-xs text-foreground-secondary">Invoices sent to you by MIDRUS</p>
            </div>
            {invoices.length > 0 && (
              <span className="ml-auto text-xs font-semibold px-2.5 py-1 bg-accent/30 rounded-full text-foreground">
                {invoices.length}
              </span>
            )}
          </div>

          {loadingInvoices ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-5 h-5 animate-spin text-foreground-muted" />
            </div>
          ) : invoices.length === 0 ? (
            <div className="flex flex-col items-center py-10 gap-2 text-center px-4">
              <FileText className="w-8 h-8 text-foreground-muted/30" />
              <p className="text-sm text-foreground-secondary font-medium">No invoices yet</p>
              <p className="text-xs text-foreground-muted">Your invoices from MIDRUS will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center gap-4 px-6 py-4 hover:bg-surface-2/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-foreground-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {inv.items.length > 0 ? inv.items.map((i) => i.serviceName).join(', ') : inv.invoiceNumber}
                    </p>
                    <p className="text-xs text-foreground-muted">
                      {inv.items.length > 0
                        ? `${inv.items[0].monthName} ${inv.items[0].year}${inv.items.length > 1 ? ` +${inv.items.length - 1} more` : ''}`
                        : ''
                      } &middot; {inv.invoiceNumber}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-base font-bold text-foreground">
                      ₹{inv.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-foreground-muted">incl. GST</p>
                  </div>
                  <button
                    onClick={() => setViewingInvoice(inv)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-accent text-foreground text-xs font-semibold rounded-lg hover:bg-accent-hover active:scale-95 transition-all duration-200 flex-shrink-0 ml-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── UPI Payment Section ──────────────────────────────────────── */}
        <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest px-1">Pay via UPI</p>

        {/* UPI ID Card */}
        <div className="bg-surface-1 rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest">Pay To</p>
              <p className="text-sm font-bold text-foreground">{config.payeeName}</p>
            </div>
          </div>

          <div className="bg-surface-2 rounded-xl border border-border p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-foreground-secondary mb-1">UPI ID</p>
              <p className="text-lg font-bold text-foreground font-mono tracking-wide">{config.upiId}</p>
            </div>
            <button
              onClick={copyUPI}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex-shrink-0 ${
                copied
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-accent text-foreground hover:bg-accent/80 border border-accent'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <a
            href={upiLink}
            className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-foreground text-white font-semibold rounded-xl hover:bg-foreground/90 transition-all duration-200 text-sm"
          >
            <Smartphone className="w-4 h-4" />
            Open in UPI App
          </a>
        </div>

        {/* QR Code */}
        <div className="bg-surface-1 rounded-2xl border border-border shadow-sm overflow-hidden">
          <button
            onClick={() => setShowQR(!showQR)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-2 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-lg">📱</div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">Scan &amp; Pay QR Code</p>
                <p className="text-xs text-foreground-secondary">Works with any UPI app</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-link">{showQR ? 'Hide' : 'Show QR'}</span>
          </button>

          {showQR && (
            <div className="border-t border-border flex flex-col items-center py-6 px-4 gap-4">
              <iframe
                src={config.qrPdf}
                className="w-full max-w-sm rounded-xl border border-border"
                style={{ height: '420px' }}
                title="UPI QR Code"
              />
              <a
                href={config.qrPdf}
                download="MIDRUS-UPI-QR.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-2 border border-border text-foreground text-sm font-semibold rounded-lg hover:border-accent hover:bg-accent/5 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Download QR Code PDF
              </a>
            </div>
          )}
        </div>

        {/* Supported Apps */}
        <div className="bg-surface-1 rounded-2xl border border-border p-6 shadow-sm">
          <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-4">Supported Payment Apps</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {config.supportedApps.map((app) => (
              <div
                key={app.name}
                className="rounded-lg px-2 py-2.5 text-center"
                style={{ backgroundColor: app.bg, color: app.text, border: app.border ? '1px solid #e2e2dc' : 'none' }}
              >
                <p className="text-[11px] font-semibold leading-tight">{app.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-5">
          <p className="text-sm font-bold text-foreground mb-3">How to Pay</p>
          <ol className="space-y-2">
            {config.instructions.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-foreground-secondary">
                <span className="w-5 h-5 rounded-full bg-accent text-foreground text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                {idx === 1 ? (
                  <>Enter UPI ID: <span className="font-mono font-semibold text-foreground mx-1">{config.upiId}</span> — or scan the QR code above</>
                ) : step}
              </li>
            ))}
          </ol>
        </div>

        <p className="text-center text-xs text-foreground-secondary pb-4">
          Payment issues?{' '}
          <a href="mailto:info@midrusassociate.com" className="text-link font-semibold hover:underline inline-flex items-center gap-1">
            Contact us <ExternalLink className="w-3 h-3" />
          </a>
        </p>

      </div>

      {viewingInvoice && (
        <InvoiceViewer invoice={viewingInvoice} onClose={() => setViewingInvoice(null)} />
      )}
    </div>
  )
}
