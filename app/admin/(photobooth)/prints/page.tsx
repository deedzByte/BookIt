"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Printer, Layout, Image, X, Plus, Minus, Star, Clock, ChevronRight, Grid3x3 } from "lucide-react";
import Link from "next/link";

interface PrintSize {
  id: string;
  name: string;
  dimensions: string;
  price: number;
  description: string;
  rating?: number;
  reviews?: number;
  popular?: boolean;
}

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  layout: string;
  rating?: number;
  reviews?: number;
  featured?: boolean;
}

type TabType = 'templates' | 'prints';

export default function PhotoboothConfigHero() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<TabType>('templates');
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [selectedPrintSizes, setSelectedPrintSizes] = useState<string[]>([]);
  const [printQuantities, setPrintQuantities] = useState<Record<string, number>>({});

  // DNP DS820A Printer Print Sizes
  const printSizes: PrintSize[] = [
    {
      id: "4x6",
      name: "4\" x 6\"",
      dimensions: "101.6mm x 152.4mm",
      price: 0,
      description: "Standard photo size, perfect for sharing",
      rating: 4.8,
      reviews: 234,
      popular: true
    },
    {
      id: "5x7",
      name: "5\" x 7\"",
      dimensions: "127mm x 177.8mm",
      price: 15,
      description: "Larger format ideal for framing",
      rating: 4.7,
      reviews: 189
    },
    {
      id: "6x8",
      name: "6\" x 8\"",
      dimensions: "152.4mm x 203.2mm",
      price: 25,
      description: "Premium size for special occasions",
      rating: 4.9,
      reviews: 156
    },
    {
      id: "8x10",
      name: "8\" x 10\"",
      dimensions: "203.2mm x 254mm",
      price: 40,
      description: "Large format for wall display",
      rating: 4.6,
      reviews: 98
    },
  ];

  // Photobooth Templates
  const templates: Template[] = [
    {
      id: "classic-strip",
      name: "Classic Strip",
      description: "Traditional 4-photo strip layout",
      image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400&h=300&fit=crop",
      price: 0,
      layout: "4 photos vertically",
      rating: 4.9,
      reviews: 312,
      featured: true
    },
    {
      id: "modern-grid",
      name: "Modern Grid",
      description: "Clean 2x2 grid with minimal borders",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
      price: 10,
      layout: "2x2 grid",
      rating: 4.8,
      reviews: 267
    },
    {
      id: "collage",
      name: "Collage",
      description: "1 large hero + 3 smaller photos",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      price: 20,
      layout: "1 large + 3 small",
      rating: 4.7,
      reviews: 198
    },
    {
      id: "vintage",
      name: "Vintage",
      description: "Sepia-toned with classic borders",
      image: "https://images.unsplash.com/photo-1533727937480-da3a97967e95?w=400&h=300&fit=crop",
      price: 15,
      layout: "4 photos with border",
      rating: 4.6,
      reviews: 145
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean, modern design with thin borders",
      image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=300&fit=crop",
      price: 5,
      layout: "2x2 with thin borders",
      rating: 4.8,
      reviews: 223
    },
    {
      id: "premium",
      name: "Premium",
      description: "Luxury design with gold accents",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop",
      price: 30,
      layout: "3x2 with gold accents",
      rating: 4.9,
      reviews: 189
    },
  ];

  const tabs = [
    { id: 'templates', label: 'Templates', icon: Layout, count: templates.length },
    { id: 'prints', label: 'Print Sizes', icon: Printer, count: printSizes.length },
  ];

  const toggleTemplate = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handlePrintSizeToggle = (sizeId: string) => {
    if (selectedPrintSizes.includes(sizeId)) {
      setSelectedPrintSizes(prev => prev.filter(id => id !== sizeId));
      setPrintQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[sizeId];
        return newQuantities;
      });
    } else if (selectedPrintSizes.length < 2) {
      setSelectedPrintSizes(prev => [...prev, sizeId]);
      setPrintQuantities(prev => ({ ...prev, [sizeId]: 1 }));
    }
  };

  const removeTemplate = (templateId: string) => {
    setSelectedTemplates(prev => prev.filter(id => id !== templateId));
  };

  const removePrintSize = (sizeId: string) => {
    setSelectedPrintSizes(prev => prev.filter(id => id !== sizeId));
    setPrintQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[sizeId];
      return newQuantities;
    });
  };

  const getPrintSizePrice = (sizeId: string) => {
    const size = printSizes.find(s => s.id === sizeId);
    return size ? size.price : 0;
  };

  const getTemplatePrice = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    return template ? template.price : 0;
  };

  const getPrintSizeName = (sizeId: string) => {
    const size = printSizes.find(s => s.id === sizeId);
    return size ? size.name : "";
  };

  const getTemplateName = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    return template ? template.name : "";
  };

  const getPrintQuantity = (sizeId: string) => {
    return printQuantities[sizeId] || 1;
  };

  const setPrintQuantity = (sizeId: string, quantity: number) => {
    setPrintQuantities(prev => ({
      ...prev,
      [sizeId]: Math.max(1, Math.min(10, quantity))
    }));
  };

  const totalTemplatesPrice = selectedTemplates.reduce(
    (sum, id) => sum + getTemplatePrice(id), 0
  );

  const totalPrintSizesPrice = selectedPrintSizes.reduce(
    (sum, id) => sum + getPrintSizePrice(id) * getPrintQuantity(id), 0
  );

  const totalAddons = totalTemplatesPrice + totalPrintSizesPrice;
  const basePackage = 600;
  const total = basePackage + totalAddons;

  const getCurrentItems = () => {
    return activeTab === 'templates' ? templates : printSizes;
  };

  const isItemSelected = (id: string) => {
    if (activeTab === 'templates') {
      return selectedTemplates.includes(id);
    } else {
      return selectedPrintSizes.includes(id);
    }
  };

  const handleAddToCheckout = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeTab === 'templates') {
      toggleTemplate(id);
    } else {
      handlePrintSizeToggle(id);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium tracking-tight text-black">
            Customize Your Photo Booth
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Select templates and print sizes for your photobooth experience
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
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-black text-white shadow-lg' 
                        : 'text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Cards Grid - Compact Airbnb Style */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {getCurrentItems().map((item) => {
                const isSelected = isItemSelected(item.id);
                const isTemplate = activeTab === 'templates';
                const name = isTemplate ? (item as Template).name : (item as PrintSize).name;
                const price = isTemplate ? (item as Template).price : (item as PrintSize).price;
                const description = isTemplate ? (item as Template).description : (item as PrintSize).description;
                const image = isTemplate ? (item as Template).image : null;
                const isPrint = !isTemplate;
                const quantity = isPrint ? getPrintQuantity(item.id) : 0;
                
                return (
                  <div
                    key={item.id}
                    className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                      isSelected 
                        ? 'border-black ring-2 ring-black/20' 
                        : 'border-zinc-200 hover:border-zinc-400'
                    } bg-white shadow-sm hover:shadow-md`}
                    onClick={() => {
                      if (isTemplate) {
                        toggleTemplate(item.id);
                      } else {
                        handlePrintSizeToggle(item.id);
                      }
                    }}
                  >
                    <div className={`relative h-36 overflow-hidden ${isTemplate ? 'bg-zinc-100' : 'bg-gradient-to-br from-zinc-100 to-zinc-200'}`}>
                      {isTemplate && image ? (
                        <img
                          alt={name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={image}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <Image className="w-10 h-10 text-zinc-400 mx-auto mb-1" />
                            <p className="text-sm font-medium text-zinc-600">{name}</p>
                            <p className="text-xs text-zinc-500">{(item as PrintSize).dimensions}</p>
                          </div>
                        </div>
                      )}
                      
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      
                      {(item as Template).featured && isTemplate && (
                        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-medium px-2 py-0.5 rounded-full">
                          Featured
                        </div>
                      )}
                      
                      {(item as PrintSize).popular && !isTemplate && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                          Popular
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p className="text-white font-medium text-sm truncate">{name}</p>
                        <p className="text-white/90 text-xs">
                          {price === 0 ? '✨ Included' : `+$${price}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium text-black">{(item as any).rating || 4.8}</span>
                          <span className="text-xs text-zinc-500">({(item as any).reviews || 100})</span>
                        </div>
                        {isTemplate && (
                          <div className="flex items-center gap-1 text-xs text-zinc-500">
                            <Grid3x3 className="w-3 h-3" />
                            <span className="hidden sm:inline">{(item as Template).layout}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs text-zinc-600 line-clamp-1">{description}</p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        {isPrint && isSelected ? (
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 rounded-full bg-zinc-100 text-black hover:bg-zinc-200"
                              onClick={() => setPrintQuantity(item.id, quantity - 1)}
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
                              onClick={() => setPrintQuantity(item.id, quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className={`text-xs p-0 h-auto ${
                              isSelected ? 'text-black' : 'text-zinc-400 hover:text-black'
                            }`}
                            onClick={(e) => handleAddToCheckout(item.id, e)}
                          >
                            {isSelected ? 'Added ✓' : 'Add to cart'}
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
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
                  Photobooth Details
                </CardTitle>
                <p className="text-sm text-zinc-400 pt-1">Customize your experience</p>
              </CardHeader>

              <CardContent className="space-y-2 pr-6 pl-6 pb-6">
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

                {/* Selected Items Summary */}
                {(selectedTemplates.length > 0 || selectedPrintSizes.length > 0) && (
                  <>
                    <Separator />
                    <div>
                      <p className="mb-3 font-medium text-black text-sm">Selected Options</p>
                      <ScrollArea className="h-[160px] pr-3">
                        <div className="space-y-3">
                          {/* Templates */}
                          {selectedTemplates.length > 0 && (
                            <div className="bg-zinc-50 rounded-lg p-3">
                              <p className="text-xs font-medium text-zinc-500 mb-2">Templates ({selectedTemplates.length})</p>
                              {selectedTemplates.map((id) => (
                                <div key={id} className="flex justify-between items-center py-1 border-b border-zinc-200 last:border-0">
                                  <span className="text-sm text-black">{getTemplateName(id)}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-black">
                                      +${getTemplatePrice(id)}
                                    </span>
                                    <button
                                      className="text-zinc-400 hover:text-red-500 transition-colors"
                                      onClick={() => removeTemplate(id)}
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Print Sizes */}
                          {selectedPrintSizes.length > 0 && (
                            <div className="bg-zinc-50 rounded-lg p-3">
                              <p className="text-xs font-medium text-zinc-500 mb-2">Print Sizes ({selectedPrintSizes.length})</p>
                              {selectedPrintSizes.map((id) => {
                                const quantity = getPrintQuantity(id);
                                const price = getPrintSizePrice(id);
                                return (
                                  <div key={id} className="flex justify-between items-center py-1 border-b border-zinc-200 last:border-0">
                                    <div>
                                      <span className="text-sm text-black">{getPrintSizeName(id)}</span>
                                      <span className="text-xs text-zinc-500 ml-2">x{quantity}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-black">
                                        +${price * quantity}
                                      </span>
                                      <button
                                        className="text-zinc-400 hover:text-red-500 transition-colors"
                                        onClick={() => removePrintSize(id)}
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
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
                  {totalTemplatesPrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Templates</span>
                      <span className="font-medium text-black">+${totalTemplatesPrice}</span>
                    </div>
                  )}
                  {totalPrintSizesPrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Print Sizes</span>
                      <span className="font-medium text-black">+${totalPrintSizesPrice}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-serif text-lg font-medium text-black">Total</span>
                  <span className="font-serif text-2xl font-medium text-black">${total}</span>
                </div>
                <Link href="/admin/checkout">
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