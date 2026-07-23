// components/Reviews.tsx

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    event: "Wedding",
    date: "June 2026",
    review:
      "Absolutely amazing! The photo booth was the highlight of our wedding. Our guests couldn't stop talking about it.",
  },
  {
    id: 2,
    name: "Michael Brown",
    image: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    event: "Birthday Party",
    date: "May 2026",
    review:
      "Professional service from start to finish. The props were fantastic and the instant prints were high quality.",
  },
  {
    id: 3,
    name: "Grace Williams",
    image: "https://i.pravatar.cc/150?img=24",
    rating: 5,
    event: "Corporate Event",
    date: "April 2026",
    review:
      "The team arrived early, set everything up perfectly and made our company event memorable. Highly recommend!",
  },
  {
    id: 4,
    name: "David Miller",
    image: "https://i.pravatar.cc/150?img=51",
    rating: 5,
    event: "Graduation",
    date: "March 2026",
    review:
      "Everyone loved the GIF booth. The online gallery made sharing photos so easy.",
  },
]

export default function Reviews() {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <Badge className="mb-4">Testimonials</Badge>

        <h2 className="text-4xl font-bold tracking-tight">
          Loved by Hundreds of Happy Clients
        </h2>

        <p className="mt-4 text-muted-foreground">
          From weddings and birthdays to corporate events, we help create
          unforgettable memories.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl m-2"
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-sm text-muted-foreground flex-1">
                "{review.review}"
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={review.image} />
                  <AvatarFallback>
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.event} • {review.date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}