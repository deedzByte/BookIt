"use client";

import Link from "next/link";
import {
  Camera,
  CameraIcon,
  Video,
  Headphones,
  Mic2,
  Sparkles,
  Utensils,
  ScissorsIcon,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

const categories = [
  { label: "Photo Booth", icon: Camera },
  { label: "Photography", icon: CameraIcon },
  { label: "Videography", icon: Video },
  { label: "DJ", icon: Headphones },
  { label: "MC & Hosts", icon: Mic2 },
  { label: "Decor", icon: Sparkles },
  { label: "Catering", icon: Utensils },
  { label: "Barber", icon: ScissorsIcon },
];

export default function Hero() {
  return (
    <section className="bg-[#f5f2ed]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight tracking-tight text-[#111]">
            Book trusted professionals <br />
            for every occasion.
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            From photographers and DJs to caterers, decorators, and venues—
            discover verified service providers in minutes.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-8 sm:mt-12 flex max-w-5xl flex-col overflow-hidden rounded-2xl sm:rounded-4xl border border-gray-200 bg-white shadow-xl md:flex-row">
          <div className="flex-1 px-4 sm:px-6 py-4 sm:py-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Service
            </p>

            <input
              className="mt-1 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              placeholder="Photography, DJ, Catering..."
            />
          </div>

          <div className="hidden w-px bg-gray-200 md:block" />

          <div className="flex-1 px-4 sm:px-6 py-4 sm:py-5 border-t md:border-t-0 border-gray-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Location
            </p>

            <input
              className="mt-1 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              placeholder="Harare, Zimbabwe"
            />
          </div>

          <div className="flex items-center justify-center p-3 sm:p-4 border-t md:border-t-0 border-gray-200">
            <Button className="w-full sm:w-auto rounded-full bg-black px-6 sm:px-8 py-3 font-medium text-white transition hover:bg-neutral-800 text-sm sm:text-base">
              Find Services
            </Button>
          </div>
        </div>

        {/* Categories - Improved Mobile Layout */}
        <div className="mt-10 sm:mt-14">
          {/* Grid layout for better mobile structure */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {categories.map(({ label, icon: Icon }) => (
              <Button
                key={label}
                className="group flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-xl sm:rounded-full border border-gray-200 bg-white px-3 sm:px-5 py-3 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white hover:shadow-lg"
              >
                <Icon className="h-4 w-4 sm:h-4 sm:w-4 transition-transform group-hover:scale-110" />
                <span className="text-center sm:text-left">{label}</span>
              </Button>
            ))}
          </div>

          {/* View All */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              href="/categories"
              className="flex flex-row gap-2 text-sm font-medium text-gray-700 underline underline-offset-4 transition hover:text-black"
            >
              View All Categories
              <ArrowRight size={15} className="mt-1"/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}