import { NextResponse } from 'next/server'

const PAYMENT_CONFIG = {
  upiId: '43335752009@sbi',
  payeeName: 'MIDRUS ASSOCIATE PRIVATE LIMITED',
  qrPdf: '/upi-qr.pdf',
  supportedApps: [
    { name: 'Google Pay', bg: '#ffffff', text: '#1a1a1a', border: true },
    { name: 'PhonePe', bg: '#5f259f', text: '#ffffff', border: false },
    { name: 'Paytm', bg: '#002970', text: '#ffffff', border: false },
    { name: 'BHIM', bg: '#1a3f7a', text: '#ffffff', border: false },
    { name: 'YONO SBI', bg: '#2d6fce', text: '#ffffff', border: false },
    { name: 'WhatsApp Pay', bg: '#25D366', text: '#ffffff', border: false },
  ],
  instructions: [
    'Open any UPI app (GPay, PhonePe, Paytm, BHIM, etc.)',
    'Enter the UPI ID or scan the QR code above',
    'Enter the amount as per your invoice',
    'Add your invoice number in the Note / Remarks field',
    'Confirm and complete the payment',
  ],
}

export async function GET() {
  return NextResponse.json(PAYMENT_CONFIG)
}
