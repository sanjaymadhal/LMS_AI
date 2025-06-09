
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Plus, 
  Upload, 
  Image as ImageIcon,
  X,
  Settings,
  Save
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface PuzzleQuestCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quizData: any) => void;
}

const PuzzleQuestCreator: React.FC<PuzzleQuestCreatorProps> = ({ isOpen, onClose, onSave }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }
  ]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [xpPerQuestion, setXpPerQuestion] = useState(10);
  const [completionBonusXp, setCompletionBonusXp] = useState(50);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (questionId: number, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const removeQuestion = (questionId: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  const handleSave = () => {
    const quizData = {
      title: quizTitle,
      questions,
      puzzleImage: selectedImage,
      xpPerQuestion,
      completionBonusXp
    };
    onSave(quizData);
    onClose();
  };

  const predefinedImages = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-xl font-bold">Create Quiz Puzzle</DialogTitle>
              <span className="text-sm text-muted-foreground">Design a quiz with a puzzle reveal</span>
            </div>
            <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-800">
              <Save className="h-4 w-4 mr-2" />
              Save Quiz
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Side - Quiz Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Quiz Title</label>
                  <Input
                    placeholder="Enter a title for your quiz"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                  />
                </div>

                {questions.map((question, questionIndex) => (
                  <Card key={question.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Question {questionIndex + 1}</CardTitle>
                        {questions.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeQuestion(question.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        placeholder="Enter your question here"
                        value={question.text}
                        onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                        rows={3}
                      />

                      <div>
                        <p className="text-sm font-medium mb-3">Options (select the correct answer)</p>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-3">
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                checked={question.correctAnswer === optionIndex}
                                onChange={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                                className="w-4 h-4"
                              />
                              <Input
                                placeholder={`Option ${optionIndex + 1}`}
                                value={option}
                                onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                className="flex-1"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  variant="outline"
                  onClick={addQuestion}
                  className="w-full border-dashed border-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Question
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Puzzle Image & Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  <CardTitle>Puzzle Image</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select an image for your puzzle reveal. This image will progressively be revealed as students answer questions correctly.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Custom Image
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  {predefinedImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      className={`relative aspect-square cursor-pointer rounded-lg border-2 overflow-hidden ${
                        selectedImage === imageUrl ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <img
                        src={imageUrl}
                        alt={`Puzzle option ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {!selectedImage && (
                  <p className="text-center text-sm text-muted-foreground italic">
                    Please select an image
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <CardTitle>Quiz Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">XP per Question</label>
                  <Input
                    type="number"
                    value={xpPerQuestion}
                    onChange={(e) => setXpPerQuestion(parseInt(e.target.value) || 10)}
                    min="1"
                    max="100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Completion Bonus XP</label>
                  <Input
                    type="number"
                    value={completionBonusXp}
                    onChange={(e) => setCompletionBonusXp(parseInt(e.target.value) || 50)}
                    min="0"
                    max="500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PuzzleQuestCreator;
