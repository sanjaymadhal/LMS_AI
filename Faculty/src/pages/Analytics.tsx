
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';

import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import AnalyticsFilters from '@/components/analytics/AnalyticsFilters';
import StatsCards from '@/components/analytics/StatsCards';
import PerformanceTab from '@/components/analytics/tabs/PerformanceTab';
import AttendanceTab from '@/components/analytics/tabs/AttendanceTab';
import EngagementTab from '@/components/analytics/tabs/EngagementTab';

const Analytics: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('current');
  const [dateRange, setDateRange] = useState<string>('semester');

  return (
    <div className="space-y-6 animate-fade-in">
      <AnalyticsHeader 
        title="Analytics Dashboard" 
        description="Track student performance and teaching effectiveness" 
      />
      
      <AnalyticsFilters 
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* Quick Stats */}
      <StatsCards />

      {/* Main Analytics Content */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="performance">
            <BarChartIcon className="h-4 w-4 mr-2" /> Performance
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <LineChartIcon className="h-4 w-4 mr-2" /> Attendance
          </TabsTrigger>
          <TabsTrigger value="engagement">
            <PieChartIcon className="h-4 w-4 mr-2" /> Engagement
          </TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <PerformanceTab />

        {/* Attendance Tab */}
        <AttendanceTab />

        {/* Engagement Tab */}
        <EngagementTab />
      </Tabs>
    </div>
  );
};

export default Analytics;
