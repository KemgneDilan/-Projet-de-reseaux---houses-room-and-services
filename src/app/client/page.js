'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  MapPin,
  Star,
  Heart,
  MessageSquare,
  LogOut,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Home,
  Settings,
  X,
  Users,
  Bed,
  ExternalLink,
} from 'lucide-react'
import { listings, houses, rooms } from '@/lib/mockData'
import { getReviewsFor, calculateAverageRating } from '@/lib/ratingUtils'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { useAuth } from '@/app/contexts/AuthContext'
import { useLanguage } from '@/app/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import RatingButton from '@/components/features/RatingButton'


export default function ClientDashboard() {
  const { user, rawUser, logout, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [favorites, setFavorites] = React.useState([])
  const [reservations, setReservations] = React.useState([])
  const [ratingMap, setRatingMap] = React.useState({})
  const [nowTime, setNowTime] = React.useState(Date.now())
  const [selectedReservation, setSelectedReservation] = React.useState(null)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNowTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    if (user) {
      const userKey = `hrs_reservations_${user.id}`
      const saved = JSON.parse(localStorage.getItem(userKey) || '[]')
      setReservations(saved)
    }
  }, [user])

  React.useEffect(() => {
    const loadFavorites = () => {
      // Load favorites from local storage
      const savedFavIds = JSON.parse(localStorage.getItem('hrs_favorites') || '[]')
      const actualFavorites = savedFavIds.map(id => listings.find(l => l.id === id)).filter(Boolean)
      setFavorites(actualFavorites)
    }
    loadFavorites()
  }, [])

  React.useEffect(() => {
    const loadRatings = () => {
      try {
        const map = {}
        listings.forEach(l => {
          const rv = getReviewsFor('listing', l.id)
          const avg = calculateAverageRating(rv.map(r => ({ rating: r.rating })))
          if (avg) map[l.id] = avg
        })
        setRatingMap(map)
      } catch (e) {
        setRatingMap({})
      }
    }
    loadRatings()
  }, [])

  React.useEffect(() => {
    if (!loading && (!user || (user.role !== 'client' && rawUser?.role !== 'admin'))) {
      router.push('/login')
    }
  }, [user, rawUser, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-charcoal-100 text-charcoal-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed':
        return t('res_status_confirmed')
      case 'pending':
        return t('res_status_pending')
      case 'cancelled':
        return t('res_status_cancelled')
      default:
        return status
    }
  }

  if (loading) {
    return <div className="p-8">Chargement…</div>
  }

  if (!user || (user.role !== 'client' && rawUser?.role !== 'admin')) {
    return <div className="p-8">Accès non autorisé</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-charcoal-900 mb-2">
                {t('client_welcome', { name: user.username || 'Client' })}
              </h1>
              <p className="text-charcoal-600">
                {t('client_subtitle')}
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="lg">
                <Settings className="h-5 w-5 mr-2" />
                {t('client_btn_settings')}
              </Button>
              <Button variant="outline" size="lg" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                {t('client_btn_logout')}
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: t('stat_active_reservations'), value: '2', icon: Calendar, color: 'terracotta' },
              { label: t('stat_favorites'), value: favorites.length.toString(), icon: Heart, color: 'red' },
              { label: t('stat_messages'), value: '3', icon: MessageSquare, color: 'blue' },
              { label: t('stat_points'), value: '450', icon: Star, color: 'yellow' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-linear-to-br from-white to-charcoal-50 rounded-xl p-4 border border-charcoal-200 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-charcoal-900">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="reservations" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reservations">{t('tab_reservations')}</TabsTrigger>
            <TabsTrigger value="favoris">{t('tab_favorites')}</TabsTrigger>

          </TabsList>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-charcoal-900">{t('res_title')}</h2>
                <Link href="/client/search">
                  <Button>
                    <Plus className="h-5 w-5 mr-2" />
                    {t('res_new_btn')}
                  </Button>
                </Link>
              </div>

              {reservations.length > 0 ? (
                <div className="space-y-4">
                  {reservations.map((reservation, idx) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-terracotta-500 cursor-pointer"
                      onClick={() => setSelectedReservation(reservation)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-charcoal-900">
                              {reservation.title}
                            </h3>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                              reservation.status === 'confirmed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-charcoal-100 text-charcoal-800 dark:bg-charcoal-850 dark:text-charcoal-350'
                            }`}>
                              {reservation.status === 'confirmed' ? 'Statut : Invité' : 'Statut : Utilisateur'}
                            </span>
                          </div>
                          <p className="text-charcoal-600 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-terracotta-500" />
                            {reservation.location}
                          </p>
                        </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-charcoal-700">
                              <Calendar className="h-5 w-5 text-terracotta-500" />
                              <div>
                                <p className="text-sm text-charcoal-600">{t('res_stay')}</p>
                                <p className="font-semibold">
                                  {new Date(reservation.checkIn).toLocaleDateString("fr-FR")} -{" "}
                                  {new Date(reservation.checkOut).toLocaleDateString("fr-FR")}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between md:justify-end gap-4">
                            {/* 24h countdown for pending reservations */}
                            {reservation.status === 'pending' && reservation.createdAt && (() => {
                              const expiresAt = new Date(reservation.createdAt).getTime() + 24 * 60 * 60 * 1000
                              const remaining = expiresAt - nowTime
                              if (remaining > 0) {
                                const h = Math.floor(remaining / 3600000)
                                const m = Math.floor((remaining % 3600000) / 60000)
                                const s = Math.floor((remaining % 60000) / 1000)
                                return (
                                  <div className="text-center mr-2">
                                    <p className="text-xs text-charcoal-500 mb-1">Réponse de l&apos;hôte dans</p>
                                    <p className="text-lg font-bold text-orange-600 tabular-nums">{h}h {m}m {s}s</p>
                                  </div>
                                )
                              } else {
                                return <p className="text-sm font-semibold text-red-500 mr-2">⌛ Délai expiré</p>
                              }
                            })()}
                           <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(reservation.status)}`}>
                            {getStatusIcon(reservation.status)}
                            {getStatusLabel(reservation.status)}
                          </div>
                        </div>
                      </div>

                      {/* Media Files */}
                      {(reservation.photos?.length > 0 || reservation.video) && (
                        <div className="mt-4 pt-4 border-t border-charcoal-150">
                          <p className="text-xs font-bold text-charcoal-500 uppercase tracking-wider mb-2.5">
                            Médias joints ({reservation.photos?.length || 0} photo{reservation.photos?.length > 1 ? 's' : ''}, {reservation.video ? '1 vidéo' : 'sans vidéo'})
                          </p>
                          <div className="flex flex-wrap gap-3 items-center">
                            {reservation.photos?.map((photo, pIdx) => (
                              <div key={pIdx} className="w-16 h-16 rounded-lg overflow-hidden border border-charcoal-200 bg-charcoal-50 flex items-center justify-center shrink-0 shadow-sm relative group">
                                {photo.data && photo.data !== 'placeholder' ? (
                                  <Image
                                    src={photo.data}
                                    alt={photo.name}
                                    fill
                                    unoptimized
                                    className="object-cover cursor-pointer hover:scale-105 transition-transform"
                                    onClick={() => {
                                      const w = window.open()
                                      w.document.write(`<img src="${photo.data}" style="max-width:100%; max-height:100%; display:block; margin:auto;" />`)
                                    }}
                                  />
                                ) : (
                                  <div className="text-[10px] text-charcoal-400 font-semibold p-1 truncate text-center">
                                    📷 {photo.name}
                                  </div>
                                )}
                              </div>
                            ))}

                            {reservation.video && (
                              <div className="w-40 h-16 rounded-lg overflow-hidden border border-charcoal-200 bg-charcoal-900 flex items-center justify-center shrink-0 shadow-sm relative">
                                {reservation.video.data && reservation.video.data !== 'placeholder' ? (
                                  <video
                                    src={reservation.video.data}
                                    controls
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="text-[9px] text-white p-2 font-semibold text-center truncate">
                                    🎥 {reservation.video.name}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-charcoal-200 flex gap-2 flex-wrap" onClick={e => e.stopPropagation()}>
                        <Link href={`/messages?contact=${reservation.id}`}>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {t('res_contact_host')}
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => setSelectedReservation(reservation)}>
                          {t('res_details')}
                        </Button>
                        {reservation.status === 'confirmed' && (
                          <RatingButton
                            item={{ id: reservation.listingId, title: reservation.title }}
                            type="accommodation"
                            isCompleted={true}
                            onRatingSubmitted={(review) => {
                              console.log('Review submitted:', review)
                            }}
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Home className="h-16 w-16 text-charcoal-300 mx-auto mb-4" />
                  <p className="text-charcoal-600 text-lg mb-6">{t('res_empty_title')}</p>
                  <Link href="/client/search">
                    <Button>
                      {t('res_empty_btn')}
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favoris" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">{t('fav_title')}</h2>

              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((listing, idx) => (
                    <motion.div
                      key={listing.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link href={`/listings/${listing.id}`}>
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden bg-charcoal-100 group">
                            <Image
                              src={listing.image}
                              alt={listing.title}
                              fill
                              unoptimized
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <button className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-red-50 transition-colors">
                              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                            </button>
                          </div>

                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-charcoal-900 mb-1">
                              {listing.title}
                            </h3>
                            <p className="text-sm text-charcoal-600 mb-4 flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-terracotta-500" />
                              {listing.location}
                            </p>

                            <div className="flex items-center gap-2 mb-4">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                 <span className="font-semibold text-charcoal-900">
                                   {(ratingMap[listing.id] || listing.rating || 0).toFixed(1)}
                                 </span>
                                 <span className="text-sm text-charcoal-500">
                                   ({listing.reviews || listing.reviewsCount} {t('fav_reviews')})
                                 </span>
                             </div>
 
                             <p className="text-sm font-semibold text-terracotta-600 mt-auto">
                               Échange communautaire
                             </p>
                          </div>

                          <div className="p-4 border-t border-charcoal-200 flex gap-2">
                            <Button className="flex-1" size="sm">
                              {t('fav_book_now')}
                            </Button>
                            <RatingButton
                              item={{ id: listing.id, title: listing.title }}
                              type="accommodation"
                              isCompleted={true}
                              onRatingSubmitted={(review) => {
                                console.log('Review submitted:', review)
                              }}
                            />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-charcoal-300 mx-auto mb-4" />
                  <p className="text-charcoal-600 text-lg mb-6">
                    {t('fav_empty_title')}
                  </p>
                  <Link href="/client/search">
                    <Button>
                      {t('fav_empty_btn')}
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MessageSquare className="h-16 w-16 text-charcoal-300 mx-auto mb-4" />
              <p className="text-charcoal-600 text-lg">
                {t('messages_empty')}
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>

      {/* ── Modal Détails Réservation ── */}
      <AnimatePresence>
        {selectedReservation && (() => {
          const res = selectedReservation
          const allEntities = [...listings, ...houses, ...rooms]
          const lodge = allEntities.find(l => String(l.id) === String(res.listingId))
          const nights = res.checkIn && res.checkOut
            ? Math.max(1, Math.round((new Date(res.checkOut) - new Date(res.checkIn)) / 86400000))
            : null
          return (
            <motion.div
              key="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/60 backdrop-blur-sm"
              onClick={() => setSelectedReservation(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-charcoal-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Header image */}
                {lodge?.images?.[0] && (
                  <div className="relative h-52 overflow-hidden rounded-t-2xl">
                    <Image src={lodge.images[0]} alt={lodge.title || res.title} fill unoptimized className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-bold text-xl drop-shadow">{res.title}</p>
                      <p className="text-slate-200 text-sm flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {res.location}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedReservation(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}

                <div className="p-6 space-y-6">
                  {/* Sans image : titre + fermer */}
                  {!lodge?.images?.[0] && (
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-charcoal-900 dark:text-white">{res.title}</h2>
                        <p className="text-charcoal-500 text-sm flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" /> {res.location}
                        </p>
                      </div>
                      <button onClick={() => setSelectedReservation(null)} className="p-2 rounded-full hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition">
                        <X className="h-5 w-5 text-charcoal-600" />
                      </button>
                    </div>
                  )}

                  {/* Statut */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(res.status)}`}>
                    {getStatusIcon(res.status)}
                    {getStatusLabel(res.status)}
                  </div>

                  {/* Infos réservation */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-charcoal-950 rounded-xl p-4">
                      <p className="text-xs text-charcoal-500 uppercase tracking-wide font-semibold mb-1">Arrivée</p>
                      <p className="font-bold text-charcoal-900 dark:text-white">{res.checkIn ? new Date(res.checkIn).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' }) : '—'}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-charcoal-950 rounded-xl p-4">
                      <p className="text-xs text-charcoal-500 uppercase tracking-wide font-semibold mb-1">Départ</p>
                      <p className="font-bold text-charcoal-900 dark:text-white">{res.checkOut ? new Date(res.checkOut).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' }) : '—'}</p>
                    </div>
                    {nights && (
                      <div className="bg-slate-50 dark:bg-charcoal-950 rounded-xl p-4">
                        <p className="text-xs text-charcoal-500 uppercase tracking-wide font-semibold mb-1">Durée</p>
                        <p className="font-bold text-charcoal-900 dark:text-white">{nights} nuit{nights > 1 ? 's' : ''}</p>
                      </div>
                    )}
                    <div className="bg-slate-50 dark:bg-charcoal-950 rounded-xl p-4">
                      <p className="text-xs text-charcoal-500 uppercase tracking-wide font-semibold mb-1">Personnes</p>
                      <p className="font-bold text-charcoal-900 dark:text-white flex items-center gap-1">
                        <Users className="h-4 w-4 text-charcoal-500" /> {res.guests || '—'}
                      </p>
                    </div>
                  </div>

                  {/* Infos logement */}
                  {lodge && (
                    <div className="border-t border-charcoal-200 dark:border-charcoal-800 pt-4">
                      <h3 className="font-bold text-charcoal-900 dark:text-white mb-3 flex items-center gap-2">
                        <Bed className="h-5 w-5 text-blue-600" /> Détails du logement
                      </h3>
                      <div className="space-y-2 text-sm text-charcoal-700 dark:text-charcoal-300">
                        {lodge.description && <p className="leading-relaxed">{lodge.description}</p>}
                        {lodge.amenities?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {lodge.amenities.slice(0, 6).map((a, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">{a}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <Link href={`/listings/${lodge.id}`} className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-blue-600 hover:underline">
                        <ExternalLink className="h-4 w-4" /> Voir la fiche complète
                      </Link>
                    </div>
                  )}

                  {/* Médias joints */}
                  {(res.photos?.length > 0 || res.video) && (
                    <div className="border-t border-charcoal-200 dark:border-charcoal-800 pt-4">
                      <h3 className="font-bold text-charcoal-900 dark:text-white mb-3">Médias joints à la réservation</h3>
                      <div className="flex flex-wrap gap-3">
                        {res.photos?.map((photo, pIdx) => (
                          <div key={pIdx} className="w-16 h-16 rounded-lg overflow-hidden border border-charcoal-200 relative shadow-sm">
                            {photo.data && photo.data !== 'placeholder' ? (
                              <Image src={photo.data} alt={photo.name} fill unoptimized className="object-cover cursor-pointer" onClick={() => { const w = window.open(); w.document.write(`<img src="${photo.data}" style="max-width:100%;display:block;margin:auto;">`) }} />
                            ) : (
                              <div className="text-[10px] text-charcoal-400 p-1 truncate text-center">📷 {photo.name}</div>
                            )}
                          </div>
                        ))}
                        {res.video && (
                          <div className="w-40 h-16 rounded-lg overflow-hidden border border-charcoal-200 bg-charcoal-900 relative shadow-sm">
                            {res.video.data && res.video.data !== 'placeholder' ? (
                              <video src={res.video.data} controls className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-[9px] text-white p-2 font-semibold text-center">🎥 {res.video.name}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Date de création */}
                  {res.createdAt && (
                    <p className="text-xs text-charcoal-400 text-right">
                      Réservation créée le {new Date(res.createdAt).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
      </div>
  )
}
