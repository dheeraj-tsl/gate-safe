"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, UserCheck, UserX, Clock, Calendar, Package, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function SecurityVisitorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

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
      purpose: "Amazon Delivery",
      hostName: "Rajesh Kumar",
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
      purpose: "Family Visit",
      hostName: "Neha Gupta",
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
      purpose: "Plumbing Work",
      hostName: "Vikram Singh",
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
      purpose: "Birthday Party",
      hostName: "Amit Patel",
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
      purpose: "Food Delivery",
      hostName: "Priya Sharma",
    },
  ]

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phone.includes(searchTerm) ||
      visitor.hostName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || visitor.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleViewDetails = (visitor: any) => {
    setSelectedVisitor(visitor)
    setShowDetailsDialog(true)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Guest":
        return <User className="h-4 w-4 text-blue-500" />
      case "Delivery":
        return <Package className="h-4 w-4 text-green-500" />
      case "Service":
        return <Clock className="h-4 w-4 text-orange-500" />
      default:
        return <User className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4 pb-16 md:pb-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Visitor Management</h2>
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search visitors, flats..."
            className="pl-9 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px]">
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
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${visitor.name}`} />
                      <AvatarFallback>{visitor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{visitor.name}</h3>
                      <p className="text-sm text-muted-foreground">{visitor.phone}</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="flex items-center">
                    {getTypeIcon(visitor.type)}
                    <span className="ml-1">{visitor.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>{visitor.time}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>Host: {visitor.hostName}</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>Flat: {visitor.flat}</span>
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
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(visitor)}>
                    Details
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
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${visitor.name}`} />
                      <AvatarFallback>{visitor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{visitor.name}</h3>
                      <p className="text-sm text-muted-foreground">{visitor.phone}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="flex items-center">
                    {getTypeIcon(visitor.type)}
                    <span className="ml-1">{visitor.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>{visitor.time}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>Host: {visitor.hostName}</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>Flat: {visitor.flat}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Check In
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(visitor)}>
                    Details
                  </Button>
                </div>
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
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${visitor.name}`} />
                      <AvatarFallback>{visitor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{visitor.name}</h3>
                      <p className="text-sm text-muted-foreground">{visitor.phone}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    {getTypeIcon(visitor.type)}
                    <span className="ml-1">{visitor.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>{visitor.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>In: {visitor.checkIn || visitor.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>Out: {visitor.checkOut || "N/A"}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="mt-3" onClick={() => handleViewDetails(visitor)}>
                  View Details
                </Button>
              </div>
            ))}
          {filteredVisitors.filter((visitor) => visitor.status === "completed").length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No completed visits</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Visitor Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Visitor Details</DialogTitle>
            <DialogDescription>Complete information about the visitor.</DialogDescription>
          </DialogHeader>
          {selectedVisitor && (
            <div className="py-4">
              <div className="flex items-center mb-4">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedVisitor.name}`} />
                  <AvatarFallback>{selectedVisitor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedVisitor.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedVisitor.phone}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Visitor Type</Label>
                    <p className="font-medium">{selectedVisitor.type}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Status</Label>
                    <p className="font-medium capitalize">{selectedVisitor.status}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Purpose of Visit</Label>
                  <p className="font-medium">{selectedVisitor.purpose}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Host Name</Label>
                    <p className="font-medium">{selectedVisitor.hostName}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Flat</Label>
                    <p className="font-medium">{selectedVisitor.flat}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Date</Label>
                    <p className="font-medium">{selectedVisitor.date}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Time</Label>
                    <p className="font-medium">{selectedVisitor.time}</p>
                  </div>
                </div>

                {selectedVisitor.status === "completed" && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Check In</Label>
                      <p className="font-medium">{selectedVisitor.checkIn || selectedVisitor.time}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Check Out</Label>
                      <p className="font-medium">{selectedVisitor.checkOut || "N/A"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Home(props: any) {
  return <div {...props} />
}

