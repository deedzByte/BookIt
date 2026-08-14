import Link from "next/link"
import { WifiOff } from "lucide-react"

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-[#173f36]/10">
        <WifiOff className="size-7 text-[#173f36]" />
      </span>
      <h1 className="mt-5 text-3xl font-semibold">You are offline</h1>
      <p className="mt-3 leading-7 text-zinc-500">
        Previously visited BookIt pages and your saved booking details remain
        available on this device.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-[#173f36] px-6 font-semibold text-white"
      >
        Try the storefront
      </Link>
    </div>
  )
}
