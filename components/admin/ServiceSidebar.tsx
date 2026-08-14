// components/ServicesSidebar.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  FolderOpen,
  Package,
  Layers,
  X,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { AddServiceDialog } from "./AddServiceDialog"

interface Service {
  id: string
  name: string
  isActive: boolean
  category: Array<{ packages: unknown[] }>
}

interface ServicesSidebarProps {
  services: Service[]
  selectedId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onAdd: (service: {
    name: string
    isActive: boolean
    category: unknown[]
  }) => void
}

export function ServicesSidebar({
  services,
  selectedId,
  onSelect,
  onDelete,
  onAdd,
}: ServicesSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddService, setShowAddService] = useState(false)
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  )

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <section className="ml-6 flex h-full min-h-0 flex-col rounded-2xl border border-border/80 bg-card p-3 shadow-sm sm:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Layers className="size-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Catalog
            </p>
            <h2 className="truncate text-sm font-semibold text-foreground">
              Services{" "}
              <span className="text-[12px] text-cyan-700">
                ({services.length})
              </span>
            </h2>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-1 size-8 rounded-lg text-primary hover:bg-primary/10 hover:text-primary"
          onClick={() => setShowAddService(true)}
          aria-label="Add category"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Search & Stats */}
      <div className="mb-3 space-y-3">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 rounded-xl border-border/60 bg-muted/30 pr-9 pl-9 focus-visible:ring-primary/20"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between px-0.5 text-[11px] text-muted-foreground">
          {searchQuery && (
            <span className="text-primary">
              {filteredServices.length} results
            </span>
          )}
        </div>
      </div>

      {/* Services List */}
      <ScrollArea className="flex-1 pr-1">
        <div className="space-y-2">
          {filteredServices.length === 0 ? (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-5 text-center">
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-background text-muted-foreground shadow-sm ring-1 ring-border">
                <FolderOpen className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium">
                {searchQuery ? "No services found" : "No services yet"}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {searchQuery
                  ? `No services match "${searchQuery}"`
                  : "Add your first service to get started"}
              </p>
            </div>
          ) : (
            filteredServices.map((service, index) => {
              const isSelected = selectedId === service.id
              const categoryCount = service.category.length
              const packageCount = service.category.reduce(
                (sum, c) => sum + c.packages.length,
                0
              )

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <div
                    className={cn(
                      "group cursor-pointer rounded-xl border p-3 transition-all duration-200",
                      isSelected
                        ? "border-primary/25 bg-primary/[0.07] shadow-sm ring-1 ring-primary/10"
                        : "border-transparent bg-muted/25 hover:border-border hover:bg-background hover:shadow-sm"
                    )}
                    onClick={() => onSelect(service.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "size-2 shrink-0 rounded-full ring-4",
                              service.isActive
                                ? "bg-emerald-500 ring-emerald-500/10"
                                : "bg-muted-foreground/40 ring-muted"
                            )}
                          />
                          <span
                            className={cn(
                              "truncate text-sm font-semibold",
                              isSelected
                                ? "text-foreground"
                                : "text-foreground/85"
                            )}
                          >
                            {service.name}
                          </span>
                          {service.isActive ? (
                            <Badge className="h-5 shrink-0 rounded-full bg-emerald-500/10 px-1.5 text-[10px] font-medium text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400">
                              Active
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="h-5 shrink-0 rounded-full px-1.5 text-[10px] font-medium"
                            >
                              Inactive
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Layers className="h-3 w-3" aria-hidden="true" />
                            {categoryCount}{" "}
                            {categoryCount === 1 ? "category" : "categories"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="h-3 w-3" aria-hidden="true" />
                            {packageCount}{" "}
                            {packageCount === 1 ? "package" : "packages"}
                          </span>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Actions for ${service.name}`}
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-40 rounded-xl"
                        >
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => onDelete(service.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </ScrollArea>
      <AddServiceDialog
        open={showAddService}
        onOpenChange={setShowAddService}
        onAddService={onAdd}
      />
    </section>
  )
}
