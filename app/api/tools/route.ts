// app/api/tools/route.ts - 返回工具列表
import { NextResponse } from 'next/server';
import { getAllTools, getTrendingTools, getFeaturedTools } from '@/lib/supabase';

// 导出动态路由配置，确保每次请求都获取最新数据
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'all' | 'trending' | 'featured'
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    let tools;

    switch (type) {
      case 'trending':
        tools = await getTrendingTools(limit);
        break;
      case 'featured':
        tools = await getFeaturedTools(limit);
        break;
      case 'all':
      default:
        tools = await getAllTools();
        break;
    }

    return NextResponse.json({
      success: true,
      data: tools,
      count: tools.length,
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '获取工具列表失败',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
