import React, { useState } from 'react';
import ScanForm from '../components/ScanForm';
import ResultCard from '../components/ResultCard';
import { AlertCircle } from 'lucide-react';
import { scanUrl } from '../services/urlScanner';
import { ScanResult } from '../types/scanTypes';
import CountryFlag from 'react-country-flag';

function ScanPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (inputUrl: string) => {
    try {
      setUrl(inputUrl);
      setIsLoading(true);
      setError(null);
      
      const scanResult = await scanUrl(inputUrl);
      setResult(scanResult);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : 'Failed to scan URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (url) {
      handleScan(url);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold mb-2">Check URL Safety</h2>
        <p className="text-muted-foreground">
          Paste any link to verify if it's safe before clicking
        </p>
      </div>
      
      <ScanForm onScan={handleScan} isLoading={isLoading} />
      
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex gap-3 items-start">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-destructive">{error}</p>
            <button 
              onClick={handleRetry}
              className="mt-2 text-sm font-medium text-destructive hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}
      
      {result && (
        <div className="space-y-4">
          <ResultCard result={result} />
          <div className="bg-background rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold mb-3">Geolocation Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CountryFlag 
                  countryCode={result.geolocation.country}
                  svg
                  className="text-xl rounded"
                />
                <div>
                  <p className="text-sm font-medium">Country</p>
                  <p className="text-sm text-muted-foreground">
                    {result.geolocation.country}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Region</p>
                <p className="text-sm text-muted-foreground">
                  {result.geolocation.region}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">City</p>
                <p className="text-sm text-muted-foreground">
                  {result.geolocation.city}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">IP Address</p>
                <p className="text-sm text-muted-foreground">
                  {result.geolocation.ip}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground mt-4">
        <p>
          Tip: Install this app to your home screen for quicker access when checking links.
        </p>
      </div>
    </div>
  );
}

export default ScanPage;