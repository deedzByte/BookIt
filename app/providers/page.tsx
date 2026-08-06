"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Star,
  MapPin,
  Briefcase,
  Search,
  SlidersHorizontal,
  Navigation,
  X,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import ProviderMap from "@/components/ProviderMap";

// Import the map component


const providers = [
  {
    id: 1,
    name: "Miles Auto Clinic",
    rating: "4.8",
    reviews: 124,
    owner: "Miles",
    category: "Vehicle Repairs",
    location: "Waterfalls, Harare",
    image:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    description:
      "Expert vehicle repair and maintenance services for all car models.",
    phone: "+263 77 123 4567",
    email: "miles@autoclinic.co.zw",
    availability: "Mon-Fri 7AM-6PM, Sat 8AM-4PM",
    services: [
      "Engine Diagnostics",
      "Brake Service",
      "Oil Change",
      "Tire Rotation",
    ],
    experience: "12+ years",
    projects: 567,
    price: 150,
    latitude: -17.8255,
    longitude: 31.0338,
  },
  {
    id: 2,
    name: "Faraiqplumber",
    rating: "4.9",
    reviews: 89,
    owner: "Farai",
    category: "Boreholes & Plumbing",
    location: "Waterfalls, Harare",
    image:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    description:
      "Professional plumbing and borehole drilling services with guaranteed quality.",
    phone: "+263 77 234 5678",
    email: "farai@plumber.co.zw",
    availability: "Mon-Sat 6AM-8PM",
    services: ["Borehole Drilling", "Pipe Installation", "Water Pump Repair", "Leak Detection"],
    experience: "8+ years",
    projects: 342,
    price: 120,
    latitude: -17.819,
    longitude: 31.041,
  },
  {
    id: 3,
    name: "Knight Electricals",
    rating: "4.7",
    reviews: 203,
    owner: "Knight",
    category: "Electrical",
    location: "Harare, Zimbabwe",
    image:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    description:
      "Full electrical services from installation to maintenance and repairs.",
    phone: "+263 77 345 6789",
    email: "knight@electricals.co.zw",
    availability: "Mon-Fri 7AM-7PM",
    services: ["Electrical Installation", "Wiring", "Fault Finding", "Security Systems"],
    experience: "15+ years",
    projects: 892,
    price: 180,
    latitude: -17.821,
    longitude: 31.048,
  },
  {
    id: 4,
    name: "UTMOST DIGITAL SOLUTIONS",
    rating: "4.6",
    reviews: 67,
    owner: "Tendai",
    category: "Digital Services",
    location: "Harare, Zimbabwe",
    image:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    description:
      "Digital solutions including web development, marketing, and IT consulting.",
    phone: "+263 77 456 7890",
    email: "info@utmostdigital.co.zw",
    availability: "Mon-Fri 8AM-6PM",
    services: [
      "Web Development",
      "Digital Marketing",
      "IT Consulting",
      "Branding",
    ],
    experience: "10+ years",
    projects: 456,
    price: 200,
    latitude: -17.831,
    longitude: 31.038,
  },
  {
    id: 5,
    name: "Diesel Fitter & Turner",
    rating: "4.9",
    reviews: 312,
    owner: "Taka",
    category: "Auto Services",
    location: "Harare, Zimbabwe",
    image:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    description:
      "Specialist diesel engine repair, fitter and turner services.",
    phone: "+263 77 567 8901",
    email: "taka@diesel.co.zw",
    availability: "Mon-Sat 6AM-8PM",
    services: [
      "Diesel Engine Repair",
      "Fitting & Turning",
      "Engine Overhaul",
      "Parts Supply",
    ],
    experience: "20+ years",
    projects: 1024,
    price: 250,
    latitude: -17.833,
    longitude: 31.029,
  },
  {
    id: 6,
    name: "Elite Cleaning Services",
    rating: "4.7",
    reviews: 156,
    owner: "Sarah",
    category: "Cleaning Services",
    location: "Borrowdale, Harare",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/pink.jpg",
    description:
      "Professional cleaning services for homes and offices with eco-friendly products.",
    phone: "+263 77 678 9012",
    email: "sarah@elitecleaners.co.zw",
    availability: "Mon-Sat 7AM-6PM",
    services: ["Home Cleaning", "Office Cleaning", "Carpet Cleaning", "Window Cleaning"],
    experience: "6+ years",
    projects: 423,
    price: 90,
    latitude: -17.815,
    longitude: 31.045,
  },
  {
    id: 7,
    name: "TechFix Zimbabwe",
    rating: "4.5",
    reviews: 98,
    owner: "David",
    category: "IT Services",
    location: "Eastgate, Harare",
    image:
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a3?w=400&h=300&fit=crop",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/yellow.jpg",
    description:
      "Computer repair, networking, and IT support services for businesses and individuals.",
    phone: "+263 77 789 0123",
    email: "david@techfix.co.zw",
    availability: "Mon-Fri 8AM-6PM, Sat 9AM-2PM",
    services: ["Computer Repair", "Network Setup", "Data Recovery", "IT Support"],
    experience: "9+ years",
    projects: 567,
    price: 130,
    latitude: -17.829,
    longitude: 31.042,
  },
  {
    id: 8,
    name: "Green Thumb Landscaping",
    rating: "4.8",
    reviews: 78,
    owner: "Michael",
    category: "Landscaping",
    location: "Mount Pleasant, Harare",
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    description:
      "Professional landscaping, garden design, and maintenance services.",
    phone: "+263 77 890 1234",
    email: "michael@greenthumb.co.zw",
    availability: "Mon-Sat 6AM-5PM",
    services: ["Garden Design", "Lawn Maintenance", "Tree Trimming", "Irrigation"],
    experience: "11+ years",
    projects: 289,
    price: 160,
    latitude: -17.822,
    longitude: 31.052,
  },
];

// Get unique categories
const allCategories = ["All", ...new Set(providers.map(p => p.category))];

// Get unique locations
const allLocations = [...new Set(providers.map(p => p.location))];

export default function Providers() {
  const router = useRouter();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 300]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isAvailableNow, setIsAvailableNow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Location dialog state
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  
  // Map dialog state
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  
  const handleProviderClick = (provider: any) => {
    setSelectedProvider(provider);
    setSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setTimeout(() => setSelectedProvider(null), 300);
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400"
        />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400 opacity-50"
        />
      );
    }
    return stars;
  };

  // Filter providers
  const filteredProviders = useMemo(() => {
    let filtered = providers;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(query) ||
        provider.category.toLowerCase().includes(query) ||
        provider.owner.toLowerCase().includes(query) ||
        provider.description.toLowerCase().includes(query)
      );
    }

    if (locationQuery.trim()) {
      const query = locationQuery.toLowerCase().trim();
      filtered = filtered.filter(provider =>
        provider.location.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(provider =>
        provider.category === selectedCategory
      );
    }

    if (selectedRating !== "All") {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(provider =>
        parseFloat(provider.rating) >= minRating
      );
    }

    filtered = filtered.filter(provider =>
      provider.price >= priceRange[0] && provider.price <= priceRange[1]
    );

    if (isAvailableNow) {
      filtered = filtered.filter(provider =>
        provider.availability.includes("Mon-Sat") ||
        provider.availability.includes("Mon-Sun")
      );
    }

    if (selectedFilters.length > 0) {
      filtered = filtered.filter(provider =>
        selectedFilters.some(filter =>
          provider.category.toLowerCase().includes(filter.toLowerCase()) ||
          filter.toLowerCase().includes(provider.category.toLowerCase())
        )
      );
    }

    return filtered;
  }, [searchQuery, locationQuery, selectedCategory, selectedRating, priceRange, selectedFilters, isAvailableNow]);

  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProviders = filteredProviders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedCategory("All");
    setSelectedRating("All");
    setPriceRange([50, 300]);
    setSelectedFilters([]);
    setIsAvailableNow(false);
    setCurrentPage(1);
  };

  const filteredLocations = allLocations.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 md:py-12">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-xl md:text-2xl font-bold text-center">
            All Service Providers
          </h1>
          <p className="text-center text-sm font-medium text-gray-500 mt-2">
            Verified, rated professionals ready to help across Zimbabwe
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search Service / Provider e.g. Plumbing, cleaning"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-5 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search By Location"
              value={locationQuery}
              onClick={() => setLocationDialogOpen(true)}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="pl-10 pr-4 py-5 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl cursor-pointer"
            />
          </div>
        </div>

        {/* Location Search Dialog - Full Screen */}
        <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
          <DialogContent className="max-w-[100vw] w-[100vw] h-[100vh] max-h-[100vh] p-0 m-0 rounded-none bg-white">
            <DialogHeader className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLocationDialogOpen(false)}
                  className="hover:bg-gray-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search for a location..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="pl-10 pr-4 py-6 text-base bg-gray-50 border-0 focus-visible:ring-1"
                    autoFocus
                  />
                </div>
                <Button
                  onClick={() => {
                    setMapDialogOpen(true);
                    setLocationDialogOpen(false);
                  }}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Map View
                </Button>
              </div>
            </DialogHeader>

            <div className="h-[calc(100vh-80px)] overflow-y-auto p-4">
              {filteredLocations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredLocations.map((location) => (
                    <Button
                      key={location}
                      onClick={() => {
                        setLocationQuery(location);
                        setLocationSearch("");
                        setLocationDialogOpen(false);
                      }}
                      className="w-full justify-start px-4 py-6 h-auto bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-sky-500" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-base">{location}</p>
                          <p className="text-sm text-gray-500">
                            {providers.filter(p => p.location === location).length} providers available
                          </p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MapPin className="w-20 h-20 text-gray-300 mb-4" />
                  <p className="text-xl font-medium">No locations found</p>
                  <p className="text-sm">Try searching for a different area</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Full Screen Map Dialog */}
        <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
          <DialogContent className="max-w-[100vw] w-[100vw] h-[100vh] max-h-[100vh] p-0 m-0 rounded-none bg-black">
            <DialogHeader className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/70 to-transparent px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setMapDialogOpen(false);
                      setLocationDialogOpen(true);
                    }}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <h2 className="text-white text-lg font-semibold">
                    <MapPin className="w-5 h-5 inline mr-2" />
                    Find Providers Near You
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMapDialogOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </DialogHeader>
            <div className="w-full h-full">
              <ProviderMap
                showControls={true}
                showSearch={true}
                showFilters={true}
                onClose={() => setMapDialogOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </Button>
                </div>
                <CardDescription className="text-xs">
                  {filteredProviders.length} providers found
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">SEARCH AREA</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="nearby-search"
                        checked={selectedFilters.includes("NearBy Search")}
                        onCheckedChange={() => handleFilterToggle("NearBy Search")}
                      />
                      <label htmlFor="nearby-search" className="text-sm text-gray-600">
                        NearBy Search
                      </label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">CATEGORY</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {allCategories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={
                            category === "All"
                              ? selectedCategory === "All"
                              : selectedCategory === category
                          }
                          onCheckedChange={() => {
                            if (category === "All") {
                              setSelectedCategory("All");
                            } else {
                              setSelectedCategory(
                                selectedCategory === category ? "All" : category
                              );
                            }
                          }}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm text-gray-600">
                          {category}
                          {category !== "All" && (
                            <span className="text-xs text-gray-400 ml-1">
                              ({providers.filter(p => p.category === category).length})
                            </span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Rating</h4>
                  <RadioGroup value={selectedRating} onValueChange={setSelectedRating}>
                    <div className="space-y-2">
                      {["All", "4.5", "4.0", "3.5"].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <RadioGroupItem value={rating} id={`rating-${rating}`} />
                          <label htmlFor={`rating-${rating}`} className="text-sm text-gray-600 flex items-center gap-1">
                            {rating === "All" ? "All Ratings" : (
                              <>
                                {renderStars(rating)}
                                <span>& up</span>
                              </>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Price Range</h4>
                  <div className="px-1">
                    <Slider
                      min={0}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="my-4"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        ${priceRange[0]}
                      </span>
                      <span className="text-gray-600">
                        ${priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Availability</h4>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="available-now"
                      checked={isAvailableNow}
                      onCheckedChange={() => setIsAvailableNow(!isAvailableNow)}
                    />
                    <label htmlFor="available-now" className="text-sm text-gray-600">
                      Available now
                    </label>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  className="w-full hover:bg-gray-700"
                  onClick={() => console.log("Apply filters")}
                >
                  Apply Filters
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Provider Cards Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {currentProviders.map((provider) => (
                <div
                  key={provider.id}
                  className={`group relative h-[280px] sm:h-[300px] md:h-[320px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] touch-manipulation ${
                    selectedProvider?.id === provider.id && sheetOpen
                      ? "ring-2 ring-blue-600 ring-offset-2"
                      : ""
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleProviderClick(provider)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleProviderClick(provider);
                    }
                  }}
                >
                  <img
                    src={provider.image}
                    alt={provider.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {isAvailableNow && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-green-500 text-white border-0 shadow-lg">
                        Available now
                      </Badge>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 z-10 p-4 sm:p-5 md:p-6 w-full">
                    <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-1">
                      {provider.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1.5">
                      <div className="flex items-center gap-0.5">
                        {renderStars(provider.rating)}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {provider.rating}
                      </span>
                      <span className="text-xs sm:text-sm text-white/70">
                        ({provider.reviews})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/70 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-white/80 truncate">
                        {provider.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/70 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-white/80 truncate">
                        {provider.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                      <Avatar className="size-5 sm:size-6 ring-2 ring-white/30">
                        <AvatarImage
                          src={provider.avatar}
                          alt={provider.owner}
                        />
                        <AvatarFallback className="text-[10px] sm:text-xs bg-white/20 text-white">
                          {provider.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs sm:text-sm text-white/90 truncate">
                        By {provider.owner}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No providers found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="mt-4"
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {filteredProviders.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) handlePageChange(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      if (pageNumber < 1 || pageNumber > totalPages) return null;

                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === pageNumber}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNumber);
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                          }}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) handlePageChange(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}