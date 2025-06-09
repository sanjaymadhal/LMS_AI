import React, { useState } from 'react';
import { Plus, Bot, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import TodoListDrawer from './TodoListDrawer';
import FloatingAIAssistant from './ai-assistant/FloatingAIAssistant';

const UnifiedFAB: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [todoDrawerOpen, setTodoDrawerOpen] = useState(false);
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option: 'todo' | 'ai') => {
    setIsMenuOpen(false);
    if (option === 'todo') {
      setTodoDrawerOpen(true);
    } else {
      setAIAssistantOpen(true);
    }
  };

  const handleAIAssistantClose = () => {
    setAIAssistantOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Main FAB Button */}
        <Button
          size="lg"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
            "bg-red-600 hover:bg-red-700",
            "text-white"
          )}
          onClick={toggleMenu}
        >
          <Plus className={cn(
            "h-6 w-6 transition-transform duration-300",
            isMenuOpen && "rotate-45"
          )} />
        </Button>

        {/* Popup Menu */}
        {isMenuOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-2">
            {/* Todo List Option */}
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "h-12 px-4 rounded-full shadow-md transition-all duration-200",
                "bg-white hover:bg-gray-50",
                "border-2 border-red-500",
                "text-red-600 hover:text-red-700"
              )}
              onClick={() => handleOptionClick('todo')}
            >
              <CheckSquare className="h-5 w-5 mr-2" />
              Todo List
            </Button>

            {/* AI Assistant Option */}
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "h-12 px-4 rounded-full shadow-md transition-all duration-200",
                "bg-white hover:bg-gray-50",
                "border-2 border-red-500",
                "text-red-600 hover:text-red-700"
              )}
              onClick={() => handleOptionClick('ai')}
            >
              <Bot className="h-5 w-5 mr-2" />
              AI Assistant
            </Button>
          </div>
        )}
      </div>

      {/* Todo List Drawer */}
      <TodoListDrawer
        open={todoDrawerOpen}
        setOpen={setTodoDrawerOpen}
      />

      {/* AI Assistant */}
      {aiAssistantOpen && (
        <FloatingAIAssistant
          onClose={handleAIAssistantClose}
        />
      )}
    </div>
  );
};

export default UnifiedFAB; 