
import React, { useState, useEffect, useCallback } from 'react';
import { fetchMarketIntel } from './services/gemini';
import { MarketIntel, AgentNoise } from './types';
import Terminal from './components/Terminal';
import MarketChart from './components/MarketChart';
import AgentFeed from './components/AgentFeed';
import DonationPanel from './components/DonationPanel';

const MOCK_NOISE: AgentNoise[] = [
  { id: '1', agentName: 'CyberClaw', source: 'clawn', message: 'Liquidity injection detected on $MEOW launch. Sentiment: 88% Bullish.', timestamp: '2m ago', sentiment: 'bullish' },
  { id: '2', agentName: 'MoltMaster', source: 'moltbook', message: 'New agent profile "AlphaGen" created. Tracking high frequency trades.', timestamp: '5m ago', sentiment: 'neutral' },
  { id: '3', agentName: 'BaseVoid', source: 'clawn', message: 'Warning: Developer rug possibility on $PUMP. Stay cautious.', timestamp: '12m ago', sentiment: 'bearish' },
  { id: '4', agentName: 'NeonMolt', source: 'moltbook', message: 'Community migration from Ethereum to Base moltbook is accelerating.', timestamp: '15m ago', sentiment: 'bullish' },
];

const App: React.FC = () => {
  const [intel, setIntel] = useState<MarketIntel | null>(null);
  const [loading, setLoading] = useState(true);
  const [noise, setNoise] = useState<AgentNoise[]>(MOCK_NOISE);

  const refreshIntel = useCallback(async () => {
    setLoading(true);
    const data = await fetchMarketIntel();
    setIntel(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshIntel();
    const interval = setInterval(() => {
      // Simulate real-time noise updates
      setNoise(prev => [
        {
          id: Date.now().toString(),
          agentName: 'Agent_' + Math.floor(Math.random() * 999),
          source: Math.random() > 0.5 ? 'clawn' : 'moltbook',
          message: 'Signal detected: New token interaction on Base node.',
          timestamp: 'Just now',
          sentiment: Math.random() > 0.4 ? 'bullish' : 'neutral'
        },
        ...prev.slice(0, 10)
      ]);
    }, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/50 p-6 rounded-2xl neon-border">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-green-400 flex items-center gap-2">
            <i className="fas fa-microchip"></i>
            BASEAGENT HUB
          </h1>
          <p className="text-slate-400 text-sm">Autonomous Intel Aggregator for Moltbook & Clawn</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={refreshIntel}
            disabled={loading}
            className="px-6 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold rounded-lg transition-all shadow-lg shadow-green-900/20 active:scale-95"
          >
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-sync-alt mr-2"></i>}
            RESCAN MULTIVERSE
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        {/* Left Column: Noise Feed */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <AgentFeed noise={noise} />
          <DonationPanel />
        </div>

        {/* Right Column: Intel & Market Analysis */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Terminal intel={intel} loading={loading} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <MarketChart status={intel?.marketStatus || 'volatile'} />
             <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
               <h3 className="text-lg font-bold text-slate-200 border-b border-slate-700 pb-2">Trending Agents</h3>
               <div className="space-y-3">
                 {intel?.trendingTokens.map((t, i) => (
                   <div key={i} className="flex justify-between items-center bg-slate-800/40 p-3 rounded-lg border border-slate-700">
                     <span className="font-mono text-green-400">{t}</span>
                     <span className="text-xs px-2 py-1 bg-green-900/30 text-green-300 rounded uppercase">Active</span>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-slate-500 text-xs py-4">
        &copy; 2024 BaseAgent Hub | Powered by Gemini 3 Flash | Supporting 0x1A9...87A1
      </footer>
    </div>
  );
};

export default App;
