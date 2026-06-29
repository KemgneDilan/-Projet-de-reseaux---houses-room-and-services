"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, SlidersHorizontal } from "lucide-react"
import { SearchBar } from "@/components/features/SearchBar"
import { ListingCard } from "@/components/features/ListingCard"
import { Button } from "@/components/ui/Button"
import { listings } from "@/lib/mockData"
import { getReviewsFor, calculateAverageRating } from '@/lib/ratingUtils'
import { useAuth } from "@/app/contexts/AuthContext"

// Compute ratingMap once at module level from localStorage (client-side only)
function buildRatingMap() {
  if (typeof window === 'undefined') return {}
  const map = {}
  listings.forEach(l => {
    try {
      const rv = getReviewsFor('listing', l.id)
      const avg = calculateAverageRating(rv.map(r => ({ rating: r.rating })))
      if (avg) map[l.id] = avg
    } catch {}
  })
  return map
}

function keywordMatch(listing, query) {
  if (!query || !query.trim()) return true
  const keywords = query.toLowerCase().split(/\s+/).filter(Boolean)
  const text = [
    listing.title,
    listing.description,
    listing.location,
    listing.city,
    listing.type,
    ...(listing.amenities || []),
    ...(listing.communityServices || []).map(cs => cs.title + ' ' + cs.description),
  ].join(' ').toLowerCase()
  return keywords.some(kw => text.includes(kw))
}

export default function ClientSearchPage() {
  const { user } = useAuth()
  // Build ratingMap once on mount (single batch of localStorage reads)
  const [ratingMap, setRatingMap] = React.useState({})
  const [query, setQuery] = React.useState("")
  const [filters, setFilters] = React.useState({ rating: 0, type: '', city: '' })
  const [showFilters, setShowFilters] = React.useState(false)

  React.useEffect(() => {
    setRatingMap(buildRatingMap())
  }, [])

  // Live search: update query immediately (data is local, no delay needed)
  const handleSearch = (params) => {
    setQuery(params.q ?? "")
  }

  const cities = [...new Set(listings.map(l => l.city))].sort()
  const types = [...new Set(listings.map(l => l.type))].sort()

  const results = React.useMemo(() => {
    return listings.filter(listing => {
      const avgRating = ratingMap[listing.id] || listing.rating || 0
      const matchRating = !filters.rating || avgRating >= filters.rating
      const matchCity = !filters.city || listing.city === filters.city
      const matchType = !filters.type || listing.type === filters.type
      const matchKeyword = keywordMatch(listing, query)
      return matchRating && matchCity && matchType && matchKeyword
    })
  }, [query, filters, ratingMap])

  const activeFilterCount = [filters.rating > 0, filters.city, filters.type].filter(Boolean).length

  return (
    <div className="min-h-screen bg-charcoal-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 pt-6">
          <h1 className="text-3xl font-bold text-charcoal-900 mb-1">Découvrez des logements conviviaux</h1>
          <p className="text-charcoal-500">Des maisons d'hôtes uniques où partager des moments inoubliables</p>
        </motion.div>

        {/* Search + Filters toolbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-charcoal-100 p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} className="w-full" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors shrink-0 text-sm font-medium ${
              showFilters || activeFilterCount > 0
                ? 'bg-terracotta-500 text-white border-terracotta-500'
                : 'bg-white text-charcoal-700 border-charcoal-200 hover:bg-charcoal-50'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtres
            {activeFilterCount > 0 && (
              <span className="ml-1 bg-white text-terracotta-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-charcoal-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-charcoal-900 flex items-center gap-2">
                    <Filter className="h-4 w-4 text-terracotta-500" />
                    Affiner la recherche
                  </h3>
                  <button
                    onClick={() => setFilters({ rating: 0, type: '', city: '' })}
                    className="text-xs text-terracotta-600 hover:underline font-medium"
                  >
                    Réinitialiser
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Note minimale */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-2">Note minimale</label>
                    <div className="flex gap-2 flex-wrap">
                      {[0, 3, 4, 4.5].map(r => (
                        <button
                          key={r}
                          onClick={() => setFilters(f => ({ ...f, rating: r }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            filters.rating === r
                              ? 'bg-terracotta-500 text-white'
                              : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
                          }`}
                        >
                          {r === 0 ? 'Tous' : `≥ ${r} ★`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ville */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-2">Ville</label>
                    <select
                      value={filters.city}
                      onChange={e => setFilters(f => ({ ...f, city: e.target.value }))}
                      className="w-full rounded-lg border border-charcoal-200 px-3 py-2 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-terracotta-400 bg-white"
                    >
                      <option value="">Toutes les villes</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-2">Type de logement</label>
                    <select
                      value={filters.type}
                      onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
                      className="w-full rounded-lg border border-charcoal-200 px-3 py-2 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-terracotta-400 bg-white"
                    >
                      <option value="">Tous les types</option>
                      {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-charcoal-600 text-sm">
            <span className="font-bold text-charcoal-900">{results.length}</span> logement{results.length !== 1 ? 's' : ''} trouvé{results.length !== 1 ? 's' : ''}
            {query && <span className="ml-1">pour &laquo; <span className="font-semibold text-terracotta-600">{query}</span> &raquo;</span>}
          </p>
          {query && (
            <button
              onClick={() => { setQuery(""); handleSearch({ q: "" }) }}
              className="flex items-center gap-1 text-xs text-charcoal-500 hover:text-charcoal-700"
            >
              <X className="h-3.5 w-3.5" /> Effacer la recherche
            </button>
          )}
        </div>

        {/* No loading state needed — all data is local and instant */}

        {/* Results Grid */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((listing, idx) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.04, 0.3) }}
              >
                {/* Pass pre-computed avgRating to avoid per-card localStorage reads */}
                <ListingCard {...listing} avgRating={ratingMap[listing.id] || listing.rating} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {results.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-2">Aucun logement trouvé</h3>
            <p className="text-charcoal-500 mb-6 max-w-sm">
              Essayez avec d&apos;autres mots-clés ou réinitialisez les filtres.
            </p>
            <Button onClick={() => { setQuery(""); setFilters({ rating: 0, type: '', city: '' }) }}>
              Voir tous les logements
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
