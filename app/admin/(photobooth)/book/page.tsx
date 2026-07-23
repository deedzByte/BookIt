"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toast } from "sonner";

// Mock data for booked dates and times
const BOOKED_SLOTS: Record<string, string[]> = {
  "2026-07-01": ["10:00", "14:00"],
  "2026-07-05": ["09:00", "13:00", "15:00"],
  "2026-07-10": ["11:00", "16:00"],
  "2026-07-15": ["08:30", "12:00"],
  "2026-07-20": ["10:30", "14:30"],
  "2026-07-25": ["09:30", "13:30"],
};

// In-memory store for new bookings
let tempBookings: Record<string, string[]> = {};

const ALL_TIME_SLOTS = [
  "08:30", "09:00", "09:30", "10:00", "10:30", 
  "11:00", "11:30", "12:00", "12:30", "13:00", 
  "13:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30"
];

const DURATION_PRESETS = [
  { id: "4h", label: "4 Hours", hours: 4, minutes: 0 },
  { id: "4h30m", label: "4.5 Hours", hours: 4, minutes: 30 },
  { id: "5h", label: "5 Hours", hours: 5, minutes: 0 },
  { id: "5h30m", label: "5.5 Hours", hours: 5, minutes: 30 },
  { id: "6h", label: "6 Hours", hours: 6, minutes: 0 },
  { id: "6h30m", label: "6.5 Hours", hours: 6, minutes: 30 },
  { id: "7h", label: "7 Hours", hours: 7, minutes: 0 },
  { id: "8h", label: "8 Hours", hours: 8, minutes: 0 },
];

function getAvailableTimeSlots(dateStr: string, durationHours: number, durationMinutes: number): string[] {
  const bookedSlots = [...(BOOKED_SLOTS[dateStr] || []), ...(tempBookings[dateStr] || [])];
  const availableSlots = [];
  const totalDurationMinutes = durationHours * 60 + durationMinutes;
  
  for (let i = 0; i < ALL_TIME_SLOTS.length; i++) {
    const startTime = ALL_TIME_SLOTS[i];
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = startMinutes + totalDurationMinutes;
    
    if (endMinutes > timeToMinutes("16:30")) {
      continue;
    }
    
    let isAvailable = true;
    for (const booked of bookedSlots) {
      const bookedMinutes = timeToMinutes(booked);
      if (bookedMinutes >= startMinutes && bookedMinutes < endMinutes) {
        isAvailable = false;
        break;
      }
    }
    
    if (isAvailable) {
      availableSlots.push(startTime);
    }
  }
  
  return availableSlots;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function formatTimeDisplay(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

function isDateBooked(date: CalendarDate): boolean {
  const dateStr = `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
  const bookedSlots = [...(BOOKED_SLOTS[dateStr] || []), ...(tempBookings[dateStr] || [])];
  return bookedSlots.length >= ALL_TIME_SLOTS.length;
}

function formatDurationDisplay(hours: number, minutes: number): string {
  if (minutes === 0) return `${hours} Hours`;
  return `${hours} Hours ${minutes} Minutes`;
}

function getDurationPrice(hours: number, minutes: number): number {
  const basePrice = 600;
  const baseDuration = 4;
  const totalMinutes = hours * 60 + minutes;
  const baseMinutes = baseDuration * 60;
  const extraMinutes = Math.max(0, totalMinutes - baseMinutes);
  const extraHours = Math.ceil(extraMinutes / 60);
  return basePrice + (extraHours > 0 ? extraHours * 50 : 0);
}

function getDateStr(date: CalendarDate): string {
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

export default function BookingHero() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [durationHours, setDurationHours] = useState<number>(4);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const [selectedPreset, setSelectedPreset] = useState<string>("4h0m");
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Convert Date to CalendarDate for helper functions
  const toCalendarDate = (date: Date): CalendarDate => {
    return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    
    const calendarDate = toCalendarDate(date);
    if (isDateBooked(calendarDate)) {
      toast.error("Date Unavailable", {
        description: "This date is fully booked. Please select another date.",
        duration: 4000,
      });
      return;
    }
    setSelectedDate(date);
    setSelectedTime(null);
    setIsBooked(false);
  };

  const handlePresetChange = (presetId: string) => {
    const preset = DURATION_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSelectedPreset(presetId);
      setDurationHours(preset.hours);
      setDurationMinutes(preset.minutes);
      setSelectedTime(null);
      setIsBooked(false);
    }
  };

  const handleCustomDurationChange = (type: 'hours' | 'minutes', value: number) => {
    if (type === 'hours') {
      setDurationHours(value);
      setSelectedPreset('');
    } else {
      setDurationMinutes(value);
      setSelectedPreset('');
    }
    setSelectedTime(null);
    setIsBooked(false);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsBooking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const calendarDate = toCalendarDate(selectedDate);
    const dateStr = getDateStr(calendarDate);
    const endTime = minutesToTime(
      timeToMinutes(selectedTime) + (durationHours * 60 + durationMinutes)
    );
    
    // Store the booking
    if (!tempBookings[dateStr]) {
      tempBookings[dateStr] = [];
    }
    tempBookings[dateStr].push(selectedTime);
    
    setIsBooked(true);
    setIsBooking(false);
    
    // Show success toast with Sonner
    toast.success("Booking Confirmed! 🎉", {
      description: `Your booking for ${selectedDate.toLocaleDateString()} at ${formatTimeDisplay(selectedTime)} has been confirmed.`,
      duration: 5000,
      action: {
        label: "View Details",
        onClick: () => router.push("/bookings"),
      },
    });
    
    // Reset selection after booking
    setTimeout(() => {
      setSelectedTime(null);
    }, 1000);
  };

  const calendarDate = selectedDate ? toCalendarDate(selectedDate) : null;
  const availableSlots = calendarDate 
    ? getAvailableTimeSlots(
        getDateStr(calendarDate),
        durationHours,
        durationMinutes
      )
    : [];

  const totalPrice = getDurationPrice(durationHours, durationMinutes);
  const isFormValid = selectedDate && selectedTime && !isBooked;

  // Disable dates that are fully booked
  const isDateDisabled = (date: Date) => {
    const calendarDate = toCalendarDate(date);
    return isDateBooked(calendarDate);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-500 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            <h1 className="text-center text-2xl font-bold text-gray-500">Book an Appointment</h1>
            <Card className="rounded-2xl shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateChange}
                      disabled={(date) => date < new Date() || isDateDisabled(date)}
                      className="rounded-md border w-full"
                    />
                  </div>

                  <Separator orientation="vertical" className="hidden lg:block" />
                  <Separator className="lg:hidden" />

                  {/* Right side of calendar surface */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">How long is your booking</Label>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-2 items-center">
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              min={1}
                              max={12}
                              value={durationHours}
                              onChange={(e) => handleCustomDurationChange('hours', parseInt(e.target.value) || 0)}
                              className="w-16"
                            />
                            <span className="text-xs text-gray-500">hrs</span>
                            <Input
                              type="number"
                              min={0}
                              max={59}
                              step={15}
                              value={durationMinutes}
                              onChange={(e) => handleCustomDurationChange('minutes', parseInt(e.target.value) || 0)}
                              className="w-16"
                            />
                            <span className="text-xs text-gray-500">mins</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    {selectedDate && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Available Time Slots</Label>
                        <div className="mt-2 grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                          {availableSlots.length > 0 ? (
                            availableSlots.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                size="sm"
                                disabled={isBooked}
                                onClick={() => setSelectedTime(time)}
                                className={selectedTime === time ? "text-white" : ""}
                              >
                                {formatTimeDisplay(time)}
                                {selectedTime === time && isBooked && (
                                  <CheckCircle2 className="w-3 h-3 ml-1 text-green-500" />
                                )}
                              </Button>
                            ))
                          ) : (
                            <div className="col-span-3 text-center py-4 text-sm text-gray-500">
                              No available slots for {formatDurationDisplay(durationHours, durationMinutes)} on this date
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Summary Card */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24 shadow-xl border-0">
              <CardHeader className="rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-gray-500">Standard Package</CardTitle>
                <div className="text-sm pt-3">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-gray-500 hover:text-gray-700">
                          Photo Booth
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-blue-300" />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/providers/neosoft-solutions/open-air-booth" className="text-gray-500 hover:text-gray-700">
                          Open Air Booth
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-blue-300" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-gray-700">Standard Package</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="space-y-1">
                <div>
                  <h3 className="font-semibold text-gray-700">Package Includes</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      Ten high-resolution photos delivered digitally
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      All photos will be touched up and edited
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      Full print rights
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">
                      {selectedDate 
                        ? selectedDate.toLocaleDateString('en-US', { 
                            month: '2-digit', 
                            day: '2-digit', 
                            year: 'numeric' 
                          })
                        : "Not selected"
                      }
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Start Time</span>
                    <span className="font-medium">
                      {selectedTime ? formatTimeDisplay(selectedTime) : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{formatDurationDisplay(durationHours, durationMinutes)}</span>
                  </div>
                  {selectedTime && (
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">End Time</span>
                      <span className="font-medium text-blue-600">
                        {formatTimeDisplay(minutesToTime(
                          timeToMinutes(selectedTime) + (durationHours * 60 + durationMinutes)
                        ))}
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">Total</span>
                  <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                </div>

                <div className="space-y-2">
                  <Button
                    disabled={!isMounted || !isFormValid || isBooking}
                    onClick={() => router.push("/admin/add-ons")}
                    className="w-full font-semibold hover:bg-blue-700 transition-all duration-200 rounded-xl py-6"
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Proceed"
                    )}
                  </Button>
                  
                  {isBooked && (
                    <Button
                      variant="outline"
                      className="w-full text-sm"
                      onClick={() => {
                        setIsBooked(false);
                        setSelectedTime(null);
                        setSelectedDate(undefined);
                      }}
                    >
                      Book Another
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}