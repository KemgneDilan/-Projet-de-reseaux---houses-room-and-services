"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Home, Search, Map, MessageSquare, User, LogOut, Calendar, Settings, ChevronDown, Repeat2, X, Menu } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthContext"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const { user, logout, isLoading, currentMode, setCurrentMode } = useAuth()
  const { t, lang, changeLanguage } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)

  const navigationLinks = [
    { href: "/", label: t('nav_home') || "Accueil", icon: Home, id: 'home' },
    { href: "/client/search", label: t('nav_search') || "Rechercher", icon: Search, id: 'search' },
    { href: "/map", label: t('nav_map') || "Carte", icon: Map, id: 'map' },
  ]

  const userMenuItems = [
    { label: t('nav_profile') || "Mon profil", icon: User, href: `/${currentMode}` },
    { label: t('nav_reservations') || "Réservations", icon: Calendar, href: `/${currentMode}` },
    { label: t('nav_messages') || "Messages", icon: MessageSquare, href: `/messages` },
    { label: t('nav_settings') || "Paramètres", icon: Settings, href: `/settings` },
  ]

  const handleModeToggle = () => {
    const newMode = currentMode === 'host' ? 'client' : 'host'
    setCurrentMode(newMode)
    setIsUserMenuOpen(false)
    setIsOpen(false)
    router.push(`/${newMode}`)
  }

  const canToggleHostMode = user && user.role !== 'admin' && user.kycStatus === 'validated'

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('[data-sidebar]') && !e.target.closest('[data-sidebar-toggle]')) {
        setIsOpen(false)
      }
      if (isUserMenuOpen && !e.target.closest('[data-user-menu]')) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, isUserMenuOpen])

  // Fermeture automatique du sidebar quand l'écran devient grand (>= 1024px)
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* ── Barre du haut ── */}
      <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-blue-50/80 dark:bg-charcoal-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-charcoal-850 flex items-center px-4 gap-3">

        {/* Bouton hamburger */}
        <button
          data-sidebar-toggle
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-blue-100/55 dark:hover:bg-charcoal-900 transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5 text-slate-500 dark:text-slate-400" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="bg-blue-700 text-white p-1.5 rounded-md">
            <Home className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold tracking-tight text-slate-800 dark:text-white hidden sm:block">
            Loomdaah
          </span>
        </Link>

        <div className="flex-1" />

        {/* Actions droite */}
        <div className="flex items-center gap-1.5">
          {/* Langue */}
          <button
            onClick={() => changeLanguage(lang === 'fr' ? 'en' : 'fr')}
            className="px-2 py-1 text-xs font-semibold rounded border border-slate-200/60 bg-white dark:bg-charcoal-900 hover:bg-slate-50 dark:hover:bg-charcoal-800 transition-colors text-slate-650 dark:text-slate-300 shadow-2xs"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          {!isLoading && user ? (
            <>
              {/* Messages */}
              <Link href="/messages">
                <button className="relative flex items-center justify-center w-9 h-9 rounded-md hover:bg-blue-100/50 dark:hover:bg-charcoal-900 transition-colors">
                  <MessageSquare className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="absolute top-2 right-2 flex h-1.5 w-1.5 rounded-full bg-blue-600" />
                </button>
              </Link>

              {/* Menu utilisateur */}
              <div className="relative" data-user-menu>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-blue-100/50 dark:hover:bg-charcoal-900 transition-colors"
                >
                  <div className="h-7 w-7 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold text-xs">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden lg:block max-w-[100px] truncate">
                    {user.username}
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 text-slate-450 dark:text-slate-550 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 mt-1.5 w-56 bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden z-50"
                    >
                      {/* Info utilisateur */}
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                          {t('nav_logged_as') || 'Connecté en tant que'}
                        </p>
                        <p className="text-sm font-semibold text-slate-800 mt-0.5">{user.username}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Mode : <span className="font-medium text-blue-700">
                            {currentMode === 'host' ? '🏠 Hôte' : '✈️ Utilisateur'}
                          </span>
                        </p>
                      </div>

                      {/* Bascule de mode */}
                      {canToggleHostMode && (
                        <div className="px-3 py-2 border-b border-slate-100">
                          <button
                            onClick={handleModeToggle}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                          >
                            <Repeat2 className="h-4 w-4 text-slate-500" />
                            {currentMode === 'host' ? '↩ Mode Utilisateur' : '↪ Mode Hôte'}
                          </button>
                        </div>
                      )}

                      {/* Liens */}
                      <div className="py-1">
                        {userMenuItems.map((item) => (
                          <Link key={item.label} href={item.href}>
                            <button
                              onClick={() => setIsUserMenuOpen(false)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <item.icon className="h-4 w-4 text-slate-400" />
                              {item.label}
                            </button>
                          </Link>
                        ))}
                      </div>

                      {/* Déconnexion */}
                      <div className="px-3 py-2 border-t border-slate-100">
                        <button
                          onClick={() => { logout(); setIsUserMenuOpen(false) }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          {t('nav_logout') || 'Déconnexion'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : !isLoading ? (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden sm:flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {t('nav_login') || 'Connexion'}
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center h-8 px-4 text-xs font-medium rounded-md bg-blue-700 text-white hover:bg-blue-600 transition-colors"
              >
                {t('nav_register') || "S'inscrire"}
              </Link>
            </div>
          ) : null}
        </div>
      </nav>

      {/* ── Overlay sombre plein écran (recouvre le contenu, pas de push) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal-950/40 backdrop-blur-[1px] z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Panneau latéral ── */}
      <motion.aside
        data-sidebar
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[260px] z-50 flex flex-col bg-blue-50 dark:bg-charcoal-900 border-r border-slate-200 dark:border-charcoal-800 shadow-sm"
      >
        {/* En-tête sidebar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/60 dark:border-charcoal-800">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Navigation</span>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-blue-100/50 dark:hover:bg-charcoal-850 transition-colors"
          >
            <X className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </button>
        </div>

        {/* Liens principaux */}
        <div className="flex-1 px-2 py-3 overflow-y-auto">
          <p className="px-2 pb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-455 dark:text-slate-500">
            Sections
          </p>
          {navigationLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.id} href={link.href} onClick={() => setIsOpen(false)}>
                <div className={`flex items-center gap-2.5 px-3 py-2 mb-0.5 rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-100/70 text-blue-900 font-semibold dark:bg-blue-950 dark:text-blue-200 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-350 hover:bg-blue-100/40 hover:text-slate-800 dark:hover:bg-charcoal-850 dark:hover:text-white'
                }`}>
                  <link.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="text-sm font-medium">{link.label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
                </div>
              </Link>
            )
          })}

          <div className="my-3 border-t border-slate-200/60 dark:border-charcoal-850" />

          {user ? (
            <>
              <p className="px-2 pb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-455 dark:text-slate-500">
                Mon espace
              </p>
              {userMenuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                    <div className={`flex items-center gap-2.5 px-3 py-2 mb-0.5 rounded-md transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-100/70 text-blue-900 font-semibold dark:bg-blue-950 dark:text-blue-200 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-350 hover:bg-blue-100/40 hover:text-slate-800 dark:hover:bg-charcoal-850 dark:hover:text-white'
                    }`}>
                      <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </Link>
                )
              })}

              {canToggleHostMode && (
                <div className="mt-1 px-1">
                  <button
                    onClick={handleModeToggle}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border border-blue-200/70 dark:border-charcoal-750 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 text-blue-800 dark:text-blue-200 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-950/60 dark:hover:to-indigo-950/60 shadow-xs"
                  >
                    <Repeat2 className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span>{currentMode === 'host' ? 'Passer en mode Client' : 'Passer en mode Hôte'}</span>
                    <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      currentMode === 'host'
                        ? 'bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                    }`}>
                      {currentMode === 'host' ? 'Hôte' : 'Client'}
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-2 px-1 mt-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center h-9 px-4 rounded-md border border-slate-200/60 text-slate-700 dark:text-slate-300 bg-white dark:bg-charcoal-950 hover:bg-slate-50 dark:hover:bg-charcoal-900 font-medium text-sm transition-colors shadow-2xs"
              >
                {t('nav_login') || 'Connexion'}
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center h-9 px-4 rounded-md bg-blue-700 text-white hover:bg-blue-600 font-medium text-sm transition-colors shadow-2xs"
              >
                {t('nav_register') || "S'inscrire"}
              </Link>
            </div>
          )}
        </div>

        {/* Pied de sidebar */}
        {user && (
          <div className="border-t border-slate-200/60 dark:border-charcoal-800 px-4 py-3">
            <div className="flex items-center gap-2.5 mb-2 px-2 py-2 bg-white dark:bg-charcoal-950 rounded-md border border-blue-100/50 dark:border-transparent shadow-3xs">
              <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-850 dark:text-white truncate">{user.username}</p>
                <p className="text-xs text-slate-450 dark:text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); setIsOpen(false) }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {t('nav_logout') || 'Déconnexion'}
            </button>
          </div>
        )}
      </motion.aside>

      {/* Espace topbar fixe */}
      <div className="h-16" />
    </>
  )
}
