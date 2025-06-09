import React, { useState } from 'react';
import { X, Plus, CheckCircle2, Circle, Trophy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TodoListDrawer: React.FC<TodoListDrawerProps> = ({ open, setOpen }) => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Review student assignments', completed: false },
    { id: '2', text: 'Prepare lecture slides for tomorrow', completed: false },
    { id: '3', text: 'Schedule department meeting', completed: true },
    { id: '4', text: 'Update course syllabus', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [showAccomplishment, setShowAccomplishment] = useState<string | null>(null);
  const [accomplishmentText, setAccomplishmentText] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const newCompleted = !todo.completed;
        if (newCompleted) {
          // When marking as complete, show accomplishment dialog
          setShowAccomplishment(id);
        }
        return { ...todo, completed: newCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const saveAccomplishment = () => {
    // Here you could save the accomplishment text to a database
    // For now, we'll just close the dialog
    setShowAccomplishment(null);
    setAccomplishmentText('');
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className={cn(
      "fixed inset-x-0 bottom-0 z-50 bg-background border-t shadow-lg transition-transform duration-300 ease-in-out transform",
      open ? "translate-y-0" : "translate-y-full"
    )}
    style={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Todo List
          </h2>
          <button 
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-4 bg-muted/50 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{completedCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {todos.map(todo => (
            <div 
              key={todo.id} 
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border",
                todo.completed ? "bg-muted/50 text-muted-foreground" : "bg-card"
              )}
            >
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleTodo(todo.id)}
                  className="flex-shrink-0"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                <span className={cn(todo.completed && "line-through")}>{todo.text}</span>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-destructive hover:text-destructive/80"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <p>No tasks yet. Add one below!</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={addTodo}
            className="bg-primary text-primary-foreground px-3 py-2 rounded-md flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
      
      {/* Accomplishment Dialog */}
      {showAccomplishment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Task Accomplished!
              </h3>
              <button 
                onClick={() => setShowAccomplishment(null)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="mb-4 text-muted-foreground">
              Great job completing: <span className="font-medium text-foreground">
                {todos.find(t => t.id === showAccomplishment)?.text}
              </span>
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                What did you accomplish with this task?
              </label>
              <textarea
                value={accomplishmentText}
                onChange={(e) => setAccomplishmentText(e.target.value)}
                className="w-full p-2 border rounded-md h-24"
                placeholder="Describe what you accomplished..."
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAccomplishment(null)}
                className="px-3 py-2 border rounded-md"
              >
                Skip
              </button>
              <button
                onClick={saveAccomplishment}
                className="bg-primary text-primary-foreground px-3 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoListDrawer;