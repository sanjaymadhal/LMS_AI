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
import { useToast } from '@/hooks/use-toast';
import WorkspacePublishModal from './WorkspacePublishModal';

interface WorkspaceResourceListProps {
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
}

const WorkspaceResourceList: React.FC<WorkspaceResourceListProps> = ({ filter, searchQuery }) => {
  const { toast } = useToast();
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  const mockResources: Resource[] = [
    { id: '1', type: 'folder', name: 'Lecture Materials', modified: '2025-05-18', color: 'blue' },
    { id: '2', type: 'folder', name: 'Lab Resources', modified: '2025-05-15', color: 'green' },
    { id: '3', type: 'pdf', name: 'Course Syllabus.pdf', size: '1.3 MB', modified: '2025-05-10' },
    { id: '4', type: 'ppt', name: 'Week 1 - Introduction.pptx', size: '4.7 MB', modified: '2025-05-08' },
    { id: '5', type: 'image', name: 'Circuit Diagram.png', size: '1.2 MB', modified: '2025-05-05' },
    { id: '6', type: 'doc', name: 'Assignment 1 Instructions.docx', size: '348 KB', modified: '2025-05-04' },
    { id: '7', type: 'pdf', name: 'Research Paper - Discussion.pdf', size: '2.1 MB', modified: '2025-05-03' },
    { id: '8', type: 'video', name: 'Lab Equipment Tutorial.mp4', size: '32.6 MB', modified: '2025-05-01' },
    { id: '9', type: 'ppt', name: 'Week 2 - Advanced Concepts.pptx', size: '5.4 MB', modified: '2025-04-28' },
    { id: '10', type: 'image', name: 'Project Results Graph.jpg', size: '843 KB', modified: '2025-04-25' },
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
        return <Folder className="h-5 w-5 text-blue-500" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'ppt':
        return <Presentation className="h-5 w-5 text-orange-500" />;
      case 'image':
        return <ImageIcon className="h-5 w-5 text-green-500" />;
      case 'doc':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-purple-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
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
      <div className="rounded-md border">
        {filteredResources.length === 0 ? (
          <div className="text-center py-10">
            <File className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <h3 className="font-medium">No resources found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-xs uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3">Name</th>
                  <th scope="col" className="px-4 py-3">Type</th>
                  <th scope="col" className="px-4 py-3">Size</th>
                  <th scope="col" className="px-4 py-3">Modified</th>
                  <th scope="col" className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((resource) => (
                  <tr 
                    key={resource.id} 
                    className="bg-white border-b hover:bg-accent/30 cursor-pointer"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <td className="px-4 py-3 font-medium flex items-center gap-2">
                      {getIconForResource(resource)}
                      <span>{resource.name}</span>
                    </td>
                    <td className="px-4 py-3 capitalize">{resource.type}</td>
                    <td className="px-4 py-3">{resource.size || '--'}</td>
                    <td className="px-4 py-3">{new Date(resource.modified).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end">
                        {resource.type !== 'folder' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                              onClick={(e) => handlePresent(e, resource)}
                            >
                              <Play className="h-4 w-4" />
                              <span className="sr-only">Present</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                              onClick={(e) => handlePublishClick(resource, e)}
                            >
                              <Share className="h-4 w-4" />
                              <span className="sr-only">Publish</span>
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default WorkspaceResourceList;
