"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import {
  BriefcaseBusiness,
  CheckCircle2,
  Heart,
  MapPin,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react"
import { toast } from "sonner"
import { listings } from "@/lib/marketplace"
import { useMarketplace } from "./MarketplaceProvider"

type View = "all" | "service" | "product"

export default function MarketplaceHome() {
  const [view, setView] = useState<View>("all")
  const [query, setQuery] = useState("")
  const { addToCart, savedIds, tasks, toggleSaved } = useMarketplace()

  const filtered = useMemo(
    () =>
      listings.filter((listing) => {
        const matchesView = view === "all" || listing.kind === view
        const haystack =
          `${listing.title} ${listing.provider} ${listing.category} ${listing.location}`.toLowerCase()
        return matchesView && haystack.includes(query.trim().toLowerCase())
      }),
    [query, view]
  )

  return (
    <div className="bg-[#faf9f7]">
      <section className="border-b border-[#e8e2d9] bg-[#173f36] px-4 py-12 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
              Zimbabwe&apos;s local service marketplace
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Find it, book it, or post the task.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Shop local products, book trusted professionals, or describe a job
              and receive offers—all with a clean WhatsApp handoff.
            </p>
          </div>
          <div className="mt-8 flex max-w-3xl items-center gap-3 rounded-2xl bg-white p-2 shadow-xl">
            <Search className="ml-3 size-5 text-zinc-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-h-11 min-w-0 flex-1 bg-transparent text-base text-zinc-900 outline-none"
              placeholder="Search photography, plumbing, décor…"
              aria-label="Search marketplace"
            />
            <Link
              href="/tasks/new"
              className="hidden min-h-11 items-center rounded-xl bg-[#f2c14e] px-5 text-sm font-bold text-[#173f36] sm:inline-flex"
            >
              Post a task
            </Link>
          </div>
          <Link
            href="/tasks/new"
            className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-[#f2c14e] px-5 text-sm font-bold text-[#173f36] sm:hidden"
          >
            Post a task
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          aria-label="Marketplace filters"
        >
          {(["all", "service", "product"] as View[]).map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold capitalize ${view === item ? "bg-[#173f36] text-white" : "border bg-white text-zinc-700"}`}
            >
              {item === "all" ? "Everything" : `${item}s`}
            </button>
          ))}
          <Link
            href="/tasks"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border bg-white px-5 text-sm font-semibold text-zinc-700"
          >
            <BriefcaseBusiness className="size-4" />
            Open tasks
          </Link>
        </div>

        <div className="mt-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#25705f]">
              Explore nearby
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-zinc-900 sm:text-3xl">
              Services and products
            </h2>
          </div>
          <p className="text-sm text-zinc-500">{filtered.length} results</p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <article
              key={listing.id}
              className="overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] bg-zinc-100">
                <Image
                  src={listing.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-zinc-700 capitalize">
                  {listing.kind}
                </span>
                <button
                  onClick={() => toggleSaved(listing.id)}
                  className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full bg-white/95 text-zinc-700 shadow"
                  aria-label={
                    savedIds.includes(listing.id)
                      ? `Unsave ${listing.title}`
                      : `Save ${listing.title}`
                  }
                >
                  <Heart
                    className={`size-5 ${savedIds.includes(listing.id) ? "fill-red-500 text-red-500" : ""}`}
                  />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[#25705f] uppercase">
                      {listing.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-zinc-900">
                      {listing.title}
                    </h3>
                  </div>
                  <p className="shrink-0 text-lg font-bold text-zinc-900">
                    ${listing.price}
                  </p>
                </div>
                <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                  {listing.provider}
                  {listing.verified && (
                    <CheckCircle2
                      className="size-4 text-[#25705f]"
                      aria-label="Verified provider"
                    />
                  )}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">
                  {listing.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-zinc-600">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    {listing.rating} ({listing.reviews})
                  </span>
                  <span className="flex items-center gap-1 text-zinc-500">
                    <MapPin className="size-4" />
                    {listing.location}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    href={`/provider?listing=${listing.id}`}
                    className="flex min-h-11 items-center justify-center rounded-xl border px-3 text-sm font-semibold text-zinc-700"
                  >
                    View details
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(listing)
                      toast.success(`${listing.title} added`)
                    }}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#173f36] px-3 text-sm font-semibold text-white"
                  >
                    <ShoppingBag className="size-4" />
                    {listing.kind === "service" ? "Book" : "Add"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-[#25705f]">
                Task marketplace
              </p>
              <h2 className="mt-1 text-2xl font-semibold">
                People need help nearby
              </h2>
            </div>
            <Link
              href="/tasks"
              className="text-sm font-semibold text-[#25705f]"
            >
              View all →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tasks.slice(0, 2).map((task) => (
              <Link
                href="/tasks"
                key={task.id}
                className="rounded-2xl border p-5 transition hover:border-[#25705f]"
              >
                <div className="flex justify-between gap-4">
                  <h3 className="font-semibold">{task.title}</h3>
                  <span className="shrink-0 font-bold text-[#25705f]">
                    {task.budget}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-500">
                  {task.location} · {task.date} · {task.offers} offers
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
