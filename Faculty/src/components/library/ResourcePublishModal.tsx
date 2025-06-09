
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Eye, Users, Clock, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Class {
  id: string;
  name: string;
  code: string;
  studentCount: number;
  isActive: boolean;
}

interface ResourcePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceName: string;
  resourceType: string;
  resourceId: string;
}

const ResourcePublishModal: React.FC<ResourcePublishModalProps> = ({
  isOpen,
  onClose,
  resourceName,
  resourceType,
  resourceId
}) => {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [permissions, setPermissions] = useState({
    viewOnly: true,
    interactive: false,
    timeRestricted: false,
    groupRestricted: false
  });
  const [scheduledPublish, setScheduledPublish] = useState(false);
  const [publishDate, setPublishDate] = useState<Date>();
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();

  // Mock class data
  const availableClasses: Class[] = [
    { id: '1', name: 'CS101: Intro to Programming', code: 'cs101', studentCount: 25, isActive: true },
    { id: '2', name: 'MATH202: Advanced Calculus', code: 'math202', studentCount: 18, isActive: true },
    { id: '3', name: 'PHYS101: Introduction to Physics', code: 'phys101', studentCount: 22, isActive: false },
    { id: '4', name: 'CHEM105: Organic Chemistry', code: 'chem105', studentCount: 15, isActive: true },
  ];

  const handleClassToggle = (classId: string) => {
    setSelectedClasses(prev => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const handlePublish = async () => {
    if (selectedClasses.length === 0) {
      toast({
        title: "No classes selected",
        description: "Please select at least one class to publish to.",
        variant: "destructive"
      });
      return;
    }

    setIsPublishing(true);
    
    // Simulate publishing process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Resource Published Successfully!",
        description: `${resourceName} has been published to ${selectedClasses.length} class(es).`,
      });
      
      onClose();
      setSelectedClasses([]);
    } catch (error) {
      toast({
        title: "Publishing Failed",
        description: "There was an error publishing the resource. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const selectedClassesData = availableClasses.filter(cls => selectedClasses.includes(cls.id));
  const totalStudents = selectedClassesData.reduce((sum, cls) => sum + cls.studentCount, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Publish Resource
          </DialogTitle>
          <DialogDescription>
            Publish "{resourceName}" to selected classes. Resources will be synchronized in real-time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resource Info */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{resourceName}</h4>
                <p className="text-sm text-muted-foreground">Type: {resourceType}</p>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
          </div>

          {/* Class Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Select Target Classes</Label>
              <Badge variant="secondary">
                {selectedClasses.length} classes, {totalStudents} students
              </Badge>
            </div>
            
            <ScrollArea className="h-48 border rounded-md p-4">
              <div className="space-y-3">
                {availableClasses.map((classItem) => (
                  <div key={classItem.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={classItem.id}
                      checked={selectedClasses.includes(classItem.id)}
                      onCheckedChange={() => handleClassToggle(classItem.id)}
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor={classItem.id} 
                        className="cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="font-medium">{classItem.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({classItem.code})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={classItem.isActive ? "default" : "secondary"}>
                            {classItem.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            <Users className="h-3 w-3 inline mr-1" />
                            {classItem.studentCount}
                          </span>
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          {/* Permissions & Settings */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Access Permissions</Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={permissions.viewOnly}
                  onCheckedChange={(checked) => 
                    setPermissions(prev => ({ ...prev, viewOnly: checked }))
                  }
                />
                <Label className="text-sm">View Only</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={permissions.interactive}
                  onCheckedChange={(checked) => 
                    setPermissions(prev => ({ ...prev, interactive: checked }))
                  }
                />
                <Label className="text-sm">Interactive Mode</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={permissions.timeRestricted}
                  onCheckedChange={(checked) => 
                    setPermissions(prev => ({ ...prev, timeRestricted: checked }))
                  }
                />
                <Label className="text-sm">Time Restricted</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={permissions.groupRestricted}
                  onCheckedChange={(checked) => 
                    setPermissions(prev => ({ ...prev, groupRestricted: checked }))
                  }
                />
                <Label className="text-sm">Group Restricted</Label>
              </div>
            </div>
          </div>

          {/* Scheduled Publishing */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch
                checked={scheduledPublish}
                onCheckedChange={setScheduledPublish}
              />
              <Label>Schedule for later</Label>
            </div>
            
            {scheduledPublish && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {publishDate ? publishDate.toLocaleDateString() : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={publishDate}
                    onSelect={setPublishDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handlePublish} 
            disabled={isPublishing || selectedClasses.length === 0}
          >
            {isPublishing ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : (
              `Publish to ${selectedClasses.length} Class${selectedClasses.length !== 1 ? 'es' : ''}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourcePublishModal;
