
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Download, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Clock,
  BarChart3
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: 'published' | 'draft';
  submissionsCount: number;
  totalStudents: number;
  publishedAt: string;
}

interface StudentSubmission {
  id: string;
  studentName: string;
  studentId: string;
  submissionDate?: string;
  status: 'submitted' | 'missing' | 'late' | 'graded';
  score?: number;
  feedback?: string;
  files: string[];
}

interface AssignmentDetailViewProps {
  assignment: Assignment;
  onBack: () => void;
}

// Mock student data
const mockStudents: StudentSubmission[] = [
  {
    id: '1',
    studentName: 'Alice Johnson',
    studentId: 'STU001',
    submissionDate: '2025-05-24T14:30:00Z',
    status: 'graded',
    score: 95,
    feedback: 'Excellent work! Well structured and clearly explained.',
    files: ['assignment1.pdf', 'supporting_docs.docx']
  },
  {
    id: '2',
    studentName: 'Bob Smith',
    studentId: 'STU002',
    submissionDate: '2025-05-24T16:45:00Z',
    status: 'graded',
    score: 87,
    feedback: 'Good work overall, minor improvements needed in conclusion.',
    files: ['bob_assignment.pdf']
  },
  {
    id: '3',
    studentName: 'Carol Davis',
    studentId: 'STU003',
    status: 'missing',
    files: []
  },
  {
    id: '4',
    studentName: 'David Wilson',
    studentId: 'STU004',
    submissionDate: '2025-05-25T09:15:00Z',
    status: 'late',
    score: 78,
    feedback: 'Late submission. Good content but needs better organization.',
    files: ['david_work.pdf']
  },
  {
    id: '5',
    studentName: 'Emma Brown',
    studentId: 'STU005',
    submissionDate: '2025-05-24T11:20:00Z',
    status: 'submitted',
    files: ['emma_assignment.pdf', 'references.txt']
  },
  {
    id: '6',
    studentName: 'Frank Miller',
    studentId: 'STU006',
    submissionDate: '2025-05-24T13:45:00Z',
    status: 'graded',
    score: 92,
    feedback: 'Very thorough analysis. Great use of examples.',
    files: ['frank_submission.pdf']
  }
];

const AssignmentDetailView: React.FC<AssignmentDetailViewProps> = ({ assignment, onBack }) => {
  const [students] = useState<StudentSubmission[]>(mockStudents);
  const [filter, setFilter] = useState<'all' | 'submitted' | 'missing' | 'graded'>('all');

  const filteredStudents = students.filter(student => {
    if (filter === 'all') return true;
    return student.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-blue-500">Submitted</Badge>;
      case 'graded':
        return <Badge className="bg-green-500">Graded</Badge>;
      case 'missing':
        return <Badge className="bg-red-500">Missing</Badge>;
      case 'late':
        return <Badge className="bg-orange-500">Late</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
      case 'graded':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'missing':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'late':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const submittedCount = students.filter(s => s.status !== 'missing').length;
  const gradedCount = students.filter(s => s.status === 'graded').length;
  const averageScore = students
    .filter(s => s.score !== undefined)
    .reduce((sum, s) => sum + (s.score || 0), 0) / gradedCount || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">{assignment.title}</h1>
          <p className="text-white/80">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{submittedCount}</p>
                <p className="text-sm text-muted-foreground">Submitted</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{students.length - submittedCount}</p>
                <p className="text-sm text-muted-foreground">Missing</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{gradedCount}</p>
                <p className="text-sm text-muted-foreground">Graded</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{averageScore.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student Submissions</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'submitted' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('submitted')}
              >
                Submitted
              </Button>
              <Button 
                variant={filter === 'graded' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('graded')}
              >
                Graded
              </Button>
              <Button 
                variant={filter === 'missing' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('missing')}
              >
                Missing
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Files</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {student.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.studentName}</p>
                        <p className="text-sm text-muted-foreground">{student.studentId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(student.status)}
                      {getStatusBadge(student.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {student.submissionDate ? 
                      new Date(student.submissionDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 
                      'Not submitted'
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {student.score !== undefined ? (
                        <span className="font-medium">{student.score}/{assignment.points}</span>
                      ) : student.status === 'submitted' ? (
                        <Input
                          type="number"
                          placeholder="Score"
                          className="w-20"
                          max={assignment.points}
                        />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.files.map((file, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {file}
                        </Badge>
                      ))}
                      {student.files.length === 0 && (
                        <span className="text-muted-foreground text-sm">No files</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {student.files.length > 0 && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {student.status !== 'missing' && (
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentDetailView;
