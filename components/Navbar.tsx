"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, ShoppingBag, X } from "lucide-react"

import { useMarketplace } from "@/components/marketplace/MarketplaceProvider"
import { Button } from "@/components/ui/button"

const navigation = [
  { href: "/", label: "Home" },
  { href: "/providers", label: "Providers" },
  { href: "/categories", label: "Categories" },
  { href: "/tasks", label: "Tasks" },
  { href: "/activity", label: "Activity" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart } = useMarketplace()
  const cartCount = cart.reduce((total, line) => total + line.quantity, 0)

  useEffect(() => {
    if (!isMenuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-serif text-3xl font-semibold tracking-tight text-black sm:text-4xl"
          onClick={() => setIsMenuOpen(false)}
        >
          BookIt
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center text-sm font-medium text-zinc-600 transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="relative inline-flex min-h-11 items-center gap-2 rounded-full bg-[#173f36] px-5 text-sm font-semibold text-white transition hover:bg-[#245b4e]"
          >
            <ShoppingBag className="size-4" /> Basket
            {cartCount > 0 && (
              <span className="flex min-w-5 items-center justify-center rounded-full bg-[#f5c86b] px-1.5 text-xs text-[#173f36]">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="size-11 rounded-full md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t bg-white px-4 py-4 shadow-lg md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#173f36] px-4 text-base font-semibold text-white active:bg-[#245b4e]"
            >
              <ShoppingBag className="size-5" /> Basket
              {cartCount > 0 && (
                <span className="rounded-full bg-[#f5c86b] px-2 py-0.5 text-xs text-[#173f36]">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="mt-1 flex min-h-12 items-center justify-center rounded-xl border border-zinc-300 px-4 text-base font-semibold text-zinc-800 active:bg-zinc-100"
            >
              Become a provider
            </Link>
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-xl px-4 text-base font-semibold text-zinc-700 active:bg-zinc-100"
            >
              Sign in
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
