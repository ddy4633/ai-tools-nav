// types/tool.ts - 工具类型定义

export interface ToolReviewSource {
  source: string;
  url: string;
  summary: string;
}

export type ToolSponsorType = 'featured_listing' | 'homepage_spotlight' | 'category_spotlight' | 'newsletter_spotlight';

export interface Tool {
  id: string;
  name: string;
  slug?: string;
  description: string;
  reason?: string;
  fullReview?: string;
  category: string;
  categorySlug?: string;
  category_slug?: string;
  pricing_type?: 'free' | 'paid' | 'freemium';
  pricingType?: 'free' | 'paid' | 'freemium';
  priceRange?: string;
  website?: string;
  affiliate_url?: string | null;
  affiliateUrl?: string | null;
  sponsor_type?: ToolSponsorType | null;
  sponsorType?: ToolSponsorType | null;
  sponsor_label?: string | null;
  sponsorLabel?: string | null;
  sponsor_rank?: number | null;
  sponsorRank?: number | null;
  sponsor_start_at?: string | null;
  sponsorStartAt?: string | null;
  sponsor_end_at?: string | null;
  sponsorEndAt?: string | null;
  is_sponsored?: boolean;
  isSponsored?: boolean;
  icon?: string;
  screenshots?: string[];
  features?: string[];
  pros?: string[];
  cons?: string[];
  reviewSources?: ToolReviewSource[];
  alternatives?: string[];
  editorRating?: number;
  userRating?: number;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  createdAt?: string;
  updatedAt?: string;
  isEditorsPick?: boolean;
  isFeatured?: boolean;
  is_featured?: boolean;
  average_rating?: number;
  rating_count?: number;
  repo_url?: string | null;
}

// Trending Tool with social metrics
export interface TrendingTool extends Tool {
  one_liner: string;
  hype_score: number;
  viral_coefficient: number;
  tier: '🔥 BREAKING' | '⚡ TRENDING' | '🚀 NEW' | '💡 WATCH' | string;
  metrics: {
    github: {
      stars: number;
      stars_per_day: number;
      forks: number;
    };
    hackernews?: {
      votes: number;
      comments: number;
    };
  };
  install_methods: string[];
}

export interface Editor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: 'editor' | 'admin';
}

export interface EditorPick {
  id: string;
  tool: Tool;
  editor: Editor;
  comment: string;
  pickedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
  popularity: number;
  icon?: string;
}
