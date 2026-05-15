import React, { useState } from 'react';
import { 
  CloudUpload, 
  X, 
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function UploadView({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeBatch, setActiveBatch] = useState<number | null>(null);

  const batches = [
    { id: 1024, name: 'Retro Sunset Series 01', status: 'Processing', progress: 42, count: 50, date: '2024-05-15 14:20' },
    { id: 1025, name: 'Minimalist Line Art', status: 'Completed', progress: 100, count: 120, date: '2024-05-15 12:00' },
    { id: 1026, name: 'Vaporwave Aesthetic', status: 'Queued', progress: 0, count: 85, date: '2024-05-15 15:30' },
    { id: 1027, name: 'Kawaii Animals Pack', status: 'Error', progress: 12, count: 40, date: '2024-05-14 18:45' }
  ];

  return (
    <div className="space-y-6 font-sans pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-line bg-line gap-[1px]">
        <div className="bg-bg-dark p-4">
          <div className="text-[10px] uppercase font-bold text-text-muted mb-1">Upload Pipeline</div>
          <div className="text-xl font-bold italic text-accent">ACTIVE_MESH</div>
        </div>
        <div className="bg-bg-dark p-4">
          <div className="text-[10px] uppercase font-bold text-text-muted mb-1">Daily Cap Usage</div>
          <div className="text-xl font-bold italic text-white font-mono">245 / 500</div>
        </div>
        <div className="bg-bg-dark p-4">
          <div className="text-[10px] uppercase font-bold text-text-muted mb-1">Auto-Drafting</div>
          <div className="text-xl font-bold italic text-success uppercase font-black">Enabled</div>
        </div>
        <div className="bg-bg-dark p-4">
          <div className="text-[10px] uppercase font-bold text-text-muted mb-1">Queue Health</div>
          <div className="text-xl font-bold italic text-success uppercase font-black">Optimal</div>
        </div>
      </div>

      <div className="bg-bg-surface border border-line">
        <div className="px-6 py-4 border-b border-line flex justify-between items-center bg-bg-dark/20 text-[11px] uppercase font-bold text-text-muted tracking-wider">
          <span>Deployment Orchestration</span>
          <button className="bg-accent text-white px-4 py-1.5 rounded-sm hover:bg-accent/90 transition-colors">
            NEW_BATCH_INIT
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-dark/50 text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-line">
              <tr>
                <th className="px-6 py-3">Batch ID</th>
                <th className="px-6 py-3">Identifier / Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Throughput</th>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-mono font-bold text-text-muted">#{batch.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold tracking-tight">{batch.name}</div>
                    <div className="text-[10px] text-text-muted uppercase font-bold mt-0.5">{batch.count} Designs</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <div className="flex justify-between items-center text-[9px] font-bold uppercase">
                        <span className={cn(
                          batch.status === 'Processing' ? 'text-accent' :
                          batch.status === 'Completed' ? 'text-success' :
                          batch.status === 'Queued' ? 'text-text-muted' : 'text-danger'
                        )}>
                          {batch.status}
                        </span>
                        <span className="font-mono">{batch.progress}%</span>
                      </div>
                      <div className="h-1 bg-line/20 rounded-full overflow-hidden">
                        <div className={cn(
                          "h-full transition-all duration-500",
                          batch.status === 'Processing' ? 'bg-accent' :
                          batch.status === 'Completed' ? 'bg-success' :
                          batch.status === 'Queued' ? 'bg-line' : 'bg-danger'
                        )} style={{ width: `${batch.progress}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-[11px] text-text-muted">
                    {batch.status === 'Processing' ? '2.4 req/s' : '--'}
                  </td>
                  <td className="px-6 py-4 font-mono text-[10px] text-text-muted uppercase">
                    {batch.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 px-2 border border-line bg-bg-dark text-text-muted hover:text-white transition-colors text-[10px] font-bold">INFO</button>
                      <button className="p-1 px-2 border border-line bg-bg-dark text-text-muted hover:text-danger hover:border-danger transition-colors text-[10px] font-bold">KILL</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-12 border border-line border-dashed bg-bg-surface/50 rounded flex flex-col items-center justify-center text-center">
         <div className="w-12 h-12 bg-line/20 rounded-full flex items-center justify-center mb-4">
            <CloudUpload className="w-6 h-6 text-text-muted" />
         </div>
         <h4 className="font-bold text-sm mb-1 tracking-tight">Drop Batch CSV or Manifest</h4>
         <p className="text-[10px] text-text-muted uppercase font-black">Strict Schema Validation: ON</p>
      </div>
    </div>
  );
}
