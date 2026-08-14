// components/dialogs/AddCategoryDialog.tsx
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Field, FieldLabel } from "../ui/field"

interface NewCategory {
  name: string
  price: number
  duration: number
  description: string
  isActive: boolean
}

interface AddCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCategory: (serviceId: string, category: NewCategory) => void
  serviceId: string
}

export function AddCategoryDialog({
  open,
  onOpenChange,
  onAddCategory,
  serviceId,
}: AddCategoryDialogProps) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("4")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      toast.error("Please enter a category name")
      return
    }
    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Please enter a valid price")
      return
    }
    const durationNum = parseFloat(duration)
    if (isNaN(durationNum) || durationNum <= 0) {
      toast.error("Please enter a valid duration")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      onAddCategory(serviceId, {
        name: trimmed,
        price: priceNum,
        duration: durationNum,
        description: description.trim(),
        isActive: true,
      })
      setName("")
      setPrice("")
      setDuration("4")
      setDescription("")
      setIsLoading(false)
      onOpenChange(false)
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a new category for your service.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>

                <Input
                  id="name"
                  placeholder="e.g., 360° Photo Booth"
                  className="mt-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <Field>
                <FieldLabel htmlFor="picture">Picture</FieldLabel>
                <Input id="picture" type="file" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="200"
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
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
