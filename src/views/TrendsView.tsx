import React from 'react';
import { 
  ArrowUpRight,
  TrendingUp,
  Zap,
  Layers,
  Search,
  Activity
} from 'lucide-react';
import { cn } from '../lib/utils';
import { mockTrends } from '../services/mockData';
import { useSearch } from '../contexts/SearchContext';

export default function TrendsView({ isDarkMode }: { isDarkMode: boolean }) {
  const { analysis } = useSearch();

  return (
    <div className="space-y-6 font-sans pb-12">
      <div className="bg-bg-surface border border-line shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-line flex justify-between items-center bg-bg-dark/40">
          <div className="flex items-center gap-3">
             <Activity className="w-4 h-4 text-accent" />
             <div className="text-[10px] uppercase font-bold text-text-muted tracking-[0.3em]">Holographic_Trend_Pulse</div>
          </div>
          <div className="flex gap-2">
            <span className="text-[9px] font-black text-accent bg-accent/5 px-2 py-1 border border-accent/20 tracking-widest uppercase italic animate-pulse">Live_Feed_Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-line gap-[1px]">
          {(analysis ? [
            { id: 1, keyword: analysis.keyword, growth: 124, searchVolume: analysis.searchVolume, sentimentScore: 88 } as any,
            ...mockTrends.slice(0, 7)
          ] : mockTrends).map((trend, idx) => (
            <div key={idx} className="bg-bg-dark p-8 hover:bg-bg-surface transition-all group cursor-pointer relative overflow-hidden">
               {idx === 0 && analysis && (
                 <div className="absolute top-0 right-0 p-2">
                   <div className="bg-accent text-white text-[8px] font-black px-1.5 py-0.5 uppercase italic">Target_Match</div>
                 </div>
               )}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex flex-col gap-1">
                   <div className="text-[9px] font-mono text-accent font-bold opacity-50 group-hover:opacity-100 transition-opacity">SEQ_{String(idx + 1).padStart(3, '0')}</div>
                   <h4 className="font-black italic uppercase text-lg leading-none tracking-tighter group-hover:text-accent transition-colors">/{trend.keyword}</h4>
                </div>
                <div className="flex items-center gap-1 text-success text-[10px] font-black italic bg-success/5 px-2 py-1 border border-success/20 rounded-none">
                  <ArrowUpRight className="w-3 h-3" />
                  {trend.growth}%
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="h-[50px] flex items-end gap-[2px] border-b border-line/40 pb-1">
                  {[...Array(15)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-accent/10 group-hover:bg-accent/40 transition-all duration-300"
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center font-mono">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Velocity</span>
                      <span className="text-xs font-black text-white italic">{trend.searchVolume.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Sentiment</span>
                      <span className="text-xs font-black text-white italic">{trend.sentimentScore}%</span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-bg-surface border border-line overflow-hidden relative group p-12">
            <div className="absolute inset-0 bg-accent opacity-[0.03] pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
               <div className="w-32 h-32 flex items-center justify-center shrink-0">
                  <div className="absolute w-32 h-32 border border-accent/20 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute w-24 h-24 border border-accent/40 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
                  <Zap className="w-8 h-8 text-accent fill-current" />
               </div>
               <div className="flex-1 text-center md:text-left">
                  <div className="text-[10px] uppercase font-black text-accent tracking-[.3em] mb-3 italic flex items-center justify-center md:justify-start gap-2">
                    <Layers className="w-4 h-4" />
                    Neural_Trend_Engine_Sentry
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4 text-white">Aggregating Global Market Sentiment...</h3>
                  <p className="text-[11px] text-text-muted leading-relaxed max-w-xl font-medium">
                    Analysis protocol locked on <span className="text-white font-black italic">"{analysis?.keyword || 'GLOBAL_STREAM'}"</span>. Our vector-mapping index is currently reconciling BSR volatility with real-time social listening clusters to determine the next liquidity peak. E.T.A: T-Minus 4.2 Minutes.
                  </p>
               </div>
            </div>
        </div>

        <div className="bg-bg-surface border border-line p-8 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
                <TrendingUp className="w-16 h-16 text-accent" />
             </div>
             <div className="text-[10px] uppercase font-black text-text-muted tracking-[0.2em] mb-8 pb-4 border-b border-line italic">Saturation_Sentry</div>
             <div className="space-y-4">
                {[
                  { tag: 'CRITICAL_MAX', kw: 'Retro Sunset 1984', risk: 'bg-danger/10 border-danger/40 text-danger' },
                  { tag: 'PEAK_APPROACH', kw: 'Botanical Line Art', risk: 'bg-warning/10 border-warning/40 text-warning' },
                  { tag: 'UNDER_VALUE', kw: 'Cyber-Brutalist 01', risk: 'bg-success/10 border-success/40 text-success' },
                ].map((item, i) => (
                  <div key={i} className={cn("p-4 border italic group cursor-default hover:scale-[1.02] transition-transform", item.risk)}>
                     <div className="text-[8px] font-black mb-1 uppercase tracking-[.2em]">{item.tag}</div>
                     <div className="text-sm font-black text-white tracking-tighter uppercase leading-none">{item.kw}</div>
                  </div>
                ))}
             </div>
             {!analysis && (
                <div className="mt-8 pt-8 border-t border-line text-center">
                   <button className="flex items-center gap-2 text-[9px] font-black uppercase text-accent hover:text-white mx-auto transition-colors">
                      <Search className="w-3 h-3" />
                      Initialize Deep SCAN
                   </button>
                </div>
             )}
        </div>
      </div>
    </div>
  );
}
