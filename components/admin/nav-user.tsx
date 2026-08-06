"use client"

import Link from "next/link"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { EllipsisVerticalIcon, CircleUserRoundIcon, CreditCardIcon, BellIcon, LogOutIcon, KeyIcon, KeyRound, CreditCard } from "lucide-react"
import { Button } from "../ui/button"


const user= {
  name: "Desire",
  email:"mutenga.desire17@gmail.com",
  avatar: "/red.jpg"
}
export default function NavUser(){
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
<Button
  variant="ghost"
  className="flex w-full items-center gap-2 rounded-lg p-2 justify-start
             bg-sidebar hover:bg-sidebar-accent
             text-sidebar-foreground
             data-[state=open]:bg-sidebar-accent
             data-[state=open]:text-sidebar-accent-foreground"
>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/red.jpg" alt={user.name} />
                <AvatarFallback className="rounded-lg">DM</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard/profile" className="flex items-center gap-2 cursor-pointer ">
                  <CircleUserRoundIcon className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard/payment" className="flex items-center gap-2 cursor-pointer ">
                  <CreditCard className="h-4 w-4" />
                  Payments
                </Link>
              </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                <Link href="/admin/dashboard/notifications" className="flex items-center gap-2 cursor-pointer ">
                  <BellIcon className="h-4 w-4" />
                  Notifications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard/security" className="flex items-center gap-2 cursor-pointer ">
                  <KeyRound className="h-4 w-4" />
                   Security
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href="/logout" className="flex items-center gap-2">
              <Button variant="destructive" className="w-full flex flex-row cursor-pointer">
                <LogOutIcon className="h-4 w-4" />
                Log Out
              </Button>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}