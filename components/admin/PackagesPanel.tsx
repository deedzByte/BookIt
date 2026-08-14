// components/PackagesPanel.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Crown,
  Zap,
  Package,
  TrendingUp,
  Edit,
  Trash2,
  Check,
  DollarSign,
  Clock,
  Layers,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  packages: PackageTier[];
}

interface PackagesPanelProps {
  category: ServiceType | undefined;
  selectedPackageId: string | null;
  onSelectPackage: (id: string) => void;
  onAddPackage: () => void;
  onEditPackage: (id: string, updatedPackage: Omit<PackageTier, "id">) => void;
  onDeletePackage: (id: string) => void;
}

const PACKAGE_ICONS = {
  Basic: Package,
  Standard: Zap,
  Premium: Crown,
};

const PACKAGE_COLORS = {
  Basic: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  Standard: "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400",
  Premium: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
};

export function PackagesPanel({
  category,
  selectedPackageId,
  onSelectPackage,
  onAddPackage,
  onEditPackage,
  onDeletePackage,
}: PackagesPanelProps) {
  // Edit Dialog State
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageTier | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: 0,
    duration: 4,
    description: "",
    features: [] as string[],
    isPopular: false,
  });
  const [featureInput, setFeatureInput] = useState("");
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Delete Alert Dialog State
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [deletingPackageId, setDeletingPackageId] = useState<string | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  if (!category) {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-background shadow-sm ring-1 ring-border">
          <Package className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-semibold">Choose a category</h3>
        <p className="mt-1 max-w-52 text-xs leading-5 text-muted-foreground">
          Select a category to view its packages
        </p>
      </div>
    );
  }

  const packageCount = category.packages.length;

  const handleEditClick = (pkg: PackageTier) => {
    setEditingPackage(pkg);
    setEditForm({
      name: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      description: pkg.description || "",
      features: [...pkg.features],
      isPopular: pkg.isPopular || false,
    });
    setEditDialogOpen(true);
  };

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;
    if (editForm.features.includes(trimmed)) {
      toast.error("Feature already added");
      return;
    }
    setEditForm({ ...editForm, features: [...editForm.features, trimmed] });
    setFeatureInput("");
  };

  const handleRemoveFeature = (index: number) => {
    setEditForm({
      ...editForm,
      features: editForm.features.filter((_, i) => i !== index),
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = editForm.name.trim();
    if (!trimmedName) {
      toast.error("Please select a package name");
      return;
    }
    if (editForm.price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (editForm.duration <= 0) {
      toast.error("Please enter a valid duration");
      return;
    }
    if (editForm.features.length === 0) {
      toast.error("Please add at least one feature");
      return;
    }

    setIsEditLoading(true);
    setTimeout(() => {
      if (editingPackage) {
        onEditPackage(editingPackage.id, {
          name: trimmedName,
          price: editForm.price,
          duration: editForm.duration,
          description: editForm.description.trim(),
          features: editForm.features,
          isPopular: editForm.isPopular,
          isActive: true,
        });
        toast.success(`Package "${trimmedName}" updated!`);
      }
      setIsEditLoading(false);
      setEditDialogOpen(false);
      setEditingPackage(null);
    }, 500);
  };

  const handleDeleteClick = (packageId: string) => {
    setDeletingPackageId(packageId);
    setDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingPackageId) return;
    
    setIsDeleteLoading(true);
    setTimeout(() => {
      onDeletePackage(deletingPackageId);
      setIsDeleteLoading(false);
      setDeleteAlertOpen(false);
      setDeletingPackageId(null);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const packageTypes = ["Basic", "Standard", "Premium"];

  return (
    <>
      <section className="flex h-full min-h-0 flex-col rounded-2xl border border-border/80 bg-card p-3 shadow-sm sm:p-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/70 pb-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Layers className="size-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Packages</p>
              <h2 className="truncate text-sm font-semibold text-foreground">{category.name} <span className="text-cyan-700 text-[12px]">({packageCount})</span></h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-primary hover:bg-primary/10 hover:text-primary"
            onClick={onAddPackage}
            aria-label="Add package"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Packages List */}
        <ScrollArea className="flex-1 pr-2">
          {packageCount === 0 ? (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-5 text-center">
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-background text-muted-foreground shadow-sm ring-1 ring-border">
                <Package className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium">No packages yet</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Add a package to outline what clients receive.</p>
              <Button size="sm" className="mt-4" onClick={onAddPackage}>
                <Plus className="size-3.5" />
                Add package
              </Button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {category.packages.map((pkg, index) => {
                const isSelected = selectedPackageId === pkg.id;
                const Icon = PACKAGE_ICONS[pkg.name as keyof typeof PACKAGE_ICONS] || Package;
                const colorClass = PACKAGE_COLORS[pkg.name as keyof typeof PACKAGE_COLORS] || PACKAGE_COLORS.Basic;

                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      className={cn(
                        "group cursor-pointer rounded-xl border p-3 transition-all duration-200",
                        isSelected
                          ? "border-primary/25 bg-primary/[0.07] shadow-sm ring-1 ring-primary/10"
                          : "border-transparent bg-muted/25 hover:border-border hover:bg-background hover:shadow-sm"
                      )}
                        onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(pkg);
                              }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <div className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg", colorClass)}>
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <span className={cn(
                              "truncate text-sm font-semibold",
                              isSelected ? "text-foreground" : "text-foreground/80"
                            )}>
                              {pkg.name}
                            </span>
                            {pkg.isPopular && (
                              <Badge className="h-5 shrink-0 rounded-full border-0 bg-amber-500 px-1.5 text-[10px] font-medium text-white hover:bg-amber-500">
                                <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                                Popular
                              </Badge>
                            )}
                            {!pkg.isActive && (
                              <Badge variant="secondary" className="h-5 shrink-0 rounded-full px-1.5 text-[10px] font-medium">
                                Inactive
                              </Badge>
                            )}
                          </div>
                          {pkg.description && (
                            <p className="mt-1 line-clamp-1 text-xs leading-5 text-muted-foreground">
                              {pkg.description}
                            </p>
                          )}
                          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 font-medium text-foreground/75">
                              <DollarSign className="h-3 w-3 text-primary" />
                              {pkg.price}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {pkg.duration}h
                            </span>
                          </div>
                          {isSelected && pkg.features.length > 0 && (
                            <div className="mt-3 border-t border-border/60 pt-2.5">
                              <div className="flex flex-wrap gap-1">
                                {pkg.features.slice(0, 3).map((feature, idx) => (
                                  <Badge key={idx} variant="secondary" className="h-5 rounded-full text-[10px]">
                                    <Check className="h-2.5 w-2.5 mr-1" />
                                    {feature}
                                  </Badge>
                                ))}
                                {pkg.features.length > 3 && (
                                  <Badge variant="secondary" className="h-5 rounded-full text-[10px]">
                                    +{pkg.features.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {isSelected && (
                          <div className="ml-1 flex shrink-0 items-center gap-0.5">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7 rounded-lg text-destructive hover:bg-destructive/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(pkg.id);
                              }}
                              aria-label={`Delete ${pkg.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </section>

      {/* Edit Package Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Package</DialogTitle>
            <DialogDescription>
              Update your package details.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Package Name *</Label>
                  <Select
                    value={editForm.name}
                    onValueChange={(value) => setEditForm({ ...editForm, name: value || ""})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select package type" />
                    </SelectTrigger>
                    <SelectContent>
                      {packageTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-package-price">Price ($) *</Label>
                    <Input
                      id="edit-package-price"
                      type="number"
                      placeholder="400"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-package-duration">Duration (hours) *</Label>
                    <Input
                      id="edit-package-duration"
                      type="number"
                      placeholder="4"
                      value={editForm.duration}
                      onChange={(e) => setEditForm({ ...editForm, duration: parseFloat(e.target.value) || 4 })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-package-description">Description</Label>
                  <Input
                    id="edit-package-description"
                    placeholder="Brief description"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editForm.isPopular}
                    onCheckedChange={(checked) => setEditForm({ ...editForm, isPopular: checked })}
                    id="edit-package-popular"
                  />
                  <Label htmlFor="edit-package-popular" className="cursor-pointer">
                    Mark as Popular
                  </Label>
                </div>
                <div className="space-y-2">
                  <Label>Features *</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a feature"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button type="button" variant="outline" onClick={handleAddFeature}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editForm.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <button
                          type="button"
                          className="ml-1 hover:text-destructive"
                          onClick={() => handleRemoveFeature(index)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {editForm.features.length === 0 && (
                      <span className="text-xs text-muted-foreground">No features added yet</span>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" type="button" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isEditLoading}>
                  {isEditLoading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Delete Package Alert Dialog */}
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Package</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this package? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleteLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
