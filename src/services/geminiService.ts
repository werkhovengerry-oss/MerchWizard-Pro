import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface MarketAnalysis {
  keyword: string;
  bsrEstimate: string;
  searchVolume: number;
  competitionLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  trademarkRisk: 'CLEAN' | 'CAUTION' | 'DANGER';
  estimatedSales: number;
  topPhrases: string[];
  opportunityScore: number;
}

export interface ListingContent {
  title: string;
  brand: string;
  bullet1: string;
  bullet2: string;
  description: string;
  tags: string[];
}

export const geminiService = {
  async analyzeKeyword(keyword: string): Promise<MarketAnalysis> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the Amazon Merch niche for the keyword: "${keyword}". 
      Return a detailed market estimation including BSR, search volume, and trademark risks.
      Assume current year 2024 data.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keyword: { type: Type.STRING },
            bsrEstimate: { type: Type.STRING, description: "Average BSR for top 50, e.g. '#142,000'" },
            searchVolume: { type: Type.NUMBER, description: "Estimated monthly search volume" },
            competitionLevel: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH'] },
            trademarkRisk: { type: Type.STRING, enum: ['CLEAN', 'CAUTION', 'DANGER'] },
            estimatedSales: { type: Type.NUMBER, description: "Monthly sales for top sellers" },
            topPhrases: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            opportunityScore: { type: Type.NUMBER, description: "Score from 0-100" }
          },
          required: ["keyword", "bsrEstimate", "searchVolume", "competitionLevel", "trademarkRisk", "estimatedSales", "topPhrases", "opportunityScore"]
        }
      }
    });

    return JSON.parse(response.text);
  },

  async generateListing(analysis: MarketAnalysis): Promise<ListingContent> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a high-converting Amazon Merch listing based on this market analysis: ${JSON.stringify(analysis)}.
      Focus on SEO keywords and conversion-driven bullet points.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            brand: { type: Type.STRING },
            bullet1: { type: Type.STRING },
            bullet2: { type: Type.STRING },
            description: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "brand", "bullet1", "bullet2", "description", "tags"]
        }
      }
    });

    return JSON.parse(response.text);
  },

  async checkUSPTO(text: string): Promise<{ isSafe: boolean; findings: string[]; riskLevel: string }> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Check the following text for potential trademark infringements in the apparel (T-shirt) category (USPTO Class 025): "${text}". 
      List any common trademarks found or common phrases that might be risky.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafe: { type: Type.BOOLEAN },
            findings: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            riskLevel: { type: Type.STRING, enum: ['CLEAN', 'LOW', 'MEDIUM', 'HIGH'] }
          },
          required: ["isSafe", "findings", "riskLevel"]
        }
      }
    });

    return JSON.parse(response.text);
  }
};
