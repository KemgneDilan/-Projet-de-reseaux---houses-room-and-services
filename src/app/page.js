"use client"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Zap,
  Globe,
  Users,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ListingCard } from "@/components/features/ListingCard"
import { listings } from "@/lib/mockData"
import { useLanguage } from "@/app/contexts/LanguageContext"

export default function Home() {
  const { t } = useLanguage()
  const featuredListings = listings.slice(0, 6)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal-900/70 via-charcoal-900/60 to-charcoal-900/50 z-10" />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 bg-terracotta-500/20 border border-terracotta-400/40 rounded-full"
          >
            <span className="text-terracotta-300 text-sm font-semibold">
              ✨ {t('home_welcome_badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-sm"
          >
            {t('home_hero_title1')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-charcoal-100 mb-12 max-w-2xl mx-auto drop-shadow-sm"
          >
            {t('home_hero_title2')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold transition-all duration-200 bg-gradient-to-r from-terracotta-500 to-orange-500 text-white shadow-xl hover:shadow-2xl hover:from-terracotta-600 hover:to-orange-600 active:shadow-md h-14 px-10"
            >
              {t('home_cta_start')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold transition-all duration-200 border-2 border-charcoal-300 bg-white text-charcoal-700 hover:bg-charcoal-50 hover:border-charcoal-400 active:bg-charcoal-100 h-14 px-10"
            >
              {t('home_cta_learn')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "25+", label: t('home_stats_listings') },
              { number: "50K+", label: t('home_stats_users') },
              { number: "1000+", label: t('home_stats_providers') },
              { number: "4.8★", label: t('home_stats_rating') },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="text-4xl font-bold text-terracotta-600 mb-2">
                  {stat.number}
                </p>
                <p className="text-charcoal-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-linear-to-b from-charcoal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-charcoal-900 mb-4">
              {t('home_features_title')}
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto text-lg">
              {t('home_features_subtitle')}
            </p>
          </motion.div>

          <div className="overflow-hidden relative w-full py-4">
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-charcoal-50 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-charcoal-50 to-transparent z-10" />

            {/* Défilement continu horizontal (Marquee) */}
            <motion.div
              className="flex gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            >
              {(() => {
                const features = [
                  { icon: MapPin, title: t('home_feature1_title'), description: t('home_feature1_desc'), color: "terracotta" },
                  { icon: ShieldCheck, title: t('home_feature2_title'), description: t('home_feature2_desc'), color: "green" },
                  { icon: Zap, title: t('home_feature3_title'), description: t('home_feature3_desc'), color: "yellow" },
                  { icon: Globe, title: t('home_feature4_title'), description: t('home_feature4_desc'), color: "blue" },
                  { icon: Users, title: t('home_feature5_title'), description: t('home_feature5_desc'), color: "purple" },
                  { icon: TrendingUp, title: t('home_feature6_title'), description: t('home_feature6_desc'), color: "orange" }
                ];
                return [...features, ...features].map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-charcoal-900 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-charcoal-100 dark:border-charcoal-800 w-[350px] md:w-[400px] shrink-0 whitespace-normal"
                  >
                    <div className={`w-14 h-14 rounded-lg mb-4 flex items-center justify-center bg-${feature.color}-100 dark:bg-${feature.color}-900/30`}>
                      <feature.icon className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-charcoal-600 dark:text-charcoal-400">{feature.description}</p>
                  </div>
                ));
              })()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-charcoal-900 mb-4">
              {t('home_listings_title')}
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              {t('home_listings_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing, idx) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ListingCard
                  {...listing}
                  onFavorite={(id, fav) =>
                    console.log(`Listing ${id} favorited: ${fav}`)
                  }
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold transition-all duration-200 border-2 border-terracotta-300 bg-white text-terracotta-700 shadow-sm hover:bg-terracotta-50 hover:border-terracotta-400 active:bg-terracotta-100 h-12 px-8"
            >
              {t('home_listings_explore')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section : Logements avec expériences intégrées */}
      <section className="py-24 bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-charcoal-900 mb-4">
              {t('home_exp_title')}
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              {t('home_exp_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {listings.slice(0, 3).filter(l => l.communityServices?.length > 0).map((listing, idx) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-charcoal-100 group"
              >
                <div className="h-44 overflow-hidden bg-charcoal-200 relative">
                  <Image
                    src={listing.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'}
                    alt={listing.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-terracotta-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {listing.communityServices.length} expérience{listing.communityServices.length > 1 ? 's' : ''} offertes
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-charcoal-900 mb-2 line-clamp-1">{listing.title}</h3>
                  <p className="text-xs text-charcoal-500 mb-3">📍 {listing.location}</p>
                  <ul className="space-y-1.5">
                    {listing.communityServices.map(cs => (
                      <li key={cs.id} className="text-sm text-charcoal-700 flex items-start gap-2">
                        <span className="text-terracotta-500 mt-0.5">🤝</span>
                        <span className="line-clamp-1">{cs.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold transition-all duration-200 bg-gradient-to-r from-terracotta-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:from-terracotta-600 hover:to-orange-600 active:shadow-md h-12 px-8"
            >
              {t('home_exp_cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 bg-charcoal-50 border-t border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-charcoal-900 mb-4">
              {t('home_howto_title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: t('home_step1_title'),
                description: t('home_step1_desc'),
              },
              {
                step: "2",
                title: t('home_step2_title'),
                description: t('home_step2_desc'),
              },
              {
                step: "3",
                title: t('home_step3_title'),
                description: t('home_step3_desc'),
              },
              {
                step: "4",
                title: t('home_step4_title'),
                description: t('home_step4_desc'),
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta-500 text-white font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-charcoal-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-r from-charcoal-900 to-charcoal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-terracotta-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('home_cta_title')}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {t('home_cta_subtitle')}
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold transition-all duration-200 bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white h-14 px-10"
            >
              {t('home_cta_start')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
