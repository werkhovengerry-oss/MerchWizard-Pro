import React from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
  Filter,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../lib/utils';
import { mockProducts, mockNiches } from '../services/mockData';
import { useSearch } from '../contexts/SearchContext';

const bsrData = [
  { name: 'Mon', bsr: 45000 },
  { name: 'Tue', bsr: 42000 },
  { name: 'Wed', bsr: 38000 },
  { name: 'Thu', bsr: 41000 },
  { name: 'Fri', bsr: 35000 },
  { name: 'Sat', bsr: 32000 },
  { name: 'Sun', bsr: 30000 },
];

const StatCard = ({ title, value, change, isUp, icon: Icon }: any) => (
  <div className="bg-bg-dark p-6 border border-line hover:border-accent/40 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className="text-[10px] uppercase font-bold text-text-muted tracking-[0.2em]">{title}</div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded",
        isUp 
          ? "bg-success/10 text-success" 
          : "bg-danger/10 text-danger"
      )}>
        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}%
      </div>
    </div>
    <div className="flex items-center gap-3">
       <div className="text-3xl font-black font-mono text-white leading-none italic uppercase tracking-tighter">{value}</div>
       <Icon className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);

export default function DashboardView({ isDarkMode }: { isDarkMode: boolean }) {
  const { analysis, currentKeyword } = useSearch();

  return (
    <div className="space-y-6 pb-12">
      {/* Dynamic Header */}
      {analysis && (
        <div className="bg-accent p-8 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] pointer-events-none" />
           <div className="relative z-10">
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] mb-2">
                 <Zap className="w-4 h-4 fill-current" />
                 Active Target Lock
              </div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">
                {analysis.keyword}
              </h2>
              <div className="flex gap-4">
                 <div className="px-3 py-1 bg-white/10 border border-white/20 text-[10px] font-bold uppercase">BSR: {analysis.bsrEstimate}</div>
                 <div className="px-3 py-1 bg-white/10 border border-white/20 text-[10px] font-bold uppercase">VOL: {analysis.searchVolume.toLocaleString()}</div>
                 <div className="px-3 py-1 bg-white/10 border border-white/20 text-[10px] font-bold uppercase">RISK: {analysis.trademarkRisk}</div>
              </div>
           </div>
           <div className="relative z-10 text-center">
              <div className="text-7xl font-black italic tracking-tighter leading-none opacity-20 absolute -top-4 -left-8 pointer-events-none">KW</div>
              <div className="text-sm font-bold uppercase mb-1">Opportunity Score</div>
              <div className="text-6xl font-black italic leading-none">{analysis.opportunityScore}%</div>
           </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Global Sales Velocity" 
          value={analysis ? analysis.estimatedSales.toLocaleString() : "14.2K"} 
          change="24" 
          isUp={true} 
          icon={DollarSign}
        />
        <StatCard 
          title="Market Saturation" 
          value={analysis ? analysis.competitionLevel : "MED"} 
          change="8" 
          isUp={false} 
          icon={BarChart3}
        />
        <StatCard 
          title="SEO Keywords Found" 
          value={analysis ? analysis.topPhrases.length : "1.2K"} 
          change="12" 
          isUp={true} 
          icon={TrendingUp}
        />
        <StatCard 
          title="TM Integrity Index" 
          value="99.4%" 
          change="0" 
          isUp={true} 
          icon={ShieldAlert}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BSR Performance */}
        <div className="lg:col-span-2 p-8 bg-bg-surface border border-line shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <TrendingUp className="w-32 h-32 text-accent" />
          </div>
          <div className="flex justify-between items-center mb-12 relative z-10">
            <div>
              <div className="text-[10px] uppercase font-bold text-text-muted tracking-[0.2em] mb-2 italic">Historical BSR Velocity (Target: {currentKeyword || 'Global'})</div>
              <div className="text-3xl font-black italic tracking-tighter uppercase">Market Pulse Alpha</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-[10px] font-bold border border-line bg-bg-dark text-text-muted hover:text-white transition-all uppercase">Realtime</button>
              <button className="px-3 py-1.5 text-[10px] font-bold border border-accent bg-accent/10 text-accent uppercase">30D Window</button>
            </div>
          </div>
          
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bsrData}>
                <defs>
                  <linearGradient id="colorBsr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#2D3139" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8E9299', fontSize: 10, fontWeight: 'bold' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8E9299', fontSize: 10, fontWeight: 'bold' }}
                  reversed
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#14161B', 
                    borderColor: '#2D3139',
                    borderRadius: '0px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }} 
                />
                <Area 
                  type="stepAfter" 
                  dataKey="bsr" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBsr)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Niche Opportunities */}
        <div className="p-8 bg-bg-surface border border-line border-l-4 border-l-accent shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div className="text-[10px] uppercase font-bold text-text-muted tracking-[0.2em] italic">Trending_Sub_Clusters</div>
            <BarChart3 className="w-4 h-4 text-accent" />
          </div>
          <div className="space-y-3">
            {(analysis?.topPhrases || mockNiches.map(n => n.name)).slice(0, 8).map((name, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-bg-dark/50 border border-line hover:border-accent/40 cursor-pointer group transition-all hover:translate-x-1">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-text-muted opacity-50">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-xs font-black uppercase italic tracking-tighter group-hover:text-accent transition-colors">{name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-success">
                   <ArrowUpRight className="w-3 h-3" />
                   <span className="text-[10px] font-mono font-bold tracking-tighter">+{Math.floor(Math.random() * 200) + 50}%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all transform skew-x-[-10deg]">
            Deep Scrutiny Report
          </button>
        </div>
      </div>

      {/* Feed Update */}
      {!analysis && (
        <div className="bg-bg-dark border border-line p-12 text-center border-dashed group hover:border-accent/50 transition-colors">
           <Zap className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all" />
           <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">Zero Data Context</h3>
           <p className="text-text-muted text-xs mx-auto max-w-sm font-medium tracking-tight">
             Enter a seed keyword in the console header to hydrate the dashboard with realtime marketplace metrics, BSR velocity, and trademark safeguards.
           </p>
        </div>
      )}
    </div>
  );
}
