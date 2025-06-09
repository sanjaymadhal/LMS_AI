
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Trophy, 
  Star, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  RotateCcw,
  RotateCw
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface PuzzleQuestQuizProps {
  isOpen: boolean;
  onClose: () => void;
  quizTitle?: string;
}

interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  isPlaced: boolean;
  isDragging: boolean;
}

const PuzzleQuestQuiz: React.FC<PuzzleQuestQuizProps> = ({ 
  isOpen, 
  onClose, 
  quizTitle = "Programming Fundamentals Quest" 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [xpPoints, setXpPoints] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [revealedPieces, setRevealedPieces] = useState<Set<number>>(new Set());
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Use a random placeholder image for the puzzle
  const puzzleImageUrl = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop";

  // Sample questions - in a real implementation, these would come from props or API
  const questions: Question[] = [
    {
      id: 1,
      text: "What is the correct way to declare a variable in JavaScript?",
      options: ["var x = 5;", "variable x = 5;", "int x = 5;", "declare x = 5;"],
      correctAnswer: 0,
      explanation: "The 'var' keyword is used to declare variables in JavaScript."
    },
    {
      id: 2,
      text: "Which loop is best for iterating through an array?",
      options: ["while loop", "do-while loop", "for loop", "infinite loop"],
      correctAnswer: 2,
      explanation: "For loops are most commonly used for array iteration with known length."
    },
    {
      id: 3,
      text: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      correctAnswer: 1,
      explanation: "CSS stands for Cascading Style Sheets, used for styling web pages."
    },
    {
      id: 4,
      text: "Which HTML tag is used for the largest heading?",
      options: ["<h6>", "<h3>", "<h1>", "<header>"],
      correctAnswer: 2,
      explanation: "<h1> represents the largest heading in HTML, typically used for main titles."
    }
  ];

  // Initialize puzzle pieces
  useEffect(() => {
    const initialPieces: PuzzlePiece[] = Array.from({ length: 4 }).map((_, index) => ({
      id: index,
      x: 50 + (index % 2) * 120,
      y: 50 + Math.floor(index / 2) * 120,
      rotation: Math.random() * 360,
      isPlaced: false,
      isDragging: false
    }));
    setPuzzlePieces(initialPieces);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setXpPoints(prev => prev + 10);
      setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));
      setRevealedPieces(prev => new Set([...prev, currentQuestion]));
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (answeredQuestions.size === questions.length) {
      setXpPoints(prev => prev + 50);
      setQuizCompleted(true);
    }
  };

  const handleRetry = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnsweredQuestions(new Set());
    setXpPoints(0);
    setShowFeedback(false);
    setIsCorrect(false);
    setQuizCompleted(false);
    setRevealedPieces(new Set());
    setSelectedPiece(null);
    
    // Reset puzzle pieces
    const resetPieces: PuzzlePiece[] = Array.from({ length: 4 }).map((_, index) => ({
      id: index,
      x: 50 + (index % 2) * 120,
      y: 50 + Math.floor(index / 2) * 120,
      rotation: Math.random() * 360,
      isPlaced: false,
      isDragging: false
    }));
    setPuzzlePieces(resetPieces);
  };

  const handlePieceMouseDown = (e: React.MouseEvent, pieceId: number) => {
    if (!revealedPieces.has(pieceId)) return;
    
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setSelectedPiece(pieceId);
    
    setPuzzlePieces(prev => prev.map(piece => 
      piece.id === pieceId 
        ? { ...piece, isDragging: true }
        : { ...piece, isDragging: false }
    ));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectedPiece === null) return;

    const containerRect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;

    setPuzzlePieces(prev => prev.map(piece => 
      piece.id === selectedPiece 
        ? { 
            ...piece, 
            x: Math.max(0, Math.min(300, newX)), 
            y: Math.max(0, Math.min(300, newY))
          }
        : piece
    ));
  };

  const handleMouseUp = () => {
    setSelectedPiece(null);
    setPuzzlePieces(prev => prev.map(piece => ({ ...piece, isDragging: false })));
  };

  const rotatePiece = (pieceId: number) => {
    setPuzzlePieces(prev => prev.map(piece => 
      piece.id === pieceId 
        ? { ...piece, rotation: (piece.rotation + 90) % 360 }
        : piece
    ));
  };

  const puzzleProgress = (revealedPieces.size / questions.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-xl font-bold">{quizTitle}</DialogTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
                <Star className="h-4 w-4 text-yellow-600" />
                <span className="font-semibold text-yellow-800">{xpPoints} XP</span>
              </div>
              <Button variant="outline" size="sm" onClick={resetQuiz}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </DialogHeader>

        {!quizCompleted ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Question Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-32" />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {questions[currentQuestion].text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showFeedback
                          ? index === questions[currentQuestion].correctAnswer
                            ? "default"
                            : selectedAnswer === index
                            ? "destructive"
                            : "outline"
                          : selectedAnswer === index
                          ? "secondary"
                          : "outline"
                      }
                      className={`w-full text-left justify-start h-auto p-4 ${
                        showFeedback
                          ? index === questions[currentQuestion].correctAnswer
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : selectedAnswer === index
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : ""
                          : ""
                      }`}
                      onClick={() => !showFeedback && handleAnswerSelect(index)}
                      disabled={showFeedback}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                        {showFeedback && index === questions[currentQuestion].correctAnswer && (
                          <CheckCircle className="h-4 w-4 ml-auto" />
                        )}
                        {showFeedback && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                          <XCircle className="h-4 w-4 ml-auto" />
                        )}
                      </div>
                    </Button>
                  ))}

                  {showFeedback && (
                    <div className="mt-4 p-4 rounded-lg bg-gray-50">
                      <div className={`flex items-center gap-2 mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                        <span className="font-semibold">
                          {isCorrect ? 'Correct! +10 XP' : 'Incorrect'}
                        </span>
                      </div>
                      {questions[currentQuestion].explanation && (
                        <p className="text-sm text-gray-600 mb-3">
                          {questions[currentQuestion].explanation}
                        </p>
                      )}
                      <div className="flex gap-2">
                        {isCorrect ? (
                          <Button onClick={handleNextQuestion}>
                            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                          </Button>
                        ) : (
                          <Button onClick={handleRetry} variant="outline">
                            Try Again
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Interactive Puzzle Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Interactive Puzzle</span>
                <span className="text-sm text-muted-foreground">
                  {revealedPieces.size}/{questions.length} pieces collected
                </span>
              </div>

              <Card>
                <CardContent className="p-6">
                  {revealedPieces.size === 0 ? (
                    <div className="aspect-square w-full max-w-sm mx-auto flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center text-gray-400">
                        <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Answer questions correctly</p>
                        <p className="text-xs">to reveal puzzle pieces!</p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="relative aspect-square w-full max-w-sm mx-auto bg-gray-100 rounded-lg overflow-hidden cursor-crosshair"
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      {/* Background grid */}
                      <div className="absolute inset-0 grid grid-cols-2 gap-1 p-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div
                            key={index}
                            className="border-2 border-dashed border-gray-300 rounded-lg bg-white/50"
                          />
                        ))}
                      </div>

                      {/* Puzzle pieces */}
                      {puzzlePieces.map((piece) => (
                        revealedPieces.has(piece.id) && (
                          <div
                            key={piece.id}
                            className={`absolute cursor-move transition-all duration-200 ${
                              piece.isDragging ? 'z-20 scale-105' : 'z-10'
                            } ${selectedPiece === piece.id ? 'ring-2 ring-blue-400' : ''}`}
                            style={{
                              left: `${piece.x}px`,
                              top: `${piece.y}px`,
                              transform: `rotate(${piece.rotation}deg)`,
                            }}
                            onMouseDown={(e) => handlePieceMouseDown(e, piece.id)}
                          >
                            <div className="relative group">
                              {/* Puzzle piece with image */}
                              <div 
                                className="w-16 h-16 bg-white border-2 border-blue-400 rounded-lg shadow-lg overflow-hidden"
                                style={{
                                  backgroundImage: `url(${puzzleImageUrl})`,
                                  backgroundSize: '128px 128px',
                                  backgroundPosition: `${-(piece.id % 2) * 64}px ${-Math.floor(piece.id / 2) * 64}px`,
                                }}
                              >
                                {/* Puzzle connectors */}
                                <div className="absolute inset-0">
                                  {/* Top connector */}
                                  {piece.id < 2 && (
                                    <div className="absolute -top-1 left-1/2 w-3 h-2 bg-blue-400 rounded-t-full transform -translate-x-1/2" />
                                  )}
                                  {/* Bottom connector */}
                                  {piece.id >= 2 && (
                                    <div className="absolute -bottom-1 left-1/2 w-3 h-2 bg-blue-400 rounded-b-full transform -translate-x-1/2" />
                                  )}
                                  {/* Left connector */}
                                  {piece.id % 2 === 0 && (
                                    <div className="absolute -left-1 top-1/2 w-2 h-3 bg-blue-400 rounded-l-full transform -translate-y-1/2" />
                                  )}
                                  {/* Right connector */}
                                  {piece.id % 2 === 1 && (
                                    <div className="absolute -right-1 top-1/2 w-2 h-3 bg-blue-400 rounded-r-full transform -translate-y-1/2" />
                                  )}
                                </div>
                              </div>

                              {/* Rotate button on hover */}
                              <Button
                                size="icon"
                                variant="secondary"
                                className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  rotatePiece(piece.id);
                                }}
                              >
                                <RotateCw className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  <Progress value={puzzleProgress} className="mt-4" />
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    {revealedPieces.size === 0 
                      ? "Start answering questions to collect puzzle pieces!"
                      : `Drag and rotate pieces to solve the puzzle! (${revealedPieces.size}/4 collected)`
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Quiz Completion Screen with complete image
          <div className="text-center space-y-6 py-8">
            <div className="space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-green-600">Puzzle Complete!</h2>
              <p className="text-lg text-muted-foreground">
                Congratulations! You've completed the quest and revealed the entire puzzle.
              </p>
            </div>

            {/* Complete puzzle image */}
            <div className="mx-auto w-64 h-64 rounded-lg overflow-hidden shadow-lg border-4 border-yellow-400">
              <img 
                src={puzzleImageUrl} 
                alt="Completed puzzle" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-700">
                <Star className="h-6 w-6" />
                Total XP Earned: {xpPoints}
                <Star className="h-6 w-6" />
              </div>
              <p className="text-sm text-yellow-600 mt-2">
                Including +50 bonus XP for completion!
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
              <Button onClick={onClose}>
                Close Quiz
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PuzzleQuestQuiz;
