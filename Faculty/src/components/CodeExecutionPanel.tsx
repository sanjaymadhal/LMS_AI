import React, { useState, useEffect } from 'react';
import { Play, Copy, Trash2, X, Download, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { toast } from 'sonner';

interface CodeExecutionPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const CodeExecutionPanel: React.FC<CodeExecutionPanelProps> = ({ isVisible, onToggle }) => {
  const [htmlCode, setHtmlCode] = useState('<canvas id="particle-canvas"></canvas>');
  const [cssCode, setCssCode] = useState(`html, body {
  margin: 0;
  padding: 0;
}

#particle-canvas {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
}`);
  const [jsCode, setJsCode] = useState(`// Particle animation example
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  const particles = [];
  
  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1
    };
  }
  
  for (let i = 0; i < 50; i++) {
    particles.push(createParticle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}`);
  const [output, setOutput] = useState('');

  const executeCode = () => {
    try {
      // Create the complete HTML document
      const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Code Preview</title>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>
            try {
              ${jsCode}
            } catch (error) {
              console.error('JavaScript Error:', error);
              document.body.innerHTML += '<div style="color: red; padding: 20px;">JavaScript Error: ' + error.message + '</div>';
            }
          </script>
        </body>
        </html>
      `;
      
      setOutput(fullHtml);
      toast.success('Code executed successfully!');
    } catch (error) {
      const errorOutput = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      setOutput(errorOutput);
      toast.error('Code execution failed');
    }
  };

  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`${type} code copied to clipboard!`);
  };

  const clearCode = (type: 'html' | 'css' | 'js') => {
    switch (type) {
      case 'html':
        setHtmlCode('');
        break;
      case 'css':
        setCssCode('');
        break;
      case 'js':
        setJsCode('');
        break;
    }
    toast.success(`${type.toUpperCase()} code cleared!`);
  };

  const downloadCode = () => {
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Playground Export</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
  <script>
${jsCode}
  </script>
</body>
</html>`;
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-playground.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Code downloaded!');
  };

  // Auto-execute when code changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (htmlCode || cssCode || jsCode) {
        executeCode();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode]);

  // ESC key handler
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        onToggle();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isVisible, onToggle]);

  return (
    <Dialog open={isVisible} onOpenChange={onToggle}>
      <DialogContent className="max-w-full max-h-full h-screen w-screen p-0 gap-0 rounded-none">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-2 text-sm font-semibold">Code Playground</span>
              <span className="text-xs text-muted-foreground">Fullscreen Editor</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                onClick={() => executeCode()}
                size="sm"
                className="h-7 text-xs"
              >
                <Play size={12} className="mr-1" />
                Run
              </Button>
              <Button
                variant="outline"
                onClick={downloadCode}
                size="icon"
                className="h-7 w-7"
                title="Download HTML"
              >
                <Download size={12} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="h-7 w-7"
                title="Close (ESC)"
              >
                <X size={14} />
              </Button>
            </div>
          </div>

          {/* Three-Section Layout */}
          <div className="flex-1 min-h-0">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Section 1: Code Snippet */}
              <ResizablePanel defaultSize={33} minSize={25}>
                <div className="h-full flex flex-col bg-background">
                  <div className="px-3 py-2 bg-muted/20 border-b">
                    <span className="text-xs font-medium text-muted-foreground">CODE SNIPPET</span>
                  </div>
                  <Tabs defaultValue="html" className="flex-1 flex flex-col">
                    <TabsList className="w-full justify-start rounded-none border-b bg-muted/20">
                      <TabsTrigger value="html" className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-orange-500 rounded-sm"></span>
                        HTML
                      </TabsTrigger>
                      <TabsTrigger value="css" className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
                        CSS
                      </TabsTrigger>
                      <TabsTrigger value="js" className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-500 rounded-sm"></span>
                        JS
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex-1 min-h-0">
                      <TabsContent value="html" className="h-full m-0 rounded-none">
                        <div className="h-full flex flex-col">
                          <div className="flex items-center justify-between px-3 py-2 bg-muted/20 border-b">
                            <span className="text-xs font-medium text-muted-foreground">HTML</span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyCode(htmlCode, 'HTML')}
                                className="h-6 w-6"
                                title="Copy HTML"
                              >
                                <Copy size={10} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => clearCode('html')}
                                className="h-6 w-6"
                                title="Clear HTML"
                              >
                                <Trash2 size={10} />
                              </Button>
                            </div>
                          </div>
                          <Textarea
                            value={htmlCode}
                            onChange={(e) => setHtmlCode(e.target.value)}
                            placeholder="<!-- Write your HTML here -->"
                            className="flex-1 font-mono text-xs border-0 rounded-none resize-none focus:ring-0 bg-background"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="css" className="h-full m-0 rounded-none">
                        <div className="h-full flex flex-col">
                          <div className="flex items-center justify-between px-3 py-2 bg-muted/20 border-b">
                            <span className="text-xs font-medium text-muted-foreground">CSS</span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyCode(cssCode, 'CSS')}
                                className="h-6 w-6"
                                title="Copy CSS"
                              >
                                <Copy size={10} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => clearCode('css')}
                                className="h-6 w-6"
                                title="Clear CSS"
                              >
                                <Trash2 size={10} />
                              </Button>
                            </div>
                          </div>
                          <Textarea
                            value={cssCode}
                            onChange={(e) => setCssCode(e.target.value)}
                            placeholder="/* Write your CSS here */"
                            className="flex-1 font-mono text-xs border-0 rounded-none resize-none focus:ring-0 bg-background"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="js" className="h-full m-0 rounded-none">
                        <div className="h-full flex flex-col">
                          <div className="flex items-center justify-between px-3 py-2 bg-muted/20 border-b">
                            <span className="text-xs font-medium text-muted-foreground">JAVASCRIPT</span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyCode(jsCode, 'JavaScript')}
                                className="h-6 w-6"
                                title="Copy JavaScript"
                              >
                                <Copy size={10} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => clearCode('js')}
                                className="h-6 w-6"
                                title="Clear JavaScript"
                              >
                                <Trash2 size={10} />
                              </Button>
                            </div>
                          </div>
                          <Textarea
                            value={jsCode}
                            onChange={(e) => setJsCode(e.target.value)}
                            placeholder="// Write your JavaScript here"
                            className="flex-1 font-mono text-xs border-0 rounded-none resize-none focus:ring-0 bg-background"
                          />
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Section 2: Code Visualization */}
              <ResizablePanel defaultSize={34} minSize={25}>
                <div className="h-full flex flex-col bg-background">
                  <div className="px-3 py-2 bg-muted/20 border-b">
                    <span className="text-xs font-medium text-muted-foreground">CODE VISUALIZATION</span>
                  </div>
                  <div className="flex-1 bg-white">
                    {output ? (
                      <iframe
                        srcDoc={output}
                        className="w-full h-full border-0"
                        title="Code Visualization"
                        sandbox="allow-scripts"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                        Write some code to see the visualization here...
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Section 3: Output/Input */}
              <ResizablePanel defaultSize={33} minSize={25}>
                <div className="h-full flex flex-col bg-background">
                  <div className="px-3 py-2 bg-muted/20 border-b">
                    <span className="text-xs font-medium text-muted-foreground">OUTPUT/INPUT</span>
                  </div>
                  <div className="flex-1 p-4 font-mono text-xs bg-muted/10 overflow-auto">
                    <div className="text-muted-foreground mb-2">Console Output:</div>
                    <div className="bg-background p-3 rounded border min-h-[100px]">
                      <div className="text-green-600">Code execution completed successfully.</div>
                      <div className="text-muted-foreground mt-2">
                        {output ? "Live preview is displayed in the visualization panel." : "No output generated yet."}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-muted-foreground mb-2">Input Area:</div>
                      <Textarea
                        placeholder="Enter test inputs here..."
                        className="font-mono text-xs"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};