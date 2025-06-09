import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown,
  Play,
  Calendar,
  CalendarCheck,
  ArrowLeft,
  Edit3,
  X,
  Pen,
  Brush,
  Circle,
  Square,
  Type,
  Image,
  Eraser,
  Undo,
  Redo,
  Code,
  Box,
  Layers,
  Palette,
  Save,
  Share2,
  Download,
  Trash2,
  Maximize2,
  Minimize2,
  FileCode,
  Boxes,
  Cpu,
  Eye,
  Copy,
  MoveUp,
  MoveDown,
  MoveLeft,
  MoveRight,
  RotateCcw,
  RotateCw,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getSubject } from '@/data/subjectsData';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const SubjectView: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const subject = getSubject(subjectId || '');
  const [attendanceReminded, setAttendanceReminded] = useState<boolean>(false);
  const [showAttendanceDialog, setShowAttendanceDialog] = useState<boolean>(false);
  const [showPresentation, setShowPresentation] = useState<boolean>(false);
  const [currentPresentation, setCurrentPresentation] = useState<string>('');
  const [currentChapter, setCurrentChapter] = useState<string>('');
  const [showWhiteboard, setShowWhiteboard] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<string>('pen');
  const [toolColor, setToolColor] = useState<string>('#000000');
  const [toolSize, setToolSize] = useState<number>(2);
  const [showCodeEditor, setShowCodeEditor] = useState<boolean>(false);
  const [showVRLab, setShowVRLab] = useState<boolean>(false);

  if (!subject) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Subject not found</h2>
        <p className="mb-4 text-muted-foreground">The subject you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/live-classroom')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Live Classroom
        </Button>
      </div>
    );
  }
  
  const handleStartPresentation = (chapterName: string, presentationName: string) => {
    if (!attendanceReminded) {
      setShowAttendanceDialog(true);
      setCurrentChapter(chapterName);
      setCurrentPresentation(presentationName);
    } else {
      setCurrentChapter(chapterName);
      setCurrentPresentation(presentationName);
      setShowPresentation(true);
      setShowWhiteboard(false);
      toast({
        title: "Starting presentation",
        description: `Now presenting: ${presentationName}`,
      });
    }
  };

  const handleIllustrate = () => {
    setShowWhiteboard(prev => !prev);
    toast({
      title: showWhiteboard ? "Returning to Presentation" : "Illustrate with Whiteboard",
      description: showWhiteboard ? "Presentation view is now active." : "Whiteboard is now active for illustration.",
    });
  };
  
  const handleMarkAttendance = () => {
    setAttendanceReminded(true);
    setShowAttendanceDialog(false);
    navigate('/workspace/attendance', { 
      state: { 
        subjectId: subject.id,
        subjectName: subject.name,
        subjectCode: subject.code
      } 
    });
  };
  
  const handleSkipAttendance = () => {
    setAttendanceReminded(true);
    setShowAttendanceDialog(false);
    setShowPresentation(true);
    toast({
      title: "Attendance reminder",
      description: "Attendance marking was skipped for this session.",
    });
  };

  const renderToolbar = () => (
    <div className="absolute left-4 top-4 bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
      <TooltipProvider>
        <div className="flex flex-col gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === 'pen' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveTool('pen')}
              >
                <Pen className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pen Tool</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === 'brush' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveTool('brush')}
              >
                <Brush className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Brush Tool</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === 'circle' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveTool('circle')}
              >
                <Circle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Circle Tool</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === 'rectangle' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveTool('rectangle')}
              >
                <Square className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Rectangle Tool</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === 'text' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveTool('text')}
              >
                <Type className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Text Tool</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === 'image' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveTool('image')}
              >
                <Image className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Image Tool</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === 'eraser' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveTool('eraser')}
              >
                <Eraser className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Eraser Tool</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );

  const renderColorPicker = () => (
    <div className="absolute left-4 top-[200px] bg-white rounded-lg shadow-lg p-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: toolColor }}
              onClick={() => setToolColor('#000000')}
            />
          </TooltipTrigger>
          <TooltipContent>Color Picker</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const renderAdvancedTools = () => (
    <div className="absolute right-4 top-4 bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCodeEditor(true)}
            >
              <FileCode className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Code Editor</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowVRLab(true)}
            >
              <Boxes className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>VR Lab</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <Save className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const renderCodeEditor = () => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col ml-64">
      <div className="bg-gray-100 px-6 py-3 flex justify-between items-center border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCodeEditor(false)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Presentation</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Code Execution</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Code Execution Panel</h2>
          <Select defaultValue="javascript">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="csharp">C#</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 gap-4 min-h-0">
        <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
          {/* Code Snippet Panel */}
          <div className="bg-gray-900 rounded-lg overflow-hidden flex flex-col">
            <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-200">Code Snippet</h3>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <pre className="p-4 text-sm text-gray-200 font-mono">
{`function calculateSum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

const numbers = [1, 2, 3, 4, 5];
const result = calculateSum(numbers);
console.log(result);`}
              </pre>
            </ScrollArea>
          </div>

          {/* Visualization Panel */}
          <div className="bg-white rounded-lg border overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="text-sm font-medium">Visualization</h3>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs">1</div>
                    <div className="text-sm">Initialize sum = 0</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs">2</div>
                    <div className="text-sm">Iterate through numbers: [1, 2, 3, 4, 5]</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs">3</div>
                    <div className="text-sm">Add each number to sum</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center text-green-600 text-xs">4</div>
                    <div className="text-sm">Return final sum: 15</div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Input Panel */}
          <div className="bg-white rounded-lg border overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="text-sm font-medium">Input</h3>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Test Cases</label>
                    <textarea
                      className="w-full h-24 p-2 border rounded-md text-sm"
                      placeholder="Enter test cases here..."
                      defaultValue={`[1, 2, 3, 4, 5]
[10, 20, 30]
[0, 0, 0]`}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Custom Input</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md text-sm"
                      placeholder="Enter custom input..."
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
            <h3 className="text-sm font-medium">Output</h3>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Play className="h-4 w-4 mr-2" />
              Run Code
            </Button>
          </div>
          <div className="p-4">
            <div className="bg-gray-900 rounded-md p-4">
              <pre className="text-sm text-gray-200 font-mono">
{`> Test Case 1: [1, 2, 3, 4, 5]
15

> Test Case 2: [10, 20, 30]
60

> Test Case 3: [0, 0, 0]
0`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVRLab = () => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col ml-64">
      <div className="bg-gray-100 px-6 py-3 flex justify-between items-center border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowVRLab(false)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Presentation</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">VR Lab</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">VR Lab</h2>
          <Select defaultValue="chemistry">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 gap-4 min-h-0">
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {/* VR Environment */}
          <div className="bg-gray-900 rounded-lg overflow-hidden flex flex-col">
            <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-200">VR Environment</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* 3D Cube */}
                <div className="absolute inset-0 transform rotate-45">
                  <div className="w-full h-full bg-blue-500/20 border-2 border-blue-400/30 rounded-lg shadow-lg"></div>
                </div>
                <div className="absolute inset-0 transform -rotate-45">
                  <div className="w-full h-full bg-purple-500/20 border-2 border-purple-400/30 rounded-lg shadow-lg"></div>
                </div>
                <div className="absolute inset-0 transform rotate-135">
                  <div className="w-full h-full bg-pink-500/20 border-2 border-pink-400/30 rounded-lg shadow-lg"></div>
                </div>
                <div className="absolute inset-0 transform -rotate-135">
                  <div className="w-full h-full bg-indigo-500/20 border-2 border-indigo-400/30 rounded-lg shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-white rounded-lg border overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="text-sm font-medium">Controls</h3>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Experiment Type</label>
                    <Select defaultValue="basic">
                      <SelectTrigger>
                        <SelectValue placeholder="Select experiment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Experiment</SelectItem>
                        <SelectItem value="advanced">Advanced Experiment</SelectItem>
                        <SelectItem value="custom">Custom Experiment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Parameters</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Enable Physics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Show Measurements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Enable Interactions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Status: Ready</span>
              <span className="text-sm text-gray-500">FPS: 60</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save State
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {!showPresentation ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/live-classroom')}
                className="mb-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{subject.code}</h1>
                <p className="text-muted-foreground">{subject.name}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="hover-scale"
                onClick={() => navigate('/workspace/attendance', { 
                  state: { 
                    subjectId: subject.id, 
                    subjectName: subject.name,
                    subjectCode: subject.code
                  } 
                })}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Modules and Chapters</CardTitle>
              <CardDescription>
                Select a chapter to begin the presentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {subject.modules.map((module) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium">{module.name}</span>
                        <span className="text-xs text-muted-foreground">{module.chapters.length} chapters</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pl-4 pt-2">
                        {module.chapters.map((chapter) => (
                          <div key={chapter.id} className="border rounded-md p-4">
                            <h3 className="font-medium mb-2">{chapter.name}</h3>
                            <div className="space-y-2">
                              {chapter.presentations.map((presentation) => (
                                <div key={presentation.id} className="flex items-center justify-between">
                                  <span className="text-sm">{presentation.name}</span>
                                  <Button size="sm" onClick={() => handleStartPresentation(chapter.name, presentation.name)}>
                                    <Play className="h-4 w-4 mr-1" />
                                    Present
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="fixed inset-0 bg-gray-100 flex flex-col">
          {/* Navbar */}
          <div className="bg-white p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{currentChapter}</h2>
                <p className="text-muted-foreground">{currentPresentation}</p>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="bg-white p-4 border-b flex justify-end gap-4">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 px-6"
              onClick={handleIllustrate}
            >
              {showWhiteboard ? (
                <>
                  <Play className="h-5 w-5" />
                  Back to Presentation
                </>
              ) : (
                <>
                  <Edit3 className="h-5 w-5" />
                  Illustrate
                </>
              )}
            </Button>
            <Button
              variant="destructive"
              size="lg"
              onClick={() => setShowPresentation(false)}
              className="flex items-center gap-2 px-6"
            >
              <X className="h-5 w-5" />
              Exit Presentation
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex">
            {/* Slide Navigation Panel */}
            <div className="w-64 bg-white border-r overflow-y-auto">
              <div className="p-4">
                <h3 className="font-semibold mb-4">Slides</h3>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((slide) => (
                    <div
                      key={slide}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          {slide}
                        </div>
                        <span className="text-sm">Slide {slide}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Presentation Content */}
            <div className="flex-1 bg-white overflow-hidden">
              {!showWhiteboard ? (
                <div className="w-full h-full p-8">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold mb-6">{currentChapter}</h3>
                    <div className="prose prose-lg">
                      <p className="text-xl mb-4">
                        This is a simulated presentation view. In a real implementation, this would show your presentation slides or content.
                      </p>
                      <p className="text-xl">
                        You can use the Illustrate button to switch to a whiteboard for drawing and annotations.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  {renderToolbar()}
                  {renderColorPicker()}
                  {renderAdvancedTools()}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center">
                    <p className="text-xl text-muted-foreground">
                      Interactive whiteboard area. Use the tools on the left to start drawing.
                    </p>
                  </div>
                  {showCodeEditor && renderCodeEditor()}
                  {showVRLab && renderVRLab()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AlertDialog open={showAttendanceDialog} onOpenChange={setShowAttendanceDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Attendance</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to mark attendance before starting the presentation?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleSkipAttendance}>Skip</AlertDialogCancel>
            <AlertDialogAction onClick={handleMarkAttendance}>Mark Attendance</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubjectView;