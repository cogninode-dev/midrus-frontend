export interface InvoiceItem {
  id: number
  serviceName: string
  month: number
  monthName: string
  year: number
  hsnCode: string
  amount: number
}

export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed'

export interface InvoiceData {
  id: string
  invoiceNumber: string
  customer: string
  customerEmail: string
  customerAddress: string
  customerGST: string
  customerCompany: string
  customerPhone: string
  items: InvoiceItem[]
  gstRate: number
  subtotal: number
  gstAmount: number
  total: number
  uploadedPdfUrl: string | null
  notes: string
  date: string
  paymentStatus: PaymentStatus
  paymentStatusLabel: string
}

export const ADMIN_EMAILS = ['developer@cogninode.net', 'info@midrusindia.com', 'admin@midrusindia.com']

export function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

// ─── Number to Indian Words ───────────────────────────────────────────────────

const ones = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen',
]
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

function belowThousand(n: number): string {
  if (n === 0) return ''
  if (n < 20) return ones[n] + ' '
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '') + ' '
  return ones[Math.floor(n / 100)] + ' Hundred ' + belowThousand(n % 100)
}

export function amountToWords(amount: number): string {
  const rupees = Math.floor(amount)
  const paise = Math.round((amount - rupees) * 100)

  function convert(n: number): string {
    if (n === 0) return ''
    if (n < 1000) return belowThousand(n)
    if (n < 100000) return convert(Math.floor(n / 1000)) + 'Thousand ' + convert(n % 1000)
    if (n < 10000000) return convert(Math.floor(n / 100000)) + 'Lakh ' + convert(n % 100000)
    return convert(Math.floor(n / 10000000)) + 'Crore ' + convert(n % 10000000)
  }

  const rupeeWords = convert(rupees).trim() || 'Zero'
  const paiseWords = paise ? ' and ' + convert(paise).trim() + ' Paise' : ''
  return `INR ${rupeeWords}${paiseWords} Only`
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
