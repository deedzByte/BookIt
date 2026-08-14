"use client"

import { useCallback, useMemo, useRef, useState, useEffect } from "react"
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
  type MapRef,
} from "react-map-gl/mapbox"
import {
  Camera,
  Car,
  LocateFixed,
  MapPin,
  Search,
  ShoppingBag,
  Star,
  X,
} from "lucide-react"
import "mapbox-gl/dist/mapbox-gl.css"

import { getDirections, type DirectionsRoute } from "@/lib/mapbox"
import RouteLayer from "@/components/maps/RouteLayer"

export interface MapService {
  id: number
  latitude: number
  longitude: number
  title: string
  icon: "camera" | "shop" | "clothes" | "business" | "car"
  rating?: number
  reviews?: number
  phone?: string
}

interface ProviderMapProps {
  selectedService?: MapService | null
  autoNavigate?: boolean
  onClose?: () => void
  showControls?: boolean
  showSearch?: boolean
  showFilters?: boolean
  clientLocation?: { latitude: number; longitude: number }
}

const services: MapService[] = [
  {
    id: 1,
    latitude: -17.8255,
    longitude: 31.0338,
    title: "ZimLens Studio",
    icon: "camera",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    latitude: -17.819,
    longitude: 31.041,
    title: "Crafted ZW",
    icon: "shop",
    rating: 4.7,
    reviews: 95,
  },
  {
    id: 3,
    latitude: -17.821,
    longitude: 31.048,
    title: "Pulse Events",
    icon: "business",
    rating: 4.8,
    reviews: 203,
  },
  {
    id: 4,
    latitude: -17.831,
    longitude: 31.038,
    title: "Harare Transport",
    icon: "car",
    rating: 4.6,
    reviews: 67,
  },
]

const defaultClientLocation = { latitude: -17.828, longitude: 31.036 }

export default function ProviderMap({
  selectedService: initialService = null,
  autoNavigate = false,
  onClose,
  showControls = true,
  showSearch = true,
  clientLocation = defaultClientLocation,
}: ProviderMapProps) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  const mapRef = useRef<MapRef>(null)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<MapService | null>(initialService)
  const [route, setRoute] = useState<DirectionsRoute | null>(null)
  const [loading, setLoading] = useState(false)
  const [routeError, setRouteError] = useState("")

  const visibleServices = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return services.filter(
      (service) => !needle || service.title.toLowerCase().includes(needle)
    )
  }, [query])

  const focusService = useCallback((service: MapService) => {
    setSelected(service)
    mapRef.current?.flyTo({
      center: [service.longitude, service.latitude],
      zoom: 15.5,
      pitch: 42,
      duration: 900,
    })
  }, [])

  const buildRoute = useCallback(
    async (service: MapService) => {
      focusService(service)
      setLoading(true)
      setRouteError("")
      try {
        const nextRoute = await getDirections(
          [clientLocation.longitude, clientLocation.latitude],
          [service.longitude, service.latitude]
        )
        setRoute(nextRoute)
        mapRef.current?.fitBounds(
          [
            [
              Math.min(clientLocation.longitude, service.longitude),
              Math.min(clientLocation.latitude, service.latitude),
            ],
            [
              Math.max(clientLocation.longitude, service.longitude),
              Math.max(clientLocation.latitude, service.latitude),
            ],
          ],
          { padding: 100, duration: 900 }
        )
      } catch {
        setRouteError("Add a valid Mapbox token to calculate live directions.")
      } finally {
        setLoading(false)
      }
    },
    [clientLocation, focusService]
  )

  useEffect(() => {
    if (!initialService || !mapboxToken) return
    queueMicrotask(() => {
      if (autoNavigate) void buildRoute(initialService)
      else focusService(initialService)
    })
  }, [autoNavigate, buildRoute, focusService, initialService, mapboxToken])

  function resetMap() {
    setRoute(null)
    setSelected(null)
    setRouteError("")
    mapRef.current?.flyTo({
      center: [31.036, -17.825],
      zoom: 13.5,
      pitch: 25,
      duration: 700,
    })
    onClose?.()
  }

  if (!mapboxToken) {
    return (
      <section className="flex min-h-[620px] items-center justify-center bg-[radial-gradient(circle_at_top,#d9e8e1,#eef2ef_55%,#dce4df)] px-4">
        <div className="max-w-xl rounded-3xl border border-white/80 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-xl">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#173f36] text-white"><MapPin className="size-6" /></span>
          <h1 className="mt-5 text-2xl font-semibold">Connect your Mapbox map</h1>
          <p className="mt-3 leading-7 text-zinc-600">The modern provider map is ready. Add <code className="rounded bg-zinc-100 px-1.5 py-1 text-sm">NEXT_PUBLIC_MAPBOX_TOKEN</code> to <code className="rounded bg-zinc-100 px-1.5 py-1 text-sm">.env.local</code>, then restart the development server.</p>
          <p className="mt-4 text-sm text-zinc-500">This fallback prevents runtime and hydration errors while the token is not configured.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[calc(100dvh-4rem)] min-h-[620px] w-full overflow-hidden bg-[#e8eee9] sm:h-[calc(100dvh-5rem)]">
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          latitude: -17.8252,
          longitude: 31.036,
          zoom: 13.5,
          pitch: 25,
        }}
        mapStyle="mapbox://styles/mapbox/standard"
        reuseMaps
      >
        {showControls && (
          <NavigationControl position="bottom-right" showCompass />
        )}
        {showControls && (
          <GeolocateControl
            position="bottom-right"
            trackUserLocation
            showUserHeading
          />
        )}
        <ScaleControl position="bottom-left" />
        <RouteLayer
          route={route ? { type: "Feature", geometry: route.geometry } : null}
          mapRef={mapRef}
        />

        {visibleServices.map((service) => (
          <Marker
            key={service.id}
            latitude={service.latitude}
            longitude={service.longitude}
            anchor="bottom"
          >
            <button
              onClick={() => focusService(service)}
              aria-label={`View ${service.title}`}
              className={`group flex size-12 items-center justify-center rounded-2xl border-2 border-white shadow-xl transition hover:-translate-y-1 ${selected?.id === service.id ? "bg-[#f2c14e] text-[#173f36]" : "bg-[#173f36] text-white"}`}
            >
              {service.icon === "camera" ? (
                <Camera className="size-5" />
              ) : service.icon === "shop" ? (
                <ShoppingBag className="size-5" />
              ) : (
                <Car className="size-5" />
              )}
            </button>
          </Marker>
        ))}

        <Marker
          latitude={clientLocation.latitude}
          longitude={clientLocation.longitude}
          anchor="center"
        >
          <div className="relative flex size-8 items-center justify-center rounded-full border-4 border-white bg-blue-500 shadow-xl">
            <span className="absolute size-12 animate-ping rounded-full bg-blue-500/20" />
          </div>
        </Marker>
      </Map>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-3 sm:p-5">
        <div className="pointer-events-auto mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-white/70 bg-white/90 p-2 shadow-xl backdrop-blur-xl">
          <Search className="ml-3 size-5 text-zinc-400" />
          {showSearch && (
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search providers on the map"
              className="min-h-11 min-w-0 flex-1 bg-transparent text-base outline-none"
            />
          )}
          <button
            onClick={() =>
              mapRef.current?.flyTo({
                center: [clientLocation.longitude, clientLocation.latitude],
                zoom: 15,
                duration: 700,
              })
            }
            aria-label="Centre on my location"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#173f36] text-white"
          >
            <LocateFixed className="size-5" />
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 sm:p-5">
        <div className="pointer-events-auto mx-auto max-w-xl">
          {routeError && (
            <p className="mb-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow">
              {routeError}
            </p>
          )}
          {selected ? (
            <article className="rounded-3xl border border-white/70 bg-white/95 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-wide text-[#25705f] uppercase">
                    Nearby provider
                  </p>
                  <h1 className="mt-1 text-xl font-semibold">
                    {selected.title}
                  </h1>
                  <p className="mt-2 flex items-center gap-3 text-sm text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                      {selected.rating ?? "New"}
                    </span>
                    <span>{selected.reviews ?? 0} reviews</span>
                  </p>
                </div>
                <button
                  onClick={resetMap}
                  aria-label="Close provider details"
                  className="flex size-11 items-center justify-center rounded-full bg-zinc-100"
                >
                  <X className="size-5" />
                </button>
              </div>
              {route && (
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-[#f4f6f3] p-3 text-sm">
                  <span>
                    <strong>{(route.distance / 1000).toFixed(1)} km</strong>
                    <br />
                    <span className="text-zinc-500">Distance</span>
                  </span>
                  <span>
                    <strong>
                      {Math.max(1, Math.round(route.duration / 60))} min
                    </strong>
                    <br />
                    <span className="text-zinc-500">Drive time</span>
                  </span>
                </div>
              )}
              <button
                disabled={loading}
                onClick={() => void buildRoute(selected)}
                className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#173f36] px-5 font-semibold text-white disabled:opacity-60"
              >
                <MapPin className="size-5" />
                {loading
                  ? "Calculating route…"
                  : route
                    ? "Refresh directions"
                    : "Get directions"}
              </button>
            </article>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {visibleServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => focusService(service)}
                  className="min-h-12 shrink-0 rounded-full border bg-white/95 px-5 text-sm font-semibold shadow-lg backdrop-blur"
                >
                  {service.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
