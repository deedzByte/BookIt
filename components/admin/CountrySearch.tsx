"use client";

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "@/components/ui/combobox";

const countries = [
  { code: "ar", value: "argentina", label: "Argentina" },
  { code: "au", value: "australia", label: "Australia" },
  { code: "br", value: "brazil", label: "Brazil" },
  { code: "ca", value: "canada", label: "Canada" },
  { code: "cn", value: "china", label: "China" },
  { code: "eg", value: "egypt", label: "Egypt" },
  { code: "fr", value: "france", label: "France" },
  { code: "de", value: "germany", label: "Germany" },
  { code: "jp", value: "japan", label: "Japan" },
  { code: "za", value: "south-africa", label: "South Africa" },
  { code: "gb", value: "united-kingdom", label: "United Kingdom" },
  { code: "us", value: "united-states", label: "United States" },
];

export default function ComboboxPopup() {
  return (
    <Combobox items={countries}>
      <ComboboxInput placeholder="Select your country" />

      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>

        <ComboboxCollection>
          {(item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxCollection>
      </ComboboxContent>
    </Combobox>
  );
}