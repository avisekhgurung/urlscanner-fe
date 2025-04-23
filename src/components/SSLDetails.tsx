import React from 'react';
import { SSLInfo } from '../types/scanTypes';
import { Lock, Unlock } from 'lucide-react';

interface SSLDetailsProps {
  ssl: SSLInfo;
}

function SSLDetails({ ssl }: SSLDetailsProps) {
  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-full ${ssl.valid ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
        {ssl.valid ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
      </div>
      <div>
        <h4 className="font-medium text-sm">SSL Certificate</h4>
        {ssl.valid ? (
          <p className="text-sm text-muted-foreground">Secure connection verified</p>
        ) : (
          <p className="text-sm text-destructive">
            {ssl.error || 'Invalid or missing SSL certificate'}
          </p>
        )}
        {ssl.issuer && (
          <p className="text-xs text-muted-foreground mt-1">
            Issued by: {ssl.issuer}
          </p>
        )}
      </div>
    </div>
  );
}

export default SSLDetails;