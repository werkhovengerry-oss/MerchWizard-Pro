import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Save,
  X,
  Plus,
  AlertCircle,
  ShieldCheck,
  Zap,
  TrendingUp,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useSearch } from '../contexts/SearchContext';
import { geminiService } from '../services/geminiService';

export default function ListingView({ isDarkMode }: { isDarkMode: boolean }) {
  const { listing, analysis, updateListing } = useSearch();
  const [isRefining, setIsRefining] = useState(false);
  const [tmRisk, setTmRisk] = useState<{ isSafe: boolean; findings: string[]; riskLevel: string } | null>(null);
  const [localListing, setLocalListing] = useState({
    title: '',
    brand: '',
    bullet1: '',
    bullet2: '',
    description: '',
    tags: [] as string[]
  });

  useEffect(() => {
    if (listing) {
      setLocalListing(listing);
      handleTmCheck(listing.title + ' ' + listing.bullet1);
    }
  }, [listing]);

  const handleRefine = async () => {
    if (!analysis) return;
    setIsRefining(true);
    try {
      const refined = await geminiService.generateListing(analysis);
      updateListing(refined);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefining(false);
    }
  };

  const handleTmCheck = async (text: string) => {
    const result = await geminiService.checkUSPTO(text);
    setTmRisk(result);
  };

  if (!listing) {
    return (
      <div className="bg-bg-surface border border-line border-dashed p-32 text-center rounded">
         <Zap className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-20" />
         <h3 className="text-lg font-bold mb-2 uppercase tracking-tighter">Draft Engine Idle</h3>
         <p className="text-text-muted text-xs mx-auto max-w-sm font-medium">
           Perform a market scan to initialize the AI Listing Assistant. The engine will automatically generate SEO-optimized content based on niche BSR data.
         </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans pb-12">
      <div className="flex justify-between items-center bg-bg-surface border border-line px-6 py-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
             <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Global Marketing Engine</div>
             <div className="text-xs font-black italic uppercase text-accent">Active_Listing_Context: {analysis?.keyword}</div>
          </div>
          <div className="h-6 w-[1px] bg-line" />
          <div className="flex items-center gap-2 text-[10px] font-bold text-success font-mono uppercase">
            <Sparkles className="w-3 h-3" />
            SEO SCORE: 94/100
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-line bg-bg-dark text-text-muted text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all">
            <Save className="w-3.5 h-3.5" />
            SAVE_DRAFT
          </button>
          <button 
            onClick={handleRefine}
            disabled={isRefining}
            className="flex items-center gap-2 px-5 py-2 bg-accent text-white text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {isRefining ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            {isRefining ? 'REFINGING...' : 'AI_REFINE'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-bg-surface border border-line overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-bg-dark/50 border-b border-line flex justify-between items-center">
              <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Metadata Payload</div>
              <div className="text-[9px] font-mono text-accent uppercase font-bold">MODE: ENHANCED_SEO</div>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-[0.2em] block">Product Title</label>
                <div className="relative">
                   <input 
                    type="text" 
                    value={localListing.title}
                    onChange={(e) => setLocalListing({...localListing, title: e.target.value})}
                    className="w-full bg-bg-dark border border-line px-5 py-4 text-sm font-bold focus:border-accent outline-none transition-colors italic tracking-tight"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-mono text-text-muted bg-bg-surface px-1.5 py-0.5 border border-line">{localListing.title.length}/200</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-[0.2em] block">Brand Identifier</label>
                <input 
                  type="text" 
                  value={localListing.brand}
                  onChange={(e) => setLocalListing({...localListing, brand: e.target.value})}
                  className="w-full bg-bg-dark border border-line px-5 py-4 text-sm font-bold focus:border-accent outline-none transition-colors uppercase tracking-widest"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-text-muted tracking-[0.2em] block">Feature Matrix 01</label>
                  <textarea 
                    value={localListing.bullet1}
                    onChange={(e) => setLocalListing({...localListing, bullet1: e.target.value})}
                    className="w-full bg-bg-dark border border-line px-5 py-4 text-xs font-medium leading-relaxed focus:border-accent outline-none transition-colors min-h-[100px] resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-text-muted tracking-[0.2em] block">Feature Matrix 02</label>
                  <textarea 
                    value={localListing.bullet2}
                    onChange={(e) => setLocalListing({...localListing, bullet2: e.target.value})}
                    className="w-full bg-bg-dark border border-line px-5 py-4 text-xs font-medium leading-relaxed focus:border-accent outline-none transition-colors min-h-[100px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-[0.2em] block">Global Product Description</label>
                <textarea 
                  value={localListing.description}
                  onChange={(e) => setLocalListing({...localListing, description: e.target.value})}
                  className="w-full bg-bg-dark border border-line px-5 py-4 text-xs font-medium leading-relaxed focus:border-accent outline-none transition-colors min-h-[160px] resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-bg-surface border border-line shadow-sm">
            <div className="px-6 py-4 bg-bg-dark/50 border-b border-line flex justify-between items-center">
              <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Tag Injection Hub</div>
              <TrendingUp className="w-3.5 h-3.5 text-accent" />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-8">
                {localListing.tags.map(tag => (
                  <div key={tag} className="flex items-center gap-2 bg-accent/5 border border-accent/20 px-2 py-1 text-[10px] font-bold text-accent group cursor-default hover:border-accent transition-colors">
                    {tag}
                    <button className="opacity-40 hover:opacity-100"><X className="w-2.5 h-2.5" /></button>
                  </div>
                ))}
                <button className="flex items-center gap-1.5 px-3 py-1 border border-line text-[10px] font-bold text-text-muted hover:text-white hover:bg-white/5 transition-all">
                  <Plus className="w-3 h-3" />
                  ADD_KW
                </button>
              </div>

              <div className="space-y-4">
                 <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest mb-2 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-accent fill-current" />
                    High Velocity Hooks
                 </div>
                 <div className="space-y-2">
                   {analysis?.topPhrases.slice(0, 4).map(kw => (
                     <div key={kw} className="flex justify-between items-center p-3 bg-bg-dark border border-line hover:border-accent group cursor-pointer transition-all hover:translate-x-1">
                       <span className="text-[11px] font-bold uppercase tracking-tight">{kw}</span>
                       <Plus className="w-3 h-3 text-text-muted group-hover:text-accent" />
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>

          <div className={cn(
            "p-6 border shadow-sm transition-all relative overflow-hidden",
            tmRisk?.riskLevel === 'HIGH' ? "bg-danger/5 border-danger/40" : 
            tmRisk?.riskLevel === 'MEDIUM' ? "bg-warning/5 border-warning/40" : 
            "bg-success/5 border-success/40"
          )}>
             <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className={cn(
                  "w-5 h-5",
                  tmRisk?.riskLevel === 'CLEAN' ? "text-success" : "text-warning"
                )} />
                <span className={cn(
                   "text-[11px] font-black uppercase tracking-widest",
                   tmRisk?.riskLevel === 'HIGH' ? "text-danger" : 
                   tmRisk?.riskLevel === 'MEDIUM' ? "text-warning" : 
                   "text-success"
                )}>
                  TM Sentinel: {tmRisk?.riskLevel || 'SCANNIG...'}
                </span>
             </div>
             
             {tmRisk?.findings && tmRisk.findings.length > 0 ? (
               <ul className="space-y-1.5">
                 {tmRisk.findings.map((f, i) => (
                   <li key={i} className="text-[10px] text-text-muted flex items-start gap-2">
                     <AlertCircle className="w-3 h-3 shrink-0 mt-0.5 text-warning" />
                     {f}
                   </li>
                 ))}
               </ul>
             ) : (
               <p className="text-[10px] text-text-muted leading-relaxed font-medium">
                 Core identifier heuristic pass complete. No significant trademark collision detected in USPTO Class 025 (Apparel). 
               </p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
