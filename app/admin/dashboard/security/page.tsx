"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SecuritySettings() {
  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
  };

  const [form, setForm] = useState(initialState);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(
      JSON.stringify(form) !== JSON.stringify(initialState)
    );
  }, [form]);

  const handleSave = () => {
    if (
      form.newPassword &&
      form.newPassword !== form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    console.log(form);

    // await updateSecuritySettings(form);

    alert("Security settings updated.");
  };

  const handleCancel = () => {
    setForm(initialState);
  };

  return (
    <div className="space-y-8">

      {/* Header */}


        <div className="flex items-center gap-3">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">
              Security
            </h2>

            <p className="text-sm text-muted-foreground">
              Manage your password and account security.
            </p>
          </div>
        </div>

      <div className="pr-6 pl-6">

        <div className="flex items-center gap-3 mb-6">
          <div>
            <h3 className="font-semibold">
              Change Password
            </h3>

            <p className="text-sm text-muted-foreground">
              Use a strong password to keep your account secure.
            </p>
          </div>
        </div>

        <div className="space-y-5">

          <PasswordField
            label="Current Password"
            value={form.currentPassword}
            visible={showCurrent}
            setVisible={setShowCurrent}
            onChange={(value) =>
              setForm({
                ...form,
                currentPassword: value,
              })
            }
          />

          <PasswordField
            label="New Password"
            value={form.newPassword}
            visible={showNew}
            setVisible={setShowNew}
            onChange={(value) =>
              setForm({
                ...form,
                newPassword: value,
              })
            }
          />

          <PasswordField
            label="Confirm Password"
            value={form.confirmPassword}
            visible={showConfirm}
            setVisible={setShowConfirm}
            onChange={(value) =>
              setForm({
                ...form,
                confirmPassword: value,
              })
            }
          />

        </div>

      </div>

      {/* Two Factor */}

      <div className="p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-start gap-4">
            <div>

              <h3 className="font-semibold">
                Two-Factor Authentication
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Require an additional verification code when signing in.
              </p>

            </div>

          </div>

          <Switch
            checked={form.twoFactor}
            onCheckedChange={(checked) =>
              setForm({
                ...form,
                twoFactor: checked,
              })
            }
          />

        </div>

        <Separator className="my-6" />

        <div className="flex items-center justify-between">

          <div>

            <p className="font-medium">
              Status
            </p>

            <p className="text-sm text-muted-foreground">
              {form.twoFactor
                ? "Two-factor authentication is enabled."
                : "Two-factor authentication is disabled."}
            </p>

          </div>

          <div className="flex items-center gap-2">

            <div
              className={`h-2.5 w-2.5 rounded-full ${
                form.twoFactor
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />

            <span className="text-sm font-medium">
              {form.twoFactor
                ? "Enabled"
                : "Disabled"}
            </span>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="sticky bottom-6 z-10 flex justify-end gap-3 bg-background/95 p-4 backdrop-blur">

        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={!hasChanges}
          className="rounded-xl"
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="rounded-xl px-8"
        >
          Save Changes
        </Button>

      </div>

    </div>
  );
}

interface PasswordFieldProps {
  label: string;
  value: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  onChange: (value: string) => void;
}

function PasswordField({
  label,
  value,
  visible,
  setVisible,
  onChange,
}: PasswordFieldProps) {
  return (
    <div className="space-y-2">

      <Label>{label}</Label>

      <div className="relative">

        <Input
          type={visible ? "text" : "password"}
          value={value}
          placeholder={label}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-xl pr-10"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 h-8 w-8 rounded-lg"
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>

      </div>

    </div>
  );
}