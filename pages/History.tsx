
import React from 'react';
import { MOCK_HISTORY } from '../constants';

const History: React.FC = () => {
  const totalPips = MOCK_HISTORY.reduce((acc, curr) => acc + curr.pips, 0);
  const winCount = MOCK_HISTORY.filter(s => s.status === 'TP').length;
  const winRate = (winCount / MOCK_HISTORY.length) * 100;

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Signal History</h2>
          <p className="text-slate-400">Tracking the 88-98% accuracy record founded by Lethau C.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-center">
             <p className="text-[10px] text-slate-500 uppercase font-bold">Total Pips (2026)</p>
             <p className="text-xl font-bold text-blue-400">+{totalPips}</p>
           </div>
           <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-center">
             <p className="text-[10px] text-slate-500 uppercase font-bold">Win Rate</p>
             <p className="text-xl font-bold text-green-400">{winRate.toFixed(1)}%</p>
           </div>
        </div>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50 text-[10px] uppercase tracking-widest text-slate-400 font-mono">
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Date / SAST</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Entry</th>
                <th className="px-6 py-4">TP / SL</th>
                <th className="px-6 py-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MOCK_HISTORY.map((signal) => (
                <tr key={signal.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${signal.asset === 'US30' ? 'bg-blue-600/20 text-blue-400' : 'bg-yellow-600/20 text-yellow-400'}`}>
                        {signal.asset === 'US30' ? 'DJ' : 'Au'}
                      </div>
                      <span className="font-bold">{signal.asset}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-200">{signal.date}</span>
                      <span className="text-xs text-blue-500 font-mono font-bold">{signal.timeSAST} SAST</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black tracking-widest ${signal.type === 'BUY' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {signal.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm">{signal.entry.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5 font-mono text-[10px]">
                      <span className="text-green-500/70">TP: {signal.tp.toLocaleString()}</span>
                      <span className="text-red-500/70">SL: {signal.sl.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`font-bold ${signal.status === 'TP' ? 'text-green-500' : 'text-red-500'}`}>
                        {signal.status === 'TP' ? '+' : ''}{signal.pips} Pips
                      </span>
                      <span className={`text-[10px] uppercase font-bold ${signal.status === 'TP' ? 'text-green-600/60' : 'text-red-600/60'}`}>
                        {signal.status === 'TP' ? 'Target Hit' : 'Stopped Out'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <div>
          <h4 className="text-lg font-bold text-blue-300">Strategy Integrity by Lethau C.</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Every entry tracked in this history represents a rigorous adherence to ICT order flow. 
            All timestamps are confirmed South African Time (SAST), ensuring full transparency for our 2026 performance record.
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;
