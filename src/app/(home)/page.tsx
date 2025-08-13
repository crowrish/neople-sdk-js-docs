import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center px-4 pt-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Neople SDK
          </h1>
          <p className="mb-8 text-xl sm:text-2xl text-fd-muted-foreground max-w-2xl mx-auto">
            네오플 오픈 API를 위한 공식 TypeScript SDK
          </p>
          <p className="mb-12 text-lg text-fd-muted-foreground max-w-3xl mx-auto">
            던전앤파이터와 사이퍼즈 게임 데이터에 쉽고 안전하게 접근하세요. 
            완전한 타입 안전성과 다양한 HTTP 어댑터를 지원합니다.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/docs"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              시작하기
            </Link>
            <Link
              href="/docs/overview"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-fd-foreground border border-fd-border hover:bg-fd-muted rounded-lg transition-colors"
            >
              문서 보기
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
          <div className="text-center p-6 rounded-lg border border-fd-border">
            <div className="mb-4 text-2xl">🔧</div>
            <h3 className="mb-2 text-lg font-semibold">다중 HTTP 어댑터</h3>
            <p className="text-sm text-fd-muted-foreground">
              Fetch, Axios, Got, Node-fetch 어댑터 지원
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg border border-fd-border">
            <div className="mb-4 text-2xl">📝</div>
            <h3 className="mb-2 text-lg font-semibold">완전한 TypeScript</h3>
            <p className="text-sm text-fd-muted-foreground">
              모든 API에 대한 타입 안전성과 자동완성
            </p>
          </div>
        </div>

        {/* Quick Start Code */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">빠른 시작</h2>
          <div className="text-left max-w-2xl mx-auto space-y-4">
            <div>
              <p className="text-sm text-fd-muted-foreground mb-2">설치</p>
              <pre className="bg-fd-background border border-fd-border rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-fd-foreground">npm install neople-sdk-js</code>
              </pre>
            </div>
            <div>
              <p className="text-sm text-fd-muted-foreground mb-2">사용법</p>
              <pre className="bg-fd-background border border-fd-border rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-fd-foreground">
{`import { NeopleDFClient } from 'neople-sdk-js';

const client = new NeopleDFClient(apiKey);
const characters = await client.searchCharacter('홍길동');`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Supported Games */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">지원 게임</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/docs/api-dungeon-fighter"
              className="group p-6 rounded-lg border border-fd-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-200"
            >
              <h3 className="mb-2 text-lg font-semibold group-hover:text-blue-600">던전앤파이터</h3>
              <p className="text-sm text-fd-muted-foreground mb-4">
                캐릭터, 장비, 경매장, 아바타 마켓 등 모든 API 지원
              </p>
              <span className="text-blue-600 group-hover:text-blue-700 font-medium">
                API 문서 →
              </span>
            </Link>
            
            <Link
              href="/docs/api-cyphers"
              className="group p-6 rounded-lg border border-fd-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-200"
            >
              <h3 className="mb-2 text-lg font-semibold group-hover:text-blue-600">사이퍼즈</h3>
              <p className="text-sm text-fd-muted-foreground mb-4">
                플레이어, 경기 기록, 랭킹, 캐릭터 정보 등 완전 지원
              </p>
              <span className="text-blue-600 group-hover:text-blue-700 font-medium">
                API 문서 →
              </span>
            </Link>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center py-8 border-t border-fd-border">
          <p className="mb-4 text-fd-muted-foreground">
            지금 바로 시작해보세요
          </p>
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center px-6 py-2 text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            설치 및 설정 가이드 →
          </Link>
        </div>
      </div>
    </main>
  );
}
