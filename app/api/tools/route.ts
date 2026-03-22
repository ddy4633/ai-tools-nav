// app/api/tools/route.ts - 返回工具列表
import { NextResponse } from 'next/server';
import { getAllTools, getTrendingTools, getFeaturedTools } from '@/lib/supabase';
import { getSponsoredToolsFromList, matchesToolCategory } from '@/lib/monetization/sponsored';
import type { ToolSponsorType } from '@/types/tool';

const sponsorTypes = [
  'featured_listing',
  'homepage_spotlight',
  'category_spotlight',
  'newsletter_spotlight',
] as const satisfies ToolSponsorType[];

type SponsorTypeParam = ToolSponsorType | 'all';

// 导出动态路由配置，确保每次请求都获取最新数据
export const dynamic = 'force-dynamic';

function parseLimit(value: string | null): number {
  let limit = Number(value ?? 100);

  if (!Number.isFinite(limit)) {
    limit = 100;
  }

  return Math.min(Math.max(Math.floor(limit), 1), 200);
}

function parseBooleanParam(value: string | null, defaultValue: boolean): boolean {
  if (value == null) {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();

  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) {
    return true;
  }

  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) {
    return false;
  }

  return defaultValue;
}

function isSponsorTypeParam(value: string): value is SponsorTypeParam {
  return value === 'all' || sponsorTypes.includes(value as ToolSponsorType);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') ?? 'all';
    const limit = parseLimit(searchParams.get('limit'));
    const category = searchParams.get('category')?.trim() || null;
    const rawSponsorType = searchParams.get('sponsor_type')?.trim() || null;
    const activeOnly = parseBooleanParam(searchParams.get('active_only'), true);

    if (rawSponsorType && !isSponsorTypeParam(rawSponsorType)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid sponsor_type parameter',
        message: `Allowed values: ${['all', ...sponsorTypes].join(', ')}`,
      }, { status: 400 });
    }

    const sponsorType = rawSponsorType as SponsorTypeParam | null;

    let tools;

    switch (type) {
      case 'trending': {
        const trendingTools = await getTrendingTools(limit);
        tools = category ? trendingTools.filter((tool) => matchesToolCategory(tool, category)) : trendingTools;
        break;
      }
      case 'featured': {
        const featuredTools = await getFeaturedTools(limit);
        tools = category ? featuredTools.filter((tool) => matchesToolCategory(tool, category)) : featuredTools;
        break;
      }
      case 'sponsored': {
        const allTools = await getAllTools();
        tools = getSponsoredToolsFromList(allTools, {
          limit,
          sponsorType,
          category,
          activeOnly,
        });
        break;
      }
      case 'all':
      default: {
        const allTools = await getAllTools();
        const categoryMatchedTools = category ? allTools.filter((tool) => matchesToolCategory(tool, category)) : allTools;
        tools = categoryMatchedTools.slice(0, limit);
        break;
      }
    }

    return NextResponse.json({
      success: true,
      data: tools,
      count: tools.length,
      filters: {
        type,
        limit,
        category,
        sponsorType: type === 'sponsored' ? sponsorType : null,
        activeOnly: type === 'sponsored' ? activeOnly : null,
      },
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch tools',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
