"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useMarketplace } from "@/components/marketplace/MarketplaceProvider"

export default function CartPage() {
  const { cart, changeQuantity, clearCart, addActivity } = useMarketplace()
  const subtotal = cart.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0
  )

  function checkout() {
    const reference = `BI-${cart.length}-${Math.round(subtotal * 100).toString(36).toUpperCase()}`
    const lines = cart.map(
      (line) =>
        `• ${line.quantity} × ${line.title} — $${(line.price * line.quantity).toFixed(2)}`
    )
    const message = [
      "*New BookIt order / booking*",
      `Reference: ${reference}`,
      "",
      ...lines,
      "",
      `Total: $${subtotal.toFixed(2)}`,
      "",
      "Please confirm availability and next steps.",
    ].join("\n")
    addActivity({
      type: cart.some((line) => line.kind === "service") ? "booking" : "order",
      title: `Request ${reference}`,
      detail: `${cart.length} item${cart.length === 1 ? "" : "s"} sent to WhatsApp`,
      total: subtotal,
      status: "sent",
    })
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "")
    window.location.assign(
      number
        ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
        : `https://wa.me/?text=${encodeURIComponent(message)}`
    )
  }

  if (!cart.length)
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-[#173f36]/10">
          <ShoppingBag className="size-7 text-[#173f36]" />
        </span>
        <h1 className="mt-5 text-3xl font-semibold">Your basket is empty</h1>
        <p className="mt-2 text-zinc-500">
          Add a product or service to create a clean WhatsApp request.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-[#173f36] px-6 font-semibold text-white"
        >
          Browse marketplace
        </Link>
      </div>
    )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold text-[#25705f]">Your request</p>
          <h1 className="mt-1 text-3xl font-semibold">Basket</h1>
        </div>
        <button
          onClick={clearCart}
          className="min-h-11 text-sm font-semibold text-red-600"
        >
          Clear all
        </button>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map((line) => (
            <article
              key={line.id}
              className="flex gap-4 rounded-2xl border bg-white p-4"
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={line.image}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#25705f] uppercase">
                  {line.kind}
                </p>
                <h2 className="truncate font-semibold">{line.title}</h2>
                <p className="text-sm text-zinc-500">{line.provider}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-full border">
                    <button
                      aria-label={`Decrease ${line.title}`}
                      onClick={() => changeQuantity(line.id, line.quantity - 1)}
                      className="flex size-10 items-center justify-center"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {line.quantity}
                    </span>
                    <button
                      aria-label={`Increase ${line.title}`}
                      onClick={() => changeQuantity(line.id, line.quantity + 1)}
                      className="flex size-10 items-center justify-center"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">
                      ${(line.price * line.quantity).toFixed(2)}
                    </span>
                    <button
                      aria-label={`Remove ${line.title}`}
                      onClick={() => changeQuantity(line.id, 0)}
                      className="flex size-10 items-center justify-center text-red-600"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="h-fit rounded-2xl bg-[#173f36] p-6 text-white lg:sticky lg:top-24">
          <h2 className="text-xl font-semibold">Request summary</h2>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cart.reduce((sum, line) => sum + line.quantity, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Confirmation</span>
              <span>On WhatsApp</span>
            </div>
          </div>
          <div className="mt-5 flex justify-between border-t border-white/15 pt-5 text-lg font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={checkout}
            className="mt-6 min-h-12 w-full rounded-xl bg-[#25D366] px-5 font-bold text-[#102d25]"
          >
            Send on WhatsApp
          </button>
          <p className="mt-3 text-center text-xs leading-5 text-white/60">
            No payment is taken yet. The seller or provider confirms the
            request.
          </p>
        </aside>
      </div>
    </div>
  )
}
