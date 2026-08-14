"use client"

import Link from "next/link"
import { BriefcaseBusiness, MapPin } from "lucide-react"
import { toast } from "sonner"

import { useMarketplace } from "@/components/marketplace/MarketplaceProvider"

export default function TasksPage() {
  const { tasks, addActivity } = useMarketplace()

  function makeOffer(title: string) {
    addActivity({
      type: "task",
      title: `Offer started: ${title}`,
      detail: "Draft offer saved on this device",
      status: "pending",
    })
    toast.success("Offer draft started", {
      description: "It is saved in Activity and ready for the future API.",
    })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#25705f]">
            Local opportunities
          </p>
          <h1 className="mt-1 text-3xl font-semibold">Open tasks</h1>
          <p className="mt-2 text-zinc-500">
            Customers describe the job; providers can respond with an offer.
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#173f36] px-6 font-semibold text-white"
        >
          Post a task
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {tasks.map((task) => (
          <article
            key={task.id}
            className="rounded-2xl border bg-white p-5 sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#173f36]/10">
                    <BriefcaseBusiness className="size-4 text-[#173f36]" />
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    {task.status}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold">{task.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                  {task.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {task.location}
                  </span>
                  <span>{task.date}</span>
                  <span>{task.category}</span>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-xl font-bold text-[#25705f]">
                  {task.budget}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {task.offers} offers
                </p>
                <button
                  onClick={() => makeOffer(task.title)}
                  className="mt-4 min-h-11 rounded-xl border px-5 text-sm font-semibold"
                >
                  Make an offer
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
