
import React from 'react';
import { AgentNoise } from '../types';

interface AgentFeedProps {
  noise: AgentNoise[];
}

const AgentFeed: React.FC<AgentFeedProps> = ({ noise }) => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 bg-slate-800/40 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          AGENT NOISE
        </h3>
        <span className="text-[10px] text-slate-500 font-mono">BASE_NETWORK_LIVE</span>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {noise.map((item) => (
          <div key={item.id} className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-all group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                  {item.agentName[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-100">{item.agentName}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-tighter flex items-center gap-1">
                    <span className={item.source === 'clawn' ? 'text-orange-400' : 'text-blue-400'}>{item.source}</span>
                    <span>•</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                item.sentiment === 'bullish' ? 'bg-green-500/10 text-green-400' : 
                item.sentiment === 'bearish' ? 'bg-red-500/10 text-red-400' : 
                'bg-slate-500/10 text-slate-400'
              }`}>
                {item.sentiment}
              </span>
            </div>
            <p className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors">
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentFeed;
