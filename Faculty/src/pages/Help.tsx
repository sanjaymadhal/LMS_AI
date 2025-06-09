
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { HelpCircle, Search, BookOpen, Video, MessageSquare, Phone, Mail, FileText, ExternalLink } from 'lucide-react';

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqs = [
    {
      question: "How do I create a new assignment?",
      answer: "To create a new assignment, go to the Assignments page and click on the 'Create Assignment' button. Fill in the required details including title, description, due date, and attach any relevant files. You can also set grading criteria and assign it to specific classes."
    },
    {
      question: "How can I track student attendance?",
      answer: "You can track student attendance by navigating to the Workspace section and selecting 'Attendance' from the menu. From there, you can mark attendance for specific dates, view attendance reports, and export attendance data for your records."
    },
    {
      question: "How do I use the AI tools for content generation?",
      answer: "To use AI tools, navigate to the AI Tools section from the sidebar. You'll find options for generating summaries, creating question banks, and preparing presentation slides. Select the tool you need, input your requirements, and the AI will generate content for you to review and customize."
    },
    {
      question: "Can I customize the layout of my dashboard?",
      answer: "Yes, you can customize your dashboard layout. Click on the settings icon in the top-right corner of your dashboard and select 'Customize Layout'. From there, you can drag and drop widgets, hide or show specific sections, and save your preferred layout."
    },
    {
      question: "How do I access analytics for a specific subject?",
      answer: "To access subject-specific analytics, go to the Analytics page and use the filter dropdown to select the subject you're interested in. You can view performance metrics, attendance statistics, and engagement data specifically for that subject."
    },
    {
      question: "How can I communicate with my students through the platform?",
      answer: "You can communicate with students through various channels on the platform. Use the Discussion Forum in the Students section, send announcements through the class dashboard, or provide individual feedback on assignments and assessments."
    },
  ];

  const videoTutorials = [
    {
      title: "Getting Started with PyGenicArc LMS",
      duration: "5:23",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Creating and Managing Assignments",
      duration: "7:15",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Using the AI Tools for Content Creation",
      duration: "8:42",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Analyzing Student Performance with Analytics",
      duration: "6:30",
      thumbnail: "/placeholder.svg"
    }
  ];

  const guides = [
    {
      title: "Administrator Guide",
      description: "Complete guide for system administrators",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Teacher's Handbook",
      description: "Best practices for educators",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      title: "Analytics Interpretation",
      description: "How to read and use analytics data",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Virtual Classroom Walkthrough",
      description: "Guide to the virtual classroom features",
      icon: <Video className="h-6 w-6" />
    }
  ];
  
  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="container mx-auto py-6 space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="text-muted-foreground">Find answers, tutorials, and support resources</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input 
          className="pl-10 h-12 text-lg rounded-lg"
          placeholder="Search for help topics..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="faqs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="guides">Guides & Documentation</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faqs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-edu-accent" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find answers to common questions about using PyGenicArc LMS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium mb-1">No results found</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any FAQs matching your search query.
                    </p>
                    <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
                  </div>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-edu-accent" />
                Video Tutorials
              </CardTitle>
              <CardDescription>
                Watch step-by-step video guides for using PyGenicArc LMS features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoTutorials.map((video, index) => (
                  <div key={index} className="group rounded-lg overflow-hidden border bg-card text-card-foreground shadow">
                    <div className="relative aspect-video bg-muted">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Button variant="secondary" size="sm" className="flex items-center gap-2">
                          <Video className="h-4 w-4" /> Watch Video
                        </Button>
                      </div>
                      <Badge className="absolute bottom-2 right-2 bg-black/70">{video.duration}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{video.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guides" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-edu-accent" />
                Guides & Documentation
              </CardTitle>
              <CardDescription>
                Comprehensive guides and documentation for PyGenicArc LMS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((guide, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {guide.icon}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 flex items-center">
                        {guide.title} 
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
                      </h3>
                      <p className="text-sm text-muted-foreground">{guide.description}</p>
                      <Button variant="link" className="px-0 h-auto mt-1 text-sm font-medium text-primary">
                        Read guide {"→"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-edu-accent" />
                Contact Support
              </CardTitle>
              <CardDescription>
                Get in touch with our support team for personalized assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center p-6 rounded-lg border bg-card text-center">
                  <Phone className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2">Phone Support</h3>
                  <p className="text-muted-foreground mb-4">Available Monday-Friday, 9AM-5PM</p>
                  <p className="text-lg font-medium">+1 (800) 123-4567</p>
                </div>
                
                <div className="flex flex-col items-center p-6 rounded-lg border bg-card text-center">
                  <Mail className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-4">We typically respond within 24 hours</p>
                  <a href="mailto:support@pygenicarc.edu" className="text-lg font-medium text-primary">
                    support@pygenicarc.edu
                  </a>
                </div>
              </div>
              
              <div className="mt-8 p-4 rounded-lg bg-muted">
                <h3 className="font-medium mb-2">Before contacting support:</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Check the FAQs section for quick answers</li>
                  <li>Review the video tutorials for step-by-step guidance</li>
                  <li>Look through our documentation for detailed information</li>
                  <li>When contacting support, please include your user ID and specific details about your issue</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
