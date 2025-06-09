
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart, PieChart, LineChart, AreaChart, ResponsiveContainer, Bar, Pie, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Search, Filter, Download, Plus, Users, BookOpen, MessageSquare, ChevronRight } from 'lucide-react';
import StudentsList from '@/components/students/StudentsList';
import StudentStatistics from '@/components/students/StudentStatistics';
import StudentMetrics from '@/components/students/StudentMetrics';
import DiscussionForum from '@/components/students/DiscussionForum';

const Students: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">
            Manage students, track performance, and engage with the class
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="hover-scale">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="hover-scale">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="hover-scale">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Student Summary</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <StudentStatistics />
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Performance Metrics
            </TabsTrigger>
            <TabsTrigger value="discussion" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Discussion Forum
            </TabsTrigger>
          </TabsList>
          
          <Button variant="ghost" size="sm">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <StudentsList searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-4">
          <StudentMetrics />
        </TabsContent>
        
        <TabsContent value="discussion" className="space-y-4">
          <DiscussionForum />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Students;
