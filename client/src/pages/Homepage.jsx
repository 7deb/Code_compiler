// HomePage.jsx
import React from 'react';
import CompilerPage from '../components/Compilerpage';
import LeftBar from '../components/LeftBar';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-0 relative overflow-hidden font-mono">
      {/* Hacker-style animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="text-green-400 text-xs absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 20}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-cyan-400/20 shadow-lg shadow-cyan-400/10">
                <h2 className="font-semibold mb-2 text-green-400">
                  > code_inspiration.exe
                </h2>
                <LeftBar />
              </div>
              
              {/* System stats panel */}
              <div className="bg-gray-800 p-4 rounded-lg border border-cyan-400/20 shadow-lg shadow-cyan-400/10">
                <h2 className="font-semibold mb-2 text-green-400">
                  > system_stats.dll
                </h2>
                <div className="text-gray-300 text-sm">
                  <p className="flex justify-between py-1 border-b border-gray-700">
                    <span>CPU Load:</span>
                    <span className="text-cyan-400">{(Math.random() * 100).toFixed(2)}%</span>
                  </p>
                  <p className="flex justify-between py-1 border-b border-gray-700">
                    <span>Memory:</span>
                    <span className="text-cyan-400">{(Math.random() * 100).toFixed(2)}%</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span>Uptime:</span>
                    <span className="text-cyan-400">{Math.floor(Math.random() * 24)}h {Math.floor(Math.random() * 60)}m</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Main compiler area */}
            <div className="lg:col-span-3">
              <CompilerPage/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;