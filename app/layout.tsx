import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/transitions/PageTransition';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { BackToTop } from '@/components/ui/BackToTop';
import { buildSiteUrl, siteConfig } from '@/lib/site';
import { brandConfig, globalAudienceBlurb } from '@/lib/brand';

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
    default: `${brandConfig.siteName} - Curated AI Tools for Global Teams`,
    template: `%s | ${brandConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
  keywords: [
    'AI tools',
    'AI tools directory',
    'AI launch tracker',
    'AI coding tools',
    'AI design tools',
    'AI video tools',
    'ChatGPT alternatives',
    'Cursor alternatives',
    'global AI tools',
    'English German Japanese Korean AI tools',
  ],
  authors: [{ name: brandConfig.siteName, url: siteConfig.siteUrl }],
  creator: brandConfig.siteName,
  publisher: brandConfig.siteName,
  openGraph: {
    title: `${brandConfig.siteName} - Curated AI Tools for Global Teams`,
    description: siteConfig.ogDescription,
    url: siteConfig.siteUrl,
    siteName: brandConfig.siteName,
    locale: brandConfig.locale,
    type: 'website',
    images: [
      {
        url: buildSiteUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: `${brandConfig.siteName} - Curated AI tools and launch-ready discovery`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brandConfig.siteName} - Curated AI tools and launch intelligence`,
    description: brandConfig.shortDescription,
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
    name: brandConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.siteDescription,
    inLanguage: ['en', 'de', 'ja', 'ko', 'zh-Hans'],
    audience: {
      '@type': 'Audience',
      audienceType: globalAudienceBlurb,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: buildSiteUrl('/tools?search={search_term_string}'),
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang={brandConfig.htmlLang} className={`${inter.variable} ${jetbrainsMono.variable}`}>
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
