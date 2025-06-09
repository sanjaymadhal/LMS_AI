
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EngagementPerformanceChart: React.FC = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Engagement vs. Performance</CardTitle>
        <CardDescription>Correlation between student engagement and grades</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                type="category"
                allowDuplicatedCategory={false}
                label={{ value: 'Engagement Level', position: 'insideBottomRight', offset: -10 }}
              />
              <YAxis
                label={{ value: 'Average Grade', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <Tooltip />
              <Line 
                data={[
                  { name: 'Very Low', grade: 65 },
                  { name: 'Low', grade: 72 },
                  { name: 'Medium', grade: 78 },
                  { name: 'High', grade: 86 },
                  { name: 'Very High', grade: 93 }
                ]} 
                dataKey="grade" 
                name="Average Grade" 
                stroke="#8884d8" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementPerformanceChart;
