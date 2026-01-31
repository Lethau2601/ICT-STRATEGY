
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'signals', label: 'Signal Lab', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'strategy', label: 'Strategy Hub', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'history', label: 'Signal History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-200">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col sticky top-0 z-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tighter text-blue-500 font-mono">
            AUTOTRADE<span className="text-white">AI</span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-mono">2026 ICT QUANT ENGINE</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600/10 border border-blue-500/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg cyber-glow">L</div>
            <div>
              <p className="text-sm font-bold">Lethau C.</p>
              <p className="text-[10px] text-slate-500 uppercase font-mono">Head Strategist</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Probability Ticker */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 h-10 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex items-center overflow-hidden pointer-events-none z-50">
        <div className="flex whitespace-nowrap animate-marquee items-center text-[10px] font-mono">
          <span className="mx-8 text-green-400">US30: 48,927.40 (+0.11%)</span>
          <span className="mx-8 text-yellow-400">XAUUSD: 2,450.15 (-0.05%)</span>
          <span className="mx-8 text-blue-400">STATUS: {new Date().getDay() === 0 || new Date().getDay() === 6 ? 'MARKET CLOSED' : 'ACTIVE SESSION'}</span>
          <span className="mx-8 text-slate-500">YEAR: 2026</span>
          <span className="mx-8 text-green-400">US30: 48,927.40 (+0.11%)</span>
          <span className="mx-8 text-yellow-400">XAUUSD: 2,450.15 (-0.05%)</span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Layout;
