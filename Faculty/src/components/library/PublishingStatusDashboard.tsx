
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Users, 
  Download,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react';

interface PublishedResource {
  id: string;
  name: string;
  type: string;
  publishedAt: string;
  status: 'delivered' | 'failed' | 'partial' | 'scheduled';
  targetClasses: string[];
  totalStudents: number;
  viewedBy: number;
  downloadCount: number;
  engagementRate: number;
  errors?: string[];
}

interface Analytics {
  totalPublished: number;
  successRate: number;
  averageEngagement: number;
  mostPopularResource: string;
}

const PublishingStatusDashboard: React.FC = () => {
  const [publishedResources, setPublishedResources] = useState<PublishedResource[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [activeTab, setActiveTab] = useState('recent');

  useEffect(() => {
    // Mock data for published resources
    const mockResources: PublishedResource[] = [
      {
        id: '1',
        name: 'Quantum Mechanics Chapter 1.pdf',
        type: 'Document',
        publishedAt: '2025-05-25T09:30:00Z',
        status: 'delivered',
        targetClasses: ['PHYS101', 'PHYS102'],
        totalStudents: 45,
        viewedBy: 42,
        downloadCount: 38,
        engagementRate: 93.3
      },
      {
        id: '2',
        name: 'Organic Chemistry Lab Demo.mp4',
        type: 'Video',
        publishedAt: '2025-05-25T08:15:00Z',
        status: 'partial',
        targetClasses: ['CHEM105'],
        totalStudents: 15,
        viewedBy: 12,
        downloadCount: 8,
        engagementRate: 80.0,
        errors: ['3 students have connectivity issues']
      },
      {
        id: '3',
        name: 'Programming Assignment Template.docx',
        type: 'Document',
        publishedAt: '2025-05-25T07:45:00Z',
        status: 'failed',
        targetClasses: ['CS101'],
        totalStudents: 25,
        viewedBy: 0,
        downloadCount: 0,
        engagementRate: 0,
        errors: ['Server timeout', 'File corruption detected']
      },
      {
        id: '4',
        name: 'Advanced Calculus Presentation.pptx',
        type: 'Presentation',
        publishedAt: '2025-05-26T10:00:00Z',
        status: 'scheduled',
        targetClasses: ['MATH202'],
        totalStudents: 18,
        viewedBy: 0,
        downloadCount: 0,
        engagementRate: 0
      }
    ];

    setPublishedResources(mockResources);

    // Calculate analytics
    const totalPublished = mockResources.length;
    const successful = mockResources.filter(r => r.status === 'delivered').length;
    const successRate = (successful / totalPublished) * 100;
    const averageEngagement = mockResources.reduce((sum, r) => sum + r.engagementRate, 0) / totalPublished;
    const mostPopular = mockResources.reduce((prev, current) => 
      prev.engagementRate > current.engagementRate ? prev : current
    );

    setAnalytics({
      totalPublished,
      successRate,
      averageEngagement,
      mostPopularResource: mostPopular.name
    });
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-500">Partial</Badge>;
      case 'scheduled':
        return <Badge variant="outline">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'partial':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const recentResources = publishedResources.slice(0, 10);
  const failedResources = publishedResources.filter(r => r.status === 'failed' || r.status === 'partial');
  const scheduledResources = publishedResources.filter(r => r.status === 'scheduled');

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      {analytics && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Published</p>
                  <p className="text-3xl font-bold">{analytics.totalPublished}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-bold">{analytics.successRate.toFixed(1)}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Engagement</p>
                  <p className="text-3xl font-bold">{analytics.averageEngagement.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Syncs</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <Users className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Dashboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Publishing Status Dashboard</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="failed">Issues ({failedResources.length})</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled ({scheduledResources.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <p className="text-sm text-muted-foreground">{resource.type}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(resource.status)}
                          {getStatusBadge(resource.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {resource.targetClasses.map((cls, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Progress value={resource.engagementRate} className="w-16 h-2" />
                            <span className="text-sm">{resource.engagementRate}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {resource.viewedBy}/{resource.totalStudents} viewed
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {new Date(resource.publishedAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(resource.publishedAt).toLocaleTimeString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="failed" className="mt-6">
              <div className="space-y-4">
                {failedResources.map((resource) => (
                  <Card key={resource.id} className="border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(resource.status)}
                            <h4 className="font-medium">{resource.name}</h4>
                            {getStatusBadge(resource.status)}
                          </div>
                          {resource.errors && (
                            <div className="space-y-1">
                              {resource.errors.map((error, idx) => (
                                <p key={idx} className="text-sm text-red-600">
                                  • {error}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Retry
                          </Button>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="mt-6">
              <div className="space-y-4">
                {scheduledResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-blue-500" />
                          <div>
                            <h4 className="font-medium">{resource.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Scheduled for {new Date(resource.publishedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resource Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {publishedResources.slice(0, 5).map((resource) => (
                        <div key={resource.id} className="flex items-center justify-between">
                          <span className="text-sm truncate">{resource.name}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={resource.engagementRate} className="w-20 h-2" />
                            <span className="text-sm min-w-[3rem]">
                              {resource.engagementRate}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Class Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">PHYS101</span>
                        <span className="text-sm font-medium">93.3%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CHEM105</span>
                        <span className="text-sm font-medium">80.0%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">MATH202</span>
                        <span className="text-sm font-medium">--</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CS101</span>
                        <span className="text-sm font-medium">0%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublishingStatusDashboard;
