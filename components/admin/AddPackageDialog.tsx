// components/dialogs/AddPackageDialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface AddPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPackage: (categoryId: string, pkg: any) => void;
  categoryId: string;
}

export function AddPackageDialog({
  open,
  onOpenChange,
  onAddPackage,
  categoryId,
}: AddPackageDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("4");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;
    setFeatures([...features, trimmed]);
    setFeatureInput("");
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Please select a package name");
      return;
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    const durationNum = parseFloat(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      toast.error("Please enter a valid duration");
      return;
    }
    if (features.length === 0) {
      toast.error("Please add at least one feature");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onAddPackage(categoryId, {
        name: trimmed,
        price: priceNum,
        duration: durationNum,
        description: description.trim(),
        features: features,
        isPopular: isPopular,
        isActive: true,
      });
      setName("");
      setPrice("");
      setDuration("4");
      setDescription("");
      setFeatures([]);
      setFeatureInput("");
      setIsPopular(false);
      setIsLoading(false);
      onOpenChange(false);
    }, 500);
  };

  const packageTypes = ["Basic", "Standard", "Premium"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add Package</DialogTitle>
          <DialogDescription>
            Create a new package for your category.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Package Name</Label>
                <Select value={name} onValueChange={(value) => setName(value || "")}>
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
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="400"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="4"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isPopular}
                  onCheckedChange={setIsPopular}
                  id="popular"
                />
                <Label htmlFor="popular" className="cursor-pointer">
                  Mark as Popular
                </Label>
              </div>
              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddFeature())}
                  />
                  <Button type="button" variant="outline" onClick={handleAddFeature}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {features.map((feature, index) => (
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
                  {features.length === 0 && (
                    <span className="text-xs text-muted-foreground">No features added yet</span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Package"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}