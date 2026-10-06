'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiLogin, apiVerifyLoginOtp, apiRegister, apiVerifyEmail, apiLogout, apiGetMe, apiDeleteAccount, clearTokens, getAccessToken } from '@/lib/api'

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
  photo_url?: string | null
  is_approved: boolean
  created_at?: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<{ otp_required?: boolean }>
  loginVerify: (email: string, otp: string) => Promise<void>
  signup: (email: string, password: string, name: string, acceptedTerms: boolean) => Promise<{ otp_required?: boolean }>
  signupVerify: (email: string, otp: string) => Promise<void>
  logout: () => void
  deleteAccount: (password: string) => Promise<void>
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]   = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const isLoggedIn = user !== null

  // On mount — restore session from stored token. Both branches resolve
  // through the same promise chain (rather than an early synchronous
  // return) so every setState call happens inside a .then/.catch/.finally
  // callback, not directly in the effect body.
  useEffect(() => {
    const token = getAccessToken()
    const restored = token ? apiGetMe() : Promise.resolve(null)
    restored
      .then((u) => { if (u) setUser(u) })
      .catch(() => { clearTokens() })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    return await apiLogin(email, password)
  }

  const loginVerify = async (email: string, otp: string) => {
    const u = await apiVerifyLoginOtp(email, otp)
    setUser(u)
  }

  const signup = async (email: string, password: string, name: string, acceptedTerms: boolean) => {
    return await apiRegister(email, password, name, acceptedTerms)
  }

  const signupVerify = async (email: string, otp: string) => {
    const u = await apiVerifyEmail(email, otp)
    setUser(u)
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
  }

  const deleteAccount = async (password: string) => {
    await apiDeleteAccount(password)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, loginVerify, signup, signupVerify, logout, deleteAccount, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
