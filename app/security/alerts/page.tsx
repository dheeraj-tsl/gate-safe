"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Search, CheckCircle, AlertTriangle, Info, Clock, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SecurityAlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState("all")

  // Sample alerts data
  const alerts = [
    {
      id: 1,
      title: "Fire Alarm Triggered",
      location: "Block B, Floor 3",
      time: "10:30 AM",
      date: "Today",
      priority: "high",
      status: "active",
      description: "Fire alarm triggered in Block B, 3rd floor. Please investigate immediately.",
    },
    {
      id: 2,
      title: "Unauthorized Access",
      location: "Main Gate",
      time: "09:15 AM",
      date: "Today",
      priority: "medium",
      status: "active",
      description: "Unauthorized person attempted to enter through main gate. Please verify CCTV footage.",
    },
    {
      id: 3,
      title: "Water Leakage",
      location: "Block A, Floor 2",
      time: "Yesterday",
      date: "Apr 10, 2023",
      priority: "medium",
      status: "resolved",
      description: "Water leakage reported in Block A, 2nd floor corridor. Maintenance team has been notified.",
      resolvedAt: "Yesterday, 5:30 PM",
    },
    {
      id: 4,
      title: "Suspicious Activity",
      location: "Parking Area",
      time: "08:45 AM",
      date: "Apr 9, 2023",
      priority: "low",
      status: "resolved",
      description: "Suspicious activity reported in the parking area. Please increase patrolling.",
      resolvedAt: "Apr 9, 2023, 10:30 AM",
    },
    {
      id: 5,
      title: "Power Outage",
      location: "Entire Complex",
      time: "07:30 PM",
      date: "Apr 8, 2023",
      priority: "high",
      status: "resolved",
      description: "Power outage in the entire complex. Backup generators activated.",
      resolvedAt: "Apr 8, 2023, 9:45 PM",
    },
  ]

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPriority = filterPriority === "all" || alert.priority === filterPriority

    return matchesSearch && matchesPriority
  })

  const activeAlerts = filteredAlerts.filter((alert) => alert.status === "active")
  const resolvedAlerts = filteredAlerts.filter((alert) => alert.status === "resolved")

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Low</Badge>
      default:
        return null
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <Bell className="h-5 w-5 text-orange-500" />
      case "low":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4 pb-16 md:pb-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Security Alerts</h2>
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <div className="rounded-full bg-red-100 p-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-xl font-bold">
              {alerts.filter((a) => a.priority === "high" && a.status === "active").length}
            </div>
            <p className="text-xs text-red-700">High Priority</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <div className="rounded-full bg-orange-100 p-2 mb-2">
              <Bell className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-xl font-bold">
              {alerts.filter((a) => a.priority === "medium" && a.status === "active").length}
            </div>
            <p className="text-xs text-orange-700">Medium Priority</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <div className="rounded-full bg-blue-100 p-2 mb-2">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-xl font-bold">
              {alerts.filter((a) => a.priority === "low" && a.status === "active").length}
            </div>
            <p className="text-xs text-blue-700">Low Priority</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-9 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Filter Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-3 mt-3">
          {activeAlerts.map((alert) => (
            <Card key={alert.id} className="overflow-hidden bg-white shadow-sm border-l-4 border-l-red-500">
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-2">
                    {getPriorityIcon(alert.priority)}
                    <div>
                      <h3 className="font-medium text-sm">{alert.title}</h3>
                      <p className="text-xs text-muted-foreground">{alert.location}</p>
                    </div>
                  </div>
                  {getPriorityBadge(alert.priority)}
                </div>
                <p className="text-xs mb-2">{alert.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {alert.date}, {alert.time}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Mark as Resolved
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {activeAlerts.length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm">No active alerts</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="resolved" className="space-y-3 mt-3">
          {resolvedAlerts.map((alert) => (
            <Card key={alert.id} className="overflow-hidden bg-white shadow-sm border-l-4 border-l-green-500">
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-medium text-sm">{alert.title}</h3>
                      <p className="text-xs text-muted-foreground">{alert.location}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
                </div>
                <p className="text-xs mb-2">{alert.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {alert.date}, {alert.time}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    <span>Resolved: {alert.resolvedAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {resolvedAlerts.length === 0 && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm">No resolved alerts</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

