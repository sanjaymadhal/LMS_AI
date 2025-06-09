import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Plus,
  Trophy,
  Calendar,
  CheckSquare,
  Flame,
  Star,
  TrendingUp,
  Award,
  MessageSquare
} from 'lucide-react';
import ClassView from '@/components/classroom/ClassView';
import CreateClassModal from '@/components/classroom/CreateClassModal';
import { useToast } from '@/hooks/use-toast';

interface ClassData {
  id: string;
  title: string;
  code: string;
  semester: string;
  color: string;
  students: number;
  assignments: number;
  attendance: string;
  description?: string;
  room?: string;
}

const VirtualClassroom: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [createClassModalOpen, setCreateClassModalOpen] = useState(false);
  const { toast } = useToast();

  // Available colors for class cards (cycling through unique colors)
  const availableColors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-yellow-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-emerald-500',
    'bg-violet-500'
  ];

  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: 'cs101',
      title: 'CS101: Intro to Programming',
      code: 'cs101f23',
      semester: 'Fall 2023',
      color: 'bg-blue-500',
      students: 3,
      assignments: 1,
      attendance: '70%'
    },
    {
      id: 'math202',
      title: 'MATH202: Advanced Calculus',
      code: 'math202123',
      semester: 'Fall 2023',
      color: 'bg-green-500',
      students: 5,
      assignments: 2,
      attendance: '85%'
    },
    {
      id: 'phys101',
      title: 'PHYS101: Introduction to Physics',
      code: 'phys101123',
      semester: 'Fall 2023',
      color: 'bg-yellow-500',
      students: 4,
      assignments: 3,
      attendance: '92%'
    }
  ]);

  const handleVisitClass = (classItem: ClassData) => {
    setSelectedClass(classItem);
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
  };

  const handleCreateClass = (classData: {
    title: string;
    description: string;
    semester: string;
    room: string;
  }) => {
    // Generate unique class code
    const classCode = classData.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 6) + Math.random().toString(36).substring(2, 5);

    // Get next available color
    const usedColors = classes.map(c => c.color);
    const nextColor = availableColors.find(color => !usedColors.includes(color)) || availableColors[classes.length % availableColors.length];

    const newClass: ClassData = {
      id: Date.now().toString(),
      title: classData.title,
      code: classCode,
      semester: classData.semester,
      color: nextColor,
      students: 0,
      assignments: 0,
      attendance: '0%',
      description: classData.description,
      room: classData.room || 'Room TBD'
    };

    setClasses(prev => [...prev, newClass]);
    
    toast({
      title: "Class Created Successfully!",
      description: `${classData.title} has been created with code: ${classCode}`,
    });
  };

  if (selectedClass) {
    return <ClassView classData={selectedClass} onBack={handleBackToClasses} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Faculty Dashboard Header */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Prof. Sarah! Track classroom engagement and earn rewards.</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold">{classes.reduce((sum, cls) => sum + cls.students, 0)}</p>
                  <p className="text-xs text-muted-foreground">Across {classes.length} active classes</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-3xl font-bold">12/20</p>
                  <p className="text-xs text-muted-foreground">Badges unlocked</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Classes</p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Next: Data Structures (10:30 AM)</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Quizzes</p>
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">+14% from last week</p>
                </div>
                <CheckSquare className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Content Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckSquare className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Quiz Completed</p>
                  <p className="text-xs text-muted-foreground">You completed the "Database Concepts" quiz with 85% participation.</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                    <span className="text-xs text-green-600 font-medium">+25 XP</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Badge Unlocked</p>
                  <p className="text-xs text-muted-foreground">You earned the "Quiz Master" badge for running 5 quizzes in a week!</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                    <span className="text-xs text-green-600 font-medium">+50 XP</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full" size="sm">
                View All Activities
              </Button>
            </CardContent>
          </Card>

          {/* Teaching Streak */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Teaching Streak</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-500">
                  What's This?
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">5 days</p>
                    <p className="text-xs text-muted-foreground">Current streak</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">12 days</p>
                  <p className="text-xs text-muted-foreground">Longest streak</p>
                  <Trophy className="h-4 w-4 text-purple-500 inline ml-1" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Last 7 days</p>
                <div className="grid grid-cols-7 gap-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <div key={day} className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">{day}</p>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        index < 5 ? 'bg-orange-100' : 'bg-gray-100'
                      }`}>
                        {index < 5 ? (
                          <Flame className="h-4 w-4 text-orange-500" />
                        ) : (
                          <div className="h-4 w-4 border-2 border-dashed border-gray-300 rounded"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">Last active: Today</p>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="sm">
                <Flame className="h-4 w-4 mr-2" />
                Keep your streak alive!
              </Button>
            </CardContent>
          </Card>

          {/* Badges & Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Badges & Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center space-y-2">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quiz Master</p>
                    <p className="text-xs text-green-600">Unlocked</p>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Engagement Pro</p>
                    <p className="text-xs text-blue-600">Unlocked</p>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Trophy className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Perfect Attendance</p>
                    <p className="text-xs text-muted-foreground">75%</p>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Feedback Champion</p>
                    <p className="text-xs text-muted-foreground">40%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Your Classes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Classes</h2>
          <Button onClick={() => setCreateClassModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Class
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className={`h-24 ${classItem.color} rounded-lg mb-3 flex items-center justify-center`}>
                  <h3 className="text-white font-semibold text-center px-2">{classItem.title}</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Created on {new Date().toLocaleDateString()}</p>
                  <p className="text-sm">Class Code: <span className="text-blue-500">{classItem.code}</span></p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-semibold">{classItem.students}</p>
                    <p className="text-xs text-muted-foreground">Students Joined</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{classItem.assignments}</p>
                    <p className="text-xs text-muted-foreground">Assignments</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{classItem.attendance}</p>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleVisitClass(classItem)}
                >
                  Visit Class
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Class Modal */}
      <CreateClassModal
        isOpen={createClassModalOpen}
        onClose={() => setCreateClassModalOpen(false)}
        onSubmit={handleCreateClass}
      />
    </div>
  );
};

export default VirtualClassroom;
