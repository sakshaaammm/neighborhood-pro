"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Shield, Users, Info } from "lucide-react"

const demoCredentials = {
  users: [
    { username: "user1", password: "demo123", name: "John Doe", points: 120, level: 2 },
    { username: "user2", password: "demo123", name: "Jane Smith", points: 85, level: 1 },
  ],
  authorities: [
    { username: "admin1", password: "admin123", name: "City Manager", department: "Municipal Services" },
    { username: "admin2", password: "admin123", name: "Public Works Director", department: "Infrastructure" },
  ],
}

export default function LoginPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState("user")
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [showDemo, setShowDemo] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    const userList = activeTab === "user" ? demoCredentials.users : demoCredentials.authorities
    const user = userList.find((u) => u.username === credentials.username && u.password === credentials.password)

    if (user) {
      onLogin(user, activeTab)
    } else {
      setError("Invalid credentials. Please check the demo credentials below.")
    }
  }

  const handleDemoLogin = (user, type) => {
    onLogin(user, type)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NeighborFix
            </h1>
          </div>
          <p className="text-gray-400">Community Problem Resolver Platform</p>
        </div>

        {/* Login Form */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-center">Login to Continue</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="user" className="data-[state=active]:bg-purple-600">
                  <Users className="w-4 h-4 mr-2" />
                  Citizen
                </TabsTrigger>
                <TabsTrigger value="authority" className="data-[state=active]:bg-blue-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Authority
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                  {error && (
                    <Alert className="bg-red-900/20 border-red-700">
                      <AlertDescription className="text-red-400">{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Login as Citizen
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="authority" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="auth-username" className="text-white">
                      Username
                    </Label>
                    <Input
                      id="auth-username"
                      type="text"
                      placeholder="Enter your username"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auth-password" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="auth-password"
                      type="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                  {error && (
                    <Alert className="bg-red-900/20 border-red-700">
                      <AlertDescription className="text-red-400">{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Login as Authority
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <Button
              variant="ghost"
              onClick={() => setShowDemo(!showDemo)}
              className="w-full text-white hover:bg-gray-800 p-0"
            >
              <div className="flex items-center justify-between w-full p-2">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span>Demo Credentials</span>
                </div>
                <span className="text-xs text-gray-400">{showDemo ? "Hide" : "Show"}</span>
              </div>
            </Button>
          </CardHeader>
          {showDemo && (
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Citizens:</h4>
                <div className="space-y-2">
                  {demoCredentials.users.map((user, index) => (
                    <div key={index} className="bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-white">{user.name}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDemoLogin(user, "user")}
                          className="text-xs border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
                        >
                          Quick Login
                        </Button>
                      </div>
                      <div className="text-xs text-gray-400">
                        Username: <span className="text-purple-400">{user.username}</span> | Password:{" "}
                        <span className="text-purple-400">{user.password}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white mb-2">Authorities:</h4>
                <div className="space-y-2">
                  {demoCredentials.authorities.map((auth, index) => (
                    <div key={index} className="bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-white">{auth.name}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDemoLogin(auth, "authority")}
                          className="text-xs border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                        >
                          Quick Login
                        </Button>
                      </div>
                      <div className="text-xs text-gray-400">
                        Username: <span className="text-blue-400">{auth.username}</span> | Password:{" "}
                        <span className="text-blue-400">{auth.password}</span>
                      </div>
                      <div className="text-xs text-gray-500">{auth.department}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
