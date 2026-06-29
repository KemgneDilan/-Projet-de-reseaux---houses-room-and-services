'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { users as mockUsers } from '@/lib/mockData'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

// ------------------------------------------------------------------
// Clés localStorage
// ------------------------------------------------------------------
const LS_USERS_KEY = 'hrs_users'
const LS_CURRENT_USER = 'hrs_current_user'
const LS_CURRENT_MODE = 'hrs_current_mode'

// ------------------------------------------------------------------
// Helpers SSR-safe
// ------------------------------------------------------------------
function readLS(key, fallback = null) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

function writeLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

/**
 * S'assure que les utilisateurs mock sont dans le localStorage,
 * puis retourne la liste complète des utilisateurs.
 */
function ensureUsers() {
  let users = readLS(LS_USERS_KEY, null)
  if (!users) {
    users = mockUsers.map(u => ({
      ...u,
      kycStatus: (u.role === 'admin' || u.role === 'host') ? 'validated' : 'none',
      interests: u.interests || (
        u.id === 'u1' ? ['cuisine local', 'randonnée', 'lecture', 'voyages'] :
        u.id === 'u2' ? ['cuisine local', 'lecture', 'voyages', 'photographie'] :
        u.id === 'u3' ? ['cuisine local', 'voyages', 'musique'] : []
      ),
    }))
    writeLS(LS_USERS_KEY, users)
  }
  return users
}

// ------------------------------------------------------------------
// Provider
// ------------------------------------------------------------------
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentMode, setCurrentModeState] = useState('client')

  /**
   * Effet de démarrage unique :
   * 1. Vérifie la version des données mock (force reset si version différente)
   * 2. Initialise les utilisateurs mock si absent
   * 3. Restaure la session sauvegardée
   */
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Version des données mock — incrémenter quand mockData change
    const DATA_VERSION = '2'
    const storedVersion = localStorage.getItem('hrs_data_version')
    if (storedVersion !== DATA_VERSION) {
      // Nouvelles données mock disponibles : réinitialiser les users mock
      localStorage.removeItem(LS_USERS_KEY)
      localStorage.setItem('hrs_data_version', DATA_VERSION)
      // Si l'utilisateur connecté était un mock user (u2 etc.), le déconnecter proprement
      const currentUser = readLS(LS_CURRENT_USER)
      if (currentUser && !currentUser.id.startsWith('user_')) {
        // C'est un mock user, le reconnecter avec les nouvelles données plus tard
        localStorage.removeItem(LS_CURRENT_USER)
      }
    }

    ensureUsers()
    const storedUser = readLS(LS_CURRENT_USER)
    if (storedUser) setUser(storedUser)
    const storedMode = localStorage.getItem(LS_CURRENT_MODE)
    if (storedMode) setCurrentModeState(storedMode)
    setLoading(false)
  }, [])

  const setCurrentMode = useCallback((mode) => {
    setCurrentModeState(mode)
    if (typeof window !== 'undefined') {
      localStorage.setItem(LS_CURRENT_MODE, mode)
    }
  }, [])

  // ------------------------------------------------------------------
  // Login
  // ------------------------------------------------------------------
  const login = useCallback(async (emailOrPhone, password) => {
    // Toujours s'assurer que les users existent avant de chercher
    const users = ensureUsers()

    // 1. Essai API réelle (facultatif, timeout 3s)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password }),
        signal: AbortSignal.timeout(3000),
      })
      if (res.ok) {
        const body = await res.json()
        const userData = body?.data?.user || body?.data || body?.user
        if (userData) {
          writeLS(LS_CURRENT_USER, userData)
          if (body.accessToken || body.data?.accessToken) {
            localStorage.setItem('accessToken', body.accessToken || body.data.accessToken)
          }
          setUser(userData)
          toast.success('Connexion réussie !')
          return userData
        }
      }
    } catch {
      // API indisponible ou timeout → mode local
    }

    // 2. Mode local / démo
    const found = users.find(
      u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
    )

    if (!found) {
      const err = new Error('Email/Téléphone ou mot de passe incorrect')
      toast.error(err.message)
      throw err
    }

    writeLS(LS_CURRENT_USER, found)
    const targetMode = found.role === 'host' ? 'host' : 'client'
    setCurrentModeState(targetMode)
    localStorage.setItem(LS_CURRENT_MODE, targetMode)
    setUser(found)
    toast.success('Connexion réussie !')
    return found
  }, [])

  // ------------------------------------------------------------------
  // Register
  // ------------------------------------------------------------------
  const register = useCallback(async (formData) => {
    const users = ensureUsers()

    // Vérifications de doublons
    if (users.some(u => u.email === formData.email)) {
      const err = new Error('Cette adresse email est déjà utilisée')
      toast.error(err.message)
      throw err
    }
    if (users.some(u => u.phone === formData.phone)) {
      const err = new Error('Ce numéro de téléphone est déjà utilisé')
      toast.error(err.message)
      throw err
    }

    // 1. Essai API réelle (timeout 3s)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'client' }),
        signal: AbortSignal.timeout(3000),
      })
      if (res.ok) {
        const body = await res.json()
        const userData = body?.data?.user || body?.data || body?.user
        if (userData) {
          writeLS(LS_CURRENT_USER, userData)
          if (body.accessToken || body.data?.accessToken) {
            localStorage.setItem('accessToken', body.accessToken || body.data.accessToken)
          }
          setUser(userData)
          setCurrentModeState('client')
          localStorage.setItem(LS_CURRENT_MODE, 'client')
          toast.success('Inscription réussie !')
          return userData
        }
      }
    } catch {
      // API indisponible → mode local
    }

    // 2. Mode local / démo
    const newUser = {
      id: `user_${Date.now()}`,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: 'client',
      kycStatus: 'none',
      interests: [],
      city: formData.city || '',
      ratings: [],
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    writeLS(LS_USERS_KEY, users)
    writeLS(LS_CURRENT_USER, newUser)
    setUser(newUser)
    setCurrentModeState('client')
    localStorage.setItem(LS_CURRENT_MODE, 'client')
    toast.success('Inscription réussie !')
    return newUser
  }, [])

  // ------------------------------------------------------------------
  // Logout
  // ------------------------------------------------------------------
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem(LS_CURRENT_USER)
    localStorage.removeItem(LS_CURRENT_MODE)
    setUser(null)
    setCurrentModeState('client')
    toast.success('Déconnecté avec succès')
  }, [])

  // ------------------------------------------------------------------
  // Mise à jour du profil
  // ------------------------------------------------------------------
  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates }
      writeLS(LS_CURRENT_USER, updated)
      const users = readLS(LS_USERS_KEY, [])
      const idx = users.findIndex(u => u.id === prev.id)
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates }
        writeLS(LS_USERS_KEY, users)
      }
      return updated
    })
  }, [])

  // ------------------------------------------------------------------
  // Rôle actif (toggle client/hôte)
  // ------------------------------------------------------------------
  const getActiveUser = () => {
    if (!user) return null
    if (user.role === 'admin') return user
    return { ...user, role: currentMode === 'host' ? 'host' : 'client' }
  }

  const isRole = (...roles) => {
    const active = getActiveUser()
    return active && roles.includes(active.role)
  }

  return (
    <AuthContext.Provider
      value={{
        user: getActiveUser(),
        rawUser: user,
        loading,
        currentMode,
        setCurrentMode,
        login,
        register,
        logout,
        updateUser,
        isRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
