
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Folder,
  Plus,
  FileText,
  Presentation,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HierarchicalResourceView from '@/components/workspace/HierarchicalResourceView';
import { useNavigate, useLocation } from 'react-router-dom';
import AISummarizer from '@/components/ai-tools/AISummarizer';
import PPTGenerator from '@/components/ai-tools/PPTGenerator';

const Workspace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSemester, setCurrentSemester] = useState<string>('');
  const [resourceFilter, setResourceFilter] = useState<'all' | 'documents' | 'presentations' | 'images'>('all');
  const [activeTab, setActiveTab] = useState<string>('resources');
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get state passed from navigation, if any
  useEffect(() => {
    if (location.state) {
      if (location.state.activeTab) {
        setActiveTab(location.state.activeTab);
      }
    }
  }, [location]);
  
  // Get the current selected semester from sessionStorage
  useEffect(() => {
    const semester = sessionStorage.getItem('currentSemester');
    if (semester) {
      setCurrentSemester(semester);
    } else {
      navigate('/select-semester');
    }
  }, [navigate]);

  const handleNewFolder = () => {
    toast({
      title: "Create folder",
      description: "This would create a new resource folder in a real implementation.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workspace</h1>
          <p className="text-muted-foreground">Manage your teaching materials and resources</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="hover-scale" onClick={handleNewFolder}>
            <Plus className="h-4 w-4 mr-1" />
            New Resource
          </Button>
          <Button 
            size="sm" 
            className="hover-scale" 
            onClick={() => setActiveTab('ai-tools')}
          >
            <Sparkles className="h-4 w-4 mr-1" />
            AI Tools
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full md:w-[300px]">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="mt-6 animate-fade-in">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
                <CardTitle>Resources - {getSemesterName(currentSemester)}</CardTitle>
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={resourceFilter === 'all' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setResourceFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant={resourceFilter === 'documents' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setResourceFilter('documents')}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Docs
                  </Button>
                  <Button 
                    variant={resourceFilter === 'presentations' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setResourceFilter('presentations')}
                  >
                    <Presentation className="h-4 w-4 mr-1" />
                    Slides
                  </Button>
                  <Button 
                    variant={resourceFilter === 'images' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setResourceFilter('images')}
                  >
                    <ImageIcon className="h-4 w-4 mr-1" />
                    Images
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <HierarchicalResourceView 
                semester={currentSemester} 
                searchQuery={searchQuery} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-tools" className="mt-6 animate-fade-in">
          <Tabs defaultValue="summarizer" className="w-full">
            <TabsList className="grid grid-cols-2 w-full md:w-[300px]">
              <TabsTrigger value="summarizer">AI Summarizer</TabsTrigger>
              <TabsTrigger value="ppt">PPT Generator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summarizer" className="mt-6 animate-fade-in">
              <AISummarizer />
            </TabsContent>
            
            <TabsContent value="ppt" className="mt-6 animate-fade-in">
              <PPTGenerator />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to get semester name
const getSemesterName = (semesterId: string): string => {
  switch (semesterId) {
    case "1": return "1st Semester";
    case "2": return "2nd Semester";
    case "3": return "3rd Semester";
    case "4": return "4th Semester";
    case "5": return "5th Semester";
    case "6": return "6th Semester";
    case "7": return "7th Semester";
    case "8": return "8th Semester";
    default: return "Select Semester";
  }
};

export default Workspace;
