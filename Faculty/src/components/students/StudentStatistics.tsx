import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Users, BookOpen, Clock } from 'lucide-react';

const StudentStatistics: React.FC = () => {
  // Gender distribution data
  const genderData = [
    { name: 'Female', value: 48, color: '#8884d8' },
    { name: 'Male', value: 52, color: '#82ca9d' }
  ];
  
  // Performance distribution data
  const performanceData = [
    { name: 'Excellent', value: 30, color: '#4caf50' },
    { name: 'Good', value: 45, color: '#2196f3' },
    { name: 'Average', value: 15, color: '#ff9800' },
    { name: 'Poor', value: 10, color: '#f44336' }
  ];
  
  // Attendance distribution data
  const attendanceData = [
    { name: '90-100%', value: 60, color: '#4caf50' },
    { name: '75-90%', value: 25, color: '#2196f3' },
    { name: '60-75%', value: 10, color: '#ff9800' },
    { name: '<60%', value: 5, color: '#f44336' }
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
          <p className="text-sm font-medium">
            {payload[0].name}: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-center mb-2">Gender Distribution</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-center mb-2">Performance Distribution</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-center mb-2">Attendance Overview</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Students</p>
              <h3 className="text-2xl font-bold">124</h3>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-green-600">Average Attendance</p>
              <h3 className="text-2xl font-bold">87%</h3>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-purple-600">Average Grade</p>
              <h3 className="text-2xl font-bold">82%</h3>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-amber-600">At Risk Students</p>
              <h3 className="text-2xl font-bold">8</h3>
            </div>
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentStatistics;
