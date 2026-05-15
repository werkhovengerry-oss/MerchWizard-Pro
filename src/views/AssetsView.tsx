import React from 'react';
import { 
  FileImage,
  Upload as UploadIcon,
  Tag,
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AssetsView({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold mb-1 tracking-tight">Design & Vector Assets</h3>
          <p className="text-xs text-text-muted">Repository for pre-validated graphic elements and vector masters.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-[11px] font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors">
            <UploadIcon className="w-3.5 h-3.5" />
            Upload New Master
          </button>
           <button className="flex items-center gap-2 px-4 py-2 border border-line bg-bg-surface text-text-muted text-[11px] font-bold uppercase tracking-wider hover:text-white transition-colors">
            <Tag className="w-3.5 h-3.5" />
            Manage Tags
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-0.5 bg-line border border-line">
        {[
          { name: 'Retro Sunset Mesh', type: 'Vector', size: '2.4MB', color: 'bg-orange-600' },
          { name: 'Distressed Texture 04', type: 'Raster', size: '12.8MB', color: 'bg-gray-600' },
          { name: 'Kawaii Axolotl Base', type: 'Vector', size: '1.2MB', color: 'bg-pink-600' },
          { name: '80s Grid Pattern', type: 'Vector', size: '0.8MB', color: 'bg-indigo-600' },
          { name: 'Vintage Typography Set', type: 'Font', size: '4.5MB', color: 'bg-emerald-600' },
          { name: 'Floral Embellishments', type: 'Vector', size: '3.1MB', color: 'bg-rose-600' },
          { name: 'Abstract Geometric 01', type: 'Vector', size: '2.4MB', color: 'bg-blue-600' },
          { name: 'Neon Cyberpunk HUD', type: 'Vector', size: '5.6MB', color: 'bg-purple-600' },
          { name: 'Watercolor Splash 09', type: 'Raster', size: '18.2MB', color: 'bg-cyan-600' },
          { name: 'Minimalist Line Art', type: 'Vector', size: '0.9MB', color: 'bg-amber-600' },
          { name: 'Punk Rock Patches', type: 'Vector', size: '4.2MB', color: 'bg-red-600' },
          { name: 'Synthwave Gradients', type: 'Raster', size: '24.1MB', color: 'bg-fuchsia-600' },
        ].map((asset, idx) => (
          <div key={idx} className="bg-bg-dark p-4 group cursor-pointer hover:bg-white/[0.03] transition-colors flex flex-col h-full border-line">
            <div className={cn("aspect-square mb-4 rounded-sm relative overflow-hidden flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity", asset.color)}>
              <FileImage className="w-12 h-12 text-white/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="flex-1">
               <h4 className="font-bold text-xs mb-1 truncate group-hover:text-accent transition-colors">{asset.name}</h4>
               <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-text-muted">
                 <span>{asset.type}</span>
                 <span className="w-1 h-1 rounded-full bg-line" />
                 <span>{asset.size}</span>
               </div>
            </div>
            <div className="mt-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="flex-1 py-1.5 bg-line/20 hover:bg-line/40 text-[9px] font-bold uppercase transition-colors">Edit</button>
               <button className="flex-1 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent text-[9px] font-bold uppercase transition-colors">Use</button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-surface border border-line p-6">
            <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider mb-4">Batch Processing Queue</div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-bg-dark border border-line rounded">
                   <div className="w-8 h-8 rounded bg-line animate-pulse shrink-0" />
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-bold">Resizing_Job_{i}.zip</span>
                        <span className="text-[9px] font-mono text-accent">72%</span>
                      </div>
                      <div className="h-1 bg-line/20 rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-[72%]" />
                      </div>
                   </div>
                </div>
              ))}
            </div>
        </div>
        <div className="bg-bg-surface border border-line p-6 flex flex-col items-center justify-center border-dashed">
            <div className="w-12 h-12 bg-line/20 border border-line flex items-center justify-center rounded mb-4">
              <UploadIcon className="w-6 h-6 text-text-muted" />
            </div>
            <div className="text-sm font-bold mb-1">Drag and drop assets here</div>
            <div className="text-[10px] text-text-muted uppercase font-bold">AI will auto-tag and index for you</div>
        </div>
      </div>
    </div>
  );
}
