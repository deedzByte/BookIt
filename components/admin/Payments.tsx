"use client";

import { useState } from "react";
import {
  CreditCard,
  Wallet,
  Landmark,
  DollarSign,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PaymentMethod {
  id: string;
  label: string;
  icon?: React.ReactNode;
}


const paymentMethods: PaymentMethod[] = [
  { id: "credit-card", label: "Credit Card" },
  { id: "paypal", label: "PayPal" },
  { id: "bank-transfer", label: "Bank Transfer" },
  { id: "cash", label: "Cash" },
  { id: "mobile-money", label: "Mobile Money" },
];
export default function PaymentMethods() {
  const [paymentMethodsState, setPaymentMethodsState] = useState<string[]>(["credit-card", "paypal"]);
  const handleTogglePaymentMethod = (id: string) => {
    setPaymentMethodsState(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };



  return (
                <div>
              <div className="flex items-start gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Payment Methods</h3>
                  <p className="text-sm text-muted-foreground">Manage accepted payment methods for your business.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-3 rounded-xl border bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-medium">{method.label}</span>
                      <Switch
                        checked={paymentMethodsState.includes(method.id)}
                        onCheckedChange={() => handleTogglePaymentMethod(method.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
  );
}