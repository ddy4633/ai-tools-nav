import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/transitions/PageTransition';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.poph163.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
};

export const metadata: Metadata = {
  title: {
    default: 'AI工具导航 - 发现1000+最好用的AI工具 | 国内免费AI工具推荐',
    template: '%s | AI工具导航',
  },
  description: '发现1000+国内免费最好用的AI工具，包括AI写作、AI绘画、AI编程、AI视频等各类人工智能工具导航，助您提升工作效率。',
  keywords: ['AI工具', 'AI工具导航', 'AI写作', 'AI绘画', 'AI编程', 'ChatGPT', 'DeepSeek', 'Midjourney', '免费AI工具', '国内AI工具'],
  authors: [{ name: 'AI工具导航', url: 'https://ai.poph163.com' }],
  creator: 'AI工具导航',
  publisher: 'AI工具导航',
  openGraph: {
    title: 'AI工具导航 - 发现1000+最好用的AI工具 | 国内免费AI工具推荐',
    description: '发现1000+国内免费最好用的AI工具，包括AI写作、AI绘画、AI编程、AI视频等各类人工智能工具导航',
    url: siteUrl,
    siteName: 'AI工具导航',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AI工具导航 - 发现最好用的AI工具',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI工具导航 - 发现1000+最好用的AI工具',
    description: '发现1000+国内免费最好用的AI工具，包括AI写作、AI绘画、AI编程、AI视频等',
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
    name: 'AI工具导航',
    url: siteUrl,
    description: '发现1000+国内免费最好用的AI工具，包括AI写作、AI绘画、AI编程、AI视频等各类人工智能工具导航',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/tools?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Resource Hints - DNS Prefetch and Preconnect */}
        <link rel="dns-prefetch" href="https://crmkyaoczrvnjsizlaas.supabase.co" />
        <link rel="preconnect" href="https://crmkyaoczrvnjsizlaas.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="google-site-verification-code" />
        {/* Baidu Search Verification */}
        <meta name="baidu-site-verification" content="baidu-site-verification-code" />
        {/* Bing Webmaster Tools */}
        <meta name="msvalidate.01" content="bing-verification-code" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
