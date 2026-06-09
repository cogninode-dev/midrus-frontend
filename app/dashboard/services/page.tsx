'use client'

import { useState, useMemo, useEffect } from 'react'
import { ChevronDown, Upload, FileText, X, Lightbulb, Filter, Loader2, Plus, Clock, Send, Download, ShieldAlert } from 'lucide-react'
import { apiGetServices, apiAddInvoice, apiDeleteInvoice, apiRequestService } from '@/lib/api'
import { useAuth } from '@/app/auth-context'

interface Invoice { id: number; file_name: string; file_url: string | null; uploaded_at: string }
interface Service {
  id: number
  name: string
  charge: string
  description: string
  invoices: Invoice[]
  status: 'Active' | 'Inactive' | 'Pending' | 'Requested'
  due_date: string
}

type FilterType = 'All' | 'Active' | 'Pending' | 'Requested' | 'Inactive'

export default function ServicesPage() {
  const { user } = useAuth()
  const isApproved = user?.is_approved ?? false
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState<{ serviceId: number; invoiceId: number; name: string } | null>(null)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestForm, setRequestForm] = useState({ name: '', description: '' })
  const [submittingRequest, setSubmittingRequest] = useState(false)
  const [requestSuccess, setRequestSuccess] = useState(false)
  const [requestError, setRequestError] = useState('')

  useEffect(() => {
    apiGetServices()
      .then(setServices)
      .catch(() => {})
      .finally(() => setLoadingServices(false))
  }, [])

  const handleServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittingRequest(true)
    setRequestError('')
    try {
      await apiRequestService(requestForm.name, requestForm.description)
      setRequestSuccess(true)
      setRequestForm({ name: '', description: '' })
      // Refresh services list
      const updated = await apiGetServices()
      setServices(updated)
      setTimeout(() => {
        setShowRequestForm(false)
        setRequestSuccess(false)
      }, 2000)
    } catch (err) {
      setRequestError(err instanceof Error ? err.message : 'Failed to submit request.')
    } finally {
      setSubmittingRequest(false)
    }
  }

  const [uploadingServiceId, setUploadingServiceId] = useState<number | null>(null)
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')

  const filters: FilterType[] = ['All', 'Active', 'Pending', 'Requested', 'Inactive']

  const filteredServices = useMemo(() => {
    if (activeFilter === 'All') return services
    return services.filter((s) => s.status === activeFilter)
  }, [services, activeFilter])

  const filterCounts = useMemo(() => ({
    All:       services.length,
    Active:    services.filter((s) => s.status === 'Active').length,
    Pending:   services.filter((s) => s.status === 'Pending').length,
    Requested: services.filter((s) => s.status === 'Requested').length,
    Inactive:  services.filter((s) => s.status === 'Inactive').length,
  }), [services])

  const statusColors: Record<string, string> = {
    Active:    'bg-success-bg text-success',
    Inactive:  'bg-error-bg text-error',
    Pending:   'bg-warning-bg text-warning',
    Requested: 'bg-info-bg text-info',
  }

  const handleFileUpload = async (serviceId: number, files: FileList | null) => {
    if (!files) return
    for (const file of Array.from(files)) {
      try {
        const invoice = await apiAddInvoice(serviceId, file)
        setServices((prev) =>
          prev.map((s) => s.id === serviceId ? { ...s, invoices: [...s.invoices, invoice] } : s)
        )
      } catch {}
    }
    setUploadingServiceId(null)
  }

  const removeInvoice = async (serviceId: number, invoiceId: number) => {
    try {
      await apiDeleteInvoice(serviceId, invoiceId)
      setServices((prev) =>
        prev.map((s) => s.id === serviceId
          ? { ...s, invoices: s.invoices.filter((inv) => inv.id !== invoiceId) }
          : s
        )
      )
    } catch {}
  }

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Services</h1>
          <p className="text-foreground-secondary">Manage your services and upload invoices</p>
        </div>
        {isApproved ? (
          <button
            onClick={() => { setShowRequestForm(true); setRequestError(''); setRequestSuccess(false) }}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-foreground font-semibold rounded-xl hover:bg-accent-hover active:scale-95 transition-all duration-200 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Request a Service
          </button>
        ) : (
          <span className="flex items-center gap-2 px-5 py-2.5 bg-surface-2 text-foreground-muted font-semibold rounded-xl border border-border cursor-not-allowed text-sm">
            <Plus className="w-4 h-4" />
            Request a Service
          </span>
        )}
      </div>

      {/* Pending Approval Banner */}
      {!isApproved && (
        <div className="flex items-start gap-4 p-5 bg-warning-bg border border-warning/30 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Account Pending Approval</p>
            <p className="text-sm text-foreground-secondary mt-1">
              Your account is under review. Once our team approves it, you'll be able to request services.
              You'll receive an email notification when approved.
            </p>
          </div>
        </div>
      )}

      {/* Request Service Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/20 backdrop-blur-sm animate-fadeInUp">
          <div className="bg-surface-1 border border-border rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Request a Service</h2>
                <p className="text-sm text-foreground-muted mt-1">Admin will review and set the pricing</p>
              </div>
              <button onClick={() => setShowRequestForm(false)} className="p-2 hover:bg-surface-2 rounded-lg transition-colors">
                <X className="w-5 h-5 text-foreground-muted" />
              </button>
            </div>

            {requestSuccess ? (
              <div className="flex flex-col items-center py-6 gap-3 animate-scaleIn">
                <div className="w-14 h-14 bg-success-bg rounded-full flex items-center justify-center">
                  <Send className="w-7 h-7 text-success" />
                </div>
                <p className="font-semibold text-foreground">Request submitted!</p>
                <p className="text-sm text-foreground-muted text-center">Our team will review it and get back to you with pricing.</p>
              </div>
            ) : (
              <form onSubmit={handleServiceRequest} method="POST" className="space-y-4">
                {requestError && (
                  <div className="p-3 bg-error-bg border border-error/20 rounded-lg text-error text-sm">{requestError}</div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Service Name <span className="text-error">*</span></label>
                  <input
                    type="text"
                    value={requestForm.name}
                    onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                    placeholder="e.g. GST Filing, Company Registration"
                    required
                    className="w-full px-4 py-3 border border-border-strong rounded-lg bg-surface-1 text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                  <textarea
                    value={requestForm.description}
                    onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })}
                    placeholder="Tell us more about what you need..."
                    rows={3}
                    className="w-full px-4 py-3 border border-border-strong rounded-lg bg-surface-1 text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submittingRequest || !requestForm.name.trim()}
                    className="flex-1 py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover disabled:bg-surface-3 disabled:text-foreground-muted disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {submittingRequest ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting…</> : <><Send className="w-4 h-4" />Submit Request</>}
                  </button>
                  <button type="button" onClick={() => setShowRequestForm(false)} className="px-5 py-3 bg-surface-2 text-foreground font-semibold rounded-lg border border-border hover:bg-surface-3 transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {loadingServices ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-link animate-spin" />
        </div>
      ) : (
        <>
          {/* Filter Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-foreground-muted mr-1" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-accent text-foreground shadow-sm'
                    : 'bg-surface-1 text-foreground-secondary hover:bg-surface-2 border border-border'
                }`}
              >
                {filter}
                <span className={`ml-1.5 text-xs ${activeFilter === filter ? 'text-foreground/70' : 'text-foreground-muted'}`}>
                  ({filterCounts[filter]})
                </span>
              </button>
            ))}
          </div>

          {/* Services List */}
          <div className="space-y-4">
            {filteredServices.length === 0 ? (
              <div className="text-center py-16 bg-surface-1 border border-border rounded-2xl">
                <Filter className="w-10 h-10 text-foreground-muted/30 mx-auto mb-3" />
                <p className="text-foreground-secondary font-medium">No {activeFilter.toLowerCase()} services found</p>
                <p className="text-xs text-foreground-muted mt-1">Try selecting a different filter</p>
              </div>
            ) : (
              filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-surface-1 border border-border rounded-2xl overflow-hidden hover:border-border-strong hover:shadow-md transition-all duration-200"
            >
              {/* Expanded indicator bar */}
              {expandedServiceId === service.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-l-full" />
              )}

              {/* Service Header - FULL ROW is clickable */}
              <button
                onClick={() =>
                  setExpandedServiceId(
                    expandedServiceId === service.id ? null : service.id
                  )
                }
                className="w-full p-6 text-left hover:bg-surface-2/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-link transition-colors">
                        {service.name}
                      </h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[service.status]}`}>
                        {service.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground-secondary mb-2">{service.description}</p>
                    <p className="text-xs text-foreground-muted">Due: {service.due_date || 'N/A'}</p>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-2xl font-bold text-foreground">
                      {service.charge || <span className="text-sm font-medium text-foreground-muted italic">Pricing pending</span>}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-foreground-muted">
                        {service.invoices.length} invoice{service.invoices.length !== 1 ? 's' : ''}
                      </p>
                      <ChevronDown
                        className={`w-5 h-5 text-foreground-muted transition-transform duration-300 ${
                          expandedServiceId === service.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    {/* Inline CTA for 0-invoice services */}
                    {service.invoices.length === 0 && expandedServiceId !== service.id && (
                      <span className="text-xs text-link font-semibold flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="w-3 h-3" />
                        Upload first invoice
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedServiceId === service.id && (
                <div className="border-t border-border p-6 bg-surface-2/30 space-y-6 animate-expandDown">
                  {service.status === 'Requested' && (
                    <div className="flex items-start gap-3 p-4 bg-info-bg border border-info/20 rounded-xl">
                      <Clock className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Awaiting Admin Review</p>
                        <p className="text-xs text-foreground-muted mt-1">Your service request has been submitted. Our team will review it and set the pricing shortly.</p>
                      </div>
                    </div>
                  )}
                  {/* Invoice Upload Section — only for non-requested services */}
                  {service.status !== 'Requested' && (
                    <>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <FileText className="w-4 h-4 text-link" />
                          Invoice Documents
                        </h4>
                        {uploadingServiceId === service.id ? (
                          <div className="relative bg-accent-muted border-2 border-dashed border-accent/40 rounded-2xl p-12 text-center hover:border-accent/60 hover:bg-accent-subtle transition-all duration-200 group cursor-pointer">
                            <input
                              type="file"
                              multiple
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileUpload(service.id, e.target.files)}
                              className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                              autoFocus
                            />
                            <div className="pointer-events-none">
                              <Upload className="w-14 h-14 text-link mx-auto mb-3 group-hover:scale-110 transition-transform" />
                              <p className="text-sm font-semibold text-foreground mb-1">Drop PDFs here or click to browse</p>
                              <p className="text-xs text-foreground-secondary">Upload multiple PDF invoices at once</p>
                              <p className="text-xs text-foreground-muted mt-2">Supports: PDF, DOC, DOCX, JPG, PNG</p>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); setUploadingServiceId(service.id) }}
                            className="w-full bg-surface-1 border-2 border-dashed border-border-strong rounded-2xl p-8 text-center hover:border-accent/40 hover:bg-accent-muted transition-all duration-200 group/upload focus:outline-none focus:ring-2 focus:ring-accent/40 active:scale-[0.98]"
                          >
                            <Upload className="w-10 h-10 text-foreground-muted mx-auto mb-3 group-hover/upload:text-link transition-all" />
                            <p className="text-sm font-semibold text-foreground group-hover/upload:text-link transition-colors">Upload Invoice PDFs</p>
                            <p className="text-xs text-foreground-muted mt-2">Click to select multiple files or drag and drop</p>
                          </button>
                        )}
                      </div>

                      {service.invoices.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground text-sm">Uploaded Files ({service.invoices.length})</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.invoices.map((invoice) => (
                              <div key={invoice.id} className="flex flex-col gap-3 p-4 bg-surface-1 border border-border rounded-xl hover:border-border-strong hover:shadow-sm transition-all duration-200">
                                {/* File name row */}
                                <div className="flex items-center gap-2 min-w-0">
                                  <FileText className="w-5 h-5 text-link flex-shrink-0" />
                                  <span className="text-sm font-medium text-foreground truncate flex-1">{invoice.file_name}</span>
                                  <button
                                    onClick={() => setConfirmDelete({ serviceId: service.id, invoiceId: invoice.id, name: invoice.file_name })}
                                    className="p-1 text-foreground-muted hover:text-error rounded transition-colors flex-shrink-0"
                                    aria-label={`Remove ${invoice.file_name}`}
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>

                                {/* Action buttons row */}
                                {invoice.file_url ? (
                                  <div className="flex items-center gap-2">
                                    <a
                                      href={invoice.file_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-foreground bg-surface-2 border border-border rounded-lg hover:bg-surface-3 hover:border-border-strong transition-all duration-200"
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                      View
                                    </a>
                                    <a
                                      href={invoice.file_url}
                                      download={invoice.file_name}
                                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-foreground bg-accent border border-accent/40 rounded-lg hover:bg-accent-hover transition-all duration-200"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                      Download
                                    </a>
                                  </div>
                                ) : (
                                  <p className="text-xs text-foreground-muted italic">No file attached</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ))
            )}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/20 backdrop-blur-sm animate-fadeInUp">
          <div className="bg-surface-1 border border-border rounded-2xl shadow-xl w-full max-w-sm p-7 space-y-5 animate-scaleIn">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-surface-2 border border-border rounded-full flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-foreground-muted" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Remove Invoice?</h3>
                <p className="text-sm text-foreground-muted mt-1">
                  Are you sure you want to remove <span className="font-semibold text-foreground break-all">"{confirmDelete.name}"</span>? This cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={async () => {
                  await removeInvoice(confirmDelete.serviceId, confirmDelete.invoiceId)
                  setConfirmDelete(null)
                }}
                className="flex-1 py-2.5 bg-foreground text-surface-1 font-semibold rounded-lg hover:bg-foreground/90 active:scale-95 transition-all duration-200 text-sm"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover active:scale-95 transition-all duration-200 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-accent-muted border border-accent-subtle rounded-2xl p-6 hover:bg-accent-subtle transition-all duration-200 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-link flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          <span className="font-semibold">Tip:</span> Upload invoices and documents to keep everything organized. Your admin panel will review and manage these from the backend.
        </p>
      </div>
    </div>
  )
}
