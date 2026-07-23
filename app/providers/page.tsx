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
  },
  {
    id: 9,
    name: "SecureGuard Security",
    rating: "4.6",
    reviews: 145,
    owner: "Robert",
    category: "Security Services",
    location: "Belgravia, Harare",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=300&fit=crop",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/indigo.jpg",
    description:
      "Comprehensive security solutions including alarm systems, CCTV, and guards.",
    phone: "+263 77 901 2345",
    email: "robert@secureguard.co.zw",
    availability: "Mon-Sun 24/7",
    services: ["CCTV Installation", "Alarm Systems", "Security Guards", "Access Control"],
    experience: "14+ years",
    projects: 734,
    price: 200,
  },
  {
    id: 10,
    name: "Happy Paws Pet Care",
    rating: "4.9",
    reviews: 167,
    owner: "Lisa",
    category: "Pet Services",
    location: "Avondale, Harare",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/teal.jpg",
    description:
      "Pet grooming, boarding, and daycare services with love and care.",
    phone: "+263 77 012 3456",
    email: "lisa@happypaws.co.zw",
    availability: "Mon-Sat 7AM-7PM",
    services: ["Pet Grooming", "Pet Boarding", "Dog Walking", "Pet Daycare"],
    experience: "7+ years",
    projects: 512,
    price: 85,
  },
  {
    id: 11,
    name: "FreshBite Catering",
    rating: "4.7",
    reviews: 203,
    owner: "Grace",
    category: "Catering",
    location: "Newlands, Harare",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/rose.jpg",
    description:
      "Delicious catering for weddings, corporate events, and private parties.",
    phone: "+263 77 123 4568",
    email: "grace@freshbite.co.zw",
    availability: "Mon-Sat 8AM-8PM",
    services: ["Event Catering", "Wedding Catering", "Corporate Catering", "Private Parties"],
    experience: "10+ years",
    projects: 678,
    price: 180,
  },
  {
    id: 12,
    name: "Precision Auto Body",
    rating: "4.6",
    reviews: 89,
    owner: "James",
    category: "Vehicle Repairs",
    location: "Highlands, Harare",
    image:
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=400&h=300&fit=crop",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/cobalt.jpg",
    description:
      "Auto body repair, painting, and dent removal services.",
    phone: "+263 77 234 5679",
    email: "james@precisionauto.co.zw",
    availability: "Mon-Fri 7AM-6PM, Sat 8AM-3PM",
    services: ["Auto Body Repair", "Paint Services", "Dent Removal", "Frame Straightening"],
    experience: "13+ years",
    projects: 445,
    price: 220,
  },
  {
    id: 13,
    name: "Digital Wave Marketing",
    rating: "4.8",
    reviews: 134,
    owner: "Patricia",
    category: "Digital Services",
    location: "CBD, Harare",
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=300&fit=crop",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/violet.jpg",
    description:
      "Full-service digital marketing agency specializing in social media and SEO.",
    phone: "+263 77 345 6780",
    email: "patricia@digitalwave.co.zw",
    availability: "Mon-Fri 8AM-5PM",
    services: ["Social Media Marketing", "SEO", "Content Creation", "PPC Advertising"],
    experience: "8+ years",
    projects: 389,
    price: 190,
  },
  {
    id: 14,
    name: "MasterCraft Builders",
    rating: "4.9",
    reviews: 256,
    owner: "Thomas",
    category: "Construction",
    location: "Borrowdale, Harare",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/forest.jpg",
    description:
      "Quality construction, renovations, and home improvement services.",
    phone: "+263 77 456 7891",
    email: "thomas@mastercraft.co.zw",
    availability: "Mon-Fri 6AM-6PM, Sat 7AM-2PM",
    services: ["House Construction", "Renovations", "Roofing", "Flooring"],
    experience: "18+ years",
    projects: 1024,
    price: 300,
  },
  {
    id: 15,
    name: "Zen Yoga Studio",
    rating: "4.7",
    reviews: 112,
    owner: "Maya",
    category: "Health & Wellness",
    location: "Avondale, Harare",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    avatar:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/magenta.jpg",
    description:
      "Yoga classes, meditation sessions, and wellness workshops.",
    phone: "+263 77 567 8902",
    email: "maya@zenstudio.co.zw",
    availability: "Mon-Sat 6AM-8PM, Sun 8AM-12PM",
    services: ["Yoga Classes", "Meditation", "Wellness Workshops", "Private Sessions"],
    experience: "5+ years",
    projects: 234,
    price: 75,
  },
];

// Get unique categories
const allCategories = ["All", ...new Set(providers.map(p => p.category))];

// Get unique locations for command dialog
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

  const [open, setOpen] = React.useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  
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

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(query) ||
        provider.category.toLowerCase().includes(query) ||
        provider.owner.toLowerCase().includes(query) ||
        provider.description.toLowerCase().includes(query)
      );
    }

    // Location filter
    if (locationQuery.trim()) {
      const query = locationQuery.toLowerCase().trim();
      filtered = filtered.filter(provider =>
        provider.location.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(provider =>
        provider.category === selectedCategory
      );
    }

    // Rating filter
    if (selectedRating !== "All") {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(provider =>
        parseFloat(provider.rating) >= minRating
      );
    }

    // Price range filter
    filtered = filtered.filter(provider =>
      provider.price >= priceRange[0] && provider.price <= priceRange[1]
    );

    // Availability filter
    if (isAvailableNow) {
      filtered = filtered.filter(provider =>
        provider.availability.includes("Mon-Sat") ||
        provider.availability.includes("Mon-Sun")
      );
    }

    // Category group filters (checkbox filters)
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

  // Pagination logic
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

  // Filter locations based on search
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
              placeholder="Search Service / Provider e.g. Plumbing, cleaning, Fuser Tech"
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
              onClick={() => setOpen(true)}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="pl-10 pr-4 py-5 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl cursor-pointer"
            />
          </div>
        </div>

        {/* Location Dialog - Using simple Dialog instead of CommandDialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Search Location</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Type location..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto mt-4">
              {filteredLocations.length > 0 ? (
                <div className="space-y-1">
                  {filteredLocations.map((location) => (
                    <Button
                      key={location}
                      onClick={() => {
                        setLocationQuery(location);
                        setLocationSearch("");
                        setOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-primary hover:text-white/80 bg-gray-200 flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{location}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No locations found
                </div>
              )}
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
                {/* Search Area */}
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

                {/* Category */}
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

                {/* Rating Filter */}
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

                {/* Price Range */}
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

                {/* Availability */}
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

          {/* Provider Cards Grid - Image Card Layout */}
          <div className="flex-1">
            <Link href="/provider" className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {currentProviders.map((provider) => (
                <div
                  key={provider.id}
                  className={`group relative h-[280px] sm:h-[300px] md:h-[320px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] touch-manipulation ${
                    selectedProvider?.id === provider.id && sheetOpen
                      ? "ring-2 ring-blue-600 ring-offset-2"
                      : ""
                  }`}
                  role="Button"
                  tabIndex={0}
                 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleProviderClick(provider);
                    }
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={provider.image}
                    alt={provider.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Availability Badge */}
                  {isAvailableNow && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-green-500 text-white border-0 shadow-lg">
                        Available now
                      </Badge>
                    </div>
                  )}

                  {/* Content */}
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
            </Link>

            {/* Empty State */}
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

            {/* Pagination */}
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