import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Search, 
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { mockProducts } from '../services/mockData';
import { motion } from 'motion/react';

export default function ScannerView({ isDarkMode }: { isDarkMode: boolean }) {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scannedCount, setScannedCount] = useState(0);
  const totalPages = 400;

  useEffect(() => {
    let interval: any;
    if (isScanning && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + (Math.random() * 2);
          if (next >= 100) {
            setIsScanning(false);
            return 100;
          }
          return next;
        });
        setScannedCount(prev => Math.min(prev + Math.floor(Math.random() * 40), totalPages * 40));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isScanning, progress]);

  const handleStart = () => {
    if (progress >= 100) {
      setProgress(0);
      setScannedCount(0);
    }
    setIsScanning(true);
  };

  return (
    <div className="space-y-6">
      {/* Scanner Controls */}
      <div className="p-6 bg-bg-surface border border-line flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <div className="text-[11px] uppercase font-bold text-accent tracking-widest mb-1">Deep Marketplace Core</div>
          <h3 className="text-xl font-bold mb-3">Bulk Page Analyzer</h3>
          <p className="text-text-muted text-xs leading-relaxed mb-6">
            Scrutinizing 400 Amazon product pages simultaneously. Estimated throughput: 16,000+ listings. Using localized proxy mesh to avoid detection throttle.
          </p>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-success bg-success/5 border border-success/20 px-2 py-1 rounded">
              <CheckCircle2 className="w-3 h-3" />
              PROXY_STABLE
            </div>
            <div className="flex items-center gap-1.5 text-accent bg-accent/5 border border-accent/20 px-2 py-1 rounded">
              <Clock className="w-3 h-3" />
              T-MINUS: 05:20
            </div>
             <div className="flex items-center gap-1.5 text-text-muted bg-line/20 border border-line px-2 py-1 rounded">
              <Layers className="w-3 h-3" />
              BATCH_82
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 shrink-0 min-w-[200px]">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#2D3139"
                strokeWidth="2.5"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeDasharray="100, 100"
                animate={{ strokeDashoffset: 100 - progress }}
                strokeLinecap="square"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-mono">{Math.round(progress)}%</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-text-muted">Analyzing</span>
            </div>
          </div>

          <div className="flex gap-1 w-full">
            {!isScanning ? (
              <button 
                onClick={handleStart}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent text-white text-xs font-bold hover:bg-accent/90 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                {progress > 0 && progress < 100 ? 'RESUME' : 'INITIATE'}
              </button>
            ) : (
              <button 
                onClick={() => setIsScanning(false)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-warning text-white text-xs font-bold hover:bg-warning/90 transition-colors"
              >
                <Pause className="w-3 h-3 fill-current" />
                PAUSE
              </button>
            )}
            <button 
              onClick={() => { setProgress(0); setScannedCount(0); setIsScanning(false); }}
              className="px-3 py-2 border border-line bg-bg-surface text-text-muted hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Table Section */}
      <div className="bg-bg-surface border border-line">
        <div className="px-6 py-3 border-b border-line flex justify-between items-center bg-bg-dark/50">
          <div className="flex items-center gap-4">
            <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider">Scanned Inventory</div>
            <span className="text-[10px] mono font-bold text-accent">
              {scannedCount.toLocaleString()} / 16,000 LOADED
            </span>
          </div>
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-3 py-1.5 border border-line text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-white transition-colors">
                <Filter className="w-3 h-3" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-[10px] font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors">
                <Download className="w-3 h-3" />
                Batch Export
              </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-dark/80 text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-line">
              <tr>
                <th className="px-6 py-3 w-16">Preview</th>
                <th className="px-6 py-3">ASIN / Title</th>
                <th className="px-6 py-3">BSR (Rank)</th>
                <th className="px-6 py-3 text-center">Sales</th>
                <th className="px-6 py-3 text-center">Safety</th>
                <th className="px-6 py-3">Comp</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {mockProducts.map((product, idx) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-3">
                    <div className="w-10 h-10 bg-line rounded flex items-center justify-center overflow-hidden">
                      <img src={product.imageUrl} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div>
                      <div className="font-bold text-white text-xs mb-0.5">{product.asin}</div>
                      <div className="text-[11px] text-text-muted truncate w-48">{product.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      {product.bsr.toLocaleString()}
                      <ArrowUpRight className="w-3 h-3 text-success" />
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center font-mono text-xs text-accent">
                    {Math.round(product.estimatedSales / 30)}/day
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className="text-[10px] font-bold text-success bg-success/5 border border-success/20 px-1.5 py-0.5 rounded tracking-tighter">CLEAN</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={cn(
                      "comp-badge text-[9px] font-black italic",
                      product.id === '1' ? "text-success" : product.id === '2' ? "text-warning" : "text-danger"
                    )}>
                      {product.id === '1' ? 'LOW' : product.id === '2' ? 'MED' : 'HIGH'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <button className="w-7 h-7 flex items-center justify-center border border-line rounded bg-bg-dark text-text-muted hover:text-white transition-colors">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center border border-line rounded bg-bg-dark text-text-muted hover:text-white transition-colors">
                        <Search className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
