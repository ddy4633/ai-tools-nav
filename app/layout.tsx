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
    default: '好工具 - 发现最好用的 AI 工具导航',
    template: '%s | 好工具',
  },
  description: '发现 1000+ 最好用的 AI 工具，包括 AI 写作、图像生成、代码助手、聊天机器人等。基于真实用户评价和热度排行，帮你快速找到适合的 AI 工具。',
  keywords: ['AI工具', 'AI导航', '人工智能工具', '效率工具', '工具推荐', '软件推荐', '好工具', 'AI评测'],
  authors: [{ name: '好工具', url: 'https://ai.poph163.com' }],
  creator: '好工具团队',
  publisher: '好工具',
  openGraph: {
    title: '好工具 - 发现最好用的 AI 工具导航',
    description: '1000+ AI 工具收录，基于热度排行和用户评价，帮你快速找到适合的 AI 工具',
    url: siteUrl,
    siteName: '好工具',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: '好工具 - AI 工具导航',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '好工具 - 发现最好用的 AI 工具导航',
    description: '1000+ AI 工具收录，基于热度排行和用户评价',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
