"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MoreVertical, Users, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function AmenitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Sample amenities data
  const amenities = [
    {
      id: 1,
      name: "Swimming Pool",
      description: "Olympic-size swimming pool with lounging area",
      image: "/placeholder.svg?height=200&width=400",
      availability: "7 AM - 9 PM",
      maxCapacity: 20,
      currentBookings: 8,
      isChargeable: false,
      price: 0,
      status: "available",
    },
    {
      id: 2,
      name: "Gym",
      description: "Well-equipped gym with cardio and strength training equipment",
      image: "/placeholder.svg?height=200&width=400",
      availability: "5 AM - 10 PM",
      maxCapacity: 15,
      currentBookings: 5,
      isChargeable: false,
      price: 0,
      status: "available",
    },
    {
      id: 3,
      name: "Community Hall",
      description: "Spacious hall for parties and community gatherings",
      image: "/placeholder.svg?height=200&width=400",
      availability: "9 AM - 10 PM",
      maxCapacity: 50,
      currentBookings: 0,
      isChargeable: true,
      price: 2000,
      status: "available",
    },
    {
      id: 4,
      name: "Tennis Court",
      description: "Professional tennis court with night lighting",
      image: "/placeholder.svg?height=200&width=400",
      availability: "6 AM - 9 PM",
      maxCapacity: 4,
      currentBookings: 2,
      isChargeable: true,
      price: 500,
      status: "maintenance",
    },
  ]

  const filteredAmenities = amenities.filter((amenity) => {
    return amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Amenities Management</h2>
        <Button size="sm" onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Amenity
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">{amenities.length}</div>
            <p className="text-xs text-muted-foreground">Total Amenities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">{amenities.filter((a) => a.isChargeable).length}</div>
            <p className="text-xs text-muted-foreground">Chargeable Amenities</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search amenities..."
          className="pl-9 rounded-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Amenities</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredAmenities.map((amenity) => (
            <Card key={amenity.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[120px] w-full">
                  <img
                    src={amenity.image || "/placeholder.svg"}
                    alt={amenity.name}
                    className="object-cover w-full h-full"
                  />
                  {amenity.status === "maintenance" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge className="bg-yellow-500">Under Maintenance</Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{amenity.name}</h3>
                    {amenity.isChargeable && <Badge variant="outline">₹{amenity.price}/booking</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{amenity.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{amenity.availability}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <span>Capacity</span>
                          <span className="font-medium">
                            {amenity.currentBookings}/{amenity.maxCapacity}
                          </span>
                        </div>
                        <Progress value={(amenity.currentBookings / amenity.maxCapacity) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t px-4 py-3 flex justify-between">
                  <Button variant="outline" size="sm" className="h-8">
                    View Bookings
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredAmenities.length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No amenities found</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="available" className="space-y-4 mt-4">
          {filteredAmenities
            .filter((a) => a.status === "available")
            .map((amenity) => (
              <Card key={amenity.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[120px] w-full">
                    <img
                      src={amenity.image || "/placeholder.svg"}
                      alt={amenity.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{amenity.name}</h3>
                      {amenity.isChargeable && <Badge variant="outline">₹{amenity.price}/booking</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{amenity.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{amenity.availability}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div className="w-full">
                          <div className="flex justify-between mb-1">
                            <span>Capacity</span>
                            <span className="font-medium">
                              {amenity.currentBookings}/{amenity.maxCapacity}
                            </span>
                          </div>
                          <Progress value={(amenity.currentBookings / amenity.maxCapacity) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t px-4 py-3 flex justify-between">
                    <Button variant="outline" size="sm" className="h-8">
                      View Bookings
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          {filteredAmenities.filter((a) => a.status === "available").length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No available amenities found</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4 mt-4">
          {filteredAmenities
            .filter((a) => a.status === "maintenance")
            .map((amenity) => (
              <Card key={amenity.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[120px] w-full">
                    <img
                      src={amenity.image || "/placeholder.svg"}
                      alt={amenity.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge className="bg-yellow-500">Under Maintenance</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{amenity.name}</h3>
                      {amenity.isChargeable && <Badge variant="outline">₹{amenity.price}/booking</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{amenity.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{amenity.availability}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t px-4 py-3 flex justify-end">
                    <Button size="sm" className="h-8">
                      Mark as Available
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          {filteredAmenities.filter((a) => a.status === "maintenance").length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No amenities under maintenance</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Amenity Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Amenity</DialogTitle>
            <DialogDescription>Add a new amenity to the complex.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Amenity Name</Label>
              <Input id="name" placeholder="e.g. Swimming Pool" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Brief description of the amenity" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="openTime">Opening Time</Label>
                <Input id="openTime" type="time" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="closeTime">Closing Time</Label>
                <Input id="closeTime" type="time" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity">Maximum Capacity</Label>
              <Input id="capacity" type="number" placeholder="e.g. 20" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="chargeable" />
              <Label htmlFor="chargeable">Chargeable Amenity</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" type="number" placeholder="e.g. 500" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button>Add Amenity</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

