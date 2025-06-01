"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Star,
  TrendingUp,
  LogOut,
  Award,
  X,
  Check,
} from "lucide-react"

export default function AuthorityDashboard({ user, onLogout }) {
  const [issues, setIssues] = useState([])
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [showResolveDialog, setShowResolveDialog] = useState(false)
  const [resolutionNote, setResolutionNote] = useState("")
  const [awardedPoints, setAwardedPoints] = useState(0)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  useEffect(() => {
    // Load issues from localStorage
    const savedIssues = localStorage.getItem("neighborhoodIssues")
    if (savedIssues) {
      setIssues(JSON.parse(savedIssues))
    }
  }, [])

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

  const handleStatusChange = (issueId, newStatus) => {
    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        return { ...issue, status: newStatus }
      }
      return issue
    })
    setIssues(updatedIssues)
    localStorage.setItem("neighborhoodIssues", JSON.stringify(updatedIssues))
  }

  const handleResolveIssue = () => {
    if (selectedIssue) {
      const updatedIssues = issues.map((issue) => {
        if (issue.id === selectedIssue.id) {
          return {
            ...issue,
            status: "Resolved",
            resolutionNote,
            resolvedBy: user.name,
            resolvedDate: new Date().toISOString().split("T")[0],
            awardedPoints: awardedPoints || issue.points,
          }
        }
        return issue
      })

      setIssues(updatedIssues)
      localStorage.setItem("neighborhoodIssues", JSON.stringify(updatedIssues))

      // Award points to the user who reported the issue
      const reporterUsername = getReporterUsername(selectedIssue.reportedBy)
      if (reporterUsername) {
        const currentPoints = Number.parseInt(localStorage.getItem(`userPoints_${reporterUsername}`) || "0")
        const newPoints = currentPoints + (awardedPoints || selectedIssue.points)
        localStorage.setItem(`userPoints_${reporterUsername}`, newPoints.toString())
      }

      setShowResolveDialog(false)
      setSelectedIssue(null)
      setResolutionNote("")
      setAwardedPoints(0)

      // Show success animation
      triggerSuccessAnimation()
    }
  }

  const getReporterUsername = (reporterName) => {
    // This is a simplified mapping - in a real app, you'd have proper user management
    const userMapping = {
      "John Doe": "user1",
      "Jane Smith": "user2",
    }
    return userMapping[reporterName]
  }

  const triggerSuccessAnimation = () => {
    const success = document.createElement("div")
    success.innerHTML = "✅"
    success.style.position = "fixed"
    success.style.top = "50%"
    success.style.left = "50%"
    success.style.fontSize = "4rem"
    success.style.zIndex = "9999"
    success.style.animation = "bounce 1s ease-in-out"
    document.body.appendChild(success)

    setTimeout(() => {
      document.body.removeChild(success)
    }, 1000)
  }

  const filteredIssues = issues.filter((issue) => {
    const statusMatch = filterStatus === "all" || issue.status === filterStatus
    const priorityMatch = filterPriority === "all" || issue.priority === filterPriority
    return statusMatch && priorityMatch
  })

  const stats = {
    total: issues.length,
    pending: issues.filter((i) => i.status === "Pending").length,
    inProgress: issues.filter((i) => i.status === "In Progress").length,
    resolved: issues.filter((i) => i.status === "Resolved").length,
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Authority Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>

              <div className="flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2">
                <span className="text-sm text-gray-400">{user.department}</span>
              </div>

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
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Issues</p>
                  <p className="text-xl font-bold text-white">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Pending</p>
                  <p className="text-xl font-bold text-white">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">In Progress</p>
                  <p className="text-xl font-bold text-white">{stats.inProgress}</p>
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
                  <p className="text-xl font-bold text-white">{stats.resolved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Label className="text-white">Status:</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32 bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all" className="text-white">
                      All
                    </SelectItem>
                    <SelectItem value="Pending" className="text-white">
                      Pending
                    </SelectItem>
                    <SelectItem value="In Progress" className="text-white">
                      In Progress
                    </SelectItem>
                    <SelectItem value="Resolved" className="text-white">
                      Resolved
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Label className="text-white">Priority:</Label>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-32 bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all" className="text-white">
                      All
                    </SelectItem>
                    <SelectItem value="Critical" className="text-white">
                      Critical
                    </SelectItem>
                    <SelectItem value="High" className="text-white">
                      High
                    </SelectItem>
                    <SelectItem value="Medium" className="text-white">
                      Medium
                    </SelectItem>
                    <SelectItem value="Low" className="text-white">
                      Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="ml-auto text-sm text-gray-400">
                Showing {filteredIssues.length} of {issues.length} issues
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Reported Issues</h2>

          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-white text-lg">{issue.title}</h3>
                      <Badge className={`${priorityColors[issue.priority]} text-white`}>{issue.priority}</Badge>
                    </div>
                    <p className="text-gray-400 mb-3">{issue.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{issue.location}</span>
                      </div>
                      <span>•</span>
                      <span>Reported by {issue.reportedBy}</span>
                      <span>•</span>
                      <span>{issue.date}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{issue.points} pts</span>
                      </div>
                    </div>

                    {issue.resolutionNote && (
                      <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 mb-3">
                        <p className="text-sm text-green-400 font-medium">Resolution Note:</p>
                        <p className="text-sm text-green-300">{issue.resolutionNote}</p>
                        <p className="text-xs text-green-500 mt-1">
                          Resolved by {issue.resolvedBy} on {issue.resolvedDate} • {issue.awardedPoints} points awarded
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    <Badge className={`${statusColors[issue.status]} text-white`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(issue.status)}
                        <span>{issue.status}</span>
                      </div>
                    </Badge>

                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {issue.category}
                    </Badge>

                    <div className="flex space-x-2">
                      {issue.status === "Pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(issue.id, "In Progress")}
                          className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                        >
                          Start Work
                        </Button>
                      )}

                      {issue.status === "In Progress" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedIssue(issue)
                            setAwardedPoints(issue.points)
                            setShowResolveDialog(true)
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      )}

                      {issue.status !== "Resolved" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(issue.id, "Rejected")}
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredIssues.length === 0 && (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No issues found</h3>
                <p className="text-gray-400">No issues match your current filters.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Resolve Issue Dialog */}
      <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Resolve Issue</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedIssue && (
              <div className="bg-gray-800 p-3 rounded-lg">
                <h4 className="font-medium text-white mb-1">{selectedIssue.title}</h4>
                <p className="text-sm text-gray-400">{selectedIssue.description}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-white">Resolution Note</Label>
              <Textarea
                placeholder="Describe how the issue was resolved..."
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Points to Award</Label>
              <Input
                type="number"
                placeholder="Points"
                value={awardedPoints}
                onChange={(e) => setAwardedPoints(Number.parseInt(e.target.value) || 0)}
                className="bg-gray-800 border-gray-600 text-white"
                min="0"
                max="100"
              />
              <p className="text-xs text-gray-400">Default: {selectedIssue?.points} points (based on priority)</p>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowResolveDialog(false)}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleResolveIssue}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={!resolutionNote.trim()}
              >
                <Award className="w-4 h-4 mr-2" />
                Resolve & Award Points
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
