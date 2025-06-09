
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { CalendarIcon, Upload, X, FileText, Clock, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState<Date>();
  const [dueTime, setDueTime] = useState('23:59');
  const [points, setPoints] = useState(100);
  const [assignmentType, setAssignmentType] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [fileTypes, setFileTypes] = useState('pdf,docx,txt');
  const [maxFileSize, setMaxFileSize] = useState(10);
  const [allowTextSubmission, setAllowTextSubmission] = useState(true);
  const [allowLateSubmission, setAllowLateSubmission] = useState(false);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [publishImmediately, setPublishImmediately] = useState(true);
  const [publishDate, setPublishDate] = useState<Date>();
  const [visibleToAll, setVisibleToAll] = useState(true);
  const [enableRubric, setEnableRubric] = useState(false);
  const [enableAutoGrading, setEnableAutoGrading] = useState(false);
  const [enablePeerReview, setEnablePeerReview] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (action: 'draft' | 'publish') => {
    const assignmentData = {
      title,
      description,
      instructions,
      dueDate,
      dueTime,
      points,
      assignmentType,
      attachments,
      submissionSettings: {
        fileTypes,
        maxFileSize,
        allowTextSubmission,
        allowLateSubmission,
        multipleAttempts
      },
      visibility: {
        publishImmediately,
        publishDate,
        visibleToAll
      },
      grading: {
        enableRubric,
        enableAutoGrading,
        enablePeerReview
      },
      status: action
    };
    onSubmit(assignmentData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create Assignment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Assignment Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter assignment title"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Assignment Type *</Label>
                  <Select value={assignmentType} onValueChange={setAssignmentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homework">Homework</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="lab">Lab</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="points">Total Points *</Label>
                  <Input
                    id="points"
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    min={1}
                    max={1000}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the assignment"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="instructions">Detailed Instructions</Label>
                <Textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Provide step-by-step instructions for students"
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Due Date & Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Due Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Due Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Select due date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="dueTime">Due Time</Label>
                  <Input
                    id="dueTime"
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="h-5 w-5" />
                File Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fileUpload">Upload Files (Optional)</Label>
                <Input
                  id="fileUpload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: PDF, DOCX, PPTX, ZIP, etc.
                </p>
              </div>

              {attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>Attached Files:</Label>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submission Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Submission Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fileTypes">Allowed File Types</Label>
                  <Input
                    id="fileTypes"
                    value={fileTypes}
                    onChange={(e) => setFileTypes(e.target.value)}
                    placeholder="pdf,docx,txt"
                  />
                </div>

                <div>
                  <Label htmlFor="maxSize">Max File Size (MB)</Label>
                  <Input
                    id="maxSize"
                    type="number"
                    value={maxFileSize}
                    onChange={(e) => setMaxFileSize(Number(e.target.value))}
                    min={1}
                    max={100}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="textSubmission">Allow Text Submission</Label>
                  <Switch
                    id="textSubmission"
                    checked={allowTextSubmission}
                    onCheckedChange={setAllowTextSubmission}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="lateSubmission">Allow Late Submissions</Label>
                  <Switch
                    id="lateSubmission"
                    checked={allowLateSubmission}
                    onCheckedChange={setAllowLateSubmission}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="multipleAttempts">Allow Multiple Attempts</Label>
                  <Switch
                    id="multipleAttempts"
                    checked={multipleAttempts}
                    onCheckedChange={setMultipleAttempts}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Visibility Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="publishNow">Publish Immediately</Label>
                <Switch
                  id="publishNow"
                  checked={publishImmediately}
                  onCheckedChange={setPublishImmediately}
                />
              </div>

              {!publishImmediately && (
                <div>
                  <Label>Publish Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !publishDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {publishDate ? format(publishDate, "PPP") : "Select publish date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={publishDate}
                        onSelect={setPublishDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="visibleAll">Visible to All Students</Label>
                <Switch
                  id="visibleAll"
                  checked={visibleToAll}
                  onCheckedChange={setVisibleToAll}
                />
              </div>
            </CardContent>
          </Card>

          {/* Grading Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Grading Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="rubric">Attach Rubric</Label>
                <Switch
                  id="rubric"
                  checked={enableRubric}
                  onCheckedChange={setEnableRubric}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="autoGrading">Enable Auto-Grading</Label>
                <Switch
                  id="autoGrading"
                  checked={enableAutoGrading}
                  onCheckedChange={setEnableAutoGrading}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="peerReview">Enable Peer Review</Label>
                <Switch
                  id="peerReview"
                  checked={enablePeerReview}
                  onCheckedChange={setEnablePeerReview}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => handleSubmit('draft')}>
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit('publish')}>
            Publish Assignment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentModal;
