
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AttendanceStats: React.FC = () => {
  const stats = [
    {
      title: "Highest Attendance",
      day: "Monday",
      rate: "95% average attendance",
      color: "green"
    },
    {
      title: "Lowest Attendance",
      day: "Friday",
      rate: "82% average attendance",
      color: "red"
    },
    {
      title: "Chronic Absentees",
      count: "3 Students",
      description: "Missing > 20% of classes",
      color: "amber"
    },
    {
      title: "Perfect Attendance",
      count: "12 Students",
      description: "Never missed a class",
      color: "blue"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-${stat.color}-50`}>
          <CardContent className="pt-6">
            <h3 className={`font-medium text-${stat.color}-700`}>{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.day || stat.count}</p>
            <p className={`text-sm text-${stat.color}-600`}>{stat.rate || stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttendanceStats;
