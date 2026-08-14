"use client"

import Link from "next/link"
import { ClipboardList } from "lucide-react"
import { useMarketplace } from "@/components/marketplace/MarketplaceProvider"

export default function ActivityPage() {
  const { activity, tasks } = useMarketplace()
  const items = [
    ...activity,
    ...tasks
      .filter(
        (task) =>
          task.id.startsWith("task-") && !["task-1", "task-2"].includes(task.id)
      )
      .map((task) => ({
        id: task.id,
        type: "task" as const,
        title: task.title,
        detail: `${task.offers} offers · ${task.location}`,
        status: "pending" as const,
        createdAt: "",
      })),
  ]
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-[#25705f]">Your account</p>
      <h1 className="mt-1 text-3xl font-semibold">Activity</h1>
      <div className="mt-8 space-y-3">
        {items.length ? (
          items.map((item) => (
            <article
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border bg-white p-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#173f36]/10">
                <ClipboardList className="size-5 text-[#173f36]" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="truncate font-semibold">{item.title}</h2>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                    {item.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-500">{item.detail}</p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed p-12 text-center">
            <h2 className="text-xl font-semibold">Nothing here yet</h2>
            <p className="mt-2 text-zinc-500">
              Bookings, orders and posted tasks will appear here.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[#173f36] px-5 font-semibold text-white"
            >
              Explore marketplace
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
