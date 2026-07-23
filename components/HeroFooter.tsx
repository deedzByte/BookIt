import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function FeaturedPackage() {
  return (
    <section className="bg-[#0d0d0f] py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-[#1b1b1f] p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Images */}

            <div className="grid grid-cols-2 gap-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src="/photobooth.webp"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src="/photography.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}

            <div className="flex flex-col justify-center">
              <Badge className="mb-6 w-fit rounded-full bg-zinc-800 px-4 py-2 uppercase tracking-widest text-zinc-300 hover:bg-zinc-800">
                Top Recommendation
              </Badge>

              <h2 className="max-w-xl font-serif text-4xl leading-tight text-white lg:text-5xl">
                Premium Open-Air Photo Booth Package
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
                Studio-quality lighting, a professional attendant,
                custom backdrop, and instant digital delivery to
                guests via WhatsApp.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Provider
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-white">
                    Luna Capture Co.
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Price
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-white">
                    $650
                    <span className="text-base font-normal text-zinc-400">
                      {" "}
                      / 4 hours on-site
                    </span>
                  </p>
                </div>
              </div>

              <Button
                size="lg"
                className="mt-10 h-14 w-fit rounded-2xl bg-green-500 px-8 text-lg hover:bg-green-600"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Book on WhatsApp
              </Button>

              <p className="mt-6 text-sm text-zinc-500">
                Optional $100 Stripe deposit to secure your date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}