
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', grade: 78 },
  { month: 'Feb', grade: 82 },
  { month: 'Mar', grade: 76 },
  { month: 'Apr', grade: 84 },
  { month: 'May', grade: 88 },
  { month: 'Jun', grade: 86 },
  { month: 'Jul', grade: 84 },
  { month: 'Aug', grade: 83 },
  { month: 'Sep', grade: 85 },
  { month: 'Oct', grade: 87 },
  { month: 'Nov', grade: 89 },
  { month: 'Dec', grade: 90 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border border-border rounded-md shadow-sm">
        <p className="text-sm font-medium">{`${label}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const AverageGrades: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Average Grades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12 }} 
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                tickCount={6}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="grade" 
                fill="#4361ee" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Average Grade</p>
            <p className="text-lg font-medium">84.3%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Passing Rate</p>
            <p className="text-lg font-medium">92%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Top Grade</p>
            <p className="text-lg font-medium">98%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Improvement</p>
            <p className="text-lg font-medium">+5.4%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AverageGrades;
