import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface ScanFormProps {
  onScan: (url: string) => void;
  isLoading: boolean;
}

function ScanForm({ onScan, isLoading }: ScanFormProps) {
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onScan(inputUrl.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputUrl(text);
    } catch (err) {
      // Clipboard API not available or permission denied
      console.error('Could not read from clipboard', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          id="url-input"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste or type a URL to scan..."
          className="w-full h-20 p-4 pr-12 rounded-lg border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handlePaste}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-md"
          disabled={isLoading}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          <span className="sr-only">Paste from clipboard</span>
        </button>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !inputUrl.trim()}
        className="w-full h-14 bg-primary text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Scanning...</span>
          </>
        ) : (
          <>
            <Search className="h-5 w-5" />
            <span>Scan URL</span>
          </>
        )}
      </button>
    </form>
  );
}

export default ScanForm;