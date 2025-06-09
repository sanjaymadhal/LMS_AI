import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileQuestion, Loader2, Check, Plus, Trash2, Download, Sparkles } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const QuestionBankGenerator: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState('10');
  const [questionTypes, setQuestionTypes] = useState<string[]>(['multiple-choice']);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const { toast } = useToast();
  
  const handleQuestionTypeChange = (type: string) => {
    setQuestionTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const handleGenerate = () => {
    if (!subject.trim() || !topic.trim() || questionTypes.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setGenerating(true);
    setGenerated(false);
    setQuestions([]);
    
    // Simulate the generation process
    setTimeout(() => {
      const types = {
        'multiple-choice': 'Multiple Choice',
        'true-false': 'True/False',
        'short-answer': 'Short Answer',
        'essay': 'Essay',
        'fill-blank': 'Fill in the Blank'
      };
      
      const count = parseInt(questionCount, 10);
      const generatedQuestions = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        type: questionTypes[Math.floor(Math.random() * questionTypes.length)],
        question: `Sample ${types[questionTypes[0] as keyof typeof types]} question about ${topic} (${i + 1})`,
        options: questionTypes.includes('multiple-choice') ? [
          { id: 'A', text: 'Sample option A', correct: i % 4 === 0 },
          { id: 'B', text: 'Sample option B', correct: i % 4 === 1 },
          { id: 'C', text: 'Sample option C', correct: i % 4 === 2 },
          { id: 'D', text: 'Sample option D', correct: i % 4 === 3 },
        ] : undefined,
        answer: questionTypes.includes('short-answer') || questionTypes.includes('essay') ? 
          'Sample answer text would appear here.' : undefined,
        correctAnswer: questionTypes.includes('true-false') ? 
          Math.random() > 0.5 ? 'True' : 'False' : undefined,
        blank: questionTypes.includes('fill-blank') ? 
          'Sample sentence with a ______ to fill in.' : undefined,
      }));
      
      setQuestions(generatedQuestions);
      setGenerating(false);
      setGenerated(true);
      
      toast({
        title: "Question bank generated",
        description: `${count} questions have been created.`,
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5" />
            Question Bank Generator
          </CardTitle>
          <CardDescription>
            Create custom assessment questions with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Area</Label>
                <Input 
                  id="subject"
                  placeholder="e.g., Physics, Mathematics, History" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={generating}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="topic">Specific Topic</Label>
                <Input 
                  id="topic"
                  placeholder="e.g., Newton's Laws, World War II" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={generating}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Question Types</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { id: 'multiple-choice', label: 'Multiple Choice' },
                  { id: 'true-false', label: 'True/False' },
                  { id: 'short-answer', label: 'Short Answer' },
                  { id: 'essay', label: 'Essay' },
                  { id: 'fill-blank', label: 'Fill in the Blank' }
                ].map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type.id}`}
                      checked={questionTypes.includes(type.id)}
                      onCheckedChange={() => handleQuestionTypeChange(type.id)}
                      disabled={generating}
                    />
                    <Label htmlFor={`type-${type.id}`}>{type.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select 
                  value={difficulty} 
                  onValueChange={setDifficulty}
                  disabled={generating}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question-count">Number of Questions</Label>
                <Select 
                  value={questionCount} 
                  onValueChange={setQuestionCount}
                  disabled={generating}
                >
                  <SelectTrigger id="question-count">
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 questions</SelectItem>
                    <SelectItem value="10">10 questions</SelectItem>
                    <SelectItem value="15">15 questions</SelectItem>
                    <SelectItem value="20">20 questions</SelectItem>
                    <SelectItem value="30">30 questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full hover-scale"
            onClick={handleGenerate}
            disabled={generating || !subject.trim() || !topic.trim() || questionTypes.length === 0}
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Questions...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Question Bank
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {generated && questions.length > 0 && (
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Generated Questions</CardTitle>
              <CardDescription>
                {questions.length} questions for {subject}: {topic}
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="hover-scale"
              onClick={() => {
                toast({
                  title: "Downloading questions",
                  description: "Your question bank would download in a real implementation.",
                });
              }}
            >
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {questions.slice(0, 3).map((question) => (
                <div key={question.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md">
                        Q{question.id}
                      </span>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
                        {question.type === 'multiple-choice' ? 'Multiple Choice' :
                         question.type === 'true-false' ? 'True/False' :
                         question.type === 'short-answer' ? 'Short Answer' :
                         question.type === 'essay' ? 'Essay' : 'Fill in the Blank'}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="font-medium">{question.question}</div>
                  
                  {question.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                      {question.options.map((option) => (
                        <div key={option.id} className="flex items-center gap-2">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                            option.correct ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-muted text-muted-foreground'
                          }`}>
                            {option.id}
                          </div>
                          <span>{option.text}</span>
                          {option.correct && <Check className="h-4 w-4 text-green-600 ml-auto" />}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.correctAnswer && (
                    <div className="bg-muted/50 p-2 rounded-md text-sm">
                      <span className="font-medium">Answer:</span> {question.correctAnswer}
                    </div>
                  )}
                  
                  {question.answer && (
                    <div className="bg-muted/50 p-2 rounded-md text-sm">
                      <span className="font-medium">Sample Answer:</span> {question.answer}
                    </div>
                  )}
                  
                  {question.blank && (
                    <div className="bg-muted/50 p-2 rounded-md text-sm">
                      <span className="font-medium">Fill in blank:</span> {question.blank}
                    </div>
                  )}
                </div>
              ))}
              
              {questions.length > 3 && (
                <div className="text-center text-muted-foreground">
                  <p>+ {questions.length - 3} more questions</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuestionBankGenerator;
