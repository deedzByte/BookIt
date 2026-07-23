"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  CreditCard,
  Smartphone,
  Building2,
  Truck,
  Shield,
  Lock,
  Clock,
  Banknote,
  Wallet,
  CheckCircle2,
  X,
  Phone,
  Mail,
  User,
  MapPin,
  Copy,
  QrCode,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default function PaymentHero() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  const paymentMethods: PaymentMethod[] = [
    {
      id: "ecocash",
      name: "EcoCash",
      image: "/ecocash.png",
      description: "Pay with EcoCash mobile money",
    },
    {
      id: "paynow",
      name: "PayNow",
      image: "/paynow.png",
      description: "Pay with PayNow instant payment",
    },
    {
      id: "mastercard",
      name: "MasterCard / Visa",
      image: "/mastercard.jpeg",
      description: "Pay with credit or debit card",
    },
    {
      id: "payfari",
      name: "PayFari",
      image: "/payfari.jpeg",
      description: "Pay with PayFari payment gateway",
    },
    {
      id: "cash",
      name: "Cash on Delivery",
      image: "/cash.jpeg",
      description: "Pay cash when we deliver",
    },
    {
      id: "innbucks",
      name: "InnBucks",
      image: "/innbucks.png",
      description: "Pay with InnBucks mobile money",
    },
  ];

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId);
    setIsModalOpen(true);
  };

  const handlePaymentProcess = () => {
    toast.loading("Processing payment...", {
      id: "payment-processing",
      position: "top-center" 
    });

    setTimeout(() => {
      toast.dismiss("payment-processing");
      toast.success("Payment processed", {
        description: "Your payment has been processed successfully",
        duration: 5000,
        position: "top-center" 
      });
      setIsModalOpen(false);
      router.push("/signup");
    }, 2500);
  };

  const handleSubmit = () => {
    console.log("Payment Method:", selectedPayment);
    console.log("Card Details:", { cardNumber, expiryDate, cvv, cardName });
    handlePaymentProcess();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!", {
      description: "Merchant code copied to clipboard",
      duration: 2000,
    });
  };

  const renderModalContent = () => {
    switch (selectedPayment) {
      case "ecocash":
        return (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <img src="/ecocash.png" alt="EcoCash" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <DialogTitle className="font-serif text-xl font-medium text-black">Pay with EcoCash</DialogTitle>
                  <DialogDescription className="text-zinc-500">Complete your EcoCash payment</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">EcoCash Number</span>
                </div>
                <Input
                  placeholder="Enter your EcoCash number"
                  className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Payment Instructions</span>
                </div>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Open your EcoCash app</li>
                  <li>Select "Pay" and enter merchant code: 
                    <span className="font-mono bg-blue-100 px-2 py-0.5 rounded ml-1">123456</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 ml-1 rounded-full hover:bg-blue-200"
                      onClick={() => handleCopy("123456")}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </li>
                  <li>Enter the amount: <span className="font-bold text-black">$670.00</span></li>
                  <li>Enter your PIN to confirm</li>
                </ol>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" className="rounded-full border-zinc-200" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="rounded-full bg-green-600 hover:bg-green-700 text-white">
                Confirm Payment
              </Button>
            </DialogFooter>
          </>
        );

      case "paynow":
        return (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <img src="/paynow.png" alt="PayNow" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <DialogTitle className="font-serif text-xl font-medium text-black">Pay with PayNow</DialogTitle>
                  <DialogDescription className="text-zinc-500">Complete your PayNow payment</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <QrCode className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Scan QR Code</span>
                </div>
                <div className="flex items-center justify-center bg-white p-4 rounded-xl border border-blue-200">
                  <div className="w-32 h-32 bg-zinc-100 flex items-center justify-center rounded-xl">
                    <span className="text-xs text-zinc-400">QR Code</span>
                  </div>
                </div>
                <p className="text-xs text-blue-700 mt-2 text-center">
                  Scan with your banking app or enter UEN: 
                  <span className="font-mono bg-blue-100 px-2 py-0.5 rounded ml-1">123456789</span>
                </p>
              </div>
              <div className="bg-zinc-50 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Amount to pay:</span>
                  <span className="font-serif text-xl font-medium text-black">$670.00</span>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" className="rounded-full border-zinc-200" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                I've Made Payment
              </Button>
            </DialogFooter>
          </>
        );

      case "mastercard":
        return (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-black" />
                <div>
                  <DialogTitle className="font-serif text-xl font-medium text-black">Card Details</DialogTitle>
                  <DialogDescription className="text-zinc-500">Enter your card information</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-700">Card Number</Label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-700">Expiry Date</Label>
                  <Input
                    placeholder="MM/YY"
                    className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-700">CVV</Label>
                  <Input
                    placeholder="123"
                    type="password"
                    maxLength={3}
                    className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-700">Cardholder Name</Label>
                <Input
                  placeholder="John Doe"
                  className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Lock className="w-3 h-3" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" className="rounded-full border-zinc-200" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="rounded-full bg-black hover:bg-zinc-800 text-white">
                Pay Now
              </Button>
            </DialogFooter>
          </>
        );

      case "payfari":
        return (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <img src="/payfari.jpeg" alt="PayFari" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <DialogTitle className="font-serif text-xl font-medium text-black">Pay with PayFari</DialogTitle>
                  <DialogDescription className="text-zinc-500">Complete your PayFari payment</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Account Information</span>
                </div>
                <Input
                  placeholder="Full Name"
                  className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black mb-2"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="bg-zinc-50 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Amount:</span>
                  <span className="font-serif text-xl font-medium text-black">$670.00</span>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" className="rounded-full border-zinc-200" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                Pay with PayFari
              </Button>
            </DialogFooter>
          </>
        );

      case "cash":
        return (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-black" />
                <div>
                  <DialogTitle className="font-serif text-xl font-medium text-black">Cash on Delivery</DialogTitle>
                  <DialogDescription className="text-zinc-500">Confirm your delivery details</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">Delivery Address</span>
                </div>
                <Textarea
                  placeholder="Enter your delivery address"
                  className="min-h-[80px] rounded-xl border-zinc-200 text-sm focus:border-black focus:ring-black"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Important Notes</p>
                    <ul className="text-xs text-yellow-700 space-y-1 mt-1 list-disc list-inside">
                      <li>Please have the exact amount ready</li>
                      <li>We accept cash only at delivery</li>
                      <li>Keep your confirmation number ready</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-50 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Total:</span>
                  <span className="font-serif text-xl font-medium text-black">$670.00</span>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" className="rounded-full border-zinc-200" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Confirm Cash Payment
              </Button>
            </DialogFooter>
          </>
        );

      case "innbucks":
        return (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <img src="/innbucks.png" alt="InnBucks" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <DialogTitle className="font-serif text-xl font-medium text-black">Pay with InnBucks</DialogTitle>
                  <DialogDescription className="text-zinc-500">Complete your InnBucks payment</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">InnBucks Number</span>
                </div>
                <Input
                  placeholder="Enter your InnBucks number"
                  className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Payment Instructions</span>
                </div>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Open InnBucks app</li>
                  <li>Select "Pay Merchant"</li>
                  <li>Enter merchant code: 
                    <span className="font-mono bg-blue-100 px-2 py-0.5 rounded ml-1">789012</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 ml-1 rounded-full hover:bg-blue-200"
                      onClick={() => handleCopy("789012")}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </li>
                  <li>Enter amount: <span className="font-bold text-black">$670.00</span></li>
                  <li>Confirm payment</li>
                </ol>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" className="rounded-full border-zinc-200" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="rounded-full bg-purple-600 hover:bg-purple-700 text-white">
                Confirm Payment
              </Button>
            </DialogFooter>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-2xl text-center mb-8">
          <h1 className="font-serif text-4xl font-medium tracking-tight text-black">Payment</h1>
          <p className="mt-2 text-sm text-zinc-500">Choose your preferred payment method</p>
        </div>
        
        <Card className="rounded-2xl shadow-xl border-0 bg-white/90 backdrop-blur-md w-full max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <span className="font-serif text-4xl font-medium text-black">$670.00</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethods.map((method) => {
                const isSelected = selectedPayment === method.id;
                return (
                  <div
                    key={method.id}
                    className={`relative cursor-pointer rounded-xl border p-3 transition-all duration-200 ${
                      isSelected
                        ? "border-black ring-2 ring-black/20 bg-black/5"
                        : "border-zinc-200 hover:border-zinc-400 bg-white"
                    }`}
                    onClick={() => handlePaymentSelect(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <img
                          src={method.image}
                          alt={method.name}
                          className="w-10 h-10 rounded-full object-cover border border-zinc-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-black text-sm truncate">
                            {method.name}
                          </span>
                          {isSelected && (
                            <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full flex-shrink-0">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 truncate">{method.description}</p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-2xl">
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </section>
  );
}