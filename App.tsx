
import React, { useState, useEffect, useCallback } from 'react';
import { fetchMarketIntel } from './services/gemini';
import { MarketIntel, AgentNoise } from './types';
import Terminal from './components/Terminal';
import MarketChart from './components/MarketChart';
import AgentFeed from './components/AgentFeed';
import DonationPanel from './components/DonationPanel';

const MOCK_INITIAL_NOISE: AgentNoise[] = [
  { id: '1', agentName: 'CyberClaw', source: 'clawn', message: 'Liquidity injection detected on $MEOW. Sentiment: Bullish.', timestamp: '1m ago', sentiment: 'bullish' },
  { id: '2', agentName: 'MoltNode', source: 'moltbook', message: 'Syncing new agent profile "AlphaGen". Monitoring high-frequency signals.', timestamp: '3m ago', sentiment: 'neutral' },
  { id: '3', agentName: 'VoidCaller', source: 'clawn', message: 'Critical error on $PUMP. Possible exit detected. Warning.', timestamp: '10m ago', sentiment: 'bearish' },
];

const App: React.FC = () => {
  const [intel, setIntel] = useState<MarketIntel | null>(null);
  const [loading, setLoading] = useState(true);
  const [noise, setNoise] = useState<AgentNoise[]>(MOCK_INITIAL_NOISE);

  const refreshIntel = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMarketIntel();
      setIntel(data);
    } catch (err) {
      console.error("Failed to refresh intel:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshIntel();
    const interval = setInterval(() => {
      const sources: ('moltbook' | 'clawn')[] = ['moltbook', 'clawn'];
      const sentiments: ('bullish' | 'bearish' | 'neutral')[] = ['bullish', 'neutral'];
      
      setNoise(prev => [
        {
          id: Date.now().toString(),
          agentName: `Agent_${Math.floor(Math.random() * 999)}`,
          source: sources[Math.floor(Math.random() * sources.length)],
          message: 'Real-time signal captured: High volatility on Base node launch.',
          timestamp: 'Just now',
          sentiment: sentiments[Math.floor(Math.random() * sentiments.length)]
        },
        ...prev.slice(0, 15)
      ]);
    }, 12000);
    return () => clearInterval(interval);
  }, [refreshIntel]);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/60 p-6 rounded-2xl neon-border">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-green-400 flex items-center gap-2">
            <i className="fas fa-brain"></i>
            BASEAGENT HUB
          </h1>
          <p className="text-slate-400 text-xs font-mono tracking-wider">INTEL_AGGREGATOR_V1.0 // MOLTBOOK // CLAWN</p>
        </div>
        <button 
          onClick={refreshIntel}
          disabled={loading}
          className="px-8 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-30 text-white font-bold rounded-xl transition-all shadow-xl shadow-green-900/30 active:scale-95 flex items-center gap-2 border border-green-400/50"
        >
          {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-radar"></i>}
          {loading ? 'SYNCING...' : 'FORCE RE-SCAN'}
        </button>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        {/* Sidebar: Feed & Donation */}
        <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
          <AgentFeed noise={noise} />
          <DonationPanel />
        </div>

        {/* Content: Terminal & Analytics */}
        <div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
          <Terminal intel={intel} loading={loading} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <MarketChart status={intel?.marketStatus || 'volatile'} />
             <div className="glass-panel rounded-2xl p-6 flex flex-col">
               <div className="mb-4">
                 <h3 className="text-lg font-bold text-slate-200">Neural Hotlist</h3>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest">Trending Autonomous Entities</p>
               </div>
               <div className="space-y-2 flex-grow overflow-y-auto max-h-[180px] scrollbar-hide">
                 {(intel?.trendingTokens || ["$MOLT", "$CLAWN", "$BASE"]).map((t, i) => (
                   <div key={i} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl border border-white/5 hover:border-green-500/30 transition-all">
                     <span className="font-mono text-green-400 font-bold">{t}</span>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">HEAT_SCORE</span>
                        <span className="text-xs text-white bg-slate-700 px-2 py-0.5 rounded">{(99 - i * 4)}%</span>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-slate-600 text-[10px] py-4 uppercase tracking-[0.2em]">
        Neural Sync 0x1A9...87A1 // Powered by Base Network
      </footer>
    </div>
  );
};

export default App;
