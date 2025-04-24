import React, { useState } from 'react';
import ScanForm from '../components/ScanForm';
import ResultCard from '../components/ResultCard';
import { AlertCircle, MapPin, Building, Network } from 'lucide-react';
import { scanUrl } from '../services/urlScanner';
import { ScanResult } from '../types/scanTypes';
import CountryFlag from 'react-country-flag';

export default function ScanPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (inputUrl: string) => {
    setUrl(inputUrl);
    setIsLoading(true);
    setError(null);
    try {
      const scanResult = await scanUrl(inputUrl);
      setResult(scanResult);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : 'Failed to scan URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => url && handleScan(url);

  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto bg-gradient-to-b from-gray-800 to-gray-900 p-1 sm:p-6 rounded-3xl shadow-3xl transform hover:scale-[1.005] transition-transform">
      <div className="text-center pt-2">
        <h2 className="text-3xl font-extrabold text-white mb-1">Check URL Safety</h2>
        <p className="text-gray-300">Paste any link to verify if it's safe before clicking</p>
      </div>

      <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-inner flex justify-center items-center min-h-[200px] sm:min-h-[220px]">
        <div className="w-full max-w-[500px]">
          <ScanForm onScan={handleScan} isLoading={isLoading} />
        </div>
      </div>

      {error && (
        <div className="bg-red-600/20 border border-red-500/50 rounded-2xl p-4 flex items-start gap-3 shadow-lg">
          <AlertCircle className="h-6 w-6 text-red-400 mt-1" />
          <div>
            <p className="text-red-200 font-semibold">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-2 text-red-300 text-sm font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300">
            <ResultCard result={result} />
          </div>

          <div className="bg-gray-900/30 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-inner">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Geolocation Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { label: 'Country', value: result.geolocation.country, icon: (
                    <CountryFlag
                      countryCode={result.geolocation.country}
                      svg
                      className="text-2xl rounded"
                    />
                  )
                },
                { label: 'Region', value: result.geolocation.region, icon: <MapPin size={20} className="text-gray-400" /> },
                { label: 'City', value: result.geolocation.city, icon: <Building size={20} className="text-gray-400" /> },
                { label: 'IP Address', value: result.geolocation.ip, icon: <Network size={20} className="text-gray-400" /> }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  {item.icon || <div className="w-6 h-6 bg-gray-700 rounded-full" />}
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-200">{item.label}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-gray-500 text-sm">
        Tip: Install this app to your home screen for quicker access when checking links.
      </p>
    </div>
  );
}
