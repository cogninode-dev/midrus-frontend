'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Download, Smartphone, CreditCard, ExternalLink, Loader2 } from 'lucide-react'

type PaymentConfig = {
  upiId: string
  payeeName: string
  qrPdf: string
  supportedApps: { name: string; bg: string; text: string; border: boolean }[]
  instructions: string[]
}

export default function PaymentPage() {
  const [config, setConfig] = useState<PaymentConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    fetch('/api/payment')
      .then((r) => r.json())
      .then((data) => { setConfig(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const copyUPI = async () => {
    if (!config) return
    await navigator.clipboard.writeText(config.upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
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
          <h1 className="text-2xl font-bold text-foreground">Make a Payment</h1>
          <p className="text-foreground-secondary text-sm mt-1">
            Pay your invoice securely via UPI — scan the QR code or use the UPI ID below.
          </p>
        </div>

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

          {/* UPI ID */}
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

          {/* Open in UPI app */}
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
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-lg">
                📱
              </div>
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
                style={{
                  backgroundColor: app.bg,
                  color: app.text,
                  border: app.border ? '1px solid #e2e2dc' : 'none',
                }}
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

        {/* Support */}
        <p className="text-center text-xs text-foreground-secondary pb-4">
          Payment issues?{' '}
          <a href="mailto:info@midrusassociate.com" className="text-link font-semibold hover:underline inline-flex items-center gap-1">
            Contact us <ExternalLink className="w-3 h-3" />
          </a>
        </p>

      </div>
    </div>
  )
}
