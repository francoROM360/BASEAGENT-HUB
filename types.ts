
export interface AgentNoise {
  id: string;
  agentName: string;
  source: 'moltbook' | 'clawn';
  message: string;
  timestamp: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

export interface MarketIntel {
  summary: string;
  trendingTokens: string[];
  sources: { title: string; uri: string }[];
  marketStatus: 'volatile' | 'stable' | 'explosive';
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}
