"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, Search, Map, MessageSquare, User, LogOut, Heart, Calendar, Settings, ChevronDown, Repeat2, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/app/contexts/AuthContext"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const { user, logout, isLoading, currentMode, setCurrentMode } = useAuth()
  const { t, lang, changeLanguage } = useLanguage()
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
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
    setIsDrawerOpen(false)
    router.push(`/${newMode}`)
  }

  const canToggleHostMode = user && user.role !== 'admin' && user.kycStatus === 'validated'

  // Close drawer on outside click
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDrawerOpen && !e.target.closest('[data-drawer]') && !e.target.closest('[data-drawer-toggle]')) {
        setIsDrawerOpen(false)
      }
      if (isUserMenuOpen && !e.target.closest('[data-user-menu]')) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDrawerOpen, isUserMenuOpen])

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-charcoal-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">

            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-3">
              {/* Hamburger Menu Toggle */}
              <button
                data-drawer-toggle
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-charcoal-100 transition-colors"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-5 w-5 text-charcoal-700" />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="bg-linear-to-br from-terracotta-500 to-orange-500 text-white p-2 rounded-lg">
                  <Home className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-terracotta-600 to-orange-600 hidden sm:block">
                  Loomdaah
                </span>
              </Link>
            </div>

            {/* Right: Language + User actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={() => changeLanguage(lang === 'fr' ? 'en' : 'fr')}
                className="px-2.5 py-1 text-xs font-bold rounded-md border border-charcoal-200 hover:bg-charcoal-100 transition-colors text-charcoal-700"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>

              {!isLoading && user ? (
                <>
                  {/* Messages */}
                  <Link href="/messages">
                    <button className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-charcoal-100 transition-colors">
                      <MessageSquare className="h-4 w-4 text-charcoal-700" />
                      <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
                  </Link>

                  {/* User Profile Dropdown */}
                  <div className="relative" data-user-menu>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-charcoal-100 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-terracotta-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-charcoal-900 hidden lg:block max-w-[100px] truncate">
                        {user.username}
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-charcoal-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-charcoal-200 overflow-hidden z-50"
                        >
                          {/* User info */}
                          <div className="px-4 py-3 border-b border-charcoal-100">
                            <p className="text-xs text-charcoal-500 font-semibold uppercase tracking-wide">{t('nav_logged_as') || 'Connecté en tant que'}</p>
                            <p className="text-sm font-bold text-charcoal-900 mt-0.5">{user.username}</p>
                            <p className="text-xs text-charcoal-500 mt-0.5">
                              Mode : <span className={`font-semibold ${currentMode === 'host' ? 'text-emerald-600' : 'text-terracotta-600'}`}>
                                {currentMode === 'host' ? '🏠 Hôte' : '✈️ Utilisateur'}
                              </span>
                            </p>
                          </div>

                          {/* Mode Toggle */}
                          {canToggleHostMode && (
                            <div className="px-3 py-2 border-b border-charcoal-100">
                              <button
                                onClick={handleModeToggle}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                                  currentMode === 'host'
                                    ? 'bg-terracotta-50 text-terracotta-700 hover:bg-terracotta-100'
                                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                }`}
                              >
                                <Repeat2 className="h-4 w-4" />
                                {currentMode === 'host' ? '↩ Passer en mode Utilisateur' : '↪ Passer en mode Hôte'}
                              </button>
                            </div>
                          )}

                          {/* Menu items */}
                          <div className="py-1">
                            {userMenuItems.map((item) => (
                              <Link key={item.label} href={item.href}>
                                <button
                                  onClick={() => setIsUserMenuOpen(false)}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-charcoal-50 transition-colors"
                                >
                                  <item.icon className="h-4 w-4 text-terracotta-500" />
                                  {item.label}
                                </button>
                              </Link>
                            ))}
                          </div>

                          {/* Logout */}
                          <div className="px-3 py-2 border-t border-charcoal-100">
                            <button
                              onClick={() => { logout(); setIsUserMenuOpen(false) }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
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
                    className="hidden sm:flex items-center justify-center h-9 px-3 text-xs font-semibold rounded-lg text-charcoal-700 hover:bg-charcoal-100 transition-colors"
                  >
                    {t('nav_login') || 'Connexion'}
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center h-9 px-4 text-xs font-semibold rounded-full bg-gradient-to-r from-terracotta-500 to-orange-500 text-white shadow-md hover:shadow-lg hover:from-terracotta-600 hover:to-orange-600 transition-all"
                  >
                    {t('nav_register') || "S'inscrire"}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </nav>

      {/* Sliding Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              data-drawer
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal-100 bg-linear-to-r from-terracotta-500 to-orange-500">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-white" />
                  <span className="text-lg font-bold text-white">Loomdaah</span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 py-4 overflow-y-auto">
                <p className="px-5 pb-2 text-xs font-semibold uppercase tracking-wider text-charcoal-400">Navigation</p>
                {navigationLinks.map((link, idx) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    <Link href={link.href} onClick={() => setIsDrawerOpen(false)}>
                      <div className="flex items-center gap-3 px-5 py-3 hover:bg-terracotta-50 hover:text-terracotta-700 transition-colors group cursor-pointer">
                        <div className="w-9 h-9 rounded-lg bg-charcoal-100 group-hover:bg-terracotta-100 flex items-center justify-center transition-colors">
                          <link.icon className="h-4 w-4 text-charcoal-600 group-hover:text-terracotta-600" />
                        </div>
                        <span className="font-medium text-charcoal-700 group-hover:text-terracotta-700">{link.label}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {/* Separator */}
                <div className="mx-5 my-3 border-t border-charcoal-100" />

                {user ? (
                  <>
                    <p className="px-5 pb-2 text-xs font-semibold uppercase tracking-wider text-charcoal-400">Mon espace</p>
                    {userMenuItems.map((item, idx) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 + 0.25 }}
                      >
                        <Link href={item.href} onClick={() => setIsDrawerOpen(false)}>
                          <div className="flex items-center gap-3 px-5 py-3 hover:bg-charcoal-50 transition-colors group cursor-pointer">
                            <div className="w-9 h-9 rounded-lg bg-charcoal-100 flex items-center justify-center">
                              <item.icon className="h-4 w-4 text-charcoal-600" />
                            </div>
                            <span className="font-medium text-charcoal-700">{item.label}</span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}

                    {canToggleHostMode && (
                      <div className="mx-5 mt-3">
                        <button
                          onClick={handleModeToggle}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                            currentMode === 'host'
                              ? 'bg-terracotta-50 text-terracotta-700 border border-terracotta-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          <Repeat2 className="h-4 w-4" />
                          {currentMode === 'host' ? '↩ Mode Utilisateur' : '↪ Mode Hôte'}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="px-5 space-y-2 flex flex-col">
                    <Link
                      href="/login"
                      onClick={() => setIsDrawerOpen(false)}
                      className="w-full flex items-center justify-center h-10 px-4 rounded-lg border-2 border-terracotta-300 bg-white text-terracotta-700 shadow-sm hover:bg-terracotta-50 hover:border-terracotta-400 font-semibold text-sm transition-all"
                    >
                      {t('nav_login') || 'Connexion'}
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsDrawerOpen(false)}
                      className="w-full flex items-center justify-center h-10 px-4 rounded-lg bg-gradient-to-r from-terracotta-500 to-orange-500 text-white shadow-md hover:shadow-lg hover:from-terracotta-600 hover:to-orange-600 font-semibold text-sm transition-all"
                    >
                      {t('nav_register') || "S'inscrire"}
                    </Link>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {user && (
                <div className="border-t border-charcoal-100 px-5 py-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-linear-to-br from-terracotta-400 to-orange-500 flex items-center justify-center text-white font-bold">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-charcoal-900">{user.username}</p>
                      <p className="text-xs text-charcoal-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { logout(); setIsDrawerOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    {t('nav_logout') || 'Déconnexion'}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
