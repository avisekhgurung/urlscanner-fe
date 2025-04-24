import React from 'react';
import { ScanResult } from '../types/scanTypes';
import SSLDetails from './SSLDetails';
import DomainAge from './DomainAge';
import GeoLocation from './GeoLocation';
import RiskIndicator from './RiskIndicator';
import { ExternalLink, RefreshCw } from 'lucide-react';

interface ResultCardProps {
  result: ScanResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const { url, ssl, domain, geolocation, riskLevel } = result;

  const formatUrlForDisplay = (urlString: string) => {
    try {
      const parsed = new URL(urlString);
      return parsed.hostname;
    } catch {
      return urlString;
    }
  };

  return (
    <div className="bg-gray-900/30 backdrop-blur-md rounded-3xl shadow-3xl overflow-hidden transform hover:scale-[1.005] transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-700">
        <div className="flex-1 overflow-hidden">
          <h3 className="text-xl font-bold text-white truncate">
            {formatUrlForDisplay(url)}
          </h3>
          <a
            href={url.startsWith('http') ? url : `https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center text-sm text-cyan-300 hover:underline"
          >
            <span className="truncate">Visit site</span>
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
        <RiskIndicator level={riskLevel} />
      </div>

      {/* Details Grid */}
      <div className="p-5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-2xl shadow-inner">
            <SSLDetails ssl={ssl} />
          </div>
          <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-2xl shadow-inner">
            <DomainAge domain={domain} />
          </div>
          <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-2xl shadow-inner">
            <GeoLocation geolocation={geolocation} />
          </div>
        </div>

        <div className="bg-gray-800/20 backdrop-blur-sm p-4 rounded-2xl shadow-inner">
          <div className="font-semibold text-white mb-2">Risk Assessment</div>
          <p className="text-gray-300 text-sm">
            {riskLevel === 'high' && '⚠️ Multiple high-risk indicators. Proceed with extreme caution.'}
            {riskLevel === 'medium' && '⚠️ Some concerning indicators. Use caution.'}
            {riskLevel === 'low' && '✅ Appears safe, but always be cautious.'}
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between p-4 bg-gray-900/40 border-t border-gray-700">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Rescan</span>
        </button>
        <span className="text-xs text-gray-400">
          Scanned at {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
