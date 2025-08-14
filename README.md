# neople-sdk-js 문서

[![npm version](https://badge.fury.io/js/neople-sdk-js.svg)](https://www.npmjs.com/package/neople-sdk-js)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

**neople-sdk-js**의 공식 문서 사이트 - 넥슨 네오플 Open API를 위한 TypeScript SDK입니다.

## 프로젝트 구성

이 문서 사이트는 [Fumadocs](https://fumadocs.dev)를 기반으로 한 Next.js 애플리케이션입니다.

### 디렉토리 구조

```
├── app/
│   ├── (home)/                 # 메인 페이지 및 랜딩 페이지
│   ├── docs/                   # 문서 레이아웃 및 페이지
│   ├── layout.config.tsx       # 레이아웃 공통 설정
│   └── api/search/route.ts     # 검색 API 엔드포인트
├── content/docs/               # MDX 문서 파일들
├── lib/
│   └── source.ts              # 콘텐츠 소스 어댑터
├── source.config.ts           # Fumadocs 설정 파일
└── README.md                  # 프로젝트 설명 (이 파일)
```

### 주요 구성 요소

- **`lib/source.ts`**: 콘텐츠 소스 어댑터, [`loader()`](https://fumadocs.dev/docs/headless/source-api) 인터페이스를 통해 문서 콘텐츠에 접근
- **`app/layout.config.tsx`**: 레이아웃 간 공유되는 옵션들, 선택사항이지만 유지 권장
- **`source.config.ts`**: frontmatter 스키마 등 다양한 옵션 커스터마이징 가능

### 라우트 구조

| 라우트                    | 설명                                          |
| ------------------------- | --------------------------------------------- |
| `app/(home)`              | 메인 페이지 및 기타 페이지를 위한 라우트 그룹 |
| `app/docs`                | 문서 레이아웃 및 페이지                       |
| `app/api/search/route.ts` | 검색 기능을 위한 라우트 핸들러                |

### Fumadocs MDX

- MDX 파일을 사용하여 문서 작성
- frontmatter를 통한 메타데이터 관리
- 자동 목차 생성 및 검색 기능 지원
- 코드 하이라이팅 및 인터랙티브 컴포넌트 지원

자세한 내용은 [Fumadocs Introduction](https://fumadocs.dev/docs/mdx)을 참조하세요.

## 개발 및 빌드

### 개발 환경

```bash
# 의존성 설치
yarn install

# 검색 인덱스 생성 (첫 실행시 필요)
yarn build-search

# 개발 서버 시작
yarn dev
```

### 프로덕션 빌드

⚠️ **중요**: 한글 검색 기능이 포함되어 있으므로 반드시 **순서대로** 실행해야 합니다.

```bash
# 1. 검색 인덱스 생성 (MDX 문서를 JSON으로 변환)
yarn build-search

# 2. Next.js 빌드 (정적 사이트 생성)
yarn build

# 3. 프로덕션 서버 시작 (선택사항)
yarn start
```

**또는 한번에 빌드:**

```bash
# 검색 인덱스 생성 + Next.js 빌드를 한번에 실행
yarn build:full
```

### 한글 검색 기능

이 문서 사이트는 **커스텀 한글 검색 엔진**을 사용합니다:

- ✅ **초성 검색**: `ㄷㅈ` → `던전앤파이터`
- ✅ **부분 검색**: `던전` → `던전앤파이터 API`
- ✅ **함수명 검색**: `getCharacter` → 해당 함수 설명
- ✅ **앵커 링크**: 검색 결과 클릭시 정확한 위치로 이동

## 링크

- **NPM 패키지**: [neople-sdk-js](https://www.npmjs.com/package/neople-sdk-js)
- **GitHub 저장소**: [neople-sdk-js](https://github.com/crowrish/neople-sdk-js)
- **타입 정의**: [neople-openapi-types](https://www.npmjs.com/package/neople-openapi-types)
- **English**: [README-en.md](README-en.md)에서 영문 버전을 확인하세요

## 기여하기

이 문서는 오픈 소스입니다. 개선 사항, 수정 사항, 또는 추가 예제에 대한 기여를 환영합니다.
