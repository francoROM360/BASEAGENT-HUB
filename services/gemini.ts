
import { GoogleGenAI } from "@google/genai";
import { MarketIntel, GroundingChunk } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fetchMarketIntel(): Promise<MarketIntel> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Search for the latest token launches, developer activity, and agent noise on moltbook.com and clawn.ch (Base network). Summarize the top 5 trending tokens, overall market sentiment, and any notable news. Be specific about activity on these two platforms.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Unable to retrieve intelligence at this time.";
    const chunks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
    
    const sources = chunks
      .filter(c => c.web)
      .map(c => ({
        title: c.web!.title,
        uri: c.web!.uri
      }));

    // Simple heuristic-based extraction for the mock dashboard structure
    const trendingTokens = text.match(/\$[A-Z]+/g)?.slice(0, 5) || ["$MOLT", "$CLAWN", "$BASE", "$AGENT"];
    
    return {
      summary: text,
      trendingTokens,
      sources,
      marketStatus: text.toLowerCase().includes("bullish") ? "explosive" : "volatile",
    };
  } catch (error) {
    console.error("Gemini Intel Fetch Error:", error);
    return {
      summary: "Connection to the Base neural network was interrupted. Retrying sync...",
      trendingTokens: ["$ERROR", "$RETRY"],
      sources: [],
      marketStatus: "volatile",
    };
  }
}
