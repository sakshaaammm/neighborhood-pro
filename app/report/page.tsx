"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, Camera, MapPin } from "lucide-react"
import { mockIssues } from "@/lib/mock-data"

const categories = [
  "Potholes",
  "Streetlights",
  "Garbage Collection",
  "Clogged Drains",
  "Infrastructure",
  "Litter",
  "Water Pollution",
  "Begging & Vagrancy",
  "Public Urination",
  "Other",
]

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    image: null,
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))

      // Create image preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.title || !formData.category || !formData.location || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Create new issue
    const newIssue = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      location: formData.location,
      description: formData.description,
      image: imagePreview,
      date: new Date().toISOString(),
      status: "open",
      reporter: "You",
      upvotes: 0,
      comments: 0,
      upvotedByUser: false,
    }

    // Get existing issues or use mock data
    const existingIssues = JSON.parse(localStorage.getItem("issues") || JSON.stringify(mockIssues))

    // Add new issue to the beginning of the array
    const updatedIssues = [newIssue, ...existingIssues]

    // Save to localStorage
    localStorage.setItem("issues", JSON.stringify(updatedIssues))

    // Add points for reporting an issue
    const currentPoints = Number.parseInt(localStorage.getItem("userPoints") || "0")
    localStorage.setItem("userPoints", (currentPoints + 10).toString())

    // Show success message
    toast({
      title: "Issue reported successfully",
      description: "You earned 10 points for reporting this issue",
    })

    // Redirect to dashboard
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 slide-in">Report an Issue</h1>
        <p className="text-gray-400 mb-6 slide-in">Help improve your neighborhood by reporting problems</p>

        <Card className="bg-black border border-gray-800 pop-in">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
              <CardDescription>Provide information about the problem you've noticed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-900 border-gray-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="bg-gray-900 border-gray-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <Input
                      id="location"
                      name="location"
                      placeholder="Street address or landmark"
                      value={formData.location}
                      onChange={handleChange}
                      className="bg-gray-900 border-gray-700 pl-9"
                    />
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the issue in detail. Include when you noticed it and any other relevant information."
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-gray-900 border-gray-700 min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Add Photo (Optional)</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="image"
                      className="flex items-center justify-center border border-dashed border-gray-700 rounded-md p-4 cursor-pointer hover:bg-gray-900/50 transition-colors"
                    >
                      <div className="text-center">
                        <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-400">Click to upload an image</p>
                      </div>
                      <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>

                  {imagePreview && (
                    <div className="w-24 h-24 relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => {
                          setImagePreview(null)
                          setFormData((prev) => ({ ...prev, image: null }))
                        }}
                      >
                        &times;
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-4 flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-500">Important</p>
                  <p className="text-gray-300">
                    Only report issues that are in public spaces. For emergencies, please contact appropriate emergency
                    services.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4">
              <Button type="button" variant="ghost" onClick={() => router.push("/")} className="mr-2">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 glow ml-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
