"use client"
import * as React from "react"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import { MapPin } from "lucide-react"

const containerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: '16px'
}

export function MapPreview({ lat, lng, title, location, quartier }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  const [showInfo, setShowInfo] = React.useState(true)

  const center = React.useMemo(() => ({
    lat: Number(lat) || 4.0511,
    lng: Number(lng) || 9.7679
  }), [lat, lng])

  if (!isLoaded || !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    // Beautiful fallback visual map if Google Maps API key is not present
    return (
      <div className="relative w-full h-[350px] rounded-2xl overflow-hidden bg-[#e5e3df] border border-charcoal-200 shadow-inner">
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80")' }}
        />
        
        {/* Real coordinates & details banner */}
        <div className="absolute top-4 left-4 right-4 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md p-4 rounded-xl shadow-md border border-charcoal-150 dark:border-charcoal-800 z-10 space-y-1">
          <div className="flex items-center gap-1.5 text-terracotta-600 font-bold text-sm">
            <MapPin className="h-4 w-4 fill-current" />
            <span>Localisation précise</span>
          </div>
          <p className="text-sm font-semibold text-charcoal-900 dark:text-white">{title}</p>
          <p className="text-xs text-charcoal-600 dark:text-charcoal-350">
            {location} {quartier ? `• Quartier : ${quartier}` : ''}
          </p>
          <p className="text-[10px] text-charcoal-400 font-medium font-mono">
            GPS : {Number(lat).toFixed(6)}, {Number(lng).toFixed(6)}
          </p>
        </div>

        {/* Pulsing Marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 bg-terracotta-500/30 rounded-full animate-ping" />
            <div className="absolute w-6 h-6 bg-terracotta-500/60 rounded-full animate-pulse" />
            <MapPin className="h-10 w-10 text-terracotta-600 drop-shadow-lg z-10" />
          </div>
        </div>

        <div className="absolute bottom-4 right-4 bg-charcoal-900/90 text-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm text-xs font-semibold">
          Aperçu de la carte
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-charcoal-200 dark:border-charcoal-800">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
          ]
        }}
      >
        <Marker
          position={center}
          onClick={() => setShowInfo(true)}
        />

        {showInfo && (
          <InfoWindow position={center} onCloseClick={() => setShowInfo(false)}>
            <div className="p-1 max-w-[200px] text-charcoal-900">
              <h4 className="font-bold text-xs truncate">{title}</h4>
              <p className="text-[10px] text-charcoal-600 truncate">{location}</p>
              {quartier && <p className="text-[10px] text-terracotta-600 font-semibold mt-0.5">Quartier : {quartier}</p>}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
