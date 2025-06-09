
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Upload, Bug, Code, FileText, Target, Clock, Trophy, Plus, X } from 'lucide-react';

interface BugHuntCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

interface Bug {
  id: string;
  type: 'syntax' | 'logic' | 'factual' | 'design' | 'conceptual';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  location: string;
  description: string;
  hint: string;
  solution: string;
  points: number;
}

const BugHuntCreator: React.FC<BugHuntCreatorProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(30);
  const [attemptLimits, setAttemptLimits] = useState(3);
  const [contentType, setContentType] = useState('document');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [enableLeaderboard, setEnableLeaderboard] = useState(true);
  const [speedBonus, setSpeedBonus] = useState(true);
  const [accuracyBonus, setAccuracyBonus] = useState(true);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addBug = () => {
    const newBug: Bug = {
      id: Date.now().toString(),
      type: 'syntax',
      difficulty: 'beginner',
      location: '',
      description: '',
      hint: '',
      solution: '',
      points: 10
    };
    setBugs(prev => [...prev, newBug]);
  };

  const updateBug = (id: string, field: keyof Bug, value: any) => {
    setBugs(prev => prev.map(bug => 
      bug.id === id ? { ...bug, [field]: value } : bug
    ));
  };

  const removeBug = (id: string) => {
    setBugs(prev => prev.filter(bug => bug.id !== id));
  };

  const handleSave = () => {
    const bugHuntData = {
      title,
      description,
      subject,
      topic,
      difficulty,
      targetAudience,
      estimatedTime,
      attemptLimits,
      contentType,
      uploadedFiles,
      bugs,
      scoring: {
        enableLeaderboard,
        speedBonus,
        accuracyBonus
      }
    };
    onSave(bugHuntData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-red-500" />
            Bug Hunt Creation Interface
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="setup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Hunt Setup</TabsTrigger>
            <TabsTrigger value="content">Content Integration</TabsTrigger>
            <TabsTrigger value="bugs">Bug Management</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            {/* Basic Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Basic Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Hunt Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter bug hunt title"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the bug hunt objectives and rules"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject Area</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., Computer Science"
                    />
                  </div>

                  <div>
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Data Structures"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="audience">Target Audience</Label>
                    <Input
                      id="audience"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="e.g., Grade 10, CS101"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="time">Estimated Time (minutes)</Label>
                    <Input
                      id="time"
                      type="number"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(Number(e.target.value))}
                      min={5}
                      max={180}
                    />
                  </div>

                  <div>
                    <Label htmlFor="attempts">Attempt Limits</Label>
                    <Input
                      id="attempts"
                      type="number"
                      value={attemptLimits}
                      onChange={(e) => setAttemptLimits(Number(e.target.value))}
                      min={1}
                      max={10}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scoring System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Scoring System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="leaderboard">Enable Leaderboard</Label>
                  <Switch
                    id="leaderboard"
                    checked={enableLeaderboard}
                    onCheckedChange={setEnableLeaderboard}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="speed">Speed Bonus</Label>
                  <Switch
                    id="speed"
                    checked={speedBonus}
                    onCheckedChange={setSpeedBonus}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="accuracy">Accuracy Bonus</Label>
                  <Switch
                    id="accuracy"
                    checked={accuracyBonus}
                    onCheckedChange={setAccuracyBonus}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content Integration Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contentType">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document-Based</SelectItem>
                      <SelectItem value="code">Code-Based</SelectItem>
                      <SelectItem value="manual">Manual Bug Insertion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {contentType === 'document' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fileUpload">Upload Documents</Label>
                      <Input
                        id="fileUpload"
                        type="file"
                        multiple
                        accept=".pdf,.docx,.pptx,.txt"
                        onChange={handleFileUpload}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Supported formats: PDF, DOCX, PPTX, TXT
                      </p>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Files:</Label>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {contentType === 'code' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="codeSnippet">Code Snippet</Label>
                      <Textarea
                        id="codeSnippet"
                        placeholder="Paste your code with intentional bugs here..."
                        rows={10}
                        className="font-mono"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="language">Programming Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="css">CSS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bugs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="h-5 w-5" />
                    Bug Management
                  </CardTitle>
                  <Button onClick={addBug} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bug
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {bugs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bug className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bugs added yet. Click "Add Bug" to create your first bug.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bugs.map((bug, index) => (
                      <Card key={bug.id} className="border-l-4 border-l-red-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold">Bug #{index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBug(bug.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Bug Type</Label>
                              <Select
                                value={bug.type}
                                onValueChange={(value) => updateBug(bug.id, 'type', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="syntax">Syntax Error</SelectItem>
                                  <SelectItem value="logic">Logic Error</SelectItem>
                                  <SelectItem value="factual">Factual Error</SelectItem>
                                  <SelectItem value="design">Design Error</SelectItem>
                                  <SelectItem value="conceptual">Conceptual Error</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Difficulty</Label>
                              <Select
                                value={bug.difficulty}
                                onValueChange={(value) => updateBug(bug.id, 'difficulty', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="beginner">Beginner</SelectItem>
                                  <SelectItem value="intermediate">Intermediate</SelectItem>
                                  <SelectItem value="advanced">Advanced</SelectItem>
                                  <SelectItem value="expert">Expert</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Location</Label>
                              <Input
                                value={bug.location}
                                onChange={(e) => updateBug(bug.id, 'location', e.target.value)}
                                placeholder="Line 23, function calculateSum()"
                              />
                            </div>

                            <div>
                              <Label>Points</Label>
                              <Input
                                type="number"
                                value={bug.points}
                                onChange={(e) => updateBug(bug.id, 'points', Number(e.target.value))}
                                min={1}
                                max={100}
                              />
                            </div>
                          </div>

                          <div className="space-y-4 mt-4">
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                value={bug.description}
                                onChange={(e) => updateBug(bug.id, 'description', e.target.value)}
                                placeholder="Describe what's wrong and what should be fixed"
                                rows={2}
                              />
                            </div>

                            <div>
                              <Label>Hint</Label>
                              <Textarea
                                value={bug.hint}
                                onChange={(e) => updateBug(bug.id, 'hint', e.target.value)}
                                placeholder="Provide a helpful hint for students"
                                rows={2}
                              />
                            </div>

                            <div>
                              <Label>Expected Solution</Label>
                              <Textarea
                                value={bug.solution}
                                onChange={(e) => updateBug(bug.id, 'solution', e.target.value)}
                                placeholder="Document the correct solution for grading reference"
                                rows={3}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSave}>
            Mark for Review
          </Button>
          <Button onClick={handleSave}>
            Submit Bug Hunt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BugHuntCreator;
