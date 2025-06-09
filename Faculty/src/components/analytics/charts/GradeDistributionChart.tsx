
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const gradeData = [
  { name: 'Assignment 1', avgGrade: 82, highestGrade: 98, lowestGrade: 65 },
  { name: 'Assignment 2', avgGrade: 78, highestGrade: 95, lowestGrade: 60 },
  { name: 'Quiz 1', avgGrade: 85, highestGrade: 100, lowestGrade: 72 },
  { name: 'Midterm', avgGrade: 76, highestGrade: 94, lowestGrade: 58 },
  { name: 'Assignment 3', avgGrade: 81, highestGrade: 97, lowestGrade: 63 },
  { name: 'Quiz 2', avgGrade: 83, highestGrade: 99, lowestGrade: 70 },
  { name: 'Final Project', avgGrade: 87, highestGrade: 100, lowestGrade: 75 },
];

const GradeDistributionChart: React.FC = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Grade Distribution By Assignment</CardTitle>
        <CardDescription>Average, highest, and lowest grades across assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={gradeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgGrade" name="Average Grade" fill="#8884d8" />
              <Bar dataKey="highestGrade" name="Highest Grade" fill="#82ca9d" />
              <Bar dataKey="lowestGrade" name="Lowest Grade" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeDistributionChart;
