const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(
  /\D/g,
  ""
)

export function whatsappUrl(message: string) {
  const base = configuredNumber
    ? `https://wa.me/${configuredNumber}`
    : "https://wa.me/"
  return `${base}?text=${encodeURIComponent(message)}`
}

export function storefrontMessage(url: string) {
  return [
    "*BookIt services and bookings*",
    "Browse providers, choose a service, and send a complete booking request:",
    url,
  ].join("\n\n")
}
