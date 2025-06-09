
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const attendanceData = [
  { name: 'Week 1', attendance: 95 },
  { name: 'Week 2', attendance: 92 },
  { name: 'Week 3', attendance: 88 },
  { name: 'Week 4', attendance: 93 },
  { name: 'Week 5', attendance: 85 },
  { name: 'Week 6', attendance: 90 },
  { name: 'Week 7', attendance: 94 },
  { name: 'Week 8', attendance: 91 },
];

const AttendanceChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Trends</CardTitle>
        <CardDescription>Weekly attendance rate across all classes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={attendanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attendance" name="Attendance %" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
