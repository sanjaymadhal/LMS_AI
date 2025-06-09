
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal, Mail, Eye } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  attendance: number;
  grade: number;
  status: 'Active' | 'Inactive' | 'At Risk';
  avatarUrl?: string;
}

const students: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    studentId: '2023001',
    attendance: 92,
    grade: 88,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Samantha Lee',
    email: 'samlee@example.com',
    studentId: '2023015',
    attendance: 95,
    grade: 94,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Mark Thompson',
    email: 'mark.t@example.com',
    studentId: '2023022',
    attendance: 76,
    grade: 65,
    status: 'At Risk',
  },
  {
    id: '4',
    name: 'Priya Sharma',
    email: 'priya.s@example.com',
    studentId: '2023008',
    attendance: 88,
    grade: 82,
    status: 'Active',
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.w@example.com',
    studentId: '2023030',
    attendance: 60,
    grade: 72,
    status: 'At Risk',
  },
  {
    id: '6',
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    studentId: '2023019',
    attendance: 90,
    grade: 91,
    status: 'Active',
  },
];

interface StudentsListProps {
  searchQuery: string;
}

const StudentsList: React.FC<StudentsListProps> = ({ searchQuery }) => {
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Inactive': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'At Risk': return 'bg-red-100 text-red-800 hover:bg-red-200';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>
              <div className="flex items-center">
                Attendance %
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Grade
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={student.avatarUrl} />
                    <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-muted-foreground">{student.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{student.studentId}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`w-16 h-2 rounded-full ${
                    student.attendance >= 90 ? 'bg-green-500' : 
                    student.attendance >= 75 ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`}>
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${student.attendance}%` }}
                    />
                  </div>
                  <span>{student.attendance}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className={`font-medium ${
                  student.grade >= 90 ? 'text-green-600' : 
                  student.grade >= 75 ? 'text-amber-600' : 
                  'text-red-600'
                }`}>
                  {student.grade}%
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(student.status)}`}>
                  {student.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" /> Send Message
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsList;
