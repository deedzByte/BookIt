"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Camera, X, Loader2, Pencil, Trash2, Upload, ImageIcon, RefreshCw, Save } from "lucide-react";
import { toast } from "sonner";
import React from "react";
import WorkingHours from "@/components/admin/WorkingHours";
import Payments from "@/components/admin/Payments";
import Address from "@/components/admin/Address";
import BusinessInfo from "@/components/admin/BusinessInfo";
import Notifications from "@/components/admin/Notification";

export interface ProfileTabProps {
  businessName?: string;
  businessLogo?: string;
  businessCover?: string;
  description?: string;
  category?: string;
  email?: string;
  phone?: string;
  phoneCountryCode?: string;
  website?: string;
  languages?: string[];
  tags?: string[];
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  services?: Array<{
    id: string;
    name: string;
    category: string;
    isActive: boolean;
  }>;
  paymentMethods?: string[];
  isBusinessActive?: boolean;
  notificationSettings?: { [key: string]: boolean };
  workHours?: {
    monday?: { open: string; close: string; isClosed: boolean };
    tuesday?: { open: string; close: string; isClosed: boolean };
    wednesday?: { open: string; close: string; isClosed: boolean };
    thursday?: { open: string; close: string; isClosed: boolean };
    friday?: { open: string; close: string; isClosed: boolean };
    saturday?: { open: string; close: string; isClosed: boolean };
    sunday?: { open: string; close: string; isClosed: boolean };
  };
  timezone?: string;
  onInputChange?: (field: string, value: any) => void;
  onAddService?: (service: { name: string; category: string; isActive: boolean }) => void;
  onRemoveService?: (serviceId: string) => void;
  onAddCategory?: (category: { id: string; label: string }) => void;
  onTogglePaymentMethod?: (method: string) => void;
  onToggleBusinessStatus?: () => void;
  onNotificationChange?: (id: string, checked: boolean) => void;
  onWorkHoursChange?: (day: string, field: string, value: any) => void;
}


export default function ProfileTab({ 
  businessName = "", 
  businessLogo = "/red.jpg", 
  businessCover = "/photobooth.webp", 
  onInputChange,
}: ProfileTabProps) {
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
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
  });

const handleFormInputChange = (
  field: string,
  value: string | string[]
) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));

  onInputChange?.(field, value);
};

  const getInitials = () => {
    if (!businessName || businessName.length === 0) return "B";
    return businessName.charAt(0).toUpperCase();
  };

  const handleInputChange = (field: string, value: any) => {
    if (onInputChange) onInputChange(field, value);
  };
  const handleSaveAll = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("All settings saved successfully!");
    }, 1000);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error("Please upload an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image size should be less than 5MB"); return; }

    setIsUploadingCover(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      handleInputChange("businessCover", event.target?.result as string);
      setIsUploadingCover(false);
      toast.success("Cover image updated successfully!");
    };
    reader.onerror = () => { setIsUploadingCover(false); toast.error("Failed to upload image"); };
    reader.readAsDataURL(file);
  };
  const handleDiscard = () => {
    toast.info("Changes discarded");
  };

  const handleRemoveCover = () => {
    handleInputChange("businessCover", "");
    if (coverInputRef.current) coverInputRef.current.value = "";
    toast.success("Cover image removed");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error("Please upload an image file"); return; }
    if (file.size > 2 * 1024 * 1024) { toast.error("Image size should be less than 2MB"); return; }

    setIsUploadingLogo(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      handleInputChange("businessLogo", event.target?.result as string);
      setIsUploadingLogo(false);
      toast.success("Logo updated successfully!");
    };
    reader.onerror = () => { setIsUploadingLogo(false); toast.error("Failed to upload image"); };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    handleInputChange("businessLogo", "");
    if (logoInputRef.current) logoInputRef.current.value = "";
    toast.success("Logo removed");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Cover Image & Avatar - Styled Section */}
      <div className="space-y-4">
        <div className="relative h-52 sm:h-56 md:h-64 lg:h-72 rounded-xl overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          {businessCover ? (
            <div className="relative w-full h-full group">
              <img src={businessCover} alt="Business Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white shadow-lg" onClick={() => coverInputRef.current?.click()} disabled={isUploadingCover}>
                  {isUploadingCover ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Pencil className="h-4 w-4 mr-2" />}
                  Change Cover
                </Button>
                <Button variant="destructive" size="sm" className="shadow-lg" onClick={handleRemoveCover}>
                  <Trash2 className="h-4 w-4 mr-2" /> Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center text-white">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-3"><ImageIcon className="h-12 w-12" /></div>
              <p className="text-lg font-medium text-white/90">Upload Cover Image</p>
              <p className="text-sm text-white/70">Click the button below to add a cover image</p>
              <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={() => coverInputRef.current?.click()} disabled={isUploadingCover}>
                {isUploadingCover ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                Upload Cover
              </Button>
            </div>
          )}
          <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
        </div>

        {/* Avatar */}
        <div className="flex items-end gap-4 -mt-12 ml-4 relative z-10">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
              <AvatarImage src={businessLogo} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 flex gap-1">
              <Button variant="secondary" size="icon" className="h-7 w-7 rounded-full bg-white shadow-md hover:bg-gray-50 border border-gray-200" onClick={() => logoInputRef.current?.click()} disabled={isUploadingLogo}>
                {isUploadingLogo ? <Loader2 className="h-3 w-3 animate-spin" /> : <Camera className="h-3 w-3" />}
              </Button>
              {businessLogo && (
                <Button variant="destructive" size="icon" className="h-7 w-7 rounded-full shadow-md" onClick={handleRemoveLogo}>
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
        <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
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
<Address/>

      <Separator />
      <WorkingHours/>
      <Separator />

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
    </div>
  );
}