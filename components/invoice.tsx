'use client'

import { InvoiceData, amountToWords } from '@/lib/invoice-store'
import { X, Printer } from 'lucide-react'

interface Props {
  invoice: InvoiceData
  onClose: () => void
}

export default function ProformaInvoice({ invoice, onClose }: Props) {
  const handlePrint = () => window.print()

  const dateObj = new Date(invoice.date)
  const dateStr = dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')

  const items    = invoice.items ?? []
  const totalQty = `${items.length}.00 Month${items.length !== 1 ? 's' : ''}`
  const hsnList  = [...new Set(items.map((i) => i.hsnCode))].join(', ') || '998311'

  return (
    <>
      <style>{`
        @media print {
          body > *:not(#invoice-modal-root) { display: none !important; }
          #invoice-modal-root { position: static !important; background: white !important; }
          .print-hide { display: none !important; }
          @page { size: A4; margin: 8mm; }
        }
      `}</style>

      <div
        id="invoice-modal-root"
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl my-4 overflow-hidden">

          {/* Controls */}
          <div className="print-hide flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2 bg-[#5d56b7] text-white text-sm font-semibold rounded-lg hover:bg-[#4d47a7] transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print / Save as PDF
              </button>
              <span className="text-sm text-gray-500">Invoice {invoice.invoiceNumber}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Invoice Body */}
          <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11px', color: '#000', padding: '16px 20px' }}>

            {/* Company Header */}
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <div style={{ fontSize: '36px', color: '#5d56b7', fontWeight: '800', letterSpacing: '1px' }}>
                MIDRUS ASSOCIATE PRIVATE LIMITED
              </div>
              <div style={{ fontSize: '15px', marginTop: '4px' }}>CIN U69200OD2024PTC044993</div>
            </div>

            <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '6px', fontSize: '13px' }}>
              INVOICE
            </div>

            {/* Seller + Invoice Meta */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 7px', verticalAlign: 'top', width: '36%' }}>
                    <strong>MIDRUS ASSOCIATE PRIVATE LIMITED</strong><br />
                    PLOT NO-601/7036<br />
                    IGIT ROAD, SARANGA<br />
                    DHENKANAL<br />
                    ODISHA<br />
                    759146<br /><br />
                    GSTIN/UIN : 21AARCM7795A1Z9<br />
                    State Name : Odisha, Code : 21
                  </td>
                  <td style={{ border: '1px solid #000', padding: '0', verticalAlign: 'top', width: '64%' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        <Row label="Invoice No." value={invoice.invoiceNumber} label2="Dated" value2={dateStr} />
                        <Row label="Delivery Note" value="" label2="Mode/Terms of Payment" value2="" />
                        <Row label="Reference No. & Date" value="" label2="Other References" value2="" />
                        <Row label="Buyer's Order No." value="" label2="Dated" value2="" />
                        <Row label="Dispatch Doc No." value="" label2="Delivery Note Date" value2="" />
                        <Row label="Dispatched through" value="" label2="Destination" value2="" />
                        <tr>
                          <td style={{ border: '1px solid #000', padding: '3px 5px', width: '25%' }}>Terms of Delivery</td>
                          <td style={{ border: '1px solid #000', padding: '3px 5px' }} colSpan={3}></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Consignee / Buyer */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 7px', verticalAlign: 'top', width: '36%' }}>
                    <span style={{ fontSize: '10px' }}>Consignee (Ship to)</span><br /><br />
                    <strong>{invoice.customer.toUpperCase()}</strong><br />
                    {invoice.customerCompany && <>{invoice.customerCompany}<br /></>}
                    {invoice.customerAddress && <>{invoice.customerAddress}<br /></>}
                    {invoice.customerGST && <>GSTIN/UIN : {invoice.customerGST}<br /></>}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '5px 7px', verticalAlign: 'top', width: '64%' }}>
                    <span style={{ fontSize: '10px' }}>Buyer (Bill to)</span><br /><br />
                    <strong>{invoice.customer.toUpperCase()}</strong><br />
                    {invoice.customerCompany && <>{invoice.customerCompany}<br /></>}
                    {invoice.customerAddress && <>{invoice.customerAddress}<br /></>}
                    {invoice.customerGST && <>GSTIN/UIN : {invoice.customerGST}<br /></>}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['No.', 'Description of Goods / Services', 'HSN/SAC', 'Quantity', 'Rate (Incl. Tax)', 'Rate', 'Per', 'Amount'].map((h, i) => (
                    <th key={i} style={{
                      border: '1px solid #000', padding: '4px 5px',
                      fontSize: '10px', textAlign: 'center',
                      width: ['4%', '40%', '10%', '8%', '9%', '9%', '6%', '14%'][i],
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const desc        = `${item.serviceName.toUpperCase()} — ${item.monthName.toUpperCase()} ${item.year}`
                  const rateInclTax = (item.amount * (1 + invoice.gstRate / 100))
                  return (
                    <tr key={item.id}>
                      <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>{idx + 1}</td>
                      <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px' }}>{desc}</td>
                      <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>{item.hsnCode}</td>
                      <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>1.00 Month</td>
                      <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right' }}>{rateInclTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right' }}>{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>Month</td>
                      <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right' }}>{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  )
                })}

                <tr>
                  <td colSpan={7} style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                    IGST @ {invoice.gstRate}%
                  </td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right' }}>
                    {invoice.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>

                <tr>
                  <td colSpan={3} style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px' }}></td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center', fontWeight: 'bold' }}>{totalQty}</td>
                  <td colSpan={3} style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px' }}></td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                    ₹ {invoice.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Amount in Words */}
            <div style={{ border: '1px solid #000', borderTop: 'none', padding: '6px 7px' }}>
              Amount Chargeable (in words)<br /><br />
              <strong>{amountToWords(invoice.total)}</strong>
            </div>

            {/* Tax Breakdown */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>HSN/SAC</th>
                  <th style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>Taxable Value</th>
                  <th style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>Rate</th>
                  <th style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>IGST Amount</th>
                  <th style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>Total Tax Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>{hsnList}</td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right' }}>{invoice.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'center' }}>{invoice.gstRate}%</td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right' }}>{invoice.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right' }}>{invoice.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', fontWeight: 'bold' }}>Total</td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right', fontWeight: 'bold' }}>{invoice.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px' }}></td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right', fontWeight: 'bold' }}>{invoice.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style={{ border: '1px solid #000', padding: '3px 5px', fontSize: '10px', textAlign: 'right', fontWeight: 'bold' }}>{invoice.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>

            {/* Bottom Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '7px', verticalAlign: 'top', width: '35%', height: '110px' }}>
                    <strong>Declaration</strong><br /><br />
                    We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.
                  </td>
                  <td style={{ border: '1px solid #000', padding: '7px', verticalAlign: 'top', width: '35%' }}>
                    Tax Amount (in words)<br /><br />
                    <strong>{amountToWords(invoice.gstAmount)}</strong><br /><br />
                    Company&apos;s Bank Details<br /><br />
                    Bank Name : STATE BANK OF INDIA<br />
                    A/c No : 4333752009<br />
                    Branch &amp; IFSC : TALCHER &amp; SBIN0000192
                    {invoice.notes && <><br /><br /><em style={{ fontSize: '10px', color: '#555' }}>{invoice.notes}</em></>}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '7px', verticalAlign: 'top', width: '30%' }}>
                    For MIDRUS ASSOCIATE PRIVATE LIMITED
                    <div style={{ textAlign: 'right', paddingTop: '50px' }}>
                      ___________________<br />
                      Authorised Signatory
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ textAlign: 'center', fontSize: '10px', marginTop: '5px' }}>
              This is a Computer Generated Invoice
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', fontSize: '13px', lineHeight: '1.8', borderTop: '1px solid #ccc', paddingTop: '12px' }}>
              Regd- Office: Plot No-601/7036, AT/PO- Saranga, PS- Parjang, Dist-Dhenkanal-759146<br />
              Mob - 9543253565, 9488222454 &nbsp;&nbsp;&nbsp; Email - info@midrusindia.com
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

function Row({ label, value, label2, value2 }: { label: string; value: string; label2: string; value2: string }) {
  return (
    <tr>
      <td style={{ border: '1px solid #000', padding: '3px 5px', width: '25%', fontSize: '10px' }}>{label}</td>
      <td style={{ border: '1px solid #000', padding: '3px 5px', width: '25%', fontSize: '10px' }}>{value}</td>
      <td style={{ border: '1px solid #000', padding: '3px 5px', width: '25%', fontSize: '10px' }}>{label2}</td>
      <td style={{ border: '1px solid #000', padding: '3px 5px', width: '25%', fontSize: '10px' }}>{value2}</td>
    </tr>
  )
}
