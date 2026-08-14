"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type {
  ActivityItem,
  CartLine,
  Listing,
  TaskRequest,
} from "@/lib/marketplace"
import { starterTasks } from "@/lib/marketplace"

interface MarketplaceContextValue {
  cart: CartLine[]
  tasks: TaskRequest[]
  activity: ActivityItem[]
  savedIds: string[]
  addToCart: (listing: Listing) => void
  changeQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  addTask: (task: Omit<TaskRequest, "id" | "status" | "offers">) => void
  addActivity: (activity: Omit<ActivityItem, "id" | "createdAt">) => void
  toggleSaved: (id: string) => void
}

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null)

const storageKey = "bookit-marketplace-v1"

export function MarketplaceProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cart, setCart] = useState<CartLine[]>([])
  const [tasks, setTasks] = useState<TaskRequest[]>(starterTasks)
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        queueMicrotask(() => {
          setCart(parsed.cart ?? [])
          setTasks(parsed.tasks?.length ? parsed.tasks : starterTasks)
          setActivity(parsed.activity ?? [])
          setSavedIds(parsed.savedIds ?? [])
          setReady(true)
        })
        return
      }
    } catch {
      localStorage.removeItem(storageKey)
    }
    queueMicrotask(() => setReady(true))
  }, [])

  useEffect(() => {
    if (ready)
      localStorage.setItem(
        storageKey,
        JSON.stringify({ cart, tasks, activity, savedIds })
      )
  }, [activity, cart, ready, savedIds, tasks])

  const value = useMemo<MarketplaceContextValue>(
    () => ({
      cart,
      tasks,
      activity,
      savedIds,
      addToCart(listing) {
        setCart((current) => {
          const existing = current.find((line) => line.id === listing.id)
          return existing
            ? current.map((line) =>
                line.id === listing.id
                  ? { ...line, quantity: line.quantity + 1 }
                  : line
              )
            : [...current, { ...listing, quantity: 1 }]
        })
      },
      changeQuantity(id, quantity) {
        setCart((current) =>
          quantity <= 0
            ? current.filter((line) => line.id !== id)
            : current.map((line) =>
                line.id === id ? { ...line, quantity } : line
              )
        )
      },
      clearCart: () => setCart([]),
      addTask(task) {
        setTasks((current) => [
          { ...task, id: `task-${Date.now()}`, status: "open", offers: 0 },
          ...current,
        ])
      },
      addActivity(item) {
        setActivity((current) => [
          {
            ...item,
            id: `activity-${Date.now()}`,
            createdAt: new Date().toISOString(),
          },
          ...current,
        ])
      },
      toggleSaved(id) {
        setSavedIds((current) =>
          current.includes(id)
            ? current.filter((savedId) => savedId !== id)
            : [...current, id]
        )
      },
    }),
    [activity, cart, savedIds, tasks]
  )

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  )
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext)
  if (!context)
    throw new Error("useMarketplace must be used within MarketplaceProvider")
  return context
}
