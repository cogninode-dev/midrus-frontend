'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiLogin, apiVerifyLoginOtp, apiRegister, apiVerifyEmail, apiLogout, apiGetMe, clearTokens, getAccessToken } from '@/lib/api'

interface User {
  id: string
  email: string
  name: string
  company?: string
  phone?: string
  address?: string
  website?: string
  tax_id?: string
  gst_number?: string
  is_approved: boolean
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<{ otp_required?: boolean }>
  loginVerify: (email: string, otp: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<{ otp_required?: boolean }>
  signupVerify: (email: string, otp: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  // On mount — restore session from stored token
  useEffect(() => {
    const token = getAccessToken()
    if (!token) { setLoading(false); return }

    apiGetMe()
      .then((u) => { setUser(u); setIsLoggedIn(true) })
      .catch(() => { clearTokens() })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    return await apiLogin(email, password)  // { otp_required: true }
  }

  const loginVerify = async (email: string, otp: string) => {
    const u = await apiVerifyLoginOtp(email, otp)
    setUser(u)
    setIsLoggedIn(true)
  }

  const signup = async (email: string, password: string, name: string) => {
    return await apiRegister(email, password, name)
  }

  const signupVerify = async (email: string, otp: string) => {
    const u = await apiVerifyEmail(email, otp)
    setUser(u)
    setIsLoggedIn(true)
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, loginVerify, signup, signupVerify, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
