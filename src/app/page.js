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
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-charcoal-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 pt-16">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-charcoal-900/60 to-charcoal-955/85 z-10" />

        {/* Floating Light Beams */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none z-10 animate-pulse" />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-blue-500/10 backdrop-blur-md border border-blue-400/20 rounded-full shadow-lg"
          >
            <span className="text-blue-200 text-sm font-semibold tracking-wide flex items-center gap-1.5">
               {t('home_welcome_badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-300 mb-6 tracking-tight leading-[1.08] drop-shadow-sm"
            style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
          >
            {t('home_hero_title1')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-blue-100/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-light tracking-wide"
          >
            {t('home_hero_title2')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
          >
            <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white h-12 px-8 shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] duration-200"
            >
              {t('home_cta_start')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold transition-all border border-white/35 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 h-12 px-8 hover:scale-[1.02] active:scale-[0.98] duration-200 shadow-sm"
            >
              {t('home_cta_learn')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-25 -mt-16 mx-4 max-w-7xl lg:mx-auto w-[calc(100%-2rem)] lg:w-full">
        <div className="bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-205/50 dark:border-charcoal-800 p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y-0 md:divide-x divide-slate-100 dark:divide-charcoal-800/85">
            {[
              { number: "25+", label: t('home_stats_listings') },
              { number: "50K+", label: t('home_stats_users') },
              { number: "1000+", label: t('home_stats_providers') },
              { number: "4.8★", label: t('home_stats_rating') },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="px-2"
              >
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </p>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-slate-50 dark:bg-charcoal-950 relative overflow-hidden">
        {/* Glow behind section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[400px] bg-blue-500/5 dark:bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block mb-4 text-xs font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-4 py-1.5 rounded-full border border-blue-200/60 dark:border-blue-800/50">
              ✦ Fonctionnalités
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-5 tracking-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
              {t('home_features_title')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              {t('home_features_subtitle')}
            </p>
          </motion.div>

          <div className="overflow-hidden relative w-full py-6">
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-charcoal-950 dark:via-charcoal-950/80 dark:to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent dark:from-charcoal-950 dark:via-charcoal-950/80 dark:to-transparent z-10 pointer-events-none" />

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
                
                const getColorClasses = (color) => {
                  switch (color) {
                    case 'terracotta': return 'bg-sky-50 dark:bg-sky-950/45 text-sky-600 dark:text-sky-400';
                    case 'green': return 'bg-emerald-50 dark:bg-emerald-950/45 text-emerald-600 dark:text-emerald-400';
                    case 'yellow': return 'bg-amber-50 dark:bg-amber-950/45 text-amber-600 dark:text-amber-400';
                    case 'blue': return 'bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-400';
                    case 'purple': return 'bg-violet-50 dark:bg-violet-950/45 text-violet-600 dark:text-violet-400';
                    case 'orange': return 'bg-orange-50 dark:bg-orange-950/45 text-orange-600 dark:text-orange-400';
                    default: return 'bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-400';
                  }
                };

                return [...features, ...features].map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 dark:bg-charcoal-900/90 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-150/80 dark:border-charcoal-800 w-[350px] md:w-[400px] shrink-0 whitespace-normal flex flex-col group relative overflow-hidden"
                  >
                    <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-3xs ${getColorClasses(feature.color)}`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{feature.title}</h3>
                    <p className="text-slate-550 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ));
              })()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-28 bg-white dark:bg-charcoal-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block mb-4 text-xs font-bold tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-1.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/50">
              ✦ Logements en vedette
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-5 tracking-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
              {t('home_listings_title')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              {t('home_listings_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredListings.map((listing, idx) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
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
            className="mt-16 text-center"
          >
            <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all border border-slate-350 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-slate-700 dark:text-slate-355 hover:bg-slate-50 dark:hover:bg-charcoal-800 h-12 px-8 hover:scale-[1.02] active:scale-[0.98] duration-200 shadow-sm"
            >
              {t('home_listings_explore')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section : Logements avec expériences intégrées */}
      <section className="py-28 bg-slate-50 dark:bg-charcoal-950 relative border-t border-slate-100 dark:border-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block mb-4 text-xs font-bold tracking-[0.2em] uppercase text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-4 py-1.5 rounded-full border border-sky-200/60 dark:border-sky-800/50">
              ✦ Expériences communautaires
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-5 tracking-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
              {t('home_exp_title')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              {t('home_exp_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {listings.slice(0, 3).filter(l => l.communityServices?.length > 0).map((listing, idx) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-charcoal-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-150/80 dark:border-charcoal-800 group flex flex-col"
              >
                <div className="h-52 overflow-hidden bg-charcoal-200 dark:bg-charcoal-800 relative">
                  <Image
                    src={listing.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'}
                    alt={listing.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                      🤝 {listing.communityServices.length} expérience{listing.communityServices.length > 1 ? 's' : ''} offertes
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-slate-850 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{listing.title}</h3>
                    <p className="text-xs text-slate-455 dark:text-slate-400 mb-5 flex items-center gap-1">
                      <span>📍</span> {listing.location}
                    </p>
                    <ul className="space-y-3">
                      {listing.communityServices.map(cs => (
                        <li key={cs.id} className="text-sm text-slate-650 dark:text-slate-350 flex items-start gap-2.5 bg-slate-50 dark:bg-charcoal-950 p-2.5 rounded-xl border border-slate-100/50 dark:border-charcoal-850 shadow-3xs">
                          <span className="text-blue-500 dark:text-blue-400 text-xs mt-0.5">✔</span>
                          <span className="font-medium line-clamp-1">{cs.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-650 hover:to-indigo-550 text-white h-12 px-8 shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] duration-200"
            >
              {t('home_exp_cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-28 bg-white dark:bg-charcoal-900 border-t border-slate-100 dark:border-charcoal-800 relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block mb-4 text-xs font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-4 py-1.5 rounded-full border border-blue-200/60 dark:border-blue-800/50">
              ✦ Comment ça marche
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
              {t('home_howto_title')}
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
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
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-slate-50/50 dark:bg-charcoal-950/40 backdrop-blur-xs rounded-2xl p-8 border border-slate-200/40 dark:border-charcoal-800/80 shadow-2xs hover:shadow-md transition-all duration-300 relative group text-center flex flex-col items-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 text-blue-700 dark:text-blue-300 font-extrabold text-2xl mb-6 shadow-xs group-hover:scale-110 transition-transform duration-300 border border-blue-100/30 dark:border-blue-900/30">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-850 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-slate-550 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Rich blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=20')] bg-cover bg-center opacity-5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-6 text-xs font-bold tracking-[0.2em] uppercase text-blue-200 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
              ✦ Rejoindre la communauté
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight leading-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
              {t('home_cta_title')}
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {t('home_cta_subtitle')}
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-bold transition-all bg-white text-blue-700 hover:bg-blue-50 h-14 px-10 shadow-xl shadow-blue-900/30 hover:scale-[1.03] active:scale-[0.98] duration-200"
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
