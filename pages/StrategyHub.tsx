// StrategyHub.tsx
import React, { useState } from 'react';
import { getStrategyExplanation } from '../services/geminiService';

const CONCEPTS = [
  'Fair Value Gap (FVG)',
  'Market Structure Shift (MSS)',
  'Order Block (OB)',
  'Judas Swing',
  'Turtle Soup',
  'Power of Three (Accumulation, Manipulation, Distribution)',
];

const StrategyHub: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLearn = async (concept: string) => {
    setSelectedConcept(concept);
    setLoading(true);
    try {
      const result = await getStrategyExplanation(concept);
      setExplanation(result);
    } catch (error) {
      console.error(error);
      setExplanation("Could not fetch explanation. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight">Strategy Hub</h2>
        <p className="text-slate-400">Mastering the Inner Circle Trader (ICT) Methodology</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Concepts */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest px-2">Core Concepts</h3>
          {CONCEPTS.map((concept) => (
            <button
              key={concept}
              onClick={() => handleLearn(concept)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                selectedConcept === concept 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {concept}
            </button>
          ))}
        </div>

        {/* Explanation Area */}
        <div className="lg:col-span-3 min-h-[500px] bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-blue-400 font-mono animate-pulse">Consulting Michael's Logic...</p>
              </div>
            </div>
          ) : explanation ? (
            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                {selectedConcept}
              </h3>
              <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-sans text-lg">
                {explanation}
              </div>
              <div className="mt-12 p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                <h4 className="text-sm font-mono text-slate-500 uppercase mb-4">Application for Gold/US30</h4>
                <p className="text-sm text-slate-400">
                  Always look for these patterns during the London Open (02:00-05:00 EST) or the NY Open (07:00-10:00 EST). 
                  US30 is highly sensitive to the AM and PM silver bullet sessions. Gold respects liquidity pools after heavy news drops (CPI, NFP).
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 opacity-40">
              <svg className="w-20 h-20 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <p className="max-w-xs mx-auto">Select a concept from the sidebar to view detailed institutional breakdown.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategyHub;
