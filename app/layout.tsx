import type { Metadata, Viewport } from "next"
import { Outfit, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"
import PwaRegistrar from "@/components/PwaRegistrar"
import { MarketplaceProvider } from "@/components/marketplace/MarketplaceProvider"
import InstallPwaButton from "@/components/InstallPwaButton"
import WhatsAppDock from "@/components/WhatsAppDock"

// Use Outfit as your main font
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "BookIt",
    template: "%s | BookIt",
  },
  description:
    "Book photographers, DJs, caterers, decorators, venues and other event professionals.",
  applicationName: "BookIt",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "BookIt" },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#25705f" },
    { media: "(prefers-color-scheme: dark)", color: "#173f36" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("scroll-smooth", outfit.variable, monoFont.variable)}
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased"
        )}
      >
        <ThemeProvider defaultTheme="light" enableSystem>
          <PwaRegistrar />
          <MarketplaceProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <Toaster />
              <main className="flex-1">{children}</main>
              <Footer />
              <WhatsAppDock />
              <InstallPwaButton />
            </div>
          </MarketplaceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
