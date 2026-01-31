
import React, { useState, useEffect } from 'react';
import { Asset, ICTAnalysis } from '../types';
import { ASSETS } from '../constants';
import { analyzeAsset } from '../services/geminiService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SignalLab: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset>('US30');
  const [analysis, setAnalysis] = useState<ICTAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayOfWeek = currentTime.getDay(); // 0=Sun, 6=Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleRunAnalysis = async () => {
    if (isWeekend) return;
    setLoading(true);
    try {
      const result = await analyzeAsset(selectedAsset);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert('Engine error. Ensure system is connected.');
    } finally {
      setLoading(false);
    }
  };

  const mockChartData = [
    { name: '08:00', price: selectedAsset === 'US30' ? 48873 : 2442 },
    { name: '10:00', price: selectedAsset === 'US30' ? 48900 : 2445 },
    { name: '12:00', price: selectedAsset === 'US30' ? 48860 : 2438 },
    { name: '14:00', price: selectedAsset === 'US30' ? 48910 : 2450 },
    { name: '16:00', price: selectedAsset === 'US30' ? 48927 : 2448 },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight font-mono uppercase">Signal Lab <span className="text-blue-500">2026</span></h2>
          <p className="text-slate-400">ICT Analysis Powered by Lethau C.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-tighter">
              {currentTime.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="text-sm font-mono font-bold text-white">
              {currentTime.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} SAST
            </span>
          </div>
          <select 
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value as Asset)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            {ASSETS.map(asset => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>
          <button
            onClick={handleRunAnalysis}
            disabled={loading || isWeekend}
            className={`font-bold px-6 py-2 rounded-lg shadow-lg transition-all active:scale-95 flex items-center gap-2 text-sm ${
              isWeekend 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-blue-600 hover:bg-blue-700 text-white cyber-glow'
            }`}
          >
            {loading ? (
              <><span className="animate-spin">🌀</span> Computing...</>
            ) : isWeekend ? (
              <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.366zM7.5 4.805a6 6 0 017.695 7.695L7.5 4.805zM10 2a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" /></svg> MARKET CLOSED</>
            ) : (
              <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> ANALYZE FLOW</>
            )}
          </button>
        </div>
      </header>

      {/* Market Closed Warning */}
      {isWeekend && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-4 animate-pulse">
          <div className="bg-red-500/20 p-2 rounded-lg">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <h4 className="text-red-400 font-bold text-sm">WEEKEND HALT: {dayNames[dayOfWeek]}</h4>
            <p className="text-slate-400 text-xs">The ICT Quant Engine requires live interbank order flow. Analysis is disabled until the Monday Open.</p>
          </div>
        </div>
      )}

      {/* Mini Calendar View */}
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <div 
            key={d} 
            className={`p-2 rounded-lg border text-center font-mono text-[10px] ${
              i === dayOfWeek 
                ? 'bg-blue-600 border-blue-400 text-white animate-pulse' 
                : i === 0 || i === 6 
                  ? 'bg-slate-900 border-slate-800 text-slate-600'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {d}
            {i !== 0 && i !== 6 && <div className="text-[8px] mt-1 text-blue-500/50 uppercase">Active</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-200 uppercase font-mono tracking-tighter">
              {isWeekend ? 'Historical Data Preview' : 'Live Order Flow'}
            </h3>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isWeekend ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400 animate-pulse'}`}>
              {isWeekend ? 'MARKET CLOSED' : 'DATA STREAMING'}
            </span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isWeekend ? "#64748b" : "#3b82f6"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isWeekend ? "#64748b" : "#3b82f6"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={['auto', 'auto']} hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="price" stroke={isWeekend ? "#64748b" : "#3b82f6"} strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bias Component */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <h3 className="text-lg font-bold mb-4 uppercase text-slate-400 text-xs tracking-widest font-mono">Institutional Bias</h3>
          {analysis ? (
            <div className="space-y-6">
               <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-500 font-mono uppercase">Master Reading</p>
                <h4 className={`text-4xl font-black mt-1 ${analysis.bias === 'BULLISH' ? 'text-green-500' : 'text-red-500'}`}>
                  {analysis.bias}
                </h4>
                <div className="mt-3 w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${analysis.bias === 'BULLISH' ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${analysis.probability}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-400 mt-2 font-mono">CONFIDENCE: {analysis.probability}%</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(analysis.timeframeBreakdown).map(([tf, desc]) => (
                  <div key={tf} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">{tf}</p>
                    <p className="text-[10px] leading-tight font-semibold text-slate-300">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4 py-10">
              <div className={`w-12 h-12 border-2 border-dashed border-slate-700 rounded-full ${!isWeekend && 'animate-spin'}`}></div>
              <p className="text-[10px] font-mono leading-tight">
                {isWeekend 
                  ? 'ENGINE OFFLINE UNTIL MONDAY OPEN' 
                  : 'AWAITING USER COMMAND TO SCAN LIQUIDITY...'}
              </p>
            </div>
          )}
        </div>
      </div>

      {analysis && !isWeekend && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-blue-400 uppercase text-xs tracking-widest font-mono">Execution Parameters</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-600/10 border border-blue-500/30 rounded-xl">
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Window (SAST)</p>
                  <p className="text-sm font-mono font-black text-blue-400">{analysis.tradePlan.entryWindow}</p>
                </div>
                <div className="p-3 bg-purple-600/10 border border-purple-500/30 rounded-xl">
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Chart TF</p>
                  <p className="text-sm font-mono font-black text-purple-400">{analysis.tradePlan.executionTimeframe}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-slate-800 rounded-lg text-center">
                   <p className="text-[9px] text-slate-500 uppercase">Entry</p>
                   <p className="text-[11px] font-mono font-bold">{analysis.tradePlan.entry}</p>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg text-center border-b-2 border-red-500">
                   <p className="text-[9px] text-slate-500 uppercase">SL</p>
                   <p className="text-[11px] font-mono font-bold text-red-400">{analysis.tradePlan.stopLoss}</p>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg text-center border-b-2 border-green-500">
                   <p className="text-[9px] text-slate-500 uppercase">TP</p>
                   <p className="text-[11px] font-mono font-bold text-green-400">{analysis.tradePlan.takeProfit}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
             <h3 className="text-lg font-bold mb-2 text-slate-200 uppercase text-xs tracking-widest font-mono">Strategic Reasoning</h3>
             <p className="text-sm text-slate-400 italic leading-relaxed">
               "{analysis.tradePlan.reasoning}"
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignalLab;
