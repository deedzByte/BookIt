"use client"

import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export default function InstallPwaButton() {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches
    if (standalone) return
    const onPrompt = (event: Event) => {
      event.preventDefault()
      setPrompt(event as InstallPromptEvent)
      setHidden(false)
    }
    window.addEventListener("beforeinstallprompt", onPrompt)
    return () => window.removeEventListener("beforeinstallprompt", onPrompt)
  }, [])

  if (hidden || !prompt) return null

  return (
    <aside className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-md rounded-2xl border border-white/70 bg-[#173f36] p-4 text-white shadow-2xl sm:bottom-5">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <Download className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">Install BookIt</p>
          <p className="mt-1 text-sm leading-5 text-white/70">
            Keep your bookings and storefront one tap away from WhatsApp.
          </p>
        </div>
        <button
          onClick={() => setHidden(true)}
          aria-label="Dismiss install prompt"
          className="flex size-10 items-center justify-center rounded-full hover:bg-white/10"
        >
          <X className="size-5" />
        </button>
      </div>
      <button
        onClick={async () => {
          await prompt.prompt()
          const choice = await prompt.userChoice
          if (choice.outcome === "accepted") setHidden(true)
        }}
        className="mt-3 min-h-11 w-full rounded-xl bg-[#25D366] px-4 font-bold text-[#102d25]"
      >
        Add to home screen
      </button>
    </aside>
  )
}
