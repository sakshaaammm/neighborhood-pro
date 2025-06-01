import { Droplets, Trash2, Lightbulb, RouteIcon as Road } from "lucide-react"

export const mockIssues = [
  {
    id: "1",
    title: "Pothole on Main Street",
    category: "Potholes",
    location: "Main St & 5th Ave",
    description:
      "Large pothole approximately 2 feet wide and 6 inches deep. It's causing traffic slowdowns and could damage vehicles.",
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    status: "in-progress",
    reporter: "Jane Doe",
    upvotes: 15,
    comments: 3,
    upvotedByUser: false,
    volunteers: ["John Smith", "Maria Garcia"],
  },
  {
    id: "2",
    title: "Broken streetlight",
    category: "Streetlights",
    location: "Oak Avenue & Pine St",
    description:
      "Streetlight has been flickering for weeks and now completely out. This area is very dark at night and feels unsafe.",
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    status: "open",
    reporter: "Mike Johnson",
    upvotes: 8,
    comments: 2,
    upvotedByUser: false,
  },
  {
    id: "3",
    title: "Overflowing trash bin",
    category: "Garbage Collection",
    location: "Central Park, near playground",
    description:
      "The public trash bin has been overflowing for days. It's attracting pests and creating an unpleasant odor in the area.",
    date: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    status: "open",
    reporter: "Sarah Williams",
    upvotes: 12,
    comments: 4,
    upvotedByUser: true,
  },
  {
    id: "4",
    title: "Clogged storm drain",
    category: "Clogged Drains",
    location: "Elm Street & River Road",
    description:
      "Storm drain is completely blocked with leaves and debris. When it rains, the street floods and becomes impassable.",
    date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    status: "resolved",
    reporter: "David Brown",
    upvotes: 20,
    comments: 7,
    upvotedByUser: false,
  },
  {
    id: "5",
    title: "Graffiti on community center",
    category: "Infrastructure",
    location: "Downtown Community Center",
    description:
      "The north wall of the community center has been vandalized with graffiti. It's an eyesore for the neighborhood.",
    date: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    status: "in-progress",
    reporter: "You",
    upvotes: 6,
    comments: 2,
    upvotedByUser: false,
    volunteers: ["Lisa Chen"],
  },
  {
    id: "6",
    title: "Abandoned shopping carts",
    category: "Litter",
    location: "Riverside Shopping Plaza",
    description:
      "Several shopping carts have been abandoned in the parking lot and surrounding streets. They're blocking sidewalks and creating hazards.",
    date: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
    status: "open",
    reporter: "Robert Taylor",
    upvotes: 4,
    comments: 1,
    upvotedByUser: false,
  },
  {
    id: "7",
    title: "Oil spill in creek",
    category: "Water Pollution",
    location: "Willow Creek near Industrial Park",
    description:
      "There appears to be an oil slick in the creek. The water has a rainbow sheen and smells of petroleum.",
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    status: "in-progress",
    reporter: "Emily Davis",
    upvotes: 25,
    comments: 8,
    upvotedByUser: false,
    volunteers: ["Environmental Task Force"],
  },
  {
    id: "8",
    title: "Homeless encampment",
    category: "Begging & Vagrancy",
    location: "Under Highway 5 Bridge",
    description:
      "A growing encampment of homeless individuals has formed. Concerned for their welfare as well as sanitation issues.",
    date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    status: "in-progress",
    reporter: "Thomas Wilson",
    upvotes: 18,
    comments: 12,
    upvotedByUser: false,
    volunteers: ["Social Services", "Community Outreach Team"],
  },
]

export const mockCategories = [
  {
    name: "Potholes",
    count: 12,
    trend: "up",
    percentage: 15,
    icon: Road,
  },
  {
    name: "Streetlights",
    count: 8,
    trend: "down",
    percentage: 5,
    icon: Lightbulb,
  },
  {
    name: "Garbage",
    count: 15,
    trend: "up",
    percentage: 20,
    icon: Trash2,
  },
  {
    name: "Drains",
    count: 6,
    trend: "down",
    percentage: 10,
    icon: Droplets,
  },
]

export const mockChats = [
  {
    id: "chat1",
    name: "Sanitation Department",
    department: "City Maintenance",
    type: "authority",
    lastMessage: "We'll dispatch a team to collect the abandoned trash tomorrow morning.",
    lastMessageTime: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    unread: 0,
    messages: [
      {
        id: "msg1",
        sender: "user",
        text: "Hello, I'd like to report uncollected garbage on Oak Street. The bins have been full for over a week.",
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), // 3 hours ago
      },
      {
        id: "msg2",
        sender: "authority",
        text: "Thank you for reporting this issue. Can you please provide the exact location and how many bins are affected?",
        timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(), // 2.5 hours ago
      },
      {
        id: "msg3",
        sender: "user",
        text: "It's at the intersection of Oak and Pine, near the community garden. There are about 5 bins that haven't been emptied.",
        timestamp: new Date(Date.now() - 3600000 * 2.2).toISOString(), // 2.2 hours ago
      },
      {
        id: "msg4",
        sender: "authority",
        text: "We'll dispatch a team to collect the abandoned trash tomorrow morning.",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
      },
    ],
  },
  {
    id: "chat2",
    name: "Road Maintenance",
    department: "Transportation",
    type: "authority",
    lastMessage: "The pothole repair has been scheduled for next Tuesday.",
    lastMessageTime: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    unread: 1,
    messages: [
      {
        id: "msg1",
        sender: "user",
        text: "I'd like to follow up on the pothole repair request I submitted last week (reference #PT-2023-0456).",
        timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(), // 1.5 days ago
      },
      {
        id: "msg2",
        sender: "authority",
        text: "Thank you for your follow-up. Let me check the status of your request.",
        timestamp: new Date(Date.now() - 86400000 * 1.4).toISOString(), // 1.4 days ago
      },
      {
        id: "msg3",
        sender: "authority",
        text: "I've checked our system and see that your request has been processed. The pothole repair has been scheduled for next Tuesday.",
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
      },
    ],
  },
  {
    id: "chat3",
    name: "Community Watch",
    department: "Neighborhood Safety",
    type: "community",
    lastMessage: "We'll be discussing this at the next community meeting on Thursday.",
    lastMessageTime: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    unread: 0,
    messages: [
      {
        id: "msg1",
        sender: "user",
        text: "I've noticed increased loitering in the park after dark. Should we request additional patrols?",
        timestamp: new Date(Date.now() - 86400000 * 3.5).toISOString(), // 3.5 days ago
      },
      {
        id: "msg2",
        sender: "authority",
        text: "Thanks for bringing this to our attention. Have you noticed any particular patterns or times when this occurs?",
        timestamp: new Date(Date.now() - 86400000 * 3.2).toISOString(), // 3.2 days ago
      },
      {
        id: "msg3",
        sender: "user",
        text: "It seems to be happening mostly on weekends, between 9pm and midnight. I've seen groups of teenagers hanging around the basketball courts.",
        timestamp: new Date(Date.now() - 86400000 * 3.1).toISOString(), // 3.1 days ago
      },
      {
        id: "msg4",
        sender: "authority",
        text: "We'll be discussing this at the next community meeting on Thursday. In the meantime, I'll request that patrol cars drive by more frequently during those hours.",
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      },
    ],
  },
  {
    id: "chat4",
    name: "Parks Department",
    department: "City Maintenance",
    type: "authority",
    lastMessage: "The broken swing has been repaired as of this morning.",
    lastMessageTime: new Date(Date.now() - 86400000 * 0.5).toISOString(), // 12 hours ago
    unread: 2,
    messages: [
      {
        id: "msg1",
        sender: "user",
        text: "I wanted to report a broken swing at Central Park playground. It could be dangerous for children.",
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      },
      {
        id: "msg2",
        sender: "authority",
        text: "Thank you for your report. Safety is our priority. We'll send someone to inspect it today.",
        timestamp: new Date(Date.now() - 86400000 * 1.8).toISOString(), // 1.8 days ago
      },
      {
        id: "msg3",
        sender: "authority",
        text: "Our team has inspected the swing and confirmed it needs repair. We've ordered the parts and should have it fixed within 48 hours.",
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
      },
      {
        id: "msg4",
        sender: "authority",
        text: "Just wanted to update you - the broken swing has been repaired as of this morning.",
        timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString(), // 12 hours ago
      },
    ],
  },
  {
    id: "chat5",
    name: "Jane Neighbor",
    type: "community",
    lastMessage: "I'll join you for the cleanup on Saturday!",
    lastMessageTime: new Date(Date.now() - 86400000 * 0.2).toISOString(), // 4.8 hours ago
    unread: 0,
    messages: [
      {
        id: "msg1",
        sender: "user",
        text: "Hi Jane, I'm organizing a neighborhood cleanup this Saturday. Would you be interested in joining?",
        timestamp: new Date(Date.now() - 86400000 * 0.3).toISOString(), // 7.2 hours ago
      },
      {
        id: "msg2",
        sender: "authority",
        text: "That sounds like a great initiative! What time are you planning to start?",
        timestamp: new Date(Date.now() - 86400000 * 0.25).toISOString(), // 6 hours ago
      },
      {
        id: "msg3",
        sender: "user",
        text: "We're meeting at the community center at 9am. Should be done by noon. I'll bring trash bags and gloves!",
        timestamp: new Date(Date.now() - 86400000 * 0.22).toISOString(), // 5.3 hours ago
      },
      {
        id: "msg4",
        sender: "authority",
        text: "I'll join you for the cleanup on Saturday!",
        timestamp: new Date(Date.now() - 86400000 * 0.2).toISOString(), // 4.8 hours ago
      },
    ],
  },
]
