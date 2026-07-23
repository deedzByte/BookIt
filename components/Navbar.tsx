"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md">
      <div className="flex h-20 items-center justify-between px-4 sm:px-8">
        {/* Left */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-black transition-colors group-hover:text-zinc-700">
              BookIt
            </h1>
          </Link>
        </div>

                  {/* Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-8">
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="text-[15px] font-medium text-zinc-600 transition hover:text-black"
                >
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/login"
                  className="text-[15px] font-medium text-zinc-600 transition hover:text-black"
                >
                  Sign In
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/register"

                >
                             <Button className="h-11 rounded-full bg-black px-7 text-[15px] font-medium text-white hover:bg-zinc-800">
              Become a Provider
            </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>


        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t bg-white/90 backdrop-blur-md px-4 sm:px-8 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Search services..."
              className="w-full"
            />
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-[15px] font-medium text-zinc-600 hover:text-black">
                Home
              </Button>
            </Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-[15px] font-medium text-zinc-600 hover:text-black">
                Sign In
              </Button>
            </Link>
            <Link href="/register" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full justify-center h-11 rounded-full bg-black px-7 text-[15px] font-medium text-white hover:bg-zinc-800">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}