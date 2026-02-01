
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { time: '00:00', sentiment: 45 },
  { time: '04:00', sentiment: 52 },
  { time: '08:00', sentiment: 48 },
  { time: '12:00', sentiment: 70 },
  { time: '16:00', sentiment: 65 },
  { time: '20:00', sentiment: 85 },
  { time: '24:00', sentiment: 80 },
];

interface MarketChartProps {
  status: string;
}

const MarketChart: React.FC<MarketChartProps> = ({ status }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-200">Aggregate Sentiment</h3>
        <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${status === 'explosive' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
           {status}
        </span>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
              itemStyle={{ color: '#22c55e' }}
            />
            <Area 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#22c55e" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorSent)" 
                animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketChart;
