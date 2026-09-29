// The text of the Terms of Service and Privacy Policy shown on the website.
// Kept in sync with the mobile app's copy of the same documents at
// midrus_app/lib/legal/legal_documents.dart — update both together.
//
// IMPORTANT: this is a good-faith draft written from what the product
// actually does. It must be reviewed by a qualified Indian lawyer before
// launch. Bump legalVersion (and the backend's TERMS_VERSION) whenever it
// changes.

export const COMPANY_NAME = 'MIDRUS ASSOCIATE PRIVATE LIMITED'
export const COMPANY_ADDRESS =
  'Plot No-601/7036, AT/PO-Saranga, PS-Parjang, Dist-Dhenkanal-759146, Odisha, India'
export const SUPPORT_EMAIL = 'info@midrusindia.com'

// Matches TERMS_VERSION on the backend, which stores it with each acceptance.
export const legalVersion = '2026-09-21'
export const legalUpdated = '21 September 2026'

export interface LegalSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface LegalDocument {
  title: string
  intro: string
  sections: LegalSection[]
}

export const termsOfService: LegalDocument = {
  title: 'Terms of Service',
  intro:
    `These terms govern your use of the MIDRUS app and portal, operated by ${COMPANY_NAME} ` +
    `("MIDRUS", "we", "us"). Please read them carefully. By creating an account or using the ` +
    `app you agree to them.`,
  sections: [
    {
      heading: '1. About MIDRUS',
      paragraphs: [
        'MIDRUS provides accounting, tax and compliance services to businesses and individuals ' +
          'in India. The app lets you request services, upload documents, follow the status of ' +
          'your filings, receive and download invoices, and pay for our services.',
      ],
    },
    {
      heading: '2. Who can use the app',
      paragraphs: [
        'You must be at least 18 years old and able to enter into a binding contract under ' +
          'Indian law. If you use MIDRUS on behalf of a business, you confirm that you are ' +
          'authorised to bind it.',
      ],
    },
    {
      heading: '3. Your account',
      bullets: [
        'You sign in with your email address and password, and confirm each sign-in with a ' +
          'one-time code we email to you.',
        'New accounts are reviewed by MIDRUS. Until an account is approved you cannot request ' +
          'services. We may decline or later revoke approval where we reasonably believe the ' +
          'account is inaccurate, fraudulent or misused.',
        'Give us accurate, current information and keep it up to date.',
        `Keep your password and email inbox secure. You are responsible for activity under ` +
          `your account. Tell us immediately at ${SUPPORT_EMAIL} if you suspect unauthorised use.`,
      ],
    },
    {
      heading: '4. Our services',
      paragraphs: [
        'When you request a service, MIDRUS reviews it and, if we accept it, sets the charge ' +
          'and the scope. A request is not a contract for that service until we accept it and ' +
          'it is marked Active.',
        'Timelines depend on you giving us complete and correct information and documents on ' +
          'time. Unless we have agreed in writing to manage a particular deadline for you, ' +
          'meeting statutory due dates (for example GST, TDS or income-tax filings) remains ' +
          'your responsibility.',
      ],
    },
    {
      heading: '5. Documents and information you provide',
      bullets: [
        'You confirm that you own, or are authorised to share, everything you upload, and ' +
          'that it is accurate and lawful.',
        'Uploads must be PDF, DOC, DOCX, XLS, XLSX, CSV, JPG or PNG files of up to 20 MB. Do ' +
          'not upload malware, unlawful content or anything you have no right to share.',
        'You keep ownership of your documents. You give MIDRUS permission to store, access ' +
          'and process them only to provide our services to you, to meet legal obligations ' +
          'and to keep the service secure.',
        'Our advice and filings are only as good as the information you provide. We are not ' +
          'responsible for errors, penalties or interest caused by incomplete, late or ' +
          'inaccurate information.',
      ],
    },
    {
      heading: '6. Fees, invoices and payment',
      paragraphs: [
        'Charges are communicated for each service and shown in the app. Invoices are issued ' +
          'by MIDRUS, include applicable GST and can be downloaded from the app.',
        'You pay by UPI to the account shown in the Pay section, or by any other method we ' +
          'agree. Payments are processed by your UPI app and bank; MIDRUS does not receive or ' +
          'store your bank, card or UPI credentials. Please check the payee name before ' +
          'paying and quote the invoice number where possible.',
        'We may pause or stop a service while an invoice remains unpaid after its due date. ' +
          'Fees already paid for work completed are not refundable unless required by law or ' +
          'agreed in writing.',
      ],
    },
    {
      heading: '7. Acceptable use',
      paragraphs: ['You agree not to:'],
      bullets: [
        "break any law or infringe anyone's rights;",
        'attempt to access accounts, data or systems that are not yours;',
        'probe, disrupt or overload the app or our servers, or bypass its security or rate ' +
          'limits;',
        'copy, reverse-engineer or resell the app, except as the law allows;',
        'use the app to send spam or harmful content.',
      ],
    },
    {
      heading: '8. Confidentiality and privacy',
      paragraphs: [
        'We treat your business and tax information as confidential and share it only as ' +
          'described in our Privacy Policy. Our team members who work on your matters can ' +
          'see the documents you upload.',
      ],
    },
    {
      heading: '9. Intellectual property',
      paragraphs: [
        'The MIDRUS name, logo, app design and content are owned by MIDRUS or its licensors. ' +
          'We give you a personal, non-exclusive, non-transferable right to use the app for ' +
          'its intended purpose while you have an account.',
      ],
    },
    {
      heading: '10. Availability and disclaimers',
      paragraphs: [
        'We work to keep the app available and accurate, but it is provided "as is" and we ' +
          'cannot promise it will always be uninterrupted or error-free. Information in the ' +
          'app is for your convenience and does not replace professional advice on your ' +
          'specific situation.',
      ],
    },
    {
      heading: '11. Limitation of liability',
      paragraphs: [
        'To the extent the law allows, MIDRUS is not liable for indirect or consequential ' +
          'loss, or for loss of profit, business or data, arising from your use of the app. ' +
          'Our total liability for any claim relating to a service is limited to the fees you ' +
          'paid us for that service in the 12 months before the claim arose. Nothing in these ' +
          'terms limits liability that cannot be limited by law.',
      ],
    },
    {
      heading: '12. Suspension, termination and deleting your account',
      paragraphs: [
        'You can stop using MIDRUS at any time, and you can delete your account yourself from ' +
          'Profile → Delete account. We may suspend or close an account that breaks these ' +
          'terms or the law, after notice where reasonably possible.',
        'When an account is deleted your personal details and uploaded documents are erased. ' +
          'Invoices and tax records we have already issued are kept for the period required ' +
          'by Indian tax and company law (see the Privacy Policy). Amounts owed for services ' +
          'already provided remain payable.',
      ],
    },
    {
      heading: '13. Changes to these terms',
      paragraphs: [
        'We may update these terms as our services or the law change. We will show the new ' +
          'version in the app and, for material changes, tell you by email. Continuing to ' +
          'use the app after a change means you accept the updated terms.',
      ],
    },
    {
      heading: '14. Governing law and disputes',
      paragraphs: [
        'These terms are governed by the laws of India. Please contact us first so we can ' +
          'try to resolve any complaint informally. Courts at Dhenkanal, Odisha, where our ' +
          'registered office is located, have jurisdiction, subject to any rights you have ' +
          'under consumer-protection law.',
      ],
    },
    {
      heading: '15. Contact us',
      paragraphs: [`${COMPANY_NAME}\n${COMPANY_ADDRESS}\nEmail: ${SUPPORT_EMAIL}`],
    },
  ],
}

export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  intro:
    `${COMPANY_NAME} ("MIDRUS", "we", "us") respects your privacy. This policy explains what ` +
    `personal data the MIDRUS app collects, why, who can see it, how long we keep it, and the ` +
    `choices and rights you have under Indian law, including the Digital Personal Data ` +
    `Protection Act, 2023.`,
  sections: [
    {
      heading: '1. What we collect',
      paragraphs: ['We collect only what we need to provide our services:'],
      bullets: [
        'Account details: your name, email address and password (stored only as a one-way ' +
          'hash), and optionally your phone number.',
        'Business details you add: company name, address, website, tax ID and GST number.',
        'Documents you upload for your filings, and the notes you write when requesting a ' +
          'service.',
        'Service, invoice and payment-reference records created while we work for you.',
        'Messages you send us, and the one-time codes we email to verify your sign-in.',
        'Technical data: your IP address, app activity and error information in our server ' +
          'logs, used for security and troubleshooting.',
      ],
    },
    {
      heading: '2. What we do not collect',
      paragraphs: [
        'The app does not use advertising or analytics trackers, does not track you across ' +
          'other apps or websites, and does not access your location, contacts, camera, ' +
          'microphone or photo library. It only opens the files you choose to upload.',
      ],
    },
    {
      heading: '3. Why we use your data',
      bullets: [
        'To create and secure your account and confirm it is you signing in.',
        'To review and deliver the services you request, and to prepare and send invoices.',
        'To contact you about your account, services and payments (for example sign-in ' +
          'codes, approval and invoice emails).',
        'To keep MIDRUS secure, prevent misuse and fix problems.',
        'To meet our legal, tax and accounting obligations.',
      ],
    },
    {
      heading: '4. Legal basis',
      paragraphs: [
        'We process your data with your consent (given when you create an account) and for ' +
          'the legitimate uses the law permits, such as performing our services to you and ' +
          'complying with legal obligations. You can withdraw consent at any time by ' +
          'deleting your account; this does not affect processing already done.',
      ],
    },
    {
      heading: '5. Who can see your data',
      paragraphs: ['We do not sell your personal data. It is available to:'],
      bullets: [
        'MIDRUS team members who need it to handle your account and filings.',
        'Service providers that help us run MIDRUS, such as our cloud hosting provider and ' +
          'our email delivery provider. They may process data only on our instructions.',
        'Government authorities, courts or regulators where the law requires us to disclose ' +
          'it, and professional advisers under a duty of confidentiality.',
      ],
    },
    {
      heading: '6. Payments',
      paragraphs: [
        'The app shows our UPI details so you can pay us. The payment is made in your UPI ' +
          'app and processed by your bank and the UPI network. MIDRUS never receives or ' +
          'stores your bank account, card or UPI PIN details.',
      ],
    },
    {
      heading: '7. How we protect your data',
      bullets: [
        'Data travels between the app and our servers over encrypted (HTTPS) connections.',
        "Passwords are stored only as one-way hashes. Your sign-in session is kept in your " +
          "device's secure storage and is removed when you sign out.",
        'Document downloads use short-lived, signed links rather than public addresses.',
        'Access to client data is limited to authorised staff.',
        'No system is perfectly secure. If a breach affects your personal data we will ' +
          'notify you and the authorities as the law requires.',
      ],
    },
    {
      heading: '8. How long we keep it',
      paragraphs: [
        'We keep your account data while your account is active. If you delete your account, ' +
          'we erase your profile, sign-in details, uploaded documents and sign-in codes. ' +
          'Invoices and tax records we have already issued are retained, without a login ' +
          'attached, for the period required by Indian tax and company law (currently up to ' +
          'eight years for many records). Backups are overwritten on their normal schedule.',
      ],
    },
    {
      heading: '9. Your rights',
      paragraphs: ['You can, at any time:'],
      bullets: [
        'see and correct your details in Profile;',
        'delete your account and personal data yourself in Profile → Delete account;',
        'ask us for a copy of the personal data we hold about you, or to correct or erase ' +
          `it, by emailing ${SUPPORT_EMAIL};`,
        'withdraw your consent, and nominate another person to exercise your rights if you ' +
          'cannot;',
        'make a complaint about how your data is handled. Write to our grievance contact ' +
          'below; if you are not satisfied you may approach the Data Protection Board of ' +
          'India.',
      ],
    },
    {
      heading: '10. Children',
      paragraphs: [
        'MIDRUS is for adults running or managing a business or their own tax affairs. It is ' +
          "not intended for anyone under 18, and we do not knowingly collect children's " +
          'data. If you believe a child has given us data, contact us and we will delete it.',
      ],
    },
    {
      heading: '11. Changes to this policy',
      paragraphs: [
        'We may update this policy. The current version and its date are always shown here, ' +
          'and we will tell you about material changes in the app or by email.',
      ],
    },
    {
      heading: '12. Contact and grievance redressal',
      paragraphs: [
        `Grievance contact, ${COMPANY_NAME}\n${COMPANY_ADDRESS}\nEmail: ${SUPPORT_EMAIL}\n\n` +
          'We aim to acknowledge your request promptly and to resolve it within 30 days.',
      ],
    },
  ],
}
