import React from 'react';
import { RiskLevel } from '../types/scanTypes';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface RiskIndicatorProps {
  level: RiskLevel;
}

function RiskIndicator({ level }: RiskIndicatorProps) {
  const getLevelInfo = () => {
    switch (level) {
      case 'high':
        return {
          icon: <ShieldAlert className="h-5 w-5" />,
          text: 'High Risk',
          bgColor: 'bg-destructive/10',
          textColor: 'text-destructive',
        };
      case 'medium':
        return {
          icon: <Shield className="h-5 w-5" />,
          text: 'Medium Risk',
          bgColor: 'bg-warning/10',
          textColor: 'text-warning',
        };
      case 'low':
        return {
          icon: <ShieldCheck className="h-5 w-5" />,
          text: 'Low Risk',
          bgColor: 'bg-success/10',
          textColor: 'text-success',
        };
      default:
        return {
          icon: <Shield className="h-5 w-5" />,
          text: 'Unknown',
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground',
        };
    }
  };

  const { icon, text, bgColor, textColor } = getLevelInfo();

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${bgColor} ${textColor} text-sm font-medium`}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default RiskIndicator;