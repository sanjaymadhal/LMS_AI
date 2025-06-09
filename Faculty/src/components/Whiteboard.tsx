import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas as FabricCanvas, PencilBrush, Circle, Rect, Line, IText, Point } from 'fabric';
import { Toolbar } from './Toolbar';
import { ColorPicker } from './ColorPicker';
import { CodeExecutionPanel } from './CodeExecutionPanel';
import { VRLabPanel } from './VRLabPanel';
import { toast } from 'sonner';
import { ZoomIn, ZoomOut, RotateCcw, Trash2, Code, Eye } from 'lucide-react';

export type Tool = 'select' | 'draw' | 'highlight' | 'text' | 'rectangle' | 'circle' | 'line' | 'eraser';

export const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<Tool>('draw');
  const [activeColor, setActiveColor] = useState('#2563eb');
  const [brushSize, setBrushSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [showVRPanel, setShowVRPanel] = useState(false);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth - 120,
      height: window.innerHeight - 140,
      backgroundColor: '#ffffff',
      selection: activeTool === 'select',
    });

    // Configure drawing brush
    const brush = new PencilBrush(canvas);
    brush.color = activeColor;
    brush.width = brushSize;
    canvas.freeDrawingBrush = brush;

    setFabricCanvas(canvas);
    
    // Handle canvas events
    canvas.on('path:created', () => {
      console.log('Drawing created');
    });

    canvas.on('selection:created', () => {
      console.log('Object selected');
    });

    toast.success("Whiteboard ready! Start teaching!");

    return () => {
      canvas.dispose();
    };
  }, []);

  // Update canvas settings when tool/color changes
  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.selection = activeTool === 'select';
    fabricCanvas.isDrawingMode = activeTool === 'draw' || activeTool === 'highlight' || activeTool === 'eraser';
    
    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeTool === 'eraser' ? '#ffffff' : 
                                           activeTool === 'highlight' ? `${activeColor}80` : activeColor;
      fabricCanvas.freeDrawingBrush.width = activeTool === 'eraser' ? brushSize * 3 : 
                                           activeTool === 'highlight' ? brushSize * 2 : brushSize;
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  const handleToolClick = useCallback((tool: Tool) => {
    if (!fabricCanvas) return;

    setActiveTool(tool);

    if (tool === 'text') {
      const text = new IText('Click to edit', {
        left: 100,
        top: 100,
        fontFamily: 'Arial',
        fontSize: 20,
        fill: activeColor,
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      text.enterEditing();
    } else if (tool === 'rectangle') {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: brushSize,
        width: 100,
        height: 80,
      });
      fabricCanvas.add(rect);
    } else if (tool === 'circle') {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: brushSize,
        radius: 50,
      });
      fabricCanvas.add(circle);
    } else if (tool === 'line') {
      const line = new Line([50, 100, 200, 100], {
        stroke: activeColor,
        strokeWidth: brushSize,
      });
      fabricCanvas.add(line);
    }

    fabricCanvas.renderAll();
  }, [fabricCanvas, activeColor, brushSize]);

  const handleClear = useCallback(() => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = '#ffffff';
    fabricCanvas.renderAll();
    toast.success("Canvas cleared!");
  }, [fabricCanvas]);

  const handleUndo = useCallback(() => {
    if (!fabricCanvas) return;
    const objects = fabricCanvas.getObjects();
    if (objects.length > 0) {
      fabricCanvas.remove(objects[objects.length - 1]);
      fabricCanvas.renderAll();
      toast.info("Last action undone");
    }
  }, [fabricCanvas]);

  const handleZoomIn = useCallback(() => {
    if (!fabricCanvas) return;
    const zoom = fabricCanvas.getZoom();
    fabricCanvas.setZoom(Math.min(zoom * 1.2, 3));
  }, [fabricCanvas]);

  const handleZoomOut = useCallback(() => {
    if (!fabricCanvas) return;
    const zoom = fabricCanvas.getZoom();
    fabricCanvas.setZoom(Math.max(zoom / 1.2, 0.5));
  }, [fabricCanvas]);

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Interactive Whiteboard</h1>
        <p className="text-slate-600">Teaching tools for modern classrooms</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-white border-b border-slate-200 p-4 shadow-sm">
        <Toolbar 
          activeTool={activeTool} 
          onToolClick={handleToolClick}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
        />
        
        <div className="w-px h-8 bg-slate-300" />
        
        <ColorPicker color={activeColor} onChange={setActiveColor} />
        
        <div className="w-px h-8 bg-slate-300" />
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={handleUndo}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Undo"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
            title="Clear Canvas"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="w-px h-8 bg-slate-300" />

        <button
          onClick={() => setShowCodePanel(!showCodePanel)}
          className={`
            p-2 rounded-lg transition-colors
            ${showCodePanel 
              ? 'bg-green-100 text-green-700' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }
          `}
          title="Toggle Code Panel"
        >
          <Code size={20} />
        </button>

        <button
          onClick={() => setShowVRPanel(!showVRPanel)}
          className={`
            p-2 rounded-lg transition-colors
            ${showVRPanel 
              ? 'bg-purple-100 text-purple-700' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }
          `}
          title="Toggle VR Lab"
        >
          <Eye size={20} />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-hidden bg-slate-100 p-4">
        <div className="w-full h-full bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="block"
            style={{ cursor: activeTool === 'draw' ? 'crosshair' : 'default' }}
          />
        </div>
      </div>

      {/* Code Execution Panel */}
      <CodeExecutionPanel 
        isVisible={showCodePanel}
        onToggle={() => setShowCodePanel(!showCodePanel)}
      />

      {/* VR Lab Panel */}
      <VRLabPanel 
        isVisible={showVRPanel}
        onToggle={() => setShowVRPanel(!showVRPanel)}
      />
    </div>
  );
};
