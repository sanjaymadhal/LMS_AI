
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Lesson {
  id: number;
  title: string;
  course: string;
  time: string;
  date: string;
  status: 'upcoming' | 'live' | 'ended';
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Introduction to Organic Chemistry',
    course: 'Chemistry 101',
    time: '10:00 AM - 11:30 AM',
    date: 'Today',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Advanced Calculus Concepts',
    course: 'Mathematics 201',
    time: '1:00 PM - 2:30 PM',
    date: 'Today',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Cell Structure and Function',
    course: 'Biology 101',
    time: '9:00 AM - 10:30 AM',
    date: 'Tomorrow',
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Newtonian Mechanics Review',
    course: 'Physics 102',
    time: '11:00 AM - 12:30 PM',
    date: 'Tomorrow',
    status: 'upcoming'
  }
];

const UpcomingLessons: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Upcoming Lessons</CardTitle>
        <Button variant="ghost" size="sm" className="text-sm">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="flex flex-col space-y-2 border-b border-border pb-3 last:border-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{lesson.title}</h4>
                {lesson.status === 'live' && (
                  <span className="text-xs rounded-full bg-red-100 text-red-600 px-2 py-0.5 flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mr-1"></span>
                    Live now
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{lesson.course}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{lesson.date}, {lesson.time}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <Button variant="outline" size="sm">Start Lesson</Button>
                <Button variant="ghost" size="sm">Prepare AI Materials</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingLessons;
