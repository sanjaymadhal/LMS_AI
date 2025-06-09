
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import StudentEngagementChart from '../charts/StudentEngagementChart';
import ResourcePopularity from '../charts/ResourcePopularity';
import EngagementPerformanceChart from '../charts/EngagementPerformanceChart';

const EngagementTab: React.FC = () => {
  return (
    <TabsContent value="engagement" className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentEngagementChart />
        <ResourcePopularity />
        <EngagementPerformanceChart />
      </div>
    </TabsContent>
  );
};

export default EngagementTab;
