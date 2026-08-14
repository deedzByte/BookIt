const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

export interface RouteStep {
  distance: number
  duration: number
  instructions?: string
  maneuver: { instruction?: string; modifier?: string; type?: string }
  geometry?: { coordinates: [number, number][] }
}

export interface DirectionsRoute {
  distance: number
  duration: number
  geometry: { type: "LineString"; coordinates: [number, number][] }
  legs?: Array<{ steps?: RouteStep[] }>
}

export async function getDirections(
  start: [number, number],
  end: [number, number]
): Promise<DirectionsRoute> {
  if (!MAPBOX_TOKEN)
    throw new Error("NEXT_PUBLIC_MAPBOX_TOKEN is not configured")
  const url =
    `https://api.mapbox.com/directions/v5/mapbox/driving/` +
    `${start[0]},${start[1]};${end[0]},${end[1]}` +
    `?alternatives=false` +
    `&geometries=geojson` +
    `&overview=full` +
    `&steps=true` +
    `&annotations=distance,duration` +
    `&access_token=${MAPBOX_TOKEN}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Unable to fetch route")
  }

  const data = (await response.json()) as { routes?: DirectionsRoute[] }
  const route = data.routes?.[0]
  if (!route) throw new Error("Mapbox returned no route")
  return route
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`
  }
  return `${(meters / 1000).toFixed(1)} km`
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}

export function getTurnInstruction(step: RouteStep): string {
  const maneuver = step.maneuver
  const instruction = step.instructions || maneuver.instruction || "Continue"

  // Clean up instruction text
  return instruction.replace(/<[^>]*>/g, "").trim()
}

export function getTurnIcon(step: RouteStep): string {
  const modifier = step.maneuver.modifier || ""
  const type = step.maneuver.type || ""

  if (type === "depart") return "🚀"
  if (type === "arrive") return "🏁"
  if (type === "straight") return "⬆️"
  if (modifier === "left") return "⬅️"
  if (modifier === "right") return "➡️"
  if (modifier === "sharp left") return "↰"
  if (modifier === "sharp right") return "↱"
  if (modifier === "slight left") return "↖️"
  if (modifier === "slight right") return "↗️"
  if (modifier === "u-turn") return "↩️"
  return "📍"
}
