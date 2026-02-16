import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.poph163.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5F1EB',
};

export const metadata: Metadata = {
  title: {
    default: '好工具 - 发现真正好用的工具',
    template: '%s | 好工具',
  },
  description: '这里收集了我们真正用过、觉得好用的工具。没有广告，只有真诚的推荐。',
  keywords: ['AI工具', '效率工具', '工具推荐', '软件推荐', '好工具'],
  authors: [{ name: '好工具' }],
  openGraph: {
    title: '好工具',
    description: '发现真正好用的工具',
    url: siteUrl,
    siteName: '好工具',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '好工具',
    url: siteUrl,
    description: '发现真正好用的工具',
  };

  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-primary text-text-primary">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
