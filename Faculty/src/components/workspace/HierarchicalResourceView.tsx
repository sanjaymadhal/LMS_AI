
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Presentation, 
  Image as ImageIcon, 
  Video, 
  File, 
  Folder,
  Sparkles,
  FileQuestion,
  Edit,
  Share
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Subject, getSubject, getSubjectsByParams } from '@/data/subjectsData';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WorkspacePublishModal from './WorkspacePublishModal';

interface HierarchicalResourceViewProps {
  semester: string;
  searchQuery: string;
}

const HierarchicalResourceView: React.FC<HierarchicalResourceViewProps> = ({ semester, searchQuery }) => {
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<{ name: string; type: string; level: string } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get filtered subjects based on search query
  const subjects = getSubjectsByParams({ semester, search: searchQuery });
  
  const toggleSubject = (subjectId: string) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };
  
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };
  
  const handleAITools = (name: string, level: 'subject' | 'module' | 'chapter') => {
    navigate('/workspace', { 
      state: { 
        activeTab: 'ai-tools',
        context: name,
        level: level
      }
    });
  };
  
  const handlePPTEditor = (name: string) => {
    toast({
      title: "Opening PPT Editor",
      description: `Editing presentations for ${name}`,
    });
  };
  
  const handleGenerateQuestions = (name: string, level: 'subject' | 'module' | 'chapter') => {
    navigate('/ai-tools', { 
      state: { 
        activeTab: 'question-bank',
        context: name,
        level: level
      }
    });
  };

  const handlePublish = (name: string, level: 'subject' | 'module' | 'chapter') => {
    const resourceType = level === 'subject' ? 'Subject' : level === 'module' ? 'Module' : 'Chapter';
    setSelectedResource({
      name,
      type: resourceType,
      level
    });
    setPublishModalOpen(true);
  };
  
  const renderResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'ppt':
        return <Presentation className="h-4 w-4 text-orange-500" />;
      case 'image':
        return <ImageIcon className="h-4 w-4 text-green-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-purple-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };
  
  if (subjects.length === 0) {
    return (
      <div className="text-center py-10">
        <Folder className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
        <h3 className="font-medium">No subjects found</h3>
        <p className="text-sm text-muted-foreground">Try adjusting your search</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="space-y-2">
        {subjects.map((subject) => (
          <div key={subject.id} className="border rounded-md overflow-hidden">
            <div 
              className={`flex items-center justify-between p-3 cursor-pointer hover:bg-accent ${expandedSubjects[subject.id] ? 'bg-accent/50' : ''}`}
              onClick={() => toggleSubject(subject.id)}
            >
              <div className="flex items-center gap-2">
                {expandedSubjects[subject.id] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
                <Folder className="h-5 w-5" style={{ color: subject.color || '#4f46e5' }} />
                <span className="font-medium">{subject.name}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                  {subject.code}
                </span>
              </div>
              
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAITools(subject.name, 'subject');
                        }}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>AI Tools</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePPTEditor(subject.name);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>PPT Editor</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGenerateQuestions(subject.name, 'subject');
                        }}
                      >
                        <FileQuestion className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Generate Questions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePublish(subject.name, 'subject');
                        }}
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Publish to Classes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            {expandedSubjects[subject.id] && (
              <div className="pl-6 pb-2">
                {subject.modules.map((module) => (
                  <div key={module.id} className="mt-1">
                    <div 
                      className={`flex items-center justify-between p-2 cursor-pointer hover:bg-accent/30 rounded-md mx-2 ${expandedModules[module.id] ? 'bg-accent/20' : ''}`}
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex items-center gap-2">
                        {expandedModules[module.id] ? 
                          <ChevronDown className="h-3 w-3" /> : 
                          <ChevronRight className="h-3 w-3" />
                        }
                        <span className="text-sm font-medium">{module.name}</span>
                      </div>
                      
                      <div className="flex gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAITools(module.name, 'module');
                                }}
                              >
                                <Sparkles className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>AI Tools</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePPTEditor(module.name);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>PPT Editor</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleGenerateQuestions(module.name, 'module');
                                }}
                              >
                                <FileQuestion className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Generate Questions</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePublish(module.name, 'module');
                                }}
                              >
                                <Share className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Publish to Classes</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    
                    {expandedModules[module.id] && (
                      <div className="pl-5">
                        {module.chapters.map((chapter) => (
                          <div key={chapter.id} className="mt-1">
                            <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-accent/20 rounded-md mx-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">{chapter.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({chapter.presentations.length} presentations)
                                </span>
                              </div>
                              
                              <div className="flex gap-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6" 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAITools(chapter.name, 'chapter');
                                        }}
                                      >
                                        <Sparkles className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>AI Tools</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6" 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handlePPTEditor(chapter.name);
                                        }}
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>PPT Editor</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6" 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleGenerateQuestions(chapter.name, 'chapter');
                                        }}
                                      >
                                        <FileQuestion className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Generate Questions</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6" 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handlePublish(chapter.name, 'chapter');
                                        }}
                                      >
                                        <Share className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Publish to Classes</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            
                            <div className="pl-5 py-1">
                              {chapter.presentations.map((presentation) => (
                                <div 
                                  key={presentation.id} 
                                  className="flex items-center gap-2 p-1 hover:bg-accent/10 rounded-md mx-2 cursor-pointer"
                                  onClick={() => toast({
                                    title: "Opening presentation",
                                    description: `Opening ${presentation.name}`,
                                  })}
                                >
                                  <Presentation className="h-3 w-3 text-orange-500" />
                                  <span className="text-xs">{presentation.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
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
          resourceType={selectedResource.type}
          resourceId={selectedResource.level}
        />
      )}
    </>
  );
};

export default HierarchicalResourceView;
