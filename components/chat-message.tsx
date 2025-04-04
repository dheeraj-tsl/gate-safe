import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: string
  timestamp: string
  isUser: boolean
  sender: string
}

export function ChatMessage({ message, timestamp, isUser, sender }: ChatMessageProps) {
  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <Avatar className="h-8 w-8">
        <AvatarFallback>{sender.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className={cn("flex flex-col max-w-[80%]", isUser ? "items-end" : "items-start")}>
        <div className={cn("rounded-lg px-3 py-2 text-sm", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
          {message}
        </div>
        <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
      </div>
    </div>
  )
}

