
import { SignalRecord } from './types';

export const ASSETS = [
  { id: 'US30', name: 'Dow Jones Industrials', symbol: 'US30' },
  { id: 'XAUUSD', name: 'Gold / US Dollar', symbol: 'XAU/USD' },
];

export const MOCK_HISTORY: SignalRecord[] = [
  { id: '1', asset: 'XAUUSD', date: '2026-03-15', timeSAST: '15:45', type: 'BUY', entry: 2445.50, tp: 2460.00, sl: 2438.00, status: 'TP', pips: 145 },
  { id: '2', asset: 'US30', date: '2026-03-14', timeSAST: '16:30', type: 'SELL', entry: 48950, tp: 48500, sl: 49100, status: 'TP', pips: 450 },
  { id: '3', asset: 'XAUUSD', date: '2026-03-13', timeSAST: '10:15', type: 'SELL', entry: 2410.20, tp: 2400.00, sl: 2415.00, status: 'SL', pips: -48 },
  { id: '4', asset: 'US30', date: '2026-03-12', timeSAST: '15:30', type: 'BUY', entry: 48200, tp: 48600, sl: 48100, status: 'TP', pips: 400 },
  { id: '5', asset: 'XAUUSD', date: '2026-03-10', timeSAST: '16:00', type: 'BUY', entry: 2395.00, tp: 2410.00, sl: 2388.00, status: 'TP', pips: 150 },
];
