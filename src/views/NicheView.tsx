import React from 'react';
import { 
  Rocket,
  RocketIcon,
} from 'lucide-react';
import { mockNiches } from '../services/mockData';

export default function NicheView({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="space-y-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-bg-surface border border-line">
            <div className="px-6 py-4 border-b border-line flex justify-between items-center">
              <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider">High Profit Architecture Analysis</div>
              <div className="flex gap-1">
                <button className="px-3 py-1 bg-accent text-white text-[10px] font-bold uppercase transition-colors hover:bg-accent/90">Export Matrix</button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-bg-dark border border-line">
                  <div className="text-[10px] uppercase font-bold text-text-muted mb-1">Target Competition</div>
                  <div className="text-xl font-bold italic text-success">LOW / STRATEGIC</div>
                </div>
                 <div className="p-4 bg-bg-dark border border-line">
                  <div className="text-[10px] uppercase font-bold text-text-muted mb-1">Avg. Monthly Revenue</div>
                  <div className="text-xl font-bold italic text-accent font-mono">$12,402.00</div>
                </div>
              </div>
              <div className="space-y-2">
                {mockNiches.map(niche => (
                  <div key={niche.id} className="p-4 bg-bg-dark border border-line hover:border-accent transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 border border-accent/20 flex items-center justify-center">
                          <Rocket className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm group-hover:text-accent transition-colors tracking-tight">{niche.name}</h4>
                          <span className="text-[10px] font-mono text-text-muted uppercase">ID: {niche.id.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold font-mono leading-none">{niche.profitabilityScore}</div>
                        <div className="text-[9px] font-bold uppercase text-text-muted mt-1">Prof. Score</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-0.5 h-1 bg-line/20 rounded-full overflow-hidden">
                       <div className="h-full bg-accent" style={{ width: '80%' }} />
                       <div className="h-full bg-success" style={{ width: '40%' }} />
                       <div className="h-full bg-warning" style={{ width: '60%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-bg-surface border border-line p-6 shadow-sm">
            <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider mb-6 pb-2 border-b border-line">TM Safety Radar</div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-text-muted uppercase font-bold">Safe Zones</span>
                <span className="text-success font-bold tracking-wider">98.2% CLEAN</span>
              </div>
              <div className="h-1.5 bg-line/30 rounded-full overflow-hidden">
                <div className="h-full bg-success w-[98.2%]" />
              </div>
              <p className="text-[10px] text-text-muted leading-relaxed font-medium">
                Deep scanning complete. 2,400 keywords cross-referenced against USPTO records. No critical infringements detected in the top 50 BSR items. 
              </p>
              <button className="w-full py-2 border border-line bg-bg-dark text-text-muted text-[10px] font-bold hover:text-white transition-colors uppercase tracking-widest">
                Full Legal Report
              </button>
            </div>
          </div>

          <div className="bg-bg-surface border border-line p-6">
             <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider mb-4">Competitor Breakdown</div>
             <div className="space-y-3">
               {[
                 { label: 'Independents', value: 65, color: 'bg-accent' },
                 { label: 'Large Brands', value: 20, color: 'bg-success' },
                 { label: 'Copycats', value: 15, color: 'bg-danger' },
               ].map((item) => (
                 <div key={item.label} className="space-y-1">
                   <div className="flex justify-between text-[10px] font-bold uppercase">
                     <span className="text-text-muted">{item.label}</span>
                     <span>{item.value}%</span>
                   </div>
                   <div className="h-1 bg-line rounded-full overflow-hidden">
                     <div className={cn("h-full", item.color)} style={{ width: `${item.value}%` }} />
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
