const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/auth`

function getAccessToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
}

function getRefreshToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null
}

function saveTokens(access: string, refresh: string) {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
}

function clearTokens() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken()
  if (!refresh) return null
  try {
    const res = await fetch(`${BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    })
    if (!res.ok) { clearTokens(); return null }
    const data = await res.json()
    localStorage.setItem('access_token', data.access)
    return data.access
  } catch {
    return null
  }
}

async function request(path: string, options: RequestInit = {}) {
  let token = getAccessToken()

  const makeRequest = async (t: string | null) => {
    return fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(t ? { Authorization: `Bearer ${t}` } : {}),
        ...(options.headers || {}),
      },
    })
  }

  let res = await makeRequest(token)

  if (res.status === 401) {
    token = await refreshAccessToken()
    if (!token) throw new Error('Session expired. Please log in again.')
    res = await makeRequest(token)
  }

  return res
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.non_field_errors?.[0] || 'Login failed.')
  saveTokens(data.tokens.access, data.tokens.refresh)
  return data.user
}

export async function apiRegister(email: string, password: string, name: string) {
  const res = await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  })
  const data = await res.json()
  if (!res.ok) {
    const msg = data.email?.[0] || data.password?.[0] || data.non_field_errors?.[0] || data.error || 'Signup failed.'
    throw new Error(msg)
  }
  return data  // { otp_required: true }
}

export async function apiVerifyEmail(email: string, otp: string) {
  const res = await fetch(`${BASE_URL}/verify-email/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  })
  const data = await res.json()
  if (!res.ok) {
    const msg = data.non_field_errors?.[0] || data.otp?.[0] || 'Verification failed.'
    throw new Error(msg)
  }
  return data  // { pending: true }
}

export async function apiResendOtp(email: string) {
  const res = await fetch(`${BASE_URL}/resend-otp/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to resend OTP.')
  return data
}

export async function apiLogout() {
  const refresh = getRefreshToken()
  try {
    await request('/logout/', { method: 'POST', body: JSON.stringify({ refresh }) })
  } catch {}
  clearTokens()
}

export async function apiGetMe() {
  const res = await request('/me/')
  if (!res.ok) throw new Error('Not authenticated.')
  return res.json()
}

export async function apiUpdateProfile(data: Record<string, string>) {
  const res = await request('/profile/update/', {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) {
    const first = Object.entries(json)[0]
    const msg = first ? `${first[0]}: ${(first[1] as string[])[0]}` : 'Update failed.'
    throw new Error(msg)
  }
  return json.user
}

export async function apiChangePassword(current_password: string, new_password: string) {
  const res = await request('/password/change/', {
    method: 'POST',
    body: JSON.stringify({ current_password, new_password }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.current_password?.[0] || json.detail || 'Failed.')
  return json
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export async function apiDashboardStats() {
  const res = await request('/dashboard/stats/')
  if (!res.ok) throw new Error('Failed to load stats.')
  return res.json()
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function apiGetServices() {
  const res = await request('/services/')
  if (!res.ok) throw new Error('Failed to load services.')
  return res.json()
}

export async function apiRequestService(name: string, description: string) {
  const res = await request('/services/request/', {
    method: 'POST',
    body: JSON.stringify({ name, description }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.name?.[0] || json.detail || 'Failed to submit request.')
  return json
}

export async function apiAddInvoice(serviceId: number, file: File) {
  const token = getAccessToken()
  const formData = new FormData()
  formData.append('file', file)
  formData.append('file_name', file.name)
  // Do NOT set Content-Type — browser sets multipart boundary automatically
  const res = await fetch(`${BASE_URL}/services/${serviceId}/invoices/`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  })
  if (!res.ok) throw new Error('Failed to add invoice.')
  return res.json()
}

export async function apiDeleteInvoice(serviceId: number, invoiceId: number) {
  await request(`/services/${serviceId}/invoices/${invoiceId}/`, { method: 'DELETE' })
}

export async function apiContact(name: string, email: string, message: string) {
  const res = await fetch(`${BASE_URL}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.detail || 'Failed to send message.')
  return data
}

export { clearTokens, getAccessToken }
