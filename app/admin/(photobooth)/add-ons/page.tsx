"use client";

import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { CheckCircle2, Plus, Minus, X, Sparkles, Crown, Key, Palette, Star, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Backdrop {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

interface PropItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

interface Keychain {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

type TabType = 'backdrops' | 'props' | 'keychains';

export default function AddonsHero() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>('backdrops');
  const [selectedBackdrop, setSelectedBackdrop] = useState<string | null>(null);
  const [selectedProps, setSelectedProps] = useState<string[]>([]);
  const [selectedKeychains, setSelectedKeychains] = useState<{ id: string; quantity: number }[]>([]);
  const [expandedKeychain, setExpandedKeychain] = useState<string | null>(null);

  // Mock data with Airbnb-style details
  const backdrops: Backdrop[] = [
    { 
      id: "gold-sequin", 
      name: "Gold Sequin", 
      price: 0, 
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop",
      description: "Luxurious gold sequin backdrop for glamorous shoots",
      rating: 4.9,
      reviews: 124
    },
    { 
      id: "black-sequin", 
      name: "Black Sequin", 
      price: 50, 
      image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=300&fit=crop",
      description: "Classic black sequin for sophisticated portraits",
      rating: 4.8,
      reviews: 98
    },
    { 
      id: "rose-gold", 
      name: "Rose Gold", 
      price: 75, 
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop&sat=-100",
      description: "Trendy rose gold shimmer for modern photos",
      rating: 4.9,
      reviews: 156
    },
    { 
      id: "silver-sparkle", 
      name: "Silver Sparkle", 
      price: 50, 
      image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=300&fit=crop&sat=-100",
      description: "Sparkling silver for magical festive photos",
      rating: 4.7,
      reviews: 87
    },
  ];

  const propsItems: PropItem[] = [
    { 
      id: "pirate-costume", 
      name: "Pirate Costume", 
      price: 80, 
      image: "https://images.unsplash.com/photo-1533727937480-da3a97967e95?w=400&h=300&fit=crop",
      description: "Complete pirate costume with accessories",
      rating: 4.6,
      reviews: 43
    },
    { 
      id: "crown", 
      name: "Crown", 
      price: 40, 
      image: "https://images.unsplash.com/photo-1584208124883-ae45cd59044c?w=400&h=300&fit=crop",
      description: "Elegant crystal-encrusted royal crown",
      rating: 4.9,
      reviews: 89
    },
    { 
      id: "boas", 
      name: "Feather Boas", 
      price: 25, 
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop",
      description: "Set of 3 colorful feather boas",
      rating: 4.5,
      reviews: 67
    },
    { 
      id: "hats", 
      name: "Funny Hats", 
      price: 30, 
      image: "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?w=400&h=300&fit=crop",
      description: "Collection of 5 novelty hats",
      rating: 4.4,
      reviews: 52
    },
  ];

  const keychains: Keychain[] = [
    { 
      id: "heart", 
      name: "Heart Keychain", 
      price: 15, 
      image: "https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=400&h=300&fit=crop",
      description: "Charming heart-shaped keychain",
      rating: 4.8,
      reviews: 234
    },
    { 
      id: "star", 
      name: "Star Keychain", 
      price: 12, 
      image: "https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=400&h=300&fit=crop",
      description: "Gold star keychain that shines bright",
      rating: 4.7,
      reviews: 198
    },
    { 
      id: "crown-key", 
      name: "Crown Keychain", 
      price: 18, 
      image: "https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=400&h=300&fit=crop",
      description: "Mini crown keychain with jewels",
      rating: 4.9,
      reviews: 312
    },
    { 
      id: "butterfly", 
      name: "Butterfly Keychain", 
      price: 20, 
      image: "https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=400&h=300&fit=crop",
      description: "Elegant butterfly keychain",
      rating: 4.6,
      reviews: 156
    },
  ];

  const tabs = [
    { id: 'backdrops', label: 'Backdrops', icon: Palette, count: backdrops.length },
    { id: 'props', label: 'Props', icon: Crown, count: propsItems.length },
    { id: 'keychains', label: 'Keychains', icon: Key, count: keychains.length },
  ];

  const toggleProp = (propId: string) => {
    setSelectedProps((prev) =>
      prev.includes(propId)
        ? prev.filter((id) => id !== propId)
        : [...prev, propId]
    );
  };

  const handleKeychainQuantity = (keychainId: string, change: number) => {
    setSelectedKeychains((prev) => {
      const existing = prev.find((k) => k.id === keychainId);
      if (existing) {
        const newQuantity = Math.max(0, existing.quantity + change);
        if (newQuantity === 0) {
          return prev.filter((k) => k.id !== keychainId);
        }
        return prev.map((k) =>
          k.id === keychainId ? { ...k, quantity: newQuantity } : k
        );
      } else {
        return [...prev, { id: keychainId, quantity: 1 }];
      }
    });
  };

  const toggleBackdrop = (backdropId: string) => {
    setSelectedBackdrop((prev) => (prev === backdropId ? null : backdropId));
  };

  const removeBackdrop = () => {
    setSelectedBackdrop(null);
  };

  const removeProp = (propId: string) => {
    setSelectedProps((prev) => prev.filter((id) => id !== propId));
  };

  const removeKeychain = (keychainId: string) => {
    setSelectedKeychains((prev) => prev.filter((k) => k.id !== keychainId));
  };

  const getKeychainQuantity = (keychainId: string) => {
    const keychain = selectedKeychains.find((k) => k.id === keychainId);
    return keychain ? keychain.quantity : 0;
  };

  const getPropPrice = (propId: string) => {
    const prop = propsItems.find((p) => p.id === propId);
    return prop ? prop.price : 0;
  };

  const getKeychainPrice = (keychainId: string) => {
    const keychain = keychains.find((k) => k.id === keychainId);
    return keychain ? keychain.price : 0;
  };

  const totalAddons =
    (selectedBackdrop
      ? backdrops.find((b) => b.id === selectedBackdrop)?.price || 0
      : 0) +
    selectedProps.reduce(
      (sum, id) => sum + getPropPrice(id),
      0
    ) +
    selectedKeychains.reduce(
      (sum, k) => sum + getKeychainPrice(k.id) * k.quantity,
      0
    );

  const basePackage = 600;
  const total = basePackage + totalAddons;

  const getCurrentItems = () => {
    switch(activeTab) {
      case 'backdrops': return backdrops;
      case 'props': return propsItems;
      case 'keychains': return keychains;
    }
  };

  const isItemSelected = (id: string) => {
    switch(activeTab) {
      case 'backdrops': return selectedBackdrop === id;
      case 'props': return selectedProps.includes(id);
      case 'keychains': return getKeychainQuantity(id) > 0;
    }
  };

  const handleKeychainCardClick = (id: string) => {
    // Toggle expansion
    if (expandedKeychain === id) {
      setExpandedKeychain(null);
    } else {
      setExpandedKeychain(id);
      // If not selected yet, add one
      if (getKeychainQuantity(id) === 0) {
        handleKeychainQuantity(id, 1);
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium tracking-tight text-black">
            Choose Your Add-ons
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Customize your experience with premium backdrops, props, and keychains
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 bg-white rounded-2xl p-1 shadow-xl border-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <Button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as TabType);
                      setExpandedKeychain(null);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-black text-white shadow-lg' 
                        : 'text-gray-600 bg-white-300 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                    <span>{tab.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Cards Grid - Airbnb Style */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {getCurrentItems().map((item) => {
                const isSelected = isItemSelected(item.id);
                const isKeychain = activeTab === 'keychains';
                const quantity = isKeychain ? getKeychainQuantity(item.id) : 0;
                const isExpanded = expandedKeychain === item.id;
                
                return (
                  <div
                    key={item.id}
                    className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                      isSelected 
                        ? 'border-black ring-2 ring-black/20' 
                        : 'border-zinc-200 hover:border-zinc-400'
                    } bg-white shadow-sm hover:shadow-md`}
                    onClick={() => {
                      if (activeTab === 'backdrops') {
                        toggleBackdrop(item.id);
                      } else if (activeTab === 'props') {
                        toggleProp(item.id);
                      } else if (activeTab === 'keychains') {
                        handleKeychainCardClick(item.id);
                      }
                    }}
                  >
                    <div className="relative h-36 overflow-hidden bg-zinc-100">
                      <img
                        alt={item.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={item.image}
                      />
                      {isSelected && !isKeychain && (
                        <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      {isKeychain && isSelected && (
                        <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1">
                          <span className="text-xs font-bold px-1">{quantity}</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p className="text-white font-medium text-sm truncate">{item.name}</p>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium text-black">{(item as any).rating || 4.8}</span>
                          <span className="text-xs text-zinc-500">({(item as any).reviews || 100})</span>
                        </div>
                        <span className="text-sm font-semibold text-black">
                          {item.price === 0 ? 'Free' : `$${item.price}`}
                        </span>
                      </div>
                      
                      <p className="text-xs text-zinc-600 line-clamp-1">
                        {(item as any).description || 'Premium add-on'}
                      </p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        {isKeychain && isExpanded ? (
                          <div className="flex items-center gap-2 w-full justify-between" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 rounded-full bg-zinc-100 text-black hover:bg-zinc-200"
                                onClick={() => handleKeychainQuantity(item.id, -1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-medium text-sm text-black">
                                {quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 rounded-full bg-zinc-100 text-black hover:bg-zinc-200"
                                onClick={() => handleKeychainQuantity(item.id, 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            {quantity > 0 && (
                              <span className="text-xs font-medium text-black">
                                ${item.price * quantity}
                              </span>
                            )}
                          </div>
                        ) : isKeychain && isSelected ? (
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 rounded-full bg-zinc-100 text-black hover:bg-zinc-200"
                              onClick={() => handleKeychainQuantity(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-6 text-center font-medium text-xs text-black">
                              {quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 rounded-full bg-zinc-100 text-black hover:bg-zinc-200"
                              onClick={() => handleKeychainQuantity(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <h2></h2>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Booking Summary Card */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24 shadow-xl border-0 bg-white/90 backdrop-blur-md">
              <CardHeader className="rounded-t-xl">
                <CardTitle className="font-serif text-2xl font-medium text-gray-500">
                  Booking Details
                </CardTitle>
                <p className="text-sm text-zinc-400 pt-1">Standard Package</p>
              </CardHeader>
              <CardContent className="space-y-3 pr-6 pl-6 pb-6">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-black">Standard Package (4 hours)</p>
                      <p className="text-sm text-zinc-500">June 30, 2026</p>
                      <p className="text-sm text-zinc-500">5:00 PM - 9:00 PM</p>
                    </div>
                    <p className="font-semibold text-black">$600</p>
                  </div>
                </div>

                {/* Add-ons Summary */}
                {(selectedBackdrop || selectedProps.length > 0 || selectedKeychains.length > 0) && (
                  <>
                    <Separator />
                    <div>
                      <p className="mb-3 font-medium text-black text-sm">Selected Add-ons</p>
                      <ScrollArea className="h-[160px] pr-3">
                        <div className="space-y-3">
                          {/* Backdrops */}
                          {selectedBackdrop && (
                            <div className="bg-zinc-50 rounded-lg p-3">
                              <p className="text-xs font-medium text-zinc-500 mb-2">Backdrop</p>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-black">
                                  {backdrops.find((b) => b.id === selectedBackdrop)?.name}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-black">
                                    ${backdrops.find((b) => b.id === selectedBackdrop)?.price}
                                  </span>
                                  <Button
                                    className="text-zinc-400 hover:text-red-500 transition-colors"
                                    onClick={removeBackdrop}
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Props */}
                          {selectedProps.length > 0 && (
                            <div className="bg-zinc-50 rounded-lg p-3">
                              <p className="text-xs font-medium text-zinc-500 mb-2">Props ({selectedProps.length})</p>
                              {selectedProps.map((id) => {
                                const propData = propsItems.find((p) => p.id === id);
                                return (
                                  <div key={id} className="flex justify-between items-center py-1 border-b border-zinc-200 last:border-0">
                                    <span className="text-sm text-black">{propData?.name}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-black">${propData?.price}</span>
                                      <Button
                                        className="text-zinc-400 hover:text-red-500 transition-colors"
                                        onClick={() => removeProp(id)}
                                      >
                                        <X className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {selectedKeychains.length > 0 && (
                            <div className="bg-zinc-50 rounded-lg p-3">
                              <p className="text-xs font-medium text-zinc-500 mb-2">Keychains ({selectedKeychains.length})</p>
                              {selectedKeychains.map((keychain) => {
                                const keychainData = keychains.find((k) => k.id === keychain.id);
                                return (
                                  <div key={keychain.id} className="flex justify-between items-center py-1 border-b border-zinc-200 last:border-0">
                                    <span className="text-sm text-black">
                                      {keychainData?.name} x{keychain.quantity}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-black">
                                        ${(keychainData?.price || 0) * keychain.quantity}
                                      </span>
                                      <Button
                                        className="text-zinc-400 hover:text-red-500 transition-colors"
                                        onClick={() => removeKeychain(keychain.id)}
                                      >
                                        <X className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Base Package</span>
                    <span className="font-medium text-black">${basePackage}</span>
                  </div>
                  {totalAddons > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Add-ons</span>
                      <span className="font-medium text-black">+${totalAddons}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-serif text-lg font-medium text-black">Total</span>
                  <span className="font-serif text-2xl font-medium text-black">${total}</span>
                </div>

                <Link href="/admin/prints">
                  <Button
                    className="w-full h-12 rounded-full hover:bg-gray-400 text-white font-medium transition-all duration-200"
                  >
                    Continue to Checkout
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