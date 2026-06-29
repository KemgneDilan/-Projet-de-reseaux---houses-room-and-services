"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/AuthContext'
import { useLanguage } from '@/app/contexts/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Search, Calendar, Star, Users, Settings,
  LogOut, Menu, X, LayoutDashboard, CreditCard, Box, MessageSquare, ChevronLeft
} from 'lucide-react'

export function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [userRole, setUserRole] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hrs_current_user')
      if (stored) {
        try { return JSON.parse(stored).role } catch { return null }
      }
    }
    return null
  })

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    if (user?.role) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserRole(user.role)
    }
  }, [user])

  function PlusIcon(props) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /><path d="M12 5v14" />
      </svg>
    )
  }

  const getSidebarLinks = () => {
    const role = userRole || user?.role || pathname.split('/')[1]
    switch (role) {
      case 'client':
        return [
          { href: '/', label: t('nav_home') || 'Accueil', icon: Home },
          { href: '/client', label: t('tab_reservations') || 'Tableau de bord', icon: LayoutDashboard },
          { href: '/client/search', label: t('nav_search') || 'Rechercher', icon: Search },
          { href: '/client#reservations', label: t('tab_reservations') || 'Réservations', icon: Calendar },
          { href: '/client#favoris', label: t('tab_favorites') || 'Favoris', icon: Star },
          { href: '/settings', label: t('nav_settings') || 'Paramètres', icon: Settings },
        ]
      case 'host':
        return [
          { href: '/', label: t('nav_home') || 'Accueil', icon: Home },
          { href: '/host', label: t('host_dashboard') || 'Tableau de bord', icon: LayoutDashboard },
          { href: '/host/listings/new', label: t('host_new_listing') || 'Nouvelle annonce', icon: PlusIcon },
          { href: '/host#reservations', label: t('host_res_received') || 'Réservations', icon: Calendar },
          { href: '/host#finances', label: t('host_finances_title') || 'Finances', icon: CreditCard },
          { href: '/messages', label: t('nav_messages') || 'Messages', icon: MessageSquare },
          { href: '/settings', label: t('nav_settings') || 'Paramètres', icon: Settings },
        ]
      case 'admin':
        return [
          { href: '/', label: t('nav_home') || 'Accueil', icon: Home },
          { href: '/admin', label: 'Vue globale', icon: LayoutDashboard },
          { href: '/admin#users', label: 'Utilisateurs', icon: Users },
          { href: '/admin#annonces', label: 'Annonces', icon: Box },
          { href: '/admin#finances', label: 'Finances', icon: CreditCard },
          { href: '/settings', label: t('nav_settings') || 'Paramètres', icon: Settings },
        ]
      default:
        return []
    }
  }

  const links = isMounted ? getSidebarLinks() : []

  const getRoleLabel = () => {
    const role = userRole || user?.role
    switch (role) {
      case 'client': return '✈️ Utilisateur'
      case 'host': return '🏠 Hôte'
      case 'admin': return '🛡️ Admin'
      default: return '👤 Membre'
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">

      {/* ══ SIDEBAR ══ */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 240 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative flex-shrink-0 overflow-hidden z-30 bg-blue-50 dark:bg-charcoal-900 border-r border-slate-200 dark:border-charcoal-800"
      >
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="w-[240px] h-full flex flex-col"
            >
              {/* En-tête */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200/60 dark:border-charcoal-800">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-blue-700 flex items-center justify-center">
                    <Home className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-white">Loomdaah</span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-blue-100/50 dark:hover:bg-charcoal-800 transition-colors"
                  aria-label="Réduire la sidebar"
                >
                  <ChevronLeft className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </button>
              </div>

              {/* Badge utilisateur */}
              {user && (
                <div className="px-3 py-3 border-b border-slate-200/60 dark:border-charcoal-800">
                  <div className="flex items-center gap-2.5 px-2 py-2 bg-white dark:bg-charcoal-950 rounded-md border border-blue-100/50 dark:border-transparent shadow-3xs">
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                      {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-850 dark:text-white truncate">{user.username}</p>
                      <p className="text-xs text-slate-450 dark:text-slate-400">{getRoleLabel()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Liens de navigation */}
              <nav className="flex-1 overflow-y-auto px-2 py-3">
                <p className="px-2 pb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-455 dark:text-slate-500">
                  Menu
                </p>
                <ul className="space-y-0.5">
                  {links.map((link, idx) => {
                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.split('#')[0]))
                    return (
                      <li key={`${link.href}-${idx}`}>
                        <Link href={link.href}>
                          <div className={`flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-blue-100/70 text-blue-900 font-semibold dark:bg-blue-950 dark:text-blue-200 shadow-2xs'
                              : 'text-slate-600 dark:text-slate-350 hover:bg-blue-100/40 hover:text-slate-800 dark:hover:bg-charcoal-850 dark:hover:text-white'
                          }`}>
                            <link.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                            <span className="text-sm font-medium">{link.label}</span>
                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* Pied de sidebar */}
              <div className="border-t border-slate-200/60 dark:border-charcoal-800 px-3 py-3">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  {t('host_logout') || 'Déconnexion'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* ══ ZONE PRINCIPALE ══ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Barre supérieure */}
        <header className="sticky top-0 z-20 bg-blue-50 dark:bg-charcoal-900 border-b border-slate-200 dark:border-charcoal-800">
          <div className="flex h-14 items-center gap-3 px-4 sm:px-6">

            {/* Bouton hamburger */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-blue-100/50 dark:hover:bg-charcoal-800 transition-colors"
              aria-label="Basculer le menu"
            >
              <Menu className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </button>

            {/* Fil d'Ariane */}
            <div className="flex items-center gap-1.5 text-sm">
              <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                Accueil
              </Link>
              <span className="text-slate-300 dark:text-slate-650">/</span>
              <span className="font-medium text-slate-700 dark:text-slate-200 capitalize">
                {pathname.split('/')[1] || 'Tableau de bord'}
              </span>
            </div>

            <div className="flex-1" />

            {/* Actions droite */}
            <div className="flex items-center gap-2">
              <Link href="/messages">
                <button className="relative flex items-center justify-center w-8 h-8 rounded-md hover:bg-blue-100/50 dark:hover:bg-charcoal-800 transition-colors">
                  <MessageSquare className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5 rounded-full bg-blue-600" />
                </button>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-md bg-white dark:bg-charcoal-950 px-2.5 py-1.5 hover:bg-slate-50 dark:hover:bg-charcoal-800 border border-slate-200/60 dark:border-charcoal-850 transition-colors shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold text-xs">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block">
                  {user?.username || 'Profil'}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Contenu de la page */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
