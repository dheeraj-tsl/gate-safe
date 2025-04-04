"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserCheck, UserX, Clock, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function SecurityDashboard() {
  const { user, hasPermission } = useUser()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    // Redirect if not logged in or not a security guard
    if (!user) {
      router.push("/login")
    } else if (user.role !== "security") {
      router.push("/dashboard")
    }
  }, [user, router])

  if (!user || user.role !== "security") {
    return null
  }

  // Sample visitor data
  const visitors = [
    {
      id: 1,
      name: "Amit Sharma",
      status: "pending",
      time: "10:30 AM",
      date: "Today",
      type: "Delivery",
      flat: "B-404",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      name: "Priya Patel",
      status: "approved",
      time: "11:00 AM",
      date: "Today",
      type: "Guest",
      flat: "A-202",
      phone: "+91 87654 32109",
    },
    {
      id: 3,
      name: "Rahul Verma",
      status: "completed",
      time: "09:15 AM",
      date: "Today",
      type: "Service",
      flat: "C-101",
      phone: "+91 76543 21098",
      checkIn: "09:15 AM",
      checkOut: "10:45 AM",
    },
    {
      id: 4,
      name: "Neha Gupta",
      status: "approved",
      time: "12:00 PM",
      date: "Today",
      type: "Guest",
      flat: "D-303",
      phone: "+91 65432 10987",
    },
    {
      id: 5,
      name: "Vikram Singh",
      status: "rejected",
      time: "08:30 AM",
      date: "Today",
      type: "Delivery",
      flat: "B-101",
      phone: "+91 54321 09876",
    },
  ]

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phone.includes(searchTerm)
    const matchesFilter = filterType === "all" || visitor.type === filterType
    return matchesSearch && matchesFilter
  })

  const pendingVisitors = filteredVisitors.filter((v) => v.status === "pending").length
  const approvedVisitors = filteredVisitors.filter((v) => v.status === "approved").length
  const completedVisitors = filteredVisitors.filter((v) => v.status === "completed").length

  return (
    <div className="space-y-4 pb-16 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Security Dashboard</h2>
          <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            On Duty
          </Badge>
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-yellow-100 p-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold">{pendingVisitors}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-2 mb-2">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{approvedVisitors}</div>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-blue-100 p-2 mb-2">
              <UserX className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{completedVisitors}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search visitors, flats..."
            className="pl-9 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px] ml-2">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Guest">Guest</SelectItem>
            <SelectItem value="Delivery">Delivery</SelectItem>
            <SelectItem value="Service">Service</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4 mt-4">
          {filteredVisitors
            .filter((visitor) => visitor.status === "pending")
            .map((visitor) => (
              <div key={visitor.id} className="bg-white rounded-lg border p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{visitor.name}</h3>
                    <p className="text-sm text-muted-foreground">{visitor.phone}</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p>{visitor.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Flat</p>
                    <p>{visitor.flat}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p>{visitor.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p>{visitor.date}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <UserX className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button size="sm" className="flex-1">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          {filteredVisitors.filter((visitor) => visitor.status === "pending").length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No pending visitors</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="approved" className="space-y-4 mt-4">
          {filteredVisitors
            .filter((visitor) => visitor.status === "approved")
            .map((visitor) => (
              <div key={visitor.id} className="bg-white rounded-lg border p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{visitor.name}</h3>
                    <p className="text-sm text-muted-foreground">{visitor.phone}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p>{visitor.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Flat</p>
                    <p>{visitor.flat}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p>{visitor.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p>{visitor.date}</p>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  Mark as Completed
                </Button>
              </div>
            ))}
          {filteredVisitors.filter((visitor) => visitor.status === "approved").length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No approved visitors</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          {filteredVisitors
            .filter((visitor) => visitor.status === "completed")
            .map((visitor) => (
              <div key={visitor.id} className="bg-white rounded-lg border p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{visitor.name}</h3>
                    <p className="text-sm text-muted-foreground">{visitor.phone}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p>{visitor.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Flat</p>
                    <p>{visitor.flat}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Check In</p>
                    <p>{visitor.checkIn || visitor.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Check Out</p>
                    <p>{visitor.checkOut || "N/A"}</p>
                  </div>
                </div>
              </div>
            ))}
          {filteredVisitors.filter((visitor) => visitor.status === "completed").length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No completed visits</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

