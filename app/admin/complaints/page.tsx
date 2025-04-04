"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Calendar, Home, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"

export default function ComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  // Sample complaints data
  const complaints = [
    {
      id: 1,
      title: "Water Leakage in Bathroom",
      description: "There is water leaking from the ceiling in the bathroom.",
      category: "Plumbing",
      status: "in_progress",
      date: "Apr 2, 2023",
      resident: {
        name: "Rajesh Kumar",
        flat: "B-404",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=RK",
      },
      comments: [
        { id: 1, user: "Maintenance Team", text: "We will visit tomorrow morning.", timestamp: "Apr 2, 2023 15:30" },
      ],
    },
    {
      id: 2,
      title: "Elevator not working",
      description: "The elevator in Block A is not working since morning.",
      category: "Electrical",
      status: "pending",
      date: "Apr 1, 2023",
      resident: {
        name: "Priya Sharma",
        flat: "A-202",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=PS",
      },
      comments: [],
    },
    {
      id: 3,
      title: "Garden lights damaged",
      description: "Some garden lights near the pool area are damaged.",
      category: "Common Area",
      status: "resolved",
      date: "Mar 28, 2023",
      resident: {
        name: "Vikram Singh",
        flat: "C-101",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=VS",
      },
      comments: [
        { id: 1, user: "Maintenance Team", text: "We will replace the lights.", timestamp: "Mar 28, 2023 14:20" },
        { id: 2, user: "Maintenance Team", text: "Lights have been replaced.", timestamp: "Mar 30, 2023 16:45" },
      ],
    },
    {
      id: 4,
      title: "AC not cooling properly",
      description: "The air conditioner in the master bedroom is not cooling properly.",
      category: "Electrical",
      status: "in_progress",
      date: "Mar 25, 2023",
      resident: {
        name: "Neha Gupta",
        flat: "D-303",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=NG",
      },
      comments: [
        { id: 1, user: "Maintenance Team", text: "We will send a technician.", timestamp: "Mar 25, 2023 11:15" },
      ],
    },
    {
      id: 5,
      title: "Broken door handle",
      description: "The handle of the main door is loose and about to fall off.",
      category: "Carpentry",
      status: "resolved",
      date: "Mar 20, 2023",
      resident: {
        name: "Amit Patel",
        flat: "B-101",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AP",
      },
      comments: [{ id: 1, user: "Maintenance Team", text: "Fixed the door handle.", timestamp: "Mar 21, 2023 10:30" }],
    },
  ]

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.resident.flat.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === "all" || complaint.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const handleViewDetails = (complaint: any) => {
    setSelectedComplaint(complaint)
    setShowDetailsDialog(true)
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "in_progress":
        return <Badge className="bg-blue-500 text-white">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-green-500 text-white">Resolved</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Complaints</h2>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Card className="shadow-sm">
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <div className="text-lg font-bold">{complaints.filter((c) => c.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <div className="text-lg font-bold">{complaints.filter((c) => c.status === "in_progress").length}</div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <div className="text-lg font-bold">{complaints.filter((c) => c.status === "resolved").length}</div>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints..."
            className="pl-9 rounded-full h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-9 rounded-full">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Plumbing">Plumbing</SelectItem>
              <SelectItem value="Electrical">Electrical</SelectItem>
              <SelectItem value="Carpentry">Carpentry</SelectItem>
              <SelectItem value="Common Area">Common Area</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-9 mb-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-0">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint.id} className="overflow-hidden shadow-sm">
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm">{complaint.title}</h3>
                  {statusBadge(complaint.status)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{complaint.date}</span>
                  <span className="mx-1">•</span>
                  <Badge variant="outline" className="font-normal text-xs">
                    {complaint.category}
                  </Badge>
                </div>
                <div className="flex items-center mt-2">
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarImage src={complaint.resident.avatarUrl} />
                    <AvatarFallback>{complaint.resident.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <span className="font-medium">{complaint.resident.name}</span>
                    <span className="text-muted-foreground ml-1">({complaint.resident.flat})</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    {complaint.comments.length > 0 ? (
                      <div className="flex items-center">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        <span>{complaint.comments.length} comments</span>
                      </div>
                    ) : (
                      <span>No comments yet</span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs px-2"
                    onClick={() => handleViewDetails(complaint)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredComplaints.length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">No complaints found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-3 mt-0">
          {filteredComplaints
            .filter((complaint) => complaint.status === "pending" || complaint.status === "in_progress")
            .map((complaint) => (
              <Card key={complaint.id} className="overflow-hidden shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{complaint.title}</h3>
                    {statusBadge(complaint.status)}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{complaint.date}</span>
                    <span className="mx-1">•</span>
                    <Badge variant="outline" className="font-normal text-xs">
                      {complaint.category}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarImage src={complaint.resident.avatarUrl} />
                      <AvatarFallback>{complaint.resident.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">
                      <span className="font-medium">{complaint.resident.name}</span>
                      <span className="text-muted-foreground ml-1">({complaint.resident.flat})</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t">
                    <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                      Assign
                    </Button>
                    <Button size="sm" className="h-7 text-xs px-2" onClick={() => handleViewDetails(complaint)}>
                      Respond
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          {filteredComplaints.filter(
            (complaint) => complaint.status === "pending" || complaint.status === "in_progress",
          ).length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">No pending complaints</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-3 mt-0">
          {filteredComplaints
            .filter((complaint) => complaint.status === "resolved")
            .map((complaint) => (
              <Card key={complaint.id} className="overflow-hidden shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{complaint.title}</h3>
                    {statusBadge(complaint.status)}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{complaint.date}</span>
                    <span className="mx-1">•</span>
                    <Badge variant="outline" className="font-normal text-xs">
                      {complaint.category}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarImage src={complaint.resident.avatarUrl} />
                      <AvatarFallback>{complaint.resident.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">
                      <span className="font-medium">{complaint.resident.name}</span>
                      <span className="text-muted-foreground ml-1">({complaint.resident.flat})</span>
                    </div>
                  </div>
                  <div className="flex justify-end items-center mt-3 pt-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => handleViewDetails(complaint)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          {filteredComplaints.filter((complaint) => complaint.status === "resolved").length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">No resolved complaints</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Complaint Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>View and respond to the complaint.</DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="py-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-base font-medium">{selectedComplaint.title}</h3>
                {statusBadge(selectedComplaint.status)}
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <p className="mt-1 text-sm">{selectedComplaint.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Category</Label>
                    <p className="mt-1 text-sm font-medium">{selectedComplaint.category}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Date Reported</Label>
                    <p className="mt-1 text-sm font-medium">{selectedComplaint.date}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-muted rounded-lg">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={selectedComplaint.resident.avatarUrl} />
                    <AvatarFallback>{selectedComplaint.resident.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{selectedComplaint.resident.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Home className="mr-1 h-3 w-3" />
                      <span>Flat {selectedComplaint.resident.flat}</span>
                    </div>
                  </div>
                </div>

                {selectedComplaint.comments.length > 0 && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Comments</Label>
                    <div className="space-y-3 mt-2">
                      {selectedComplaint.comments.map((comment: any) => (
                        <div key={comment.id} className="p-3 bg-muted rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium">{comment.user}</p>
                            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedComplaint.status !== "resolved" && (
                  <div>
                    <Label htmlFor="response">Add Response</Label>
                    <Textarea id="response" placeholder="Type your response here..." className="mt-1" />
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedComplaint && selectedComplaint.status !== "resolved" && (
              <>
                <Button variant="outline" size="sm">
                  {selectedComplaint.status === "pending" ? "Assign to Maintenance" : "Update Status"}
                </Button>
                <Button size="sm">Send Response</Button>
              </>
            )}
            {selectedComplaint && selectedComplaint.status === "resolved" && (
              <Button size="sm" onClick={() => setShowDetailsDialog(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

