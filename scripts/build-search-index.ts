import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface SearchDocument {
  id: string;
  title: string;
  content: string;
  url: string;
  section?: string;
  anchorId?: string;
}

async function buildSearchIndex() {
  const docsDir = path.join(process.cwd(), 'content/docs');

  try {
    const files = await fs.readdir(docsDir);
    const documents: SearchDocument[] = [];

    for (const file of files) {
      if (!file.endsWith('.mdx') || file === 'meta.json') continue;

      const filePath = path.join(docsDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      const { data, content: body } = matter(content);

      // 제목과 URL 생성
      const title = data.title || data.nav || path.basename(file, '.mdx');
      const url = `/docs/${file.replace('.mdx', '')}`;

      // 헤딩에서 앵커 ID 추출을 위해 원본 내용 분석
      const headings: Array<{ text: string; anchorId: string; level: number }> =
        [];
      const headingMatches = body.matchAll(/^(#{1,6})\s+(.+)$/gm);

      for (const match of headingMatches) {
        const level = match[1].length;
        const text = match[2].trim();
        // Fumadocs 스타일의 앵커 ID 생성 (소문자, 공백을 하이픈으로)
        const anchorId = text
          .toLowerCase()
          .replace(/[^a-z0-9가-힣\s]/g, '') // 특수문자 제거
          .replace(/\s+/g, '-') // 공백을 하이픈으로
          .replace(/-+/g, '-') // 연속 하이픈 제거
          .replace(/^-|-$/g, ''); // 앞뒤 하이픈 제거

        headings.push({ text, anchorId, level });
      }

      // 마크다운 내용을 정리하고 문단별로 분할
      const cleanContent = body
        .replace(/```[\s\S]*?```/g, '') // 코드 블록 제거
        .replace(/^#{1,6}\s+/gm, '') // 제목 마크다운 제거
        .replace(/\*\*(.*?)\*\*/g, '$1') // 볼드 마크다운 제거
        .replace(/\*(.*?)\*/g, '$1') // 이탤릭 마크다운 제거
        .replace(/`([^`]+)`/g, '$1') // 인라인 코드 마크다운 제거
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 링크 마크다운 제거
        .trim();

      // 문단별로 분할 (빈 줄 기준)
      const paragraphs = cleanContent
        .split('\n\n')
        .map(p => p.replace(/\n/g, ' ').trim())
        .filter(p => p.length > 10); // 너무 짧은 문단 제외

      // 메인 문서 추가 (전체 내용)
      documents.push({
        id: `${file}-main`,
        title,
        content: paragraphs.join(' '),
        url,
        section: data.section,
      });

      // 각 문단을 개별 문서로 추가
      paragraphs.forEach((paragraph, index) => {
        if (paragraph.length > 20) {
          // 의미있는 길이의 문단만
          // 문단 내용으로부터 가장 관련있는 헤딩 찾기
          let matchingHeading:
            | { text: string; anchorId: string; level: number }
            | undefined;

          // 헤딩 텍스트가 문단에 포함되어 있는지 확인
          for (const heading of headings) {
            if (
              paragraph.toLowerCase().includes(heading.text.toLowerCase()) ||
              heading.text
                .toLowerCase()
                .includes(paragraph.toLowerCase().substring(0, 50))
            ) {
              matchingHeading = heading;
              break;
            }
          }

          // 함수명, 메소드명 등 특별한 패턴 매칭
          if (!matchingHeading) {
            const functionMatch = paragraph.match(/(\w+)\s*\(/g);
            if (functionMatch) {
              const functionName = functionMatch[0].replace('(', '').trim();
              const relatedHeading = headings.find(h =>
                h.text.toLowerCase().includes(functionName.toLowerCase())
              );
              if (relatedHeading) {
                matchingHeading = relatedHeading;
              }
            }
          }

          documents.push({
            id: `${file}-${index}`,
            title,
            content: paragraph,
            url,
            section: data.section,
            anchorId: matchingHeading?.anchorId,
          });
        }
      });
    }

    // public 디렉토리가 없으면 생성
    const publicDir = path.join(process.cwd(), 'public');
    try {
      await fs.access(publicDir);
    } catch {
      await fs.mkdir(publicDir, { recursive: true });
    }

    // 검색 데이터 저장
    const searchDataPath = path.join(publicDir, 'search-data.json');
    await fs.writeFile(searchDataPath, JSON.stringify(documents, null, 2));

    console.log(`✅ 검색 인덱스 생성 완료: ${documents.length}개 문서`);
    console.log(`📁 저장 위치: ${searchDataPath}`);

    // 샘플 문서 정보 출력
    console.log('\n📋 생성된 문서 샘플:');
    documents.slice(0, 3).forEach(doc => {
      console.log(`- ${doc.title}: ${doc.content.substring(0, 50)}...`);
    });
  } catch (error) {
    console.error('❌ 검색 인덱스 생성 실패:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  buildSearchIndex();
}

export { buildSearchIndex };
