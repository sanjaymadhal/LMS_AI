
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Book, 
  FolderPlus, 
  Upload, 
  FileText, 
  Image, 
  Presentation, 
  File, 
  Grid2x2, 
  List,
  BarChart3,
  Zap
} from 'lucide-react';
import ResourceGrid from '@/components/library/ResourceGrid';
import ResourceList from '@/components/library/ResourceList';
import SynchronizationEngine from '@/components/library/SynchronizationEngine';
import PublishingStatusDashboard from '@/components/library/PublishingStatusDashboard';
import { useToast } from '@/hooks/use-toast';

const Library: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('resources');
  const { toast } = useToast();
  
  const handleUploadClick = () => {
    // In a real implementation, this would open a file picker
    toast({
      title: "Upload functionality",
      description: "This would open a file picker in a real implementation.",
    });
  };

  const handleNewFolder = () => {
    toast({
      title: "Create folder",
      description: "This would create a new folder in a real implementation.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Resource Library</h1>
          <p className="text-muted-foreground">Manage and publish your teaching resources</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="hover-scale" onClick={handleNewFolder}>
            <FolderPlus className="h-4 w-4 mr-1" />
            New Folder
          </Button>
          <Button size="sm" className="hover-scale" onClick={handleUploadClick}>
            <Upload className="h-4 w-4 mr-1" />
            Upload Files
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="publishing">Publishing Dashboard</TabsTrigger>
          <TabsTrigger value="sync">Synchronization</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row gap-3 justify-between">
                <div className="relative flex-1">
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
                    variant={view === 'grid' ? 'default' : 'outline'} 
                    size="icon" 
                    className="h-9 w-9"
                    onClick={() => setView('grid')}
                  >
                    <Grid2x2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={view === 'list' ? 'default' : 'outline'} 
                    size="icon" 
                    className="h-9 w-9"
                    onClick={() => setView('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="all" className="flex gap-1">
                    <Book className="h-4 w-4" />
                    <span>All</span>
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex gap-1">
                    <FileText className="h-4 w-4" />
                    <span>Documents</span>
                  </TabsTrigger>
                  <TabsTrigger value="presentations" className="flex gap-1">
                    <Presentation className="h-4 w-4" />
                    <span>Presentations</span>
                  </TabsTrigger>
                  <TabsTrigger value="images" className="flex gap-1">
                    <Image className="h-4 w-4" />
                    <span>Images</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-6">
                  <TabsContent value="all" className="m-0">
                    {view === 'grid' ? <ResourceGrid filter="all" searchQuery={searchQuery} /> : <ResourceList filter="all" searchQuery={searchQuery} />}
                  </TabsContent>
                  <TabsContent value="documents" className="m-0">
                    {view === 'grid' ? <ResourceGrid filter="documents" searchQuery={searchQuery} /> : <ResourceList filter="documents" searchQuery={searchQuery} />}
                  </TabsContent>
                  <TabsContent value="presentations" className="m-0">
                    {view === 'grid' ? <ResourceGrid filter="presentations" searchQuery={searchQuery} /> : <ResourceList filter="presentations" searchQuery={searchQuery} />}
                  </TabsContent>
                  <TabsContent value="images" className="m-0">
                    {view === 'grid' ? <ResourceGrid filter="images" searchQuery={searchQuery} /> : <ResourceList filter="images" searchQuery={searchQuery} />}
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publishing" className="mt-6">
          <PublishingStatusDashboard />
        </TabsContent>

        <TabsContent value="sync" className="mt-6">
          <div className="space-y-6">
            <SynchronizationEngine isActive={true} />
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    Live Classroom Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Display Screens</span>
                      <span className="text-sm font-medium text-green-600">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Interactive Whiteboards</span>
                      <span className="text-sm font-medium text-green-600">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Student Devices</span>
                      <span className="text-sm font-medium text-green-600">47/50 Online</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Notification System</span>
                      <span className="text-sm font-medium text-green-600">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    Virtual Classroom Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">LMS Platform</span>
                      <span className="text-sm font-medium text-green-600">Synced</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Video Conferencing</span>
                      <span className="text-sm font-medium text-green-600">Integrated</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Document Repository</span>
                      <span className="text-sm font-medium text-green-600">Updated</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Push Notifications</span>
                      <span className="text-sm font-medium text-green-600">Enabled</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;
