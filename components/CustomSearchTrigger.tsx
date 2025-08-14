'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { KoreanSearchDialog } from './KoreanSearchDialog';

export function CustomSearchTrigger() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setSearchOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-fd-muted-foreground border border-fd-border rounded-md hover:bg-fd-muted hover:text-fd-foreground transition-colors w-full bg-fd-background/50 mb-4 cursor-pointer"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1 text-left">문서 검색</span>
        <kbd className="text-xs bg-fd-muted text-fd-muted-foreground px-1.5 py-0.5 rounded font-mono border">
          ⌘K
        </kbd>
      </button>

      <KoreanSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
