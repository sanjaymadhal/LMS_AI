
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, RefreshCcw } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const predefinedResponses = [
  "Based on my analysis, your students' performance indicates they might need more practice with linear equations. I recommend additional exercises focused on solving systems of equations.",
  "I've analyzed your course materials and identified concepts students often find challenging. Here are some targeted resources and practice questions to address these gaps.",
  "Looking at the latest quiz results, 68% of students showed improvement in trigonometric functions. The areas still needing focus are: inverse trigonometric functions and trigonometric identities.",
  "I've created a draft lesson plan for next week based on your curriculum and student progress. Would you like me to add any specific points of emphasis?"
];

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI teaching assistant. How can I help you today?",
      sender: 'ai',
      timestamp: '9:30 AM'
    }
  ]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsThinking(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        content: predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)],
        sender: 'ai' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsThinking(false);
    }, 1500);
  };
  
  const quickPrompts = [
    "Analyze my students' progress",
    "Create a lesson plan",
    "Suggest assessment ideas",
    "Help me grade assignments"
  ];
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-edu-accent" />
          AI Teaching Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-edu-primary text-white' 
                    : 'bg-secondary'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 block text-right mt-1">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-secondary max-w-[80%] rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <RefreshCcw className="h-4 w-4 animate-spin" />
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, i) => (
              <Button 
                key={i} 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  setInput(prompt);
                }}
              >
                {prompt}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about teaching..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <Button onClick={handleSendMessage} disabled={isThinking}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
