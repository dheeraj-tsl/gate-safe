"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, LogOut, Menu, Home, MessageCircle, Users, Bell } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useUser()

  // Redirect to login if not logged in or not a security guard
  useEffect(() => {
    setMounted(true)
    if (mounted && (!user || user.role !== "security")) {
      router.push("/login")
    }
  }, [mounted, user, router])

  const navItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/security/dashboard",
    },
    {
      name: "Visitors",
      icon: Users,
      path: "/security/visitors",
    },
    {
      name: "Alerts",
      icon: Bell,
      path: "/security/alerts",
    },
    {
      name: "Chat",
      icon: MessageCircle,
      path: "/security/chat",
    },
  ]

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!mounted || !user || user.role !== "security") {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b">
          <div className="flex-1 flex items-center justify-between px-4">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] p-0">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center p-4 border-b">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <Shield className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span className="ml-2 text-xl font-bold">GateSafe Security</span>
                    </div>
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                      {navItems.map((item) => (
                        <Button
                          key={item.path}
                          variant={isActive(item.path) ? "default" : "ghost"}
                          className={`w-full justify-start ${isActive(item.path) ? "" : "hover:bg-muted"}`}
                          onClick={() => handleNavigation(item.path)}
                        >
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </Button>
                      ))}
                    </nav>
                    <div className="p-4 border-t">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">Security Guard</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="ml-3">
                <h1 className="text-lg font-bold">GateSafe Security</h1>
              </div>
            </div>
            <div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6 px-4 pb-20 md:pb-6">{children}</div>
        </main>

        {/* Bottom Navigation for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 z-10">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center justify-center h-full rounded-none ${
                isActive(item.path) ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

