
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface AssignmentFeedbackViewProps {
  assignmentId: string;
}

const DUMMY_SUBMISSIONS = [
  {
    id: '1',
    student: { id: '1', name: 'John Smith', avatar: '' },
    submissionDate: new Date('2025-05-20T14:32:00'),
    status: 'submitted',
    grade: null,
    feedback: '',
    attachments: ['homework1.pdf']
  },
  {
    id: '2',
    student: { id: '2', name: 'Emma Johnson', avatar: '' },
    submissionDate: new Date('2025-05-19T09:45:00'),
    status: 'graded',
    grade: 92,
    feedback: 'Excellent work. Well structured and clearly explained.',
    attachments: ['assignment2.docx', 'diagram.png']
  },
  {
    id: '3',
    student: { id: '3', name: 'Michael Brown', avatar: '' },
    submissionDate: null,
    status: 'missing',
    grade: null,
    feedback: '',
    attachments: []
  },
  {
    id: '4',
    student: { id: '4', name: 'Sarah Davis', avatar: '' },
    submissionDate: new Date('2025-05-21T16:12:00'),
    status: 'late',
    grade: 85,
    feedback: 'Good work overall, but submitted late.',
    attachments: ['sarah_solution.pdf']
  },
  {
    id: '5',
    student: { id: '5', name: 'David Wilson', avatar: '' },
    submissionDate: new Date('2025-05-18T11:05:00'),
    status: 'submitted',
    grade: null,
    feedback: '',
    attachments: ['assignment_david.zip']
  }
];

const AssignmentFeedbackView: React.FC<AssignmentFeedbackViewProps> = ({ assignmentId }) => {
  const [submissions, setSubmissions] = useState(DUMMY_SUBMISSIONS);
  const [filter, setFilter] = useState<'all' | 'graded' | 'ungraded' | 'missing'>('all');
  const { toast } = useToast();

  const filteredSubmissions = submissions.filter(submission => {
    if (filter === 'all') return true;
    if (filter === 'graded') return submission.grade !== null;
    if (filter === 'ungraded') return submission.status !== 'missing' && submission.grade === null;
    if (filter === 'missing') return submission.status === 'missing';
    return true;
  });

  const updateSubmissionGrade = (submissionId: string, grade: number | null, feedback: string) => {
    const updatedSubmissions = submissions.map(submission => {
      if (submission.id === submissionId) {
        return {
          ...submission,
          grade,
          feedback,
          status: grade !== null ? 'graded' : submission.status
        };
      }
      return submission;
    });
    
    setSubmissions(updatedSubmissions);
    
    toast({
      title: "Feedback Saved",
      description: "Student feedback has been saved successfully.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'submitted':
        return <Badge className="bg-green-500">Submitted</Badge>;
      case 'graded':
        return <Badge className="bg-blue-500">Graded</Badge>;
      case 'missing':
        return <Badge className="bg-red-500">Missing</Badge>;
      case 'late':
        return <Badge className="bg-yellow-500">Late</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'graded' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('graded')}
              >
                <CheckCircle2 className="mr-1 h-3 w-3" /> Graded
              </Button>
              <Button 
                variant={filter === 'ungraded' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('ungraded')}
              >
                <Clock className="mr-1 h-3 w-3" /> Ungraded
              </Button>
              <Button 
                variant={filter === 'missing' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('missing')}
              >
                <XCircle className="mr-1 h-3 w-3" /> Missing
              </Button>
            </div>
            
            <Button size="sm" onClick={() => {
              toast({
                title: "Grades Published",
                description: "All grades have been published to students.",
              });
            }}>
              Publish All Grades
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Student</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead className="text-right">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id} className={cn(
                    "group cursor-pointer",
                    submission.status === 'missing' && "bg-red-50"
                  )}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={submission.student.avatar} alt={submission.student.name} />
                          <AvatarFallback>{submission.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{submission.student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(submission.status)}</TableCell>
                    <TableCell>
                      {submission.submissionDate ? 
                        new Date(submission.submissionDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 
                        'Not submitted'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {submission.attachments.map((file, idx) => (
                          <Badge key={idx} variant="outline" className="bg-background">
                            {file}
                          </Badge>
                        ))}
                        {submission.attachments.length === 0 && (
                          <span className="text-muted-foreground text-sm">No files</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Input
                          type="number"
                          className="w-16 text-right"
                          placeholder="-"
                          value={submission.grade !== null ? submission.grade : ''}
                          disabled={submission.status === 'missing'}
                          onChange={(e) => {
                            const value = e.target.value !== '' ? parseInt(e.target.value) : null;
                            updateSubmissionGrade(submission.id, value, submission.feedback);
                          }}
                        />
                        <span className="text-sm text-muted-foreground">/100</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={submission.status === 'missing'}
                          onClick={() => {
                            // This would open a feedback modal in a real implementation
                            const feedback = prompt('Enter feedback for the student:', submission.feedback);
                            if (feedback !== null) {
                              updateSubmissionGrade(submission.id, submission.grade, feedback);
                            }
                          }}
                        >
                          Feedback
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredSubmissions.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40">
                <p className="text-muted-foreground">No matching submissions found.</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => setFilter('all')}
                >
                  Show All Submissions
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium">Submission Rate</h3>
                <p className="text-2xl font-bold">80%</p>
                <p className="text-sm text-muted-foreground">20 out of 25 students</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium">Average Grade</h3>
                <p className="text-2xl font-bold">87.5</p>
                <p className="text-sm text-muted-foreground">Out of 100 points</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-medium">Late Submissions</h3>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">12% of submissions</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium">Time to Grade</h3>
                <p className="text-2xl font-bold">1.5 days</p>
                <p className="text-sm text-muted-foreground">Average turnaround</p>
              </div>
            </div>
            
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Grade Distribution</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>90-100%</span>
                    <span>8 students</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>80-89%</span>
                    <span>6 students</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>70-79%</span>
                    <span>4 students</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Below 70%</span>
                    <span>2 students</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentFeedbackView;
