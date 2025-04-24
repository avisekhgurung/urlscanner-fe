import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ScanFormProps {
  onScan: (url: string) => void;
  isLoading: boolean;
}

export default function ScanForm({ onScan, isLoading }: ScanFormProps) {
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = inputUrl.trim();
    if (trimmedUrl) {
      try {
        new URL(trimmedUrl);
        onScan(trimmedUrl);
      } catch {
        toast.error('Invalid URL - must include http:// or https://');
      }
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputUrl(text);
    } catch {
      // ignore
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-gray-900/30 backdrop-blur-md  sm:p-5 rounded-3xl shadow-3xl transform hover:scale-[1.005] transition-transform"
    >
      <div className="relative">
        <textarea
          id="url-input"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste or type a URL to scan..."
          disabled={isLoading}
          className="w-full min-w-[280px] min-h-[6rem] p-3 pr-10 sm:p-4 sm:pr-12 bg-gray-800/40 border border-gray-700 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 text-white shadow-inner text-sm sm:text-base"
        />
        <button
          type="button"
          onClick={handlePaste}
          disabled={isLoading}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-gray-800/50 rounded-full shadow-md hover:bg-gray-800/70 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="text-gray-300 sm:w-5 sm:h-5"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading || !inputUrl.trim()}
        className="flex items-center justify-center gap-3 h-12 sm:h-14 rounded-2xl text-white font-semibold bg-cyan-500/80 shadow-lg hover:bg-cyan-500 transition disabled:opacity-50 disabled:pointer-events-none text-sm sm:text-base"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Scanning...</span>
          </>
        ) : (
          <>
            <Search className="h-6 w-6" />
            <span>Scan URL</span>
          </>
        )}
      </button>
    </form>
  );
}