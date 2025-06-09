
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Share, 
  Users, 
  Clock, 
  Monitor,
  Video,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Class {
  id: string;
  name: string;
  code: string;
  studentCount: number;
  isActive: boolean;
}

interface WorkspacePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceName: string;
  resourceType: string;
  resourceId: string;
}

const WorkspacePublishModal: React.FC<WorkspacePublishModalProps> = ({
  isOpen,
  onClose,
  resourceName,
  resourceType,
  resourceId
}) => {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [publishMode, setPublishMode] = useState({
    liveClassroom: true,
    virtualClassroom: true
  });
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

    if (!publishMode.liveClassroom && !publishMode.virtualClassroom) {
      toast({
        title: "No publish mode selected",
        description: "Please select at least one publish mode.",
        variant: "destructive"
      });
      return;
    }

    setIsPublishing(true);
    
    try {
      // Simulate publishing process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const modes = [];
      if (publishMode.liveClassroom) modes.push("Live Classroom");
      if (publishMode.virtualClassroom) modes.push("Virtual Classroom");
      
      toast({
        title: "Resource Published Successfully!",
        description: `${resourceName} has been published to ${selectedClasses.length} class(es) for ${modes.join(" and ")}.`,
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
            Publish to Classes
          </DialogTitle>
          <DialogDescription>
            Publish "{resourceName}" to selected classes for presentation and student access.
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
            </div>
          </div>

          {/* Publish Mode Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Publishing Options</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Switch
                  checked={publishMode.liveClassroom}
                  onCheckedChange={(checked) => 
                    setPublishMode(prev => ({ ...prev, liveClassroom: checked }))
                  }
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-500" />
                    <Label className="font-medium">Live Classroom</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Available for in-class presentations
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Switch
                  checked={publishMode.virtualClassroom}
                  onCheckedChange={(checked) => 
                    setPublishMode(prev => ({ ...prev, virtualClassroom: checked }))
                  }
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-green-500" />
                    <Label className="font-medium">Virtual Classroom</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Available for student access online
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

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
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Publish to {selectedClasses.length} Class{selectedClasses.length !== 1 ? 'es' : ''}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspacePublishModal;
