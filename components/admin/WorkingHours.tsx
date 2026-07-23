"use client";

import { useState } from "react";
import { Clock3, Copy, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Day = (typeof DAYS)[number];

interface WorkingHours {
  enabled: boolean;
  open: string;
  close: string;
}

const DEFAULT_HOURS: Record<Day, WorkingHours> = {
  Monday: {
    enabled: true,
    open: "08:00",
    close: "17:00",
  },
  Tuesday: {
    enabled: true,
    open: "08:00",
    close: "17:00",
  },
  Wednesday: {
    enabled: true,
    open: "08:00",
    close: "17:00",
  },
  Thursday: {
    enabled: true,
    open: "08:00",
    close: "17:00",
  },
  Friday: {
    enabled: true,
    open: "08:00",
    close: "17:00",
  },
  Saturday: {
    enabled: false,
    open: "08:00",
    close: "17:00",
  },
  Sunday: {
    enabled: false,
    open: "08:00",
    close: "17:00",
  },
};

export default function BusinessHours() {
  const [hours, setHours] = useState(DEFAULT_HOURS);

  const update = (
    day: Day,
    field: keyof WorkingHours,
    value: string | boolean
  ) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const copyMonday = () => {
    const monday = hours.Monday;

    setHours((prev) => ({
      ...prev,
      Tuesday: { ...monday },
      Wednesday: { ...monday },
      Thursday: { ...monday },
      Friday: { ...monday },
    }));
  };

  return (
    <div className="">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div className="flex items-start gap-4">
          <div>
            <h2 className="text-lg font-semibold">
              Business Hours
            </h2>

            <p className="mt-1 text-muted-foreground">
              Set when customers can schedule appointments.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4 mt-2">

        {DAYS.map((day) => {
          const item = hours[day];

          return (
            <Card
              key={day}
              className="rounded-2xl border bg-card px-6 py-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">

                  <Switch
                    checked={item.enabled}
                    onCheckedChange={(checked) =>
                      update(day, "enabled", checked)
                    }
                  />

                  <div>

                    <h3 className="font-semibold text-sm">
                      {day}
                    </h3>
                  </div>

                </div>

                {/* Right */}

                {item.enabled ? (

                  <div className="flex flex-row gap-4 md:flex-row md:items-center">

                    <Input
                      type="time"
                      value={item.open}
                      onChange={(e) =>
                        update(day, "open", e.target.value)
                      }
                      className="w-[140px] rounded-xl"
                    />

                    <ArrowRight className="hidden text-muted-foreground md:block" />

                    <Input
                      type="time"
                      value={item.close}
                      onChange={(e) =>
                        update(day, "close", e.target.value)
                      }
                      className="w-[140px] rounded-xl"
                    />

                  </div>

                ) : (

                  <p className="text-sm text-muted-foreground">
                    Customers cannot book on this day.
                  </p>

                )}

              </div>

            </Card>
          );
        })}

      </div>

    </div>
  );
}