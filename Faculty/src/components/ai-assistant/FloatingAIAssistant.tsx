import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Minimize2, Maximize2, X, RefreshCcw, Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type?: 'text' | 'suggestion' | 'error';
}

interface FloatingAIAssistantProps {
  className?: string;
  onClose?: () => void;
}

const predefinedResponses = [
  "I can help you navigate through the dashboard. What specific feature would you like to explore?",
  "Based on your current page, here are some quick actions you might want to take: create a new assignment, check student progress, or review analytics.",
  "I notice you're viewing student data. Would you like me to help you generate insights about student performance or attendance patterns?",
  "I can assist with creating lesson plans, managing assignments, or analyzing classroom data. What would you like to focus on?",
  "Would you like me to help you set up a new quiz, review recent submissions, or explore the AI teaching tools available?",
  "I can provide insights about your teaching effectiveness based on the current analytics. Shall I generate a summary report?",
];

const quickActions = [
  { label: "Create Assignment", icon: "📝" },
  { label: "Analyze Performance", icon: "📊" },
  { label: "Generate Lesson Plan", icon: "📚" },
  { label: "Check Attendance", icon: "✅" },
];

const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({ className, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)],
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsThinking(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    handleSendMessage();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div 
      className={cn(
        "fixed z-50 transition-all duration-300 ease-in-out",
        isMinimized ? "w-72 h-12" : "w-80 h-96",
        className
      )}
      style={{ 
        bottom: `${dragPosition.y}px`, 
        right: `${dragPosition.x}px` 
      }}
    >
      <Card className="h-full flex flex-col shadow-2xl border border-slate-200/20 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 overflow-hidden">
        <CardHeader 
          className="pb-2 cursor-move bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 text-white relative overflow-hidden"
          onMouseDown={() => setIsDragging(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-700/20 animate-pulse" />
          <div className="flex items-center justify-between relative z-10">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Bot className="h-4 w-4" />
              AI Assistant
              <Badge variant="secondary" className="bg-white/20 text-white text-xs px-2 py-0.5 border border-white/20">
                <Sparkles className="h-2 w-2 mr-1" />
                Smart
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20 transition-colors"
                onClick={handleMinimize}
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20 hover:bg-red-500/20 transition-colors"
                onClick={handleClose}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={cn(
                      "flex",
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div 
                      className={cn(
                        "max-w-[85%] rounded-lg p-2.5 relative group text-sm",
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                      )}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs opacity-70">
                          {message.timestamp}
                        </span>
                        {message.sender === 'ai' && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4"
                              onClick={() => copyToClipboard(message.content)}
                            >
                              <Copy className="h-2.5 w-2.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4"
                            >
                              <ThumbsUp className="h-2.5 w-2.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 dark:bg-slate-800 max-w-[85%] rounded-lg p-2.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center space-x-2">
                        <RefreshCcw className="h-3 w-3 animate-spin" />
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-3 border-t bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex flex-wrap gap-1 mb-2">
                {quickActions.map((action, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-6 bg-white/80 hover:bg-white border-slate-200 hover:border-slate-400 transition-colors"
                    onClick={() => handleQuickAction(action.label)}
                  >
                    <span className="mr-1 text-xs">{action.icon}</span>
                    {action.label}
                  </Button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 text-sm h-8 bg-white/80 border-slate-200 focus:border-slate-400 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isThinking || !input.trim()}
                  className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 h-8 px-3"
                  size="icon"
                >
                  {isThinking ? (
                    <RefreshCcw className="h-3 w-3 animate-spin" />
                  ) : (
                    <Send className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default FloatingAIAssistant;
