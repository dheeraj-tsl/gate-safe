"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"

interface AddVisitorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddVisitorDialog({ open, onOpenChange }: AddVisitorDialogProps) {
  const [visitorType, setVisitorType] = useState("Guest")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>Add New Visitor</DialogTitle>
          <DialogDescription>Pre-approve a visitor to grant them access</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="visitor-type">Visitor Type</Label>
            <RadioGroup
              id="visitor-type"
              defaultValue="Guest"
              onValueChange={setVisitorType}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2 rounded-lg border p-3">
                <RadioGroupItem value="Guest" id="guest" />
                <Label htmlFor="guest" className="flex-1 cursor-pointer">
                  Guest
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-3">
                <RadioGroupItem value="Delivery" id="delivery" />
                <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                  Delivery
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-3">
                <RadioGroupItem value="Service" id="service" />
                <Label htmlFor="service" className="flex-1 cursor-pointer">
                  Service Personnel
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Visitor Name</Label>
            <Input id="name" placeholder="Enter visitor name" className="rounded-xl" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+91 XXXXX XXXXX" className="rounded-xl" />
          </div>

          {visitorType === "Service" && (
            <div className="grid gap-2">
              <Label htmlFor="service-type">Service Type</Label>
              <Select>
                <SelectTrigger id="service-type" className="rounded-xl">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Visit Date</Label>
              <Input id="date" type="date" className="rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Visit Time</Label>
              <Input id="time" type="time" className="rounded-xl" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="purpose">Purpose of Visit</Label>
            <Textarea id="purpose" placeholder="Briefly describe the purpose of visit" className="rounded-xl" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="rounded-xl">
            <Check className="mr-2 h-4 w-4" />
            Pre-approve Visitor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

