import React from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
  Filter
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';
import { mockProducts, mockNiches } from '../services/mockData';

const bsrData = [
  { name: 'Mon', bsr: 45000 },
  { name: 'Tue', bsr: 42000 },
  { name: 'Wed', bsr: 38000 },
  { name: 'Thu', bsr: 41000 },
  { name: 'Fri', bsr: 35000 },
  { name: 'Sat', bsr: 32000 },
  { name: 'Sun', bsr: 30000 },
];

const salesData = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 600 },
  { name: 'Apr', sales: 800 },
  { name: 'May', sales: 500 },
];

const StatCard = ({ title, value, change, isUp, icon: Icon, isDarkMode }: any) => (
  <div className="bg-bg-dark p-4 border border-line">
    <div className="flex justify-between items-start mb-2">
      <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider">{title}</div>
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
    <div className="text-2xl font-semibold font-mono text-white leading-none">{value}</div>
  </div>
);

export default function DashboardView({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-line bg-line gap-[1px]">
        <StatCard 
          title="Daily Sales (Est.)" 
          value="1,240" 
          change="12" 
          isUp={true} 
          icon={DollarSign}
          isDarkMode={isDarkMode}
        />
        <StatCard 
          title="Avg. BSR (Top 50)" 
          value="142,509" 
          change="8" 
          isUp={true} 
          icon={TrendingUp}
          isDarkMode={isDarkMode}
        />
        <StatCard 
          title="Niches Analyzed" 
          value="16,402" 
          change="4" 
          isUp={true} 
          icon={BarChart3}
          isDarkMode={isDarkMode}
        />
        <StatCard 
          title="TM Safe Score" 
          value="98.2%" 
          change="2" 
          isUp={true} 
          icon={Users}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BSR Performance */}
        <div className="lg:col-span-2 p-6 bg-bg-surface border border-line">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider mb-1">Historical BSR Velocity (30D)</div>
              <div className="text-xl font-bold">AVG. 142k</div>
            </div>
            <div className="flex gap-1">
              <button className="px-2 py-1 text-[10px] font-bold border border-line bg-bg-dark text-text-muted hover:text-white transition-colors">1D</button>
              <button className="px-2 py-1 text-[10px] font-bold border border-line bg-bg-dark text-text-muted hover:text-white transition-colors">7D</button>
              <button className="px-2 py-1 text-[10px] font-bold border border-accent bg-accent/10 text-accent">30D</button>
            </div>
          </div>
          
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bsrData}>
                <defs>
                  <linearGradient id="colorBsr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D3139" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8E9299', fontSize: 10, fontFamily: 'monospace' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8E9299', fontSize: 10, fontFamily: 'monospace' }}
                  reversed
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#14161B', 
                    borderColor: '#2D3139',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="bsr" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorBsr)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Niche Opportunities */}
        <div className="p-6 bg-bg-surface border border-line">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider">Top Predicted Keywords</div>
            <Filter className="w-4 h-4 text-text-muted" />
          </div>
          <div className="space-y-1">
            {mockNiches.map((niche, idx) => (
              <div key={niche.id} className="flex justify-between items-center p-2 rounded hover:bg-white/[0.02] cursor-pointer group transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-text-muted">{idx + 1}.</span>
                  <span className="text-sm font-medium group-hover:text-accent transition-colors">{niche.name}</span>
                </div>
                <div className={cn(
                  "text-[11px] font-bold font-mono",
                  niche.trending === 'up' ? "text-success" : "text-text-muted"
                )}>
                  {niche.trending === 'up' ? '+' : ''}{Math.floor(Math.random() * 200) + 50}%
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 border border-line bg-bg-dark text-text-muted text-[11px] font-bold hover:text-white transition-all uppercase tracking-wider">
            Explore All Trends
          </button>
        </div>
      </div>

      {/* Recent Successes */}
      <div className="bg-bg-surface border border-line">
        <div className="px-6 py-4 border-b border-line">
          <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider">Market Intelligence Feed</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-dark text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-line">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">ASIN / Identity</th>
                <th className="px-6 py-3">BSR Velocity</th>
                <th className="px-6 py-3 text-center">Sales (Est)</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-line rounded overflow-hidden">
                        <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-medium truncate max-w-[200px]">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-[11px] font-mono text-text-muted">{product.asin}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold">#{product.bsr.toLocaleString()}</span>
                      <span className="text-[10px] text-success">↑ 4.2%</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className="text-[11px] font-mono font-bold text-accent">{product.estimatedSales}/day</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <button className="p-1 border border-line rounded text-text-muted hover:text-white hover:bg-line transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
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
