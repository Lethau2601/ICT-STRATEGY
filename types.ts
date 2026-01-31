
export type Asset = 'US30' | 'XAUUSD';

export interface ICTAnalysis {
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  probability: number;
  timeframeBreakdown: {
    weekly: string;
    daily: string;
    fourHour: string;
    oneHour: string;
  };
  keyZones: {
    fvg: string[];
    liquidityPools: string[];
    marketStructureShift: string;
  };
  tradePlan: {
    entry: string;
    stopLoss: string;
    takeProfit: string;
    entryWindow: string; // Market entry times in SAST
    executionTimeframe: string; // The specific timeframe for entry (e.g., 5m, 15m)
    reasoning: string;
  };
}

export interface SignalRecord {
  id: string;
  asset: Asset;
  date: string;
  timeSAST: string; // Added field for history
  type: 'BUY' | 'SELL';
  entry: number;
  tp: number;
  sl: number;
  status: 'TP' | 'SL' | 'OPEN';
  pips: number;
}
