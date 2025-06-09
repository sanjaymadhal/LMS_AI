
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import AttendanceChart from '../charts/AttendanceChart';
import AttendanceStats from '../AttendanceStats';

const AttendanceTab: React.FC = () => {
  return (
    <TabsContent value="attendance" className="space-y-6 animate-fade-in">
      <AttendanceChart />
      <AttendanceStats />
    </TabsContent>
  );
};

export default AttendanceTab;
