'use client';

import { useState, useEffect } from 'react';
import { KoreanSearchDialog } from './KoreanSearchDialog';

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Fumadocs 검색 버튼 클릭 이벤트 가로채기
  useEffect(() => {
    const handleSearchTrigger = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      setSearchOpen(true);
    };

    // Fumadocs 검색 버튼을 찾아서 이벤트 리스너 추가
    const searchButton = document.querySelector('[data-search-trigger]');
    if (searchButton) {
      searchButton.addEventListener('click', handleSearchTrigger);
    }

    // MutationObserver로 동적으로 추가되는 검색 버튼 감지
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const searchTrigger =
              element.querySelector('[data-search-trigger]') ||
              (element.hasAttribute('data-search-trigger') ? element : null);
            if (searchTrigger) {
              searchTrigger.addEventListener('click', handleSearchTrigger);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (searchButton) {
        searchButton.removeEventListener('click', handleSearchTrigger);
      }
      observer.disconnect();
    };
  }, []);

  // Cmd+K 또는 Ctrl+K로 검색 열기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {children}
      <KoreanSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
