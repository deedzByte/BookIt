import ProviderMap from "@/components/ProviderMap"

const provider = {
  id: 1,
  latitude: -17.8252,
  longitude: 31.0335,
  title: "Photography",
  icon: "camera" as const,
}

const client = {
  latitude: -17.8115,
  longitude: 31.0524,
}

export default function Page() {
  return (
    <ProviderMap
      selectedService={provider}
      clientLocation={client}
      autoNavigate
    />
  )
}
