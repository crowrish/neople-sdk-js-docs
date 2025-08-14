import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const title = page.data.title;
  const description =
    page.data.description ||
    '네오플 오픈 API를 위한 TypeScript/JavaScript SDK 문서';
  const slug = params.slug ? params.slug.join('/') : '';
  const url = `/docs/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: `${title} - Neople SDK JS Docs`,
      description,
      url,
      siteName: 'Neople SDK JS Docs',
      locale: 'ko_KR',
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
      title: `${title} - Neople SDK JS Docs`,
      description,
      images: ['/og-image.png'],
    },
  };
}
