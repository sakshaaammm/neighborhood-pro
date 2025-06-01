"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, User, Users, MessageSquare } from "lucide-react"
import { mockChats } from "@/lib/mock-data"

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(null)
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState([])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Load chats from localStorage or use mock data
    const storedChats = localStorage.getItem("chats")
    const chatData = storedChats ? JSON.parse(storedChats) : mockChats
    setChats(chatData)

    // Set first chat as active if none is selected
    if (chatData.length > 0 && !activeChat) {
      setActiveChat(chatData[0])
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeChat])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!message.trim() || !activeChat) return

    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: message,
      timestamp: new Date().toISOString(),
    }

    // Add message to active chat
    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: message,
          lastMessageTime: new Date().toISOString(),
        }
      }
      return chat
    })

    // Update state and localStorage
    setChats(updatedChats)
    localStorage.setItem("chats", JSON.stringify(updatedChats))

    // Update active chat
    const updatedActiveChat = updatedChats.find((chat) => chat.id === activeChat.id)
    setActiveChat(updatedActiveChat)

    // Clear input
    setMessage("")

    // Simulate response after a delay
    setTimeout(() => {
      const responseMessage = {
        id: Date.now().toString(),
        sender: "authority",
        text: getRandomResponse(),
        timestamp: new Date().toISOString(),
      }

      const chatsWithResponse = updatedChats.map((chat) => {
        if (chat.id === activeChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, responseMessage],
            lastMessage: responseMessage.text,
            lastMessageTime: new Date().toISOString(),
            unread: chat.id !== activeChat.id ? (chat.unread || 0) + 1 : 0,
          }
        }
        return chat
      })

      setChats(chatsWithResponse)
      localStorage.setItem("chats", JSON.stringify(chatsWithResponse))

      // Update active chat
      const updatedActiveChat = chatsWithResponse.find((chat) => chat.id === activeChat.id)
      setActiveChat(updatedActiveChat)
    }, 1000)
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date)
    }
  }

  const getRandomResponse = () => {
    const responses = [
      "Thank you for reporting this issue. We'll look into it right away.",
      "We've noted your concern and will dispatch a team to investigate.",
      "Your report has been logged. We appreciate your help in keeping the neighborhood clean and safe.",
      "We're currently working on similar issues in your area. We'll add this to our priority list.",
      "Thanks for bringing this to our attention. Could you provide any additional details that might help us address this more effectively?",
      "We've assigned this case to our local team. They should be addressing it within 48 hours.",
      "This is an ongoing issue we're aware of. We're working with the city council to find a permanent solution.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 slide-in">Chat with Authorities</h1>
      <p className="text-gray-400 mb-6 slide-in">Communicate directly with local officials about neighborhood issues</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-black border border-gray-800 lg:col-span-1 pop-in">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Your active chats with authorities</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="authorities">
              <div className="px-6 pt-2">
                <TabsList className="bg-gray-900 w-full">
                  <TabsTrigger value="authorities" className="flex-1">
                    Authorities
                  </TabsTrigger>
                  <TabsTrigger value="community" className="flex-1">
                    Community
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="authorities" className="m-0">
                <div className="divide-y divide-gray-800 max-h-[500px] overflow-y-auto">
                  {chats
                    .filter((chat) => chat.type === "authority")
                    .map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex items-center gap-3 p-3 hover:bg-gray-900/50 cursor-pointer transition-colors ${activeChat?.id === chat.id ? "bg-gray-900/70" : ""}`}
                        onClick={() => setActiveChat(chat)}
                      >
                        <Avatar className="h-10 w-10 border border-gray-700">
                          <AvatarImage src={chat.avatar || "/placeholder.svg?height=40&width=40"} />
                          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="font-medium truncate">{chat.name}</p>
                            <span className="text-xs text-gray-400">{formatDate(chat.lastMessageTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <p className="text-sm text-gray-400 truncate flex-1">{chat.lastMessage}</p>
                            {chat.unread > 0 && <Badge className="ml-2 bg-primary text-white">{chat.unread}</Badge>}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="community" className="m-0">
                <div className="divide-y divide-gray-800 max-h-[500px] overflow-y-auto">
                  {chats
                    .filter((chat) => chat.type === "community")
                    .map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex items-center gap-3 p-3 hover:bg-gray-900/50 cursor-pointer transition-colors ${activeChat?.id === chat.id ? "bg-gray-900/70" : ""}`}
                        onClick={() => setActiveChat(chat)}
                      >
                        <Avatar className="h-10 w-10 border border-gray-700">
                          <AvatarImage src={chat.avatar || "/placeholder.svg?height=40&width=40"} />
                          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="font-medium truncate">{chat.name}</p>
                            <span className="text-xs text-gray-400">{formatDate(chat.lastMessageTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <p className="text-sm text-gray-400 truncate flex-1">{chat.lastMessage}</p>
                            {chat.unread > 0 && <Badge className="ml-2 bg-primary text-white">{chat.unread}</Badge>}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-black border border-gray-800 lg:col-span-3 flex flex-col pop-in">
          {activeChat ? (
            <>
              <CardHeader className="border-b border-gray-800 pb-3">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3 border border-gray-700">
                    <AvatarImage src={activeChat.avatar || "/placeholder.svg?height=40&width=40"} />
                    <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{activeChat.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      {activeChat.type === "authority" ? (
                        <>
                          <Users className="h-3 w-3 mr-1" />
                          <span>{activeChat.department}</span>
                        </>
                      ) : (
                        <>
                          <User className="h-3 w-3 mr-1" />
                          <span>Community Member</span>
                        </>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[500px]">
                {activeChat.messages.map((msg, index) => {
                  const isUser = msg.sender === "user"
                  return (
                    <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
                        {!isUser && (
                          <Avatar className="h-8 w-8 mb-1 border border-gray-700">
                            <AvatarImage src={activeChat.avatar || "/placeholder.svg?height=32&width=32"} />
                            <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            isUser ? "bg-primary text-white ml-auto" : "bg-gray-800 text-white"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <div className={`text-xs mt-1 ${isUser ? "text-primary-foreground/70" : "text-gray-400"}`}>
                            {formatTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </CardContent>

              <CardFooter className="border-t border-gray-800 p-4">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-gray-900 border-gray-700"
                  />
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          ) : (
            <div className="flex items-center justify-center h-full p-8 text-center text-gray-400">
              <div>
                <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
                <p>Choose a conversation from the list to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
