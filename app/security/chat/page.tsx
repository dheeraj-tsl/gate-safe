"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Phone, Video, MoreVertical, ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SecurityChatPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [messageText, setMessageText] = useState("")
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [showChatList, setShowChatList] = useState(true)

  // Sample chats data
  const chats = [
    {
      id: 1,
      name: "Admin Office",
      role: "Admin",
      unread: 2,
      lastMessage: "Please check the visitor log for today.",
      time: "10:30 AM",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AO",
      online: true,
      messages: [
        {
          id: 1,
          sender: "Admin Office",
          text: "Good morning! How's the security situation today?",
          time: "Yesterday, 9:30 AM",
          isUser: false,
        },
        {
          id: 2,
          sender: "You",
          text: "Good morning! Everything is under control. We had 5 visitors so far.",
          time: "Yesterday, 9:45 AM",
          isUser: true,
        },
        {
          id: 3,
          sender: "Admin Office",
          text: "Great! Please keep an eye on the main gate. We're expecting a delivery around noon.",
          time: "Yesterday, 10:00 AM",
          isUser: false,
        },
        {
          id: 4,
          sender: "Admin Office",
          text: "Please check the visitor log for today.",
          time: "10:30 AM",
          isUser: false,
        },
      ],
    },
    {
      id: 2,
      name: "Maintenance Team",
      role: "Maintenance",
      unread: 0,
      lastMessage: "The CCTV in Block C is now fixed.",
      time: "Yesterday",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=MT",
      online: false,
      messages: [
        {
          id: 1,
          sender: "You",
          text: "The CCTV camera in Block C is not working properly.",
          time: "Apr 10, 2023, 11:20 AM",
          isUser: true,
        },
        {
          id: 2,
          sender: "Maintenance Team",
          text: "Thanks for reporting. We'll check it today.",
          time: "Apr 10, 2023, 11:45 AM",
          isUser: false,
        },
        {
          id: 3,
          sender: "Maintenance Team",
          text: "The CCTV in Block C is now fixed.",
          time: "Apr 10, 2023, 3:30 PM",
          isUser: false,
        },
      ],
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      role: "Resident (B-404)",
      unread: 1,
      lastMessage: "Is my visitor approved?",
      time: "9:15 AM",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=RK",
      online: true,
      messages: [
        {
          id: 1,
          sender: "Rajesh Kumar",
          text: "Hello, I've registered a visitor for today at 11 AM.",
          time: "9:00 AM",
          isUser: false,
        },
        {
          id: 2,
          sender: "You",
          text: "Yes, I can see the registration. We'll process it.",
          time: "9:05 AM",
          isUser: true,
        },
        {
          id: 3,
          sender: "Rajesh Kumar",
          text: "Is my visitor approved?",
          time: "9:15 AM",
          isUser: false,
        },
      ],
    },
    {
      id: 4,
      name: "Priya Sharma",
      role: "Resident (A-202)",
      unread: 0,
      lastMessage: "Thank you for your help!",
      time: "Yesterday",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=PS",
      online: false,
      messages: [
        {
          id: 1,
          sender: "Priya Sharma",
          text: "Hi, there's a suspicious person near the playground.",
          time: "Yesterday, 4:30 PM",
          isUser: false,
        },
        {
          id: 2,
          sender: "You",
          text: "I'll check it immediately. Can you provide any details?",
          time: "Yesterday, 4:32 PM",
          isUser: true,
        },
        {
          id: 3,
          sender: "Priya Sharma",
          text: "He's wearing a black jacket and seems to be taking photos.",
          time: "Yesterday, 4:35 PM",
          isUser: false,
        },
        {
          id: 4,
          sender: "You",
          text: "I've checked the area. It was a new resident taking photos of the property. Everything is fine.",
          time: "Yesterday, 4:45 PM",
          isUser: true,
        },
        {
          id: 5,
          sender: "Priya Sharma",
          text: "Thank you for your help!",
          time: "Yesterday, 4:50 PM",
          isUser: false,
        },
      ],
    },
  ]

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      // In a real app, this would send the message to your backend
      setMessageText("")
    }
  }

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId)
    setShowChatList(false)
  }

  const handleBackToList = () => {
    setShowChatList(true)
  }

  return (
    <div className="space-y-4 pb-16 md:pb-0">
      <h2 className="text-xl font-bold">Messages</h2>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
        <div className="flex flex-col h-[70vh] md:h-[75vh]">
          {/* Mobile view handling */}
          <div className={`${showChatList ? "block" : "hidden"} md:block md:w-1/3 border-r h-full`}>
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-9 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 h-10">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="m-0">
                <div className="overflow-y-auto h-[calc(70vh-110px)] md:h-[calc(75vh-110px)]">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                        selectedChat === chat.id ? "bg-gray-50" : ""
                      }`}
                      onClick={() => handleChatSelect(chat.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={chat.avatarUrl} />
                            <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium truncate">{chat.name}</p>
                            <p className="text-xs text-muted-foreground">{chat.time}</p>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.role}</p>
                          <p className="text-xs truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && <Badge className="ml-2 bg-primary">{chat.unread}</Badge>}
                      </div>
                    </div>
                  ))}
                  {filteredChats.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">
                      <p>No conversations found</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="m-0">
                <div className="overflow-y-auto h-[calc(70vh-110px)] md:h-[calc(75vh-110px)]">
                  {filteredChats
                    .filter((chat) => chat.unread > 0)
                    .map((chat) => (
                      <div
                        key={chat.id}
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                          selectedChat === chat.id ? "bg-gray-50" : ""
                        }`}
                        onClick={() => handleChatSelect(chat.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={chat.avatarUrl} />
                              <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            {chat.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <p className="font-medium truncate">{chat.name}</p>
                              <p className="text-xs text-muted-foreground">{chat.time}</p>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{chat.role}</p>
                            <p className="text-xs truncate">{chat.lastMessage}</p>
                          </div>
                          <Badge className="ml-2 bg-primary">{chat.unread}</Badge>
                        </div>
                      </div>
                    ))}
                  {filteredChats.filter((chat) => chat.unread > 0).length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">
                      <p>No unread messages</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className={`${showChatList ? "hidden" : "flex"} md:flex md:w-2/3 flex-col h-full`}>
            {selectedChat ? (
              <>
                <div className="border-b p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="icon" className="md:hidden" onClick={handleBackToList}>
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Avatar>
                        <AvatarImage src={chats.find((chat) => chat.id === selectedChat)?.avatarUrl} />
                        <AvatarFallback>
                          {chats
                            .find((chat) => chat.id === selectedChat)
                            ?.name.substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{chats.find((chat) => chat.id === selectedChat)?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {chats.find((chat) => chat.id === selectedChat)?.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {chats
                    .find((chat) => chat.id === selectedChat)
                    ?.messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                        {!message.isUser && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage src={chats.find((chat) => chat.id === selectedChat)?.avatarUrl} />
                            <AvatarFallback>{message.sender.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[75%] p-3 rounded-lg ${
                            message.isUser ? "bg-primary text-primary-foreground" : "bg-white border"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-[10px] opacity-70 mt-1 text-right">{message.time}</p>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="border-t p-3 flex items-center gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="rounded-full"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    className="rounded-full h-10 w-10 flex-shrink-0"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Your Messages</h3>
                <p className="max-w-sm">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

