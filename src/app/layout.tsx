import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: {
    default: 'Neople SDK JS Docs',
    template: '%s - Neople SDK JS Docs',
  },
  description: '네오플 오픈 API를 위한 TypeScript/JavaScript SDK',
  keywords: [
    'Neople',
    'SDK',
    'TypeScript',
    'JavaScript',
    '네오플',
    '던전앤파이터',
    '사이퍼즈',
    'API',
  ],
  authors: [{ name: 'crowrish' }],
  creator: 'crowrish',
  publisher: 'Neople SDK JS Docs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://crowrish.github.io/neople-sdk-js-docs'
      : 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: 'Neople SDK JS Docs',
    description: '네오플 오픈 API를 위한 TypeScript/JavaScript SDK',
    siteName: 'Neople SDK JS Docs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neople OpenAPI SDK for JavaScript/TypeScript',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neople SDK JS Docs',
    description: '네오플 오픈 API를 위한 TypeScript/JavaScript SDK',
    images: ['/og-image.png'],
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${pretendard.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            enabled: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
