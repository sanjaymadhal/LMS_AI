
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, PlusCircle, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface AssignmentFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({ 
  onSubmit,
  initialData
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [dueDate, setDueDate] = useState<Date | undefined>(initialData?.dueDate);
  const [maxPoints, setMaxPoints] = useState(initialData?.maxPoints || 100);
  const [attachments, setAttachments] = useState<string[]>(initialData?.attachments || []);
  const [status, setStatus] = useState<'draft' | 'active'>(initialData?.status || 'draft');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !subject || !dueDate) {
      return; // Show validation errors in a real app
    }
    
    // Submit form data
    onSubmit({
      title,
      description,
      subject,
      dueDate,
      maxPoints,
      attachments,
      status
    });
  };
  
  const handleAddAttachment = () => {
    setAttachments([...attachments, '']);
  };
  
  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };
  
  const handleAttachmentChange = (index: number, value: string) => {
    const newAttachments = [...attachments];
    newAttachments[index] = value;
    setAttachments(newAttachments);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Assignment Title</Label>
          <Input 
            id="title"
            placeholder="Enter assignment title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Database Management">Database Management</SelectItem>
                <SelectItem value="Programming Fundamentals">Programming Fundamentals</SelectItem>
                <SelectItem value="Data Structures">Data Structures</SelectItem>
                <SelectItem value="Web Technologies">Web Technologies</SelectItem>
                <SelectItem value="Computer Networks">Computer Networks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
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
                  {dueDate ? format(dueDate, "PPP") : <span>Select due date</span>}
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
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter assignment description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxPoints">Maximum Points</Label>
            <Input 
              id="maxPoints"
              type="number" 
              placeholder="100"
              value={maxPoints}
              onChange={(e) => setMaxPoints(Number(e.target.value))}
              min={1}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: 'draft' | 'active') => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Save as Draft</SelectItem>
                <SelectItem value="active">Publish Now</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Attachments & Resources</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddAttachment}
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Attachment
            </Button>
          </div>
          
          {attachments.map((attachment, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input 
                placeholder="Add file URL or resource link"
                value={attachment}
                onChange={(e) => handleAttachmentChange(index, e.target.value)}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => handleRemoveAttachment(index)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit">
          {initialData ? 'Update Assignment' : 'Create Assignment'}
        </Button>
      </div>
    </form>
  );
};

export default AssignmentForm;
