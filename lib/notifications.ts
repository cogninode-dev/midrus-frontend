// Mirrors midrus_app/lib/models/app_notification.dart — keep the route
// mapping in sync with the mobile app's NotificationKind.route getter.

export type NotificationKind = 'invoice' | 'payment' | 'service' | 'document' | 'account'

export interface AppNotification {
  id: number
  kind: NotificationKind
  title: string
  body: string
  refId: number | null
  isRead: boolean
  createdAt: string | null
}

export interface NotificationPage {
  items: AppNotification[]
  total: number
  unread: number
  nextOffset: number | null
}

/** Unknown kinds (a newer backend) are shown as account notices. */
export function parseKind(raw: unknown): NotificationKind {
  const kinds: NotificationKind[] = ['invoice', 'payment', 'service', 'document', 'account']
  return kinds.includes(raw as NotificationKind) ? (raw as NotificationKind) : 'account'
}

/** The customer screen that shows what changed. */
export function kindRoute(kind: NotificationKind): string {
  switch (kind) {
    case 'invoice':
    case 'payment':
      return '/dashboard/payment'
    case 'service':
    case 'document':
      return '/dashboard/services'
    default:
      return '/dashboard'
  }
}

export function toNotification(j: Record<string, unknown>): AppNotification {
  return {
    id: Number(j.id ?? 0),
    kind: parseKind(j.kind),
    title: String(j.title ?? ''),
    body: String(j.body ?? ''),
    refId: j.ref_id == null ? null : Number(j.ref_id),
    isRead: j.is_read === true,
    createdAt: j.created_at ? String(j.created_at) : null,
  }
}

export function toNotificationPage(j: Record<string, unknown>): NotificationPage {
  const results = (j.results as Record<string, unknown>[] | undefined) ?? []
  return {
    items: results.map(toNotification),
    total: Number(j.count ?? 0),
    unread: Number(j.unread_count ?? 0),
    nextOffset: j.next_offset == null ? null : Number(j.next_offset),
  }
}

/** "5 min ago", "3 h ago", "Yesterday", then "12 Sep" — mirrors the app's timeAgo(). */
export function timeAgo(iso: string | null): string {
  if (!iso) return ''
  const when = new Date(iso)
  const diffMs = Date.now() - when.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin} min ago`
  const diffHours = Math.floor(diffMin / 60)
  const today = new Date()
  const sameDay = when.toDateString() === today.toDateString()
  if (sameDay) return `${diffHours} h ago`
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  if (when.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return when.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}
