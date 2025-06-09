
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Presentation, Loader2, CheckCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PPTGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [details, setDetails] = useState('');
  const [slideCount, setSlideCount] = useState('10');
  const [style, setStyle] = useState('academic');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);
  const { toast } = useToast();
  
  const handleGenerate = () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a presentation topic.",
        variant: "destructive"
      });
      return;
    }
    
    setGenerating(true);
    setProgress(0);
    setGenerated(false);
    
    // Simulate the generation process with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setGenerated(true);
          toast({
            title: "Presentation generated",
            description: "Your PowerPoint presentation is ready to download.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Presentation className="h-5 w-5" />
            PowerPoint Presentation Generator
          </CardTitle>
          <CardDescription>
            Create professional slide decks in minutes with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Presentation Topic</Label>
              <Input 
                id="topic"
                placeholder="e.g., Introduction to Quantum Physics" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={generating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea
                id="details"
                placeholder="Include specific points, concepts or areas to focus on..."
                className="min-h-[100px]"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                disabled={generating}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slide-count">Number of Slides</Label>
                <Select 
                  value={slideCount} 
                  onValueChange={setSlideCount}
                  disabled={generating}
                >
                  <SelectTrigger id="slide-count">
                    <SelectValue placeholder="Select slide count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 slides</SelectItem>
                    <SelectItem value="10">10 slides</SelectItem>
                    <SelectItem value="15">15 slides</SelectItem>
                    <SelectItem value="20">20 slides</SelectItem>
                    <SelectItem value="30">30 slides</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="style">Presentation Style</Label>
                <Select 
                  value={style} 
                  onValueChange={setStyle}
                  disabled={generating}
                >
                  <SelectTrigger id="style">
                    <SelectValue placeholder="Select presentation style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="colorful">Colorful</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 items-stretch">
          {generating && (
            <div className="space-y-2 w-full">
              <div className="flex justify-between text-sm">
                <span>Generating presentation...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {generated ? (
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <Button 
                className="flex-1 hover-scale bg-green-600 hover:bg-green-700"
                onClick={() => {
                  toast({
                    title: "Downloading presentation",
                    description: "Your file would download in a real implementation.",
                  });
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PowerPoint
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 hover-scale"
                onClick={() => {
                  setTopic('');
                  setDetails('');
                  setGenerated(false);
                }}
              >
                Create New Presentation
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full hover-scale"
              onClick={handleGenerate}
              disabled={generating || !topic.trim()}
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Presentation...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate PowerPoint
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {generated && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Presentation Generated
            </CardTitle>
            <CardDescription>
              Preview of your "{topic}" presentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 text-center space-y-4">
              <Presentation className="h-24 w-24 mx-auto text-muted-foreground" />
              <div>
                <h3 className="font-bold text-lg">{topic}</h3>
                <p className="text-sm text-muted-foreground">
                  {slideCount} slides • {style} style
                </p>
              </div>
              <p className="text-sm">
                In a real implementation, a preview of the slides would be shown here.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PPTGenerator;

import { Sparkles } from 'lucide-react';
