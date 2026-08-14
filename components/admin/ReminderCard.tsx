"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const activities = [
  {
    id: 1,
    title: "New Booking",
    description: "John Doe booked Wedding Package",
    time: "2 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "Booking Confirmed",
    description: "Mary confirmed Graduation Shoot",
    time: "18 mins ago",
    unread: true,
  },
  {
    id: 3,
    title: "Upcoming Booking",
    description: "Corporate Event starts in 1 hour",
    time: "Today",
    unread: false,
  },
  {
    id: 4,
    title: "Payment Received",
    description: "ABC Ltd paid $350",
    time: "Today",
    unread: false,
  },
];

export default function ReminderCard() {
  return (
    <div className="w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-semibold">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">
            Latest updates from your business
          </p>
        </div>

        <Bell className="h-5 w-5 text-primary" />
      </div>

      <Separator />

      {/* Activity List */}
      <div className="max-h-80 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={activity.id}>
            <button
              className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50"
            >
              <div
                className={`mt-2 h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                  activity.unread
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {activity.title}
                </p>

                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </button>

            {index !== activities.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
}
