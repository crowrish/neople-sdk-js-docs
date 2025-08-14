'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, FileText, Hash } from 'lucide-react';
import { useKoreanSearch } from '@/hooks/useKoreanSearch';
import type { SearchResult } from '@/lib/korean-search';

interface KoreanSearchDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function KoreanSearchDialog({
  open: propOpen,
  onOpenChange: propOnOpenChange,
}: KoreanSearchDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Props로 전달되지 않은 경우 내부 state 사용
  const open = propOpen ?? internalOpen;
  const onOpenChange = propOnOpenChange ?? setInternalOpen;
  const { query, setQuery, results, suggestions, isLoading, error } =
    useKoreanSearch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 다이얼로그가 열릴 때 입력 필드에 포커스
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // 결과 클릭 핸들러
  const handleResultClick = useCallback(
    (result: SearchResult) => {
      const targetUrl = result.anchorId
        ? `${result.url}#${result.anchorId}`
        : result.url;

      window.location.href = targetUrl;
      onOpenChange(false);

      // 앵커가 있는 경우 부드러운 스크롤 효과
      if (result.anchorId) {
        setTimeout(() => {
          const element = document.getElementById(result.anchorId!);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
          }
        }, 100); // 페이지 로드 후 스크롤
      }
    },
    [onOpenChange]
  );

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case 'Escape':
          onOpenChange(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, results, selectedIndex, onOpenChange, handleResultClick]);

  // 검색 결과가 변경될 때 선택 인덱스 초기화
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const highlightText = (text: string, query: string) => {
    if (!query || query.length < 2) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi'
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={() => onOpenChange(false)}
      />

      {/* 다이얼로그 */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="문서 검색... (예: ㄷㅈ, 던전, API)"
            className="flex-1 bg-transparent text-lg outline-none placeholder-gray-500"
          />
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 내용 */}
        <div className="max-h-96 overflow-y-auto">
          {/* 로딩 상태 */}
          {isLoading && (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              검색 데이터를 로드하는 중...
            </div>
          )}

          {/* 오류 상태 */}
          {error && (
            <div className="p-8 text-center text-red-600">
              <div className="mb-2">❌ 검색 오류</div>
              <div className="text-sm text-gray-600">{error}</div>
            </div>
          )}

          {/* 검색 결과가 없고 쿼리가 있는 경우 */}
          {!isLoading && !error && query.trim() && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <div className="mb-2">🔍 검색 결과가 없습니다</div>
              <div className="text-sm">
                다른 키워드로 시도해보세요. 초성 검색도 지원합니다! (예: ㄷㅈ)
              </div>
            </div>
          )}

          {/* 자동완성 제안 */}
          {!isLoading &&
            !error &&
            query.trim() &&
            suggestions.length > 0 &&
            results.length === 0 && (
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-2">
                  💡 이런 검색어는 어떠세요?
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* 검색 결과 */}
          {!isLoading && !error && results.length > 0 && (
            <div className="p-2">
              {results.map((result: SearchResult, index: number) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full p-3 text-left rounded-md transition-colors ${
                    index === selectedIndex
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">
                        {highlightText(result.title, query)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {highlightText(result.content.substring(0, 150), query)}
                        {result.content.length > 150 && '...'}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Hash className="w-3 h-3" />
                        <span>{result.url}</span>
                        {result.score && (
                          <span className="ml-auto">
                            점수: {result.score.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 빈 상태 (초기 상태) */}
          {!isLoading && !error && !query.trim() && (
            <div className="p-8 text-center text-gray-500">
              <div className="mb-4">
                <Search className="w-12 h-12 mx-auto text-gray-300" />
              </div>
              <div className="mb-2">문서를 검색해보세요</div>
              <div className="text-sm space-y-1">
                <div>• 일반 검색: "던전앤파이터", "API"</div>
                <div>• 초성 검색: "ㄷㅈ", "ㅇㄷㅌ"</div>
                <div>• 부분 검색: "던전", "어댑터"</div>
              </div>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span>↑↓ 이동 • Enter 선택 • Esc 닫기</span>
            {results.length > 0 && <span>{results.length}개 결과</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
