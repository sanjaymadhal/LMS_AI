
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { 
  Plus, 
  Clock, 
  Calendar,
  Settings,
  Eye,
  Save,
  Send,
  Trash2,
  CheckCircle,
  XCircle,
  Edit,
  RotateCcw
} from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  correctFeedback: string;
  incorrectFeedback: string;
  explanation: string;
}

interface MCQQuizCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quizData: any) => void;
}

const MCQQuizCreator: React.FC<MCQQuizCreatorProps> = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState<'setup' | 'questions' | 'preview'>('setup');
  const [quizSetup, setQuizSetup] = useState({
    title: '',
    description: '',
    instructions: '',
    hasTimeLimit: false,
    timeLimit: 30,
    startDate: '',
    endDate: '',
    immediateAvailability: true
  });
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1,
    difficulty: 'medium',
    correctFeedback: '',
    incorrectFeedback: '',
    explanation: ''
  });
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  const addQuestion = () => {
    if (currentQuestion.question) {
      const newQuestion: Question = {
        ...currentQuestion,
        id: Date.now().toString()
      } as Question;
      
      if (editingQuestionId) {
        setQuestions(questions.map(q => q.id === editingQuestionId ? newQuestion : q));
        setEditingQuestionId(null);
      } else {
        setQuestions([...questions, newQuestion]);
      }
      
      setCurrentQuestion({
        type: 'multiple-choice',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1,
        difficulty: 'medium',
        correctFeedback: '',
        incorrectFeedback: '',
        explanation: ''
      });
    }
  };

  const editQuestion = (question: Question) => {
    setCurrentQuestion(question);
    setEditingQuestionId(question.id);
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleSaveQuiz = (isDraft: boolean = true) => {
    const quizData = {
      ...quizSetup,
      questions,
      status: isDraft ? 'draft' : 'published',
      createdAt: new Date().toISOString()
    };
    onSave(quizData);
    onClose();
  };

  const renderSetupStep = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Quiz Title *</Label>
          <Input
            id="title"
            value={quizSetup.title}
            onChange={(e) => setQuizSetup({...quizSetup, title: e.target.value})}
            placeholder="e.g., Python Variables and Data Types Quiz"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={quizSetup.description}
            onChange={(e) => setQuizSetup({...quizSetup, description: e.target.value})}
            placeholder="Explain the quiz purpose and content..."
          />
        </div>
        
        <div>
          <Label htmlFor="instructions">Instructions for Students</Label>
          <Textarea
            id="instructions"
            value={quizSetup.instructions}
            onChange={(e) => setQuizSetup({...quizSetup, instructions: e.target.value})}
            placeholder="Clear guidelines on how to take the quiz..."
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="timeLimit"
              checked={quizSetup.hasTimeLimit}
              onChange={(e) => setQuizSetup({...quizSetup, hasTimeLimit: e.target.checked})}
            />
            <Label htmlFor="timeLimit">Set time limit</Label>
          </div>
          
          {quizSetup.hasTimeLimit && (
            <div>
              <Label htmlFor="timeLimitValue">Time Limit (minutes)</Label>
              <Input
                type="number"
                id="timeLimitValue"
                value={quizSetup.timeLimit}
                onChange={(e) => setQuizSetup({...quizSetup, timeLimit: Number(e.target.value)})}
                min="5"
                max="180"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="immediateAvailability"
              checked={quizSetup.immediateAvailability}
              onChange={(e) => setQuizSetup({...quizSetup, immediateAvailability: e.target.checked})}
            />
            <Label htmlFor="immediateAvailability">Make available immediately</Label>
          </div>
          
          {!quizSetup.immediateAvailability && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date/Time</Label>
                <Input
                  type="datetime-local"
                  id="startDate"
                  value={quizSetup.startDate}
                  onChange={(e) => setQuizSetup({...quizSetup, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date/Time</Label>
                <Input
                  type="datetime-local"
                  id="endDate"
                  value={quizSetup.endDate}
                  onChange={(e) => setQuizSetup({...quizSetup, endDate: e.target.value})}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={() => setCurrentStep('questions')} disabled={!quizSetup.title}>
          Next: Add Questions
        </Button>
      </div>
    </div>
  );

  const renderQuestionStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Questions ({questions.length})</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentStep('setup')}>
            Back to Setup
          </Button>
          <Button variant="outline" onClick={() => setCurrentStep('preview')}>
            Preview Quiz
          </Button>
        </div>
      </div>

      {/* Question Creator Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingQuestionId ? 'Edit Question' : 'Add New Question'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Question Type</Label>
              <select
                value={currentQuestion.type}
                onChange={(e) => setCurrentQuestion({...currentQuestion, type: e.target.value as any})}
                className="w-full p-2 border rounded"
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
              </select>
            </div>
            <div>
              <Label>Difficulty</Label>
              <select
                value={currentQuestion.difficulty}
                onChange={(e) => setCurrentQuestion({...currentQuestion, difficulty: e.target.value as any})}
                className="w-full p-2 border rounded"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <Label>Points</Label>
              <Input
                type="number"
                value={currentQuestion.points}
                onChange={(e) => setCurrentQuestion({...currentQuestion, points: Number(e.target.value)})}
                min="1"
                max="10"
              />
            </div>
          </div>

          <div>
            <Label>Question Text *</Label>
            <Textarea
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
              placeholder="Enter your question here..."
            />
          </div>

          {currentQuestion.type === 'multiple-choice' && (
            <div>
              <Label>Answer Options</Label>
              <div className="space-y-2">
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={currentQuestion.correctAnswer === index}
                      onChange={() => setCurrentQuestion({...currentQuestion, correctAnswer: index})}
                    />
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(currentQuestion.options || [])];
                        newOptions[index] = e.target.value;
                        setCurrentQuestion({...currentQuestion, options: newOptions});
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentQuestion({
                    ...currentQuestion,
                    options: [...(currentQuestion.options || []), '']
                  })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div>
              <Label>Correct Answer</Label>
              <RadioGroup
                value={currentQuestion.correctAnswer?.toString()}
                onValueChange={(value) => setCurrentQuestion({...currentQuestion, correctAnswer: value})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true">True</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false">False</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Correct Answer Feedback</Label>
              <Textarea
                value={currentQuestion.correctFeedback}
                onChange={(e) => setCurrentQuestion({...currentQuestion, correctFeedback: e.target.value})}
                placeholder="e.g., Excellent! Variables store data values."
              />
            </div>
            <div>
              <Label>Incorrect Answer Feedback</Label>
              <Textarea
                value={currentQuestion.incorrectFeedback}
                onChange={(e) => setCurrentQuestion({...currentQuestion, incorrectFeedback: e.target.value})}
                placeholder="e.g., Not quite. Remember that strings are text data."
              />
            </div>
          </div>

          <div>
            <Label>Explanation</Label>
            <Textarea
              value={currentQuestion.explanation}
              onChange={(e) => setCurrentQuestion({...currentQuestion, explanation: e.target.value})}
              placeholder="Detailed explanation of why the answer is correct/incorrect..."
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={addQuestion} disabled={!currentQuestion.question}>
              {editingQuestionId ? 'Update Question' : 'Add Question'}
            </Button>
            {editingQuestionId && (
              <Button variant="outline" onClick={() => {
                setEditingQuestionId(null);
                setCurrentQuestion({
                  type: 'multiple-choice',
                  question: '',
                  options: ['', '', '', ''],
                  correctAnswer: 0,
                  points: 1,
                  difficulty: 'medium',
                  correctFeedback: '',
                  incorrectFeedback: '',
                  explanation: ''
                });
              }}>
                Cancel Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Added Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex-1">
                    <p className="font-medium">
                      {index + 1}. {question.question.slice(0, 80)}
                      {question.question.length > 80 ? '...' : ''}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                      <span>Type: {question.type}</span>
                      <span>Difficulty: {question.difficulty}</span>
                      <span>Points: {question.points}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => editQuestion(question)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteQuestion(question.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {questions.length > 0 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => handleSaveQuiz(true)}>
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={() => handleSaveQuiz(false)}>
            <Send className="h-4 w-4 mr-2" />
            Publish Quiz
          </Button>
        </div>
      )}
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quiz Preview</h3>
        <Button variant="outline" onClick={() => setCurrentStep('questions')}>
          Back to Questions
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{quizSetup.title}</CardTitle>
          <p className="text-gray-600">{quizSetup.description}</p>
          {quizSetup.instructions && (
            <div className="mt-2 p-3 bg-blue-50 rounded">
              <p className="text-sm"><strong>Instructions:</strong> {quizSetup.instructions}</p>
            </div>
          )}
          {quizSetup.hasTimeLimit && (
            <p className="text-sm text-orange-600">
              Time Limit: {quizSetup.timeLimit} minutes
            </p>
          )}
        </CardHeader>
        <CardContent>
          {questions.map((question, index) => (
            <div key={question.id} className="mb-6 p-4 border rounded">
              <h4 className="font-medium mb-3">
                {index + 1}. {question.question}
                <span className="ml-2 text-sm text-gray-500">({question.points} points)</span>
              </h4>
              
              {question.type === 'multiple-choice' && (
                <div className="space-y-2">
                  {question.options?.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center space-x-2">
                      <input type="radio" name={`preview-${question.id}`} disabled />
                      <span>{String.fromCharCode(65 + optIndex)}. {option}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {question.type === 'true-false' && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" name={`preview-${question.id}`} disabled />
                    <span>True</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" name={`preview-${question.id}`} disabled />
                    <span>False</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Mark for Review
                </Button>
                <Button size="sm">
                  Submit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => handleSaveQuiz(true)}>
          <Save className="h-4 w-4 mr-2" />
          Save as Draft
        </Button>
        <Button onClick={() => handleSaveQuiz(false)}>
          <Send className="h-4 w-4 mr-2" />
          Publish Quiz
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Multiple Choice Quiz
          </DialogTitle>
          <div className="flex gap-1 mt-2">
            {['setup', 'questions', 'preview'].map((step, index) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded ${
                  currentStep === step ? 'bg-blue-500' :
                  ['setup', 'questions', 'preview'].indexOf(currentStep) > index ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="mt-6">
          {currentStep === 'setup' && renderSetupStep()}
          {currentStep === 'questions' && renderQuestionStep()}
          {currentStep === 'preview' && renderPreviewStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MCQQuizCreator;
