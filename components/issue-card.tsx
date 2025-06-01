"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle, CheckCircle2, Clock, MapPin, ThumbsUp, MessageSquare, Users } from "lucide-react"

const statusIcons = {
  open: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  "in-progress": <Clock className="h-4 w-4 text-blue-500" />,
  resolved: <CheckCircle2 className="h-4 w-4 text-green-500" />,
}

const statusColors = {
  open: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "in-progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  resolved: "bg-green-500/10 text-green-500 border-green-500/20",
}

export default function IssueCard({ issue, onUpvote, onVolunteer }) {
  const [expanded, setExpanded] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="p-4 hover:bg-gray-900/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Avatar className="h-10 w-10 border border-gray-700">
            <AvatarFallback>{issue.reporter.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge variant="outline" className={statusColors[issue.status]}>
              <span className="flex items-center">
                {statusIcons[issue.status]}
                <span className="ml-1 capitalize">{issue.status.replace("-", " ")}</span>
              </span>
            </Badge>

            <Badge variant="outline" className="bg-gray-800/50">
              {issue.category}
            </Badge>
          </div>

          <h3 className="font-medium text-lg mb-1">{issue.title}</h3>

          <div className="flex items-center text-sm text-gray-400 mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="mr-3">{issue.location}</span>
            <span>{formatDate(issue.date)}</span>
          </div>

          <p className={`text-gray-300 ${expanded ? "" : "line-clamp-2"}`}>{issue.description}</p>

          {issue.description.length > 120 && (
            <Button variant="link" className="p-0 h-auto text-xs mt-1" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Show less" : "Show more"}
            </Button>
          )}

          {issue.image && expanded && (
            <div className="mt-3">
              <img
                src={issue.image || "/placeholder.svg"}
                alt={issue.title}
                className="rounded-md max-h-48 object-cover"
              />
            </div>
          )}

          {expanded && issue.volunteers && issue.volunteers.length > 0 && (
            <div className="mt-3 flex items-center text-sm text-gray-400">
              <Users className="h-3 w-3 mr-1" />
              <span>Volunteers: {issue.volunteers.join(", ")}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center ${issue.upvotedByUser ? "text-primary" : ""}`}
              onClick={() => onUpvote(issue.id)}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{issue.upvotes}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{issue.comments}</span>
            </Button>

            {issue.status === "open" && (
              <Button
                variant="outline"
                size="sm"
                className="ml-auto text-primary border-primary hover:bg-primary/10"
                onClick={() => onVolunteer(issue.id)}
              >
                Volunteer to help
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
