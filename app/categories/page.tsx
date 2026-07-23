"use client";

import Link from "next/link";
import {
  Camera,
  Music2,
  Utensils,
  Car,
  Scissors,
  HeartHandshake,
  GraduationCap,
  Paintbrush,
  Building2,
  Dumbbell,
  Briefcase,
  Home,
  Sparkles,
  Bolt,
  CameraIcon,
  Hammer,
  Video,
  Wrench,
  ChefHat,
  Stethoscope,
  Palmtree,
  Dog,
  BookOpen,
  ShoppingBag,
  Plane,
  Coffee,
  Layers,
  ChevronRight,
  Search,
  X,
  Mic,
  Headphones,
  Mic2,
  ArrowRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


// Expanded categories with 10+ per group
const categoryGroups = [
  {
    id: 1,
    name: "Home Services",
    icon: Home,
    description: "Professional home maintenance and improvement",
    categories: [
      { title: "Plumbing", icon: Wrench, jobs: "32", href: "/services/plumbing" },
      { title: "Electrical", icon: Bolt, jobs: "18", href: "/services/electrical" },
      { title: "Builders", icon: Hammer, jobs: "41", href: "/services/builders" },
      { title: "Carpentry", icon: Hammer, jobs: "25", href: "/services/carpentry" },
      { title: "Painting", icon: Paintbrush, jobs: "37", href: "/services/painting" },
      { title: "Roofing", icon: Building2, jobs: "19", href: "/services/roofing" },
      { title: "Gardening", icon: Palmtree, jobs: "28", href: "/services/gardening" },
      { title: "Cleaning", icon: Sparkles, jobs: "45", href: "/services/cleaning" },
      { title: "Pest Control", icon: Dog, jobs: "15", href: "/services/pest-control" },
      { title: "HVAC", icon: Layers, jobs: "22", href: "/services/hvac" },
    ],
  },
  {
    id: 2,
    name: "Events & Entertainment",
    icon: Camera,
    description: "Make your events unforgettable",
    categories: [
      { title: "Photography", icon: Camera, jobs: "52 Providers", href: "/services/photography" },
      { title: "Videography", icon: Video, jobs: "30 Providers", href: "/services/videography" },
      { title: "Photo Booth", icon: CameraIcon, jobs: "12 Providers", href: "/services/photo-booth" },
      { title: "DJ", icon: Headphones, jobs: "22 Providers", href: "/services/dj" },
      { title: "Live Bands", icon: Music2, jobs: "18 Providers", href: "/services/live-bands" },
      { title: "Event Planning", icon: Briefcase, jobs: "35 Providers", href: "/services/event-planning" },
      { title: "Catering", icon: Utensils, jobs: "42 Providers", href: "/services/catering" },
      { title: "Decor", icon: Sparkles, jobs: "27 Providers", href: "/services/decor" },
      { title: "MC Services", icon: Mic2, jobs: "14 Providers", href: "/services/mc" },
      { title: "Sound Systems", icon: Music2, jobs: "20 Providers", href: "/services/sound" },
    ],
  },
  {
    id: 3,
    name: "Beauty & Wellness",
    icon: Scissors,
    description: "Look and feel your best",
    categories: [
      { title: "Hair", icon: Scissors, jobs: "50 Providers", href: "/services/hair" },
      { title: "Makeup", icon: Sparkles, jobs: "27 Providers", href: "/services/makeup" },
      { title: "Nails", icon: Sparkles, jobs: "33 Providers", href: "/services/nails" },
      { title: "Massage", icon: HeartHandshake, jobs: "29 Providers", href: "/services/massage" },
      { title: "Spa", icon: Sparkles, jobs: "16 Providers", href: "/services/spa" },
      { title: "Barber", icon: Scissors, jobs: "38 Providers", href: "/services/barber" },
      { title: "Fitness", icon: Dumbbell, jobs: "24 Providers", href: "/services/fitness" },
      { title: "Yoga", icon: HeartHandshake, jobs: "19 Providers", href: "/services/yoga" },
      { title: "Nutrition", icon: ChefHat, jobs: "15 Providers", href: "/services/nutrition" },
      { title: "Dental", icon: Stethoscope, jobs: "12 Providers", href: "/services/dental" },
    ],
  },
];

export default function Categories() {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Get all categories from all groups
  const allCategories = useMemo(() => {
    return categoryGroups.flatMap(group => 
      group.categories.map(cat => ({
        ...cat,
        groupName: group.name,
        groupId: group.id
      }))
    );
  }, []);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return null;
    
    const query = searchQuery.toLowerCase().trim();
    return allCategories.filter(cat =>
      cat.title.toLowerCase().includes(query) ||
      cat.groupName.toLowerCase().includes(query) ||
      cat.jobs.toLowerCase().includes(query)
    );
  }, [searchQuery, allCategories]);

  const currentGroup = categoryGroups[page];

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  const hasSearchResults = searchQuery.trim() && filteredCategories;

  return (
    <section className="bg-[#f5f2ed] min-h-screen py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-[#111] text-center">
            All Available Categories
          </h1>
          <p className="text-center text-base sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore hundreds of verified professionals across different categories
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 sm:mb-10">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search categories by name, group, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 py-6 bg-white border-gray-200 shadow-lg hover:shadow-xl rounded-2xl text-sm sm:text-base focus:border-black focus:ring-black transition-shadow duration-300"
            />
            {searchQuery && (
              <Button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        {hasSearchResults ? (
          // Search Results
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Search Results
                  </h2>
                  <p className="text-sm text-gray-500">
                    Found {filteredCategories.length} category{filteredCategories.length !== 1 ? 'ies' : ''}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-gray-200 text-gray-700 border-0 px-4 py-1.5 text-sm font-medium">
                  {filteredCategories.length} Results
                </Badge>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {filteredCategories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {filteredCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={category.title}
                        href="/providers"
                        className="group"
                      >
                        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-4 text-xs sm:text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-black hover:bg-black hover:text-white hover:shadow-xl">
                          <Icon className="h-6 w-6 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
                          <span className="text-center text-xs sm:text-sm">{category.title}</span>
                          <span className="text-[10px] sm:text-xs text-gray-400 group-hover:text-gray-300">
                            {category.jobs}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">No categories found</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Try adjusting your search terms
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearSearch}
                    className="mt-6 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Category Group
          <>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                      {currentGroup.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {currentGroup.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-gray-200 text-gray-700 border-0 px-4 py-1.5 text-sm font-medium">
                    {currentGroup.categories.length} Categories
                  </Badge>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {currentGroup.categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={category.title}
                        href="/providers"
                        className="group"
                      >
                        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-4 text-xs sm:text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-black hover:bg-black hover:text-white hover:shadow-xl">
                          <Icon className="h-6 w-6 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
                          <div className="flex flex-row gap-2">
                           <span className="text-center text-xs sm:text-sm">{category.title}</span>
                           <span className="text-[10px] sm:text-xs text-cyan-700 group-hover:text-gray-300 my-auto">({category.jobs})</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-10 flex flex-col items-center gap-4">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 0) setPage(page - 1);
                      }}
                      className={page === 0 ? "pointer-events-none opacity-50" : "hover:bg-black hover:text-white transition-colors"}
                    />
                  </PaginationItem>

                  {categoryGroups.map((group, index) => (
                    <PaginationItem key={group.id}>
                      <PaginationLink
                        href="#"
                        isActive={page === index}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(index);
                        }}
                        className={`transition-all duration-300 ${
                          page === index 
                            ? "bg-black text-white hover:bg-neutral-800" 
                            : "hover:bg-black hover:text-white"
                        }`}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < categoryGroups.length - 1) {
                          setPage(page + 1);
                        }
                      }}
                      className={page === categoryGroups.length - 1 ? "pointer-events-none opacity-50" : "hover:bg-black hover:text-white transition-colors"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              {/* Page Indicator */}
              <p className="text-sm text-gray-500">
                Page {page + 1} of {categoryGroups.length}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}