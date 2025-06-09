
import React from 'react';
import { 
  MousePointer2, 
  Pencil, 
  Highlighter, 
  Type, 
  Square, 
  Circle, 
  Minus,
  Eraser 
} from 'lucide-react';
import type { Tool } from './Whiteboard';

interface ToolbarProps {
  activeTool: Tool;
  onToolClick: (tool: Tool) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

const tools = [
  { id: 'select' as Tool, icon: MousePointer2, label: 'Select', shortcut: 'V' },
  { id: 'draw' as Tool, icon: Pencil, label: 'Draw', shortcut: 'P' },
  { id: 'highlight' as Tool, icon: Highlighter, label: 'Highlight', shortcut: 'H' },
  { id: 'text' as Tool, icon: Type, label: 'Text', shortcut: 'T' },
  { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle', shortcut: 'R' },
  { id: 'circle' as Tool, icon: Circle, label: 'Circle', shortcut: 'C' },
  { id: 'line' as Tool, icon: Minus, label: 'Line', shortcut: 'L' },
  { id: 'eraser' as Tool, icon: Eraser, label: 'Eraser', shortcut: 'E' },
];

export const Toolbar: React.FC<ToolbarProps> = ({ 
  activeTool, 
  onToolClick, 
  brushSize, 
  onBrushSizeChange 
}) => {
  return (
    <div className="flex items-center gap-2">
      {tools.map((tool) => {
        const IconComponent = tool.icon;
        const isActive = activeTool === tool.id;
        
        return (
          <button
            key={tool.id}
            onClick={() => onToolClick(tool.id)}
            className={`
              flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-blue-100 text-blue-700 shadow-md border-2 border-blue-300' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent'
              }
            `}
            title={`${tool.label} (${tool.shortcut})`}
          >
            <IconComponent size={20} />
            <span className="text-xs font-medium">{tool.label}</span>
          </button>
        );
      })}
      
      <div className="ml-4 flex items-center gap-2">
        <label className="text-sm font-medium text-slate-600">Size:</label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => onBrushSizeChange(Number(e.target.value))}
          className="w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-slate-600 w-6">{brushSize}</span>
      </div>
    </div>
  );
};
