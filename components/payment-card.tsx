"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, CreditCard } from "lucide-react"

interface PaymentCardProps {
  title: string
  amount: number
  dueDate: string
  status: "pending" | "overdue" | "paid"
  showPayButton?: boolean
  onPayNow?: () => void
}

export function PaymentCard({ title, amount, dueDate, status, showPayButton = false, onPayNow }: PaymentCardProps) {
  return (
    <div className="p-3 bg-white rounded-xl border shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{title}</p>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <CalendarIcon className="mr-1 h-3 w-3" />
            <span>Due: {dueDate}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">₹{amount}</p>
          <Badge
            className={`${
              status === "pending" ? "bg-yellow-500" : status === "overdue" ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {status === "paid" ? "Paid" : status === "overdue" ? "Overdue" : "Pending"}
          </Badge>
        </div>
      </div>

      {showPayButton && status !== "paid" && (
        <Button size="sm" className="w-full mt-3 rounded-lg" onClick={onPayNow}>
          <CreditCard className="mr-2 h-4 w-4" />
          Pay Now
        </Button>
      )}
    </div>
  )
}

