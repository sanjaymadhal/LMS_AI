
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  HelpCircle,
  BarChart4,
  Sparkles,
  Folder,
  Play,
  Monitor
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Play, label: 'Live Classroom', path: '/live-classroom' },
    { icon: Monitor, label: 'Virtual Classroom', path: '/virtual-classroom' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: FileText, label: 'Assignments', path: '/assignments' },
    { icon: BarChart4, label: 'Analytics', path: '/analytics' },
    { icon: Sparkles, label: 'AI Tools', path: '/ai-tools' },
    { icon: Folder, label: 'Workspace', path: '/workspace' },
  ];

  const settingsItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-30 h-screen bg-sidebar transition-all duration-300 ease-in-out",
      collapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className="flex h-full flex-col">
        <div className="flex flex-col items-center justify-center h-16 p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-edu-accent mr-2" />
                <h1 className="text-xl font-bold text-white">PyGenicArc</h1>
              </div>
              <span className="text-xs text-sidebar-foreground/70 mt-1 italic">for Instructors</span>
            </div>
          )}
          {collapsed && (
            <div className="flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-edu-accent" />
            </div>
          )}
        </div>
        
        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className={cn(
                "nav-item",
                location.pathname === item.path && "active",
                collapsed && "justify-center",
                "transition-all duration-200 hover:translate-x-1"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="border-t border-sidebar-border p-2 space-y-1">
          {settingsItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className={cn(
                "nav-item",
                location.pathname === item.path && "active",
                collapsed && "justify-center",
                "transition-all duration-200 hover:translate-x-1"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-edu-accent flex items-center justify-center text-white">
              JD
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">John Doe</span>
                <span className="text-xs text-gray-300">Professor</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
