
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Book, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Course {
  id: number;
  title: string;
  students: number;
  progress: number;
  icon: string;
  color: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Physics 101: Introduction to Mechanics',
    students: 32,
    progress: 68,
    icon: '⚛️',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 2,
    title: 'Chemistry Basics',
    students: 28,
    progress: 42,
    icon: '🧪',
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 3,
    title: 'Biology 202: Advanced Concepts',
    students: 24,
    progress: 91,
    icon: '🔬',
    color: 'bg-amber-100 text-amber-700'
  },
  {
    id: 4,
    title: 'Mathematics 101: Calculus',
    students: 36,
    progress: 56,
    icon: '📊',
    color: 'bg-purple-100 text-purple-700'
  }
];

const CourseProgress: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center">
          <Book className="mr-2 h-5 w-5" />
          Course Progress
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-sm">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-md flex items-center justify-center text-lg ${course.color}`}>
                    {course.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{course.title}</h4>
                    <p className="text-xs text-muted-foreground">{course.students} students enrolled</p>
                  </div>
                </div>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProgress;
