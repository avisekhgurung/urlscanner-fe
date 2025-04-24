import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import ScanPage from './pages/ScanPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <header className="sticky top-0 z-20 backdrop-blur-lg bg-white/10 shadow-2xl py-4">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full shadow-inner">
                <Shield className="h-7 w-7 text-cyan-300" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-wide">URL Scanner</h1>
            </div>
            {!isOnline && (
              <div className="px-3 py-1 bg-yellow-600/30 text-yellow-200 rounded-full shadow-lg">
                Offline
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 container mx-auto px-6 py-8">
          <div className="p-2 bg-gray-900/40 rounded-2xl shadow-3xl transform hover:scale-[1.01] transition-transform duration-300">
            <ScanPage />
          </div>
        </main>

        <footer className="py-6 bg-white/10 backdrop-blur-lg">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-gray-400">
              URL Scanner &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          className: 'bg-gray-800 text-white text-sm',
          error: {
            className: 'bg-red-600 text-white text-sm',
            iconTheme: {
              primary: 'white',
              secondary: 'bg-red-600',
            }
          },
          duration: 4000
        }}
      />
    </ThemeProvider>
  );
}
