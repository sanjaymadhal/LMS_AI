import React, { useState } from 'react';
import { 
  FileText, 
  Presentation, 
  Image as ImageIcon, 
  Video, 
  File, 
  MoreVertical,
  Folder,
  Play,
  Share
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import WorkspacePublishModal from './WorkspacePublishModal';

interface WorkspaceResourceGridProps {
  filter: 'all' | 'documents' | 'presentations' | 'images';
  searchQuery: string;
}

interface Resource {
  id: string;
  type: 'folder' | 'pdf' | 'ppt' | 'image' | 'doc' | 'video';
  name: string;
  size?: string;
  modified: string;
  color?: string;
  thumbnail?: string;
}

const WorkspaceResourceGrid: React.FC<WorkspaceResourceGridProps> = ({ filter, searchQuery }) => {
  const { toast } = useToast();
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  const mockResources: Resource[] = [
    { id: '1', type: 'folder', name: 'Lecture Materials', modified: '2025-05-18', color: 'blue' },
    { id: '2', type: 'folder', name: 'Lab Resources', modified: '2025-05-15', color: 'green' },
    { id: '3', type: 'pdf', name: 'Course Syllabus.pdf', size: '1.3 MB', modified: '2025-05-10' },
    { id: '4', type: 'ppt', name: 'Week 1 - Introduction.pptx', size: '4.7 MB', modified: '2025-05-08' },
    { id: '5', type: 'image', name: 'Circuit Diagram.png', size: '1.2 MB', modified: '2025-05-05', thumbnail: 'https://www.electronicshub.org/wp-content/uploads/2015/05/Simple-Circuit-Diagram.jpg' },
    { id: '6', type: 'doc', name: 'Assignment 1 Instructions.docx', size: '348 KB', modified: '2025-05-04' },
    { id: '7', type: 'pdf', name: 'Research Paper - Discussion.pdf', size: '2.1 MB', modified: '2025-05-03' },
    { id: '8', type: 'video', name: 'Lab Equipment Tutorial.mp4', size: '32.6 MB', modified: '2025-05-01' },
    { id: '9', type: 'ppt', name: 'Week 2 - Advanced Concepts.pptx', size: '5.4 MB', modified: '2025-04-28' },
    { id: '10', type: 'image', name: 'Project Results Graph.jpg', size: '843 KB', modified: '2025-04-25', thumbnail: 'https://miro.medium.com/v2/resize:fit:1200/1*D2lAb_rDR3U6Xuxtzr51eQ.png' },
    { id: '11', type: 'pdf', name: 'Study Guide.pdf', size: '1.2 MB', modified: '2025-04-22' },
    { id: '12', type: 'doc', name: 'Class Notes.docx', size: '567 KB', modified: '2025-04-20' },
  ];
  
  // Filter resources based on filter type and search query
  const filteredResources = mockResources.filter(resource => {
    // Filter by type
    if (filter === 'documents' && !['pdf', 'doc'].includes(resource.type)) return false;
    if (filter === 'presentations' && resource.type !== 'ppt') return false;
    if (filter === 'images' && resource.type !== 'image') return false;
    
    // Filter by search query
    if (searchQuery && !resource.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  const getIconForResource = (resource: Resource) => {
    switch (resource.type) {
      case 'folder':
        return <Folder className="h-10 w-10 text-blue-500" />;
      case 'pdf':
        return <FileText className="h-10 w-10 text-red-500" />;
      case 'ppt':
        return <Presentation className="h-10 w-10 text-orange-500" />;
      case 'image':
        return resource.thumbnail ? (
          <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex items-center justify-center">
            <img src={resource.thumbnail} alt={resource.name} className="h-full w-full object-cover" />
          </div>
        ) : <ImageIcon className="h-10 w-10 text-green-500" />;
      case 'doc':
        return <FileText className="h-10 w-10 text-blue-500" />;
      case 'video':
        return <Video className="h-10 w-10 text-purple-500" />;
      default:
        return <File className="h-10 w-10 text-gray-500" />;
    }
  };

  const handleResourceClick = (resource: Resource) => {
    if (resource.type === 'folder') {
      toast({
        title: "Opening folder",
        description: `Opening ${resource.name}...`,
      });
    } else {
      toast({
        title: "Opening file",
        description: `Opening ${resource.name}...`,
      });
    }
  };
  
  const handlePresent = (e: React.MouseEvent, resource: Resource) => {
    e.stopPropagation();
    toast({
      title: "Presenting resource",
      description: `Presenting ${resource.name} in classroom mode...`,
    });
  };

  const handlePublishClick = (resource: Resource, event: React.MouseEvent) => {
    event.stopPropagation();
    if (resource.type !== 'folder') {
      setSelectedResource(resource);
      setPublishModalOpen(true);
    } else {
      toast({
        title: "Cannot publish folder",
        description: "Please select individual files to publish.",
        variant: "destructive"
      });
    }
  };

  const getResourceTypeDisplay = (type: string) => {
    switch (type) {
      case 'pdf': return 'PDF Document';
      case 'ppt': return 'Presentation';
      case 'doc': return 'Document';
      case 'image': return 'Image';
      case 'video': return 'Video';
      default: return 'File';
    }
  };
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <File className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <h3 className="font-medium">No resources found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <div 
              key={resource.id} 
              className="group border rounded-lg p-3 hover:bg-accent hover:border-accent transition-colors cursor-pointer"
              onClick={() => handleResourceClick(resource)}
            >
              <div className="flex justify-between items-start mb-2">
                {getIconForResource(resource)}
                <div className="flex">
                  {resource.type !== 'folder' && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity mr-1"
                      onClick={(e) => handlePresent(e, resource)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {resource.type !== 'folder' && (
                        <>
                          <DropdownMenuItem onClick={(e) => handlePresent(e, resource)}>Present</DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handlePublishClick(resource, e)}>
                            <Share className="h-4 w-4 mr-2" />
                            Publish to Classes
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="space-y-1 mt-2">
                <p className="font-medium text-sm truncate">{resource.name}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{resource.size || '--'}</span>
                  <span>{new Date(resource.modified).toLocaleDateString()}</span>
                </div>
              </div>
              
              {/* Quick publish button for non-folders */}
              {resource.type !== 'folder' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handlePublishClick(resource, e)}
                >
                  <Share className="h-3 w-3 mr-1" />
                  Publish
                </Button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Publish Modal */}
      {selectedResource && (
        <WorkspacePublishModal
          isOpen={publishModalOpen}
          onClose={() => {
            setPublishModalOpen(false);
            setSelectedResource(null);
          }}
          resourceName={selectedResource.name}
          resourceType={getResourceTypeDisplay(selectedResource.type)}
          resourceId={selectedResource.id}
        />
      )}
    </>
  );
};

export default WorkspaceResourceGrid;
