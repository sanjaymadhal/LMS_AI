
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  SlidersHorizontal,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  PenLine
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AssignmentForm from '@/components/assignments/AssignmentForm';
import AssignmentFeedbackView from '@/components/assignments/AssignmentFeedbackView';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const assignmentsData = [
  {
    id: '1',
    title: 'Database Normalization Assignment',
    subject: 'Database Management',
    dueDate: new Date('2025-05-30'),
    status: 'active',
    submissionCount: 18,
    totalStudents: 25
  },
  {
    id: '2',
    title: 'Python Functions Practice',
    subject: 'Programming Fundamentals',
    dueDate: new Date('2025-05-25'),
    status: 'active',
    submissionCount: 22,
    totalStudents: 30
  },
  {
    id: '3',
    title: 'Data Structures Quiz',
    subject: 'Data Structures',
    dueDate: new Date('2025-05-20'),
    status: 'completed',
    submissionCount: 27,
    totalStudents: 28
  },
  {
    id: '4',
    title: 'Web Development Project',
    subject: 'Web Technologies',
    dueDate: new Date('2025-06-10'),
    status: 'draft',
    submissionCount: 0,
    totalStudents: 22
  },
  {
    id: '5',
    title: 'Networking Protocols',
    subject: 'Computer Networks',
    dueDate: new Date('2025-05-15'),
    status: 'overdue',
    submissionCount: 15,
    totalStudents: 26
  }
];

const Assignments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'draft' | 'overdue'>('all');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  // Function to filter assignments
  const filteredAssignments = assignmentsData.filter(assignment => {
    // Filter by search query
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesFilter = selectedFilter === 'all' || assignment.status === selectedFilter;
    
    // Filter by date
    const matchesDate = !selectedDate || 
      (assignment.dueDate.getDate() === selectedDate.getDate() &&
      assignment.dueDate.getMonth() === selectedDate.getMonth() &&
      assignment.dueDate.getFullYear() === selectedDate.getFullYear());
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  // Handle bulk actions
  const handleBulkAction = (action: 'extend' | 'remind' | 'publish') => {
    switch(action) {
      case 'extend':
        toast({
          title: "Deadline Extended",
          description: "Deadline for selected assignments has been extended by 3 days.",
        });
        break;
      case 'remind':
        toast({
          title: "Reminders Sent",
          description: "Reminders sent to students who haven't submitted yet.",
        });
        break;
      case 'publish':
        toast({
          title: "Assignments Published",
          description: "Selected draft assignments have been published.",
        });
        break;
    }
  };

  // Handle form submission
  const handleFormSubmit = (formData: any) => {
    toast({
      title: "Assignment Created",
      description: `${formData.title} has been created successfully.`,
    });
    setShowForm(false);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">{status}</Badge>;
      case 'draft':
        return <Badge className="bg-gray-500">{status}</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Create, manage and grade student assignments</p>
        </div>
        
        <Button onClick={() => setShowForm(true)} className="hover-scale">
          <Plus className="mr-2 h-4 w-4" /> Create Assignment
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assignments..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="hidden md:flex gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0">
                  <div className="p-2 space-y-2">
                    <h4 className="font-medium text-sm">Status</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={selectedFilter === 'all' ? 'default' : 'outline'}
                        size="sm" 
                        onClick={() => setSelectedFilter('all')}
                      >
                        All
                      </Button>
                      <Button 
                        variant={selectedFilter === 'active' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedFilter('active')}
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Active
                      </Button>
                      <Button 
                        variant={selectedFilter === 'completed' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedFilter('completed')}
                      >
                        <Clock className="mr-1 h-3 w-3" /> Completed
                      </Button>
                      <Button 
                        variant={selectedFilter === 'draft' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedFilter('draft')}
                      >
                        <FileText className="mr-1 h-3 w-3" /> Draft
                      </Button>
                      <Button 
                        variant={selectedFilter === 'overdue' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedFilter('overdue')}
                      >
                        <AlertCircle className="mr-1 h-3 w-3" /> Overdue
                      </Button>
                    </div>
                    
                    <h4 className="font-medium text-sm mt-4">Due Date</h4>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                    
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="sm" onClick={() => {
                        setSelectedFilter('all');
                        setSelectedDate(undefined);
                      }}>
                        Clear Filters
                      </Button>
                      <Button size="sm">Apply Filters</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="hidden md:flex gap-1">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Bulk Actions</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0">
                  <div className="p-2 space-y-2">
                    <Button className="w-full justify-start" onClick={() => handleBulkAction('extend')}>
                      <CalendarIcon className="mr-2 h-4 w-4" /> Extend Deadline
                    </Button>
                    <Button className="w-full justify-start" onClick={() => handleBulkAction('remind')}>
                      <Clock className="mr-2 h-4 w-4" /> Send Reminders
                    </Button>
                    <Button className="w-full justify-start" onClick={() => handleBulkAction('publish')}>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Publish Drafts
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0">
                  <div className="p-2 space-y-2">
                    <h4 className="font-medium text-sm">Status</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={selectedFilter === 'all' ? 'default' : 'outline'}
                        size="sm" 
                        onClick={() => setSelectedFilter('all')}
                      >
                        All
                      </Button>
                      <Button 
                        variant={selectedFilter === 'active' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedFilter('active')}
                      >
                        Active
                      </Button>
                      <Button 
                        variant={selectedFilter === 'completed' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedFilter('completed')}
                      >
                        Completed
                      </Button>
                      <Button 
                        variant={selectedFilter === 'draft' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedFilter('draft')}
                      >
                        Draft
                      </Button>
                    </div>
                    
                    <h4 className="font-medium text-sm mt-4">Bulk Actions</h4>
                    <div className="space-y-2">
                      <Button className="w-full justify-start" size="sm" onClick={() => handleBulkAction('extend')}>
                        Extend Deadline
                      </Button>
                      <Button className="w-full justify-start" size="sm" onClick={() => handleBulkAction('remind')}>
                        Send Reminders
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <Tabs defaultValue="table" className="w-[200px]">
              <TabsList>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="cards">Cards</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="table">
            <TabsContent value="table" className="animate-fade-in">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell>{format(assignment.dueDate, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                      <TableCell>
                        {`${assignment.submissionCount}/${assignment.totalStudents}`}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-primary h-1.5 rounded-full" 
                            style={{width: `${(assignment.submissionCount / assignment.totalStudents) * 100}%`}}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Assignment Feedback</DialogTitle>
                              <DialogDescription>View and provide feedback for submissions</DialogDescription>
                            </DialogHeader>
                            <AssignmentFeedbackView assignmentId={assignment.id} />
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="ghost" size="sm" className="text-blue-500">
                          <PenLine className="h-4 w-4" />
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredAssignments.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-center">No assignments found. Try adjusting your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('all');
                    setSelectedDate(undefined);
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cards" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="hover-scale">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{assignment.title}</CardTitle>
                        {getStatusBadge(assignment.status)}
                      </div>
                      <CardDescription>{assignment.subject}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span>{format(assignment.dueDate, 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Submissions:</span>
                          <span>{`${assignment.submissionCount}/${assignment.totalStudents}`}</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{width: `${(assignment.submissionCount / assignment.totalStudents) * 100}%`}}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between pt-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm">Grade</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Assignment Feedback</DialogTitle>
                                <DialogDescription>View and provide feedback for submissions</DialogDescription>
                              </DialogHeader>
                              <AssignmentFeedbackView assignmentId={assignment.id} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredAssignments.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-center">No assignments found. Try adjusting your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('all');
                    setSelectedDate(undefined);
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Assignment Creation Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
            <DialogDescription>
              Create a new assignment for your students. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <AssignmentForm onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assignments;
