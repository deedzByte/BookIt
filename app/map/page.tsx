import ProviderMap from "@/components/ProviderMap";


const provider = {
  latitude: -17.8252,
  longitude: 31.0335,
};

const client = {
  latitude: -17.8115,
  longitude: 31.0524,
};

export default function Page() {
  return (
    <ProviderMap
      provider={provider}
      client={client}
    />
  );
}