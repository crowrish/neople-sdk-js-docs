import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
