// Create a new component for mobile sidebar
"use client"

import React from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { Home, Shield, SquareStack, Wallet, MessageCircle, CalendarDays, BarChart3, Settings } from "lucide-react"

interface MobileSidebarProps {
  userName: string
}

export function MobileSidebar({ userName }: MobileSidebarProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "Visitors",
      icon: Shield,
      path: "/dashboard/visitors",
    },
    {
      title: "Complaints",
      icon: SquareStack,
      path: "/dashboard/complaints",
    },
    {
      title: "Payments",
      icon: Wallet,
      path: "/dashboard/payments",
    },
    {
      title: "Community",
      icon: MessageCircle,
      path: "/dashboard/community",
    },
    {
      title: "Amenities",
      icon: CalendarDays,
      path: "/dashboard/amenities",
    },
    {
      title: "Reports",
      icon: BarChart3,
      path: "/dashboard/reports",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-primary text-white w-[280px]">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-white p-1">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <span className="font-heading font-bold text-xl">DwellConnect</span>
            </div>
            <div className="mt-2 text-sm opacity-80">Welcome, {userName}</div>
          </div>

          <div className="flex-1 overflow-auto py-2">
            <nav className="space-y-1 px-2">
              {menuItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center w-full space-x-3 px-3 py-3 rounded-md hover:bg-white/20 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-white/10">
            <Button
              variant="outline"
              className="w-full bg-white/10 text-white hover:bg-white/20 border-white/20"
              onClick={() => router.push("/login")}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

