"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreVertical, Calendar, Download, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)

  // Sample payments data
  const payments = [
    {
      id: 1,
      title: "Maintenance Fee - April 2023",
      type: "Maintenance",
      amount: 350000,
      dueDate: "Apr 15, 2023",
      status: "pending",
      totalFlats: 140,
      paidFlats: 85,
    },
    {
      id: 2,
      title: "Water Bill - March 2023",
      type: "Utility",
      amount: 120000,
      dueDate: "Apr 20, 2023",
      status: "pending",
      totalFlats: 140,
      paidFlats: 95,
    },
    {
      id: 3,
      title: "Electricity Bill - March 2023",
      type: "Utility",
      amount: 280000,
      dueDate: "Apr 18, 2023",
      status: "pending",
      totalFlats: 140,
      paidFlats: 90,
    },
    {
      id: 4,
      title: "Maintenance Fee - March 2023",
      type: "Maintenance",
      amount: 350000,
      dueDate: "Mar 15, 2023",
      status: "completed",
      totalFlats: 140,
      paidFlats: 140,
      completedDate: "Mar 25, 2023",
    },
    {
      id: 5,
      title: "Water Bill - February 2023",
      type: "Utility",
      amount: 115000,
      dueDate: "Mar 20, 2023",
      status: "completed",
      totalFlats: 140,
      paidFlats: 140,
      completedDate: "Mar 22, 2023",
    },
  ]

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || payment.type === filterType
    return matchesSearch && matchesFilter
  })

  // Calculate total amounts
  const pendingTotal = filteredPayments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const collectedTotal = filteredPayments
    .filter((payment) => payment.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Payments Management</h2>
        <Button size="sm" onClick={() => setShowGenerateDialog(true)}>
          <CreditCard className="mr-2 h-4 w-4" />
          Generate Bill
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">₹{(pendingTotal / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">Pending Collection</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">₹{(collectedTotal / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">Collected This Month</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
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
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Utility">Utility</SelectItem>
            <SelectItem value="Facility">Facility</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4 mt-4">
          {filteredPayments
            .filter((payment) => payment.status === "pending")
            .map((payment) => (
              <Card key={payment.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{payment.title}</h3>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>Due: {payment.dueDate}</span>
                      <span className="mx-1">•</span>
                      <Badge variant="outline" className="font-normal text-xs">
                        {payment.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold">₹{payment.amount.toLocaleString()}</p>
                      <p className="text-sm">
                        <span className="font-medium">{payment.paidFlats}</span>
                        <span className="text-muted-foreground">/{payment.totalFlats} flats paid</span>
                      </p>
                    </div>
                  </div>
                  <div className="border-t px-4 py-3 flex justify-between">
                    <Button variant="outline" size="sm" className="h-8">
                      Send Reminder
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          {filteredPayments.filter((payment) => payment.status === "pending").length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No pending payments</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          {filteredPayments
            .filter((payment) => payment.status === "completed")
            .map((payment) => (
              <Card key={payment.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{payment.title}</h3>
                      <Badge className="bg-green-500 text-white">Completed</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>Completed: {payment.completedDate}</span>
                      <span className="mx-1">•</span>
                      <Badge variant="outline" className="font-normal text-xs">
                        {payment.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold">₹{payment.amount.toLocaleString()}</p>
                      <p className="text-sm">
                        <span className="font-medium">{payment.paidFlats}</span>
                        <span className="text-muted-foreground">/{payment.totalFlats} flats paid</span>
                      </p>
                    </div>
                  </div>
                  <div className="border-t px-4 py-3 flex justify-end">
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          {filteredPayments.filter((payment) => payment.status === "completed").length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p>No completed payments</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Generate Bill Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate New Bill</DialogTitle>
            <DialogDescription>Create a new bill to be sent to all residents.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Bill Title</Label>
              <Input id="title" placeholder="e.g. Maintenance Fee - May 2023" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Bill Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select bill type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="utility">Utility</SelectItem>
                  <SelectItem value="facility">Facility</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input id="amount" type="number" placeholder="e.g. 3500" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="building">Building</Label>
              <Select>
                <SelectTrigger id="building">
                  <SelectValue placeholder="Select building" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buildings</SelectItem>
                  <SelectItem value="a">Block A</SelectItem>
                  <SelectItem value="b">Block B</SelectItem>
                  <SelectItem value="c">Block C</SelectItem>
                  <SelectItem value="d">Block D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGenerateDialog(false)}>
              Cancel
            </Button>
            <Button>Generate Bill</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

