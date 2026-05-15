import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MarketAnalysis, ListingContent } from '../services/geminiService';

interface SearchContextType {
  currentKeyword: string;
  analysis: MarketAnalysis | null;
  listing: ListingContent | null;
  isScanning: boolean;
  setScanning: (val: boolean) => void;
  performSearch: (keyword: string) => Promise<void>;
  updateListing: (listing: ListingContent) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [listing, setListing] = useState<ListingContent | null>(null);
  const [isScanning, setScanning] = useState(false);

  // We'll import the service lazily or via direct import
  const { geminiService } = require('../services/geminiService');

  const performSearch = async (keyword: string) => {
    if (!keyword) return;
    setScanning(true);
    setCurrentKeyword(keyword);
    
    try {
      const result = await geminiService.analyzeKeyword(keyword);
      setAnalysis(result);
      
      // Auto-generate initial listing
      const initialListing = await geminiService.generateListing(result);
      setListing(initialListing);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setScanning(false);
    }
  };

  const updateListing = (newListing: ListingContent) => {
    setListing(newListing);
  };

  return (
    <SearchContext.Provider value={{ 
      currentKeyword, 
      analysis, 
      listing, 
      isScanning, 
      setScanning, 
      performSearch,
      updateListing
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
