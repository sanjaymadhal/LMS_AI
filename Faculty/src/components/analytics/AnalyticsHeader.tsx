
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsHeaderProps {
  title: string;
  description: string;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ title, description }) => {
  const { toast } = useToast();

  const handleExportData = () => {
    toast({
      title: "Analytics Exported",
      description: "Your analytics data has been exported to CSV.",
    });
  };
  
  const handleShareReport = () => {
    toast({
      title: "Report Shared",
      description: "Analytics report has been shared with administrators.",
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline"
          onClick={handleExportData}
          className="hover-scale"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        
        <Button 
          onClick={handleShareReport}
          className="hover-scale"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Report
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
