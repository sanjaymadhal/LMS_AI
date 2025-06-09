
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const engagementData = [
  { name: 'Questions Asked', value: 65, color: '#8884d8' },
  { name: 'Discussion Posts', value: 45, color: '#82ca9d' },
  { name: 'Resource Downloads', value: 90, color: '#ffc658' },
  { name: 'Video Watches', value: 80, color: '#ff8042' },
];

const StudentEngagementChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Engagement Metrics</CardTitle>
        <CardDescription>Interaction with course materials and discussions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentEngagementChart;
