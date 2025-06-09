
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  FileText, 
  Puzzle, 
  Plus,
  Bug,
  Clock,
  Users,
  Trophy
} from 'lucide-react';

interface QuizTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuizType: (type: 'multiple-choice' | 'puzzle-quest-demo' | 'puzzle-quest-create' | 'bug-hunt') => void;
}

const QuizTypeModal: React.FC<QuizTypeModalProps> = ({ isOpen, onClose, onSelectQuizType }) => {
  const quizTypes = [
    {
      id: 'multiple-choice',
      title: 'Multiple Choice Quiz',
      description: 'Traditional quiz with multiple choice questions',
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      features: ['Easy to create', 'Auto-grading', 'Quick feedback']
    },
    {
      id: 'puzzle-quest-demo',
      title: 'Puzzle Quest (Demo)',
      description: 'Interactive coding challenge with drag & drop',
      icon: Puzzle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      features: ['Interactive UI', 'Gamified learning', 'Real-time feedback']
    },
    {
      id: 'puzzle-quest-create',
      title: 'Create Puzzle Quest',
      description: 'Build your own interactive puzzle quest',
      icon: Plus,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      features: ['Custom puzzles', 'Drag & drop builder', 'Student engagement']
    },
    {
      id: 'bug-hunt',
      title: 'Bug Hunt Challenge',
      description: 'Find and fix bugs in code or documents',
      icon: Bug,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      features: ['Error detection', 'Problem solving', 'Real-world skills']
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Choose Quiz Type
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          {quizTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card 
                key={type.id}
                className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/50"
                onClick={() => onSelectQuizType(type.id as any)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`h-12 w-12 ${type.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`h-6 w-6 ${type.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{type.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {type.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 bg-current rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectQuizType(type.id as any);
                    }}
                  >
                    Create {type.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizTypeModal;
