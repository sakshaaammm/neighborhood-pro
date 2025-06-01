"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, PlusCircle, MessageSquare, User, Menu, X, Award } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [points, setPoints] = useState(0)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const storedPoints = localStorage.getItem("userPoints")
    if (storedPoints) {
      setPoints(Number.parseInt(storedPoints))
    }
  }, [])

  const navItems = [
    { name: "Dashboard", href: "/", icon: <Home className="mr-2 h-4 w-4" /> },
    { name: "Report Issue", href: "/report", icon: <PlusCircle className="mr-2 h-4 w-4" /> },
    { name: "Chat", href: "/chat", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
    { name: "Profile", href: "/profile", icon: <User className="mr-2 h-4 w-4" /> },
  ]

  return (
    <nav className="border-b border-gray-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Award className="h-8 w-8 text-primary mr-2" />
              <span className="font-bold text-xl">NP Resolver</span>
            </Link>
          </div>

          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button variant={pathname === item.href ? "default" : "ghost"} className="flex items-center">
                    {item.icon}
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center">
            <div className="flex items-center bg-secondary rounded-full px-3 py-1 mr-4">
              <Award className="h-4 w-4 text-primary mr-1" />
              <span className="text-sm font-medium">{points} points</span>
            </div>

            <Avatar className="h-8 w-8 border border-primary">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {isMobile && (
              <Button variant="ghost" size="icon" className="ml-2 md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 pop-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
