
import React, { useState, useEffect } from 'react';
import { Bell, Search, ChevronLeft, ChevronRight, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/components/profile/ProfileDropdown';
import { ThemeToggle } from '@/components/ThemeToggle';
import ThemeConfigurator from '@/components/ThemeConfigurator';
import AppPortalMenu from '@/components/layout/AppPortalMenu';

interface HeaderProps {
  toggleSidebar: () => void;
  collapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, collapsed }) => {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [currentSemester, setCurrentSemester] = useState<string | null>(null);
  const navigate = useNavigate();

  // Gamification state
  const currentXP = 200;
  const maxXP = 1500;
  const virtualCoins = 100;
  const xpProgress = (currentXP / maxXP) * 100;

  useEffect(() => {
    const semesterId = sessionStorage.getItem('currentSemester');
    if (semesterId) {
      // Map semester ID to full name
      const semesterMap: Record<string, string> = {
        "1": "1st Sem.",
        "2": "2nd Sem.",
        "3": "3rd Sem.",
        "4": "4th Sem.",
        "5": "5th Sem.",
        "6": "6th Sem.",
        "7": "7th Sem.",
        "8": "8th Sem.",
      };
      setCurrentSemester(semesterMap[semesterId] || `Sem. ${semesterId}`);
    }
  }, []);
  
  const handleChangeSemester = () => {
    navigate('/select-semester');
  };

  return (
    <header className={cn(
      "fixed top-0 right-0 z-20 h-16 border-b border-border/30 bg-background/60 backdrop-blur-md transition-all duration-300",
      collapsed ? "left-[70px]" : "left-[250px]"
    )}>
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="lg:hidden"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          
          <div className="hidden md:block">
            <div className="text-sm breadcrumbs">
              <ul className="flex items-center space-x-2">
                <li className="text-muted-foreground">Pages</li>
                <li className="before:content-['/'] before:mx-2 before:text-muted-foreground">Dashboard</li>
              </ul>
            </div>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {currentSemester && (
            <Badge 
              className="bg-gradient-to-r from-edu-primary to-edu-accent text-white hover:from-edu-dark hover:to-edu-accent py-1.5 px-3 cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg"
              onClick={handleChangeSemester}
            >
              {currentSemester}
            </Badge>
          )}
          
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-[200px] lg:w-[300px] pl-8 rounded-lg bg-background/30 border-border/40 focus-visible:border-edu-primary backdrop-blur-sm transition-all duration-300 focus-visible:bg-background/50"
            />
            <div className="ml-2">
              <AppPortalMenu />
            </div>
          </div>
          
          {/* Gamification Elements */}
          <div className="hidden lg:flex items-center gap-4">
            {/* XP Progress Bar */}
            <div className="flex items-center gap-2 bg-background/40 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/40">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">XP</span>
                  <span className="text-foreground font-semibold">{currentXP}/{maxXP}</span>
                </div>
                <Progress 
                  value={xpProgress} 
                  className="w-[100px] h-2"
                />
              </div>
            </div>
            
            {/* Virtual Coins */}
            <div className="flex items-center gap-2 bg-background/40 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/40">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-semibold text-foreground">{virtualCoins}</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-edu-accent p-0 text-xs flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px] animate-in fade-in">
              <div className="flex items-center justify-between px-3 py-2 border-b">
                <h3 className="font-medium">Notifications</h3>
                <Button variant="ghost" size="sm">Mark all read</Button>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="py-2 px-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">New Assignment Submission</p>
                      <span className="text-xs text-muted-foreground">10m ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Emily Davis submitted the Physics homework</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 px-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">Course Feedback Received</p>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Michael Brown left feedback for your Biology course</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 px-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">Calendar Event Reminder</p>
                      <span className="text-xs text-muted-foreground">1d ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Faculty meeting tomorrow at 10:00 AM</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <div className="border-t p-2">
                <Button variant="ghost" className="w-full text-sm" size="sm">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Theme Toggle Button */}
          <ThemeToggle />
          
          <ProfileDropdown 
            userInitials="JD"
            userName="John Doe"
            userRole="Professor"
            avatarUrl="/placeholder.svg"
          />
        </div>
      </div>
      
      {showConfigurator && (
        <ThemeConfigurator onClose={() => setShowConfigurator(false)} />
      )}
    </header>
  );
};

export default Header;
