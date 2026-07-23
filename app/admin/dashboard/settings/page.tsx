"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Plus,
  X,
  Eye,
  EyeOff,
  Settings as SettingsIcon,
  CheckCircle2,
  Circle,
  AlertCircle,
  Shield,
  CreditCard,
  Bell,
  Layers,
  Save,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ============================================================
// TYPES
// ============================================================
interface Service {
  id: string;
  name: string;
  category: string;
  isActive: boolean;
}

interface Category {
  id: string;
  label: string;
}


const defaultCategories: Category[] = [
  { id: "photobooth", label: "Photo Booth" },
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "dj", label: "DJ Entertainment" },
  { id: "wedding-planner", label: "Wedding Planner" },
  { id: "live-band", label: "Live Band" },
  { id: "catering", label: "Catering" },
  { id: "event-planning", label: "Event Planning" },
  { id: "decoration", label: "Decoration" },
  { id: "transport", label: "Transport" },
];

function AddCategoryDialog({ 
  open, 
  onOpenChange,
  onAddCategory,
  existingCategories,
}: { 
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCategory: (category: Category) => void;
  existingCategories: Category[];
}) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("Please enter a category name");
      return;
    }

    if (existingCategories.some(c => c.label.toLowerCase() === trimmedName.toLowerCase())) {
      toast.error("Category already exists!");
      return;
    }

    const id = trimmedName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    setIsLoading(true);
    setTimeout(() => {
      onAddCategory({ id, label: trimmedName });
      setName("");
      setIsLoading(false);
      toast.success(`Category "${trimmedName}" added!`);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Category</DialogTitle>
          <DialogDescription>Create a new category for your services.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="category-name" className="text-sm font-medium">Category Name</Label>
              <Input
                id="category-name"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                className="rounded-xl"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="rounded-xl">
              {isLoading ? "Adding..." : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// ADD SERVICE DIALOG
// ============================================================
function AddServiceDialog({ 
  open, 
  onOpenChange,
  onAddService,
  categories,
  onAddCategory,
}: { 
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddService: (service: Omit<Service, "id">) => void;
  categories: Category[];
  onAddCategory: (category: Category) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a service name");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onAddService({
        name: name.trim(),
        category,
        isActive: status === "active",
      });
      setName("");
      setCategory("");
      setStatus("active");
      setIsLoading(false);
      toast.success(`Service "${name.trim()}" added!`);
      onOpenChange(false);
    }, 500);
  };

  const handleAddCategory = (newCategory: Category) => {
    onAddCategory(newCategory);
    setCategory(newCategory.id);
    setShowCategoryDialog(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New Service</DialogTitle>
            <DialogDescription>Add a new service to your business offerings.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="service-name" className="text-sm font-medium">Service Name</Label>
                <Input
                  id="service-name"
                  placeholder="Enter service name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-3">
                <Label className="text-sm font-medium">Category</Label>
                <div className="flex gap-2">
                  <select
                    className="w-full px-3 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0 rounded-xl"
                    onClick={() => setShowCategoryDialog(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-3">
                <Label className="text-sm font-medium">Status</Label>
                <RadioGroup
                  value={status}
                  onValueChange={(value) => setStatus(value as "active" | "inactive")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active" className="cursor-pointer text-sm">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inactive" id="inactive" />
                    <Label htmlFor="inactive" className="cursor-pointer text-sm">Inactive</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="rounded-xl">
                {isLoading ? "Adding..." : "Add Service"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AddCategoryDialog
        open={showCategoryDialog}
        onOpenChange={setShowCategoryDialog}
        onAddCategory={handleAddCategory}
        existingCategories={categories}
      />
    </>
  );
}

// ============================================================
// MAIN SETTINGS COMPONENT
// ============================================================
export default function Settings() {
  // Services state
  const [services, setServices] = useState<Service[]>([
    { id: "1", name: "360° Photo Booth", category: "photobooth", isActive: true },
    { id: "2", name: "Mirror Booth", category: "photobooth", isActive: true },
    { id: "3", name: "Wedding DJ", category: "dj", isActive: true },
    { id: "4", name: "Event Photography", category: "photography", isActive: true },
  ]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Payment state
  const [paymentMethodsState, setPaymentMethodsState] = useState<string[]>(["credit-card", "paypal"]);
  const [isBusinessActive, setIsBusinessActive] = useState(true);

  // Notification state
  const [notificationStates, setNotificationStates] = useState<Record<string, boolean>>({
    bookings: true,
    reminders: true,
    cancellations: true,
    reviews: false,
    promotions: false,
  });

  // Security state
  const [showPassword, setShowPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleAddService = (service: Omit<Service, "id">) => {
    const newService: Service = {
      ...service,
      id: `srv_${Date.now()}`,
    };
    setServices([...services, newService]);
  };

  const handleRemoveService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    toast.success("Service removed");
  };

  const handleToggleService = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleAddCategory = (category: Category) => {
    setCategories([...categories, category]);
  };

  const handleTogglePaymentMethod = (id: string) => {
    setPaymentMethodsState(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };



  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    toast.success(is2FAEnabled ? "2FA disabled" : "2FA enabled");
  };

  const handleUpdatePassword = () => {
    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveAll = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("All settings saved successfully!");
    }, 1000);
  };

  const handleDiscard = () => {
    toast.info("Changes discarded");
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="p-4">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Services</h3>
                  <p className="text-sm text-muted-foreground">Manage your service offerings and categories.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Your Services ({services.length})</span>
                  <Button
                    size="sm"
                    onClick={() => setShowAddService(true)}
                    className="rounded-xl"
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add Service
                  </Button>
                </div>

                <div className="space-y-2">
                  {services.length > 0 ? (
                    services.map((service) => {
                      const category = categories.find(c => c.id === service.category);
                      return (
                        <div
                          key={service.id}
                          className="flex items-center justify-between p-3 rounded-xl border bg-white hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className={cn(
                              "w-2.5 h-2.5 rounded-full shrink-0",
                              service.isActive ? "bg-green-500" : "bg-gray-300"
                            )} />
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate">{service.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{category?.label || service.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <Switch
                              checked={service.isActive}
                              onCheckedChange={() => handleToggleService(service.id)}
                              className="data-[state=checked]:bg-green-500"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-xl"
                              onClick={() => handleRemoveService(service.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed rounded-xl">
                      <p className="text-sm text-muted-foreground">No services added yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <br />
          </div>

        <div className="flex flex-wrap gap-3 items-center justify-between bg-white rounded-2xl border shadow-sm p-4">
          <div className="flex items-center gap-2">
            <Save className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Save all your settings changes</span>
          </div>
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={handleDiscard}
              className="rounded-xl"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button 
              type="button"
              onClick={handleSaveAll}
              disabled={isSaving}
              className="rounded-xl min-w-[120px]"
            >
              {isSaving ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save All Settings"
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* ============================================================
          MODALS / DIALOGS
          ============================================================ */}
      <AddServiceDialog
        open={showAddService}
        onOpenChange={setShowAddService}
        onAddService={handleAddService}
        categories={categories}
        onAddCategory={handleAddCategory}
      />

      <AddCategoryDialog
        open={showAddCategory}
        onOpenChange={setShowAddCategory}
        onAddCategory={handleAddCategory}
        existingCategories={categories}
      />
    </div>
  );
}