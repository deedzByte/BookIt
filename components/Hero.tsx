"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
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
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react"
import { Button } from "./ui/button"

const categories = [
  { label: "Photo Booth", icon: Camera },
  { label: "Photography", icon: CameraIcon },
  { label: "Videography", icon: Video },
  { label: "DJ", icon: Headphones },
  { label: "MC & Hosts", icon: Mic2 },
  { label: "Decor", icon: Sparkles },
  { label: "Catering", icon: Utensils },
  { label: "Barber", icon: ScissorsIcon },
]

export default function Hero() {
  const router = useRouter()
  const [service, setService] = useState("")
  const [location, setLocation] = useState("")

  return (
    <section className="relative isolate overflow-hidden bg-[#faf9f7]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_50%_0%,#efe7da_0%,transparent_68%)]" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#e8e3da] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#5f5a52] shadow-sm backdrop-blur sm:text-sm">
            <ShieldCheck
              className="h-3.5 w-3.5 text-[#25705f]"
              aria-hidden="true"
            />
            Verified professionals for every celebration
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.045em] text-balance text-[#24211d] sm:mt-7 sm:text-6xl lg:text-7xl">
            Make every occasion feel effortlessly special.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-pretty text-[#6b665e] sm:text-lg sm:leading-8">
            Find trusted photographers, DJs, caterers, and more—then book the
            people who bring your best moments to life.
          </p>
        </div>

        <form
          className="mx-auto mt-9 flex max-w-4xl flex-col rounded-2xl border border-[#e5e0d8] bg-white p-2 shadow-[0_16px_50px_-28px_rgba(44,37,27,0.38)] md:mt-12 md:flex-row md:items-center md:rounded-full"
          onSubmit={(event) => {
            event.preventDefault()
            const params = new URLSearchParams()
            if (service.trim()) params.set("q", service.trim())
            if (location.trim()) params.set("location", location.trim())
            router.push(`/providers${params.size ? `?${params}` : ""}`)
          }}
        >
          <label className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3.5 transition-colors focus-within:bg-[#faf9f7] sm:px-4 md:rounded-full">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f1eb] text-[#39342d] transition-colors group-focus-within:bg-[#e9e1d5]">
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className="min-w-0 text-left">
              <span className="block text-xs font-semibold text-[#464139]">
                What are you looking for?
              </span>
              <input
                value={service}
                onChange={(event) => setService(event.target.value)}
                className="mt-0.5 w-full min-w-0 bg-transparent text-sm text-[#29251f] outline-none placeholder:text-[#969087]"
                placeholder="Photography, DJ, catering..."
                aria-label="Service"
              />
            </span>
          </label>

          <div className="mx-3 h-px bg-[#ebe7e0] md:mx-0 md:h-10 md:w-px" />

          <label className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3.5 transition-colors focus-within:bg-[#faf9f7] sm:px-4 md:rounded-full">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f1eb] text-[#39342d] transition-colors group-focus-within:bg-[#e9e1d5]">
              <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className="min-w-0 text-left">
              <span className="block text-xs font-semibold text-[#464139]">
                Where?
              </span>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="mt-0.5 w-full min-w-0 bg-transparent text-sm text-[#29251f] outline-none placeholder:text-[#969087]"
                placeholder="Harare, Zimbabwe"
                aria-label="Location"
              />
            </span>
          </label>

          <button
            type="submit"
            className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#29251f] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#454037] md:mt-0 md:w-auto md:rounded-full"
          >
            <Search className="mr-2 h-4 w-4 md:hidden" aria-hidden="true" />
            Find providers
          </button>
        </form>

        <div className="mt-12 sm:mt-16">
          <p className="mb-4 text-center text-sm font-medium text-[#777167]">
            Browse popular categories
          </p>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {categories.map(({ label, icon: Icon }) => (
              <Button
                key={label}
                variant="outline"
                className="group h-12 justify-start gap-2.5 rounded-xl border-[#e8e3da] bg-white px-3.5 text-sm font-medium text-[#4c473f] shadow-[0_2px_5px_rgba(43,36,28,0.03)] transition-all hover:-translate-y-0.5 hover:border-[#bbb3a7] hover:bg-[#fffdf9] hover:text-[#29251f] hover:shadow-[0_8px_18px_-12px_rgba(43,36,28,0.3)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f5f1eb] text-[#5c554b] transition-colors group-hover:bg-[#ece4d9]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {label}
              </Button>
            ))}
          </div>

          <div className="mt-7 flex justify-center">
            <Link
              href="/categories"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#4a443c] transition-colors hover:text-[#181511]"
            >
              Explore all categories
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
