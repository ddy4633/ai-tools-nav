import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'AI工具导航 - 发现最好用的AI工具',
    template: '%s | AI工具导航',
  },
  description: '发现1000+最好用的AI工具，涵盖AI写作、图像生成、代码助手等领域。帮你提升10倍效率！',
  keywords: ['AI工具', '人工智能', 'AI导航', 'AI写作', 'AI图像', 'ChatGPT', 'Claude'],
  authors: [{ name: 'AI工具导航' }],
  openGraph: {
    title: 'AI工具导航',
    description: '发现最好用的AI工具',
    url: 'https://aitools-nav.com',
    siteName: 'AI工具导航',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://aitools-nav.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
