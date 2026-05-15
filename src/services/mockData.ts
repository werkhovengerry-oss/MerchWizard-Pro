import { Product, Niche, Trend } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    asin: 'B08XWWP123',
    title: 'Vintage 1984 Retro Sunset T-Shirt',
    price: 19.99,
    bsr: 45200,
    category: 'Clothing, Shoes & Jewelry',
    estimatedSales: 120,
    revenue: 2398.80,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c29fab90b?w=400&h=400&fit=crop',
    uploadDate: '2021-03-10',
    seller: 'Vintage Vibes Co.',
    keywords: ['vintage', '1984', 'birthday gift', 'retro']
  },
  {
    id: '2',
    asin: 'B09YXX456',
    title: 'Mama Bear Floral Design Tee',
    price: 17.95,
    bsr: 12500,
    category: 'Clothing, Shoes & Jewelry',
    estimatedSales: 450,
    revenue: 8077.50,
    imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
    uploadDate: '2022-05-15',
    seller: 'Moments & Memories',
    keywords: ['mama bear', 'mother day', 'floral', 'gift for mom']
  },
  {
    id: '3',
    asin: 'B0BZ123789',
    title: 'Just A Girl Who Loves Axolotls',
    price: 21.99,
    bsr: 8900,
    category: 'Clothing, Shoes & Jewelry',
    estimatedSales: 620,
    revenue: 13633.80,
    imageUrl: 'https://images.unsplash.com/photo-1576515652271-ed4e415a7b8e?w=400&h=400&fit=crop',
    uploadDate: '2023-11-20',
    seller: 'Cute Creature Designs',
    keywords: ['axolotl', 'kawaii', 'anime girl', 'pet lover']
  }
];

export const mockNiches: Niche[] = [
  {
    id: 'n1',
    name: 'Axolotl Lovers',
    searchVolume: 45000,
    competition: 'Low',
    profitabilityScore: 88,
    trending: 'up'
  },
  {
    id: 'n2',
    name: 'Retirement 2024',
    searchVolume: 78000,
    competition: 'High',
    profitabilityScore: 65,
    trending: 'stable'
  },
  {
    id: 'n3',
    name: 'Pickleball Dad',
    searchVolume: 32000,
    competition: 'Medium',
    profitabilityScore: 74,
    trending: 'up'
  }
];

export const mockTrends: Trend[] = [
  {
    id: 't1',
    keyword: 'Space Capybara',
    phrase: 'Space Capybara',
    growth: 145,
    category: 'Animal Humor',
    searchVolume: 42000,
    sentimentScore: 88,
    lastUpdated: '2024-05-14'
  },
  {
    id: 't2',
    keyword: 'Coding Wizard',
    phrase: 'Coding Wizard 2024',
    growth: 82,
    category: 'Tech Enthusiast',
    searchVolume: 18500,
    sentimentScore: 94,
    lastUpdated: '2024-05-15'
  },
  {
    id: 't3',
    keyword: 'Gnome Garden',
    phrase: 'Gnome Garden Party',
    growth: -15,
    category: 'Seasonal',
    searchVolume: 12100,
    sentimentScore: 45,
    lastUpdated: '2024-05-10'
  }
];
