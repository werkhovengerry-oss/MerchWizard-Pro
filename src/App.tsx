/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Zap, 
  TrendingUp, 
  FolderHeart, 
  FilePlus2, 
  Upload, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Github,
  ExternalLink,
  ShieldCheck,
  PackageSearch
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Placeholder components for the tabs
import DashboardView from './views/DashboardView';
import NicheView from './views/NicheView';
import ScannerView from './views/ScannerView';
import TrendsView from './views/TrendsView';
import AssetsView from './views/AssetsView';
import ListingView from './views/ListingView';
import UploadView from './views/UploadView';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: DashboardView },
  { id: 'niche', label: 'Niche Research', icon: Search, component: NicheView },
  { id: 'scanner', label: 'Bulk Scanner', icon: Zap, component: ScannerView },
  { id: 'trends', label: 'Trend Analyzer', icon: TrendingUp, component: TrendsView },
  { id: 'assets', label: 'Asset Manager', icon: FolderHeart, component: AssetsView },
  { id: 'listing', label: 'Listing Assistant', icon: FilePlus2, component: ListingView },
  { id: 'upload', label: 'Bulk Upload', icon: Upload, component: UploadView },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || DashboardView;

  return (
    <div className="min-h-screen flex bg-bg-dark text-gray-200 overflow-hidden h-screen font-sans">
      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col h-full bg-bg-surface border-r border-line transition-all duration-200",
        isSidebarOpen ? "w-[220px]" : "w-16"
      )}>
        <div className="h-[56px] px-5 flex items-center gap-2.5 border-b border-line">
          <div className="w-6 h-6 bg-accent rounded flex items-center justify-center shrink-0">
            <PackageSearch className="text-white w-4 h-4" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-sm tracking-tight text-accent"
            >
              MerchWizard Pro
            </motion.span>
          )}
        </div>

        <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-5 py-2.5 transition-all relative text-xs",
                  isActive 
                    ? "bg-accent/5 text-white border-l-[3px] border-accent"
                    : "text-text-muted hover:text-white border-l-[3px] border-transparent"
                )}
              >
                <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-accent" : "text-text-muted")} />
                {isSidebarOpen && (
                  <span className="font-medium">{tab.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-line">
          {isSidebarOpen && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Scan Queue</span>
                <span className="text-[9px] bg-accent/20 text-accent px-1.5 py-0.5 rounded font-bold">8 ACTIVE</span>
              </div>
              <div className="space-y-1.5">
                <div className="text-[10px] bg-line/30 border border-line p-2 rounded">
                  funny_retro_tees.csv<br/>
                  <span className="opacity-50 text-[9px]">32% Processed</span>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center gap-3 px-1 py-2 text-text-muted hover:text-white"
          >
            <Menu className="w-4 h-4" />
            {isSidebarOpen && <span className="text-xs">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="h-[56px] flex items-center justify-between px-6 border-b border-line bg-bg-surface sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">{activeTab.replace('-', ' ')}</h2>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-text-muted uppercase">Scan Progress:</span>
              <div className="w-[200px] h-1.5 bg-line rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[82%] rounded-full" />
              </div>
              <span className="text-[10px] font-bold text-accent">82%</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-accent text-white px-3 py-1 rounded text-[11px] font-bold hover:bg-accent/90 transition-colors">
              Export CSV
            </button>
            <button className="bg-bg-surface border border-line px-3 py-1 rounded text-[11px] font-bold text-text-muted hover:bg-line/20 transition-colors">
              Pause
            </button>
            <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent ml-2">
              GA
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-bg-dark">
          <div className="max-w-[1400px] mx-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <ActiveComponent isDarkMode={true} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

