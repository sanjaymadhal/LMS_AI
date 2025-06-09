
import React from 'react';
import { Card } from '@/components/ui/card';
import { getSubjectsByParams } from '@/data/subjectsData';

interface WorkspaceSubjectGridProps {
  semester: string;
  searchQuery: string;
  onSubjectSelect?: (subjectId: string) => void;
}

const WorkspaceSubjectGrid: React.FC<WorkspaceSubjectGridProps> = ({ semester, searchQuery, onSubjectSelect }) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {subjects.map((subject) => (
        <Card 
          key={subject.id}
          className="p-6 cursor-pointer hover:shadow-md transition-shadow group border-l-4"
          style={{ borderLeftColor: subject.color }}
          onClick={() => handleClick(subject.id)}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold tracking-tight">{subject.code}</h3>
              {subject.ongoing && (
                <span className="text-xs font-medium bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                  Ongoing
                </span>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">{subject.name}</p>
            
            <div className="pt-2 flex items-center justify-between text-xs">
              <span>
                {subject.schedule.day} {subject.schedule.time}
              </span>
              {subject.studentCount && (
                <span className="text-muted-foreground">
                  {subject.studentCount} students
                </span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WorkspaceSubjectGrid;
