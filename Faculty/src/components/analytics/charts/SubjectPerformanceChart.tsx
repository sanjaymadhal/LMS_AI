
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const subjectPerformanceData = [
  { name: 'Database Management', avgGrade: 85, passRate: 92 },
  { name: 'Programming Fundamentals', avgGrade: 78, passRate: 88 },
  { name: 'Data Structures', avgGrade: 72, passRate: 84 },
  { name: 'Web Technologies', avgGrade: 81, passRate: 90 },
  { name: 'Computer Networks', avgGrade: 76, passRate: 86 },
];

const SubjectPerformanceChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
        <CardDescription>Average grade and pass rate by subject</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={subjectPerformanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgGrade" name="Avg Grade" fill="#8884d8" />
              <Bar dataKey="passRate" name="Pass Rate %" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectPerformanceChart;
