
import React from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingLessons from "@/components/dashboard/UpcomingLessons";
import CourseProgress from "@/components/dashboard/CourseProgress";
import AverageGrades from "@/components/dashboard/AverageGrades";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Professor!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your courses today.
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex gap-2 items-center p-3 px-4 bg-secondary rounded-lg text-sm">
          <Sparkles className="h-4 w-4 text-edu-accent" />
          <span>3 AI-generated lesson plans ready to review</span>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingLessons />
        </div>
        <div className="lg:col-span-1">
          <AverageGrades />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CourseProgress />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>AI-Powered Teaching Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Student Progress Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on recent assessments, 78% of your students are showing improvement in problem-solving skills. Consider reinforcing conceptual understanding in thermodynamics where 23% of students showed gaps in knowledge.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Content Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      Students responded positively to interactive simulations. Consider incorporating more visual learning resources for the upcoming "Forces and Motion" module to increase engagement.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Assessment Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Quiz questions 3, 7, and 12 had the highest error rates. AI analysis suggests rewording these questions or providing additional context to improve clarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
