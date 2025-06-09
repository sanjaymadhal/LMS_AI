
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const submissionTimeData = [
  { name: '> 3 days early', value: 15, color: '#4caf50' },
  { name: '1-3 days early', value: 30, color: '#8bc34a' },
  { name: 'Last 24 hours', value: 40, color: '#ffeb3b' },
  { name: 'Last 6 hours', value: 10, color: '#ff9800' },
  { name: 'Late', value: 5, color: '#f44336' },
];

const SubmissionTimingChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment Submission Timing</CardTitle>
        <CardDescription>When students submit their assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={submissionTimeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {submissionTimeData.map((entry, index) => (
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

export default SubmissionTimingChart;
