"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Bell,
  Shield,
  Palette,
  Settings,
  Save,
  User,
  Building,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Settings</h2>
        <Button size="sm">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex">
                    <User className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                    <Input id="name" defaultValue="Admin User" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex">
                    <Mail className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                    <Input id="email" type="email" defaultValue="admin@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <Phone className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                    <Input id="phone" type="tel" defaultValue="+91 9876543210" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="flex">
                    <Building className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                    <Select defaultValue="admin">
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Property Manager</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" className="min-h-[100px]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode" className="font-medium">
                      Maintenance Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enable maintenance mode to prevent user access during updates
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics" className="font-medium">
                      Usage Analytics
                    </Label>
                    <p className="text-sm text-muted-foreground">Collect anonymous usage data to improve the system</p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="backup" className="font-medium">
                      Automatic Backups
                    </Label>
                    <p className="text-sm text-muted-foreground">Schedule automatic backups of system data</p>
                  </div>
                  <Switch id="backup" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications" className="font-medium">
                      SMS Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications" className="font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>Select which types of notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-complaints" className="font-medium">
                      New Complaints
                    </Label>
                    <p className="text-sm text-muted-foreground">Notify when new complaints are submitted</p>
                  </div>
                  <Switch id="new-complaints" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payment-reminders" className="font-medium">
                      Payment Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">Send reminders for upcoming and overdue payments</p>
                  </div>
                  <Switch id="payment-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="visitor-alerts" className="font-medium">
                      Visitor Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">Notify when visitors are registered</p>
                  </div>
                  <Switch id="visitor-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-updates" className="font-medium">
                      Maintenance Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">Updates on maintenance requests and schedules</p>
                  </div>
                  <Switch id="maintenance-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="community-events" className="font-medium">
                      Community Events
                    </Label>
                    <p className="text-sm text-muted-foreground">Notifications about upcoming community events</p>
                  </div>
                  <Switch id="community-events" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure additional security settings for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor" className="font-medium">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="session-timeout" className="font-medium">
                      Session Timeout
                    </Label>
                    <p className="text-sm text-muted-foreground">Automatically log out after a period of inactivity</p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="timeout-duration" className="font-medium">
                      Timeout Duration (minutes)
                    </Label>
                    <span className="text-sm">30 minutes</span>
                  </div>
                  <Slider defaultValue={[30]} max={60} step={5} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="login-alerts" className="font-medium">
                      Login Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive alerts for new login attempts</p>
                  </div>
                  <Switch id="login-alerts" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">Color Theme</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <Button variant="outline" className="justify-start">
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Monitor className="mr-2 h-4 w-4" />
                      System
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-size" className="font-medium">
                    Font Size
                  </Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations" className="font-medium">
                      Interface Animations
                    </Label>
                    <p className="text-sm text-muted-foreground">Enable animations throughout the interface</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-mode" className="font-medium">
                      Compact Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing to show more content</p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dashboard Layout</CardTitle>
              <CardDescription>Configure how your dashboard is displayed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sidebar-collapsed" className="font-medium">
                      Collapsed Sidebar by Default
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Start with the sidebar collapsed to maximize screen space
                    </p>
                  </div>
                  <Switch id="sidebar-collapsed" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-view" className="font-medium">
                    Default Dashboard View
                  </Label>
                  <Select defaultValue="overview">
                    <SelectTrigger>
                      <SelectValue placeholder="Select default view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overview">Overview</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="residents">Residents</SelectItem>
                      <SelectItem value="complaints">Complaints</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-welcome" className="font-medium">
                      Show Welcome Message
                    </Label>
                    <p className="text-sm text-muted-foreground">Display a welcome message on the dashboard</p>
                  </div>
                  <Switch id="show-welcome" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

