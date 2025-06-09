
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ResourcePopularity: React.FC = () => {
  const resources = [
    { name: 'Lecture Slides - Week 5', views: 98 },
    { name: 'Database Design Example', views: 87 },
    { name: 'Midterm Review Guide', views: 76 },
    { name: 'Tutorial Video - SQL Joins', views: 65 },
    { name: 'Practice Questions', views: 52 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Popularity</CardTitle>
        <CardDescription>Most accessed learning materials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{resource.name}</span>
                <span className="text-sm font-medium">{resource.views} views</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${resource.views}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcePopularity;
