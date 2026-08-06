"use client";

import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
  ScaleControl,
  MapRef,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  Camera,
  ShoppingBag,
  Shirt,
  Briefcase,
  Car,
} from "lucide-react";

import { getDirections } from "@/lib/mapbox";
import CategoryFilter from "./maps/CategoryFilter";
import FloatingControls from "./maps/FloatingControls";
import MapMarker from "./maps/MapMarker";
import NavigationHeader from "./maps/NavigationHeader";
import RouteLayer from "./maps/RouteLayer";
import SearchBar from "./maps/SearchBar";
import VoiceNavigation from "./maps/VoiceNavigation";

interface Service {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  icon: "camera" | "shop" | "clothes" | "business" | "car";
  rating?: number;
  reviews?: number;
  phone?: string;
}

interface ProviderMapProps {
  selectedService?: Service | null;
  autoNavigate?: boolean;
  onClose?: () => void;
  showControls?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  clientLocation?: {
    latitude: number;
    longitude: number;
  };
}

const defaultServices: Service[] = [
  {
    id: 1,
    latitude: -17.8255,
    longitude: 31.0338,
    title: "Photography",
    icon: "camera",
    rating: 4.9,
    reviews: 128,
    phone: "+263 77 123 4567",
  },
  {
    id: 2,
    latitude: -17.819,
    longitude: 31.041,
    title: "Shop",
    icon: "shop",
    rating: 4.7,
    reviews: 95,
    phone: "+263 77 234 5678",
  },
  {
    id: 3,
    latitude: -17.821,
    longitude: 31.048,
    title: "Fashion",
    icon: "clothes",
    rating: 4.8,
    reviews: 203,
    phone: "+263 77 345 6789",
  },
  {
    id: 4,
    latitude: -17.831,
    longitude: 31.038,
    title: "Business",
    icon: "business",
    rating: 4.6,
    reviews: 67,
    phone: "+263 77 456 7890",
  },
  {
    id: 5,
    latitude: -17.833,
    longitude: 31.029,
    title: "Transport",
    icon: "car",
    rating: 4.5,
    reviews: 154,
    phone: "+263 77 567 8901",
  },
];

// Default client location
const defaultClientLocation = {
  latitude: -17.828,
  longitude: 31.036,
};

export default function ProviderMap({ 
  selectedService: externalSelectedService = null,
  autoNavigate = false,
  onClose,
  showControls = true,
  showSearch = true,
  showFilters = true,
  clientLocation = defaultClientLocation,
}: ProviderMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(externalSelectedService);
  const [route, setRoute] = useState<any>(null);
  const [routeData, setRouteData] = useState<any>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isVoiceReady, setIsVoiceReady] = useState(false);

  const center = useMemo(
    () => ({
      latitude: -17.8252,
      longitude: 31.0335,
    }),
    []
  );

  // Update selected service from props
  useEffect(() => {
    if (externalSelectedService) {
      setSelectedService(externalSelectedService);
    }
  }, [externalSelectedService]);

  const getIcon = (icon: Service["icon"]) => {
    switch (icon) {
      case "camera":
        return <Camera size={24} />;
      case "shop":
        return <ShoppingBag size={24} />;
      case "clothes":
        return <Shirt size={24} />;
      case "business":
        return <Briefcase size={24} />;
      default:
        return <Car size={24} />;
    }
  };

  const getColor = (icon: Service["icon"]) => {
    switch (icon) {
      case "camera":
        return "sky";
      case "shop":
        return "emerald";
      case "clothes":
        return "purple";
      case "business":
        return "sky";
      default:
        return "emerald";
    }
  };

  // Load voice synthesis voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
        setIsVoiceReady(true);
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const loadRoute = useCallback(async (service: Service) => {
    setIsLoading(true);
    try {
      const result = await getDirections(
        [service.longitude, service.latitude],
        [clientLocation.longitude, clientLocation.latitude]
      );

      setRoute({
        type: "Feature",
        geometry: result.geometry,
      });

      setRouteData(result);
      setDistance(result.distance);
      setDuration(result.duration);
      
      // Extract steps for voice navigation
      if (result.legs && result.legs.length > 0) {
        const allSteps = result.legs.flatMap((leg: any) => leg.steps || []);
        setSteps(allSteps);
        setCurrentStepIndex(0);
      }
      
      // Start navigation automatically
      setIsNavigating(true);
      
    } catch (err) {
      console.error("Error loading route:", err);
    } finally {
      setIsLoading(false);
    }
  }, [clientLocation]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    loadRoute(service);
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      
      // Update camera to focus on next step
      if (mapRef.current && steps[currentStepIndex + 1]?.geometry?.coordinates) {
        const coords = steps[currentStepIndex + 1].geometry.coordinates;
        mapRef.current.flyTo({
          center: coords,
          zoom: 16,
          duration: 800,
        });
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      
      // Update camera to focus on previous step
      if (mapRef.current && steps[currentStepIndex - 1]?.geometry?.coordinates) {
        const coords = steps[currentStepIndex - 1].geometry.coordinates;
        mapRef.current.flyTo({
          center: coords,
          zoom: 16,
          duration: 800,
        });
      }
    }
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    setRoute(null);
    setRouteData(null);
    setSteps([]);
    setCurrentStepIndex(0);
    setSelectedService(null);
    
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Reset camera
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [31.0335, -17.8252],
        zoom: 14,
        pitch: 45,
        duration: 1500,
      });
    }

    // Call onClose callback if provided
    if (onClose) {
      onClose();
    }
  };

  const handleCloseNavigation = () => {
    handleStopNavigation();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredServices = useMemo(() => {
    let filtered = defaultServices;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((s) => s.icon === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // Auto-navigate when selectedService changes from props
  useEffect(() => {
    if (autoNavigate && externalSelectedService && !isNavigating) {
      handleServiceSelect(externalSelectedService);
    }
  }, [autoNavigate, externalSelectedService, isNavigating]);

  // Initial fly to center
  useEffect(() => {
    if (!mapRef.current) return;

    setTimeout(() => {
      mapRef.current?.flyTo({
        center: [31.0335, -17.8252],
        zoom: 14,
        pitch: 45,
        bearing: 0,
        duration: 2000,
      });
    }, 100);
  }, []);

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100">
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          latitude: center.latitude,
          longitude: center.longitude,
          zoom: 13,
          pitch: 45,
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        interactiveLayerIds={["route-line"]}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        <GeolocateControl position="top-right" trackUserLocation />
        <ScaleControl position="bottom-right" />

        {/* Route */}
        <RouteLayer route={route} mapRef={mapRef} />

        {/* Service Markers - Hide when navigating */}
        {!isNavigating && filteredServices.map((service) => (
          <Marker
            key={service.id}
            latitude={service.latitude}
            longitude={service.longitude}
            anchor="bottom"
          >
            <MapMarker
              isSelected={selectedService?.id === service.id}
              onClick={() => handleServiceSelect(service)}
              label={service.title}
              color={getColor(service.icon)}
            >
              {getIcon(service.icon)}
            </MapMarker>
          </Marker>
        ))}

        {/* Client Marker */}
        <Marker
          latitude={clientLocation.latitude}
          longitude={clientLocation.longitude}
          anchor="center"
        >
          <div className="relative">
            <div className="absolute inset-0 h-12 w-12 -translate-x-3 -translate-y-3 rounded-full bg-sky-500/20 animate-ping" />
            <div className="relative h-6 w-6 rounded-full border-4 border-white bg-sky-500 shadow-xl">
              <div className="absolute inset-0 rounded-full bg-white/20" />
            </div>
          </div>
        </Marker>
      </Map>

      {/* Navigation Header - Show when navigating */}
      {isNavigating && selectedService && (
        <NavigationHeader
          destination={selectedService.title}
          distance={distance}
          duration={duration}
          onClose={handleCloseNavigation}
        />
      )}

      {/* Search & Filters - Hide when navigating */}
      {!isNavigating && showSearch && (
        <SearchBar value={searchQuery} onChange={handleSearch} />
      )}
      
      {/* {!isNavigating && showFilters && (
        <CategoryFilter
          selected={selectedCategory}
          onChange={handleCategoryChange}
        />
      )} */}
      
      {/* {!isNavigating && showControls && (
        <FloatingControls
          onLocate={() => {
            if (mapRef.current) {
              mapRef.current.flyTo({
                center: [31.0335, -17.8252],
                zoom: 14,
                pitch: 45,
                duration: 1500,
              });
            }
          }}
          onZoomIn={() => {
            if (mapRef.current) {
              const zoom = mapRef.current.getZoom();
              mapRef.current.zoomTo(zoom + 1, { duration: 300 });
            }
          }}
          onZoomOut={() => {
            if (mapRef.current) {
              const zoom = mapRef.current.getZoom();
              mapRef.current.zoomTo(zoom - 1, { duration: 300 });
            }
          }}
        />
      )} */}

      {/* Voice Navigation - Show when navigating */}
      {isNavigating && steps.length > 0 && (
        <VoiceNavigation
          steps={steps}
          currentStepIndex={currentStepIndex}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
          isNavigating={isNavigating}
          distance={distance}
          duration={duration}
          onStop={handleStopNavigation}
        />
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
            <span className="text-sm font-medium text-gray-700">
              Finding route...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}