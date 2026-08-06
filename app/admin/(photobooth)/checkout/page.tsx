"use client";

import { ChevronDown } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin, Phone, User, MapPinned, Globe, Mail, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutHero() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    countryCode: "+1",
    email: "",
    country: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    specialInstructions: "",
    mapLocation: "",
  });

  const countryCodes = [
    { key: "+1", label: "+1 (US/CA)" },
    { key: "+44", label: "+44 (UK)" },
    { key: "+61", label: "+61 (AU)" },
    { key: "+234", label: "+234 (NG)" },
    { key: "+27", label: "+27 (ZA)" },
    { key: "+254", label: "+254 (KE)" },
    { key: "+233", label: "+233 (GH)" },
    { key: "+91", label: "+91 (IN)" },
  ];

  const countries = [
    { key: "us", label: "United States" },
    { key: "ca", label: "Canada" },
    { key: "uk", label: "United Kingdom" },
    { key: "au", label: "Australia" },
    { key: "ng", label: "Nigeria" },
    { key: "za", label: "South Africa" },
    { key: "ke", label: "Kenya" },
    { key: "gh", label: "Ghana" },
  ];

  const provinces: Record<string, { key: string; label: string }[]> = {
    us: [
      { key: "al", label: "Alabama" },
      { key: "ak", label: "Alaska" },
      { key: "az", label: "Arizona" },
      { key: "ca", label: "California" },
      { key: "co", label: "Colorado" },
      { key: "fl", label: "Florida" },
      { key: "ga", label: "Georgia" },
      { key: "il", label: "Illinois" },
      { key: "ny", label: "New York" },
      { key: "tx", label: "Texas" },
    ],
    ca: [
      { key: "on", label: "Ontario" },
      { key: "qc", label: "Quebec" },
      { key: "bc", label: "British Columbia" },
      { key: "ab", label: "Alberta" },
    ],
    uk: [
      { key: "eng", label: "England" },
      { key: "sct", label: "Scotland" },
      { key: "wls", label: "Wales" },
      { key: "nir", label: "Northern Ireland" },
    ],
    au: [
      { key: "nsw", label: "New South Wales" },
      { key: "vic", label: "Victoria" },
      { key: "qld", label: "Queensland" },
      { key: "wa", label: "Western Australia" },
    ],
    ng: [
      { key: "lag", label: "Lagos" },
      { key: "abj", label: "Abuja" },
      { key: "riv", label: "Rivers" },
      { key: "kan", label: "Kano" },
    ],
    za: [
      { key: "gp", label: "Gauteng" },
      { key: "wc", label: "Western Cape" },
      { key: "ec", label: "Eastern Cape" },
      { key: "kzn", label: "KwaZulu-Natal" },
    ],
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    router.push("/payment");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium tracking-tight text-black">
            Order Details
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Please fill in your details to complete your booking
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <Card className="rounded-2xl shadow-xl border-0 bg-white/90 backdrop-blur-md">
              <CardContent className="p-6">
                {/* Venue Details */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-4 h-4 text-black" />
                    <h3 className="font-serif text-lg font-medium text-black">Venue Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-700">Venue Name</Label>
                      <Input
                        placeholder="Enter venue name"
                        className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-700">Address</Label>
                      <Input
                        placeholder="Enter your full address"
                        className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-700">City</Label>
                      <Input
                        placeholder="Enter your city"
                        className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-700">Province / State</Label>
                      <Select>
                        <SelectTrigger className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black">
                          <SelectValue placeholder="Select your province" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.key} value={country.key}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-700">Postal Code</Label>
                      <Input
                        placeholder="Enter postal code"
                        className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Contact Details */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-4 h-4 text-black" />
                    <h3 className="font-serif text-lg font-medium text-black">Contact Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-700">Full Name</Label>
                      <Input
                        placeholder="Enter your full name"
                        className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-700">Email Address</Label>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        className="h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-sm font-medium text-zinc-700">Phone Number</Label>
                      <div className="flex gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center justify-between rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-w-[100px]">
                            {formData.countryCode}
                            <ChevronDown className="h-3 w-3 ml-1" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="rounded-xl">
                            {countryCodes.map((code) => (
                              <DropdownMenuItem
                                key={code.key}
                                className="text-sm hover:bg-zinc-50"
                                onClick={() => handleInputChange("countryCode", code.key)}
                              >
                                {code.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Input
                          placeholder="555-000-0000"
                          className="flex-1 h-10 rounded-full border-zinc-200 px-4 text-sm focus:border-black focus:ring-black"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Additional Information */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPinned className="w-4 h-4 text-black" />
                    <h3 className="font-serif text-lg font-medium text-black">Additional Information</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add any additional information or special requests"
                        className="min-h-[80px] rounded-xl border-zinc-200 text-sm focus:border-black focus:ring-black"
                        value={formData.specialInstructions}
                        onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary Card */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24 shadow-xl border-0 bg-white/90 backdrop-blur-md">
              <CardHeader className="rounded-t-xl">
                <CardTitle className="font-serif text-2xl font-medium text-gray-500">
                  Order Summary
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Review your booking details
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 pr-6 pl-6 pb-6">
                <div>
                  <p className="font-medium text-black text-sm">Package Details</p>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Standard Package</span>
                      <span className="font-medium text-black">$600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Duration</span>
                      <span className="font-medium text-black">4 Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Date</span>
                      <span className="font-medium text-black">June 30, 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Time</span>
                      <span className="font-medium text-black">5:00 PM - 9:00 PM</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-medium text-black text-sm">Add-ons</p>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Gold Sequin Backdrop</span>
                      <span className="font-medium text-black">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Crown Prop</span>
                      <span className="font-medium text-black">+$40</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Heart Keychain x2</span>
                      <span className="font-medium text-black">+$30</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-medium text-black text-sm">Selected Options</p>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Templates</span>
                      <span className="font-medium text-black">Classic Strip, Modern Grid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Print Sizes</span>
                      <span className="font-medium text-black">4x6, 5x7</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-serif text-lg font-medium text-black">Total</span>
                  <span className="font-serif text-2xl font-medium text-black">$670</span>
                </div>
                <Link href="/admin/payment">
                                    <Button 
                  className="w-full h-12 rounded-full  text-white font-medium hover:bg-gray-400 transition-all duration-200 cursor-pointer"
                >
                  Proceed to Payment
                </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}