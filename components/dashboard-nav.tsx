'use client'

import { useAuth } from '@/app/auth-context'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, ChevronDown, User, LogOut, ClipboardList, HelpCircle, Command } from 'lucide-react'
import Image from 'next/image'

export default function DashboardNav() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuItemsRef = useRef<(HTMLElement | null)[]>([])
  const searchRef = useRef<HTMLInputElement>(null)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const isActive = (href: string) => pathname === href

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showUserMenu) {
        setShowUserMenu(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showUserMenu])

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    const items = menuItemsRef.current.filter(Boolean)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = (idx + 1) % items.length
      items[next]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = (idx - 1 + items.length) % items.length
      items[prev]?.focus()
    } else if (e.key === 'Escape') {
      setShowUserMenu(false)
      menuButtonRef.current?.focus()
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.toLowerCase().trim()
    if (q.includes('service')) router.push('/dashboard/services')
    else if (q.includes('profile') || q.includes('account')) router.push('/dashboard/profile')
    else if (q.includes('dashboard') || q.includes('home')) router.push('/dashboard')
    setSearchQuery('')
    searchRef.current?.blur()
  }

  const menuItems = [
    { label: 'View Profile', href: '/dashboard/profile', icon: User },
    { label: 'My Services', href: '/dashboard/services', icon: ClipboardList },
    { label: 'Support', href: '#', icon: HelpCircle },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-1/90 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="MIDRUS" width={36} height={36} className="object-contain" />
          <div className="hidden sm:block">
            <p className="font-bold text-foreground text-sm">MIDRUS</p>
            <p className="text-xs text-foreground-muted">Client Portal</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-surface-2 border border-border rounded-full px-1.5 py-1">
          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
              isActive('/dashboard')
                ? 'bg-accent text-foreground shadow-sm'
                : 'text-foreground-secondary hover:text-foreground hover:bg-surface-3'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/services"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
              isActive('/dashboard/services')
                ? 'bg-accent text-foreground shadow-sm'
                : 'text-foreground-secondary hover:text-foreground hover:bg-surface-3'
            }`}
          >
            Services
          </Link>
          <Link
            href="/dashboard/profile"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
              isActive('/dashboard/profile')
                ? 'bg-accent text-foreground shadow-sm'
                : 'text-foreground-secondary hover:text-foreground hover:bg-surface-3'
            }`}
          >
            Profile
          </Link>
        </div>

        {/* Search and User Menu */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface-2 border border-border rounded-full hover:border-border-strong transition-all duration-200 focus-within:ring-2 focus-within:ring-accent/40 focus-within:border-accent">
            <Search className="w-4 h-4 text-foreground-muted" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent outline-none text-sm text-foreground placeholder-foreground-muted w-32 focus:w-44 transition-all duration-200"
            />
            {!searchFocused && (
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-foreground-muted bg-surface-3 border border-border rounded">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            )}
          </form>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              ref={menuButtonRef}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-4 py-2 bg-surface-2 border border-border rounded-lg hover:border-border-strong hover:bg-surface-3 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-accent/40"
              aria-expanded={showUserMenu}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold text-foreground">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-sm font-semibold text-foreground">{user?.name}</span>
              <ChevronDown
                className={`w-4 h-4 text-foreground-muted transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 bg-surface-1 border border-border rounded-xl shadow-lg shadow-foreground/5 overflow-hidden animate-dropdownSlide"
              >
                {/* User info header */}
                <div className="px-4 py-3 border-b border-border bg-surface-2/50">
                  <p className="text-sm font-semibold text-foreground">{user?.email}</p>
                  <p className="text-xs text-foreground-muted mt-0.5">{user?.company}</p>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  {menuItems.map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        ref={(el) => { menuItemsRef.current[idx] = el }}
                        role="menuitem"
                        tabIndex={0}
                        onKeyDown={(e) => handleMenuKeyDown(e, idx)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-surface-2 transition-colors focus:outline-none focus:bg-surface-2"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Icon className="w-4 h-4 text-foreground-muted" />
                        {item.label}
                      </Link>
                    )
                  })}
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Sign out */}
                <div className="py-1">
                  <button
                    ref={(el) => { menuItemsRef.current[menuItems.length] = el }}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => handleMenuKeyDown(e, menuItems.length)}
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-bg/50 transition-colors focus:outline-none focus:bg-error-bg/50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-surface-1">
        <div className="flex items-center px-4 py-2 gap-2 overflow-x-auto">
          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              isActive('/dashboard')
                ? 'bg-accent text-foreground'
                : 'bg-surface-2 text-foreground-secondary hover:bg-surface-3'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/services"
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              isActive('/dashboard/services')
                ? 'bg-accent text-foreground'
                : 'bg-surface-2 text-foreground-secondary hover:bg-surface-3'
            }`}
          >
            Services
          </Link>
          <Link
            href="/dashboard/profile"
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              isActive('/dashboard/profile')
                ? 'bg-accent text-foreground'
                : 'bg-surface-2 text-foreground-secondary hover:bg-surface-3'
            }`}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}
