
import React from 'react';
import { BarChart, Users, BookOpen, FileCheck, ArrowUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const StatsCard = ({ icon: Icon, title, value, trend, trendValue, className }: any) => {
  const isPositive = trendValue >= 0;
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-semibold">{value}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
            <Icon className="h-6 w-6 text-edu-primary" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <ArrowUp className={cn("h-3 w-3 mr-1", !isPositive && "rotate-180")} />
            {Math.abs(trendValue)}%
          </span>
          <span className="ml-2 text-muted-foreground">{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const StatsCards: React.FC = () => {
  const stats = [
    { 
      icon: Users, 
      title: 'Total Students', 
      value: '1,294', 
      trend: 'vs. last month', 
      trendValue: 12.5 
    },
    { 
      icon: BookOpen, 
      title: 'Active Courses', 
      value: '8', 
      trend: 'vs. last month', 
      trendValue: 4.2 
    },
    { 
      icon: FileCheck, 
      title: 'Assignments', 
      value: '24', 
      trend: 'vs. last week', 
      trendValue: -2.4 
    },
    { 
      icon: BarChart, 
      title: 'Completion Rate', 
      value: '87%', 
      trend: 'vs. last month', 
      trendValue: 6.8 
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatsCard key={i} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
