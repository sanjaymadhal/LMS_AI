
import React from 'react';
import { 
  FileText, 
  Presentation, 
  Image as ImageIcon, 
  Video, 
  File, 
  MoreVertical,
  Folder,
  Download,
  Pencil,
  Share2,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface ResourceListProps {
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

const ResourceList: React.FC<ResourceListProps> = ({ filter, searchQuery }) => {
  const { toast } = useToast();
  
  const mockResources: Resource[] = [
    { id: '1', type: 'folder', name: 'Physics Materials', modified: '2025-05-18', color: 'blue' },
    { id: '2', type: 'folder', name: 'Chemistry Resources', modified: '2025-05-15', color: 'green' },
    { id: '3', type: 'pdf', name: 'Quantum Mechanics.pdf', size: '2.3 MB', modified: '2025-05-10' },
    { id: '4', type: 'ppt', name: 'Introduction to Atoms.pptx', size: '4.7 MB', modified: '2025-05-08' },
    { id: '5', type: 'image', name: 'Periodic Table.png', size: '1.2 MB', modified: '2025-05-05', thumbnail: 'https://sciencenotes.org/wp-content/uploads/2023/06/Periodic-Table-2023-Color-1024x538.png' },
    { id: '6', type: 'doc', name: 'Lesson Plan - Week 3.docx', size: '348 KB', modified: '2025-05-04' },
    { id: '7', type: 'pdf', name: 'Student Worksheet.pdf', size: '1.1 MB', modified: '2025-05-03' },
    { id: '8', type: 'video', name: 'Lab Demo.mp4', size: '32.6 MB', modified: '2025-05-01' },
    { id: '9', type: 'ppt', name: 'Organic Chemistry Basics.pptx', size: '5.4 MB', modified: '2025-04-28' },
    { id: '10', type: 'image', name: 'Lab Setup Diagram.jpg', size: '843 KB', modified: '2025-04-25', thumbnail: 'https://www.researchgate.net/profile/Konstantinos-Labrou/publication/269256493/figure/fig3/AS:392181589405702@1470514056210/Typical-configuration-of-the-apparatus-used-in-the-experiments.png' },
    { id: '11', type: 'pdf', name: 'Research Paper - Polymers.pdf', size: '3.2 MB', modified: '2025-04-22' },
    { id: '12', type: 'doc', name: 'Final Exam Questions.docx', size: '567 KB', modified: '2025-04-20' },
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
  
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="w-10 p-2 px-4">
              <Checkbox />
            </th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2 hidden sm:table-cell">Type</th>
            <th className="text-left p-2 hidden md:table-cell">Size</th>
            <th className="text-left p-2">Modified</th>
            <th className="w-10 p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-8">
                <File className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="font-medium">No resources found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </td>
            </tr>
          ) : (
            filteredResources.map((resource) => (
              <tr 
                key={resource.id} 
                className="group border-t hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleResourceClick(resource)}
              >
                <td className="p-2 px-4">
                  <Checkbox onClick={(e) => e.stopPropagation()} />
                </td>
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    {getIconForResource(resource)}
                    <span className="font-medium">{resource.name}</span>
                  </div>
                </td>
                <td className="p-2 text-muted-foreground hidden sm:table-cell capitalize">
                  {resource.type}
                </td>
                <td className="p-2 text-muted-foreground hidden md:table-cell">
                  {resource.size || '--'}
                </td>
                <td className="p-2 text-muted-foreground">
                  {new Date(resource.modified).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" /> Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" /> Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" /> Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceList;
