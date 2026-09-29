'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Bell, CheckCheck, Loader2 } from 'lucide-react'
import {
  apiGetNotifications, apiMarkAllNotificationsRead, apiMarkNotificationRead, apiUnreadCount,
} from '@/lib/api'
import { AppNotification, kindRoute, timeAgo, toNotificationPage } from '@/lib/notifications'

const POLL_MS = 60_000

export default function NotificationBell() {
  const [unread, setUnread] = useState(0)
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<AppNotification[]>([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const refreshCount = useCallback(() => {
    apiUnreadCount().then((j) => setUnread(Number(j.unread_count ?? 0))).catch(() => {})
  }, [])

  useEffect(() => {
    refreshCount()
    const timer = setInterval(refreshCount, POLL_MS)
    return () => clearInterval(timer)
  }, [refreshCount])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const openPanel = async () => {
    const next = !open
    setOpen(next)
    if (next && !loaded) {
      setLoading(true)
      try {
        const page = toNotificationPage(await apiGetNotifications(0))
        setItems(page.items)
        setUnread(page.unread)
      } catch {
        // keep the panel open with whatever we had; the bell badge is the important part
      } finally {
        setLoading(false)
        setLoaded(true)
      }
    }
  }

  const markRead = (n: AppNotification) => {
    if (n.isRead) return
    setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, isRead: true } : x)))
    setUnread((c) => Math.max(0, c - 1))
    apiMarkNotificationRead(n.id).catch(() => {})
  }

  const markAllRead = async () => {
    const before = items
    const beforeUnread = unread
    setItems((prev) => prev.map((x) => ({ ...x, isRead: true })))
    setUnread(0)
    try {
      await apiMarkAllNotificationsRead()
    } catch {
      setItems(before)
      setUnread(beforeUnread)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={openPanel}
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
        aria-expanded={open}
        className="relative flex items-center justify-center w-10 h-10 bg-surface-2 border border-border rounded-lg hover:border-border-strong hover:bg-surface-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        <Bell className="w-4 h-4 text-foreground" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-error rounded-full">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-80 max-h-[26rem] overflow-y-auto bg-surface-1 border border-border rounded-xl shadow-lg shadow-foreground/5 overflow-hidden animate-dropdownSlide z-50"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-2/50 sticky top-0">
            <p className="text-sm font-semibold text-foreground">Notifications</p>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs font-semibold text-link hover:underline"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-5 h-5 animate-spin text-foreground-muted" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-sm text-foreground-muted text-center py-10 px-4">No notifications yet.</p>
          ) : (
            <div>
              {items.map((n) => (
                <Link
                  key={n.id}
                  href={kindRoute(n.kind)}
                  onClick={() => { markRead(n); setOpen(false) }}
                  className={`block px-4 py-3 border-b border-border last:border-0 hover:bg-surface-2 transition-colors ${!n.isRead ? 'bg-accent-muted/40' : ''}`}
                >
                  <div className="flex items-start gap-2">
                    {!n.isRead && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                    <div className={`flex-1 min-w-0 ${n.isRead ? 'pl-3.5' : ''}`}>
                      <p className="text-sm font-semibold text-foreground truncate">{n.title}</p>
                      {n.body && <p className="text-xs text-foreground-secondary mt-0.5 line-clamp-2">{n.body}</p>}
                      <p className="text-[11px] text-foreground-muted mt-1">{timeAgo(n.createdAt)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
