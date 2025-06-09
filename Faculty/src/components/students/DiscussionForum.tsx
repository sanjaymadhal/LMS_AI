
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { MessageSquare, BookOpen, Plus, Send, ThumbsUp, MessageCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: 'Student' | 'Instructor';
  };
  subject: string;
  createdAt: string;
  replies: number;
  likes: number;
  solved: boolean;
}

interface Reply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: 'Student' | 'Instructor';
  };
  createdAt: string;
  likes: number;
  isAnswer: boolean;
}

const discussions: Discussion[] = [
  {
    id: '1',
    title: "Help understanding Newton's Third Law",
    content: "I'm struggling to understand how Newton's Third Law applies in situations where objects are at rest. Can someone explain?",
    author: {
      name: 'Alex Johnson',
      role: 'Student'
    },
    subject: 'Physics',
    createdAt: '2 hours ago',
    replies: 3,
    likes: 5,
    solved: true
  },
  {
    id: '2',
    title: 'Clarification on oxidation-reduction reactions',
    content: 'Could someone explain the difference between oxidation and reduction in chemical reactions with some examples?',
    author: {
      name: 'Samantha Lee',
      role: 'Student'
    },
    subject: 'Chemistry',
    createdAt: '1 day ago',
    replies: 5,
    likes: 8,
    solved: false
  },
  {
    id: '3',
    title: 'Help with calculus integration techniques',
    content: "I'm having trouble applying integration by parts. Can someone show me step by step examples?",
    author: {
      name: 'James Wilson',
      role: 'Student'
    },
    subject: 'Mathematics',
    createdAt: '3 days ago',
    replies: 7,
    likes: 12,
    solved: true
  },
  {
    id: '4',
    title: 'Question about cell membrane transport',
    content: "What's the difference between active and passive transport across cell membranes? I'm confused about when cells use each method.",
    author: {
      name: 'Priya Sharma',
      role: 'Student'
    },
    subject: 'Biology',
    createdAt: '4 days ago',
    replies: 4,
    likes: 6,
    solved: false
  }
];

const discussionReplies: Reply[] = [
  {
    id: '1',
    content: "Newton's Third Law states that for every action, there is an equal and opposite reaction. For objects at rest, this means the forces acting on them are balanced. For example, when a book is sitting on a table, the table exerts an upward force equal to the book's weight.",
    author: {
      name: 'Dr. Williams',
      role: 'Instructor'
    },
    createdAt: '1 hour ago',
    likes: 7,
    isAnswer: true
  },
  {
    id: '2',
    content: "Thanks for the explanation! So if I'm sitting on a chair, my weight pushes down and the chair pushes up with equal force?",
    author: {
      name: 'Alex Johnson',
      role: 'Student'
    },
    createdAt: '50 minutes ago',
    likes: 2,
    isAnswer: false
  },
  {
    id: '3',
    content: "Exactly! That's a perfect example of Newton's Third Law at work with objects at rest. The forces are balanced which is why you don't move.",
    author: {
      name: 'Dr. Williams',
      role: 'Instructor'
    },
    createdAt: '30 minutes ago',
    likes: 4,
    isAnswer: false
  }
];

const DiscussionForum: React.FC = () => {
  const [activeDiscussion, setActiveDiscussion] = useState<Discussion | null>(null);
  const [newReply, setNewReply] = useState('');
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();
  
  const handleSendReply = () => {
    if (!newReply.trim()) return;
    
    toast({
      title: "Reply sent",
      description: "Your reply has been posted to the discussion.",
    });
    
    setNewReply('');
  };
  
  const handleMarkAsSolution = () => {
    toast({
      title: "Marked as solution",
      description: "This reply has been marked as the solution to the question.",
    });
  };
  
  const filteredDiscussions = filter === 'all' 
    ? discussions
    : filter === 'unsolved' 
      ? discussions.filter(d => !d.solved) 
      : discussions.filter(d => d.solved);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Discussion Forum</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Discussion</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Mathematics</option>
                  <option>Biology</option>
                  <option>Computer Science</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter a title for your question" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Question Details</Label>
                <Textarea id="content" placeholder="Describe your question in detail..." className="min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => toast({ title: "Discussion created", description: "Your question has been posted to the forum." })}>Post Question</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="discussions">
        <TabsList>
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Materials
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <select 
                className="px-3 py-1.5 border rounded-md text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Discussions</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>
            <div className="relative max-w-sm">
              <Input placeholder="Search discussions..." className="pl-9 max-w-[250px]" />
              <MessageSquare className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <Card key={discussion.id} className={discussion.solved ? "border-l-4 border-l-green-500" : ""}>
                <CardContent className="p-6">
                  <div className="flex justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={discussion.author.avatar} />
                        <AvatarFallback>{discussion.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold hover:text-blue-600 cursor-pointer" onClick={() => setActiveDiscussion(discussion)}>
                          {discussion.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>{discussion.author.name}</span>
                          <span>•</span>
                          <span>{discussion.subject}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {discussion.createdAt}
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm">{discussion.content}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="flex items-center text-sm text-muted-foreground">
                            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                            {discussion.likes}
                          </span>
                          <span className="flex items-center text-sm text-muted-foreground">
                            <MessageCircle className="h-3.5 w-3.5 mr-1" />
                            {discussion.replies}
                          </span>
                          {discussion.solved && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Solved
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" onClick={() => setActiveDiscussion(discussion)}>
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="materials" className="space-y-4">
          <div className="text-center p-8">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Learning Materials</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Share course materials, guides, and resources to help students with common questions and topics.
            </p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Upload Materials
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {activeDiscussion && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{activeDiscussion.title}</CardTitle>
                <CardDescription className="mt-1">
                  Posted by {activeDiscussion.author.name} • {activeDiscussion.createdAt}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setActiveDiscussion(null)}>
                Back to List
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 border rounded-lg bg-muted/30">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={activeDiscussion.author.avatar} />
                  <AvatarFallback>{activeDiscussion.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activeDiscussion.author.name}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {activeDiscussion.author.role}
                    </span>
                  </div>
                  <p className="mt-2">{activeDiscussion.content}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">{discussionReplies.length} Replies</h4>
              
              {discussionReplies.map((reply) => (
                <div 
                  key={reply.id}
                  className={`p-4 border rounded-lg ${reply.isAnswer ? "bg-green-50 border-green-200" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={reply.author.avatar} />
                      <AvatarFallback>{reply.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{reply.author.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            reply.author.role === 'Instructor' 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {reply.author.role}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{reply.createdAt}</span>
                      </div>
                      <p className="mt-2">{reply.content}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            {reply.likes}
                          </Button>
                        </div>
                        {reply.author.role === 'Instructor' && !reply.isAnswer && (
                          <Button variant="outline" size="sm" className="text-xs" onClick={handleMarkAsSolution}>
                            Mark as Solution
                          </Button>
                        )}
                        {reply.isAnswer && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Solution ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Your Reply</h4>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea 
                    placeholder="Write your reply..." 
                    className="min-h-[100px]"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSendReply} disabled={!newReply.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiscussionForum;
