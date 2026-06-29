'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock, 
  XCircle,
  ArrowRight,
  Info,
  User,
  Home,
  Star
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'
import Link from 'next/link'

const KYC_STEPS = [
  { id: 1, label: 'Identité vérifiée', icon: User },
  { id: 2, label: 'Logement enregistré', icon: Home },
  { id: 3, label: 'Badge Hôte actif', icon: Star },
]

function KycStatusCard({ status, submittedAt, rejectionReason }) {
  if (status === 'pending') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-3xl p-8 text-center"
      >
        <Clock className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-2">
          Demande en cours d&apos;examen
        </h2>
        <p className="text-yellow-700 dark:text-yellow-400 mb-4">
          Notre équipe examine votre dossier. Vous serez notifié dès la décision.
        </p>
        {submittedAt && (
          <Badge className="bg-yellow-100 text-yellow-700 text-sm">
            Soumis le {new Date(submittedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Badge>
        )}
      </motion.div>
    )
  }

  if (status === 'approved' || status === 'validated') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-3xl p-8 text-center"
      >
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
          Vous êtes Hôte Loomdaah ! 🎉
        </h2>
        <p className="text-green-700 dark:text-green-400 mb-6">
          Votre identité a été vérifiée. Vous pouvez maintenant publier des annonces et accueillir des invités.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/host">
            <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <Home className="h-4 w-4" /> Accéder à mon espace Hôte
            </Button>
          </Link>
          <Link href="/host/listings/new">
            <Button variant="outline" className="border-green-300 text-green-700 gap-2">
              Créer ma première annonce <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  if (status === 'rejected') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-3xl p-8 text-center"
      >
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-2">
          Demande rejetée
        </h2>
        {rejectionReason && (
          <div className="bg-red-100 dark:bg-red-900/30 rounded-xl p-4 mb-4 text-left">
            <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">Motif de rejet :</p>
            <p className="text-red-600 dark:text-red-400">{rejectionReason}</p>
          </div>
        )}
        <p className="text-red-700 dark:text-red-400 mb-6">
          Vous pouvez soumettre une nouvelle demande avec les documents corrigés.
        </p>
      </motion.div>
    )
  }

  return null
}

export default function KycPage() {
  const { user, updateUser, loading } = useAuth()
  const router = useRouter()
  const [kycStatus, setKycStatus] = useState(null)
  const [kycRequest, setKycRequest] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    docType: "Carte Nationale d'Identité",
    docNumber: '',
    agreeTos: false,
    docFiles: [],        // Array of { name, type, data (base64) }
    docPreviews: [],     // Array of data URLs for previews
  })

  const loadKycStatus = useCallback(() => {
    if (!user) return
    const requests = JSON.parse(localStorage.getItem('hrs_kyc_requests') || '[]')
    const userRequest = requests.find(r => r.userId === user.id)
    if (userRequest) {
      setKycRequest(userRequest)
      setKycStatus(userRequest.status)
    } else if (user.kycStatus && user.kycStatus !== 'none') {
      setKycStatus(user.kycStatus)
    } else {
      setKycStatus('none')
    }
  }, [user])

  const handleDocFilesChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    // Limit to 3 files, max 3MB each
    const allowed = files.slice(0, 3)
    const readers = allowed.map(file => new Promise((resolve) => {
      if (file.size > 3 * 1024 * 1024) {
        toast.error(`Le fichier "${file.name}" dépasse 3 Mo.`)
        resolve(null)
        return
      }
      const reader = new FileReader()
      reader.onload = (ev) => resolve({ name: file.name, type: file.type, data: ev.target.result })
      reader.readAsDataURL(file)
    }))
    Promise.all(readers).then(results => {
      const valid = results.filter(Boolean)
      setFormData(prev => ({
        ...prev,
        docFiles: valid,
        docPreviews: valid.map(f => f.data)
      }))
    })
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
    if (user) {
      loadKycStatus()
    }
  }, [user, loading, router, loadKycStatus])

  const handleSubmit = async () => {
    if (!formData.fullName.trim()) {
      toast.error("Veuillez entrer votre nom complet.")
      return
    }
    if (!formData.docNumber.trim()) {
      toast.error("Veuillez entrer le numéro de votre document.")
      return
    }
    if (!formData.docFiles || formData.docFiles.length === 0) {
      toast.error("Veuillez joindre au moins une photo de votre pièce d'identité.")
      return
    }
    if (!formData.agreeTos) {
      toast.error("Vous devez accepter les conditions d'utilisation.")
      return
    }

    // Create the KYC request
    const newRequest = {
      id: `kyc_${Date.now()}`,
      userId: user.id,
      username: user.username,
      fullName: formData.fullName,
      docType: formData.docType,
      docNumber: formData.docNumber,
      documents: formData.docFiles,  // Array of { name, type, data } en Base64
      status: 'pending',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      rejectionReason: null
    }

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('hrs_kyc_requests') || '[]')
    // Remove old requests from same user
    const filtered = existing.filter(r => r.userId !== user.id)
    filtered.push(newRequest)
    localStorage.setItem('hrs_kyc_requests', JSON.stringify(filtered))

    // Update user kycStatus
    updateUser({ kycStatus: 'pending' })

    setKycStatus('pending')
    setKycRequest(newRequest)
    setSubmitted(true)
    toast.success('Demande KYC soumise ! Notre équipe vous contactera sous 24-48h.')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-500" />
      </div>
    )
  }

  if (!user) return null

  // If already a validated host
  if (user.kycStatus === 'validated') {
    return (
      <div className="min-h-screen bg-charcoal-50 dark:bg-charcoal-950 pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-charcoal-900 dark:text-white mb-3">Vous êtes déjà Hôte !</h1>
          <p className="text-charcoal-600 dark:text-charcoal-400 mb-6">
            Votre compte est déjà validé comme hôte sur Loomdaah. Accédez directement à votre espace.
          </p>
          <Link href="/host">
            <Button className="gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-3 rounded-full text-lg">
              <Home className="h-5 w-5" /> Mon Espace Hôte
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal-50 dark:bg-charcoal-950 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-terracotta-500 to-orange-500 shadow-lg mb-6">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-charcoal-900 dark:text-white mb-3">
            Devenir Hôte Loomdaah
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-400 max-w-xl mx-auto">
            Vérifiez votre identité pour débloquer le mode Hôte et commencer à accueillir des invités.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          {KYC_STEPS.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow transition-all ${
                  kycStatus === 'validated' || kycStatus === 'approved'
                    ? 'bg-green-500 text-white' 
                    : kycStatus === 'pending' && idx === 0
                    ? 'bg-yellow-400 text-white'
                    : idx === 0
                    ? 'bg-terracotta-500 text-white'
                    : 'bg-charcoal-200 dark:bg-charcoal-700 text-charcoal-500'
                }`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-charcoal-600 dark:text-charcoal-400 text-center hidden sm:block">
                  {s.label}
                </span>
              </div>
              {idx < KYC_STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 max-w-[60px] ${
                  kycStatus === 'validated' || kycStatus === 'approved' ? 'bg-green-400' : 'bg-charcoal-200 dark:bg-charcoal-700'
                }`} />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Status Cards for existing requests */}
        <AnimatePresence mode="wait">
          {kycStatus && kycStatus !== 'none' && !submitted && (
            <motion.div key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <KycStatusCard 
                status={kycStatus}
                submittedAt={kycRequest?.submittedAt}
                rejectionReason={kycRequest?.rejectionReason}
              />
              {kycStatus === 'rejected' && (
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => { setKycStatus('none'); setSubmitted(false) }}
                    className="bg-terracotta-500 hover:bg-terracotta-600 text-white gap-2"
                  >
                    Soumettre une nouvelle demande
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {(kycStatus === 'none' || submitted) && (
            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {submitted ? (
                <KycStatusCard 
                  status="pending"
                  submittedAt={new Date().toISOString()}
                />
              ) : (
                <div className="space-y-6">
                  {/* Benefits Card */}
                  <Card className="border-2 border-terracotta-100 dark:border-terracotta-900/30 bg-white dark:bg-charcoal-900">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-terracotta-600">
                        <Info className="h-5 w-5" /> Pourquoi la vérification KYC ?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { emoji: '🛡️', title: 'Confiance', desc: 'Rassurez vos futurs invités avec un profil certifié.' },
                          { emoji: '🏠', title: 'Publier des annonces', desc: 'Accédez à la création de maisons et chambres.' },
                          { emoji: '💬', title: 'Mode Hôte', desc: 'Basculez librement entre vos rôles Client et Hôte.' },
                        ].map(b => (
                          <div key={b.title} className="bg-charcoal-50 dark:bg-charcoal-800 rounded-2xl p-4 text-center">
                            <div className="text-3xl mb-2">{b.emoji}</div>
                            <p className="font-semibold text-charcoal-900 dark:text-white text-sm">{b.title}</p>
                            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">{b.desc}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Document Form */}
                  <Card className="border-2 border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-900">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-terracotta-500" />
                        Soumettre vos informations d&apos;identité
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Full Name */}
                      <div>
                        <label className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-300 mb-2 block">
                          Nom complet *
                        </label>
                        <Input
                          value={formData.fullName}
                          onChange={e => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Ex: Jean-Pierre Ndam"
                          className="rounded-xl"
                        />
                      </div>

                      {/* Doc type selector */}
                      <div>
                        <label className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-300 mb-3 block">
                          Type de document
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { value: "Carte Nationale d'Identité", label: "Carte Nationale d'Identité" },
                            { value: 'Passeport', label: 'Passeport' },
                            { value: 'Permis de Séjour', label: 'Permis de Séjour' },
                          ].map(opt => (
                            <button
                              key={opt.value}
                              onClick={() => setFormData(prev => ({ ...prev, docType: opt.value }))}
                              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                                formData.docType === opt.value
                                  ? 'border-terracotta-500 bg-terracotta-50 dark:bg-terracotta-900/20 text-terracotta-700 dark:text-terracotta-300'
                                  : 'border-charcoal-200 dark:border-charcoal-700 text-charcoal-600 dark:text-charcoal-400 hover:border-terracotta-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Doc Number */}
                      <div>
                        <label className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-300 mb-2 block">
                          Numéro du document *
                        </label>
                        <Input
                          value={formData.docNumber}
                          onChange={e => setFormData(prev => ({ ...prev, docNumber: e.target.value }))}
                          placeholder="Ex: 123456789"
                          className="rounded-xl font-mono"
                        />
                      </div>

                      {/* Upload pièces d'identité */}
                      <div>
                        <label className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-300 mb-2 block">
                          Photo(s) de votre pièce d&apos;identité * <span className="text-xs font-normal text-charcoal-400">(recto, verso — max 3 Mo chacune)</span>
                        </label>
                        <label
                          htmlFor="kyc-doc-upload"
                          className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-charcoal-300 dark:border-charcoal-600 hover:border-terracotta-400 dark:hover:border-terracotta-500 rounded-2xl p-6 cursor-pointer bg-charcoal-50/50 dark:bg-charcoal-800/50 transition-colors group"
                        >
                          <Upload className="h-8 w-8 text-charcoal-400 dark:text-charcoal-500 group-hover:text-terracotta-500 transition-colors" />
                          <div className="text-center">
                            <p className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Cliquez pour s&apos;léctionner vos fichiers</p>
                            <p className="text-xs text-charcoal-400 mt-1">JPG, PNG ou PDF — jusqu&apos;à 3 fichiers</p>
                          </div>
                          <input
                            id="kyc-doc-upload"
                            type="file"
                            accept="image/*,application/pdf"
                            multiple
                            onChange={handleDocFilesChange}
                            className="hidden"
                          />
                        </label>

                        {/* Prévisualisation des fichiers sélectionnés */}
                        {formData.docFiles.length > 0 && (
                          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {formData.docFiles.map((doc, idx) => (
                              <div key={idx} className="relative group rounded-xl border border-charcoal-200 dark:border-charcoal-700 overflow-hidden bg-white dark:bg-charcoal-900 shadow-sm">
                                {doc.type?.startsWith('image/') ? (
                                  <img
                                    src={doc.data}
                                    alt={doc.name}
                                    className="w-full h-24 object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-24 flex flex-col items-center justify-center gap-1 bg-blue-50 dark:bg-blue-950/30">
                                    <FileText className="h-8 w-8 text-blue-500" />
                                    <span className="text-[10px] text-blue-700 dark:text-blue-300 font-medium px-1 truncate w-full text-center">{doc.name}</span>
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={() => setFormData(prev => ({
                                    ...prev,
                                    docFiles: prev.docFiles.filter((_, i) => i !== idx),
                                    docPreviews: prev.docPreviews.filter((_, i) => i !== idx)
                                  }))}
                                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <XCircle className="h-3 w-3" />
                                </button>
                                <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400 px-2 py-1 truncate">{doc.name}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* ToS Checkbox */}
                      <div className="flex items-start gap-3 bg-charcoal-50 dark:bg-charcoal-800 rounded-xl p-4">
                        <input
                          id="tos-check"
                          type="checkbox"
                          checked={formData.agreeTos}
                          onChange={e => setFormData(prev => ({ ...prev, agreeTos: e.target.checked }))}
                          className="mt-1 h-4 w-4 accent-terracotta-500 rounded cursor-pointer"
                        />
                        <label htmlFor="tos-check" className="text-sm text-charcoal-600 dark:text-charcoal-400 cursor-pointer">
                          J&apos;atteste que les informations fournies sont authentiques et m&apos;appartiennent. 
                          J&apos;accepte les{' '}
                          <Link href="/about" className="text-terracotta-500 hover:underline">
                            conditions d&apos;utilisation
                          </Link>{' '}
                          de Loomdaah.
                        </label>
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmit}
                        disabled={!formData.fullName.trim() || !formData.docNumber.trim() || !formData.agreeTos || formData.docFiles.length === 0}
                        className="w-full bg-gradient-to-r from-terracotta-500 to-orange-500 hover:from-terracotta-600 hover:to-orange-600 text-white font-bold py-4 rounded-2xl text-base gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-terracotta-500/20"
                      >
                        <ShieldCheck className="h-5 w-5" />
                        Soumettre ma demande KYC
                      </Button>
                    </CardContent>
                  </Card>

                  {/* RGPD Note */}
                  <p className="text-center text-xs text-charcoal-400 dark:text-charcoal-600">
                    Vos données sont traitées de manière confidentielle et sécurisée. 
                    Seul l&apos;équipe admin de Loomdaah y a accès (conformément au RGPD).
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
