import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  TrendingUp, 
  Settings, 
  Video,
  Plus,
  Upload,
  Image,
  MessageSquare,
  Clock,
  MoreHorizontal,
  Paperclip,
  Calendar,
  CheckCircle,
  Bug
} from 'lucide-react';
import AssignmentModal from './AssignmentModal';
import MaterialModal from './MaterialModal';
import AnnouncementModal from './AnnouncementModal';
import QuizTypeModal from './QuizTypeModal';
import PuzzleQuestQuiz from './PuzzleQuestQuiz';
import PuzzleQuestCreator from './PuzzleQuestCreator';
import MCQQuizCreator from './MCQQuizCreator';
import BugHuntCreator from './BugHuntCreator';
import AssignmentDetailView from './AssignmentDetailView';

interface ClassViewProps {
  classData: {
    id: string;
    title: string;
    code: string;
    semester: string;
    students: number;
    assignments: number;
    attendance: string;
  };
  onBack: () => void;
}

interface ActivityItem {
  id: string;
  type: 'announcement' | 'assignment' | 'material' | 'reminder';
  title: string;
  content: string;
  author: string;
  authorInitials: string;
  time: string;
  attachments?: { name: string; type: string }[];
  hasMoreOptions?: boolean;
}

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

interface Quiz {
  id: string;
  title: string;
  description: string;
  type: 'multiple-choice' | 'puzzle-quest' | 'bug-hunt';
  questions: number;
  timeLimit: number;
  attempts: number;
  status: 'published' | 'draft';
  publishedAt: string;
}

const ClassView: React.FC<ClassViewProps> = ({ classData, onBack }) => {
  const [announcement, setAnnouncement] = useState('');
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [materialModalOpen, setMaterialModalOpen] = useState(false);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [quizTypeModalOpen, setQuizTypeModalOpen] = useState(false);
  const [puzzleQuestOpen, setPuzzleQuestOpen] = useState(false);
  const [puzzleQuestCreatorOpen, setPuzzleQuestCreatorOpen] = useState(false);
  const [mcqQuizCreatorOpen, setMcqQuizCreatorOpen] = useState(false);
  const [bugHuntCreatorOpen, setBugHuntCreatorOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<'stream' | 'assignments' | 'quizzes'>('stream');
  const [publishedAssignments, setPublishedAssignments] = useState<Assignment[]>([]);
  const [publishedQuizzes, setPublishedQuizzes] = useState<Quiz[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  
  const [activityStream, setActivityStream] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'reminder',
      title: 'Reminder: Mid-term exams next week!',
      content: 'The detailed schedule has been posted on the notice board and sent via email. Good luck with your preparations!',
      author: 'Class Update',
      authorInitials: 'CU',
      time: '5h ago',
      hasMoreOptions: true
    },
    {
      id: '2',
      type: 'material',
      title: 'Lecture Slides for Chapter 5: Thermodynamics',
      content: 'Please review these slides before our next class. Focus on the first and second laws.',
      author: 'Dr. Emily Carter',
      authorInitials: 'EC',
      time: '1d ago',
      attachments: [{ name: 'Chapter 5 Slides.pptx', type: 'PPTX' }],
      hasMoreOptions: true
    }
  ]);

  const handleAssignmentSubmit = (data: any) => {
    console.log('Assignment created:', data);
    
    // Create new assignment and add to published assignments
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      points: data.points || 100,
      status: 'published',
      submissionsCount: 0,
      totalStudents: classData.students,
      publishedAt: new Date().toISOString()
    };
    
    setPublishedAssignments(prev => [newAssignment, ...prev]);
    
    // Also add to activity stream
    const activityItem: ActivityItem = {
      id: Date.now().toString(),
      type: 'assignment',
      title: `Assignment: ${data.title}`,
      content: data.description,
      author: 'You',
      authorInitials: 'YO',
      time: 'Just now',
      hasMoreOptions: true
    };
    
    setActivityStream(prev => [activityItem, ...prev]);
  };

  const handleMaterialSubmit = (data: any) => {
    console.log('Material created:', data);
    // Handle material creation logic here
  };

  const handleAnnouncementSubmit = (data: any) => {
    console.log('Announcement created:', data);
    // Handle announcement creation logic here
  };

  const handleQuizTypeSelect = (type: 'multiple-choice' | 'puzzle-quest-demo' | 'puzzle-quest-create' | 'bug-hunt') => {
    console.log('Quiz type selected:', type);
    setQuizTypeModalOpen(false);
    
    if (type === 'multiple-choice') {
      setMcqQuizCreatorOpen(true);
    } else if (type === 'puzzle-quest-demo') {
      setPuzzleQuestOpen(true);
    } else if (type === 'puzzle-quest-create') {
      setPuzzleQuestCreatorOpen(true);
    } else if (type === 'bug-hunt') {
      setBugHuntCreatorOpen(true);
    }
  };

  const handlePuzzleQuestSave = (quizData: any) => {
    console.log('Puzzle Quest created:', quizData);
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: quizData.title || 'Puzzle Quest Quiz',
      description: quizData.description || 'Interactive puzzle quest quiz',
      type: 'puzzle-quest',
      questions: quizData.questions?.length || 5,
      timeLimit: quizData.timeLimit || 30,
      attempts: quizData.attempts || 3,
      status: 'published',
      publishedAt: new Date().toISOString()
    };
    setPublishedQuizzes(prev => [newQuiz, ...prev]);
  };

  const handleMCQQuizSave = (quizData: any) => {
    console.log('MCQ Quiz created:', quizData);
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: quizData.title || 'Multiple Choice Quiz',
      description: quizData.description || 'Multiple choice quiz',
      type: 'multiple-choice',
      questions: quizData.questions?.length || 10,
      timeLimit: quizData.timeLimit || 20,
      attempts: quizData.attempts || 2,
      status: 'published',
      publishedAt: new Date().toISOString()
    };
    setPublishedQuizzes(prev => [newQuiz, ...prev]);
  };

  const handleBugHuntSave = (bugHuntData: any) => {
    console.log('Bug Hunt created:', bugHuntData);
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: bugHuntData.title || 'Bug Hunt Challenge',
      description: bugHuntData.description || 'Find and fix the bugs',
      type: 'bug-hunt',
      questions: bugHuntData.bugs?.length || 5,
      timeLimit: bugHuntData.estimatedTime || 30,
      attempts: bugHuntData.attemptLimits || 3,
      status: 'published',
      publishedAt: new Date().toISOString()
    };
    setPublishedQuizzes(prev => [newQuiz, ...prev]);
  };

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (announcement.trim() || attachedFiles.length > 0) {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: 'announcement',
        title: announcement.length > 50 ? announcement.substring(0, 50) + '...' : announcement,
        content: announcement,
        author: 'You',
        authorInitials: 'YO',
        time: 'Just now',
        attachments: attachedFiles.map(file => ({
          name: file.name,
          type: file.name.split('.').pop()?.toUpperCase() || 'FILE'
        })),
        hasMoreOptions: true
      };

      setActivityStream(prev => [newActivity, ...prev]);
      setAnnouncement('');
      setAttachedFiles([]);
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'announcement':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'assignment':
        return <FileText className="h-5 w-5 text-amber-500" />;
      case 'material':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAuthorColor = (initials: string) => {
    const colors = [
      'bg-teal-500',
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-orange-500'
    ];
    return colors[initials.charCodeAt(0) % colors.length];
  };

  const handleAssignmentClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleBackFromAssignment = () => {
    setSelectedAssignment(null);
  };

  const renderQuizzesTab = () => {
    return (
      <div className="space-y-6">
        {publishedQuizzes.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No quizzes created yet</h3>
              <p className="text-muted-foreground mb-6">Create your first quiz to engage your students.</p>
              <Button onClick={() => setQuizTypeModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Quiz
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {publishedQuizzes.map((quiz) => (
              <Card 
                key={quiz.id} 
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          quiz.type === 'multiple-choice' ? 'bg-blue-500/10' :
                          quiz.type === 'puzzle-quest' ? 'bg-purple-500/10' :
                          'bg-red-500/10'
                        }`}>
                          {quiz.type === 'bug-hunt' ? (
                            <Bug className="h-5 w-5 text-red-500" />
                          ) : (
                            <FileText className={`h-5 w-5 ${
                              quiz.type === 'multiple-choice' ? 'text-blue-500' :
                              quiz.type === 'puzzle-quest' ? 'text-purple-500' :
                              'text-red-500'
                            }`} />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{quiz.title}</h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {quiz.type.replace('-', ' ')} • Published {new Date(quiz.publishedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-foreground/80 mb-4 leading-relaxed">
                        {quiz.description}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{quiz.questions} questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{quiz.timeLimit} minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          <span>{quiz.attempts} attempts allowed</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAssignmentsTab = () => {
    if (selectedAssignment) {
      return (
        <AssignmentDetailView 
          assignment={selectedAssignment}
          onBack={handleBackFromAssignment}
        />
      );
    }

    return (
      <div className="space-y-6">
        {publishedAssignments.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No assignments published yet</h3>
              <p className="text-muted-foreground mb-6">Create and publish your first assignment to get started.</p>
              <Button onClick={() => setAssignmentModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {publishedAssignments.map((assignment) => (
              <Card 
                key={assignment.id} 
                className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleAssignmentClick(assignment)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Published {new Date(assignment.publishedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-foreground/80 mb-4 leading-relaxed">
                        {assignment.description}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>{assignment.submissionsCount}/{assignment.totalStudents} submitted</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          <span>{assignment.points} points</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle menu options
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white border-b border-border">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={selectedAssignment ? handleBackFromAssignment : onBack}
                    className="text-white/80 hover:text-white cursor-pointer transition-colors"
                  >
                    {selectedAssignment ? classData.title : 'Virtual Classroom'}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/60" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white font-medium">
                    {selectedAssignment ? selectedAssignment.title : classData.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {!selectedAssignment && (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    onClick={onBack}
                    className="text-white hover:bg-white/20"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="flex gap-6">
                    <span 
                      className={`cursor-pointer border-b-2 pb-1 transition-colors ${
                        activeTab === 'stream' 
                          ? 'text-white border-white' 
                          : 'text-white/70 border-transparent hover:text-white'
                      }`}
                      onClick={() => setActiveTab('stream')}
                    >
                      Stream
                    </span>
                    <span 
                      className={`cursor-pointer border-b-2 pb-1 transition-colors ${
                        activeTab === 'assignments' 
                          ? 'text-white border-white' 
                          : 'text-white/70 border-transparent hover:text-white'
                      }`}
                      onClick={() => setActiveTab('assignments')}
                    >
                      Assignments
                    </span>
                    <span 
                      className={`cursor-pointer border-b-2 pb-1 transition-colors ${
                        activeTab === 'quizzes' 
                          ? 'text-white border-white' 
                          : 'text-white/70 border-transparent hover:text-white'
                      }`}
                      onClick={() => setActiveTab('quizzes')}
                    >
                      Quizzes
                    </span>
                    <span className="text-white/70 hover:text-white cursor-pointer transition-colors">People</span>
                    <span className="text-white/70 hover:text-white cursor-pointer transition-colors">Leaderboard</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <Video className="h-4 w-4 mr-2" />
                    Start Meet
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <Settings className="h-4 w-4 mr-2" />
                    Quick Settings
                  </Button>
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-white">{classData.title}</h1>
                <p className="text-white/80 mt-1 text-lg">{classData.semester}</p>
                <div className="flex gap-6 mt-3 text-sm text-white/70">
                  <span>Class Code: <span className="font-medium text-white">{classData.code}</span></span>
                  <span>Room: <span className="font-medium text-white">Room 101</span></span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {!selectedAssignment && (
          <>
            {/* Stats Cards */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-primary">{classData.students}</p>
                      <p className="text-sm font-medium text-foreground">Students</p>
                      <p className="text-xs text-muted-foreground">All students approved</p>
                    </div>
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-primary">{publishedAssignments.length}</p>
                      <p className="text-sm font-medium text-foreground">Published Assignments</p>
                      <p className="text-xs text-muted-foreground">
                        {publishedAssignments.filter(a => a.submissionsCount < a.totalStudents).length} need grading
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-primary">{publishedQuizzes.length}</p>
                      <p className="text-sm font-medium text-foreground">Active Quizzes</p>
                      <p className="text-xs text-muted-foreground">Interactive learning tools</p>
                    </div>
                    <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="grid gap-4 md:grid-cols-3">
              <Button 
                className="justify-start h-12 text-base font-medium"
                onClick={() => setAssignmentModalOpen(true)}
              >
                <Plus className="h-5 w-5 mr-3" />
                Create Assignment
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-12 text-base font-medium hover:bg-primary/5"
                onClick={() => setQuizTypeModalOpen(true)}
              >
                <FileText className="h-5 w-5 mr-3" />
                Create Quiz
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-12 text-base font-medium hover:bg-primary/5"
                onClick={() => setAnnouncementModalOpen(true)}
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                Announcement
              </Button>
            </div>
          </>
        )}

        {/* Tab Content */}
        {activeTab === 'stream' && !selectedAssignment && (
          <>
            {/* Announcement Section */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Announce something to your class</h3>
                <Textarea 
                  placeholder="Share something with your class..."
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  className="mb-4 min-h-[100px] text-base"
                  rows={4}
                />
                
                {/* Attached Files Display */}
                {attachedFiles.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {attachedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                      <label className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Attach
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleFileAttach}
                        />
                      </label>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                      <label className="cursor-pointer">
                        <Image className="h-4 w-4 mr-2" />
                        Media
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*,video/*"
                          multiple
                          onChange={handleFileAttach}
                        />
                      </label>
                    </Button>
                  </div>
                  <Button 
                    onClick={handlePost}
                    disabled={!announcement.trim() && attachedFiles.length === 0}
                    className="font-medium"
                  >
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Activity Stream */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Activity Stream</h3>
                    <p className="text-sm text-muted-foreground">Recent announcements, materials, and scheduled activities.</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {activityStream.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white text-sm font-medium ${getAuthorColor(activity.authorInitials)} shadow-sm`}>
                        {activity.authorInitials}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-foreground mb-2">
                              {activity.title}
                            </h4>
                            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                              {activity.content}
                            </p>
                            
                            {activity.attachments && activity.attachments.length > 0 && (
                              <div className="mb-3">
                                <p className="text-sm font-medium text-foreground mb-2">Attachments:</p>
                                {activity.attachments.map((attachment, index) => (
                                  <div key={index} className="inline-block mr-3 mb-2">
                                    <div className="bg-background border rounded-lg p-3 flex items-center gap-3 text-sm shadow-sm hover:shadow-md transition-shadow">
                                      <div className="bg-primary/10 px-2 py-1 rounded text-xs font-medium text-primary">
                                        {attachment.type}
                                      </div>
                                      <span className="text-foreground font-medium">{attachment.name}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="font-medium">{activity.author}</span>
                              <span>•</span>
                              <span>{activity.time}</span>
                            </div>
                          </div>
                          
                          {activity.hasMoreOptions && (
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'assignments' && renderAssignmentsTab()}
        {activeTab === 'quizzes' && renderQuizzesTab()}
      </div>

      {/* Modals */}
      <AssignmentModal
        isOpen={assignmentModalOpen}
        onClose={() => setAssignmentModalOpen(false)}
        onSubmit={handleAssignmentSubmit}
      />

      <MaterialModal
        isOpen={materialModalOpen}
        onClose={() => setMaterialModalOpen(false)}
        onSubmit={handleMaterialSubmit}
      />

      <AnnouncementModal
        isOpen={announcementModalOpen}
        onClose={() => setAnnouncementModalOpen(false)}
        onSubmit={handleAnnouncementSubmit}
      />

      <QuizTypeModal
        isOpen={quizTypeModalOpen}
        onClose={() => setQuizTypeModalOpen(false)}
        onSelectQuizType={handleQuizTypeSelect}
      />

      <PuzzleQuestQuiz
        isOpen={puzzleQuestOpen}
        onClose={() => setPuzzleQuestOpen(false)}
        quizTitle={`${classData.title} - Puzzle Quest`}
      />

      <PuzzleQuestCreator
        isOpen={puzzleQuestCreatorOpen}
        onClose={() => setPuzzleQuestCreatorOpen(false)}
        onSave={handlePuzzleQuestSave}
      />

      <MCQQuizCreator
        isOpen={mcqQuizCreatorOpen}
        onClose={() => setMcqQuizCreatorOpen(false)}
        onSave={handleMCQQuizSave}
      />

      <BugHuntCreator
        isOpen={bugHuntCreatorOpen}
        onClose={() => setBugHuntCreatorOpen(false)}
        onSave={handleBugHuntSave}
      />
    </div>
  );
};

export default ClassView;
