import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  MessageCircle,
  Users,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Send,
  Star,
  MapPin,
  Clock,
  Mail,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: "customer" | "agent";
  quickReplies?: string[];
}

interface Conversation {
  id: string;
  customer: {
    name: string;
    initials: string;
    online: boolean;
    email: string;
    phone?: string;
    rating: number;
    totalOrders: number;
    memberSince: string;
    location: string;
    status: "active" | "inactive";
  };
  relatedOrder?: string;
  message: string;
  timestamp: string;
  tags: {
    label: string;
    variant: "default" | "destructive" | "secondary" | "outline";
  }[];
  messages: Message[];
  duration: string;
}

const conversations: Conversation[] = [
  {
    id: "1",
    customer: {
      name: "Sarah Wilson",
      initials: "SW",
      online: true,
      email: "sarah@example.com",
      phone: "+1 234 567 8900",
      rating: 4.8,
      totalOrders: 23,
      memberSince: "Jan 2025",
      location: "New York, USA",
      status: "active",
    },
    relatedOrder: "ORD-2024-3578",
    message: "I still haven't received my refund",
    timestamp: "Just now",
    duration: "15 min",
    tags: [
      { label: "Refund", variant: "destructive" },
      { label: "Urgent", variant: "destructive" },
    ],
    messages: [
      {
        id: "m1",
        text: "Hi, I requested a refund 3 days ago",
        timestamp: "2:30 PM",
        sender: "customer",
      },
      {
        id: "m2",
        text: "Let me check that for you right away",
        timestamp: "2:31 PM",
        sender: "agent",
        quickReplies: [
          "Thank you for contacting us. H...",
          "Let me check that for yo",
        ],
      },
      {
        id: "m3",
        text: "I still haven't received my refund",
        timestamp: "2:45 PM",
        sender: "customer",
      },
    ],
  },
  {
    id: "2",
    customer: {
      name: "Mike Johnson",
      initials: "MJ",
      online: true,
      email: "mike@example.com",
      rating: 4.5,
      totalOrders: 15,
      memberSince: "Dec 2024",
      location: "Los Angeles, USA",
      status: "active",
    },
    message: "Where is my delivery driver?",
    timestamp: "2 min ago",
    duration: "8 min",
    tags: [{ label: "Tracking", variant: "default" }],
    messages: [
      {
        id: "m1",
        text: "Where is my delivery driver?",
        timestamp: "3:10 PM",
        sender: "customer",
      },
    ],
  },
  {
    id: "3",
    customer: {
      name: "Emily Davis",
      initials: "ED",
      online: true,
      email: "emily@example.com",
      rating: 4.9,
      totalOrders: 42,
      memberSince: "Aug 2024",
      location: "Chicago, USA",
      status: "active",
    },
    message: "Thank you for your help!",
    timestamp: "15 min ago",
    duration: "12 min",
    tags: [{ label: "Inquiry", variant: "secondary" }],
    messages: [
      {
        id: "m1",
        text: "Thank you for your help!",
        timestamp: "2:55 PM",
        sender: "customer",
      },
    ],
  },
  {
    id: "4",
    customer: {
      name: "James Brown",
      initials: "JB",
      online: false,
      email: "james@example.com",
      rating: 4.2,
      totalOrders: 8,
      memberSince: "Nov 2024",
      location: "Houston, USA",
      status: "inactive",
    },
    message: "I need to change my delivery addr",
    timestamp: "1 hour ago",
    duration: "5 min",
    tags: [{ label: "Resolved", variant: "outline" }],
    messages: [
      {
        id: "m1",
        text: "I need to change my delivery addr",
        timestamp: "1:30 PM",
        sender: "customer",
      },
    ],
  },
];

export default function LiveChatInterface() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedChat,
  );

  const getBadgeColor = (variant: string) => {
    switch (variant) {
      case "destructive":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "default":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800";
      case "outline":
        return "border-gray-300 text-gray-600";
      default:
        return "";
    }
  };

  return (
    <div className="flex gap-5  overflow-hidden">
      {/* Left Panel - Conversations List */}
      <Card className="w-[280px] border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedChat(conv.id)}
              className={cn(
                "p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors",
                selectedChat === conv.id &&
                  "bg-blue-50 border-l-4 border-l-blue-500",
              )}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 bg-green-100">
                    <AvatarFallback className="text-sm bg-green-100 text-green-700">
                      {conv.customer.initials}
                    </AvatarFallback>
                  </Avatar>
                  {conv.customer.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm truncate">
                      {conv.customer.name}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {conv.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mb-2">
                    {conv.message}
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    {conv.tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant={tag.variant}
                        className={cn(
                          "text-xs px-2 py-0",
                          getBadgeColor(tag.variant),
                        )}
                      >
                        {tag.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Middle Panel - Chat Area */}
      <Card className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <CardHeader className="border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 bg-green-100">
                      <AvatarFallback className="text-sm bg-green-100 text-green-700">
                        {selectedConversation.customer.initials}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.customer.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {selectedConversation.customer.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.customer.online
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {selectedConversation.relatedOrder && (
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <Badge
                    variant="outline"
                    className="text-blue-600 border-blue-200"
                  >
                    <span className="mr-1">ℹ️</span>
                    Related Order: {selectedConversation.relatedOrder}
                  </Badge>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs text-blue-600"
                  >
                    View Order
                  </Button>
                </div>
              )}
            </CardHeader>

            {/* Chat Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "customer"
                      ? "justify-start"
                      : "justify-end",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] space-y-1",
                      message.sender === "customer"
                        ? "items-start"
                        : "items-end",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-lg px-4 py-2",
                        message.sender === "customer"
                          ? "bg-gray-100 text-gray-900"
                          : "bg-green-500 text-white",
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground px-1">
                      {message.timestamp}
                    </p>
                    {message.quickReplies && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-muted-foreground px-1">
                          Quick Replies:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {message.quickReplies.map((reply, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7"
                            >
                              {reply}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Chat Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-green-500 hover:bg-green-600">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center text-center p-8">
            <div className="space-y-4">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  No chat selected
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Select a conversation to start messaging
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Right Panel - Customer Info */}
      <Card className="w-[280px] border-l flex flex-col">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b p-4">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto bg-green-100">
                  <AvatarFallback className="text-2xl bg-green-100 text-green-700">
                    {selectedConversation.customer.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mt-3">
                  {selectedConversation.customer.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedConversation.customer.email}
                </p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {selectedConversation.customer.rating}
                  </span>
                  <span className="text-muted-foreground mx-1">•</span>
                  <span className="text-sm text-muted-foreground">
                    {selectedConversation.customer.totalOrders} orders
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Member since {selectedConversation.customer.memberSince}
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Chat Information */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Chat Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium ml-auto">
                      {selectedConversation.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium ml-auto text-xs">
                      {selectedConversation.customer.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      className={cn(
                        "ml-auto",
                        selectedConversation.customer.status === "active"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-400",
                      )}
                    >
                      {selectedConversation.customer.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tags */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedConversation.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant={tag.variant}
                      className={cn("text-xs", getBadgeColor(tag.variant))}
                    >
                      {tag.label}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-6 text-xs">
                    + Add Tag
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Quick Actions */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Create Ticket
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center text-center p-8">
            <div className="space-y-4">
              <Users className="w-16 h-16 text-gray-300 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Customer Info
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Customer info will appear here
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
