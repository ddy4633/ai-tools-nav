import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: 'Data and Analytics AI Tools - analysis, reporting, and BI',
  description: 'Discover AI data tools for analysis, reporting, business intelligence, and decision support.',
  keywords: ['AI data tools', 'analytics AI', 'business intelligence AI', 'reporting AI', 'analysis tools'],
};

export const revalidate = 3600;

export default async function DataCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['数据', 'data', '分析', '表格']);

  return (
    <CategoryToolsPage
      categoryLabel="Data & Analytics"
      heading="Data and analytics AI tools"
      description="Includes analysis assistants, BI tools, reporting layers, and products built for decision support."
      tools={tools}
      toolsFilterHref="/tools?category=data"
      toolsFilterLabel="View all data tools"
      emptyEmoji="📊"
      emptyTitle="No data tools are indexed yet"
      emptyDescription="Please try again later or explore another category."
    />
  );
}
