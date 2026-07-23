"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, MailIcon } from "lucide-react"
import ReminderCard from "./admin/ReminderCard";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton>
              <LayoutDashboardIcon />
             <Link href="/admin/dashboard">Dashboard</Link>
            </SidebarMenuButton>
<Popover>
  <PopoverTrigger>
    <Button
      size="icon"
      className="size-8 group-data-[collapsible=icon]:opacity-0"
      variant="outline"
    >
      <MailIcon className="h-4 w-4" />
      <span className="sr-only">Reminders</span>
    </Button>
  </PopoverTrigger>

  <PopoverContent
    align="end"
    className="w-96 p-0 rounded-2xl"
  >
    <ReminderCard />
  </PopoverContent>
</Popover>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                <a href={item.url}>
                  <div className="flex flex-row gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
