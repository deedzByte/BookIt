"use client";

import { useState, KeyboardEvent } from "react";
import {
    ArrowRightIcon,
  Building2,
  CheckCircle2,
  Circle,
  Globe,
  Mail,
  Phone,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import CategorySearch from "./CategorySearch";

import { Switch } from "../ui/switch";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";

interface BusinessInfoProps {
  businessLogo: string;
  businessCover: string;

  businessName: string;
  category: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  website: string;
  description: string;
  tags: string[];

  handleInputChange: (
    field: string,
    value: string | string[]
  ) => void;
}

const countryCodes = [
  { code: "+263", country: "Zimbabwe" },
  { code: "+27", country: "South Africa" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "United Kingdom" },
  { code: "+254", country: "Kenya" },
];

export default function BusinessInfo({
  businessName,
  category,
  email,
  phoneCountryCode,
  phoneNumber,
  website,
  description,
  tags,
  handleInputChange,
}: BusinessInfoProps) {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const value = tagInput.trim();

    if (!value) return;

    if (tags.includes(value)) {
      setTagInput("");
      return;
    }

    if (tags.length >= 10) return;

    handleInputChange("tags", [...tags, value]);
    setTagInput("");
  };
  const [isBusinessActive, setIsBusinessActive] = useState(true);
  const removeTag = (tag: string) => {
    handleInputChange(
      "tags",
      tags.filter((t) => t !== tag)
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-lg font-semibold">
              Business Information
            </h3>

            <p className="text-sm text-muted-foreground">
              This information is shown to customers.
            </p>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">

        {/* Business Name */}
        <div className="space-y-2">
          <Label>Business Name</Label>
          <Input
            value={businessName}
            placeholder="Enter business name"
            onChange={(e) =>
              handleInputChange("businessName", e.target.value)
            }
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <CategorySearch />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label>Email</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              type="email"
              className="pl-9"
              value={email}
              placeholder="Enter email"
              onChange={(e) =>
                handleInputChange("email", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
    
          <Label>Phone Number</Label>
                <ButtonGroup>
      <ButtonGroup>

            <Select
              value={phoneCountryCode}
              onValueChange={(value) => {
                if (value !== null) {
                  handleInputChange("phoneCountryCode", value);
                }
              }}
            >
          <SelectTrigger className="font-mono">{phoneCountryCode}</SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            <SelectGroup>
              {countryCodes.map((item) => (
                <SelectItem key={item.code} value={item.code}>
                  {item.code}{" "}
                  <span className="text-muted-foreground">{item.country}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="0783502651" pattern="[0-9]*" />
      </ButtonGroup>
    </ButtonGroup>
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label>Website</Label>

          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              className="pl-9"
              value={website}
              placeholder="https://..."
              onChange={(e) =>
                handleInputChange("website", e.target.value)
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:col-span-3 space-y-2">
                  <div>
                 <Label>Description</Label>
          <Textarea
            rows={2}
            className="resize-none mt-2"
            value={description}
            placeholder="Describe your business..."
            onChange={(e) =>
              handleInputChange("description", e.target.value)
            }
          />     
        </div>
                                  <div>
                  <span className="text-sm font-medium block mb-2">Business Status</span>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50/50 border border-blue-100">
                    <div>
                      <p className="text-sm font-medium flex items-center gap-2">
                        {isBusinessActive ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Active
                          </>
                        ) : (
                          <>
                            <Circle className="h-4 w-4 text-gray-400" />
                            Inactive
                          </>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isBusinessActive
                          ? "Your business is visible to customers"
                          : "Your business is currently hidden from customers"}
                      </p>
                    </div>
                    <Switch
                      checked={isBusinessActive}
                      onCheckedChange={setIsBusinessActive}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                </div>
        <div className="space-y-2">
          <Label className="flex justify-between">
            <span>Tags</span>

            <span className="text-xs text-muted-foreground">
              {tags.length}/10 • Press Enter
            </span>
          </Label>

          <Input
            value={tagInput}
            placeholder="Photography"
            disabled={tags.length >= 10}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">

              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm"
                >
                  {tag}

                  <Button
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}

            </div>
          )}
        </div>
        </div>

      </div>
    </div>
  );
}
