'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MessageSquare, ArrowLeft, CheckCircle, Clock, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getReviewsFor, addReview } from '@/lib/ratingUtils'
import { listings } from '@/lib/mockData'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ClientReviewsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [myReviews, setMyReviews] = useState([])
  const [pendingReviews, setPendingReviews] = useState([])
  const [activeTab, setActiveTab] = useState('published')
  const [writingReviewFor, setWritingReviewFor] = useState(null)
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })

  const loadData = useCallback(() => {
    if (!user) return

    // Get all reviews by this user
    const allReviews = JSON.parse(localStorage.getItem('hrs_reviews') || '[]')
    const userReviews = allReviews.filter(r => r.authorId === user.id)
    setMyReviews(userReviews)

    // Get completed reservations that haven't been reviewed yet (IC1: post-séjour only)
    const userResKey = `hrs_reservations_${user.id}`
    const reservations = JSON.parse(localStorage.getItem(userResKey) || '[]')
    const completedNotReviewed = reservations.filter(r => {
      const isCompleted = r.status === 'confirmed' && new Date(r.checkOut) < new Date()
      const hasReview = userReviews.some(rev => String(rev.targetId) === String(r.listingId))
      return isCompleted && !hasReview
    })
    setPendingReviews(completedNotReviewed)
  }, [user])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }
    if (user) loadData()
  }, [user, loading, router, loadData])

  const getListingTitle = (listingId) => {
    const listing = listings.find(l => l.id === listingId)
    return listing?.title || `Hébergement #${listingId}`
  }

  const handleSubmitReview = () => {
    if (!writingReviewFor) return
    if (!reviewForm.comment.trim()) {
      toast.error("Veuillez écrire un commentaire.")
      return
    }

    const review = addReview({
      targetType: 'listing',
      targetId: writingReviewFor.listingId,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      authorId: user.id,
      authorName: user.username,
    })

    toast.success('Avis publié avec succès ! Merci pour votre retour.')
    setWritingReviewFor(null)
    setReviewForm({ rating: 5, comment: '' })
    loadData()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-500" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1.5">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-charcoal-900 dark:text-white flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" /> Mes Avis
            </h1>
            <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-0.5">
              Avis publiés et avis à rédiger après vos séjours
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'published', label: `Avis publiés (${myReviews.length})` },
          { id: 'pending', label: `À rédiger (${pendingReviews.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-terracotta-500 text-white shadow-md'
                : 'bg-white dark:bg-charcoal-900 text-charcoal-600 dark:text-charcoal-400 border border-charcoal-200 dark:border-charcoal-700 hover:border-terracotta-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Published Reviews */}
        {activeTab === 'published' && (
          <motion.div key="published" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {myReviews.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <Star className="h-14 w-14 mx-auto text-charcoal-300 mb-4" />
                  <p className="text-charcoal-500 mb-2">Vous n&apos;avez encore publié aucun avis.</p>
                  <p className="text-xs text-charcoal-400">Les avis ne peuvent être publiés qu&apos;après un séjour terminé (R-M2).</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {myReviews.map(review => (
                  <Card key={review.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-charcoal-900 dark:text-white">
                            {getListingTitle(review.targetId)}
                          </h3>
                          <p className="text-xs text-charcoal-500 mt-1">
                            Publié le {new Date(review.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 font-bold">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-charcoal-300'}`} />
                          ))}
                          <span className="ml-1 text-sm text-charcoal-700 dark:text-charcoal-300">{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-sm text-charcoal-700 dark:text-charcoal-300 mt-3 italic">
                        &quot;{review.comment}&quot;
                      </p>
                      <Badge className="mt-3 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" /> Publié
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Pending Reviews */}
        {activeTab === 'pending' && (
          <motion.div key="pending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {pendingReviews.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <CheckCircle className="h-14 w-14 mx-auto text-green-400 mb-4" />
                  <p className="text-charcoal-500 mb-2">Tous vos séjours terminés ont été évalués !</p>
                  <Link href="/client/search">
                    <Button className="bg-terracotta-500 text-white mt-4">Réserver un nouveau séjour</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingReviews.map(res => (
                  <Card key={res.id} className="border-2 border-yellow-200 dark:border-yellow-900/30 hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-charcoal-900 dark:text-white">
                            {res.title || getListingTitle(res.listingId)}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-charcoal-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {res.checkIn} → {res.checkOut}
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 text-xs flex items-center gap-1">
                          <Clock className="h-3 w-3" /> En attente d&apos;avis
                        </Badge>
                      </div>

                      {writingReviewFor?.id === res.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 space-y-4 bg-charcoal-50 dark:bg-charcoal-800 rounded-xl p-4"
                        >
                          {/* Star Rating */}
                          <div>
                            <label className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-300 mb-2 block">
                              Votre note
                            </label>
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setReviewForm(prev => ({ ...prev, rating: i + 1 }))}
                                  className="transition-transform hover:scale-110"
                                >
                                  <Star className={`h-8 w-8 ${i < reviewForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-charcoal-300'}`} />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Comment */}
                          <div>
                            <label className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-300 mb-2 block">
                              Votre commentaire *
                            </label>
                            <textarea
                              value={reviewForm.comment}
                              onChange={e => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                              placeholder="Décrivez votre expérience..."
                              rows={4}
                              className="w-full rounded-xl border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-charcoal-900 dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 resize-none"
                            />
                          </div>

                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => { setWritingReviewFor(null); setReviewForm({ rating: 5, comment: '' }) }}
                            >
                              Annuler
                            </Button>
                            <Button
                              size="sm"
                              className="bg-terracotta-500 hover:bg-terracotta-600 text-white gap-1"
                              onClick={handleSubmitReview}
                            >
                              <Star className="h-3.5 w-3.5" /> Publier l&apos;avis
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="mt-3">
                          <Button
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white gap-1.5"
                            onClick={() => setWritingReviewFor(res)}
                          >
                            <Star className="h-3.5 w-3.5" /> Rédiger un avis
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
