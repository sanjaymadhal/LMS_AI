
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, LogOut, HelpCircle } from 'lucide-react';

interface ProfileDropdownProps {
  userInitials: string;
  userName: string;
  userRole: string;
  avatarUrl?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userInitials,
  userName,
  userRole,
  avatarUrl
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the semester selection when logging out
    sessionStorage.removeItem('currentSemester');
    navigate('/signin');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarImage src={avatarUrl} alt={userName} />
            <AvatarFallback className="bg-edu-accent text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2 animate-in fade-in">
        <div className="px-3 py-2.5 flex items-center gap-3 mb-1">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt={userName} />
            <AvatarFallback className="bg-edu-accent text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground">{userRole}</span>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="py-2.5 px-3 cursor-pointer"
          onClick={() => navigate('/settings')}
        >
          <User className="h-4 w-4 mr-2" />
          <span>My Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="py-2.5 px-3 cursor-pointer"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-4 w-4 mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="py-2.5 px-3 cursor-pointer"
          onClick={() => navigate('/help')}
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          <span>Help Center</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="py-2.5 px-3 cursor-pointer text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
