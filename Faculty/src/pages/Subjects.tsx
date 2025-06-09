
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Folder,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { getSemesterSubjects, Subject } from '@/data/subjectsData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Subjects: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSemester, setCurrentSemester] = useState<string>('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [newSubject, setNewSubject] = useState({
    code: '',
    name: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get the current selected semester from sessionStorage
  useEffect(() => {
    const semester = sessionStorage.getItem('currentSemester');
    if (semester) {
      setCurrentSemester(semester);
      const semesterSubjects = getSemesterSubjects(semester);
      setSubjects(semesterSubjects);
    } else {
      navigate('/select-semester');
    }
  }, [navigate]);

  // Filter subjects based on search query
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewSubject = () => {
    setIsAddDialogOpen(true);
  };
  
  const handleEditSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setNewSubject({
      code: subject.code,
      name: subject.name
    });
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subjects/${subjectId}`);
  };
  
  const handleAddSubject = () => {
    toast({
      title: "Subject added",
      description: `Subject ${newSubject.code}: ${newSubject.name} has been added.`,
    });
    setIsAddDialogOpen(false);
    setNewSubject({ code: '', name: '' });
  };
  
  const handleEditConfirm = () => {
    if (!selectedSubject) return;
    toast({
      title: "Subject updated",
      description: `Subject ${newSubject.code}: ${newSubject.name} has been updated.`,
    });
    setIsEditDialogOpen(false);
    setSelectedSubject(null);
  };
  
  const handleDeleteConfirm = () => {
    if (!selectedSubject) return;
    toast({
      title: "Subject deleted",
      description: `Subject ${selectedSubject.code}: ${selectedSubject.name} has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
    setSelectedSubject(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Subjects</h1>
          <p className="text-muted-foreground">Manage your teaching subjects and materials</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="hover-scale" onClick={handleNewSubject}>
            <Plus className="h-4 w-4 mr-1" />
            New Subject
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
            <CardTitle>Subjects - {getSemesterName(currentSemester)}</CardTitle>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
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
                <div className="grid grid-cols-2 gap-1 h-4 w-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </Button>
              <Button 
                variant={view === 'list' ? 'default' : 'outline'} 
                size="icon" 
                className="h-9 w-9"
                onClick={() => setView('list')}
              >
                <div className="flex flex-col gap-1 h-4 w-4 justify-between">
                  <div className="h-[2px] w-full bg-current rounded-full"></div>
                  <div className="h-[2px] w-full bg-current rounded-full"></div>
                  <div className="h-[2px] w-full bg-current rounded-full"></div>
                </div>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Subjects</TabsTrigger>
              <TabsTrigger value="recent">Recently Modified</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {view === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredSubjects.length === 0 ? (
                    <div className="col-span-full text-center py-10">
                      <Folder className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="font-medium">No subjects found</h3>
                      <p className="text-sm text-muted-foreground">Try adjusting your search</p>
                    </div>
                  ) : (
                    filteredSubjects.map((subject) => (
                      <div 
                        key={subject.id} 
                        className="group border rounded-lg p-4 hover:bg-accent hover:border-accent transition-colors cursor-pointer relative"
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 bg-background/80 hover:bg-background"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditSubject(subject);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 bg-background/80 hover:bg-background text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSubject(subject);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div 
                          className="flex items-center gap-3 mb-3"
                          onClick={() => handleSubjectClick(subject.id)}
                        >
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <BookOpen className="h-8 w-8 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">{subject.code}</h3>
                            <p className="text-sm text-muted-foreground">{subject.name}</p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <p>{subject.modules.length} modules • {subject.totalChapters} chapters</p>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/subjects/${subject.id}/question-bank`);
                            }}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Generate Questions
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="rounded-md border">
                  {filteredSubjects.length === 0 ? (
                    <div className="text-center py-10">
                      <Folder className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="font-medium">No subjects found</h3>
                      <p className="text-sm text-muted-foreground">Try adjusting your search</p>
                    </div>
                  ) : (
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-xs uppercase">
                          <tr>
                            <th scope="col" className="px-4 py-3">Code</th>
                            <th scope="col" className="px-4 py-3">Subject Name</th>
                            <th scope="col" className="px-4 py-3">Modules</th>
                            <th scope="col" className="px-4 py-3">Chapters</th>
                            <th scope="col" className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSubjects.map((subject) => (
                            <tr 
                              key={subject.id} 
                              className="bg-white border-b hover:bg-accent/30"
                            >
                              <td 
                                className="px-4 py-3 font-medium flex items-center gap-2 cursor-pointer"
                                onClick={() => handleSubjectClick(subject.id)}
                              >
                                <BookOpen className="h-5 w-5 text-blue-500" />
                                <span>{subject.code}</span>
                              </td>
                              <td 
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSubjectClick(subject.id)}
                              >
                                {subject.name}
                              </td>
                              <td className="px-4 py-3">{subject.modules.length}</td>
                              <td className="px-4 py-3">{subject.totalChapters}</td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/subjects/${subject.id}/question-bank`);
                                    }}
                                  >
                                    <FileText className="h-4 w-4 mr-1" />
                                    Questions
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditSubject(subject);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-destructive hover:text-destructive"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteSubject(subject);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="flex items-center justify-center py-16">
                <p className="text-muted-foreground">Recently modified subjects will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="archived">
              <div className="flex items-center justify-center py-16">
                <p className="text-muted-foreground">Archived subjects will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Add Subject Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>
              Create a new subject for {getSemesterName(currentSemester)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject-code">Subject Code</Label>
              <Input 
                id="subject-code" 
                placeholder="e.g., 18CS51" 
                value={newSubject.code}
                onChange={(e) => setNewSubject({...newSubject, code: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject-name">Subject Name</Label>
              <Input 
                id="subject-name" 
                placeholder="e.g., Database Management Systems" 
                value={newSubject.name}
                onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddSubject} disabled={!newSubject.code || !newSubject.name}>
              Add Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Subject Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>
              Update subject details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-subject-code">Subject Code</Label>
              <Input 
                id="edit-subject-code" 
                value={newSubject.code}
                onChange={(e) => setNewSubject({...newSubject, code: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subject-name">Subject Name</Label>
              <Input 
                id="edit-subject-name" 
                value={newSubject.name}
                onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditConfirm} disabled={!newSubject.code || !newSubject.name}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Subject Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Subject</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this subject? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedSubject && (
              <div className="bg-muted p-4 rounded-md">
                <p><strong>Code:</strong> {selectedSubject.code}</p>
                <p><strong>Name:</strong> {selectedSubject.name}</p>
                <p><strong>Modules:</strong> {selectedSubject.modules.length}</p>
                <p><strong>Chapters:</strong> {selectedSubject.totalChapters}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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

export default Subjects;
