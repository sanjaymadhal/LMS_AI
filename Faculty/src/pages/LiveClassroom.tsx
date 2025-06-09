
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Play,
  ArrowLeft,
  Calendar,
  CalendarCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WorkspaceSubjectGrid from '@/components/workspace/WorkspaceSubjectGrid';
import WorkspaceSubjectList from '@/components/workspace/WorkspaceSubjectList';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LiveClassroom: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSemester, setCurrentSemester] = useState<string>('');
  const [showAttendanceDialog, setShowAttendanceDialog] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get the current selected semester from sessionStorage
  useEffect(() => {
    const semester = sessionStorage.getItem('currentSemester');
    if (semester) {
      setCurrentSemester(semester);
    } else {
      navigate('/select-semester');
    }
  }, [navigate]);

  const handlePresentMode = () => {
    toast({
      title: "Present Mode",
      description: "This would enter presentation mode for teaching in a real implementation.",
    });
  };

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setShowAttendanceDialog(true);
  };

  const handleMarkAttendance = () => {
    setShowAttendanceDialog(false);
    navigate('/workspace/attendance', { 
      state: { 
        subjectId: selectedSubject,
        subjectName: "Selected Subject", // In a real implementation, this would be dynamic
        subjectCode: "SUB101" // In a real implementation, this would be dynamic
      } 
    });
  };
  
  const handleSkipAttendance = () => {
    setShowAttendanceDialog(false);
    navigate(`/workspace/${selectedSubject}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Live Classroom</h1>
          <p className="text-muted-foreground">Present your teaching materials and manage attendance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="hover-scale" onClick={handlePresentMode}>
            <Play className="h-4 w-4 mr-1" />
            Enter Presentation Mode
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
            <CardTitle>Subjects - {getSemesterName(currentSemester)}</CardTitle>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant={view === 'grid' ? 'default' : 'outline'} 
                size="icon" 
                className="h-9 w-9"
                onClick={() => setView('grid')}
              >
                <div className="grid grid-cols-2 gap-1 h-4 w-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </Button>
              <Button 
                variant={view === 'list' ? 'default' : 'outline'} 
                size="icon" 
                className="h-9 w-9"
                onClick={() => setView('list')}
              >
                <div className="flex flex-col gap-1 h-4 w-4 justify-between">
                  <div className="h-[2px] w-full bg-current rounded-full"></div>
                  <div className="h-[2px] w-full bg-current rounded-full"></div>
                  <div className="h-[2px] w-full bg-current rounded-full"></div>
                </div>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {view === 'grid' ? 
            <WorkspaceSubjectGrid 
              semester={currentSemester} 
              searchQuery={searchQuery} 
              onSubjectSelect={handleSubjectSelect}
            /> : 
            <WorkspaceSubjectList 
              semester={currentSemester} 
              searchQuery={searchQuery} 
              onSubjectSelect={handleSubjectSelect}
            />
          }
        </CardContent>
      </Card>

      <AlertDialog open={showAttendanceDialog} onOpenChange={setShowAttendanceDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark attendance for this class?</AlertDialogTitle>
            <AlertDialogDescription>
              It's recommended to take attendance before starting the presentation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleSkipAttendance}>Skip</AlertDialogCancel>
            <AlertDialogAction onClick={handleMarkAttendance}>
              <CalendarCheck className="mr-2 h-4 w-4" />
              Mark Attendance
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Helper function to get semester name
const getSemesterName = (semesterId: string): string => {
  switch (semesterId) {
    case "1": return "1st Semester";
    case "2": return "2nd Semester";
    case "3": return "3rd Semester";
    case "4": return "4th Semester";
    case "5": return "5th Semester";
    case "6": return "6th Semester";
    case "7": return "7th Semester";
    case "8": return "8th Semester";
    default: return "Select Semester";
  }
};

export default LiveClassroom;
