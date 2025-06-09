
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = [
  { month: 'Jan', attendance: 78, grades: 82, participation: 74 },
  { month: 'Feb', attendance: 82, grades: 85, participation: 76 },
  { month: 'Mar', attendance: 76, grades: 80, participation: 72 },
  { month: 'Apr', attendance: 85, grades: 88, participation: 80 },
  { month: 'May', attendance: 90, grades: 92, participation: 85 },
  { month: 'Jun', attendance: 92, grades: 94, participation: 88 },
];

// Improved version of the CustomTooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
        <p className="text-sm font-semibold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span>{entry.name}: {entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Mock data for subject performance
const subjectPerformanceData = [
  { subject: 'Physics', attendance: 92, grades: 88, difficulty: 65 },
  { subject: 'Chemistry', attendance: 85, grades: 76, difficulty: 70 },
  { subject: 'Mathematics', attendance: 90, grades: 82, difficulty: 75 },
  { subject: 'Biology', attendance: 88, grades: 90, difficulty: 60 },
  { subject: 'Computer Science', attendance: 95, grades: 94, difficulty: 50 },
  { subject: 'English', attendance: 86, grades: 80, difficulty: 40 },
];

const StudentMetrics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('semester');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="semester">This Semester</SelectItem>
            <SelectItem value="year">Academic Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="grades" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="participation" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Avg. Attendance</p>
                <p className="text-lg font-medium">87%</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Avg. Grades</p>
                <p className="text-lg font-medium">84%</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Participation</p>
                <p className="text-lg font-medium">79%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="attendance">
              <TabsList className="mb-4">
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
                <TabsTrigger value="difficulty">Difficulty</TabsTrigger>
              </TabsList>
              
              <TabsContent value="attendance" className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformanceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="subject" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attendance" name="Attendance %" fill="#8884d8" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="grades" className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformanceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="subject" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="grades" name="Grades %" fill="#82ca9d" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="difficulty" className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformanceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="subject" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="difficulty" name="Difficulty Level" fill="#ff8042" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <h3 className="text-lg font-medium text-blue-700">Attendance Patterns</h3>
              <p className="mt-1 text-sm text-blue-600">
                Students show a 12% increase in attendance compared to last semester. Monday and Friday classes have lower attendance rates. Consider implementing engagement activities on these days.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-green-50">
              <h3 className="text-lg font-medium text-green-700">Grade Analysis</h3>
              <p className="mt-1 text-sm text-green-600">
                85% of students have shown improvement in exam scores. The most challenging topics appear to be in the Physics module, specifically quantum mechanics and thermodynamics sections.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-amber-50">
              <h3 className="text-lg font-medium text-amber-700">At-Risk Students</h3>
              <p className="mt-1 text-sm text-amber-600">
                8 students currently show attendance below 70% and grades below average. Early intervention recommended through one-on-one sessions and additional support materials.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentMetrics;
