
import React from 'react';

interface MarketChartProps {
  status: string;
}

const MarketChart: React.FC<MarketChartProps> = ({ status }) => {
  // Simulated data points for the SVG chart
  const points = [40, 35, 55, 45, 70, 60, 85, 80];
  const max = 100;
  const width = 300;
  const height = 150;

  const getPath = () => {
    return points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - (p / max) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const getAreaPath = () => {
    const p = getPath();
    return `${p} L ${width} ${height} L 0 ${height} Z`;
  };

  return (
    <div className="glass-panel rounded-2xl p-6 h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-200">Neural Sentiment</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Base Aggregation Layer</p>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded font-black uppercase tracking-tighter ${status === 'explosive' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
           {status}
        </span>
      </div>
      
      <div className="flex-grow relative flex items-center justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Grid lines */}
          <line x1="0" y1={height*0.25} x2={width} y2={height*0.25} stroke="#1e293b" strokeDasharray="4 4" />
          <line x1="0" y1={height*0.5} x2={width} y2={height*0.5} stroke="#1e293b" strokeDasharray="4 4" />
          <line x1="0" y1={height*0.75} x2={width} y2={height*0.75} stroke="#1e293b" strokeDasharray="4 4" />
          
          {/* Area under the line */}
          <path d={getAreaPath()} fill="url(#gradient)" opacity="0.3" />
          
          {/* Main path line */}
          <path 
            d={getPath()} 
            fill="none" 
            stroke="#22c55e" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
          />
          
          {/* Data points */}
          {points.map((p, i) => (
            <circle 
              key={i} 
              cx={(i / (points.length - 1)) * width} 
              cy={height - (p / max) * height} 
              r="4" 
              fill="#020617" 
              stroke="#22c55e" 
              strokeWidth="2" 
            />
          ))}

          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-mono">
        <span>T-24H</span>
        <span>CURRENT_BLOCK</span>
      </div>
    </div>
  );
};

export default MarketChart;
