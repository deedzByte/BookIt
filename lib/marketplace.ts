export type ListingKind = "service" | "product"

export interface Listing {
  id: string
  kind: ListingKind
  title: string
  provider: string
  category: string
  price: number
  unit: string
  location: string
  rating: number
  reviews: number
  verified: boolean
  image: string
  description: string
}

export interface CartLine extends Listing {
  quantity: number
}

export interface TaskRequest {
  id: string
  title: string
  category: string
  location: string
  budget: string
  date: string
  description: string
  status: "open" | "matched" | "completed"
  offers: number
}

export interface ActivityItem {
  id: string
  type: "order" | "booking" | "task"
  title: string
  detail: string
  total?: number
  status: "sent" | "pending" | "confirmed" | "completed"
  createdAt: string
}

export const listings: Listing[] = [
  {
    id: "photo-1",
    kind: "service",
    title: "Event photography",
    provider: "ZimLens Studio",
    category: "Photography",
    price: 120,
    unit: "from",
    location: "Harare",
    rating: 4.9,
    reviews: 128,
    verified: true,
    image: "/photography.jpg",
    description: "Professional event coverage with an edited digital gallery.",
  },
  {
    id: "booth-1",
    kind: "service",
    title: "360° photo booth",
    provider: "Spin Moments",
    category: "Events",
    price: 250,
    unit: "event",
    location: "Harare",
    rating: 4.8,
    reviews: 74,
    verified: true,
    image: "/photobooth.webp",
    description:
      "Four-hour booth hire, attendant, props and instant social sharing.",
  },
  {
    id: "video-1",
    kind: "service",
    title: "Wedding videography",
    provider: "Motion House",
    category: "Videography",
    price: 380,
    unit: "from",
    location: "Chitungwiza",
    rating: 4.7,
    reviews: 51,
    verified: true,
    image: "/videography.jpg",
    description: "Cinematic highlight film plus full ceremony coverage.",
  },
  {
    id: "dj-1",
    kind: "service",
    title: "DJ and sound system",
    provider: "Pulse Events",
    category: "Entertainment",
    price: 180,
    unit: "event",
    location: "Harare",
    rating: 4.9,
    reviews: 96,
    verified: true,
    image: "/dj.jpg",
    description: "DJ, PA system, wireless microphone and dance-floor lighting.",
  },
  {
    id: "gift-1",
    kind: "product",
    title: "Custom event welcome sign",
    provider: "Crafted ZW",
    category: "Decor",
    price: 45,
    unit: "each",
    location: "Harare",
    rating: 4.6,
    reviews: 32,
    verified: false,
    image: "/cherries.jpeg",
    description: "Personalised A2 welcome sign in your colours and wording.",
  },
  {
    id: "print-1",
    kind: "product",
    title: "Premium photo print pack",
    provider: "ZimLens Studio",
    category: "Prints",
    price: 30,
    unit: "pack",
    location: "Nationwide",
    rating: 4.8,
    reviews: 43,
    verified: true,
    image: "/photography.jpg",
    description:
      "Twenty professionally printed 6×4 photographs in a keepsake box.",
  },
]

export const starterTasks: TaskRequest[] = [
  {
    id: "task-1",
    title: "Need a plumber for leaking sink",
    category: "Plumbing",
    location: "Avondale, Harare",
    budget: "$30–$60",
    date: "Flexible",
    description: "Kitchen sink pipe is leaking below the cabinet.",
    status: "open",
    offers: 3,
  },
  {
    id: "task-2",
    title: "Birthday decorator for 40 guests",
    category: "Decor",
    location: "Eastlea, Harare",
    budget: "$150",
    date: "23 Aug",
    description: "Simple black and gold setup with backdrop and table décor.",
    status: "open",
    offers: 6,
  },
]
