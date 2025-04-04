import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Package, User, UserCheck, UserX } from "lucide-react"

interface VisitorCardProps {
  name: string
  status: "pending" | "approved" | "completed" | "rejected"
  time: string
  type: "Guest" | "Delivery" | "Service"
  showActions?: boolean
}

const statusColors = {
  pending: "bg-yellow-500",
  approved: "bg-green-500",
  completed: "bg-blue-500",
  rejected: "bg-red-500",
}

const typeIcons = {
  Guest: User,
  Delivery: Package,
  Service: Clock,
}

export function VisitorCard({ name, status, time, type, showActions = false }: VisitorCardProps) {
  const StatusIcon = typeIcons[type]

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border shadow-sm">
      <Avatar>
        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium truncate">{name}</p>
          <Badge className={`ml-2 ${statusColors[status]} text-white`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <StatusIcon className="mr-1 h-3 w-3" />
          <span>{type}</span>
          <span className="mx-1">•</span>
          <Calendar className="mr-1 h-3 w-3" />
          <span>{time}</span>
        </div>

        {showActions && status === "pending" && (
          <div className="flex justify-end gap-2 mt-2">
            <Button size="sm" variant="outline" className="h-8 rounded-lg">
              <UserX className="mr-1 h-3 w-3" />
              Reject
            </Button>
            <Button size="sm" className="h-8 rounded-lg">
              <UserCheck className="mr-1 h-3 w-3" />
              Approve
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

