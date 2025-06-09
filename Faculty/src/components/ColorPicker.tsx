
import React, { useState } from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const predefinedColors = [
  '#2563eb', // Blue
  '#dc2626', // Red
  '#16a34a', // Green
  '#ca8a04', // Yellow
  '#9333ea', // Purple
  '#ea580c', // Orange
  '#0891b2', // Cyan
  '#be185d', // Pink
  '#374151', // Gray
  '#000000', // Black
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
        title="Choose Color"
      >
        <Palette size={20} className="text-slate-600" />
        <div 
          className="w-6 h-6 rounded border-2 border-slate-300 shadow-inner"
          style={{ backgroundColor: color }}
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-slate-200 z-20">
            <div className="grid grid-cols-5 gap-2 mb-4">
              {predefinedColors.map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => {
                    onChange(presetColor);
                    setIsOpen(false);
                  }}
                  className={`
                    w-8 h-8 rounded border-2 transition-transform hover:scale-110
                    ${color === presetColor ? 'border-slate-400 shadow-lg' : 'border-slate-200'}
                  `}
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600">Custom:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-8 rounded border border-slate-300 cursor-pointer"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
