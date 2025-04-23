import React from 'react';
import { DomainInfo } from '../types/scanTypes';
import { Calendar } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface DomainAgeProps {
  domain: DomainInfo;
}

function DomainAge({ domain }: DomainAgeProps) {
  const isNew = domain.ageInDays < 365;
  
  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-full ${isNew ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
        <Calendar className="h-5 w-5" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-sm">Domain Age</h4>
          {isNew && (
            <span className="text-xs px-1.5 py-0.5 bg-warning/20 text-warning-foreground rounded">
              New
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {domain.creationDate 
            ? `Registered ${formatDate(domain.creationDate)}` 
            : 'Registration date unknown'}
        </p>
      </div>
    </div>
  );
}

export default DomainAge;