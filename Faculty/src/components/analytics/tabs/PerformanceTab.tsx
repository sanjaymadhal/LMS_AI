
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import GradeDistributionChart from '../charts/GradeDistributionChart';
import SubjectPerformanceChart from '../charts/SubjectPerformanceChart';
import SubmissionTimingChart from '../charts/SubmissionTimingChart';

const PerformanceTab: React.FC = () => {
  return (
    <TabsContent value="performance" className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GradeDistributionChart />
        <SubjectPerformanceChart />
        <SubmissionTimingChart />
      </div>
    </TabsContent>
  );
};

export default PerformanceTab;
