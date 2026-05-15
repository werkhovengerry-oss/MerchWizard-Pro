import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Search, 
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { useSearch } from '../contexts/SearchContext';

export default function ScannerView({ isDarkMode }: { isDarkMode: boolean }) {
  const { analysis, currentKeyword, isScanning, performSearch } = useSearch();
  const [localKeyword, setLocalKeyword] = useState('');

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localKeyword.trim()) {
      performSearch(localKeyword.trim());
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Console */}
      <div className="p-8 bg-bg-surface border border-line relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-accent tracking-[.2em] mb-4">
              <Zap className="w-3 h-3 fill-current" />
              Vector-Engine v5.0 Active
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tighter leading-none italic uppercase">
              Omni-Niche <br/> <span className="text-accent underline decoration-white/10">Scanner</span>
            </h3>
            <p className="text-text-muted text-xs leading-relaxed mb-8 max-w-sm">
              Cross-referencing historical BSR, search volume velocity, and competitive saturation across Amazon, Redbubble, and Google Trends.
            </p>

            <form onSubmit={handleManualSearch} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter seed keyword (e.g. 'Kawaii Axolotl')..."
                value={localKeyword}
                onChange={(e) => setLocalKeyword(e.target.value)}
                className="flex-1 bg-bg-dark border border-line h-12 px-5 text-sm font-bold placeholder:opacity-30 focus:border-accent outline-none transition-all"
              />
              <button 
                type="submit"
                disabled={isScanning}
                className="bg-accent text-white px-8 font-black uppercase text-xs tracking-widest hover:bg-black hover:text-accent transition-all disabled:opacity-50"
              >
                {isScanning ? 'Scrutinizing...' : 'Run Analysis'}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {[
               { label: 'Cloud Status', value: 'SYMMETRIC_UP', icon: CheckCircle2, color: 'text-success' },
               { label: 'Query Nodes', value: '42 Active', icon: Layers, color: 'text-accent' },
               { label: 'IP Reputation', value: '99.9% Elite', icon: ShieldCheck, color: 'text-success' },
               { label: 'ETA Baseline', value: '< 2.4 Seconds', icon: Clock, color: 'text-text-muted' },
             ].map((stat, i) => (
               <div key={i} className="bg-bg-dark/50 border border-line p-4 group hover:border-accent/40 transition-colors">
                  <stat.icon className={cn("w-4 h-4 mb-3", stat.color)} />
                  <div className="text-[9px] uppercase font-bold text-text-muted mb-1">{stat.label}</div>
                  <div className="text-xs font-mono font-bold">{stat.value}</div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {isScanning && (
        <div className="bg-bg-surface border border-line p-12 text-center space-y-4">
           <div className="flex justify-center">
             <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
           </div>
           <div className="text-[10px] font-bold uppercase tracking-widest animate-pulse">De-identifying target metadata...</div>
        </div>
      )}

      {analysis && !isScanning && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Analysis Core */}
          <div className="lg:col-span-3 space-y-6">
             <div className="bg-bg-surface border border-line">
                <div className="px-6 py-4 border-b border-line flex justify-between items-center bg-bg-dark/20 font-mono">
                   <div className="text-[10px] font-bold text-text-muted uppercase">REALTIME_MARKET_REPORT: {analysis.keyword}</div>
                   <div className="text-[10px] font-bold text-success uppercase">CONFIDENCE: 98.4%</div>
                </div>
                
                <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                   <div className="space-y-1">
                      <div className="text-[9px] uppercase font-bold text-text-muted">Estimated BSR</div>
                      <div className="text-2xl font-black italic">{analysis.bsrEstimate}</div>
                      <div className="text-[10px] font-bold text-success">TOP 1% CATEGORY</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-[9px] uppercase font-bold text-text-muted">Search Volume</div>
                      <div className="text-2xl font-black italic">{analysis.searchVolume.toLocaleString()}</div>
                      <div className="text-[10px] font-bold text-accent">Monthly Velocity</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-[9px] uppercase font-bold text-text-muted">Competition</div>
                      <div className={cn(
                        "text-2xl font-black italic",
                        analysis.competitionLevel === 'LOW' ? 'text-success' : analysis.competitionLevel === 'MEDIUM' ? 'text-warning' : 'text-danger'
                      )}>
                        {analysis.competitionLevel}
                      </div>
                      <div className="text-[10px] font-bold text-text-muted">Saturation Level</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-[9px] uppercase font-bold text-text-muted">Risk Profile</div>
                      <div className={cn(
                        "text-2xl font-black italic",
                        analysis.trademarkRisk === 'CLEAN' ? 'text-success' : 'text-danger'
                      )}>
                        {analysis.trademarkRisk}
                      </div>
                      <div className="text-[10px] font-bold text-text-muted uppercase">Legal Safeguard</div>
                   </div>
                </div>

                <div className="px-8 pb-8 flex flex-wrap gap-2">
                   {analysis.topPhrases.map((phrase, i) => (
                     <div key={i} className="px-3 py-1.5 bg-bg-dark border border-line text-[10px] font-bold uppercase tracking-wider hover:border-accent cursor-default transition-colors">
                        {phrase}
                     </div>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-bg-surface border border-line p-6">
                   <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <h4 className="font-bold text-sm uppercase tracking-tight">Growth Trajectory</h4>
                   </div>
                   <div className="h-48 flex items-end gap-1.5">
                      {[40, 20, 60, 45, 80, 55, 90, 70, 85, 100, 95, 120].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-accent/20 hover:bg-accent transition-colors relative group"
                          style={{ height: `${h}%` }}
                        >
                           <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black px-1.5 py-0.5 rounded text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                             +{h}%
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="mt-4 flex justify-between text-[8px] font-bold text-text-muted uppercase font-mono">
                      <span>Jan '24</span>
                      <span>Trend Cycle Alpha</span>
                      <span>Dec '24</span>
                   </div>
                </div>

                <div className="bg-bg-surface border border-line p-6">
                   <div className="flex items-center gap-3 mb-6">
                      <Target className="w-5 h-5 text-warning" />
                      <h4 className="font-bold text-sm uppercase tracking-tight">Opportunity Insight</h4>
                   </div>
                   <div className="space-y-4">
                      <p className="text-[11px] text-text-muted leading-relaxed italic">
                        "The niche for <span className="text-white font-bold">{analysis.keyword}</span> shows high concentration in 'Funny' styles but remains virtually untapped for 'Minimalist Vector' aesthetics. CPC is hovering around $0.85, suggesting low ad resistance."
                      </p>
                      <div className="p-4 bg-bg-dark border border-line">
                         <div className="text-[9px] uppercase font-bold text-text-muted mb-2">Opportunity Score</div>
                         <div className="flex items-center gap-4">
                            <div className="flex-1 h-2 bg-line rounded-full overflow-hidden">
                               <div className="h-full bg-success" style={{ width: `${analysis.opportunityScore}%` }} />
                            </div>
                            <span className="text-xl font-black italic text-success">{analysis.opportunityScore}%</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-6">
             <div className="bg-bg-surface border border-line p-6">
                <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest mb-4">Commercial Insight</div>
                <div className="space-y-6">
                   <div className="pb-4 border-b border-line">
                      <div className="text-[9px] font-bold text-text-muted uppercase mb-1">Avg Price Point</div>
                      <div className="text-2xl font-black text-white">$19.99</div>
                   </div>
                   <div className="pb-4 border-b border-line">
                      <div className="text-[9px] font-bold text-text-muted uppercase mb-1">Est. Monthly Sales</div>
                      <div className="text-2xl font-black text-white">{analysis.estimatedSales.toLocaleString()} units</div>
                   </div>
                   <div>
                      <div className="text-[9px] font-bold text-text-muted uppercase mb-1">Seasonal Peak</div>
                      <div className="text-sm font-bold text-accent uppercase">Q4 / Holiday Season</div>
                   </div>
                </div>
             </div>

             <div className="bg-accent p-6 text-white group cursor-pointer hover:bg-black transition-all">
                <div className="flex justify-between items-start mb-4">
                   <Zap className="w-6 h-6 fill-current group-hover:text-accent" />
                   <ArrowUpRight className="w-5 h-5 group-hover:text-accent" />
                </div>
                <h4 className="text-lg font-black uppercase italic leading-none group-hover:text-accent">AutoDraft <br/> Listing</h4>
                <p className="text-[10px] mt-2 font-bold opacity-70 group-hover:text-accent">
                   Generate SEO listing content for this niche immediately.
                </p>
             </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!analysis && !isScanning && (
        <div className="bg-bg-surface border border-line border-dashed p-32 text-center">
           <div className="w-20 h-20 bg-line/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-text-muted" />
           </div>
           <h3 className="text-lg font-bold mb-2">No Market Data Locked</h3>
           <p className="text-text-muted text-xs mx-auto max-w-sm">
             Initiate a search from the header console or use the terminal above to lock onto a specific niche for analysis.
           </p>
        </div>
      )}
    </div>
  );
}
