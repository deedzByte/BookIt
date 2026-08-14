"use client"

import { useEffect, useMemo, useState } from "react"
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  UserRound,
} from "lucide-react"
import { whatsappUrl } from "@/lib/whatsapp"

type BookingDraft = {
  service: string
  packageName: string
  date: string
  time: string
  duration: string
  location: string
  name: string
  phone: string
  notes: string
}

const initialDraft: BookingDraft = {
  service: "Photography",
  packageName: "Standard",
  date: "",
  time: "",
  duration: "2 hours",
  location: "",
  name: "",
  phone: "",
  notes: "",
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-[#ded8cf] bg-white px-3.5 py-3 text-sm text-[#29251f] outline-none transition focus:border-[#25705f] focus:ring-2 focus:ring-[#25705f]/15"

export default function BookPage() {
  const [draft, setDraft] = useState<BookingDraft>(initialDraft)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let restored = initialDraft
    try {
      const stored = localStorage.getItem("bookit-booking-draft")
      if (stored) restored = { ...initialDraft, ...JSON.parse(stored) }
    } catch {
      localStorage.removeItem("bookit-booking-draft")
    }
    queueMicrotask(() => {
      setDraft(restored)
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (loaded)
      localStorage.setItem("bookit-booking-draft", JSON.stringify(draft))
  }, [draft, loaded])

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const update = (field: keyof BookingDraft, value: string) =>
    setDraft((current) => ({ ...current, [field]: value }))

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const reference = `BI-${draft.date.replaceAll("-", "")}-${draft.time.replace(":", "")}`
    const message = [
      "*New BookIt booking request*",
      `Reference: ${reference}`,
      "",
      `Service: ${draft.service}`,
      `Package: ${draft.packageName}`,
      `Date: ${draft.date}`,
      `Time: ${draft.time}`,
      `Duration: ${draft.duration}`,
      `Location: ${draft.location}`,
      "",
      `Customer: ${draft.name}`,
      `Phone: ${draft.phone}`,
      draft.notes ? `Notes: ${draft.notes}` : "Notes: None",
      "",
      "Please confirm availability and the final price.",
    ].join("\n")
    localStorage.removeItem("bookit-booking-draft")
    window.location.assign(whatsappUrl(message))
  }

  const steps = [
    { icon: CalendarDays, label: "Choose the service and schedule" },
    { icon: UserRound, label: "Add your contact and event details" },
    { icon: MessageCircle, label: "Send the complete request on WhatsApp" },
    { icon: CheckCircle2, label: "Provider confirms availability and price" },
  ]

  return (
    <div className="bg-[#faf9f7] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-3xl bg-[#173f36] p-7 text-white sm:p-9">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            Fast, clear, human
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">
            Book once. Confirm on WhatsApp.
          </h1>
          <p className="mt-4 leading-7 text-white/75">
            Share every detail a provider needs in one structured message—no
            repeated questions or lost information.
          </p>
          <ol className="mt-8 space-y-5 text-sm">
            {steps.map(({ icon: Icon, label }, index) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <b className="mr-2 text-white/50">{index + 1}</b>
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </aside>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-[#e5e0d8] bg-white p-6 shadow-[0_20px_60px_-35px_rgba(44,37,27,.35)] sm:p-9"
        >
          <p className="text-sm font-semibold text-[#25705f]">
            Booking request
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-[#24211d]">
            Tell us what you need
          </h2>
          <p className="mt-2 text-sm text-[#777167]">
            Your progress is saved on this device until you send it.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Service
              <select
                required
                value={draft.service}
                onChange={(e) => update("service", e.target.value)}
                className={inputClass}
              >
                {[
                  "Photography",
                  "Photo booth",
                  "Videography",
                  "DJ",
                  "Catering",
                  "Decor",
                  "Venue",
                  "Other",
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium">
              Package
              <select
                required
                value={draft.packageName}
                onChange={(e) => update("packageName", e.target.value)}
                className={inputClass}
              >
                {["Essential", "Standard", "Premium", "Custom quote"].map(
                  (item) => (
                    <option key={item}>{item}</option>
                  )
                )}
              </select>
            </label>
            <label className="text-sm font-medium">
              Date
              <input
                required
                min={minDate}
                type="date"
                value={draft.date}
                onChange={(e) => update("date", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-medium">
              Start time
              <input
                required
                type="time"
                value={draft.time}
                onChange={(e) => update("time", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-medium">
              Duration
              <div className="relative">
                <Clock3 className="pointer-events-none absolute top-5 left-3.5 h-4 w-4 text-[#777167]" />
                <select
                  required
                  value={draft.duration}
                  onChange={(e) => update("duration", e.target.value)}
                  className={`${inputClass} pl-10`}
                >
                  {[
                    "1 hour",
                    "2 hours",
                    "3 hours",
                    "4 hours",
                    "Half day",
                    "Full day",
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </label>
            <label className="text-sm font-medium">
              Location
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-5 left-3.5 h-4 w-4 text-[#777167]" />
                <input
                  required
                  autoComplete="street-address"
                  placeholder="Venue or suburb"
                  value={draft.location}
                  onChange={(e) => update("location", e.target.value)}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </label>
            <label className="text-sm font-medium">
              Your name
              <input
                required
                autoComplete="name"
                placeholder="Full name"
                value={draft.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-medium">
              WhatsApp number
              <input
                required
                autoComplete="tel"
                inputMode="tel"
                placeholder="e.g. +263 77 123 4567"
                value={draft.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Extra details
              <textarea
                rows={4}
                maxLength={600}
                placeholder="Guest count, event type, access notes, special requests…"
                value={draft.notes}
                onChange={(e) => update("notes", e.target.value)}
                className={`${inputClass} resize-y`}
              />
              <span className="mt-1 block text-right text-xs text-[#969087]">
                {draft.notes.length}/600
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-[#102d25] transition hover:bg-[#20bd5a] focus:ring-2 focus:ring-[#173f36] focus:ring-offset-2 focus:outline-none"
          >
            <MessageCircle className="h-5 w-5" />
            Continue on WhatsApp
          </button>
          <p className="mt-3 text-center text-xs leading-5 text-[#777167]">
            Sending opens WhatsApp. The provider must confirm availability and
            price before your booking is final.
          </p>
        </form>
      </div>
    </div>
  )
}
