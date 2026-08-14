"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Camera,
  X,
  Loader2,
  Pencil,
  Trash2,
  Upload,
  ImageIcon,
  RefreshCw,
  Save,
} from "lucide-react"
import { toast } from "sonner"
import React from "react"
import WorkingHours from "@/components/admin/WorkingHours"
import Payments from "@/components/admin/Payments"
import Address from "@/components/admin/Address"
import BusinessInfo from "@/components/admin/BusinessInfo"
import Notifications from "@/components/admin/Notification"

export interface ProfileTabProps {
  businessName?: string
  businessLogo?: string
  businessCover?: string
  description?: string
  category?: string
  email?: string
  phone?: string
  phoneCountryCode?: string
  website?: string
  languages?: string[]
  tags?: string[]
  country?: string
  state?: string
  city?: string
  street?: string
  postalCode?: string
  services?: Array<{
    id: string
    name: string
    category: string
    isActive: boolean
  }>
  paymentMethods?: string[]
  isBusinessActive?: boolean
  notificationSettings?: { [key: string]: boolean }
  workHours?: {
    monday?: { open: string; close: string; isClosed: boolean }
    tuesday?: { open: string; close: string; isClosed: boolean }
    wednesday?: { open: string; close: string; isClosed: boolean }
    thursday?: { open: string; close: string; isClosed: boolean }
    friday?: { open: string; close: string; isClosed: boolean }
    saturday?: { open: string; close: string; isClosed: boolean }
    sunday?: { open: string; close: string; isClosed: boolean }
  }
  timezone?: string
  onInputChange?: (field: string, value: unknown) => void
  onAddService?: (service: {
    name: string
    category: string
    isActive: boolean
  }) => void
  onRemoveService?: (serviceId: string) => void
  onAddCategory?: (category: { id: string; label: string }) => void
  onTogglePaymentMethod?: (method: string) => void
  onToggleBusinessStatus?: () => void
  onNotificationChange?: (id: string, checked: boolean) => void
  onWorkHoursChange?: (day: string, field: string, value: unknown) => void
}

export default function ProfileTab({
  businessName = "",
  businessLogo = "/red.jpg",
  businessCover = "/photobooth.webp",
  onInputChange,
}: ProfileTabProps) {
  const [isUploadingCover, setIsUploadingCover] = useState(false)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    businessLogo: "",
    businessCover: "",
    businessName: "",
    category: "",
    email: "",
    phoneCountryCode: "+263",
    phoneNumber: "",
    website: "",
    description: "",
    tags: [],
  })

  const handleFormInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    onInputChange?.(field, value)
  }

  const getInitials = () => {
    if (!businessName || businessName.length === 0) return "B"
    return businessName.charAt(0).toUpperCase()
  }

  const handleInputChange = (field: string, value: unknown) => {
    if (onInputChange) onInputChange(field, value)
  }
  const handleSaveAll = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success("All settings saved successfully!")
    }, 1000)
  }

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    setIsUploadingCover(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      handleInputChange("businessCover", event.target?.result as string)
      setIsUploadingCover(false)
      toast.success("Cover image updated successfully!")
    }
    reader.onerror = () => {
      setIsUploadingCover(false)
      toast.error("Failed to upload image")
    }
    reader.readAsDataURL(file)
  }
  const handleDiscard = () => {
    toast.info("Changes discarded")
  }

  const handleRemoveCover = () => {
    handleInputChange("businessCover", "")
    if (coverInputRef.current) coverInputRef.current.value = ""
    toast.success("Cover image removed")
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB")
      return
    }

    setIsUploadingLogo(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      handleInputChange("businessLogo", event.target?.result as string)
      setIsUploadingLogo(false)
      toast.success("Logo updated successfully!")
    }
    reader.onerror = () => {
      setIsUploadingLogo(false)
      toast.error("Failed to upload image")
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    handleInputChange("businessLogo", "")
    if (logoInputRef.current) logoInputRef.current.value = ""
    toast.success("Logo removed")
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Cover Image & Avatar - Styled Section */}
      <div className="space-y-4">
        <div className="relative h-52 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 sm:h-56 md:h-64 lg:h-72">
          {businessCover ? (
            <div className="group relative h-full w-full">
              <img
                src={businessCover}
                alt="Business Cover"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/90 shadow-lg hover:bg-white"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={isUploadingCover}
                >
                  {isUploadingCover ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Pencil className="mr-2 h-4 w-4" />
                  )}
                  Change Cover
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="shadow-lg"
                  onClick={handleRemoveCover}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center text-white">
              <div className="mb-3 rounded-full bg-white/20 p-4 backdrop-blur-sm">
                <ImageIcon className="h-12 w-12" />
              </div>
              <p className="text-lg font-medium text-white/90">
                Upload Cover Image
              </p>
              <p className="text-sm text-white/70">
                Click the button below to add a cover image
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 border-white/30 bg-white/20 text-white hover:bg-white/30"
                onClick={() => coverInputRef.current?.click()}
                disabled={isUploadingCover}
              >
                {isUploadingCover ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Upload Cover
              </Button>
            </div>
          )}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverUpload}
          />
        </div>

        {/* Avatar */}
        <div className="relative z-10 -mt-12 ml-4 flex items-end gap-4">
          <div className="group relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
              <AvatarImage src={businessLogo} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-semibold text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -right-1 -bottom-1 flex gap-1">
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50"
                onClick={() => logoInputRef.current?.click()}
                disabled={isUploadingLogo}
              >
                {isUploadingLogo ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Camera className="h-3 w-3" />
                )}
              </Button>
              {businessLogo && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-7 w-7 rounded-full shadow-md"
                  onClick={handleRemoveLogo}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoUpload}
        />
      </div>

      {/* Business Information Section - 3 Column Grid */}
      <BusinessInfo
        businessLogo={formData.businessLogo}
        businessCover={formData.businessCover}
        businessName={formData.businessName}
        category={formData.category}
        email={formData.email}
        phoneCountryCode={formData.phoneCountryCode}
        phoneNumber={formData.phoneNumber}
        website={formData.website}
        description={formData.description}
        tags={formData.tags}
        handleInputChange={handleFormInputChange}
      />
      <Separator />

      {/* Address Section - 3 Column Grid */}
      <Address />

      <Separator />
      <WorkingHours />
      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Save className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Save all your settings changes
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleDiscard}
            className="rounded-xl"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="min-w-[120px] rounded-xl"
          >
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Saving...
              </>
            ) : (
              "Save All Settings"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
