'use client'

import { useAuth } from '@/app/auth-context'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ClipboardList, CheckCircle, FileText, Clock, Plus, Upload, UserCog, TrendingUp } from 'lucide-react'
import { apiDashboardStats, apiGetServices } from '@/lib/api'

interface StatsData { total_services: number; active_services: number; pending_services: number; total_invoices: number }
interface ServiceItem { id: number; name: string; status: string; charge: string; due_date: string; invoices: { id: number }[] }

export default function DashboardPage() {
  const { user } = useAuth()
  const [statsData, setStatsData]     = useState<StatsData | null>(null)
  const [recentServices, setRecentServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    apiDashboardStats().then(setStatsData).catch(() => {})
    apiGetServices().then((s) => setRecentServices(s.slice(0, 3))).catch(() => {})
  }, [])

  const stats = [
    { label: 'Total Services',  value: statsData?.total_services  ?? '—', icon: ClipboardList, trend: 'All time',       trendUp: true },
    { label: 'Active Services', value: statsData?.active_services  ?? '—', icon: CheckCircle,  trend: 'Currently active', trendUp: true },
    { label: 'Total Invoices',  value: statsData?.total_invoices   ?? '—', icon: FileText,      trend: 'Uploaded',        trendUp: true },
    { label: 'Pending',         value: statsData?.pending_services ?? '—', icon: Clock,         trend: 'Awaiting action', trendUp: false },
  ]

  const statusColors: Record<string, string> = {
    'Active':    'bg-success-bg text-success',
    'Pending':   'bg-warning-bg text-warning',
    'Inactive':  'bg-error-bg text-error',
    'Requested': 'bg-info-bg text-info',
  }

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome back, <span className="text-link">{user?.name}</span>
        </h1>
        <p className="text-foreground-secondary">Here&apos;s your business overview at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className="group bg-surface-1 border border-border rounded-2xl p-6 hover:border-border-strong hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-accent-muted rounded-2xl flex items-center justify-center group-hover:bg-accent-subtle transition-colors">
                  <Icon className="w-6 h-6 text-link" />
                </div>
                <div className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center">
                  <TrendingUp className={`w-5 h-5 ${stat.trendUp ? 'text-success' : 'text-warning'}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-foreground-secondary">{stat.label}</p>
              <p className={`text-xs mt-2 font-medium ${stat.trendUp ? 'text-success' : 'text-warning'}`}>{stat.trend}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Services */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Recent Services</h2>
          <Link
            href="/dashboard/services"
            className="text-link text-sm font-semibold hover:text-link-hover hover:underline transition-all group flex items-center gap-1"
          >
            View all <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        <div className="space-y-3">
          {recentServices.length === 0 ? (
            <div className="text-center py-12 bg-surface-1 border border-border rounded-2xl space-y-2">
              <p className="text-foreground-secondary text-sm font-medium">No services yet</p>
              <p className="text-xs text-foreground-muted">Go to Services to request a new service</p>
            </div>
          ) : recentServices.map((service) => (
            <div
              key={service.id}
              className="group bg-surface-1 border border-border rounded-2xl p-5 hover:border-border-strong hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-link transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-foreground-muted mt-1">Due: {service.due_date || 'N/A'}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{service.charge || <span className="text-xs font-medium text-foreground-muted italic">Pricing pending</span>}</p>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full mt-1 inline-block ${statusColors[service.status] || 'bg-surface-2 text-foreground'}`}>
                    {service.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/services"
            className="group bg-surface-1 border border-border rounded-2xl p-8 text-center hover:border-border-strong hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-14 h-14 mx-auto mb-4 bg-accent-muted rounded-2xl flex items-center justify-center group-hover:bg-accent-subtle group-hover:scale-105 transition-all">
              <Plus className="w-7 h-7 text-link" />
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-link transition-colors text-lg">
              Request Service
            </h3>
            <p className="text-xs text-foreground-muted mt-2">Submit a new service request</p>
          </Link>

          <Link
            href="/dashboard/services"
            className="group bg-surface-1 border border-border rounded-2xl p-8 text-center hover:border-border-strong hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-14 h-14 mx-auto mb-4 bg-accent-muted rounded-2xl flex items-center justify-center group-hover:bg-accent-subtle group-hover:scale-105 transition-all">
              <Upload className="w-7 h-7 text-link" />
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-link transition-colors text-lg">
              Upload Invoice
            </h3>
            <p className="text-xs text-foreground-muted mt-2">Add invoice documents</p>
          </Link>

          <Link
            href="/dashboard/profile"
            className="group bg-surface-1 border border-border rounded-2xl p-8 text-center hover:border-border-strong hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-14 h-14 mx-auto mb-4 bg-accent-muted rounded-2xl flex items-center justify-center group-hover:bg-accent-subtle group-hover:scale-105 transition-all">
              <UserCog className="w-7 h-7 text-link" />
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-link transition-colors text-lg">
              Edit Profile
            </h3>
            <p className="text-xs text-foreground-muted mt-2">Update your information</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
