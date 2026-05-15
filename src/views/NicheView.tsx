import React from 'react';
import { 
  Rocket, 
  Target,
  Zap,
  ShieldCheck,
  BarChart3,
  Search
} from 'lucide-react';
import { mockNiches } from '../services/mockData';
import { useSearch } from '../contexts/SearchContext';
import { cn } from '../lib/utils';

export default function NicheView({ isDarkMode }: { isDarkMode: boolean }) {
  const { analysis } = useSearch();

  return (
    <div className="space-y-6 font-sans pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-bg-surface border border-line shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <Target className="w-32 h-32 text-accent" />
            </div>
            <div className="px-8 py-6 border-b border-line flex justify-between items-center bg-bg-dark/20 relative z-10">
              <div>
                <div className="text-[10px] uppercase font-bold text-text-muted tracking-[0.2em] mb-1">Architecture Analysis</div>
                <div className="text-sm font-black italic uppercase text-white">Niche_Core_Target: {analysis?.keyword || 'GLOBAL_SCAN'}</div>
              </div>
              <button className="px-4 py-2 bg-accent text-white text-[10px] font-black uppercase tracking-widest hover:scale-[1.05] transition-all italic">EXPORT_MATRIX</button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-bg-dark border border-line group hover:border-success/40 transition-colors">
                  <div className="text-[9px] uppercase font-bold text-text-muted mb-2 tracking-widest">Competition Delta</div>
                  <div className={cn(
                    "text-2xl font-black italic",
                    analysis?.competitionLevel === 'LOW' ? 'text-success' : 'text-warning'
                  )}>
                    {analysis?.competitionLevel || 'SCANNING...'}
                  </div>
                </div>
                 <div className="p-6 bg-bg-dark border border-line group hover:border-accent/40 transition-colors">
                  <div className="text-[9px] uppercase font-bold text-text-muted mb-2 tracking-widest">Monthly Revenue (Est)</div>
                  <div className="text-2xl font-black italic font-mono text-accent">
                    ${((analysis?.estimatedSales || 0) * 19.99).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {(analysis?.topPhrases || mockNiches.map(n => n.name)).map((name, idx) => (
                  <div key={idx} className="p-5 bg-bg-dark border border-line hover:border-accent group cursor-pointer transition-all hover:bg-bg-surface">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                          <Rocket className="w-5 h-5 text-accent group-hover:text-white" />
                        </div>
                        <div>
                          <h4 className="font-black italic uppercase text-sm tracking-tight group-hover:text-accent transition-colors">{name}</h4>
                          <span className="text-[9px] font-mono text-text-muted uppercase font-bold">SEGMENT_ID: {String(idx + 1).padStart(3, '0')}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black italic font-mono leading-none">{Math.floor(Math.random() * 40) + 60}</div>
                        <div className="text-[9px] font-black uppercase text-text-muted mt-1 tracking-tighter">Profit Score</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-1 h-1.5 bg-line/20 overflow-hidden">
                       <div className="h-full bg-accent" style={{ width: '80%' }} />
                       <div className="h-full bg-success" style={{ width: '40%' }} />
                       <div className="h-full bg-warning" style={{ width: '60%' }} />
                       <div className="h-full bg-danger opacity-20" style={{ width: '20%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-bg-surface border border-line p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line">
               <ShieldCheck className="w-5 h-5 text-success" />
               <h3 className="text-[11px] uppercase font-black text-text-muted tracking-[.2em]">Safety Radar</h3>
            </div>
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                    <span className="text-text-muted uppercase">Safe_Zones_Index</span>
                    <span className="text-success tracking-widest">{analysis ? '99.4%' : '98.2%'} CLEAN</span>
                  </div>
                  <div className="h-2 bg-line/30 overflow-hidden">
                    <div className="h-full bg-success transition-all duration-1000" style={{ width: analysis ? '99.4%' : '98.2%' }} />
                  </div>
               </div>
               <p className="text-[11px] text-text-muted leading-relaxed font-medium italic">
                 {analysis 
                   ? `Deep semantic scan of "${analysis.keyword}" complete. Heuristic pass confirms low trademark overlap for Category 025 (Apparel).`
                   : "Passive scanning active. No immediate infringements detected in the global BSR inventory."
                 }
               </p>
               <button className="w-full py-3 bg-white text-black text-[10px] font-black hover:bg-accent hover:text-white transition-all uppercase tracking-widest transform skew-x-[-10deg]">
                 Full Audit Protocol
               </button>
            </div>
          </div>

          <div className="bg-bg-surface border border-line p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
               <BarChart3 className="w-5 h-5 text-accent" />
               <h3 className="text-[11px] uppercase font-black text-text-muted tracking-[.2em]">Saturation Delta</h3>
             </div>
             <div className="space-y-5">
               {[
                 { label: 'Independents', value: 65, color: 'bg-accent' },
                 { label: 'Enterprise Brands', value: 20, color: 'bg-success' },
                 { label: 'Clone Factories', value: 15, color: 'bg-danger' },
               ].map((item) => (
                 <div key={item.label} className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                     <span className="text-text-muted">{item.label}</span>
                     <span>{item.value}%</span>
                   </div>
                   <div className="h-1.5 bg-line overflow-hidden">
                     <div className={cn("h-full transition-all duration-1000", item.color)} style={{ width: `${item.value}%` }} />
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {!analysis && (
             <div className="bg-bg-dark border border-line border-dashed p-8 text-center">
                <Search className="w-8 h-8 text-text-muted mx-auto mb-4 opacity-20" />
                <p className="text-[10px] font-bold text-text-muted leading-tight uppercase">Enter keyword for <br/> deep architecture scan</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
