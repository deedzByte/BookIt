import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BookIt — services on WhatsApp",
    short_name: "BookIt",
    description:
      "Discover local services and send complete booking requests on WhatsApp.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#25705f",
    orientation: "portrait-primary",
    categories: ["business", "lifestyle", "shopping"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      {
        src: "/maskable-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  }
}
