"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ChevronRight, Phone, Mail, Clock, Award, Calendar, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const types = [
  {
    id: 1,
    name: "360 Photo Booth",
    description: "Spin your moments in 360° style.",
    image: "/360.jpg",
    price: "$350",
  },
  {
    id: 2,
    name: "Open Air Booth",
    description: "Clean, modern, and spacious setup.",
    image: "/openair.jpg",
    price: "$250",
  },
  {
    id: 3,
    name: "Mirror Booth",
    description: "Interactive mirror experience.",
    image: "/mirror.JPG",
    price: "$400",
  },
  {
    id: 4,
    name: "Selfie Booth",
    description: "Perfect for instant selfies and fun moments.",
    image: "/selfie.jpg",
    price: "$200",
  }
];

const tags = [
  { id: 1, name: "Photobooth" },
  { id: 2, name: "360 booth" },
  { id: 3, name: "Events" },
];

const reviews = [
  {
    id: 1,
    name: "Sarah J.",
    rating: 5,
    comment: "Amazing experience! The 360 booth was the highlight of our wedding."
  },
  {
    id: 2,
    name: "Mike T.",
    rating: 5,
    comment: "Professional team and beautiful photos. Highly recommend."
  },
  {
    id: 3,
    name: "Ashley M.",
    rating: 5,
    comment: "Everyone loved the props and unlimited prints."
  },
  {
    id: 4,
    name: "Brian K.",
    rating: 5,
    comment: "Arrived on time, very friendly staff and excellent service."
  },
  {
    id: 5,
    name: "Natasha P.",
    rating: 5,
    comment: "The mirror booth was incredible. Our guests couldn't stop using it."
  },
  {
    id: 6,
    name: "Daniel C.",
    rating: 5,
    comment: "Would definitely book them again for our corporate event."
  },
  {
    id: 7,
    name: "Emily R.",
    rating: 5,
    comment: "Fantastic quality prints and super easy digital sharing."
  },
  {
    id: 8,
    name: "Joseph N.",
    rating: 5,
    comment: "Excellent communication from booking until the event."
  },
];

export default function ProviderProfile() {
  const router = useRouter();
  const scrollingReviews = [...reviews, ...reviews];
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Back Button */}
        <Link
         href="/providers"
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to providers
        </Link>

        {/* Profile Header */}
        <div className="grid gap-6 lg:gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl bg-white">
            <img
              src="/photobooth.webp"
              alt="Provider profile"
              className="w-full h-full object-cover"
            />
            {/* Status Badge */}
            <Badge className="absolute top-4 left-4 bg-green-500 text-white border-0 px-3 py-1 text-xs font-medium shadow-lg">
              Available Now
            </Badge>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <Badge className="mb-4 w-fit rounded-full bg-black text-white border-0 px-4 py-1.5 text-xs font-medium">
              DJ & Entertainment
            </Badge>

            <h1 className="text-2xl sm:text-5xl font-medium tracking-tight text-black">
              Sonic Atmosphere
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              San Jose, CA
              <span className="mx-2">•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Mon-Sat 9AM-9PM
              </span>
            </div>

            <p className="mt-4 max-w-lg leading-relaxed text-gray-600">
              Open-format DJs blending house, afrobeats and classic soul to create 
              unforgettable wedding and private event experiences.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-gray-900">5.0</span>
              </div>
              <Link href="/reviews" className="text-sm text-cyan-700 hover:underline">
                84 reviews
              </Link>
              {tags.map((tag) => (
                <Badge key={tag.id} className="bg-cyan-700 text-white border-0">
                  {tag.name}
                </Badge>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <p className="text-lg font-bold text-gray-900">250+</p>
                <p className="text-xs text-gray-500">Events</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <p className="text-lg font-bold text-gray-900">98%</p>
                <p className="text-xs text-gray-500">Satisfaction</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <p className="text-lg font-bold text-gray-900">5 yrs</p>
                <p className="text-xs text-gray-500">Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-xl font-medium tracking-tight text-black">
              Our Booth Types
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Choose from our range of photobooth experiences
            </p>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {types.map((type) => (
              <Link
                key={type.id}
                href="/admin/packages"
                className="group block overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Badge className="absolute bottom-2 right-2 bg-white/90 text-gray-800 border-0 text-xs">
                    {type.price}
                  </Badge>
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {type.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                    {type.description}
                  </p>
                  <Button
                    variant="secondary"
                    className="pointer-events-none mt-2 w-full rounded-full border border-gray-200 text-xs font-medium"
                  >
                    View Packages
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
<div className="mt-14 overflow-hidden">

<div className="mx-auto mb-6 flex flex-col items-center text-center">
  <h2 className="text-xl font-medium">
    Happy Clients
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Trusted by hundreds of clients
  </p>
</div>

    <div className="relative overflow-hidden">

        {/* Fade */}

        <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-gray-50 to-transparent" />

        <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent" />

        <div className="flex animate-marquee gap-5 w-max">

            {scrollingReviews.map((review, index) => (

                <Card
                    key={index}
                    className="w-[340px] shrink-0 rounded-2xl border border-gray-200 bg-white"
                >
                    <CardContent className="p-5">

                        <div className="flex items-center gap-3">

                            <Avatar>
                                <AvatarFallback className="bg-cyan-100 text-cyan-700">
                                    {review.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>

                            <div>

                                <h4 className="font-semibold">
                                    {review.name}
                                </h4>

                                <div className="mt-1 flex gap-1">

                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3.5 w-3.5 ${
                                                i < review.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    ))}

                                </div>

                            </div>

                        </div>

                        <p className="mt-4 text-sm leading-6 text-gray-600">
                            "{review.comment}"
                        </p>

                    </CardContent>
                </Card>

            ))}

        </div>

    </div>

</div>
      </div>
    </section>
  );
}