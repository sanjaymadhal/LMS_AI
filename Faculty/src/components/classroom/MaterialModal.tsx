
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
import { Upload, Link2, FileText, Image, Video, File, X, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const MaterialModal: React.FC<MaterialModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'link'>('file');
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [weekModule, setWeekModule] = useState('');
  const [availableToAll, setAvailableToAll] = useState(true);
  const [restrictByDate, setRestrictByDate] = useState(false);
  const [availableDate, setAvailableDate] = useState<Date>();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...uploadedFiles]);
    
    // Auto-suggest title based on first file name
    if (uploadedFiles.length > 0 && !title) {
      const fileName = uploadedFiles[0].name;
      const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
      setTitle(nameWithoutExt);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
    
    if (droppedFiles.length > 0 && !title) {
      const fileName = droppedFiles[0].name;
      const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
      setTitle(nameWithoutExt);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="h-5 w-5 text-green-500" />;
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'mp3':
      case 'wav':
        return <Video className="h-5 w-5 text-purple-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = () => {
    const materialData = {
      uploadMethod,
      files: uploadMethod === 'file' ? files : [],
      url: uploadMethod === 'link' ? url : '',
      title,
      description,
      category,
      weekModule,
      visibility: {
        availableToAll,
        restrictByDate,
        availableDate
      },
      uploadDate: new Date()
    };
    
    onSubmit(materialData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Create Material
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  variant={uploadMethod === 'file' ? 'default' : 'outline'}
                  onClick={() => setUploadMethod('file')}
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
                <Button
                  variant={uploadMethod === 'link' ? 'default' : 'outline'}
                  onClick={() => setUploadMethod('link')}
                  className="flex-1"
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Add Link/URL
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* File Upload Area */}
          {uploadMethod === 'file' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">File Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                    isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Drag and drop files here</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="fileInput"
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="fileInput" className="cursor-pointer">
                      Browse Files
                    </label>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported: PDF, DOCX, PPTX, MP4, MP3, ZIP, etc. (Max: 50MB per file)
                  </p>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files:</Label>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.name)}
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* URL Input */}
          {uploadMethod === 'link' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">External Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="url">Resource URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/resource"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add links to external resources, videos, documents, etc.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Material Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Material Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter material title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the material"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category/Topic</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lectures">Lectures</SelectItem>
                      <SelectItem value="readings">Readings</SelectItem>
                      <SelectItem value="references">References</SelectItem>
                      <SelectItem value="videos">Videos</SelectItem>
                      <SelectItem value="assignments">Assignment Resources</SelectItem>
                      <SelectItem value="exams">Exam Materials</SelectItem>
                      <SelectItem value="supplementary">Supplementary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="weekModule">Week/Module</Label>
                  <Select value={weekModule} onValueChange={setWeekModule}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select week" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week1">Week 1</SelectItem>
                      <SelectItem value="week2">Week 2</SelectItem>
                      <SelectItem value="week3">Week 3</SelectItem>
                      <SelectItem value="week4">Week 4</SelectItem>
                      <SelectItem value="midterm">Midterm</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Visibility Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="availableAll">Available to All Students</Label>
                <Switch
                  id="availableAll"
                  checked={availableToAll}
                  onCheckedChange={setAvailableToAll}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="restrictDate">Restrict Access by Date</Label>
                <Switch
                  id="restrictDate"
                  checked={restrictByDate}
                  onCheckedChange={setRestrictByDate}
                />
              </div>

              {restrictByDate && (
                <div>
                  <Label>Available From</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !availableDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {availableDate ? format(availableDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={availableDate}
                        onSelect={setAvailableDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save & Publish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialModal;
