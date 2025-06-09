
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { FileText, ArrowLeft, Loader2, Sparkles, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getSubject, Subject } from '@/data/subjectsData';

const SubjectQuestionBank: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('medium');
  const [questionCount, setQuestionCount] = useState<string>('10');
  const [questionTypes, setQuestionTypes] = useState<string[]>(['multiple-choice']);
  const [additionalInstructions, setAdditionalInstructions] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (subjectId) {
      const subjectData = getSubject(subjectId);
      if (subjectData) {
        setSubject(subjectData);
      } else {
        navigate('/subjects');
      }
    }
  }, [subjectId, navigate]);

  const handleQuestionTypeChange = (type: string) => {
    setQuestionTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const getChaptersForModule = (moduleId: string) => {
    if (!subject) return [];
    const module = subject.modules.find(m => m.id === moduleId);
    if (!module) return [];
    return module.chapters;
  };

  const handleGenerate = () => {
    if (!selectedModule || !selectedChapter) {
      toast({
        title: "Missing selection",
        description: "Please select both module and chapter.",
        variant: "destructive"
      });
      return;
    }
    
    setGenerating(true);
    setQuestions([]);
    
    // Simulate generating questions
    setTimeout(() => {
      // Get chapter info
      const module = subject?.modules.find(m => m.id === selectedModule);
      const chapter = module?.chapters.find(c => c.id === selectedChapter);
      
      // Generate dummy questions similar to the AI Tools question bank generator
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
        question: `Question about ${chapter?.name} (${i + 1})`,
        options: questionTypes.includes('multiple-choice') ? [
          { id: 'A', text: 'Option A', correct: i % 4 === 0 },
          { id: 'B', text: 'Option B', correct: i % 4 === 1 },
          { id: 'C', text: 'Option C', correct: i % 4 === 2 },
          { id: 'D', text: 'Option D', correct: i % 4 === 3 },
        ] : undefined,
        answer: questionTypes.includes('short-answer') || questionTypes.includes('essay') ? 
          'Sample answer text for the question.' : undefined,
        correctAnswer: questionTypes.includes('true-false') ? 
          Math.random() > 0.5 ? 'True' : 'False' : undefined,
        blank: questionTypes.includes('fill-blank') ? 
          'Sentence with a ______ to fill in.' : undefined,
      }));
      
      setQuestions(generatedQuestions);
      setGenerating(false);
      
      toast({
        title: "Question bank generated",
        description: `${count} questions for ${chapter?.name} have been created.`,
      });
    }, 2000);
  };

  const handleSaveToWorkspace = () => {
    toast({
      title: "Saved to workspace",
      description: "Question bank has been saved and is accessible in the workspace.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/subjects">Subjects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/subjects/${subjectId}`}>{subject?.code}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Question Bank</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => navigate(`/subjects/${subjectId}`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">{subject?.code} Question Bank</h1>
          </div>
          <p className="text-muted-foreground">{subject?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Generate Question Bank
              </CardTitle>
              <CardDescription>
                Set parameters to generate custom questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="module">Module</Label>
                  <Select 
                    value={selectedModule} 
                    onValueChange={setSelectedModule}
                    disabled={generating}
                  >
                    <SelectTrigger id="module">
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent>
                      {subject?.modules.map(module => (
                        <SelectItem key={module.id} value={module.id}>{module.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chapter">Chapter</Label>
                  <Select 
                    value={selectedChapter} 
                    onValueChange={setSelectedChapter}
                    disabled={!selectedModule || generating}
                  >
                    <SelectTrigger id="chapter">
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {getChaptersForModule(selectedModule).map(chapter => (
                        <SelectItem key={chapter.id} value={chapter.id}>{chapter.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Question Types</Label>
                  <div className="grid grid-cols-1 gap-2">
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

                <div className="space-y-2">
                  <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
                  <Textarea 
                    id="instructions" 
                    placeholder="Add any specific instructions for the question generation..."
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                    disabled={generating}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full hover-scale"
                onClick={handleGenerate}
                disabled={generating || !selectedModule || !selectedChapter}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Questions
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {questions.length > 0 ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Generated Questions</CardTitle>
                  <CardDescription>
                    {questions.length} questions for selected chapter
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Downloading questions",
                        description: "Your question bank is downloading...",
                      });
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" /> Export
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSaveToWorkspace}
                  >
                    Save to Workspace
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question) => (
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
                      </div>
                      
                      <div className="font-medium">{question.question}</div>
                      
                      {question.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                          {question.options.map((option: any) => (
                            <div key={option.id} className="flex items-center gap-2">
                              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                                option.correct ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-muted text-muted-foreground'
                              }`}>
                                {option.id}
                              </div>
                              <span>{option.text}</span>
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
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border rounded-lg p-8">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Questions Generated Yet</h3>
              <p className="text-muted-foreground text-center mt-2 max-w-md">
                Select a module and chapter, then configure your question parameters and generate your custom question bank.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectQuestionBank;
