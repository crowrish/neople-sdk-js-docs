import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

// Custom page tree with separators
function createCustomPageTree() {
  const originalTree = source.pageTree;
  
  // Find pages from the original tree
  const findPage = (slug: string) => {
    const findInChildren = (children: unknown[]): unknown => {
      for (const child of children) {
        const node = child as { type: string; url?: string; children?: unknown[] };
        if (node.type === 'page' && node.url === `/docs/${slug}`) {
          return child;
        }
        if (node.type === 'folder' && node.children) {
          const found = findInChildren(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findInChildren(originalTree.children || []);
  };
  
  // Create custom tree with separators
  const customChildren = [
    {
      type: 'separator',
      name: '개요',
    },
    findPage('overview'),
    {
      type: 'separator',
      name: '시작하기',
    },
    findPage('getting-started'),
    findPage('configuration'),
    findPage('environment-variables'),
    {
      type: 'separator', 
      name: 'API 레퍼런스',
    },
    findPage('api-dungeon-fighter'),
    findPage('api-cyphers'),
    {
      type: 'separator',
      name: '고급 기능',
    },
    findPage('url-builders'),
    findPage('utility-functions'),
    {
      type: 'separator',
      name: 'HTTP 어댑터',
    },
    findPage('adapter-fetch'),
    findPage('adapter-axios'),
    findPage('adapter-got'),
    findPage('adapter-node-fetch'),
    {
      type: 'separator',
      name: '타입 정의',
    },
    findPage('types'),
    findPage('types-df'),
    findPage('types-cyphers'),
    {
      type: 'separator',
      name: '가이드',
    },
    findPage('error-handling'),
    findPage('examples'),
  ].filter(Boolean);
  
  return {
    ...originalTree,
    children: customChildren,
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  const customTree = createCustomPageTree();
  
  return (
    <DocsLayout tree={customTree as never} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
