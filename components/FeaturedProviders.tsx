"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";

const providers = [
  {
    id: 1,
    name: "Silver Lining Studios",
    city: "San Francisco, CA",
    category: "Photography",
    rating: "4.9",
    price: "$2,400",
    image: "/photography.jpg",
  },
  {
    id: 2,
    name: "Sonic Atmosphere",
    city: "San Jose, CA",
    category: "DJ",
    rating: "5.0",
    price: "$850",
    image: "/photography.jpg",
  },
  {
    id: 3,
    name: "Harvest Table Co.",
    city: "Napa Valley, CA",
    category: "Catering",
    rating: "4.8",
    price: "$45",
    image: "/photography.jpg",
  },  
  {
    id: 4,
    name: "NeoBooth",
    city: "Crocodile, Rusape",
    category: "Events",
    rating: "4.8",
    price: "$500",
    image: "/photography.jpg",
  },
];

export default function FeaturedProviders() {
  return (
    <section className="bg-[#faf8f5] py-12 sm:py-16">
      <div className="px-4 sm:px-6">
        {/* Header */}
        <div className="text-center border-b pb-4 sm:pb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-neutral-900">
            Top Providers
          </h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-neutral-500">
            The highest-rated event specialists available for your next date.
          </p>
        </div>

        {/* Provider Grid */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {providers.map((provider) => (
            <Link
              key={provider.id}
              href="/provider"
              className="group"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[28px]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={provider.image}
                    alt={provider.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="mt-3 sm:mt-4 md:mt-5 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-2xl font-serif truncate">
                    {provider.name}
                  </h3>

                  <p className="mt-0.5 sm:mt-1 text-sm sm:text-sm text-neutral-500 truncate">
                    {provider.category}
                  </p>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-neutral-500 truncate">
                    {provider.city}
                  </p>

                  <p className="mt-1 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg font-serif italic">
                    From {provider.price}
                  </p>
                </div>

                <Badge
                  variant="secondary"
                  className="rounded-full bg-white px-2 py-0.5 sm:px-3 sm:py-1 shadow-sm flex-shrink-0 text-xs sm:text-sm"
                >
                  <Star className="mr-0.5 sm:mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3 fill-black" />
                  {provider.rating}
                </Badge>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 sm:mt-12 md:mt-14 flex justify-center">
          <Button
            size="lg"
            className="rounded-full px-6 sm:px-8 text-sm sm:text-base"
          >
            <Link href="/providers" className="flex flex-row gap-1 sm:gap-2 items-center">
              View All Providers
              <ArrowRight size={18} className="sm:size-[22px] md:size-[24px]" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}