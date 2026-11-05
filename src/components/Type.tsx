export interface PriceChange {
  dir: 'up' | 'down' | 'same';
  pct: number;
}

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface CommodityItem {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
}