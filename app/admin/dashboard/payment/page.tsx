"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Wallet,
  Landmark,
  DollarSign,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface PaymentMethod {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "credit-card",
    label: "Credit Card",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    id: "bank-transfer",
    label: "Bank Transfer",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    id: "cash",
    label: "Cash",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    id: "mobile-money",
    label: "Mobile Money",
    icon: <Smartphone className="h-5 w-5" />,
  },
];

const defaultMethods = ["credit-card", "paypal"];

export default function PaymentMethods() {
  const [selectedMethods, setSelectedMethods] =
    useState<string[]>(defaultMethods);

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(
      JSON.stringify(selectedMethods.sort()) !==
        JSON.stringify(defaultMethods.sort())
    );
  }, [selectedMethods]);

  const toggleMethod = (id: string) => {
    setSelectedMethods((prev) =>
      prev.includes(id)
        ? prev.filter((method) => method !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    console.log(selectedMethods);

    // await updatePaymentMethods(selectedMethods);

    alert("Payment methods updated.");
  };

  const handleCancel = () => {
    setSelectedMethods(defaultMethods);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="px-6 pt-6">
        <h2 className="text-2xl font-semibold">
          Payment Methods
        </h2>

        <p className="text-sm text-muted-foreground">
          Select the payment methods your customers can use.
        </p>
      </div>

      {/* Methods */}

      <div className="px-6">
        <div className="overflow-hidden rounded-2xl border">

          {paymentMethods.map((method, index) => (
            <div key={method.id}>
              <div className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/40">

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center">
                    {method.icon}
                  </div>

                  <div>

                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {method.label}
                      </p>
                    </div>
                  </div>
                </div>

                <Switch
                  checked={selectedMethods.includes(method.id)}
                  onCheckedChange={() =>
                    toggleMethod(method.id)
                  }
                />

              </div>

              {index !== paymentMethods.length - 1 && (
                <Separator />
              )}
            </div>
          ))}

        </div>
      </div>

      {/* Footer */}

      <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-background px-6 py-4">

        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={!hasChanges}
          className="rounded-xl"
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="rounded-xl px-8"
        >
          Save Changes
        </Button>

      </div>
    </div>
  );
}