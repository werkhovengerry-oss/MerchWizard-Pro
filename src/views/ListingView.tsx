import React, { useState } from 'react';
import { 
  Sparkles, 
  Save,
  X,
  Plus,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ListingView({ isDarkMode }: { isDarkMode: boolean }) {
  const [listingData, setListingData] = useState({
    title: 'Vintage Retro 1984 Sunset - Aged Aesthetic',
    brand: 'Retro Vibes Collective',
    bullet1: 'Premium 1984 retro sunset design perfect for 80s aesthetic lovers.',
    bullet2: 'High-quality distressed texture for a genuine vintage look and feel.',
    description: 'Elevate your wardrobe with this authentic 1980s inspired retro sunset design. Featuring a classic vaporwave color palette with professionally distressed textures, this design captures the essence of the golden era of arcade culture and synthwave music.',
    tags: ['Retro', '1984', 'Sunset', 'Vintage', '80s', 'Vaporwave']
  });

  return (
    <div className="space-y-6 font-sans pb-12">
      <div className="flex justify-between items-center bg-bg-surface border border-line px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider">AI Optimizer Engine v4.2</div>
          <div className="h-4 w-[1px] bg-line" />
          <div className="flex items-center gap-2 text-[10px] font-bold text-success font-mono uppercase">
            <Sparkles className="w-3 h-3" />
            SEO Score: 94/100
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-line bg-bg-dark text-text-muted text-[10px] font-bold uppercase tracking-wider hover:text-white transition-colors">
            <Save className="w-3.5 h-3.5" />
            Save Draft
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-[10px] font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors">
            <Sparkles className="w-3.5 h-3.5" />
            Auto-Refine
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-bg-surface border border-line overflow-hidden">
            <div className="px-6 py-3 bg-bg-dark/50 border-b border-line">
              <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Metadata Configuration</div>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">Product Title (Max 200 Characters)</label>
                <div className="relative">
                   <input 
                    type="text" 
                    value={listingData.title}
                    onChange={(e) => setListingData({...listingData, title: e.target.value})}
                    className="w-full bg-bg-dark border border-line px-4 py-3 text-sm font-medium focus:border-accent outline-none transition-colors"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-text-muted">{listingData.title.length}/200</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">Brand Name</label>
                <input 
                  type="text" 
                  value={listingData.brand}
                  onChange={(e) => setListingData({...listingData, brand: e.target.value})}
                  className="w-full bg-bg-dark border border-line px-4 py-3 text-sm font-medium focus:border-accent outline-none transition-colors"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-line">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">Key Feature Bullet 1</label>
                  <textarea 
                    value={listingData.bullet1}
                    onChange={(e) => setListingData({...listingData, bullet1: e.target.value})}
                    className="w-full bg-bg-dark border border-line px-4 py-3 text-sm font-medium focus:border-accent outline-none transition-colors min-h-[80px] resize-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">Key Feature Bullet 2</label>
                  <textarea 
                    value={listingData.bullet2}
                    onChange={(e) => setListingData({...listingData, bullet2: e.target.value})}
                    className="w-full bg-bg-dark border border-line px-4 py-3 text-sm font-medium focus:border-accent outline-none transition-colors min-h-[80px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">Product Description</label>
                <textarea 
                  value={listingData.description}
                  onChange={(e) => setListingData({...listingData, description: e.target.value})}
                  className="w-full bg-bg-dark border border-line px-4 py-3 text-sm font-medium focus:border-accent outline-none transition-colors min-h-[140px] resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-bg-surface border border-line">
            <div className="px-6 py-3 bg-bg-dark/50 border-b border-line">
              <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Keyword Injection Pool</div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {listingData.tags.map(tag => (
                  <div key={tag} className="flex items-center gap-2 bg-accent/5 border border-accent/20 px-2 py-1 text-[10px] font-bold text-accent group cursor-default">
                    {tag}
                    <button className="opacity-40 hover:opacity-100"><X className="w-2.5 h-2.5" /></button>
                  </div>
                ))}
                <button className="flex items-center gap-1.5 px-2 py-1 border border-line text-[10px] font-bold text-text-muted hover:text-white transition-colors">
                  <Plus className="w-3 h-3" />
                  ADD_KW
                </button>
              </div>

              <div className="space-y-4">
                 <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest mb-2">High Velocity Suggestions</div>
                 <div className="space-y-2">
                   {['Vintage 1984', 'Retro Aesthetic', 'Vaporwave Fashion'].map(kw => (
                     <div key={kw} className="flex justify-between items-center p-2 bg-bg-dark border border-line hover:border-accent group cursor-pointer transition-colors">
                       <span className="text-xs font-medium">{kw}</span>
                       <Plus className="w-3 h-3 text-text-muted group-hover:text-accent" />
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-surface border border-line p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-warning" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-warning">TM Alert Risk: LOW</span>
             </div>
             <p className="text-[10px] text-text-muted leading-relaxed">
               All core identifiers passed heuristic checks. No matches found in registered trademark databases for "1984 Retro Sunset" in Category 025.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
