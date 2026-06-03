'use client'

import { useAuth } from '@/app/auth-context'
import { useState, useEffect } from 'react'
import { Camera, Save, X, Lock, Eye, EyeOff, FileEdit, CheckCircle, CreditCard, Calendar, Loader2, Pencil, Upload as UploadIcon, FileText, ShieldCheck } from 'lucide-react'
import { apiUpdateProfile, apiChangePassword } from '@/lib/api'

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileError, setProfileError] = useState('')
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [passwordData, setPasswordData] = useState({ current: '', new: '' })
  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: user?.phone || '',
    address: user?.address || '',
    website: user?.website || '',
    tax_id: user?.tax_id || '',
    gst_number: user?.gst_number || '',
  })

  // Sync form when user loads from API after mount
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        company: user.company || '',
        phone: user.phone || '',
        address: user.address || '',
        website: user.website || '',
        tax_id: user.tax_id || '',
        gst_number: user.gst_number || '',
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!formData.name.trim()) { setProfileError('Full name is required.'); return }
    setSavingProfile(true)
    setProfileError('')
    const website = formData.website.trim()
      ? formData.website.startsWith('http') ? formData.website : `https://${formData.website}`
      : ''
    try {
      const updated = await apiUpdateProfile({
        name: formData.name,
        phone: formData.phone,
        company: formData.company,
        address: formData.address,
        website,
        tax_id: formData.tax_id,
        gst_number: formData.gst_number,
      })
      setUser(updated)
      setIsEditing(false)
    } catch (err: unknown) {
      setProfileError(err instanceof Error ? err.message : 'Failed to save.')
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePasswordChange = async () => {
    setPasswordError('')
    setSavingPassword(true)
    try {
      await apiChangePassword(passwordData.current, passwordData.new)
      setSavingPassword(false)
      setPasswordSuccess(true)
      setPasswordData({ current: '', new: '' })
      setTimeout(() => {
        setShowChangePassword(false)
        setPasswordSuccess(false)
      }, 2000)
    } catch (err: unknown) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to change password.')
      setSavingPassword(false)
    }
  }

  const inputClass = (editing: boolean) =>
    `w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
      editing
        ? 'border-border-strong bg-surface-1 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent'
        : 'border-border bg-surface-2 text-foreground cursor-default'
    }`

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Profile</h1>
          <p className="text-foreground-secondary">Manage your account information</p>
        </div>
        <button
          onClick={() => { setIsEditing(!isEditing); setProfileError('') }}
          className={`px-6 py-2.5 font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${
            isEditing
              ? 'bg-surface-1 text-foreground border border-border hover:bg-surface-2'
              : 'bg-accent text-foreground hover:bg-accent-hover active:bg-accent-active shadow-sm'
          }`}
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Profile Avatar & Basic Info */}
      <div className="bg-surface-1 border border-border rounded-2xl p-8 hover:border-border-strong transition-all duration-200 hover:shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative group/avatar cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-5xl font-bold text-foreground shadow-lg shadow-accent/20">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-foreground/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent rounded-full flex items-center justify-center border-2 border-surface-1 shadow-sm">
              <Camera className="w-3.5 h-3.5 text-foreground" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground mb-2">{formData.name}</h2>
            <p className="text-foreground-secondary mb-1">{formData.email}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-muted bg-surface-2 px-3 py-1 rounded-full border border-border">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              {formData.company || 'No company set'}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-surface-1 border border-border rounded-2xl p-8 hover:border-border-strong transition-all duration-200 hover:shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-link" />
              Personal Information
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                <input type="email" name="email" value={formData.email} disabled className={inputClass(false)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Company Name</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Website</label>
                <input type="url" name="website" value={formData.website} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
            </div>
          </div>

          {/* Tax & Compliance Information */}
          <div className="bg-surface-1 border border-border rounded-2xl p-8 hover:border-border-strong transition-all duration-200 hover:shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-link" />
              Tax & Compliance
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Tax ID / PAN</label>
                <input type="text" name="tax_id" value={formData.tax_id} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">GST Registration Number</label>
                <input type="text" name="gst_number" value={formData.gst_number} onChange={handleChange} disabled={!isEditing} className={inputClass(isEditing)} />
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="bg-surface-1 border border-border rounded-2xl p-8 hover:border-border-strong transition-all duration-200 hover:shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Lock className="w-5 h-5 text-link" />
                Security
              </h3>
              {!showChangePassword && (
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="px-4 py-2 bg-surface-2 border border-border text-foreground text-sm font-semibold rounded-lg hover:bg-surface-3 hover:border-border-strong transition-all"
                >
                  Change Password
                </button>
              )}
            </div>

            {showChangePassword ? (
              <div className="space-y-4 animate-expandDown">
                {passwordSuccess ? (
                  <div className="flex items-center gap-2 p-4 bg-success-bg border border-success/20 rounded-lg text-success animate-scaleIn">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Password changed successfully!</span>
                  </div>
                ) : (
                  <>
                    {passwordError && (
                      <div className="p-3 bg-error-bg border border-error/20 rounded-lg text-error text-sm">
                        {passwordError}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPw ? 'text' : 'password'}
                          value={passwordData.current}
                          onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                          className="w-full px-4 py-3 pr-12 rounded-lg border border-border-strong bg-surface-1 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPw(!showCurrentPw)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                        >
                          {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPw ? 'text' : 'password'}
                          value={passwordData.new}
                          onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                          className="w-full px-4 py-3 pr-12 rounded-lg border border-border-strong bg-surface-1 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPw(!showNewPw)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                        >
                          {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handlePasswordChange}
                        disabled={savingPassword || !passwordData.current || !passwordData.new}
                        className="flex-1 py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover active:bg-accent-active disabled:bg-surface-3 disabled:text-foreground-muted disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        {savingPassword ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving…
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Update Password
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setShowChangePassword(false)
                          setPasswordData({ current: '', new: '' })
                          setPasswordError('')
                        }}
                        className="px-6 py-3 bg-surface-2 text-foreground font-semibold rounded-lg border border-border hover:bg-surface-3 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-foreground-muted">Use a strong password to keep your account secure.</p>
            )}
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="space-y-3 animate-scaleIn">
              {profileError && (
                <div className="p-3 bg-error-bg border border-error/20 rounded-lg text-error text-sm">
                  {profileError}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={savingProfile}
                  className="flex-1 py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent-hover active:bg-accent-active disabled:bg-surface-3 disabled:text-foreground-muted disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
                >
                  {savingProfile ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={() => { setIsEditing(false); setProfileError('') }}
                  className="flex-1 py-3 bg-surface-1 text-foreground font-semibold rounded-lg border border-border hover:bg-surface-2 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface-1 border border-border rounded-2xl p-8 hover:border-border-strong transition-all duration-200 hover:shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-link" />
              Account Status
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-success-bg/50 border border-success/10 rounded-lg">
                <span className="text-sm text-foreground flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Verification
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-success-bg text-success">Verified</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-info-bg/50 border border-info/10 rounded-lg">
                <span className="text-sm text-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-info" />
                  Subscription
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-info-bg text-info">Active</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-2 border border-border rounded-lg">
                <span className="text-sm text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-foreground-muted" />
                  Member Since
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-3 text-foreground-secondary">2024</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-1 border border-border rounded-2xl p-8 hover:border-border-strong transition-all duration-200 hover:shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
                  <Pencil className="w-4 h-4 text-link" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-foreground text-sm">Profile updated</span>
                  <p className="text-xs text-foreground-muted">Recently</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
                  <UploadIcon className="w-4 h-4 text-link" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-foreground text-sm">Invoice uploaded</span>
                  <p className="text-xs text-foreground-muted">Recently</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success-bg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-foreground text-sm">Service completed</span>
                  <p className="text-xs text-foreground-muted">Recently</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
