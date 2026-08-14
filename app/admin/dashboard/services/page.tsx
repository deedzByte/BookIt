// app/services/page.tsx or components/ServiceDashboard.tsx
"use client"

import { useState } from "react"
import { toast } from "sonner"

// Import components

import { AddCategoryDialog } from "@/components/admin/AddCategoryDialog"
import { AddPackageDialog } from "@/components/admin/AddPackageDialog"
import { CategoriesPanel } from "@/components/admin/CategoriesPanel"
import { PackageDrawer } from "@/components/admin/PackageDrawer"
import { PackagesPanel } from "@/components/admin/PackagesPanel"
import { ServicesSidebar } from "@/components/admin/ServiceSidebar"

// Types
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

interface ServiceType {
  id: string
  name: string
  price: number
  duration: number
  description: string
  isActive: boolean
  packages: PackageTier[]
}

interface Service {
  id: string
  name: string
  isActive: boolean
  category: ServiceType[]
}

// Mock Data
const MOCK_SERVICES: Service[] = [
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
            features: [
              "Open Air Booth",
              "Digital Gallery",
              "Friendly Booth Attendant",
            ],
            isActive: true,
            isPopular: false,
          },
          {
            id: "pkg_2",
            name: "Standard",
            price: 600,
            duration: 4,
            description: "Stylish & Seamless",
            features: [
              "Everything in Basic",
              "Unlimited Prints",
              "Premium Backdrop",
              "Custom Overlay",
            ],
            isActive: true,
            isPopular: true,
          },
          {
            id: "pkg_6",
            name: "Premium",
            price: 800,
            duration: 4,
            description: "Ultimate Experience",
            features: [
              "Everything in Standard",
              "Guest Book",
              "VIP Setup",
              "Premium Props",
            ],
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
            features: [
              "Everything in Standard",
              "Guest Book",
              "VIP Setup",
              "Premium Props",
            ],
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
            features: [
              "Professional DJ",
              "Sound System",
              "Lighting",
              "MC Services",
            ],
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
            features: [
              "Two Photographers",
              "Engagement Shoot",
              "Digital Gallery",
              "Print Rights",
            ],
            isActive: true,
            isPopular: true,
          },
        ],
      },
    ],
  },
]

export default function ServiceDashboard() {
  // State
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    "srv_1"
  )
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    "type_1"
  )
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    "pkg_2"
  )
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  // Dialog states
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddPackage, setShowAddPackage] = useState(false)

  const handleAddService = (service: {
    name: string
    isActive: boolean
    category: unknown[]
  }) => {
    const nextService: Service = {
      id: `srv_${services.length + 1}`,
      name: service.name,
      isActive: service.isActive,
      category: [],
    }
    setServices((current) => [...current, nextService])
    setSelectedServiceId(nextService.id)
    toast.success("Service added")
  }

  // Derived data
  const selectedService = services.find((s) => s.id === selectedServiceId)
  const selectedCategory = selectedService?.category.find(
    (c) => c.id === selectedCategoryId
  )
  const selectedPackage = selectedCategory?.packages.find(
    (p) => p.id === selectedPackageId
  )

  // ============================================================
  // HANDLERS
  // ============================================================

  // Service handlers
  const handleDeleteService = (id: string) => {
    if (services.length <= 1) {
      toast.error("Cannot delete the last service")
      return
    }
    setServices(services.filter((s) => s.id !== id))
    if (selectedServiceId === id) {
      setSelectedServiceId(services.find((s) => s.id !== id)?.id || null)
    }
    toast.success("Service removed")
  }

  // Category handlers
  const handleAddCategory = (
    serviceId: string,
    category: Omit<ServiceType, "id" | "packages">
  ) => {
    const newCategory: ServiceType = {
      ...category,
      id: `type_${Date.now()}`,
      packages: [],
    }

    setServices(
      services.map((s) =>
        s.id === serviceId
          ? { ...s, category: [...s.category, newCategory] }
          : s
      )
    )
    setSelectedCategoryId(newCategory.id)
    toast.success(`Category "${category.name}" added!`)
  }

  const handleEditCategory = (
    id: string,
    updatedCategory: Omit<ServiceType, "id" | "packages">
  ) => {
    setServices(
      services.map((s) => ({
        ...s,
        category: s.category.map((c) =>
          c.id === id ? { ...c, ...updatedCategory } : c
        ),
      }))
    )
    toast.success(`Category "${updatedCategory.name}" updated!`)
  }

  const handleDeleteCategory = (serviceId: string, categoryId: string) => {
    const service = services.find((s) => s.id === serviceId)
    if (!service) return
    if (service.category.length <= 1) {
      toast.error("Cannot delete the last category")
      return
    }

    setServices(
      services.map((s) =>
        s.id === serviceId
          ? { ...s, category: s.category.filter((c) => c.id !== categoryId) }
          : s
      )
    )
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(
        service.category.find((c) => c.id !== categoryId)?.id || null
      )
    }
    toast.success("Category removed")
  }

  // Package handlers
  const handleAddPackage = (
    categoryId: string,
    pkg: Omit<PackageTier, "id">
  ) => {
    const newPackage: PackageTier = {
      ...pkg,
      id: `pkg_${Date.now()}`,
    }

    setServices(
      services.map((s) => ({
        ...s,
        category: s.category.map((c) =>
          c.id === categoryId
            ? { ...c, packages: [...c.packages, newPackage] }
            : c
        ),
      }))
    )
    setSelectedPackageId(newPackage.id)
    setIsDrawerOpen(true)
    toast.success(`Package "${pkg.name}" added!`)
  }

  const handleEditPackage = (
    id: string,
    updatedPackage: Omit<PackageTier, "id">
  ) => {
    setServices(
      services.map((s) => ({
        ...s,
        category: s.category.map((c) => ({
          ...c,
          packages: c.packages.map((p) =>
            p.id === id ? { ...p, ...updatedPackage } : p
          ),
        })),
      }))
    )
    toast.success(`Package "${updatedPackage.name}" updated!`)
  }

  const handleDeletePackage = (categoryId: string, packageId: string) => {
    const category = services
      .flatMap((s) => s.category)
      .find((c) => c.id === categoryId)
    if (!category) return
    if (category.packages.length <= 1) {
      toast.error("Cannot delete the last package")
      return
    }

    setServices(
      services.map((s) => ({
        ...s,
        category: s.category.map((c) =>
          c.id === categoryId
            ? { ...c, packages: c.packages.filter((p) => p.id !== packageId) }
            : c
        ),
      }))
    )
    if (selectedPackageId === packageId) {
      setSelectedPackageId(
        category.packages.find((p) => p.id !== packageId)?.id || null
      )
    }
    toast.success("Package removed")
  }

  // Filter services
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Services</h1>
              <p className="text-sm text-muted-foreground">
                Manage your service catalog
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Services */}
          <ServicesSidebar
            services={services}
            selectedId={selectedServiceId}
            onSelect={setSelectedServiceId}
            onDelete={handleDeleteService}
            onAdd={handleAddService}
          />

          {/* Middle Column - Categories */}
          <CategoriesPanel
            service={selectedService}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            onAddCategory={() => setShowAddCategory(true)}
            onEditCategory={handleEditCategory}
            onDeleteCategory={(id) =>
              selectedServiceId && handleDeleteCategory(selectedServiceId, id)
            }
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Right Column - Packages */}
          <PackagesPanel
            category={selectedCategory}
            selectedPackageId={selectedPackageId}
            onSelectPackage={(id) => {
              setSelectedPackageId(id)
              setIsDrawerOpen(true)
            }}
            onAddPackage={() => setShowAddPackage(true)}
            onEditPackage={handleEditPackage}
            onDeletePackage={(id) =>
              selectedCategoryId && handleDeletePackage(selectedCategoryId, id)
            }
          />
        </div>
      </div>

      {/* Package Drawer */}
      <PackageDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        package={selectedPackage}
        onEdit={() => {
          setIsDrawerOpen(false)
          // Open edit dialog
        }}
        onDelete={() => {
          if (selectedCategoryId && selectedPackageId) {
            handleDeletePackage(selectedCategoryId, selectedPackageId)
            setIsDrawerOpen(false)
          }
        }}
      />
      <AddCategoryDialog
        open={showAddCategory}
        onOpenChange={setShowAddCategory}
        onAddCategory={handleAddCategory}
        serviceId={selectedServiceId || ""}
      />

      <AddPackageDialog
        open={showAddPackage}
        onOpenChange={setShowAddPackage}
        onAddPackage={handleAddPackage}
        categoryId={selectedCategoryId || ""}
      />
    </div>
  )
}
