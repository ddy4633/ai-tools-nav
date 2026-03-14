import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/transitions/PageTransition';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { BackToTop } from '@/components/ui/BackToTop';
import { buildSiteUrl, siteConfig } from '@/lib/site';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const searchVerificationOther = {
  ...(siteConfig.searchVerification.baidu
    ? { 'baidu-site-verification': siteConfig.searchVerification.baidu }
    : {}),
  ...(siteConfig.searchVerification.bing
    ? { 'msvalidate.01': siteConfig.searchVerification.bing }
    : {}),
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090c12',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'AI工具导航 - 精选好用AI工具 | 国内AI工具推荐',
    template: '%s | AI工具导航',
  },
  description: '精选国内外好用的AI工具，涵盖AI写作、AI绘画、AI编程、AI视频等领域，助您提升工作效率。',
  keywords: ['AI工具', 'AI工具导航', 'AI写作', 'AI绘画', 'AI编程', 'ChatGPT', 'DeepSeek', 'Midjourney', '免费AI工具', '国内AI工具'],
  authors: [{ name: 'AI工具导航', url: siteConfig.siteUrl }],
  creator: 'AI工具导航',
  publisher: 'AI工具导航',
  openGraph: {
    title: 'AI工具导航 - 精选好用AI工具 | 国内AI工具推荐',
    description: '精选国内外好用的AI工具，包括AI写作、AI绘画、AI编程、AI视频等各类人工智能工具导航',
    url: siteConfig.siteUrl,
    siteName: 'AI工具导航',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: buildSiteUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'AI工具导航 - 发现最好用的AI工具',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI工具导航 - 精选好用AI工具',
    description: '精选国内外好用的AI工具，包括AI写作、AI绘画、AI编程、AI视频等',
    images: [buildSiteUrl('/og-image.png')],
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
    canonical: siteConfig.siteUrl,
  },
  verification:
    siteConfig.searchVerification.google || Object.keys(searchVerificationOther).length > 0
      ? {
          google: siteConfig.searchVerification.google,
          other: Object.keys(searchVerificationOther).length > 0 ? searchVerificationOther : undefined,
        }
      : undefined,
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
    name: 'AI工具导航',
    url: siteConfig.siteUrl,
    description: '精选国内外好用的AI工具，包括AI写作、AI绘画、AI编程、AI视频等各类人工智能工具导航',
    potentialAction: {
      '@type': 'SearchAction',
      target: buildSiteUrl('/tools?search={search_term_string}'),
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Resource Hints - DNS Prefetch and Preconnect */}
        {supabaseUrl ? <link rel="dns-prefetch" href={supabaseUrl} /> : null}
        {supabaseUrl ? <link rel="preconnect" href={supabaseUrl} crossOrigin="anonymous" /> : null}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <ScrollProgress />
        <div className="min-h-screen flex flex-col">
          <Header />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
