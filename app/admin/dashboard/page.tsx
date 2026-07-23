"use client";

import { useState, useEffect } from "react";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  CameraIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  ArrowRightIcon,
  MoreHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  SparklesIcon,
  StarIcon,
  BuildingIcon,
  PlusIcon,
} from "lucide-react";
import { format, isToday, isTomorrow, differenceInDays, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ============================================================
// TYPES
// ============================================================
interface Booking {
  id: string;
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  boothType: string;
  package: string;
  eventDate: string;
  eventTime: string;
  duration: number;
  price: number;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  paymentStatus: "paid" | "deposit" | "pending" | "failed";
  location: string;
  guests: number;
  staffAssigned?: string;
  avatar?: string;
}

interface RevenueData {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  growth: number;
}

interface ActivityItem {
  id: string;
  type: "booking" | "payment" | "cancellation" | "reminder";
  message: string;
  timestamp: string;
  user?: string;
}

// ============================================================
// MOCK DATA
// ============================================================
const mockBookings: Booking[] = [
  {
    id: "1",
    bookingNumber: "PB-2024-001",
    customerName: "Emma Thompson",
    customerEmail: "emma@example.com",
    customerPhone: "+1 (555) 123-4567",
    eventType: "Wedding",
    boothType: "Open Air Booth",
    package: "Standard Package",
    eventDate: new Date().toISOString(),
    eventTime: "2:00 PM",
    duration: 4,
    price: 1200,
    status: "confirmed",
    paymentStatus: "paid",
    location: "Grand Ballroom, Downtown",
    guests: 120,
    staffAssigned: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    bookingNumber: "PB-2024-002",
    customerName: "James Rodriguez",
    customerEmail: "james@example.com",
    customerPhone: "+1 (555) 234-5678",
    eventType: "Corporate",
    boothType: "360 Photo Booth",
    package: "Gold Package",
    eventDate: new Date(Date.now() + 86400000).toISOString(),
    eventTime: "10:00 AM",
    duration: 3,
    price: 850,
    status: "pending",
    paymentStatus: "deposit",
    location: "Conference Center, Business District",
    guests: 45,
    staffAssigned: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    bookingNumber: "PB-2024-003",
    customerName: "Sophia Chen",
    customerEmail: "sophia@example.com",
    customerPhone: "+1 (555) 345-6789",
    eventType: "Birthday",
    boothType: "Mirror Booth",
    package: "Silver Package",
    eventDate: new Date(Date.now() + 172800000).toISOString(),
    eventTime: "6:00 PM",
    duration: 2,
    price: 450,
    status: "confirmed",
    paymentStatus: "paid",
    location: "Garden Venue, Hillside",
    guests: 35,
    staffAssigned: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    bookingNumber: "PB-2024-004",
    customerName: "Michael O'Brien",
    customerEmail: "michael@example.com",
    customerPhone: "+1 (555) 456-7890",
    eventType: "Party",
    boothType: "Selfie Booth",
    package: "Diamond Package",
    eventDate: new Date(Date.now() + 259200000).toISOString(),
    eventTime: "8:00 PM",
    duration: 3,
    price: 1500,
    status: "in-progress",
    paymentStatus: "paid",
    location: "Rooftop Terrace, City Center",
    guests: 85,
    staffAssigned: "David Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    id: "5",
    bookingNumber: "PB-2024-005",
    customerName: "Olivia Martinez",
    customerEmail: "olivia@example.com",
    customerPhone: "+1 (555) 567-8901",
    eventType: "Wedding",
    boothType: "Open Air Booth",
    package: "Premium Package",
    eventDate: new Date(Date.now() + 345600000).toISOString(),
    eventTime: "3:00 PM",
    duration: 5,
    price: 2000,
    status: "confirmed",
    paymentStatus: "deposit",
    location: "Beachfront Resort, Coastline",
    guests: 150,
    staffAssigned: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
];

const mockRevenue: RevenueData = {
  daily: 2450,
  weekly: 8750,
  monthly: 32450,
  yearly: 289000,
  growth: 12.5,
};

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "booking",
    message: "Emma Thompson booked Open Air Booth for Wedding",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    user: "Emma Thompson",
  },
  {
    id: "2",
    type: "payment",
    message: "Payment received from James Rodriguez - $850",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "James Rodriguez",
  },
  {
    id: "3",
    type: "reminder",
    message: "Reminder: Sophia Chen's Birthday booth setup tomorrow",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "4",
    type: "cancellation",
    message: "Thomas Anderson cancelled booking PB-2024-008",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    user: "Thomas Anderson",
  },
  {
    id: "5",
    type: "booking",
    message: "New booking: Olivia Martinez - Premium Package",
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    user: "Olivia Martinez",
  },
];

// ============================================================
// DASHBOARD STATS CARDS
// ============================================================
function StatsCards() {
  const stats = [
    {
      title: "Today's Revenue",
      value: `$${mockRevenue.daily.toLocaleString()}`,
      icon: DollarSignIcon,
      trend: "+12.5%",
      trendUp: true,
      color: "bg-emerald-500/10 text-emerald-700",
    },
    {
      title: "Today's Bookings",
      value: "8",
      icon: CalendarIcon,
      trend: "+2 from yesterday",
      trendUp: true,
      color: "bg-blue-500/10 text-blue-700",
    },
    {
      title: "Active Bookings",
      value: "4",
      icon: ClockIcon,
      trend: "2 in progress",
      trendUp: false,
      color: "bg-purple-500/10 text-purple-700",
    },
    {
      title: "Total Customers",
      value: "156",
      icon: UsersIcon,
      trend: "+8 this month",
      trendUp: true,
      color: "bg-amber-500/10 text-amber-700",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-xs font-medium",
                      stat.trendUp ? "text-emerald-600" : "text-muted-foreground"
                    )}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={cn("rounded-xl p-3", stat.color)}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// ============================================================
// STATUS BADGES
// ============================================================
function StatusBadge({ status }: { status: Booking["status"] }) {
  const config = {
    pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
    confirmed: { label: "Confirmed", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    "in-progress": { label: "In Progress", className: "bg-blue-50 text-blue-700 border-blue-200" },
    completed: { label: "Completed", className: "bg-teal-50 text-teal-700 border-teal-200" },
    cancelled: { label: "Cancelled", className: "bg-rose-50 text-rose-700 border-rose-200" },
  };

  const { label, className } = config[status];

  return (
    <Badge variant="outline" className={cn("font-medium text-xs", className)}>
      {label}
    </Badge>
  );
}

function PaymentStatusBadge({ status }: { status: Booking["paymentStatus"] }) {
  const config = {
    paid: { label: "Paid", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    deposit: { label: "Deposit", className: "bg-blue-50 text-blue-700 border-blue-200" },
    pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
    failed: { label: "Failed", className: "bg-rose-50 text-rose-700 border-rose-200" },
  };

  const { label, className } = config[status];

  return (
    <Badge variant="outline" className={cn("font-medium text-xs", className)}>
      {label}
    </Badge>
  );
}

// ============================================================
// TODAY'S SCHEDULE
// ============================================================
function TodaysSchedule({ bookings }: { bookings: Booking[] }) {
  const todayBookings = bookings.filter(b => isToday(parseISO(b.eventDate)));

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5 text-primary" />
            Today's Schedule
          </CardTitle>
          <CardDescription>
            {todayBookings.length} bookings today
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          View All <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {todayBookings.length > 0 ? (
          <div className="space-y-3">
            {todayBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ClockIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{booking.customerName}</p>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span>{booking.eventTime}</span>
                    <span>•</span>
                    <span>{booking.boothType}</span>
                    <span>•</span>
                    <span>{booking.duration}h</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">${booking.price}</p>
                  <PaymentStatusBadge status={booking.paymentStatus} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted/50 p-3">
              <CalendarDaysIcon className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="mt-3 font-medium">No bookings today</p>
            <p className="text-sm text-muted-foreground">Enjoy the day off! 🎉</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================================
// UPCOMING BOOKINGS
// ============================================================
function UpcomingBookings({ bookings }: { bookings: Booking[] }) {
  const upcoming = bookings
    .filter(b => !isToday(parseISO(b.eventDate)) && b.status !== "cancelled")
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
    .slice(0, 5);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Upcoming Bookings
          </CardTitle>
          <CardDescription>
            Next {upcoming.length} bookings
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          View All <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {upcoming.length > 0 ? (
          <div className="space-y-2">
            {upcoming.map((booking) => {
              const daysUntil = differenceInDays(parseISO(booking.eventDate), new Date());
              return (
                <div
                  key={booking.id}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-muted/50">
                    <span className="text-sm font-bold">{format(parseISO(booking.eventDate), "dd")}</span>
                    <span className="text-[10px] uppercase text-muted-foreground">
                      {format(parseISO(booking.eventDate), "MMM")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{booking.customerName}</p>
                      <Badge variant="secondary" className="text-[10px]">
                        {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{booking.boothType}</span>
                      <span>•</span>
                      <span>{booking.eventTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">${booking.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">No upcoming bookings</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================================
// RECENT ACTIVITY
// ============================================================
function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "booking":
        return <CheckCircleIcon className="h-4 w-4 text-emerald-500" />;
      case "payment":
        return <DollarSignIcon className="h-4 w-4 text-blue-500" />;
      case "cancellation":
        return <XCircleIcon className="h-4 w-4 text-rose-500" />;
      case "reminder":
        return <AlertCircleIcon className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest updates from your bookings
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          View All <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="mt-0.5">{getIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{activity.message}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">
                    {format(parseISO(activity.timestamp), "h:mm a")}
                  </span>
                  {activity.user && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {activity.user}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================
// QUICK ACTIONS
// ============================================================
function QuickActions() {
  const actions = [
    { label: "New Booking", icon: PlusIcon, color: "bg-primary text-white" },
    { label: "Add Customer", icon: UsersIcon, color: "bg-blue-500 text-white" },
    { label: "View Calendar", icon: CalendarIcon, color: "bg-purple-500 text-white" },
    { label: "Generate Report", icon: TrendingUpIcon, color: "bg-emerald-500 text-white" },
  ];

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <StarIcon className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
        <CardDescription>
          Common tasks at your fingertips
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "h-auto flex-col gap-2 p-4 hover:scale-[1.02] transition-transform",
                  action.color === "bg-primary text-white" && "border-primary bg-primary text-white hover:bg-primary/90"
                )}
              >
                <div className={cn("rounded-lg p-2", action.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================
// REVENUE OVERVIEW
// ============================================================
function RevenueOverview() {
  const periods = [
    { label: "Today", value: mockRevenue.daily },
    { label: "This Week", value: mockRevenue.weekly },
    { label: "This Month", value: mockRevenue.monthly },
    { label: "This Year", value: mockRevenue.yearly },
  ];

  const maxValue = Math.max(...periods.map(p => p.value));

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-primary" />
            Revenue Overview
          </CardTitle>
          <CardDescription>
            {mockRevenue.growth > 0 ? "+" : ""}{mockRevenue.growth}% growth from last period
          </CardDescription>
        </div>
        <Badge variant="outline" className={cn(
          mockRevenue.growth > 0 ? "text-emerald-600 border-emerald-200" : "text-rose-600 border-rose-200"
        )}>
          {mockRevenue.growth > 0 ? <TrendingUpIcon className="h-3 w-3 mr-1" /> : <TrendingDownIcon className="h-3 w-3 mr-1" />}
          {mockRevenue.growth}%
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {periods.map((period, index) => {
            const percentage = (period.value / maxValue) * 100;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-muted-foreground">{period.label}</span>
                  <span className="font-semibold">${period.value.toLocaleString()}</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================
// MAIN DASHBOARD COMPONENT
// ============================================================
export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [greeting, setGreeting] = useState("Good morning");
  const [time, setTime] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    setTime(format(new Date(), "h:mm a"));
  }, []);

  const todayBookings = bookings.filter(b => isToday(parseISO(b.eventDate)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {greeting} 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's what's happening with your bookings today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full border">
              <ClockIcon className="h-4 w-4" />
              <span>{time}</span>
            </div>
            <Button size="sm" className="gap-2">
              <PlusIcon className="h-4 w-4" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <TodaysSchedule bookings={bookings} />

            {/* Upcoming Bookings */}
            <UpcomingBookings bookings={bookings} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions />

            {/* Revenue Overview */}
            <RevenueOverview />

            {/* Recent Activity */}
            <RecentActivity activities={activities} />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 text-center text-xs text-muted-foreground border-t">
          <p>SnapBook Dashboard • {format(new Date(), "EEEE, MMMM d, yyyy")}</p>
        </div>
      </div>
    </div>
  );
}