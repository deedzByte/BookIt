"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  X,
  Package,
  Crown,
  Zap,
  Edit,
  Trash2,
  FolderOpen,
  Layers,
  ChevronDown,
  ChevronRight,
  Eye,
  Clock,
  DollarSign,
  Sparkles,
  TrendingUp,
  Check,
  Grid,
  List,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Types
interface PackageTier {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  features: string[];
  isActive: boolean;
  isPopular?: boolean;
}

interface ServiceType {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  isActive: boolean;
  packages: PackageTier[];
}

interface Service {
  id: string;
  name: string;
  isActive: boolean;
  category: ServiceType[];
}

interface ServiceProvider {
  services: Service[];
}

// Color mappings
const packageColors = {
  Basic: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", icon: Package },
  Standard: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", icon: Zap },
  Premium: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", icon: Crown },
};

const getPackageStyle = (name: string) => {
  const key = name as keyof typeof packageColors;
  return packageColors[key] || packageColors.Basic;
};

export default function FieldDemo() {
  const [isShowAddType, setShowAddType] = useState(false);
  const [isShowAddCategory, setShowAddCategory] = useState(false);
  const [isShowAddService, setShowAddService] = useState(false);
  const [editingTypeId, setEditingTypeId] = useState<string | null>(null);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedTypeForPackage, setSelectedTypeForPackage] = useState<string | null>(null);
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set(["srv_1"]));
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Form states
  const [newType, setNewType] = useState({
    name: "",
    price: 0,
    duration: 4,
    description: "",
  });

  const [newPackage, setNewPackage] = useState({
    name: "",
    price: 0,
    duration: 4,
    description: "",
    features: [] as string[],
    isPopular: false,
  });

  const [newFeature, setNewFeature] = useState("");
  const [newServiceName, setNewServiceName] = useState("");

  // Mock data
  const [providerData, setProviderData] = useState<ServiceProvider>({
    services: [
      {
        id: "srv_1",
        name: "Photo Booth",
        isActive: true,
        category: [
          {
            id: "type_1",
            name: "360° Photo Booth",
            price: 200,
            duration: 4,
            description: "Spin your moments in 360° style",
            isActive: true,
            packages: [
              {
                id: "pkg_1",
                name: "Basic",
                price: 400,
                duration: 4,
                description: "Simple & Fun Memories",
                features: ["Open Air Booth", "Digital Gallery", "Friendly Booth Attendant", "Standard Backdrop"],
                isActive: true,
                isPopular: false,
              },
              {
                id: "pkg_2",
                name: "Standard",
                price: 600,
                duration: 4,
                description: "Stylish & Seamless",
                features: ["Everything in Basic", "Unlimited Prints", "Premium Backdrop", "Custom Overlay", "Online Gallery"],
                isActive: true,
                isPopular: true,
              },
              {
                id: "pkg_6",
                name: "Premium",
                price: 800,
                duration: 4,
                description: "Ultimate Experience",
                features: ["Everything in Standard", "Guest Book", "VIP Setup", "Premium Props", "USB of All Photos"],
                isActive: true,
                isPopular: false,
              },
            ],
          },
          {
            id: "type_2",
            name: "Mirror Booth",
            price: 300,
            duration: 4,
            description: "Interactive mirror experience",
            isActive: true,
            packages: [
              {
                id: "pkg_3",
                name: "Premium",
                price: 800,
                duration: 4,
                description: "Luxury Experience",
                features: ["Everything in Standard", "Guest Book", "VIP Setup", "Premium Props", "USB of All Photos"],
                isActive: true,
                isPopular: true,
              },
            ],
          },
          {
            id: "type_3",
            name: "Open Air Booth",
            price: 250,
            duration: 4,
            description: "Clean, modern, and spacious setup",
            isActive: true,
            packages: [],
          },
        ],
      },
      {
        id: "srv_2",
        name: "DJ Services",
        isActive: true,
        category: [
          {
            id: "type_4",
            name: "Wedding DJ",
            price: 500,
            duration: 6,
            description: "Professional wedding entertainment",
            isActive: true,
            packages: [
              {
                id: "pkg_4",
                name: "Standard",
                price: 800,
                duration: 6,
                description: "Complete wedding package",
                features: ["Professional DJ", "Sound System", "Lighting", "MC Services"],
                isActive: true,
                isPopular: true,
              },
            ],
          },
          {
            id: "type_5",
            name: "Corporate DJ",
            price: 400,
            duration: 4,
            description: "Corporate event entertainment",
            isActive: true,
            packages: [],
          },
        ],
      },
      {
        id: "srv_3",
        name: "Event Photography",
        isActive: true,
        category: [
          {
            id: "type_6",
            name: "Wedding Photography",
            price: 600,
            duration: 8,
            description: "Capturing your special day",
            isActive: true,
            packages: [
              {
                id: "pkg_5",
                name: "Premium",
                price: 1200,
                duration: 8,
                description: "Full wedding coverage",
                features: ["Two Photographers", "Engagement Shoot", "Digital Gallery", "Print Rights"],
                isActive: true,
                isPopular: true,
              },
            ],
          },
        ],
      },
    ],
  });

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const handleAddService = () => {
    if (!newServiceName.trim()) {
      toast.error("Please enter a service name");
      return;
    }

    const newService: Service = {
      id: `srv_${Date.now()}`,
      name: newServiceName.trim(),
      isActive: true,
      category: [],
    };

    setProviderData(prev => ({
      services: [...prev.services, newService],
    }));

    setNewServiceName("");
    setShowAddService(false);
    toast.success("Service added successfully!");
  };

  const handleAddType = () => {
    if (!newType.name || !newType.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const type: ServiceType = {
      id: `type_${Date.now()}`,
      ...newType,
      isActive: true,
      packages: [],
    };

    setProviderData(prev => ({
      services: prev.services.map((service, index) =>
        index === 0 ? { ...service, category: [...service.category, type] } : service
      ),
    }));

    setNewType({ name: "", price: 0, duration: 4, description: "" });
    setShowAddType(false);
    toast.success("Service type added successfully!");
  };

  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.price || newPackage.features.length === 0) {
      toast.error("Please fill in all required fields and add at least one feature");
      return;
    }

    if (!selectedTypeForPackage) {
      toast.error("Please select a type first");
      return;
    }

    const pkg: PackageTier = {
      id: `pkg_${Date.now()}`,
      ...newPackage,
      isActive: true,
    };

    setProviderData(prev => ({
      services: prev.services.map((service, serviceIndex) =>
        serviceIndex === 0 ? {
          ...service,
          category: service.category.map((type) =>
            type.id === selectedTypeForPackage
              ? { ...type, packages: [...type.packages, pkg] }
              : type
          )
        } : service
      ),
    }));

    setNewPackage({
      name: "",
      price: 0,
      duration: 4,
      description: "",
      features: [],
      isPopular: false,
    });
    setShowAddCategory(false);
    setSelectedTypeForPackage(null);
    toast.success("Package added successfully!");
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setNewPackage(prev => ({
      ...prev,
      features: [...prev.features, newFeature.trim()],
    }));
    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    setNewPackage(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteService = (serviceId: string) => {
    setProviderData(prev => ({
      services: prev.services.filter(s => s.id !== serviceId)
    }));
    toast.success("Service removed successfully!");
  };

  const handleDeleteType = (serviceId: string, typeId: string) => {
    setProviderData(prev => ({
      services: prev.services.map(s =>
        s.id === serviceId
          ? { ...s, category: s.category.filter(t => t.id !== typeId) }
          : s
      )
    }));
    setSelectedTypeId(null);
    toast.success("Category removed successfully!");
  };

  const handleDeletePackage = (typeId: string, packageId: string) => {
    setProviderData(prev => ({
      services: prev.services.map((service) =>
        service.id === "srv_1" ? {
          ...service,
          category: service.category.map((type) =>
            type.id === typeId
              ? { ...type, packages: type.packages.filter(p => p.id !== packageId) }
              : type
          )
        } : service
      ),
    }));
    setSelectedPackageId(null);
    toast.success("Package removed successfully!");
  };

  const handleEditType = (typeId: string) => {
    setEditingTypeId(typeId);
    const service = providerData.services[0];
    const type = service.category.find(t => t.id === typeId);
    if (type) {
      setNewType({
        name: type.name,
        price: type.price,
        duration: type.duration,
        description: type.description || "",
      });
      setShowAddType(true);
    }
  };

  const handleEditPackage = (packageId: string) => {
    setEditingPackageId(packageId);
    const service = providerData.services[0];
    let foundPkg = null;
    let foundTypeId = null;
    
    for (const type of service.category) {
      const pkg = type.packages.find(p => p.id === packageId);
      if (pkg) {
        foundPkg = pkg;
        foundTypeId = type.id;
        break;
      }
    }
    
    if (foundPkg) {
      setNewPackage({
        name: foundPkg.name,
        price: foundPkg.price,
        duration: foundPkg.duration,
        description: foundPkg.description || "",
        features: foundPkg.features,
        isPopular: foundPkg.isPopular || false,
      });
      setSelectedTypeForPackage(foundTypeId);
      setShowAddCategory(true);
    }
  };

  const toggleTypeSelection = (typeId: string) => {
    setSelectedTypeId(selectedTypeId === typeId ? null : typeId);
    setSelectedPackageId(null);
  };

  const togglePackageSelection = (packageId: string) => {
    setSelectedPackageId(selectedPackageId === packageId ? null : packageId);
  };

  const selectedType = providerData.services[0]?.category.find(t => t.id === selectedTypeId);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground text-sm">Manage your services, categories, and packages</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-md transition-all",
                viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-md transition-all",
                viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => setShowAddService(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Services */}
        <div className="lg:col-span-2 space-y-4">
          {providerData.services.map((service) => {
            const isExpanded = expandedServices.has(service.id);
            return (
              <Card key={service.id} className="overflow-hidden border shadow-sm">
                <div
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleServiceExpansion(service.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FolderOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={service.isActive ? "default" : "secondary"} className="text-xs">
                            {service.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {service.category.length} categories
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteService(service.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 border-t bg-muted/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Categories</span>
                        <Badge variant="secondary" className="text-xs">
                          {service.category.length}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddType(true)}
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Add Category
                      </Button>
                    </div>

                    <div className={cn(
                      "grid gap-3",
                      viewMode === "grid" 
                        ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                        : "grid-cols-1"
                    )}>
                      {service.category.map((type) => {
                        const isSelected = selectedTypeId === type.id;
                        return (
                          <div
                            key={type.id}
                            className={cn(
                              "p-3 rounded-xl border-2 transition-all cursor-pointer",
                              isSelected
                                ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                                : "border-border hover:border-primary/50 hover:bg-muted/30",
                              viewMode === "list" ? "flex items-center justify-between" : ""
                            )}
                            onClick={() => toggleTypeSelection(type.id)}
                          >
                            <div className={cn("flex-1", viewMode === "list" ? "flex items-center gap-3" : "")}>
                              <div>
                                <p className="font-medium">{type.name}</p>
                                {type.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-1">{type.description}</p>
                                )}
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    ${type.price}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {type.packages.length} packages
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-primary hover:bg-primary/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditType(type.id);
                                  }}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteType(service.id, type.id);
                                  }}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Right Column - Package Details */}
        <div className="lg:col-span-1">
          {selectedType ? (
            <Card className="sticky top-24 border shadow-sm overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg truncate">{selectedType.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{selectedType.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => setSelectedTypeId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">${selectedType.price}</span>
                    <span className="text-xs text-muted-foreground">/ {selectedType.duration}h</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {selectedType.packages.length} packages
                  </Badge>
                </div>
              </div>

              <div className="p-4 max-h-[500px] overflow-y-auto space-y-3">
                {selectedType.packages.length > 0 ? (
                  selectedType.packages.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    const style = getPackageStyle(pkg.name);
                    const Icon = style.icon;
                    
                    return (
                      <div
                        key={pkg.id}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all cursor-pointer",
                          isSelected
                            ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                            : "border-border hover:border-primary/50 hover:shadow-sm",
                          style.bg
                        )}
                        onClick={() => togglePackageSelection(pkg.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <Icon className={cn("h-4 w-4", style.text)} />
                              <h4 className="font-semibold">{pkg.name}</h4>
                              {pkg.isPopular && (
                                <Badge className="bg-amber-500 text-white text-[10px]">
                                  <TrendingUp className="h-3 w-3 mr-0.5" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-bold text-lg">${pkg.price}</span>
                              <span className="text-xs text-muted-foreground">/ {pkg.duration}h</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 ml-2 shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-primary hover:bg-primary/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditPackage(pkg.id);
                              }}
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:bg-destructive/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePackage(selectedType.id, pkg.id);
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>

                        {pkg.description && (
                          <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                        )}

                        {isSelected && pkg.features.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <p className="text-xs font-medium text-muted-foreground mb-2">Features</p>
                            <div className="flex flex-wrap gap-1.5">
                              {pkg.features.map((feature, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  <Check className="h-3 w-3 mr-1 text-primary" />
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {!isSelected && pkg.features.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {pkg.features.slice(0, 2).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-[10px]">
                                {feature}
                              </Badge>
                            ))}
                            {pkg.features.length > 2 && (
                              <Badge variant="outline" className="text-[10px]">
                                +{pkg.features.length - 2} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground/30 mb-2" />
                    <p className="text-sm text-muted-foreground">No packages available</p>
                    <p className="text-xs text-muted-foreground">Add a package to get started</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t bg-muted/30">
                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedTypeForPackage(selectedType.id);
                    setShowAddCategory(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Package
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="sticky top-24 border shadow-sm">
              <div className="flex flex-col items-center justify-center p-8 h-[400px] text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Package className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Select a Category</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Click on any service category to view and manage its packages
                </p>
                <div className="flex gap-1.5 mt-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150" />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Dialogs and Drawers remain the same... */}
      {/* Add Service Drawer */}
      <Drawer open={isShowAddService} onOpenChange={setShowAddService}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add New Service</DrawerTitle>
            <DrawerDescription>
              Create a new service to offer to your customers.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service-name">Service Name</Label>
                <Input
                  id="service-name"
                  placeholder="Enter service name"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleAddService}>Add Service</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Add Category Dialog */}
      <Dialog open={isShowAddType} onOpenChange={setShowAddType}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTypeId ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription>
              {editingTypeId ? "Update your service category" : "Create a new service category"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Category Name *</Label>
              <Input
                placeholder="e.g., 360° Photo Booth"
                value={newType.name}
                onChange={(e) => setNewType({ ...newType, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($) *</Label>
                <Input
                  type="number"
                  placeholder="200"
                  value={newType.price}
                  onChange={(e) => setNewType({ ...newType, price: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Duration (hours) *</Label>
                <Input
                  type="number"
                  placeholder="4"
                  value={newType.duration}
                  onChange={(e) => setNewType({ ...newType, duration: parseFloat(e.target.value) || 4 })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="Brief description"
                value={newType.description}
                onChange={(e) => setNewType({ ...newType, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddType(false);
              setEditingTypeId(null);
              setNewType({ name: "", price: 0, duration: 4, description: "" });
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddType}>
              {editingTypeId ? "Update" : "Add Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Package Dialog */}
      <Dialog open={isShowAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPackageId ? "Edit Package" : "Add Package"}</DialogTitle>
            <DialogDescription>
              {editingPackageId ? "Update your package details" : "Create a new package for your category"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Category *</Label>
              <Select
                value={selectedTypeForPackage || ""}
                onValueChange={(value) => setSelectedTypeForPackage(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {providerData.services[0]?.category.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Package Name *</Label>
              <Select
                value={newPackage.name}
                onValueChange={(value) => setNewPackage({ ...newPackage, name: value || "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($) *</Label>
                <Input
                  type="number"
                  placeholder="400"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Duration (hours) *</Label>
                <Input
                  type="number"
                  placeholder="4"
                  value={newPackage.duration}
                  onChange={(e) => setNewPackage({ ...newPackage, duration: parseFloat(e.target.value) || 4 })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="Brief description"
                value={newPackage.description}
                onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={newPackage.isPopular}
                onCheckedChange={(checked) => setNewPackage({ ...newPackage, isPopular: checked })}
              />
              <Label className="cursor-pointer">Mark as Popular</Label>
            </div>
            <div className="space-y-2">
              <Label>Features *</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
                />
                <Button variant="outline" onClick={handleAddFeature}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newPackage.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                    <Button
                      onClick={() => handleRemoveFeature(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddCategory(false);
              setEditingPackageId(null);
              setSelectedTypeForPackage(null);
              setNewPackage({
                name: "",
                price: 0,
                duration: 4,
                description: "",
                features: [],
                isPopular: false,
              });
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddPackage}>
              {editingPackageId ? "Update" : "Add Package"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}