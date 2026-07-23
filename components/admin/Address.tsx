"use client";

import { MapPinned } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CountrySearch from "@/components/admin/CountrySearch";

interface Address {
  country: string;
  state: string;
  city: string;
  street: string;
  postalCode: string;
}

interface AddressProps {
  value?: Address;
  onChange?: (address: Address) => void;
}

const defaultAddress: Address = {
  country: "",
  state: "",
  city: "",
  street: "",
  postalCode: "",
};

export default function AddressForm({
  value,
  onChange,
}: AddressProps) {
  const address = value ?? defaultAddress;

  const handleChange = (field: keyof Address, val: string) => {
    const updated = {
      ...address,
      [field]: val,
    };

    onChange?.(updated);
  };

  return (
    <div>
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-lg font-semibold">
              Business Address
            </h3>

            <p className="text-sm text-muted-foreground">
              This address is shown to customers and used for
              bookings.
            </p>
          </div>
        </div>


      <div className="pt-4">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>Country</Label>

            <CountrySearch
              value={address.country}
              onValueChange={(value) =>
                handleChange("country", value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>State / Province</Label>

            <Input
              placeholder="State or Province"
              value={address.state}
              onChange={(e) =>
                handleChange("state", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>City / Town</Label>

            <Input
              placeholder="City or Town"
              value={address.city}
              onChange={(e) =>
                handleChange("city", e.target.value)
              }
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Street Address</Label>

            <Input
              placeholder="House Number, Street Name"
              value={address.street}
              onChange={(e) =>
                handleChange("street", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Postal Code</Label>

            <Input
              placeholder="Postal Code"
              value={address.postalCode}
              onChange={(e) =>
                handleChange("postalCode", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}