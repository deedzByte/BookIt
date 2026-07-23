"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChevronDownIcon, ChevronUpIcon, EllipsisVerticalIcon } from "lucide-react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconGripVertical,
  IconEye,
  IconTrash,
  IconCalendarEvent,
  IconMapPin,
  IconUsers,
  IconClock,
  IconCash,
  IconCreditCard,
  IconPhone,
  IconMail,
  IconUser,
  IconPackage,
  IconPrinter,
  IconLayout,
  IconSparkles,
} from "@tabler/icons-react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { z } from "zod"
import { toast } from "sonner"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  LoaderIcon,
  CreditCardIcon,
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// ============================================================
// SCHEMA
// ============================================================
export const bookingSchema = z.object({
  id: z.string(),
  bookingNumber: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhone: z.string(),
  eventType: z.string(),
  boothType: z.string(),
  package: z.string(),
  eventDate: z.string(),
  props: z.string(),
  eventTime: z.string(),
  duration: z.number(),
  price: z.string(),
  status: z.string(),
  paymentStatus: z.string(),
  location: z.string(),
  guests: z.number(),
  addons: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().optional(),
  })),
  prints: z.array(z.object({
    id: z.string(),
    name: z.string(),
    size: z.string(),
    price: z.number(),
    quantity: z.number(),
  })),
  templates: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
  })),
  notes: z.string().optional(),
  staffAssigned: z.string().optional(),
  createdAt: z.string(),
})

const MOCK_BOOKINGS: z.infer<typeof bookingSchema>[] = [
  {
    id: "1",
    bookingNumber: "PB-2024-001",
    customerName: "Emma Thompson",
    customerEmail: "emma@example.com",
    customerPhone: "+1 (555) 123-4567",
    eventType: "Wedding",
    props: "Classic",
    boothType: "Open Air Booth",
    package: "Standard Package",
    eventDate: "2024-12-15",
    eventTime: "2:00 PM",
    duration: 4,
    price: "$1,200.00",
    status: "Confirmed",
    paymentStatus: "Paid",
    location: "Grand Ballroom, Downtown",
    guests: 120,
    addons: [
      { id: "props-1", name: "Props Package", price: 50, quantity: 1 },
      { id: "video-1", name: "Video Recording", price: 100, quantity: 1 },
      { id: "prints-1", name: "Instant Prints", price: 75, quantity: 1 },
    ],
    prints: [
      { id: "print-1", name: '4" x 6"', size: "4x6", price: 0, quantity: 50 },
      { id: "print-2", name: '5" x 7"', size: "5x7", price: 15, quantity: 20 },
    ],
    templates: [
      { id: "template-1", name: "Classic Strip", price: 0 },
      { id: "template-2", name: "Modern Grid", price: 10 },
    ],
    notes: "Bride wants specific backdrop colors - rose gold and ivory",
    staffAssigned: "Sarah Johnson",
    createdAt: "2024-11-01T10:00:00Z",
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
    props: "Glitter",
    eventDate: "2024-12-20",
    eventTime: "10:00 AM",
    duration: 3,
    price: "$850.00",
    status: "Pending",
    paymentStatus: "Deposit",
    location: "Conference Center, Business District",
    guests: 45,
    addons: [
      { id: "gallery-1", name: "Digital Gallery", price: 30, quantity: 1 },
      { id: "backdrop-1", name: "Custom Backdrop", price: 60, quantity: 1 },
    ],
    prints: [
      { id: "print-3", name: '6" x 8"', size: "6x8", price: 25, quantity: 15 },
    ],
    templates: [
      { id: "template-3", name: "Collage", price: 20 },
    ],
    notes: "Company logo needed on prints",
    staffAssigned: "Mike Chen",
    createdAt: "2024-11-05T14:30:00Z",
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
    eventDate: "2024-12-22",
    eventTime: "6:00 PM",
    duration: 2,
    props: "Classic",
    price: "$450.00",
    status: "Confirmed",
    paymentStatus: "Paid",
    location: "Garden Venue, Hillside",
    guests: 35,
    addons: [
      { id: "props-2", name: "Props Package", price: 50, quantity: 1 },
    ],
    prints: [
      { id: "print-1", name: '4" x 6"', size: "4x6", price: 0, quantity: 30 },
    ],
    templates: [
      { id: "template-1", name: "Classic Strip", price: 0 },
    ],
    notes: "Birthday girl loves unicorn themes",
    staffAssigned: "Lisa Park",
    createdAt: "2024-11-10T09:15:00Z",
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
    eventDate: "2024-12-25",
    eventTime: "8:00 PM",
    props: "Classic",
    duration: 3,
    price: "$1,500.00",
    status: "In Progress",
    paymentStatus: "Paid",
    location: "Rooftop Terrace, City Center",
    guests: 85,
    addons: [
      { id: "video-2", name: "Video Recording", price: 100, quantity: 1 },
      { id: "album-1", name: "Photo Album", price: 80, quantity: 1 },
      { id: "prints-2", name: "Instant Prints", price: 75, quantity: 2 },
      { id: "gallery-2", name: "Digital Gallery", price: 30, quantity: 1 },
    ],
    prints: [
      { id: "print-2", name: '5" x 7"', size: "5x7", price: 15, quantity: 25 },
      { id: "print-4", name: '8" x 10"', size: "8x10", price: 40, quantity: 10 },
    ],
    templates: [
      { id: "template-2", name: "Modern Grid", price: 10 },
      { id: "template-4", name: "Vintage", price: 15 },
      { id: "template-5", name: "Minimal", price: 5 },
    ],
    notes: "Need extra lighting setup",
    staffAssigned: "David Kim",
    createdAt: "2024-11-12T16:45:00Z",
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
    eventDate: "2025-01-05",
    eventTime: "3:00 PM",
    duration: 5,
    props: "Classic",
    price: "$2,000.00",
    status: "Confirmed",
    paymentStatus: "Deposit",
    location: "Beachfront Resort, Coastline",
    guests: 150,
    addons: [
      { id: "video-3", name: "Video Recording", price: 100, quantity: 1 },
      { id: "album-2", name: "Photo Album", price: 80, quantity: 1 },
      { id: "backdrop-2", name: "Custom Backdrop", price: 60, quantity: 1 },
      { id: "prints-3", name: "Instant Prints", price: 75, quantity: 2 },
    ],
    prints: [
      { id: "print-2", name: '5" x 7"', size: "5x7", price: 15, quantity: 30 },
      { id: "print-3", name: '6" x 8"', size: "6x8", price: 25, quantity: 20 },
    ],
    templates: [
      { id: "template-6", name: "Premium", price: 30 },
      { id: "template-3", name: "Collage", price: 20 },
    ],
    notes: "Ceremony at sunset - need golden hour photos",
    staffAssigned: "Sarah Johnson",
    createdAt: "2024-11-15T11:20:00Z",
  },
  {
    id: "6",
    bookingNumber: "PB-2024-006",
    customerName: "William Zhang",
    customerEmail: "william@example.com",
    customerPhone: "+1 (555) 678-9012",
    eventType: "Corporate",
    boothType: "Open Air Booth",
    package: "Standard Package",
    eventDate: "2025-01-10",
    eventTime: "9:00 AM",
    duration: 4,
    props: "Classic",
    price: "$1,100.00",
    status: "Completed",
    paymentStatus: "Paid",
    location: "Tech Hub, Innovation Park",
    guests: 60,
    addons: [
      { id: "gallery-3", name: "Digital Gallery", price: 30, quantity: 1 },
    ],
    prints: [
      { id: "print-1", name: '4" x 6"', size: "4x6", price: 0, quantity: 40 },
      { id: "print-2", name: '5" x 7"', size: "5x7", price: 15, quantity: 10 },
    ],
    templates: [
      { id: "template-1", name: "Classic Strip", price: 0 },
      { id: "template-5", name: "Minimal", price: 5 },
    ],
    notes: "",
    staffAssigned: "Mike Chen",
    createdAt: "2024-11-18T13:00:00Z",
  },
  {
    id: "7",
    bookingNumber: "PB-2024-007",
    customerName: "Amara Okonkwo",
    customerEmail: "amara@example.com",
    customerPhone: "+1 (555) 789-0123",
    eventType: "Birthday",
    boothType: "Mirror Booth",
    package: "Silver Package",
    eventDate: "2025-01-15",
    eventTime: "4:00 PM",
    duration: 2,
    props: "Classic",
    price: "$300.00",
    status: "Pending",
    paymentStatus: "Pending",
    location: "Community Center, Westside",
    guests: 25,
    addons: [],
    prints: [],
    templates: [],
    notes: "",
    staffAssigned: "Lisa Park",
    createdAt: "2024-11-20T08:30:00Z",
  },
  {
    id: "8",
    bookingNumber: "PB-2024-008",
    customerName: "Thomas Anderson",
    customerEmail: "thomas@example.com",
    customerPhone: "+1 (555) 890-1234",
    eventType: "Party",
    boothType: "GIF Booth",
    package: "Gold Package",
    eventDate: "2025-01-20",
    eventTime: "7:00 PM",
    duration: 3,
    props: "Classic",
    price: "$750.00",
    status: "Cancelled",
    paymentStatus: "Failed",
    location: "Nightclub, Entertainment District",
    guests: 70,
    addons: [
      { id: "props-3", name: "Props Package", price: 50, quantity: 1 },
      { id: "gallery-4", name: "Digital Gallery", price: 30, quantity: 1 },
    ],
    prints: [
      { id: "print-1", name: '4" x 6"', size: "4x6", price: 0, quantity: 20 },
    ],
    templates: [
      { id: "template-2", name: "Modern Grid", price: 10 },
    ],
    notes: "Cancelled due to venue issues",
    staffAssigned: "David Kim",
    createdAt: "2024-11-22T19:15:00Z",
  },
]

// ============================================================
// STATUS BADGES
// ============================================================
function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { icon: React.ReactNode; className: string }> = {
    "Pending": { 
      icon: <ClockIcon className="mr-1 h-3 w-3" />, 
      className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800" 
    },
    "Confirmed": { 
      icon: <CheckCircleIcon className="mr-1 h-3 w-3" />, 
      className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800" 
    },
    "In Progress": { 
      icon: <LoaderIcon className="mr-1 h-3 w-3" />, 
      className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800" 
    },
    "Completed": { 
      icon: <CheckCircleIcon className="mr-1 h-3 w-3" />, 
      className: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-400 dark:border-teal-800" 
    },
    "Cancelled": { 
      icon: <XCircleIcon className="mr-1 h-3 w-3" />, 
      className: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800" 
    },
  }

  const config = statusConfig[status] || statusConfig["Pending"]

  return (
    <Badge variant="outline" className={`px-2.5 py-1 font-medium text-xs ${config.className}`}>
      {config.icon}
      {status}
    </Badge>
  )
}

function PaymentStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { icon: React.ReactNode; className: string }> = {
    "Paid": { 
      icon: <CheckCircleIcon className="mr-1 h-3 w-3" />, 
      className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800" 
    },
    "Deposit": { 
      icon: <CreditCardIcon className="mr-1 h-3 w-3" />, 
      className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800" 
    },
    "Pending": { 
      icon: <ClockIcon className="mr-1 h-3 w-3" />, 
      className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800" 
    },
    "Failed": { 
      icon: <XCircleIcon className="mr-1 h-3 w-3" />, 
      className: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800" 
    },
  }

  const config = statusConfig[status] || statusConfig["Pending"]

  return (
    <Badge variant="outline" className={`px-2.5 py-1 font-medium text-xs ${config.className}`}>
      {config.icon}
      {status}
    </Badge>
  )
}

// ============================================================
// DRAGGABLE COMPONENTS
// ============================================================
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
    >
      <IconGripVertical className="size-3.5" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

function SortableHeader({ column, children }: { column: any; children: React.ReactNode }) {
  const canSort = column.getCanSort()

  return (
    <Button
      variant="ghost"
      onClick={canSort ? column.getToggleSortingHandler() : undefined}
      className={cn(
        "h-auto p-0 font-semibold hover:bg-transparent text-xs uppercase tracking-wider text-muted-foreground",
        canSort && "cursor-pointer select-none"
      )}
    >
      {children}
      {canSort && (
        <span className="ml-1.5">
          {{
            asc: <ChevronUpIcon className="h-3.5 w-3.5" />,
            desc: <ChevronDownIcon className="h-3.5 w-3.5" />,
          }[column.getIsSorted() as string] ?? <ChevronDownIcon className="h-3.5 w-3.5 opacity-30" />}
        </span>
      )}
    </Button>
  )
}

function DraggableRow({ row }: { row: Row<z.infer<typeof bookingSchema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      className={cn(
        "hover:bg-muted/30 transition-colors",
        isDragging && "bg-muted/50 shadow-lg"
      )}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="py-3">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

// ============================================================
// BOOKING DETAILS DIALOG
// ============================================================
function BookingDetailsDialog({ 
  booking, 
  open, 
  onOpenChange 
}: { 
  booking: z.infer<typeof bookingSchema>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const infoCards = [
    {
      id: 'overview',
      icon: <IconUser className="h-5 w-5" />,
      title: 'Overview',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Customer</Label>
            <p className="font-medium flex items-center gap-2">
              <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
              {booking.customerName}
            </p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Event Type</Label>
            <p className="font-medium">{booking.eventType}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Booth</Label>
            <p className="font-medium">{booking.boothType}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Package</Label>
            <p className="font-medium">{booking.package}</p>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      icon: <IconMail className="h-5 w-5" />,
      title: 'Contact Details',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Email</Label>
            <p className="font-medium flex items-center gap-2">
              <MailIcon className="h-3.5 w-3.5 text-muted-foreground" />
              {booking.customerEmail}
            </p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Phone</Label>
            <p className="font-medium flex items-center gap-2">
              <PhoneIcon className="h-3.5 w-3.5 text-muted-foreground" />
              {booking.customerPhone}
            </p>
          </div>
          <div className="space-y-1 col-span-2">
            <Label className="text-xs text-muted-foreground">Location</Label>
            <p className="font-medium flex items-center gap-2">
              <MapPinIcon className="h-3.5 w-3.5 text-muted-foreground" />
              {booking.location}
            </p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Guests</Label>
            <p className="font-medium">{booking.guests}</p>
          </div>
        </div>
      )
    },
    {
      id: 'schedule',
      icon: <IconCalendarEvent className="h-5 w-5" />,
      title: 'Schedule',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Date</Label>
            <p className="font-medium flex items-center gap-2">
              <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
              {format(new Date(booking.eventDate), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Time</Label>
            <p className="font-medium flex items-center gap-2">
              <ClockIcon className="h-3.5 w-3.5 text-muted-foreground" />
              {booking.eventTime}
            </p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Duration</Label>
            <p className="font-medium">{booking.duration} hours</p>
          </div>
        </div>
      )
    },
    {
      id: 'addons',
      icon: <IconPackage className="h-5 w-5" />,
      title: 'Add-ons & Extras',
      content: (
        <div className="space-y-3">
          {booking.addons.length > 0 && (
            <div>
              <Label className="text-xs text-muted-foreground">Add-ons</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {booking.addons.map((addon) => (
                  <Badge key={addon.id} variant="secondary" className="text-xs">
                    {addon.name} {addon.quantity && `×${addon.quantity}`}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {booking.prints.length > 0 && (
            <div>
              <Label className="text-xs text-muted-foreground">Prints</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {booking.prints.map((print) => (
                  <Badge key={print.id} variant="outline" className="text-xs">
                    {print.name} ×{print.quantity}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {booking.templates.length > 0 && (
            <div>
              <Label className="text-xs text-muted-foreground">Templates</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {booking.templates.map((template) => (
                  <Badge key={template.id} variant="secondary" className="text-xs">
                    {template.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {booking.addons.length === 0 && booking.prints.length === 0 && booking.templates.length === 0 && (
            <div className="text-sm text-muted-foreground">No add-ons or extras selected</div>
          )}
        </div>
      )
    },
    {
      id: 'notes',
      icon: <IconSparkles className="h-5 w-5" />,
      title: 'Notes',
      content: booking.notes ? (
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <p className="text-sm leading-relaxed">{booking.notes}</p>
          {booking.staffAssigned && (
            <div className="mt-3 pt-3 border-t border-border">
              <Label className="text-xs text-muted-foreground">Staff Assigned</Label>
              <p className="font-medium text-sm">{booking.staffAssigned}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <IconSparkles className="h-12 w-12 mb-2 opacity-20" />
          <p className="text-sm">No notes</p>
        </div>
      )
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0 rounded-2xl shadow-2xl border-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-transparent border-b px-6 py-5">
          <DialogHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight flex items-center gap-3">
                  {booking.bookingNumber}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="font-medium text-foreground">{booking.customerName}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm">{booking.boothType}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-muted-foreground">{booking.package}</span>
                </DialogDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{booking.price}</div>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={booking.status} />
                  <PaymentStatusBadge status={booking.paymentStatus} />
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Carousel */}
        <div className="flex-1 overflow-hidden px-6 py-4">
          <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent className="h-full">
              {infoCards.map((item) => (
                <CarouselItem key={item.id} className="h-full">
                  <div className="h-full border-0 shadow-none">
                    <div className="flex items-center gap-2 pb-3">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                    </div>
                    <div className="px-0 pb-0">
                      {item.content}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="absolute -left-3 top-1/2 -translate-y-1/2 h-8 w-8 border shadow-sm bg-background hover:bg-muted rounded-full" />
            <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2 h-8 w-8 border shadow-sm bg-background hover:bg-muted rounded-full" />
          </Carousel>
        </div>

        {/* Footer with indicators */}
        <div className="border-t px-6 py-3 flex items-center justify-between bg-muted/10">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === current 
                    ? "w-6 bg-primary" 
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            {current + 1} / {count}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function BookingDataTable() {
  const [data, setData] = React.useState<z.infer<typeof bookingSchema>[]>(() => MOCK_BOOKINGS)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  
  const [selectedBooking, setSelectedBooking] = React.useState<z.infer<typeof bookingSchema> | null>(null)
  const [filterValue, setFilterValue] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [bookingToDelete, setBookingToDelete] = React.useState<z.infer<typeof bookingSchema> | null>(null)
  
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  const filteredData = React.useMemo(() => {
    if (!filterValue) return data
    const lowerSearch = filterValue.toLowerCase()
    return data.filter(booking => 
      booking.bookingNumber.toLowerCase().includes(lowerSearch) ||
      booking.customerName.toLowerCase().includes(lowerSearch) ||
      booking.customerEmail.toLowerCase().includes(lowerSearch) ||
      booking.location.toLowerCase().includes(lowerSearch)
    )
  }, [data, filterValue])

  const onDialogOpen = (booking: z.infer<typeof bookingSchema>) => {
    setSelectedBooking(booking)
    setIsDialogOpen(true)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  const handleDelete = async (bookingId: string) => {
    try {
      toast.success("Booking deleted successfully")
      setData(data.filter(b => b.id !== bookingId))
      setShowDeleteDialog(false)
      setBookingToDelete(null)
    } catch (error) {
      toast.error("Failed to delete booking")
    }
  }

  const columns: ColumnDef<z.infer<typeof bookingSchema>>[] = React.useMemo(() => [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
      size: 40,
    },
    {
      accessorKey: "bookingNumber",
      header: ({ column }) => (
        <SortableHeader column={column}>
          Booking #
        </SortableHeader>
      ),
      cell: ({ row }) => (
        <Button
          variant="link"
          className="h-auto p-0 font-medium text-primary hover:text-primary/80"
          onClick={() => onDialogOpen(row.original)}
        >
          {row.original.bookingNumber}
        </Button>
      ),
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => (
        <SortableHeader column={column}>
          Customer
        </SortableHeader>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="font-medium">{row.original.customerName}</div>
        </div>
      ),
    },
    {
      accessorKey: "eventDate",
      header: ({ column }) => (
        <SortableHeader column={column}>
          Date
        </SortableHeader>
      ),
      cell: ({ row }) => (
        <div className="text-sm">
          {format(new Date(row.original.eventDate), 'MMM d, yyyy')}
        </div>
      ),
    },
    {
      accessorKey: "boothType",
      header: ({ column }) => (
        <SortableHeader column={column}>
          Type
        </SortableHeader>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-normal text-xs">
          {row.original.boothType}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <SortableHeader column={column}>
          Price
        </SortableHeader>
      ),
      cell: ({ row }) => (
        <div className="font-semibold text-primary">{row.original.price}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <SortableHeader column={column}>
          Status
        </SortableHeader>
      ),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <SortableHeader column={column}>
          Payment
        </SortableHeader>
      ),
      cell: ({ row }) => <PaymentStatusBadge status={row.original.paymentStatus} />,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="size-8 p-0 hover:bg-muted"
            >
              <EllipsisVerticalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onDialogOpen(row.original)}>
              <IconEye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => {
                setBookingToDelete(row.original)
                setShowDeleteDialog(true)
              }}
              className="text-destructive focus:text-destructive"
            >
              <IconTrash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 50,
    },
  ], [])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <TooltipProvider>
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track all your bookings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                placeholder="Search bookings..."
                className="h-9 w-[200px] lg:w-[300px] pl-9 rounded-xl"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <IconEye className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted/30">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="py-3">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <IconCalendarEvent className="h-12 w-12 mb-2 opacity-20" />
                        <p className="text-sm font-medium">No bookings found</p>
                        <p className="text-xs">Try adjusting your search or filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} booking(s) selected.
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="rows-per-page" className="text-sm text-muted-foreground">
                Rows
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px] rounded-lg">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex rounded-lg"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">First page</span>
                <IconChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 rounded-lg"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Previous page</span>
                <IconChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 rounded-lg"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Next page</span>
                <IconChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex rounded-lg"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Last page</span>
                <IconChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Delete Booking</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete booking <span className="font-medium text-foreground">{bookingToDelete?.bookingNumber}</span>? 
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => bookingToDelete && handleDelete(bookingToDelete.id)}
                className="rounded-xl"
              >
                Delete Booking
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Booking Details Dialog */}
        {selectedBooking && (
          <BookingDetailsDialog 
            booking={selectedBooking}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        )}
      </div>
    </TooltipProvider>
  )
}