"use client"

import { useState, useEffect } from "react"
import UserDashboard from "@/components/user-dashboard"
import AuthorityDashboard from "@/components/authority-dashboard"
import LoginPage from "@/components/login-page"

export default function NeighborhoodResolver() {
  const [currentUser, setCurrentUser] = useState(null)
  const [userType, setUserType] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("currentUser")
    const savedUserType = localStorage.getItem("userType")

    if (savedUser && savedUserType) {
      setCurrentUser(JSON.parse(savedUser))
      setUserType(savedUserType)
    }
  }, [])

  const handleLogin = (user, type) => {
    setCurrentUser(user)
    setUserType(type)
    localStorage.setItem("currentUser", JSON.stringify(user))
    localStorage.setItem("userType", type)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setUserType(null)
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userType")
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-black">
      {userType === "user" ? (
        <UserDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <AuthorityDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  )
}
