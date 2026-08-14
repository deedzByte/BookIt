"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon, Settings } from "lucide-react"
import NavUser from "./nav-user"




const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Services",
      url: "/admin/dashboard/services",
      icon: <FolderIcon />,
    },
    {
      title: "Orders",
      url: "/admin/dashboard/orders",
      icon: <ListIcon />,
    },
    {
      title: "Analytics",
      url: "/admin/dashboard/analytics",
      icon: <ChartBarIcon />,
    },
    {
      title: "Settings",
      url: "/admin/dashboard/settings",
      icon: <Settings />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent className="mt-4">
        <NavMain items={data.navMain} />
        <NavUser />
      </SidebarContent>

        

    </Sidebar>
  )
}
