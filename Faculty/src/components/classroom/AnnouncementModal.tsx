
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  MessageSquare, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link2, 
  Upload, 
  Calendar as CalendarIcon,
  Clock,
  Users,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>(['']);
  const [scheduleType, setScheduleType] = useState<'immediate' | 'scheduled'>('immediate');
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState('12:00');
  const [sendEmail, setSendEmail] = useState(true);
  const [targetAudience, setTargetAudience] = useState<'all' | 'groups' | 'individual'>('all');
  const [priority, setPriority] = useState<'normal' | 'important' | 'urgent'>('normal');
  const [category, setCategory] = useState('general');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const formatText = (type: 'bold' | 'italic' | 'underline' | 'bulletList' | 'numberedList') => {
    const textarea = document.getElementById('announcementContent') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = '';

    switch (type) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'underline':
        newText = `__${selectedText}__`;
        break;
      case 'bulletList':
        newText = `\n• ${selectedText || 'List item'}`;
        break;
      case 'numberedList':
        newText = `\n1. ${selectedText || 'List item'}`;
        break;
    }

    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);
    setContent(beforeText + newText + afterText);
  };

  const addLink = () => {
    setLinks([...links, '']);
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'important':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'urgent':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getPriorityIcon = () => {
    switch (priority) {
      case 'important':
        return <AlertTriangle className="h-4 w-4" />;
      case 'urgent':
        return <Zap className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleSubmit = (action: 'post' | 'schedule' | 'draft') => {
    const announcementData = {
      content,
      attachments,
      links: links.filter(link => link.trim() !== ''),
      scheduling: {
        type: action === 'schedule' ? 'scheduled' : 'immediate',
        scheduledDate: action === 'schedule' ? scheduledDate : null,
        scheduledTime: action === 'schedule' ? scheduledTime : null
      },
      settings: {
        sendEmail,
        targetAudience,
        selectedGroups,
        selectedStudents,
        priority,
        category
      },
      status: action === 'draft' ? 'draft' : 'published',
      createdAt: new Date()
    };

    onSubmit(announcementData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Create Announcement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Rich Text Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Announcement Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Formatting Toolbar */}
              <div className="flex gap-2 p-2 border rounded-md bg-muted/30">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('bold')}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('italic')}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('underline')}
                  title="Underline"
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('bulletList')}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('numberedList')}
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </div>

              <Textarea
                id="announcementContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share something with your class..."
                rows={8}
                className="font-mono"
              />

              {/* Preview */}
              {content && (
                <div className={cn("p-4 border rounded-lg", getPriorityColor())}>
                  <div className="flex items-center gap-2 mb-2">
                    {getPriorityIcon()}
                    <span className="font-medium text-sm uppercase tracking-wide">
                      {priority} Announcement
                    </span>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    {content.split('\n').map((line, index) => (
                      <p key={index} className="mb-2 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Attachments & Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attachments & Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Attachments */}
              <div>
                <Label htmlFor="attachments">File Attachments</Label>
                <Input
                  id="attachments"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="mt-1"
                />
                {attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Links */}
              <div>
                <div className="flex items-center justify-between">
                  <Label>External Links</Label>
                  <Button variant="outline" size="sm" onClick={addLink}>
                    <Link2 className="h-4 w-4 mr-1" />
                    Add Link
                  </Button>
                </div>
                {links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <Input
                      value={link}
                      onChange={(e) => updateLink(index, e.target.value)}
                      placeholder="https://example.com"
                    />
                    {links.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLink(index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scheduling Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Scheduling Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant={scheduleType === 'immediate' ? 'default' : 'outline'}
                  onClick={() => setScheduleType('immediate')}
                  className="flex-1"
                >
                  Post Immediately
                </Button>
                <Button
                  variant={scheduleType === 'scheduled' ? 'default' : 'outline'}
                  onClick={() => setScheduleType('scheduled')}
                  className="flex-1"
                >
                  Schedule for Later
                </Button>
              </div>

              {scheduleType === 'scheduled' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Schedule Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !scheduledDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduledDate ? format(scheduledDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduledDate}
                          onSelect={setScheduledDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="scheduleTime">Schedule Time</Label>
                    <Input
                      id="scheduleTime"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="sendEmail">Send Email Notification</Label>
                <Switch
                  id="sendEmail"
                  checked={sendEmail}
                  onCheckedChange={setSendEmail}
                />
              </div>
            </CardContent>
          </Card>

          {/* Targeting & Priority */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Targeting & Priority
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select value={targetAudience} onValueChange={(value: 'all' | 'groups' | 'individual') => setTargetAudience(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="groups">Specific Groups</SelectItem>
                      <SelectItem value="individual">Individual Students</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={priority} onValueChange={(value: 'normal' | 'important' | 'urgent') => setPriority(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="important">Important</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                  </SelectContent>
                </Select>
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
          {scheduleType === 'scheduled' ? (
            <Button onClick={() => handleSubmit('schedule')}>
              Schedule Announcement
            </Button>
          ) : (
            <Button onClick={() => handleSubmit('post')}>
              Post Now
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementModal;
