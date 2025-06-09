
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Zap, 
  Monitor, 
  Smartphone,
  RefreshCw
} from 'lucide-react';

interface SyncStatus {
  id: string;
  resourceName: string;
  className: string;
  status: 'syncing' | 'completed' | 'failed' | 'queued';
  progress: number;
  lastUpdated: string;
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'display';
  studentCount: number;
  syncedStudents: number;
}

interface SynchronizationEngineProps {
  isActive?: boolean;
}

const SynchronizationEngine: React.FC<SynchronizationEngineProps> = ({ isActive = true }) => {
  const [syncStatuses, setSyncStatuses] = useState<SyncStatus[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'slow'>('connected');
  const [totalOperations, setTotalOperations] = useState(0);
  const [completedOperations, setCompletedOperations] = useState(0);

  // Mock sync data
  useEffect(() => {
    if (isActive) {
      const mockSyncData: SyncStatus[] = [
        {
          id: '1',
          resourceName: 'Quantum Mechanics.pdf',
          className: 'PHYS101',
          status: 'completed',
          progress: 100,
          lastUpdated: new Date().toISOString(),
          deviceType: 'desktop',
          studentCount: 22,
          syncedStudents: 22
        },
        {
          id: '2',
          resourceName: 'Lab Demo.mp4',
          className: 'CHEM105',
          status: 'syncing',
          progress: 67,
          lastUpdated: new Date().toISOString(),
          deviceType: 'tablet',
          studentCount: 15,
          syncedStudents: 10
        },
        {
          id: '3',
          resourceName: 'Assignment Template.docx',
          className: 'CS101',
          status: 'queued',
          progress: 0,
          lastUpdated: new Date().toISOString(),
          deviceType: 'mobile',
          studentCount: 25,
          syncedStudents: 0
        }
      ];
      
      setSyncStatuses(mockSyncData);
      setTotalOperations(mockSyncData.length);
      setCompletedOperations(mockSyncData.filter(s => s.status === 'completed').length);

      // Simulate real-time updates
      const interval = setInterval(() => {
        setSyncStatuses(prev => prev.map(sync => {
          if (sync.status === 'syncing' && sync.progress < 100) {
            const newProgress = Math.min(sync.progress + Math.random() * 15, 100);
            const newSyncedStudents = Math.floor((newProgress / 100) * sync.studentCount);
            return {
              ...sync,
              progress: newProgress,
              syncedStudents: newSyncedStudents,
              status: newProgress >= 100 ? 'completed' : 'syncing',
              lastUpdated: new Date().toISOString()
            };
          }
          if (sync.status === 'queued') {
            return { ...sync, status: 'syncing', progress: 5 };
          }
          return sync;
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'syncing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'queued':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop':
        return <Monitor className="h-4 w-4" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Smartphone className="h-4 w-4" />;
      case 'display':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-500" />;
      case 'slow':
        return <Wifi className="h-4 w-4 text-yellow-500" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-500" />;
      default:
        return <Wifi className="h-4 w-4" />;
    }
  };

  const overallProgress = totalOperations > 0 ? (completedOperations / totalOperations) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Real-Time Synchronization
          </CardTitle>
          <div className="flex items-center gap-2">
            {getConnectionIcon()}
            <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'}>
              {connectionStatus}
            </Badge>
          </div>
        </div>
        
        {totalOperations > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{completedOperations}/{totalOperations} completed</span>
            </div>
            <Progress value={overallProgress} className="w-full" />
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {syncStatuses.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No active synchronization operations</p>
          </div>
        ) : (
          <div className="space-y-3">
            {syncStatuses.map((sync) => (
              <div key={sync.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(sync.status)}
                    <span className="font-medium text-sm">{sync.resourceName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(sync.deviceType)}
                    <Badge variant="outline" className="text-xs">
                      {sync.className}
                    </Badge>
                  </div>
                </div>
                
                {sync.status === 'syncing' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Syncing to devices...</span>
                      <span>{sync.syncedStudents}/{sync.studentCount} students</span>
                    </div>
                    <Progress value={sync.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>
                    Last updated: {new Date(sync.lastUpdated).toLocaleTimeString()}
                  </span>
                  {sync.status === 'completed' && (
                    <span className="text-green-600 font-medium">
                      ✓ Synced to all devices
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Bandwidth: Optimized</span>
            <span>Latency: &lt; 50ms</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SynchronizationEngine;
