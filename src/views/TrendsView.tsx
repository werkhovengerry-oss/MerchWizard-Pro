import React from 'react';
import { 
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { mockTrends } from '../services/mockData';

export default function TrendsView({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="space-y-6 font-sans">
      <div className="bg-bg-surface border border-line">
        <div className="px-6 py-4 border-b border-line flex justify-between items-center">
          <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider">Visual Trend Velocity Index</div>
          <div className="flex gap-2">
            <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">REAL-TIME</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-line gap-[1px]">
          {mockTrends.map((trend) => (
            <div key={trend.id} className="bg-bg-dark p-6 hover:bg-white/[0.02] transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center font-bold text-accent text-xs border border-accent/30 bg-accent/5">
                    {trend.id.toString().padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight group-hover:text-accent transition-colors">/{trend.keyword}</h4>
                    <div className="text-[9px] uppercase font-bold text-text-muted mt-0.5 tracking-tighter">Market momentum</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-success text-[10px] font-bold font-mono bg-success/5 px-1.5 py-0.5 border border-success/10 rounded">
                  <ArrowUpRight className="w-3 h-3" />
                  {trend.growth}%
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-[40px] flex items-end gap-0.5 px-1 border-b border-line/50">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-accent/20 group-hover:bg-accent/40 rounded-t-sm transition-all"
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-text-muted">
                    <div className="flex items-center gap-2">
                      <span className="mono">VOL/</span>
                      <span className="text-white mono">{trend.searchVolume.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="mono">SCORE/</span>
                      <span className="text-white mono">{trend.sentimentScore}</span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-bg-surface border border-line overflow-hidden relative group">
            <div className="absolute inset-0 bg-accent opacity-[0.02] pointer-events-none" />
            <div className="px-6 py-4 border-b border-line flex justify-between items-center">
                <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider">Predictive Forecasting Matrix (2024-25)</div>
                <TrendingUp className="w-4 h-4 text-accent animate-pulse" />
            </div>
            <div className="p-8 flex flex-col items-center justify-center h-48 relative z-10">
                 <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
                 <div className="text-[11px] uppercase font-bold text-text-muted tracking-widest text-center">
                    Hydrating Neural Model...<br/>
                    <span className="text-[9px] opacity-50 mt-1 block">Analyzing 14.2M historic BSR data points</span>
                 </div>
            </div>
        </div>
        <div className="bg-bg-surface border border-line p-6 shadow-xl">
             <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider mb-6 pb-2 border-b border-line">Trend Saturation</div>
             <div className="space-y-4">
                <div className="p-3 bg-danger/5 border-l-2 border-danger rounded-r">
                    <div className="text-[9px] font-black text-danger mb-1 uppercase tracking-widest">SATURATED_PEAK</div>
                    <div className="text-xs font-bold text-white tracking-tight">"Retro Sunset 1984"</div>
                </div>
                <div className="p-3 bg-warning/5 border-l-2 border-warning rounded-r">
                    <div className="text-[9px] font-black text-warning mb-1 uppercase tracking-widest">LIMIT_APPROACHING</div>
                    <div className="text-xs font-bold text-white tracking-tight">"Botanical Line Art"</div>
                </div>
                <div className="p-3 bg-success/5 border-l-2 border-success rounded-r">
                    <div className="text-[9px] font-black text-success mb-1 uppercase tracking-widest">OPPORTUNITY</div>
                    <div className="text-xs font-bold text-white tracking-tight">"Post-Y2K Brutalism"</div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}
