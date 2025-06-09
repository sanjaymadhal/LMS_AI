
import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Maximize2, Eye, Settings } from 'lucide-react';

interface VRLabPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const VRLabPanel: React.FC<VRLabPanelProps> = ({ isVisible, onToggle }) => {
  const [activeScene, setActiveScene] = useState('molecular');
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scenes = [
    { id: 'molecular', name: 'Molecular Structure', description: 'Explore 3D molecular models' },
    { id: 'solar', name: 'Solar System', description: 'Navigate through planets and stars' },
    { id: 'anatomy', name: 'Human Anatomy', description: 'Interactive 3D body exploration' },
    { id: 'chemistry', name: 'Chemistry Lab', description: 'Virtual chemistry experiments' },
    { id: 'physics', name: 'Physics Simulation', description: 'Visualize physics concepts' }
  ];

  useEffect(() => {
    if (isVisible && canvasRef.current) {
      // Initialize basic 3D scene (placeholder for actual VR implementation)
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw a simple 3D-like visualization
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 20) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 20) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
          ctx.stroke();
        }
        
        // Draw center object based on active scene
        ctx.fillStyle = activeScene === 'molecular' ? '#00ff88' : 
                       activeScene === 'solar' ? '#ffaa00' :
                       activeScene === 'anatomy' ? '#ff6b6b' :
                       activeScene === 'chemistry' ? '#4ecdc4' : '#a8e6cf';
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const time = Date.now() * 0.001;
        
        if (activeScene === 'molecular') {
          // Draw molecule-like structure
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + time;
            const x = centerX + Math.cos(angle) * 50;
            const y = centerY + Math.sin(angle) * 50;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeScene === 'solar') {
          // Draw solar system
          ctx.beginPath();
          ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
          ctx.fill();
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2 + time * 0.5;
            const x = centerX + Math.cos(angle) * (60 + i * 20);
            const y = centerY + Math.sin(angle) * (60 + i * 20);
            ctx.beginPath();
            ctx.arc(x, y, 4 + i, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Default geometric shape
          ctx.beginPath();
          ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }, [isVisible, activeScene, isPlaying]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 right-0 w-1/2 h-2/3 bg-slate-900 border-l border-t border-slate-700 shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-3">
          <Eye className="text-blue-400" size={20} />
          <h3 className="text-white font-semibold">VR Lab</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            className="p-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-white transition-colors"
            title="Reset View"
          >
            <RotateCcw size={16} />
          </button>
          <button
            className="p-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-white transition-colors"
            title="Fullscreen"
          >
            <Maximize2 size={16} />
          </button>
          <button
            className="p-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-white transition-colors"
            title="Settings"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
            title="Close VR Lab"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Scene Selector */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 p-4 overflow-y-auto">
          <h4 className="text-white font-medium mb-4">VR Scenes</h4>
          <div className="space-y-2">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setActiveScene(scene.id)}
                className={`
                  w-full text-left p-3 rounded-lg transition-colors
                  ${activeScene === scene.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  }
                `}
              >
                <div className="font-medium">{scene.name}</div>
                <div className="text-xs opacity-75 mt-1">{scene.description}</div>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-6 pt-4 border-t border-slate-700">
            <h5 className="text-white font-medium mb-3">Controls</h5>
            <div className="space-y-2 text-sm text-slate-300">
              <div>• Mouse: Rotate view</div>
              <div>• Scroll: Zoom in/out</div>
              <div>• WASD: Move around</div>
              <div>• Space: Reset position</div>
            </div>
          </div>
        </div>

        {/* VR Viewport */}
        <div className="flex-1 bg-slate-900 relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-full object-contain"
            style={{ background: 'linear-gradient(45deg, #1a1a1a, #2d2d2d)' }}
          />
          
          {/* VR Overlay Info */}
          <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded">
            <div className="text-sm font-medium">
              {scenes.find(s => s.id === activeScene)?.name}
            </div>
            <div className="text-xs opacity-75">
              {isPlaying ? 'Playing' : 'Paused'} • Interactive Mode
            </div>
          </div>

          {/* Performance Stats */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded text-xs">
            <div>FPS: 60</div>
            <div>Objects: 24</div>
            <div>Memory: 45MB</div>
          </div>
        </div>
      </div>
    </div>
  );
};
