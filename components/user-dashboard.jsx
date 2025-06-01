"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MapPin,
  Plus,
  Trophy,
  Star,
  MessageCircle,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  Award,
  Target,
  Users,
  LogOut,
  User,
} from "lucide-react"

const initialIssues = [
  {
    id: 1,
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues",
    category: "Roads",
    status: "In Progress",
    location: "Main Street, Block A",
    reportedBy: "John Doe",
    date: "2024-01-15",
    priority: "High",
    points: 50,
  },
  {
    id: 2,
    title: "Broken Streetlight",
    description: "Streetlight not working for 3 days",
    category: "Lighting",
    status: "Pending",
    location: "Park Avenue, Block B",
    reportedBy: "Jane Smith",
    date: "2024-01-14",
    priority: "Medium",
    points: 30,
  },
  {
    id: 3,
    title: "Garbage Collection Missed",
    description: "Garbage not collected for 2 weeks",
    category: "Sanitation",
    status: "Resolved",
    location: "Oak Street, Block C",
    reportedBy: "Mike Johnson",
    date: "2024-01-10",
    priority: "High",
    points: 40,
  },
]

export default function UserDashboard({ user, onLogout }) {
  const [issues, setIssues] = useState([])
  const [userPoints, setUserPoints] = useState(user.points || 120)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [showChatDialog, setShowChatDialog] = useState(false)
  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    priority: "Medium",
  })

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Authority",
      message: "We've received your report about the pothole. Our team will inspect it within 24 hours.",
      timestamp: "10:30 AM",
      isAuthority: true,
    },
    {
      id: 2,
      sender: "You",
      message: "Thank you for the quick response! When can we expect the repair?",
      timestamp: "10:35 AM",
      isAuthority: false,
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    // Load issues from localStorage or use initial data
    const savedIssues = localStorage.getItem("neighborhoodIssues")
    if (savedIssues) {
      setIssues(JSON.parse(savedIssues))
    } else {
      setIssues(initialIssues)
      localStorage.setItem("neighborhoodIssues", JSON.stringify(initialIssues))
    }

    // Load user points
    const savedPoints = localStorage.getItem(`userPoints_${user.username}`)
    if (savedPoints) {
      setUserPoints(Number.parseInt(savedPoints))
    }
  }, [user.username])

  const categories = [
    "Roads",
    "Lighting",
    "Sanitation",
    "Water",
    "Infrastructure",
    "Public Safety",
    "Environment",
    "Transportation",
  ]

  const priorities = ["Low", "Medium", "High", "Critical"]

  const statusColors = {
    Pending: "bg-yellow-500",
    "In Progress": "bg-blue-500",
    Resolved: "bg-green-500",
    Rejected: "bg-red-500",
  }

  const priorityColors = {
    Low: "bg-gray-500",
    Medium: "bg-yellow-500",
    High: "bg-orange-500",
    Critical: "bg-red-500",
  }

  const handleReportIssue = () => {
    if (newIssue.title && newIssue.description && newIssue.category && newIssue.location) {
      const issue = {
        id: Date.now(),
        ...newIssue,
        status: "Pending",
        reportedBy: user.name,
        date: new Date().toISOString().split("T")[0],
        points:
          newIssue.priority === "Critical"
            ? 60
            : newIssue.priority === "High"
              ? 50
              : newIssue.priority === "Medium"
                ? 30
                : 20,
      }

      const updatedIssues = [issue, ...issues]
      setIssues(updatedIssues)
      localStorage.setItem("neighborhoodIssues", JSON.stringify(updatedIssues))

      const newPoints = userPoints + issue.points
      setUserPoints(newPoints)
      localStorage.setItem(`userPoints_${user.username}`, newPoints.toString())

      setNewIssue({
        title: "",
        description: "",
        category: "",
        location: "",
        priority: "Medium",
      })
      setShowReportDialog(false)

      // Trigger celebration animation
      triggerCelebration()
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isAuthority: false,
      }
      setChatMessages([...chatMessages, message])
      setNewMessage("")
    }
  }

  const triggerCelebration = () => {
    const celebration = document.createElement("div")
    celebration.innerHTML = "🎉"
    celebration.style.position = "fixed"
    celebration.style.top = "50%"
    celebration.style.left = "50%"
    celebration.style.fontSize = "4rem"
    celebration.style.zIndex = "9999"
    celebration.style.animation = "bounce 1s ease-in-out"
    document.body.appendChild(celebration)

    setTimeout(() => {
      document.body.removeChild(celebration)
    }, 1000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="w-4 h-4" />
      case "In Progress":
        return <Clock className="w-4 h-4" />
      case "Pending":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                NeighborFix
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2">
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>

              <div className="flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{userPoints} pts</span>
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Level {user.level}
                </Badge>
              </div>

              <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-white">Chat with Authorities</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <ScrollArea className="h-64 w-full">
                      <div className="space-y-3 p-2">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className={`flex ${msg.isAuthority ? "justify-start" : "justify-end"}`}>
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                msg.isAuthority ? "bg-gray-700 text-white" : "bg-blue-600 text-white"
                              }`}
                            >
                              <p className="text-sm">{msg.message}</p>
                              <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Button onClick={handleSendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" size="sm" onClick={onLogout} className="text-red-400 hover:text-red-300">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Reports</p>
                  <p className="text-xl font-bold text-white">{issues.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Resolved</p>
                  <p className="text-xl font-bold text-white">
                    {issues.filter((issue) => issue.status === "Resolved").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Your Points</p>
                  <p className="text-xl font-bold text-white">{userPoints}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Your Reports</p>
                  <p className="text-xl font-bold text-white">
                    {issues.filter((issue) => issue.reportedBy === user.name).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Issues List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Recent Issues</h2>
              <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-white">Report New Issue</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Issue Title"
                      value={newIssue.title}
                      onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Textarea
                      placeholder="Describe the issue..."
                      value={newIssue.description}
                      onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Select onValueChange={(value) => setNewIssue({ ...newIssue, category: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category} className="text-white">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Location"
                      value={newIssue.location}
                      onChange={(e) => setNewIssue({ ...newIssue, location: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Select onValueChange={(value) => setNewIssue({ ...newIssue, priority: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority} className="text-white">
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleReportIssue}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Submit Report
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {issues.map((issue) => (
                <Card
                  key={issue.id}
                  className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{issue.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{issue.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{issue.location}</span>
                          <span>•</span>
                          <span>{issue.date}</span>
                          <span>•</span>
                          <span>by {issue.reportedBy}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={`${statusColors[issue.status]} text-white`}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(issue.status)}
                            <span>{issue.status}</span>
                          </div>
                        </Badge>
                        <Badge className={`${priorityColors[issue.priority]} text-white`}>{issue.priority}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {issue.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-medium">{issue.points} pts</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span>Community Leaders</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Alex Chen", points: 450, rank: 1 },
                  { name: "Sarah Wilson", points: 380, rank: 2 },
                  { name: "Mike Rodriguez", points: 320, rank: 3 },
                  { name: user.name, points: userPoints, rank: 12 },
                ].map((leaderUser, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        leaderUser.rank <= 3 ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"
                      }`}
                    >
                      {leaderUser.rank}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gray-700 text-white text-xs">
                        {leaderUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{leaderUser.name}</p>
                      <p className="text-xs text-gray-400">{leaderUser.points} points</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={() => setShowReportDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Report New Issue
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={() => setShowChatDialog(true)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Authorities
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Community Group
                </Button>
              </CardContent>
            </Card>

            {/* Achievement Badge */}
            <Card className="bg-gradient-to-br from-purple-900 to-pink-900 border-purple-700">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-semibold text-white mb-1">Community Hero</h3>
                <p className="text-xs text-purple-200">
                  You're making a difference! Keep reporting issues to earn more points.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-30px) translateX(-50%);
          }
          60% {
            transform: translateY(-15px) translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
