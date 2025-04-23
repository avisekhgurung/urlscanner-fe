import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import ScanPage from './pages/ScanPage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update online status
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
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-10 bg-card shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">URL Scanner</h1>
            </div>
            {!isOnline && (
              <div className="text-sm px-2 py-1 bg-warning/20 text-warning-foreground rounded">
                Offline
              </div>
            )}
          </div>
        </header>
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <ScanPage />
        </main>
        
        <footer className="bg-muted py-4">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>URL Scanner &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;