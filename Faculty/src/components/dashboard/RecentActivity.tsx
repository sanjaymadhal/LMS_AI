
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MessageSquare, 
  FileText, 
  BookOpen, 
  Calendar,
  User,
  Share
} from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'message' | 'assignment' | 'course' | 'calendar' | 'enrollment' | 'published';
  title: string;
  time: string;
  user?: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    type: 'published',
    title: 'Database Management System - Module 1: Introduction to DBMS published to virtual classroom',
    time: '5 minutes ago',
    user: 'Prof. Sarah'
  },
  {
    id: 2,
    type: 'published',
    title: 'ER Diagrams chapter published to CS101 class',
    time: '12 minutes ago',
    user: 'Prof. Sarah'
  },
  {
    id: 3,
    type: 'message',
    title: 'Michael Brown sent a message',
    time: '25 minutes ago',
    user: 'Michael Brown'
  },
  {
    id: 4,
    type: 'assignment',
    title: 'New assignment submission for "Physics 101"',
    time: '1 hour ago',
    user: 'Emily Davis'
  },
  {
    id: 5,
    type: 'course',
    title: 'Updated lesson materials for "Chemistry Basics"',
    time: '2 hours ago'
  },
  {
    id: 6,
    type: 'enrollment',
    title: 'New student enrolled in "Biology 202"',
    time: '4 hours ago',
    user: 'James Wilson'
  },
  {
    id: 7,
    type: 'calendar',
    title: 'Upcoming exam for "Mathematics 101"',
    time: 'Tomorrow, 10:00 AM'
  }
];

const ActivityIcon = ({ type }: { type: ActivityItem['type'] }) => {
  const iconProps = { className: 'h-5 w-5' };
  
  switch (type) {
    case 'message':
      return <MessageSquare {...iconProps} className="text-blue-500" />;
    case 'assignment':
      return <FileText {...iconProps} className="text-amber-500" />;
    case 'course':
      return <BookOpen {...iconProps} className="text-green-500" />;
    case 'calendar':
      return <Calendar {...iconProps} className="text-purple-500" />;
    case 'enrollment':
      return <User {...iconProps} className="text-pink-500" />;
    case 'published':
      return <Share {...iconProps} className="text-indigo-500" />;
    default:
      return null;
  }
};

const RecentActivity: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="mt-0.5 h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                <ActivityIcon type={activity.type} />
              </div>
              <div>
                <p className="text-sm font-medium">{activity.title}</p>
                <div className="flex items-center mt-1 text-xs text-muted-foreground space-x-1">
                  <span>{activity.time}</span>
                  {activity.user && (
                    <>
                      <span>•</span>
                      <span>{activity.user}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
