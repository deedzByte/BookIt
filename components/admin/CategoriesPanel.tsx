// components/CategoriesPanel.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Grid,
  List,
  ChevronRight,
  Package,
  DollarSign,
  Clock,
  Edit,
  Trash2,
  FolderOpen,
  Layers,
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ServiceType {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  isActive: boolean;
  packages: any[];
}

interface Service {
  id: string;
  name: string;
  isActive: boolean;
  category: ServiceType[];
}

interface CategoriesPanelProps {
  service: Service | undefined;
  selectedCategoryId: string | null;
  onSelectCategory: (id: string) => void;
  onAddCategory: () => void;
  onEditCategory: (id: string, updatedCategory: Omit<ServiceType, "id" | "packages">) => void;
  onDeleteCategory: (id: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function CategoriesPanel({
  service,
  selectedCategoryId,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  viewMode,
  onViewModeChange,
}: CategoriesPanelProps) {
  // Edit Dialog State
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceType | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: 0,
    duration: 4,
    description: "",
  });
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Delete Alert Dialog State
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  if (!service) {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-background shadow-sm ring-1 ring-border">
          <FolderOpen className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-semibold">Choose a service</h3>
        <p className="mt-1 max-w-52 text-xs leading-5 text-muted-foreground">
          Select a service from the sidebar to view its categories
        </p>
      </div>
    );
  }

  const handleEditClick = (category: ServiceType) => {
    setEditingCategory(category);
    setEditForm({
      name: category.name,
      price: category.price,
      duration: category.duration,
      description: category.description || "",
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = editForm.name.trim();
    if (!trimmedName) {
      toast.error("Please enter a category name");
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

    setIsEditLoading(true);
    setTimeout(() => {
      if (editingCategory) {
        onEditCategory(editingCategory.id, {
          name: trimmedName,
          price: editForm.price,
          duration: editForm.duration,
          description: editForm.description.trim(),
          isActive: editingCategory.isActive,
        });
        toast.success(`Category "${trimmedName}" updated!`);
      }
      setIsEditLoading(false);
      setEditDialogOpen(false);
      setEditingCategory(null);
    }, 500);
  };

  const handleDeleteClick = (categoryId: string) => {
    setDeletingCategoryId(categoryId);
    setDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingCategoryId) return;
    
    setIsDeleteLoading(true);
    setTimeout(() => {
      onDeleteCategory(deletingCategoryId);
      setIsDeleteLoading(false);
      setDeleteAlertOpen(false);
      setDeletingCategoryId(null);
    }, 400);
  };

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
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Categories</p>
              <h2 className="truncate text-sm font-semibold text-foreground">{service.name} <span className="text-cyan-700 text-[12px]">({service.category.length})</span></h2>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 size-8 rounded-lg text-primary hover:bg-primary/10 hover:text-primary"
              onClick={onAddCategory}
              aria-label="Add category"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories List */}
        <ScrollArea className="flex-1 pr-2">
          {service.category.length === 0 ? (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-5 text-center">
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-background text-muted-foreground shadow-sm ring-1 ring-border">
                <Package className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium">No categories yet</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Add a category to begin building your offerings.</p>
              <Button size="sm" className="mt-4" onClick={onAddCategory}>
                <Plus className="size-3.5" />
                Add category
              </Button>
            </div>
          ) : (
            <div className={cn(
              "grid",
              viewMode === "grid" ? "gap-2.5" : "gap-1"
            )}>
              {service.category.map((category, index) => {
                const isSelected = selectedCategoryId === category.id;
                const packageCount = category.packages.length;

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      className={cn(
                        "group relative cursor-pointer rounded-xl border p-3 transition-all duration-200",
                        isSelected
                          ? "border-primary/25 bg-primary/[0.07] shadow-sm ring-1 ring-primary/10"
                          : "border-transparent bg-muted/25 hover:border-border hover:bg-background hover:shadow-sm"
                      )}
                      onClick={() => onSelectCategory(category.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "truncate text-sm font-semibold",
                              isSelected ? "text-foreground" : "text-foreground/85"
                            )}>
                              {category.name}
                            </span>
                            {category.isActive ? (
                              <Badge className="h-5 shrink-0 rounded-full bg-emerald-500/10 px-1.5 text-[10px] font-medium text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400">Active</Badge>
                            ) : (
                              <Badge variant="secondary" className="h-5 shrink-0 rounded-full px-1.5 text-[10px] font-medium">Inactive</Badge>
                            )}
                          </div>
                          {category.description && (
                            <p className="mt-1 line-clamp-1 text-xs leading-5 text-muted-foreground">
                              {category.description}
                            </p>
                          )}
                          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 font-medium text-foreground/75">
                              <DollarSign className="h-3 w-3 text-primary" />
                              {category.price}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {category.duration}h
                            </span>
                            <span className="flex items-center gap-1">
                              <Package className="h-3 w-3" aria-hidden="true" />
                              {packageCount} {packageCount === 1 ? "package" : "packages"}
                            </span>
                          </div>
                        </div>

                        <div className="ml-1 flex shrink-0 items-center gap-0.5">
                          {isSelected && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7 rounded-lg text-primary hover:bg-primary/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditClick(category);
                                }}
                                aria-label={`Edit ${category.name}`}
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7 rounded-lg text-destructive hover:bg-destructive/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(category.id);
                                }}
                                aria-label={`Delete ${category.name}`}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </>
                          )}
                          {isSelected && (
                            <ChevronRight className="h-4 w-4 text-primary" aria-hidden="true" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </section>

      {/* Edit Category Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update your service category details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category-name">Category Name *</Label>
                <Input
                  id="edit-category-name"
                  placeholder="e.g., 360° Photo Booth"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category-price">Price ($) *</Label>
                  <Input
                    id="edit-category-price"
                    type="number"
                    placeholder="200"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category-duration">Duration (hours) *</Label>
                  <Input
                    id="edit-category-duration"
                    type="number"
                    placeholder="4"
                    value={editForm.duration}
                    onChange={(e) => setEditForm({ ...editForm, duration: parseFloat(e.target.value) || 4 })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category-description">Description</Label>
                <Input
                  id="edit-category-description"
                  placeholder="Brief description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isEditLoading}>
                {isEditLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Category Alert Dialog */}
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
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