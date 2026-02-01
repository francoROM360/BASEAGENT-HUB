
import React from 'react';
import { MarketIntel } from '../types';

interface TerminalProps {
  intel: MarketIntel | null;
  loading: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ intel, loading }) => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[400px]">
      <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">System Intelligence Log</div>
      </div>
      <div className="p-6 font-mono text-sm overflow-y-auto flex-grow scrollbar-hide">
        {loading ? (
          <div className="flex flex-col gap-2 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
            <div className="h-4 bg-slate-700 rounded w-2/3 mt-4"></div>
            <div className="mt-8 text-green-400">Scanning Base nodes...</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
               <i className="fas fa-check-circle"></i> DATA_SYNC_SUCCESSFUL
            </div>
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {intel?.summary}
            </div>
            {intel?.sources && intel.sources.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-700">
                <h4 className="text-xs text-slate-500 uppercase mb-2">Grounding Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {intel.sources.map((s, i) => (
                    <a 
                      key={i} 
                      href={s.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-blue-400 px-2 py-1 rounded transition-colors truncate max-w-[200px]"
                    >
                      <i className="fas fa-external-link-alt mr-1"></i>
                      {s.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
