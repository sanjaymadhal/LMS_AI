
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Video, 
  Users, 
  FileText, 
  Calendar, 
  PenTool, 
  Sparkles,
  Layers,
  Grid,
  Menu
} from 'lucide-react';

const AppPortalMenu: React.FC = () => {
  const apps = [
    {
      title: "Dashboard",
      icon: <Grid className="h-5 w-5 text-blue-500" />,
      description: "Main learning dashboard",
      link: "/"
    },
    {
      title: "Live Classroom",
      icon: <Video className="h-5 w-5 text-red-500" />,
      description: "Interactive live sessions",
      link: "/live-classroom"
    },
    {
      title: "Virtual Classroom",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      description: "Virtual learning environment",
      link: "/virtual-classroom",
      isNew: true
    },
    {
      title: "Workspace",
      icon: <Layers className="h-5 w-5 text-green-500" />,
      description: "Organize course materials",
      link: "/workspace"
    },
    {
      title: "AI Tools",
      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
      description: "AI-powered learning assistants",
      link: "/ai-tools"
    },
    {
      title: "Students",
      icon: <Users className="h-5 w-5 text-indigo-500" />,
      description: "Manage student records",
      link: "/students"
    },
    {
      title: "Assignments",
      icon: <FileText className="h-5 w-5 text-cyan-500" />,
      description: "Create and grade assignments",
      link: "/assignments"
    },
    {
      title: "Calendar",
      icon: <Calendar className="h-5 w-5 text-pink-500" />,
      description: "Schedule and events",
      link: "/calendar"
    },
    {
      title: "Analytics",
      icon: <PenTool className="h-5 w-5 text-orange-500" />,
      description: "Performance metrics",
      link: "/analytics"
    }
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-4" sideOffset={5}>
        <h3 className="font-medium text-sm mb-3">Applications</h3>
        <div className="grid grid-cols-3 gap-2">
          {apps.map((app, index) => (
            <Link 
              key={index} 
              to={app.link} 
              className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-center relative"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-background mb-1">
                {app.icon}
              </div>
              <span className="text-xs font-medium">{app.title}</span>
              {app.isNew && (
                <span className="absolute top-0 right-0 bg-edu-accent text-white text-[10px] px-1 rounded-sm">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AppPortalMenu;
