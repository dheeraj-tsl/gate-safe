import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Pin } from "lucide-react"

interface NoticeCardProps {
  title: string
  date: string
  type: string
  description: string
  isPinned?: boolean
}

const typeColors = {
  Community: "bg-blue-100 text-blue-800 border-blue-200",
  Maintenance: "bg-orange-100 text-orange-800 border-orange-200",
  Information: "bg-green-100 text-green-800 border-green-200",
  Emergency: "bg-red-100 text-red-800 border-red-200",
}

export function NoticeCard({ title, date, type, description, isPinned = false }: NoticeCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center">
            <CardTitle className="text-lg font-heading">{title}</CardTitle>
            {isPinned && <Pin className="ml-2 h-4 w-4 text-secondary" />}
          </div>
          <Badge
            className={`${typeColors[type as keyof typeof typeColors] || "bg-gray-100 text-gray-800 border-gray-200"}`}
            variant="outline"
          >
            {type}
          </Badge>
        </div>
        <CardDescription className="flex items-center">
          <Calendar className="mr-1 h-3 w-3" />
          {date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

