"use client"

import { MessageCircle, Share2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { storefrontMessage, whatsappUrl } from "@/lib/whatsapp"

export default function WhatsAppDock() {
  const pathname = usePathname()
  function shareStore() {
    const message = storefrontMessage(window.location.origin)
    if (navigator.share) {
      void navigator
        .share({ title: "BookIt", text: message, url: window.location.origin })
        .catch(() => {})
      return
    }
    window.location.assign(whatsappUrl(message))
  }

  if (pathname.startsWith("/admin") || pathname === "/dashboard") return null

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-2xl border bg-white/95 p-2 shadow-2xl backdrop-blur md:inset-x-auto md:right-5 md:w-auto">
      <a
        href={whatsappUrl("Hello BookIt, I need help choosing a service.")}
        className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm font-bold text-[#102d25] md:flex-none"
      >
        <MessageCircle className="size-5" /> Chat on WhatsApp
      </a>
      <button
        onClick={shareStore}
        aria-label="Share BookIt storefront"
        className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#173f36] text-white"
      >
        <Share2 className="size-5" />
      </button>
    </div>
  )
}
