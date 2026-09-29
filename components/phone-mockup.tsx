'use client'

import Image from 'next/image'
import {
  Bell, Check, ChevronRight, ListChecks, CheckCircle2, Receipt, Clock,
  LayoutGrid, FileText, CreditCard, User,
} from 'lucide-react'
import { DecorativeCircle } from '@/components/decorative-shapes'

// The app's own palette (midrus_app/lib/core/theme.dart) — this mockup is
// coded UI, not a screenshot, so it needs the app's real colours rather than
// the website's own accent to actually look like the app.
const APP = {
  bg: '#F6F5FC',
  ink: '#1A1533',
  inkMuted: '#5B5478',
  inkFaint: '#6A648C',
  primary: '#5B4FE9',
  border: '#E3DEF7',
  lavenderBg: '#E6E1FB', lavenderInk: '#5B4FE9',
  mintBg: '#D9F2E6', mintInk: '#1E7F49',
  skyBg: '#DCEAFB', skyInk: '#2C5FD6',
  peachBg: '#FBE3D6', peachInk: '#B25A1E',
}

function StatTile({
  icon: Icon, value, label, bg, ink,
}: {
  icon: typeof ListChecks
  value: string
  label: string
  bg: string
  ink: string
}) {
  return (
    <div className="rounded-xl p-2.5" style={{ backgroundColor: bg }}>
      <div className="w-6 h-6 rounded-full bg-white/70 flex items-center justify-center mb-2">
        <Icon className="w-3.5 h-3.5" style={{ color: ink }} />
      </div>
      <p className="text-base font-extrabold leading-none" style={{ color: APP.ink }}>{value}</p>
      <p className="text-[9px] mt-1" style={{ color: APP.inkMuted }}>{label}</p>
    </div>
  )
}

function NavItem({ icon: Icon, label, active }: { icon: typeof LayoutGrid; label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <Icon className="w-4 h-4" style={{ color: active ? APP.primary : APP.inkFaint }} />
      <span
        className="text-[8px] font-semibold"
        style={{ color: active ? APP.primary : APP.inkFaint }}
      >
        {label}
      </span>
    </div>
  )
}

/**
 * The hero's right-side visual: a phone frame showing a coded recreation of
 * the MIDRUS mobile app's dashboard home screen (see midrus_app/lib/screens/
 * dashboard/dashboard_home_screen.dart and core/theme.dart for the source of
 * truth this mirrors) — real product UI, built with real code rather than an
 * embedded screenshot, so it stays crisp and never carries a real customer's
 * name or data. Purely illustrative to the page itself, so the caller
 * (components/hero.tsx) marks the wrapping element aria-hidden.
 */
export default function PhoneMockup() {
  return (
    <div className="relative flex justify-center">
      <DecorativeCircle size="xl" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Phone body */}
      <div className="relative w-[260px] sm:w-[300px] bg-foreground rounded-[3rem] p-3 shadow-2xl animate-float">
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-foreground/70 rounded-l-sm" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-foreground/70 rounded-l-sm" />
        <div className="absolute -right-[3px] top-28 w-[3px] h-16 bg-foreground/70 rounded-r-sm" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.25rem] aspect-[9/19.5]">
          <div
            className="absolute inset-0 flex flex-col px-4 pt-9 pb-3"
            style={{ backgroundColor: APP.bg }}
          >
            {/* App header */}
            <div className="flex items-center justify-between mb-4">
              <Image src="/logo.png" alt="" width={22} height={22} className="object-contain" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <Bell className="w-3 h-3" style={{ color: APP.ink }} />
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: APP.primary }}
                >
                  J
                </div>
              </div>
            </div>

            {/* Greeting */}
            <p className="text-[10px]" style={{ color: APP.inkFaint }}>Good morning</p>
            <p className="text-lg font-extrabold mb-3" style={{ color: APP.ink }}>Janmejaya</p>

            {/* Attention banner */}
            <div
              className="flex items-center gap-2.5 rounded-2xl p-2.5 mb-3"
              style={{ backgroundColor: APP.mintBg }}
            >
              <div className="w-7 h-7 rounded-full bg-white/75 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" style={{ color: APP.mintInk }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold truncate" style={{ color: APP.ink }}>All filings up to date</p>
                <p className="text-[8px]" style={{ color: APP.inkMuted }}>You&apos;re in good shape.</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: APP.ink }} />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <StatTile icon={ListChecks} value="12" label="Total services" bg={APP.lavenderBg} ink={APP.lavenderInk} />
              <StatTile icon={CheckCircle2} value="10" label="Active" bg={APP.mintBg} ink={APP.mintInk} />
              <StatTile icon={Receipt} value="28" label="Invoices" bg={APP.skyBg} ink={APP.skyInk} />
              <StatTile icon={Clock} value="0" label="Pending" bg={APP.peachBg} ink={APP.peachInk} />
            </div>

            {/* Recent filings */}
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-extrabold" style={{ color: APP.ink }}>Recent filings</p>
              <p className="text-[9px] font-bold" style={{ color: APP.primary }}>View all &rarr;</p>
            </div>

            <div className="flex-1" />

            {/* Bottom nav — a floating "glass" pill, not a flush bar, per
                midrus_app/lib/widgets/floating_nav_bar.dart */}
            <div
              className="flex items-center justify-around rounded-2xl py-2 backdrop-blur-sm border"
              style={{
                backgroundColor: 'rgba(255,255,255,0.88)',
                borderColor: 'rgba(227,222,247,0.5)',
                boxShadow: '0 8px 20px rgba(26,21,51,0.12)',
              }}
            >
              <NavItem icon={LayoutGrid} label="Home" active />
              <NavItem icon={FileText} label="Services" />
              <NavItem icon={CreditCard} label="Pay" />
              <NavItem icon={User} label="Profile" />
            </div>
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-full z-10" />
      </div>
    </div>
  )
}
