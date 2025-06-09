
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown,
  Play,
  Calendar,
  CalendarCheck,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getSubject } from '@/data/subjectsData';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SubjectView: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const subject = getSubject(subjectId || '');
  const [attendanceReminded, setAttendanceReminded] = useState<boolean>(false);
  const [showAttendanceDialog, setShowAttendanceDialog] = useState<boolean>(false);
  
  if (!subject) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Subject not found</h2>
        <p className="mb-4 text-muted-foreground">The subject you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/workspace')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workspace
        </Button>
      </div>
    );
  }
  
  const handleStartPresentation = (presentationName: string) => {
    if (!attendanceReminded) {
      setShowAttendanceDialog(true);
    } else {
      toast({
        title: "Starting presentation",
        description: `Now presenting: ${presentationName}`,
      });
    }
  };
  
  const handleMarkAttendance = () => {
    setAttendanceReminded(true);
    setShowAttendanceDialog(false);
    navigate('/workspace/attendance', { 
      state: { 
        subjectId: subject.id,
        subjectName: subject.name,
        subjectCode: subject.code
      } 
    });
  };
  
  const handleSkipAttendance = () => {
    setAttendanceReminded(true);
    setShowAttendanceDialog(false);
    toast({
      title: "Attendance reminder",
      description: "Attendance marking was skipped for this session.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/workspace')}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{subject.code}</h1>
            <p className="text-muted-foreground">{subject.name}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="hover-scale"
            onClick={() => navigate('/workspace/attendance', { 
              state: { 
                subjectId: subject.id, 
                subjectName: subject.name,
                subjectCode: subject.code
              } 
            })}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Modules and Chapters</CardTitle>
          <CardDescription>
            Select a chapter to begin the presentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {subject.modules.map((module) => (
              <AccordionItem key={module.id} value={module.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{module.name}</span>
                    <span className="text-xs text-muted-foreground">{module.chapters.length} chapters</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-4 pt-2">
                    {module.chapters.map((chapter) => (
                      <div key={chapter.id} className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">{chapter.name}</h3>
                        <div className="space-y-2">
                          {chapter.presentations.map((presentation) => (
                            <div key={presentation.id} className="flex items-center justify-between">
                              <span className="text-sm">{presentation.name}</span>
                              <Button 
                                size="sm" 
                                onClick={() => handleStartPresentation(presentation.name)}
                              >
                                <Play className="h-4 w-4 mr-1" />
                                Start
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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

export default SubjectView;
