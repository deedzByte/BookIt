"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

type NotificationSettings = {
  bookings: boolean;
  reminders: boolean;
  cancellations: boolean;
  reviews: boolean;
  promotions: boolean;
};

interface NotificationConfig {
  id: keyof NotificationSettings;
  label: string;
  desc: string;
}

const notificationConfigs: NotificationConfig[] = [
  {
    id: "bookings",
    label: "New Bookings",
    desc: "Get notified whenever a customer books your service.",
  },
  {
    id: "reminders",
    label: "Booking Reminders",
    desc: "Receive reminders before upcoming bookings.",
  },
  {
    id: "cancellations",
    label: "Cancellations",
    desc: "Be notified when a customer cancels a booking.",
  },
  {
    id: "reviews",
    label: "New Reviews",
    desc: "Know when customers leave feedback.",
  },
  {
    id: "promotions",
    label: "Promotional Emails",
    desc: "Receive product updates and special offers.",
  },
];

const initialSettings: NotificationSettings = {
  bookings: true,
  reminders: true,
  cancellations: true,
  reviews: false,
  promotions: false,
};

export default function Notifications() {
  const [settings, setSettings] = useState(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(
      JSON.stringify(settings) !== JSON.stringify(initialSettings)
    );
  }, [settings]);

  const toggle = (id: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleSave = async () => {
    console.log(settings);

    // await updateNotificationSettings(settings);
    // toast.success("Notification preferences updated.");

    alert("Notification preferences saved.");
  };

  const handleCancel = () => {
    setSettings(initialSettings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="px-6 pt-6">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-semibold">
              Notifications
            </h2>

            <p className="text-sm text-muted-foreground">
              Choose which notifications you'd like to receive.
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}

      <div className="px-6">
        <div className="rounded-2xl border overflow-hidden">

          {notificationConfigs.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center justify-between px-5 py-5 transition-colors hover:bg-muted/40">

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center">
                    <BellRing className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-medium">
                      {item.label}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <Switch
                  checked={settings[item.id]}
                  onCheckedChange={(checked) =>
                    toggle(item.id, checked)
                  }
                />

              </div>

              {index !== notificationConfigs.length - 1 && (
                <Separator />
              )}
            </div>
          ))}

        </div>
      </div>

      {/* Footer */}

      <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-background px-6 py-4 backdrop-blur">
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