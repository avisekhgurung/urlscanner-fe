import React from 'react';
import { ScanResult, RiskLevel } from '../types/scanTypes';
import SSLDetails from './SSLDetails';
import DomainAge from './DomainAge';
import GeoLocation from './GeoLocation';
import RiskIndicator from './RiskIndicator';
import { ExternalLink, RefreshCw } from 'lucide-react';

interface ResultCardProps {
  result: ScanResult;
}

function ResultCard({ result }: ResultCardProps) {
  const { url, ssl, domain, geolocation, riskLevel } = result;
  
  // Format the domain URL for display
  const formatUrlForDisplay = (urlString: string) => {
    try {
      const parsedUrl = new URL(urlString);
      return parsedUrl.hostname;
    } catch (error) {
      return urlString;
    }
  };

  return (
    <div className="animate-in fade-in-50 duration-300 bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between gap-2">
        <div className="flex-1 overflow-hidden">
          <h3 className="font-semibold truncate">{formatUrlForDisplay(url)}</h3>
          <a 
            href={url.startsWith('http') ? url : `https://${url}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary flex items-center gap-1 hover:underline"
          >
            <span className="truncate">Visit site</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <RiskIndicator level={riskLevel} />
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SSLDetails ssl={ssl} />
          <DomainAge domain={domain} />
          <GeoLocation geolocation={geolocation} />
        </div>
        
        <div className="bg-muted rounded-md p-3 text-sm">
          <div className="font-medium mb-1">Risk Assessment</div>
          <p className="text-muted-foreground">
            {riskLevel === 'high' && 'This URL shows multiple high-risk indicators. Proceed with extreme caution.'}
            {riskLevel === 'medium' && 'This URL has some concerning indicators. Use caution when proceeding.'}
            {riskLevel === 'low' && 'This URL appears to be safe, but always be cautious when following links.'}
          </p>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-muted/50 border-t border-border flex justify-between">
        <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <RefreshCw className="h-3 w-3" />
          <span>Rescan</span>
        </button>
        <span className="text-xs text-muted-foreground">
          Scanned {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export default ResultCard;