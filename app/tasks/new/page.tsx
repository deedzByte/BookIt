"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useMarketplace } from "@/components/marketplace/MarketplaceProvider"

export default function NewTaskPage() {
  const router = useRouter()
  const { addTask, addActivity } = useMarketplace()
  const [form, setForm] = useState({
    title: "",
    category: "Home services",
    location: "",
    budget: "",
    date: "Flexible",
    description: "",
  })
  const field =
    "mt-1.5 min-h-12 w-full rounded-xl border bg-white px-3.5 text-base outline-none focus:border-[#25705f] focus:ring-2 focus:ring-[#25705f]/15"
  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }))
  return (
    <div className="bg-[#faf9f7] px-4 py-10 sm:px-6">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          addTask(form)
          addActivity({
            type: "task",
            title: form.title,
            detail: `${form.category} · ${form.location}`,
            status: "pending",
          })
          toast.success("Task posted")
          router.push("/tasks")
        }}
        className="mx-auto max-w-2xl rounded-3xl border bg-white p-6 shadow-sm sm:p-9"
      >
        <p className="text-sm font-semibold text-[#25705f]">
          Get offers from local professionals
        </p>
        <h1 className="mt-1 text-3xl font-semibold">Post a task</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Describe the outcome you need. Contact details stay out of the public
          listing.
        </p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium sm:col-span-2">
            What do you need?
            <input
              required
              className={field}
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Repair a leaking kitchen sink"
            />
          </label>
          <label className="text-sm font-medium">
            Category
            <select
              className={field}
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              {[
                "Home services",
                "Events",
                "Transport",
                "Creative",
                "Technology",
                "Other",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Location
            <input
              required
              className={field}
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Suburb, city"
            />
          </label>
          <label className="text-sm font-medium">
            Budget
            <input
              required
              className={field}
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              placeholder="$50 or $40–$80"
            />
          </label>
          <label className="text-sm font-medium">
            When?
            <input
              required
              className={field}
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              placeholder="Date or flexible"
            />
          </label>
          <label className="text-sm font-medium sm:col-span-2">
            Details
            <textarea
              required
              rows={5}
              className={`${field} py-3`}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Include access, measurements, timing and what a good result looks like."
            />
          </label>
        </div>
        <button className="mt-7 min-h-12 w-full rounded-xl bg-[#173f36] px-6 font-semibold text-white">
          Publish task
        </button>
      </form>
    </div>
  )
}
