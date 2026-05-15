export type NicheCompetition = 'Low' | 'Medium' | 'High';

export interface Product {
  id: string;
  asin: string;
  title: string;
  price: number;
  bsr: number;
  category: string;
  estimatedSales: number;
  revenue: number;
  imageUrl: string;
  uploadDate: string;
  seller: string;
  keywords: string[];
}

export interface Niche {
  id: string;
  name: string;
  searchVolume: number;
  competition: NicheCompetition;
  profitabilityScore: number;
  trending: 'up' | 'down' | 'stable';
}

export interface Trend {
  id: string;
  keyword: string;
  phrase: string;
  growth: number;
  category: string;
  searchVolume: number;
  sentimentScore: number;
  lastUpdated: string;
}

export interface ListingTemplate {
  id: string;
  name: string;
  titleTemplate: string;
  brandTemplate: string;
  bullet1: string;
  bullet2: string;
  description: string;
}
