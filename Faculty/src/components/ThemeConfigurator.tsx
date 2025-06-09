
import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface ThemeConfiguratorProps {
  onClose: () => void;
}

const ThemeConfigurator: React.FC<ThemeConfiguratorProps> = ({ onClose }) => {
  const colorSchemes = [
    { name: 'Blue', primary: '#4361ee', accent: '#f72585' },
    { name: 'Green', primary: '#2b9348', accent: '#ff6b6b' },
    { name: 'Purple', primary: '#7209b7', accent: '#4cc9f0' },
    { name: 'Orange', primary: '#fb8500', accent: '#219ebc' }
  ];

  return (
    <div className="fixed top-16 right-0 bottom-0 w-[300px] bg-white shadow-xl border-l border-border z-50 overflow-y-auto animate-slide-in">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-edu-accent" />
          <h2 className="font-semibold text-lg">PyGenicArc Settings</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Appearance</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="compact-mode">Compact mode</Label>
            <Switch id="compact-mode" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sticky-header">Sticky header</Label>
            <Switch id="sticky-header" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="fluid-container">Fluid container</Label>
            <Switch id="fluid-container" />
          </div>
        </div>
        
        <div className="space-y-3 border-t pt-3">
          <h3 className="font-medium">Color Scheme</h3>
          <RadioGroup defaultValue="Blue">
            <div className="grid grid-cols-2 gap-2">
              {colorSchemes.map((scheme) => (
                <div key={scheme.name} className="flex items-center space-x-2">
                  <RadioGroupItem value={scheme.name} id={`color-${scheme.name}`} />
                  <Label htmlFor={`color-${scheme.name}`} className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full" style={{ backgroundColor: scheme.primary }}></span>
                    {scheme.name}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-3 border-t pt-3">
          <h3 className="font-medium">Navigation</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className={cn(
              "border rounded-md p-2 cursor-pointer relative",
              "ring-2 ring-offset-2 ring-edu-primary"
            )}>
              <div className="h-12 w-4 bg-sidebar rounded-md absolute left-1 top-1 bottom-1"></div>
              <div className="ml-6 h-10 bg-gray-100 rounded-md"></div>
              <p className="text-xs mt-1 text-center font-medium">Vertical</p>
            </div>
            <div className="border rounded-md p-2 cursor-pointer">
              <div className="h-4 w-full bg-sidebar rounded-md"></div>
              <div className="mt-1 h-10 bg-gray-100 rounded-md"></div>
              <p className="text-xs mt-1 text-center font-medium">Horizontal</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 border-t pt-3">
          <h3 className="font-medium">AI Assistant</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-assistant">Enable AI Assistant</Label>
            <Switch id="ai-assistant" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-suggestions">Real-time suggestions</Label>
            <Switch id="ai-suggestions" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="voice-assistant">Voice assistant</Label>
            <Switch id="voice-assistant" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeConfigurator;
