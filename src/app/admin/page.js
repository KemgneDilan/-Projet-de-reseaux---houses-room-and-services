'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Building, Wrench, AlertTriangle, ShieldCheck, FileText, ChevronDown, ChevronUp, Clock, Settings, Home, BedDouble, Trash2, ShieldAlert, CheckCircle, XCircle, Download, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { contracts as defaultContracts, listings as defaultListings, houses as defaultHouses, rooms as defaultRooms } from '@/lib/mockData'
import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const { user, rawUser, logout, loading } = useAuth()
  const router = useRouter()

  // Admin check: use rawUser (actual stored role) as ground truth
  // because getActiveUser() may compute a different role via currentMode
  const isAdmin = rawUser?.role === 'admin' || user?.role === 'admin'

  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/login')
    }
  }, [isAdmin, loading, router])

  const [activeTab, setActiveTab] = React.useState('overview')
  const [expandedActor, setExpandedActor] = React.useState(null)
  const [expandedHouse, setExpandedHouse] = React.useState(null)

  const [usersList, setUsersList] = React.useState([])
  const [kycRequests, setKycRequests] = React.useState([])
  const [listingsList, setListingsList] = React.useState([])
  const [housesList, setHousesList] = React.useState([])
  const [reviewsList, setReviewsList] = React.useState([])
  const [contractsList, setContractsList] = React.useState([])

  React.useEffect(() => {
    const loadData = () => {
      if (typeof window !== 'undefined') {
        const storedUsers = JSON.parse(localStorage.getItem('hrs_users') || '[]')
        setUsersList(storedUsers)
        
        const storedRequests = JSON.parse(localStorage.getItem('hrs_kyc_requests') || '[]')
        setKycRequests(storedRequests)

        const storedListings = JSON.parse(localStorage.getItem('hrs_listings_all') || '[]')
        if (storedListings.length > 0) {
          setListingsList(storedListings)
        } else {
          setListingsList(defaultListings)
          localStorage.setItem('hrs_listings_all', JSON.stringify(defaultListings))
        }

        const storedHouses = JSON.parse(localStorage.getItem('hrs_houses_all') || '[]')
        if (storedHouses.length > 0) {
          setHousesList(storedHouses)
        } else {
          setHousesList(defaultHouses)
          localStorage.setItem('hrs_houses_all', JSON.stringify(defaultHouses))
        }

        const storedReviews = JSON.parse(localStorage.getItem('hrs_reviews') || '[]')
        setReviewsList(storedReviews)

        const storedContracts = JSON.parse(localStorage.getItem('hrs_contracts') || '[]')
        if (storedContracts.length > 0) {
          setContractsList(storedContracts)
        } else {
          setContractsList(defaultContracts)
          localStorage.setItem('hrs_contracts', JSON.stringify(defaultContracts))
        }
      }
    }
    loadData()
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const handleApproveKYC = (requestId, userId) => {
    const updatedUsers = usersList.map(u => {
      if (u.id === userId) {
        return { ...u, kycStatus: 'validated', role: 'host' }
      }
      return u
    })
    setUsersList(updatedUsers)
    localStorage.setItem('hrs_users', JSON.stringify(updatedUsers))

    const storedRequests = JSON.parse(localStorage.getItem('hrs_kyc_requests') || '[]')
    const updatedRequests = storedRequests.map(r => {
      if (r.id === requestId) {
        return { ...r, status: 'approved' }
      }
      return r
    })
    localStorage.setItem('hrs_kyc_requests', JSON.stringify(updatedRequests))
    setKycRequests(updatedRequests)
    toast.success('KYC validé avec succès ! Rôle Hôte activé.')
  }

  const handleRejectKYC = (requestId, userId, reason = "Documents invalides ou illisibles.") => {
    const updatedUsers = usersList.map(u => {
      if (u.id === userId) {
        return { ...u, kycStatus: 'none' }
      }
      return u
    })
    setUsersList(updatedUsers)
    localStorage.setItem('hrs_users', JSON.stringify(updatedUsers))

    const storedRequests = JSON.parse(localStorage.getItem('hrs_kyc_requests') || '[]')
    const updatedRequests = storedRequests.map(r => {
      if (r.id === requestId) {
        return { ...r, status: 'rejected', rejectionReason: reason }
      }
      return r
    })
    localStorage.setItem('hrs_kyc_requests', JSON.stringify(updatedRequests))
    setKycRequests(updatedRequests)
    toast.error('Demande KYC rejetée.')
  }

  const handleToggleUserSuspension = (userId, currentStatus) => {
    const updatedUsers = usersList.map(u => {
      if (u.id === userId) {
        return { ...u, isSuspended: !currentStatus }
      }
      return u
    })
    setUsersList(updatedUsers)
    localStorage.setItem('hrs_users', JSON.stringify(updatedUsers))
    toast.success(currentStatus ? 'Compte réactivé !' : 'Compte suspendu !')
  }

  const handleDeleteUser = (userId) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer définitivement cet utilisateur ? (Soft delete - R-U5)")) {
      const updatedUsers = usersList.map(u => {
        if (u.id === userId) {
          return { ...u, isDeleted: true, username: `[Supprimé] ${u.username}` }
        }
        return u
      })
      setUsersList(updatedUsers)
      localStorage.setItem('hrs_users', JSON.stringify(updatedUsers))
      toast.success('Compte utilisateur supprimé.')
    }
  }

  const handleToggleListingStatus = (listingId, currentStatus) => {
    const updated = listingsList.map(l => {
      if (l.id === listingId) {
        return { ...l, status: currentStatus === 'active' ? 'inactive' : 'active' }
      }
      return l
    })
    setListingsList(updated)
    localStorage.setItem('hrs_listings_all', JSON.stringify(updated))
    toast.success('Statut de l\'annonce mis à jour.')
  }

  const handleDeleteListing = (listingId) => {
    if (confirm("Confirmez-vous la suppression définitive de cette annonce ?")) {
      const updated = listingsList.filter(l => l.id !== listingId)
      setListingsList(updated)
      localStorage.setItem('hrs_listings_all', JSON.stringify(updated))
      toast.success('Annonce supprimée de la plateforme.')
    }
  }

  const handleDeleteReview = (reviewId) => {
    if (confirm("Voulez-vous supprimer cet avis car il est inapproprié ? (AC5)")) {
      const updated = reviewsList.filter(r => r.id !== reviewId)
      setReviewsList(updated)
      localStorage.setItem('hrs_reviews', JSON.stringify(updated))
      toast.success('Avis modéré et supprimé.')
    }
  }

  const handleExportCSV = () => {
    // Audit Log / transactions export
    let csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Type,Details,Statut\n"
      + contractsList.map(c => `${c.date},Reservation,${getEntityName(c.entityId, c.entityType)} (Client: ${getClientName(c.clientId)} - Hôte: ${getProviderName(c.providerId)}),${c.status}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "audit_log_loomdaah.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Fichier CSV exporté !')
  }

  const pendingRequests = kycRequests.filter(r => r.status === 'pending')

  const kpis = [
    { title: 'Utilisateurs Actifs', value: usersList.filter(u => !u.isDeleted).length.toString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Logements Publiés', value: listingsList.length.toString(), icon: Building, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Vérifications KYC', value: pendingRequests.length.toString(), icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Avis Publiés', value: reviewsList.length.toString(), icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  ]

  // Fonction pour résoudre les noms (simulation de relations BDD)
  const getClientName = (id) => usersList.find((u) => u.id === id)?.username || id
  const getProviderName = (id) => usersList.find((u) => u.id === id)?.username || id
  const getEntityName = (id, type) => {
    return listingsList.find((l) => l.id === id)?.title || housesList.find((h) => h.id === id)?.title || id
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-terracotta-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-charcoal-500 text-sm">Chargement du panneau d&apos;administration…</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-charcoal-900 mb-2">🔒 Accès réservé</p>
          <p className="text-charcoal-500 mb-4">Cette page est réservée aux administrateurs.</p>
          <button onClick={() => router.push('/login')} className="text-terracotta-600 underline text-sm">Se connecter</button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8 border-b border-charcoal-200 dark:border-charcoal-800 pb-6">
        <h1 className="text-3xl font-bold text-charcoal-900 dark:text-white flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-terracotta-500" /> Administration Loomdaah
        </h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleExportCSV} className="gap-2">
            <Download className="h-4 w-4" /> Exporter CSV
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Se déconnecter
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 border-b border-charcoal-100 dark:border-charcoal-800">
        {[
          { id: 'overview', label: 'Vue d\'ensemble', icon: Home },
          { id: 'acteurs', label: 'Acteurs', icon: Users },
          { id: 'logements', label: 'Logements & Chambres', icon: Building },
          { id: 'kyc', label: 'Vérifications KYC', icon: ShieldCheck },
          { id: 'avis', label: 'Modération Avis', icon: Star },
          { id: 'historique', label: 'Historique', icon: Clock }
        ].map(tab => (
          <Button 
            key={tab.id} 
            variant={activeTab === tab.id ? 'default' : 'ghost'} 
            onClick={() => {
              setActiveTab(tab.id)
              setExpandedActor(null)
              setExpandedHouse(null)
            }}
            className={`capitalize rounded-none border-b-2 ${activeTab === tab.id ? 'border-terracotta-500 text-terracotta-600 bg-transparent hover:bg-transparent dark:text-terracotta-400 dark:border-terracotta-400' : 'border-transparent text-charcoal-600 hover:text-charcoal-900 dark:text-charcoal-400 dark:hover:text-white'}`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpis.map((kpi, index) => (
                <Card key={index} className="border border-charcoal-200 dark:border-charcoal-800 dark:bg-charcoal-900">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-charcoal-500 dark:text-charcoal-400">{kpi.title}</p>
                      <h3 className="text-3xl font-bold text-charcoal-900 dark:text-white mt-1">{kpi.value}</h3>
                    </div>
                    <div className={`p-3 rounded-xl ${kpi.bg} dark:bg-charcoal-800`}>
                      <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick alert about pending KYC */}
            {pendingRequests.length > 0 && (
              <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-purple-900 dark:text-purple-300">Demandes de validation KYC en attente</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-400">Il y a {pendingRequests.length} demande(s) en attente de vérification d&apos;identité pour activation du statut Hôte.</p>
                  </div>
                </div>
                <Button onClick={() => setActiveTab('kyc')} className="bg-purple-600 hover:bg-purple-700 text-white text-xs py-2 px-4 rounded-lg">
                  Voir les demandes
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'acteurs' && (
          <motion.div key="acteurs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="border border-charcoal-200 dark:border-charcoal-800 dark:bg-charcoal-900">
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-charcoal-50 dark:bg-charcoal-950/20 text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase">
                    <tr>
                      <th className="px-6 py-4">Utilisateur</th>
                      <th className="px-6 py-4">Rôle</th>
                      <th className="px-6 py-4">Statut KYC</th>
                      <th className="px-6 py-4">Contact / Statut</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-100 dark:divide-charcoal-800 text-sm">
                    {usersList.filter(u => !u.isDeleted).map(u => {
                      const userContracts = contractsList.filter(c => c.clientId === u.id || c.providerId === u.id)
                      const isExpanded = expandedActor === u.id
                      return (
                        <React.Fragment key={u.id}>
                          <tr className={`hover:bg-charcoal-50/50 dark:hover:bg-charcoal-900/50 transition-colors ${isExpanded ? 'bg-charcoal-50/80 dark:bg-charcoal-900/80' : ''}`}>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-linear-to-br from-terracotta-400 to-orange-500 text-white flex justify-center items-center font-bold text-xs">
                                  {u.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-medium text-charcoal-900 dark:text-white">{u.username}</p>
                                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">{u.city}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge variant="outline" className="capitalize">
                                {u.role === 'admin' ? 'admin' : (u.kycStatus === 'validated' ? 'Client / Hôte' : 'Client')}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={
                                u.kycStatus === 'validated' ? 'bg-green-100 text-green-800 border-none' :
                                u.kycStatus === 'pending' ? 'bg-purple-100 text-purple-800 border-none animate-pulse' :
                                'bg-charcoal-100 text-charcoal-800 border-none'
                              }>
                                {u.kycStatus === 'validated' ? 'Validé' : u.kycStatus === 'pending' ? 'En attente' : 'Non vérifié'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-charcoal-500 dark:text-charcoal-400">
                              <div>{u.phone || 'Non renseigné'}</div>
                              {u.isSuspended && <Badge className="bg-red-100 text-red-800 border-none mt-1">Suspendu</Badge>}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleToggleUserSuspension(u.id, u.isSuspended)}
                                  className={u.isSuspended ? 'border-green-500 text-green-600 hover:bg-green-50' : 'border-amber-500 text-amber-600 hover:bg-amber-50'}
                                >
                                  {u.isSuspended ? 'Réactiver' : 'Suspendre'}
                                </Button>
                                {u.role !== 'admin' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDeleteUser(u.id)}
                                    className="border-red-500 text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setExpandedActor(isExpanded ? null : u.id)}
                                >
                                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </Button>
                              </div>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr>
                              <td colSpan={5} className="p-0 border-b border-charcoal-100 dark:border-charcoal-800">
                                <div className="bg-charcoal-50/30 dark:bg-charcoal-900/30 p-6">
                                  <h4 className="text-sm font-semibold text-charcoal-900 dark:text-white mb-4">Historique des réservations</h4>
                                  {userContracts.length > 0 ? (
                                    <div className="space-y-3">
                                      {userContracts.map(c => (
                                        <div key={c.id} className="flex justify-between items-center bg-white dark:bg-charcoal-950 p-3 rounded-lg border border-charcoal-100 dark:border-charcoal-800">
                                          <div>
                                            <p className="text-sm font-medium text-charcoal-900 dark:text-white">{getEntityName(c.entityId, c.entityType)}</p>
                                            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                                              {c.date} • {u.role === 'client' ? `Hôte: ${getProviderName(c.providerId)}` : `Invité: ${getClientName(c.clientId)}`}
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <Badge className={c.status === 'Completed' ? 'bg-green-100 text-green-800 border-none' : c.status === 'Active' ? 'bg-blue-100 text-blue-800 border-none' : 'bg-yellow-100 text-yellow-800 border-none'}>
                                              {c.status}
                                            </Badge>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Aucune réservation enregistrée.</p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'logements' && (
          <motion.div key="logements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="border border-charcoal-200 dark:border-charcoal-800 dark:bg-charcoal-900">
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-charcoal-50 dark:bg-charcoal-950/20 text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase">
                    <tr>
                      <th className="px-6 py-4">Propriété</th>
                      <th className="px-6 py-4">Hôte</th>
                      <th className="px-6 py-4">Statut</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-100 dark:divide-charcoal-800 text-sm">
                    {listingsList.map(l => (
                      <tr key={l.id} className="hover:bg-charcoal-50/50 dark:hover:bg-charcoal-900/50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-charcoal-900 dark:text-white">{l.title}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{l.type}</Badge>
                            <span className="text-xs text-charcoal-500">{l.location}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-charcoal-500 dark:text-charcoal-400">{getProviderName(l.hostId)}</td>
                        <td className="px-6 py-4">
                          <Badge className={l.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-charcoal-100 text-charcoal-800'}>{l.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleToggleListingStatus(l.id, l.status)}
                              className="text-xs"
                            >
                              {l.status === 'active' ? 'Désactiver' : 'Activer'}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteListing(l.id)}
                              className="border-red-500 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {housesList.map(h => {
                      const isExpanded = expandedHouse === h.id
                      return (
                        <React.Fragment key={h.id}>
                          <tr className={`hover:bg-charcoal-50/50 dark:hover:bg-charcoal-900/50 transition-colors ${isExpanded ? 'bg-charcoal-50/80 dark:bg-charcoal-900/80' : ''}`}>
                            <td className="px-6 py-4">
                              <p className="font-medium text-charcoal-900 dark:text-white">{h.title}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">Maison (Multi-chambres)</Badge>
                                <span className="text-xs text-charcoal-500">{h.location}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-charcoal-500 dark:text-charcoal-400">{getProviderName(h.hostId)}</td>
                            <td className="px-6 py-4">
                              <Badge className={h.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-charcoal-100 text-charcoal-800'}>{h.status}</Badge>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setExpandedHouse(isExpanded ? null : h.id)}
                                >
                                  Détails {isExpanded ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                                </Button>
                              </div>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr>
                              <td colSpan={4} className="p-0 border-b border-charcoal-100 dark:border-charcoal-800">
                                <div className="bg-charcoal-50/30 dark:bg-charcoal-900/30 p-6 pl-12 border-l-4 border-terracotta-500">
                                  <h4 className="text-sm font-semibold text-charcoal-900 dark:text-white mb-4 flex items-center gap-2"><BedDouble className="h-4 w-4" /> Détails techniques</h4>
                                  <div className="space-y-1 text-xs text-charcoal-600 dark:text-charcoal-450">
                                    <p>Description: {h.description}</p>
                                    <p>Commodités: {h.amenities?.join(', ')}</p>
                                    <p>Coordonnées: {h.lat}, {h.lng}</p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'kyc' && (
          <motion.div key="kyc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="border border-charcoal-200 dark:border-charcoal-800 dark:bg-charcoal-900">
              <CardHeader>
                <CardTitle className="dark:text-white">Demandes de validation d&apos;identité (KYC)</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                {kycRequests.length === 0 ? (
                  <div className="p-8 text-center text-charcoal-500">
                    Aucune demande KYC soumise.
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-charcoal-50 dark:bg-charcoal-950/20 text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase">
                      <tr>
                        <th className="px-6 py-4">Utilisateur</th>
                        <th className="px-6 py-4">Nom Complet Soumis</th>
                        <th className="px-6 py-4">Document</th>
                        <th className="px-6 py-4">Numéro CNI/Passeport</th>
                        <th className="px-6 py-4">Date de soumission</th>
                        <th className="px-6 py-4">Statut</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal-100 dark:divide-charcoal-800 text-sm">
                      {kycRequests.map(r => (
                        <tr key={r.id} className="hover:bg-charcoal-50/50 dark:hover:bg-charcoal-900/50">
                          <td className="px-6 py-4 font-semibold text-charcoal-900 dark:text-white">{r.username}</td>
                          <td className="px-6 py-4 text-charcoal-700 dark:text-charcoal-300">{r.fullName}</td>
                          <td className="px-6 py-4 text-charcoal-500">{r.docType}</td>
                          <td className="px-6 py-4 font-mono text-charcoal-600 dark:text-charcoal-400">{r.docNumber}</td>
                          <td className="px-6 py-4 text-charcoal-500">{new Date(r.submittedAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <Badge className={
                              r.status === 'approved' ? 'bg-green-100 text-green-800 border-none' :
                              r.status === 'rejected' ? 'bg-red-100 text-red-800 border-none' :
                              'bg-purple-100 text-purple-800 border-none animate-pulse'
                            }>
                              {r.status === 'approved' ? 'Validé' : r.status === 'rejected' ? 'Rejeté' : 'En attente'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {r.status === 'pending' ? (
                              <div className="flex justify-end gap-2">
                                <Button 
                                  onClick={() => handleApproveKYC(r.id, r.userId)} 
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-1 px-3 rounded-lg"
                                >
                                  Valider
                                </Button>
                                <Button 
                                  onClick={() => handleRejectKYC(r.id, r.userId)} 
                                  variant="outline"
                                  className="border-red-600 hover:bg-red-50 text-red-600 font-semibold text-xs py-1 px-3 rounded-lg"
                                >
                                  Rejeter
                                </Button>
                              </div>
                            ) : (
                              <span className="text-xs text-charcoal-400">Terminé</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'avis' && (
          <motion.div key="avis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="border border-charcoal-200 dark:border-charcoal-800 dark:bg-charcoal-900">
              <CardHeader>
                <CardTitle className="dark:text-white">Modération des Avis Clients (AC5)</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                {reviewsList.length === 0 ? (
                  <div className="p-8 text-center text-charcoal-500">
                    Aucun avis publié sur la plateforme.
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-charcoal-50 dark:bg-charcoal-950/20 text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase">
                      <tr>
                        <th className="px-6 py-4">Auteur</th>
                        <th className="px-6 py-4">Propriété</th>
                        <th className="px-6 py-4">Note</th>
                        <th className="px-6 py-4">Commentaire</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal-100 dark:divide-charcoal-800 text-sm">
                      {reviewsList.map(r => (
                        <tr key={r.id} className="hover:bg-charcoal-50/50 dark:hover:bg-charcoal-900/50">
                          <td className="px-6 py-4 font-semibold text-charcoal-900 dark:text-white">{r.authorName || 'Anonyme'}</td>
                          <td className="px-6 py-4 text-charcoal-700 dark:text-charcoal-300">{getEntityName(r.targetId, 'listing')}</td>
                          <td className="px-6 py-4">
                            <span className="text-yellow-500 font-bold">★ {r.rating}</span>
                          </td>
                          <td className="px-6 py-4 text-charcoal-600 dark:text-charcoal-400 max-w-xs truncate" title={r.comment}>
                            {r.comment}
                          </td>
                          <td className="px-6 py-4 text-charcoal-500">{new Date(r.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteReview(r.id)}
                              className="border-red-500 text-red-600 hover:bg-red-50"
                            >
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'historique' && (
          <motion.div key="historique" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="border border-charcoal-200 dark:border-charcoal-800 dark:bg-charcoal-900">
              <CardHeader>
                <CardTitle className="dark:text-white">Journal global des réservations et contrats</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-charcoal-50 dark:bg-charcoal-950/20 text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Entité concernée</th>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Propriétaire/Hôte</th>
                      <th className="px-6 py-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-100 dark:divide-charcoal-800 text-sm">
                    {contractsList.map(c => (
                      <tr key={c.id} className="hover:bg-charcoal-50/50 dark:hover:bg-charcoal-900/50">
                        <td className="px-6 py-4 text-charcoal-500 dark:text-charcoal-400 whitespace-nowrap">{c.date}</td>
                        <td className="px-6 py-4 font-medium text-charcoal-900 dark:text-white">{getEntityName(c.entityId, c.entityType)} <span className="text-xs text-charcoal-400 ml-1">({c.entityType})</span></td>
                        <td className="px-6 py-4 text-charcoal-600 dark:text-charcoal-300">{getClientName(c.clientId)}</td>
                        <td className="px-6 py-4 text-charcoal-600 dark:text-charcoal-300">{getProviderName(c.providerId)}</td>
                        <td className="px-6 py-4">
                          <Badge className={c.status === 'Completed' ? 'bg-green-100 text-green-800 border-none dark:bg-green-900/30 dark:text-green-400' : c.status === 'Active' ? 'bg-blue-100 text-blue-800 border-none dark:bg-blue-900/30 dark:text-blue-400' : 'bg-yellow-100 text-yellow-800 border-none dark:bg-yellow-900/30 dark:text-yellow-400'}>
                            {c.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

