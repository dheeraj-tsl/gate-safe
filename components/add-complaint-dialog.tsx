"use client"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Check, Upload } from "lucide-react"

interface AddComplaintDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddComplaintDialog({ open, onOpenChange }: AddComplaintDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Raise a Complaint</DialogTitle>
          <DialogDescription>Submit a maintenance request or report an issue in your apartment.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Complaint Title</Label>
            <Input id="title" placeholder="Enter a short title for your complaint" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Plumbing">Plumbing</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
                <SelectItem value="Carpentry">Carpentry</SelectItem>
                <SelectItem value="Common Area">Common Area</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe the issue in detail" className="min-h-[100px]" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Where is the issue located?" />
          </div>

          <div className="grid gap-2">
            <Label>Attach Images (Optional)</Label>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex h-[100px] cursor-pointer items-center justify-center rounded-md border border-dashed bg-muted hover:bg-muted/80">
                <div className="flex flex-col items-center gap-1 text-xs">
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            <Check className="mr-2 h-4 w-4" />
            Submit Complaint
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

