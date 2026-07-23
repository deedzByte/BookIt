"use client";

import { Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface NotificationConfig {
  id: string;
  label: string;
  desc: string;
}

interface NotificationsProps {
  notificationSettings: Record<string, boolean>;
  onNotificationChange?: (id: string, checked: boolean) => void;
}

const notificationConfigs: NotificationConfig[] = [
  {
    id: "bookings",
    label: "New Bookings",
    desc: "Get notified when a customer books your service.",
  },
  {
    id: "reminders",
    label: "Booking Reminders",
    desc: "Receive reminders for upcoming bookings.",
  },
  {
    id: "cancellations",
    label: "Cancellations",
    desc: "Get notified when a booking is cancelled.",
  },
  {
    id: "reviews",
    label: "New Reviews",
    desc: "Receive notifications when customers leave reviews.",
  },
  {
    id: "promotions",
    label: "Promotional Updates",
    desc: "Receive promotional emails and offers.",
  },
];

export default function Notifications() {

    const [notificationStates, setNotificationStates] = useState<Record<string, boolean>>({
      bookings: true,
      reminders: true,
      cancellations: true,
      reviews: false,
      promotions: false,
    });
    const handleToggleNotification = (id: string, checked: boolean) => {
    setNotificationStates(prev => ({ ...prev, [id]: checked }));
  };
  return (
            <div>
              <div className="flex items-start gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Notifications</h3>
                  <p className="text-sm text-muted-foreground">Manage your notification preferences.</p>
                </div>
              </div>

              <div className="space-y-2">
                {notificationConfigs.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl border bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notificationStates[item.id] || false}
                      onCheckedChange={(checked) => handleToggleNotification(item.id, checked)}
                      className="data-[state=checked]:bg-orange-500 ml-2"
                    />
                  </div>
                ))}
              </div>
            </div>
  );
}