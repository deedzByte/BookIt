"use client"

import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main */}
        <div className="grid gap-10 py-12 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <h2 className="font-serif text-2xl font-semibold">BookIt</h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Discover trusted photographers, DJs, caterers, decorators, venues
              and other professionals for weddings, parties and corporate
              events.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
              Platform
            </h3>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/providers" className="hover:text-foreground">
                  Browse Providers
                </Link>
              </li>

              <li>
                <Link href="/categories" className="hover:text-foreground">
                  Categories
                </Link>
              </li>

              <li>
                <Link href="/book" className="hover:text-foreground">
                  Book a Service
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-foreground">
                  Become a Provider
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
              Company
            </h3>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/reviews" className="hover:text-foreground">
                  Reviews
                </Link>
              </li>

              <li>
                <Link href="/map" className="hover:text-foreground">
                  Provider Map
                </Link>
              </li>

              <li>
                <Link href="/login" className="hover:text-foreground">
                  Sign In
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-foreground">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0" />
                Harare, Zimbabwe
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                +263 XXX XXX XXX
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                hello@snapbook.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 border-t py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} BookIt. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <Link href="/book" className="hover:text-foreground">
              Book now
            </Link>

            <Link href="/providers" className="hover:text-foreground">
              Providers
            </Link>

            <Link href="/categories" className="hover:text-foreground">
              Categories
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
