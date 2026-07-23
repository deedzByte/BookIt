"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Award, Camera, Sparkles, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { types } from "util";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Link from "next/link";


const packages = [
  {
    id: 1,
    title: "Basic Package",
    subtitle: "Simple & Fun Memories",
    image: "/cherries.jpeg",
    price: "$400",
    duration: "4 Hours",
    extra: "$150 per additional hour",
    description:
      "Perfect for intimate celebrations and clients who want a beautiful photo booth experience with all the essentials.",
    features: [
      "Open Air Booth",
      "Digital Gallery",
      "Friendly Booth Attendant",
      "Standard Backdrop",
    ],
    icon: Camera,
    color: "from-blue-500 to-cyan-400",
    badge: "Best Value",
  },
  {
    id: 2,
    title: "Standard Package",
    subtitle: "Stylish & Seamless",
    image: "/cherries.jpeg",
    price: "$600",
    duration: "4 Hours",
    extra: "$150 per additional hour",
    description:
      "Our most popular package with unlimited prints, premium backdrop and customized overlays.",
    features: [
      "Everything in Basic",
      "Unlimited Prints",
      "Premium Backdrop",
      "Custom Overlay",
      "Online Gallery",
    ],
    icon: Sparkles,
    color: "from-purple-500 to-pink-400",
    badge: "Most Popular",
    popular: true,
  },
  {
    id: 3,
    title: "Premium Package",
    subtitle: "Luxury Experience",
    image: "/cherries.jpeg",
    price: "$800",
    duration: "4 Hours",
    extra: "$150 per additional hour",
    description:
      "Designed for weddings and luxury events with premium styling and keepsakes.",
    features: [
      "Everything in Standard",
      "Guest Book",
      "VIP Setup",
      "Premium Props",
      "USB of All Photos",
    ],
    icon: Award,
    color: "from-amber-500 to-orange-400",
    badge: "Luxury",
  },
];

export default function ProviderProfile() {

    const router = useRouter()
  return (
    <section className="bg-[#faf8f5] min-h-screen py-2">
      {/* ================= Packages ================= */}
<div className="mx-auto mt-8 max-w-7xl px-6">
  <div className="mb-5 text-center">

    <h2 className="mt-4 text-3xl">
      Choose Your Package
    </h2>

    <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
      Transparent pricing with premium experiences for every type of event.
    </p>
  </div>

  <div className="flex flex-wrap justify-center gap-8">
    {packages.map((pkg) => {
      const IconComponent = pkg.icon;
      const isPopular = pkg.id === 2;

      return (
        <div key={pkg.id} className="relative w-full max-w-sm">
          {isPopular && (
            <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
              <div className="rounded-full bg-gray-500 px-5 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                Most Popular
              </div>
            </div>
          )}
<Link
  href="/admin/book"
  className="group relative block"
>
          <Card
            className={`overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              isPopular
                ? "ring-2 ring-cyan-500"
                : "hover:ring-1 hover:ring-neutral-200"
            }`}
          >
            {/* Header */}
            <div className="px-5 pt-4">
              <div className="flex justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">

                    <span className="text-xs uppercase tracking-widest opacity-90 text-gray-500">
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-500">
                    {pkg.title}
                  </h3>

                  <p className="mt-1 text-sm opacity-90 text-gray-400">
                    {pkg.subtitle}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-600">
                    {pkg.price}
                  </p>

                  <p className="text-xs opacity-80 text-gray-500">
                    {pkg.duration}
                  </p>
                </div>
              </div>
            </div>

            <CardContent>
              <p className="text-sm leading-6 text-neutral-600 text-gray-400">
                {pkg.description}
              </p>

              <Separator className="mt-2 mb-2"/>

              <div>
                <p className="mb-3 text-sm font-semibold">
                  Included
                </p>

                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-neutral-600"
                    >
                      <div className="rounded-full bg-green-100 p-1">
                        <Check className="size-3 text-green-600" />
                      </div>

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-neutral-100 p-3">
                <div className="flex justify-between text-sm">
                  <span>Extra Hour</span>

                  <span className="font-semibold">
                    {pkg.extra}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-5 pt-0">
              <Button
                onClick={() => router.push("/admin/book")}
                className={`h-11 w-full rounded-xl font-semibold ${
                  isPopular
                    ? "bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600"
                    : ""
                }`}
              >
                {isPopular ? (
                  <>
                    <Sparkles className="mr-2 size-4" />
                    Choose Package
                  </>
                ) : (
                  `Book ${pkg.title.replace(" Package", "")}`
                )}
              </Button>
            </CardFooter>
  </Card>
</Link>
        </div>
      );
    })}
  </div>
</div>
    </section>
  );
}