"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function SearchBar({ onSearch, isLoading = false, className = "" }) {
  const [query, setQuery] = React.useState("")
  const debounceRef = React.useRef(null)

  // Debounced live search: fires 150ms after the user stops typing
  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onSearch({ q: value.trim() })
    }, 150)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearTimeout(debounceRef.current)
    onSearch({ q: query.trim() })
  }

  // Cleanup on unmount
  React.useEffect(() => () => clearTimeout(debounceRef.current), [])

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className={`flex items-center gap-3 ${className}`}
    >
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Recherche instantanée…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-charcoal-200 bg-white text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-transparent transition-all text-sm"
        />
      </div>
      <Button
        type="submit"
        size="sm"
        className="rounded-xl px-5 shrink-0"
      >
        <Search className="mr-1.5 h-4 w-4" />
        Rechercher
      </Button>
    </motion.form>
  )
}
