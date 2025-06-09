import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if semester is selected
  useEffect(() => {
    const currentSemester = sessionStorage.getItem('currentSemester');
    if (!currentSemester) {
      // If no semester selected, redirect to semester selector
      navigate('/select-semester');
      return;
    }
    
    // Simulate loading for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-edu-accent flex items-center justify-center text-white animate-float mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.122 2.122m8.384 8.384 2.122 2.122M5.636 18.364l2.122-2.122m8.384-8.384 2.122-2.122"></path>
            </svg>
          </div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} />
      <Header toggleSidebar={toggleSidebar} collapsed={sidebarCollapsed} />
      
      <main className={`pt-16 transition-all duration-300 ease-in-out animate-fade-in ${
        sidebarCollapsed ? 'ml-[70px]' : 'ml-[250px]'
      }`}>
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
