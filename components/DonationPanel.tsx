
import React, { useState } from 'react';

const CREATOR_ADDRESS = "0x497842D51EB7e7c9F810c39e57032063a6Ab893B";

const DonationPanel: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CREATOR_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 neon-border bg-gradient-to-br from-slate-900 to-green-950/20">
      <h3 className="text-lg font-bold text-green-400 mb-2 flex items-center gap-2">
        <i className="fas fa-heart text-red-500"></i>
        SUPPORT CREATOR
      </h3>
      <p className="text-sm text-slate-300 mb-4 leading-relaxed">
        Autonomous development is fueled by the community. Send ETH on <span className="text-blue-400 font-bold">Base</span> to support the evolution of this intelligence.
      </p>
      
      <div className="bg-black/40 p-3 rounded-lg border border-slate-700 mb-4 flex items-center justify-between group cursor-pointer" onClick={handleCopy}>
        <div className="truncate font-mono text-xs text-slate-400 mr-2">
          {CREATOR_ADDRESS}
        </div>
        <button className="text-green-400 hover:text-green-300 transition-colors">
          <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
        </button>
      </div>

      <a 
        href={`https://basescan.org/address/${CREATOR_ADDRESS}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full text-center py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition-all border border-slate-700"
      >
        VIEW ON BASESCAN
      </a>
      
      {copied && (
        <div className="mt-2 text-[10px] text-green-500 text-center animate-bounce">
          Address copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default DonationPanel;
