
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalyticsFiltersProps {
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  selectedSemester: string;
  setSelectedSemester: (value: string) => void;
  dateRange: string;
  setDateRange: (value: string) => void;
}

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
  selectedSubject,
  setSelectedSubject,
  selectedSemester,
  setSelectedSemester,
  dateRange,
  setDateRange
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="database">Database Management</SelectItem>
            <SelectItem value="programming">Programming Fundamentals</SelectItem>
            <SelectItem value="datastructures">Data Structures</SelectItem>
            <SelectItem value="web">Web Technologies</SelectItem>
            <SelectItem value="networks">Computer Networks</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger>
            <SelectValue placeholder="Current Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Semester</SelectItem>
            <SelectItem value="previous">Previous Semester</SelectItem>
            <SelectItem value="all">All Semesters</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger>
            <SelectValue placeholder="This Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semester">This Semester</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AnalyticsFilters;
