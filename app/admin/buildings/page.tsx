"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MoreVertical, Building, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input as InputComponent } from "@/components/ui/input"

export default function BuildingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Sample buildings data
  const buildings = [
    {
      id: 1,
      name: "Block A",
      totalFlats: 40,
      occupiedFlats: 35,
      floors: 10,
      amenities: ["Lift", "Fire Safety", "Power Backup", "Water Tank"],
      maintenanceDue: 125000,
    },
    {
      id: 2,
      name: "Block B",
      totalFlats: 40,
      occupiedFlats: 38,
      floors: 10,
      amenities: ["Lift", "Fire Safety", "Power Backup", "Water Tank"],
      maintenanceDue: 85000,
    },
    {
      id: 3,
      name: "Block C",
      totalFlats: 30,
      occupiedFlats: 25,
      floors: 8,
      amenities: ["Lift", "Fire Safety", "Power Backup", "Water Tank"],
      maintenanceDue: 95000,
    },
    {
      id: 4,
      name: "Block D",
      totalFlats: 30,
      occupiedFlats: 28,
      floors: 8,
      amenities: ["Lift", "Fire Safety", "Power Backup", "Water Tank"],
      maintenanceDue: 65000,
    },
  ]

  const filteredBuildings = buildings.filter((building) => {
    return building.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Buildings Management</h2>
        <Button size="sm" onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Building
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-blue-100 p-2 mb-2">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{buildings.length}</div>
            <p className="text-xs text-muted-foreground">Total Buildings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-2 mb-2">
              <Home className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold">
              {buildings.reduce((acc, building) => acc + building.totalFlats, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total Flats</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search buildings..."
          className="pl-9 rounded-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All Buildings</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Due</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredBuildings.map((building) => (
            <Card key={building.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{building.name}</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Occupancy</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-medium">
                        {building.occupiedFlats}/{building.totalFlats} Flats
                      </p>
                      <p className="text-sm font-medium">
                        {Math.round((building.occupiedFlats / building.totalFlats) * 100)}%
                      </p>
                    </div>
                    <Progress value={(building.occupiedFlats / building.totalFlats) * 100} className="h-2 mt-1" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Maintenance Due</p>
                    <p className="text-sm font-medium mt-1">₹{building.maintenanceDue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {building.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="bg-muted">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredBuildings.length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No buildings found</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4 mt-4">
          {filteredBuildings
            .filter((building) => building.maintenanceDue > 0)
            .sort((a, b) => b.maintenanceDue - a.maintenanceDue)
            .map((building) => (
              <Card key={building.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{building.name}</CardTitle>
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      ₹{building.maintenanceDue.toLocaleString()} Due
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Occupancy</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-medium">
                          {building.occupiedFlats}/{building.totalFlats} Flats
                        </p>
                        <p className="text-sm font-medium">
                          {Math.round((building.occupiedFlats / building.totalFlats) * 100)}%
                        </p>
                      </div>
                      <Progress value={(building.occupiedFlats / building.totalFlats) * 100} className="h-2 mt-1" />
                    </div>
                    <div className="flex items-center justify-end">
                      <Button size="sm">Send Reminder</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          {filteredBuildings.filter((building) => building.maintenanceDue > 0).length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No maintenance dues found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Building Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Building</DialogTitle>
            <DialogDescription>Add a new building to the complex.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Building Name</Label>
              <InputComponent id="name" placeholder="e.g. Block E" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="floors">Number of Floors</Label>
                <InputComponent id="floors" type="number" placeholder="e.g. 10" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="flats">Number of Flats</Label>
                <InputComponent id="flats" type="number" placeholder="e.g. 40" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amenities">Amenities</Label>
              <Select>
                <SelectTrigger id="amenities">
                  <SelectValue placeholder="Select amenities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lift">Lift</SelectItem>
                  <SelectItem value="fire">Fire Safety</SelectItem>
                  <SelectItem value="power">Power Backup</SelectItem>
                  <SelectItem value="water">Water Tank</SelectItem>
                  <SelectItem value="parking">Parking</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">You can select multiple amenities</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button>Add Building</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

