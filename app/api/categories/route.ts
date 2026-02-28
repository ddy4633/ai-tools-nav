// app/api/categories/route.ts - 返回分类列表
import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/supabase';

// 导出动态路由配置，确保每次请求都获取最新数据
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await getCategories();

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '获取分类列表失败',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
