// components/PackageDrawer.tsx
"use client"

import {
  Package,
  Crown,
  Zap,
  X,
  Edit,
  Trash2,
  DollarSign,
  Clock,
  Check,
  TrendingUp,
  Copy,
} from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface PackageTier {
  id: string
  name: string
  price: number
  duration: number
  description: string
  features: string[]
  isActive: boolean
  isPopular?: boolean
}

interface PackageDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  package: PackageTier | undefined
  onEdit: () => void
  onDelete: () => void
}

const PACKAGE_ICONS = {
  Basic: Package,
  Standard: Zap,
  Premium: Crown,
}

const PACKAGE_COLORS = {
  Basic: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  Standard:
    "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400",
  Premium:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
}

export function PackageDrawer({
  open,
  onOpenChange,
  package: pkg,
  onEdit,
  onDelete,
}: PackageDrawerProps) {
  if (!pkg) return null

  const Icon = PACKAGE_ICONS[pkg.name as keyof typeof PACKAGE_ICONS] || Package
  const colorClass =
    PACKAGE_COLORS[pkg.name as keyof typeof PACKAGE_COLORS] ||
    PACKAGE_COLORS.Basic

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("rounded-lg p-2", colorClass)}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <DrawerTitle className="text-xl">{pkg.name}</DrawerTitle>
                <DrawerDescription>
                  {pkg.description || "Package details"}
                </DrawerDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4 pb-6">
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center gap-3">
              <Badge variant={pkg.isActive ? "default" : "secondary"}>
                {pkg.isActive ? "Active" : "Inactive"}
              </Badge>
              {pkg.isPopular && (
                <Badge className="border-0 bg-amber-500 text-white">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Popular
                </Badge>
              )}
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-2xl font-bold">${pkg.price}</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-2xl font-bold">{pkg.duration}h</p>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h4 className="mb-3 text-sm font-medium">What&apos;s Included</h4>
              <div className="grid grid-cols-1 gap-2">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" className="flex-1">
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  onDelete()
                  onOpenChange(false)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
