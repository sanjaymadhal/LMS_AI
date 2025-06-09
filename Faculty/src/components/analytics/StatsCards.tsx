
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    positive: boolean;
  };
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, description }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`flex items-center ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
            {change.positive ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">{change.value}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: "Average Grade",
      value: "82%",
      change: { value: "+5%", positive: true },
      description: "Compared to previous semester"
    },
    {
      title: "Attendance Rate",
      value: "89%",
      change: { value: "+2%", positive: true },
      description: "Compared to previous semester"
    },
    {
      title: "Pass Rate",
      value: "91%",
      change: { value: "+3%", positive: true },
      description: "Compared to previous semester"
    },
    {
      title: "At-Risk Students",
      value: "6",
      change: { value: "-2", positive: true },
      description: "Improved from 8 last semester"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default StatsCards;
