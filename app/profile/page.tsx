"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  CheckCircle2,
  Clock,
  MapPin,
  Settings,
  Star,
  ThumbsUp,
  Trophy,
  AlertTriangle,
  MessageSquare,
} from "lucide-react"
import { mockIssues } from "@/lib/mock-data"

const achievements = [
  {
    id: 1,
    name: "First Report",
    description: "Report your first neighborhood issue",
    icon: <AlertTriangle className="h-5 w-5" />,
    points: 10,
    completed: true,
  },
  {
    id: 2,
    name: "Problem Solver",
    description: "Volunteer to help resolve an issue",
    icon: <CheckCircle2 className="h-5 w-5" />,
    points: 25,
    completed: true,
  },
  {
    id: 3,
    name: "Community Voice",
    description: "Get 10 upvotes on your reports",
    icon: <ThumbsUp className="h-5 w-5" />,
    points: 50,
    completed: false,
    progress: 60,
  },
  {
    id: 4,
    name: "Neighborhood Hero",
    description: "Resolve 5 community issues",
    icon: <Trophy className="h-5 w-5" />,
    points: 100,
    completed: false,
    progress: 20,
  },
  {
    id: 5,
    name: "Active Communicator",
    description: "Send 20 messages to authorities",
    icon: <MessageSquare className="h-5 w-5" />,
    points: 30,
    completed: false,
    progress: 45,
  },
]

const levels = [
  { level: 1, points: 0, title: "Newcomer" },
  { level: 2, points: 50, title: "Concerned Citizen" },
  { level: 3, points: 100, title: "Active Participant" },
  { level: 4, points: 200, title: "Community Champion" },
  { level: 5, points: 500, title: "Neighborhood Hero" },
]

export default function ProfilePage() {
  const [userPoints, setUserPoints] = useState(0)
  const [userIssues, setUserIssues] = useState([])
  const [userLevel, setUserLevel] = useState(levels[0])
  const [nextLevel, setNextLevel] = useState(levels[1])
  const [progressToNextLevel, setProgressToNextLevel] = useState(0)

  useEffect(() => {
    // Load user points
    const storedPoints = localStorage.getItem("userPoints") || "0"
    const points = Number.parseInt(storedPoints)
    setUserPoints(points)

    // Determine user level
    const currentLevel = [...levels].reverse().find((level) => points >= level.points) || levels[0]
    setUserLevel(currentLevel)

    // Determine next level
    const nextLevelData = levels.find((level) => level.points > points) || levels[levels.length - 1]
    setNextLevel(nextLevelData)

    // Calculate progress to next level
    if (nextLevelData.points > currentLevel.points) {
      const progress = ((points - currentLevel.points) / (nextLevelData.points - currentLevel.points)) * 100
      setProgressToNextLevel(progress)
    } else {
      setProgressToNextLevel(100) // Max level reached
    }

    // Load user issues
    const storedIssues = localStorage.getItem("issues")
    const issueData = storedIssues ? JSON.parse(storedIssues) : mockIssues
    const userReportedIssues = issueData.filter((issue) => issue.reporter === "You")
    setUserIssues(userReportedIssues)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Card className="bg-black border border-gray-800 flex-1 pop-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Your community standing</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-4 border-primary mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-1">Community Member</h2>
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-gray-400">Downtown Area</span>
                </div>
                <Badge className="bg-primary mb-4">
                  Level {userLevel.level} - {userLevel.title}
                </Badge>

                <div className="w-full mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{userPoints} points</span>
                    <span>{nextLevel.points} points</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2" />
                </div>
                <p className="text-sm text-gray-400">
                  {nextLevel.points - userPoints} points to reach Level {nextLevel.level}
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <div className="text-center">
                  <div className="bg-gray-900 rounded-full p-3 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <p className="text-lg font-bold">{userIssues.length}</p>
                  <p className="text-xs text-gray-400">Reported</p>
                </div>

                <div className="text-center">
                  <div className="bg-gray-900 rounded-full p-3 mb-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-lg font-bold">
                    {userIssues.filter((issue) => issue.status === "in-progress").length}
                  </p>
                  <p className="text-xs text-gray-400">In Progress</p>
                </div>

                <div className="text-center">
                  <div className="bg-gray-900 rounded-full p-3 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-lg font-bold">
                    {userIssues.filter((issue) => issue.status === "resolved").length}
                  </p>
                  <p className="text-xs text-gray-400">Resolved</p>
                </div>

                <div className="text-center">
                  <div className="bg-gray-900 rounded-full p-3 mb-2">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-lg font-bold">{userPoints}</p>
                  <p className="text-xs text-gray-400">Points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="achievements" className="space-y-4">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="issues">My Issues</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            <Card className="bg-black border border-gray-800 pop-in">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Track your progress and earn rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center p-4 rounded-lg border ${
                        achievement.completed ? "border-primary/30 bg-primary/5" : "border-gray-800 bg-gray-900/30"
                      }`}
                    >
                      <div
                        className={`rounded-full p-3 mr-4 ${
                          achievement.completed ? "bg-primary/20 text-primary" : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {achievement.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{achievement.name}</h4>
                            <p className="text-sm text-gray-400">{achievement.description}</p>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {achievement.points} pts
                          </Badge>
                        </div>

                        {!achievement.completed && achievement.progress !== undefined && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-400">{achievement.progress}% complete</span>
                            </div>
                            <Progress value={achievement.progress} className="h-1" />
                          </div>
                        )}
                      </div>

                      {achievement.completed && <Star className="h-5 w-5 text-yellow-500 ml-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            <Card className="bg-black border border-gray-800 pop-in">
              <CardHeader>
                <CardTitle>My Reported Issues</CardTitle>
                <CardDescription>Issues you've reported to the community</CardDescription>
              </CardHeader>
              <CardContent>
                {userIssues.length > 0 ? (
                  <div className="divide-y divide-gray-800">
                    {userIssues.map((issue) => (
                      <div key={issue.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{issue.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              issue.status === "resolved"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : issue.status === "in-progress"
                                  ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                  : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            }
                          >
                            <span className="capitalize">{issue.status.replace("-", " ")}</span>
                          </Badge>
                        </div>

                        <div className="flex items-center text-sm text-gray-400 mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="mr-3">{issue.location}</span>
                          <span>{new Date(issue.date).toLocaleDateString()}</span>
                        </div>

                        <p className="text-sm text-gray-300 line-clamp-2 mb-2">{issue.description}</p>

                        <div className="flex items-center text-sm">
                          <div className="flex items-center mr-4">
                            <ThumbsUp className="h-3 w-3 mr-1 text-gray-400" />
                            <span>{issue.upvotes}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1 text-gray-400" />
                            <span>{issue.comments}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <h3 className="text-lg font-medium mb-1">No issues reported yet</h3>
                    <p>You haven't reported any neighborhood issues</p>
                    <Button className="mt-4" variant="outline">
                      Report an Issue
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-black border border-gray-800 pop-in">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your interactions in the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l border-gray-800 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-primary">
                      <AlertTriangle className="h-3 w-3" />
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">You reported an issue</span>
                      <span className="text-gray-400 text-sm ml-2">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      You reported "Broken streetlight on Main St" in Downtown Area
                    </p>
                    <p className="text-xs text-primary mt-1">+10 points</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-blue-500">
                      <ThumbsUp className="h-3 w-3" />
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">You upvoted an issue</span>
                      <span className="text-gray-400 text-sm ml-2">3 days ago</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      You upvoted "Clogged drain causing flooding" in Downtown Area
                    </p>
                    <p className="text-xs text-primary mt-1">+2 points</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-green-500">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">You volunteered to help</span>
                      <span className="text-gray-400 text-sm ml-2">1 week ago</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      You volunteered to help with "Community cleanup at Central Park"
                    </p>
                    <p className="text-xs text-primary mt-1">+25 points</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-amber-500">
                      <MessageSquare className="h-3 w-3" />
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">You sent a message</span>
                      <span className="text-gray-400 text-sm ml-2">1 week ago</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      You sent a message to "Sanitation Department" about garbage collection
                    </p>
                    <p className="text-xs text-primary mt-1">+3 points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
