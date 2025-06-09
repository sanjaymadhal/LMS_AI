import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoListModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const toggleModal = () => setIsOpen(!isOpen);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <Button
        className="fixed bottom-10 right-10 bg-blue-500 text-white hover:bg-blue-600"
        onClick={toggleModal}
      >
        To-Do List
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
            <div className="mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="border p-2 w-full"
                placeholder="Add a new task"
              />
              <Button onClick={addTodo} className="mt-2 w-full bg-green-500 text-white">
                Add Task
              </Button>
            </div>
            <ul className="space-y-2">
              {todos.map(todo => (
                <li key={todo.id} className="flex justify-between items-center">
                  <span
                    className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                    onClick={() => toggleTodoCompletion(todo.id)}
                  >
                    {todo.text}
                  </span>
                  <Button onClick={() => removeTodo(todo.id)} className="ml-2 bg-red-500 text-white">
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
            <Button onClick={toggleModal} className="mt-4 w-full bg-gray-500 text-white">
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoListModal;