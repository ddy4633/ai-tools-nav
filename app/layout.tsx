import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
    default: '_TOOLS // Next-Gen AI Tools Directory',
    template: '%s | _TOOLS',
  },
  description: 'Curated collection of the best AI and developer tools. Discover next-generation utilities for coding, design, and productivity.',
  keywords: ['AI tools', 'developer tools', 'productivity', 'code utilities', 'tech stack'],
  authors: [{ name: '_TOOLS', url: 'https://ai.poph163.com' }],
  creator: '_TOOLS',
  publisher: '_TOOLS',
  openGraph: {
    title: '_TOOLS // Next-Gen AI Tools Directory',
    description: 'Curated collection of the best AI and developer tools',
    url: siteUrl,
    siteName: '_TOOLS',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: '_TOOLS - AI Tools Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '_TOOLS // Next-Gen AI Tools Directory',
    description: 'Curated collection of the best AI and developer tools',
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
    name: '_TOOLS',
    url: siteUrl,
    description: 'Next-Gen AI Tools Directory',
  };

  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
