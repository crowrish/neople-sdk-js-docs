import { createSearch } from 'hangul-search-js';
import MiniSearch from 'minisearch';
import { getChoseong } from 'es-hangul';

export interface SearchDocument {
  id: string;
  title: string;
  content: string;
  url: string;
  section?: string;
  anchorId?: string;
}

export interface SearchResult extends SearchDocument {
  score?: number;
  highlight?: string;
}

export class KoreanSearchEngine {
  private miniSearch: MiniSearch<SearchDocument>;
  private hangulSearch: ReturnType<typeof createSearch>;
  private documents: SearchDocument[];
  private titleMap: Map<string, SearchDocument[]>;

  constructor(documents: SearchDocument[]) {
    this.documents = documents;
    this.titleMap = new Map();

    // 제목별 문서 그룹핑
    documents.forEach(doc => {
      const existing = this.titleMap.get(doc.title) || [];
      existing.push(doc);
      this.titleMap.set(doc.title, existing);
    });

    // MiniSearch 초기화
    this.miniSearch = new MiniSearch({
      fields: ['title', 'content'],
      storeFields: ['id', 'title', 'url', 'section'],
      searchOptions: {
        boost: { title: 3, content: 1 },
        fuzzy: 0.2,
        prefix: true,
        combineWith: 'AND',
      },
      // 한글 토큰화를 위한 커스텀 처리
      processTerm: (term: string) => {
        // 한글 초성만 있는 경우 그대로 유지
        if (/^[ㄱ-ㅎ]+$/.test(term)) {
          return term;
        }
        // 일반적인 토큰 처리
        return term.toLowerCase();
      },
    });

    // 문서 색인
    this.miniSearch.addAll(documents);

    // 한글 검색을 위한 제목 배열
    const uniqueTitles = Array.from(this.titleMap.keys());
    this.hangulSearch = createSearch(uniqueTitles);
  }

  search(query: string, limit: number = 10): SearchResult[] {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const seenUrls = new Set<string>();

    // 1. 한글 초성 검색
    if (this.isChosung(query)) {
      const chosungResults = this.searchByChosung(query, limit);
      chosungResults.forEach(result => {
        if (!seenUrls.has(result.url)) {
          results.push(result);
          seenUrls.add(result.url);
        }
      });
    }

    // 2. 한글 부분 검색 (hangul-search-js)
    if (results.length < limit) {
      const hangulMatches = this.hangulSearch(query);
      const hangulResults = this.getDocumentsByTitles(
        hangulMatches,
        limit - results.length
      );
      hangulResults.forEach(result => {
        if (!seenUrls.has(result.url)) {
          results.push(result);
          seenUrls.add(result.url);
        }
      });
    }

    // 3. 전문 검색 (MiniSearch)
    if (results.length < limit) {
      const fullTextResults = this.miniSearch
        .search(query, {
          fuzzy: 0.3,
        })
        .slice(0, limit - results.length);

      fullTextResults.forEach(result => {
        if (!seenUrls.has(result.url)) {
          const doc = this.documents.find(d => d.id === result.id);
          if (doc) {
            results.push({
              ...doc,
              score: result.score,
              highlight: this.highlightMatch(doc.content, query),
            });
            seenUrls.add(result.url);
          }
        }
      });
    }

    // 결과를 점수순으로 정렬 (점수가 없는 경우 1.0으로 설정)
    return results
      .map(result => ({ ...result, score: result.score || 1.0 }))
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, limit);
  }

  // 자동완성용 검색
  suggest(query: string, limit: number = 5): string[] {
    if (!query.trim()) return [];

    const suggestions = new Set<string>();

    // 1. 제목에서 부분 매치 찾기
    this.documents.forEach(doc => {
      if (doc.title.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(doc.title);
      }
    });

    // hangul-search로 추가 매치 찾기
    const hangulMatches = this.hangulSearch(query);
    hangulMatches.forEach(match => suggestions.add(match));

    // 2. 초성 검색
    if (this.isChosung(query)) {
      this.documents.forEach(doc => {
        const titleChosung = getChoseong(doc.title);
        if (titleChosung.includes(query)) {
          suggestions.add(doc.title);
        }
      });
    }

    return Array.from(suggestions).slice(0, limit);
  }

  private isChosung(text: string): boolean {
    return /^[ㄱ-ㅎ]+$/.test(text);
  }

  private searchByChosung(_chosung: string, limit: number): SearchResult[] {
    const matches: SearchResult[] = [];

    for (const [title, docs] of this.titleMap.entries()) {
      const titleChosung = getChoseong(title);
      if (titleChosung.includes(_chosung)) {
        // 대표 문서 하나만 반환 (메인 문서 우선)
        const mainDoc = docs.find(doc => doc.id.includes('-main')) || docs[0];
        matches.push({
          ...mainDoc,
          score: 1.0,
          highlight: this.highlightChosung(title, _chosung),
        });

        if (matches.length >= limit) break;
      }
    }

    return matches;
  }

  private getDocumentsByTitles(
    titles: string[],
    limit: number
  ): SearchResult[] {
    const results: SearchResult[] = [];

    titles.slice(0, limit).forEach(title => {
      const docs = this.titleMap.get(title);
      if (docs) {
        // 대표 문서 하나만 반환
        const mainDoc = docs.find(doc => doc.id.includes('-main')) || docs[0];
        results.push({
          ...mainDoc,
          score: 0.9,
          highlight: title,
        });
      }
    });

    return results;
  }

  private highlightMatch(content: string, query: string): string {
    if (!query || query.length < 2) return content;

    // 간단한 하이라이팅 (실제 구현에서는 더 정교하게)
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi'
    );
    return content.replace(regex, '<mark>$1</mark>');
  }

  private highlightChosung(title: string, _chosung: string): string {
    // 초성 매치 하이라이팅은 복잡하므로 일단 제목만 반환
    return title;
  }

  // 통계 정보
  getStats() {
    return {
      totalDocuments: this.documents.length,
      uniqueTitles: this.titleMap.size,
      indexSize: this.miniSearch.documentCount,
    };
  }
}
