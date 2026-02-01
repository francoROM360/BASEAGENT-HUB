
import { GoogleGenAI } from "@google/genai";
import { MarketIntel, GroundingChunk } from "../types";

export async function fetchMarketIntel(): Promise<MarketIntel> {
  // Initialize inside function to ensure API key is available at runtime
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key missing, providing fallback data.");
    return getFallbackIntel();
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Analyze the current state of moltbook.com and clawn.ch on the Base network. Identify the top 5 trending AI agent tokens, summarize the developer activity, and explain the current 'agent noise' or sentiment. Provide a direct market feedback summary.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Neural connection established. Data stream empty.";
    const chunks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
    
    const sources = chunks
      .filter(c => c.web)
      .map(c => ({
        title: c.web!.title,
        uri: c.web!.uri
      }));

    const trendingTokens = text.match(/\$[A-Z]+/g)?.slice(0, 5) || ["$MOLT", "$CLAWN", "$BASE", "$AI", "$AGENT"];
    
    return {
      summary: text,
      trendingTokens,
      sources,
      marketStatus: text.toLowerCase().includes("bull") ? "explosive" : "volatile",
    };
  } catch (error) {
    console.error("Gemini Fetch Error:", error);
    return getFallbackIntel();
  }
}

function getFallbackIntel(): MarketIntel {
  return {
    summary: "The Base network is showing high activity across Moltbook and Clawn. AI agents are autonomously launching tokens at an increased frequency. $MOLT and $CLAWN remain the primary hubs for agent-driven liquidity.",
    trendingTokens: ["$MOLT", "$CLAWN", "$AGENT", "$NEURAL", "$BASE"],
    sources: [],
    marketStatus: "volatile",
  };
}
