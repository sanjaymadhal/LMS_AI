
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getSubjectsByParams } from '@/data/subjectsData';

interface WorkspaceSubjectListProps {
  semester: string;
  searchQuery: string;
  onSubjectSelect?: (subjectId: string) => void;
}

const WorkspaceSubjectList: React.FC<WorkspaceSubjectListProps> = ({ semester, searchQuery, onSubjectSelect }) => {
  const subjects = getSubjectsByParams({ semester, search: searchQuery });
  
  const handleClick = (subjectId: string) => {
    if (onSubjectSelect) {
      onSubjectSelect(subjectId);
    }
  };
  
  if (subjects.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="font-medium text-lg">No subjects found</h3>
        <p className="text-muted-foreground">Try adjusting your search or add new subjects</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left font-medium">Code</th>
            <th className="px-4 py-2 text-left font-medium">Subject</th>
            <th className="px-4 py-2 text-left font-medium">Schedule</th>
            <th className="px-4 py-2 text-left font-medium">Students</th>
            <th className="px-4 py-2 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr 
              key={subject.id} 
              className="border-b hover:bg-muted/50 cursor-pointer transition-colors" 
              onClick={() => handleClick(subject.id)}
            >
              <td className="px-4 py-3">
                <div className="font-medium">{subject.code}</div>
              </td>
              <td className="px-4 py-3">
                <div>{subject.name}</div>
              </td>
              <td className="px-4 py-3">
                <div>{subject.schedule.day} {subject.schedule.time}</div>
              </td>
              <td className="px-4 py-3">
                <div>{subject.studentCount || '-'}</div>
              </td>
              <td className="px-4 py-3">
                {subject.ongoing ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                    Ongoing
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                    Upcoming
                  </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkspaceSubjectList;
