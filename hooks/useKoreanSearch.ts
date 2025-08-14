import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  KoreanSearchEngine,
  type SearchDocument,
  type SearchResult,
} from '@/lib/korean-search';

interface UseKoreanSearchResult {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  suggestions: string[];
  isLoading: boolean;
  error: string | null;
  stats: {
    totalDocuments: number;
    uniqueTitles: number;
    indexSize: number;
  } | null;
  search: (searchQuery?: string) => void;
}

export function useKoreanSearch(): UseKoreanSearchResult {
  const [documents, setDocuments] = useState<SearchDocument[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 검색 데이터 로드
  useEffect(() => {
    let isCancelled = false;

    const loadSearchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // GitHub Pages basePath 고려
        const basePath =
          process.env.NODE_ENV === 'production' ? '/neople-sdk-js-docs' : '';
        const response = await fetch(`${basePath}/search-data.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SearchDocument[] = await response.json();

        if (!isCancelled) {
          setDocuments(data);
          console.log(`✅ 검색 데이터 로드 완료: ${data.length}개 문서`);
        }
      } catch (err) {
        if (!isCancelled) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : '알 수 없는 오류가 발생했습니다';
          setError(errorMessage);
          console.error('❌ 검색 데이터 로드 실패:', err);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadSearchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  // 검색 엔진 초기화
  const searchEngine = useMemo(() => {
    if (documents.length === 0) return null;

    try {
      const engine = new KoreanSearchEngine(documents);
      console.log('🔍 검색 엔진 초기화 완료:', engine.getStats());
      return engine;
    } catch (err) {
      console.error('❌ 검색 엔진 초기화 실패:', err);
      setError(err instanceof Error ? err.message : '검색 엔진 초기화 실패');
      return null;
    }
  }, [documents]);

  // 검색 실행
  const search = useCallback(
    (searchQuery?: string) => {
      const queryToUse = searchQuery ?? query;

      if (!searchEngine || !queryToUse.trim()) {
        setResults([]);
        setSuggestions([]);
        return;
      }

      try {
        // 검색 결과 가져오기
        const searchResults = searchEngine.search(queryToUse, 10);
        setResults(searchResults);

        // 자동완성 제안 가져오기
        const searchSuggestions = searchEngine.suggest(queryToUse, 5);
        setSuggestions(searchSuggestions);

        console.log(
          `🔍 검색 실행: "${queryToUse}" - ${searchResults.length}개 결과`
        );
      } catch (err) {
        console.error('❌ 검색 실행 실패:', err);
        setError(err instanceof Error ? err.message : '검색 실행 실패');
        setResults([]);
        setSuggestions([]);
      }
    },
    [searchEngine, query]
  );

  // 쿼리 변경 시 자동 검색 (디바운스 적용)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      search();
    }, 300); // 300ms 디바운스

    return () => clearTimeout(timeoutId);
  }, [query, search]);

  // 통계 정보
  const stats = useMemo(() => {
    return searchEngine?.getStats() || null;
  }, [searchEngine]);

  return {
    query,
    setQuery,
    results,
    suggestions,
    isLoading,
    error,
    stats,
    search,
  };
}
