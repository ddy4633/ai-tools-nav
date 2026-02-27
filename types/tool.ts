// types/tool.ts - 工具类型定义

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  reason: string;
  fullReview: string;
  category: string;
  categorySlug: string;
  pricingType: 'free' | 'paid' | 'freemium';
  priceRange?: string;
  website: string;
  icon?: string;
  screenshots?: string[];
  features: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
  editorRating: number;
  userRating?: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  updatedAt: string;
  isEditorsPick: boolean;
  isFeatured: boolean;
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
