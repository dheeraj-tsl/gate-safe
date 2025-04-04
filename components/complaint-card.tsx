import { Badge } from "@/components/ui/badge"
import { Clock, Tag } from "lucide-react"

interface ComplaintCardProps {
  title: string
  category: string
  status: "pending" | "in_progress" | "resolved"
  date: string
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
}

const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  resolved: "Resolved",
}

export function ComplaintCard({ title, category, status, date }: ComplaintCardProps) {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-none">{title}</p>
          <Badge className={`${statusColors[status]} font-normal`} variant="outline">
            {statusLabels[status]}
          </Badge>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Tag className="mr-1 h-3 w-3" />
          <span>{category}</span>
          <span className="mx-1">•</span>
          <Clock className="mr-1 h-3 w-3" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  )
}

