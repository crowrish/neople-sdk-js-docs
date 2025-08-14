import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneLight,
  oneDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

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
            네오플 오픈 API를 위한 TypeScript/JavaScript SDK
          </p>
          <p className="mb-12 text-lg text-fd-muted-foreground max-w-3xl mx-auto">
            네오플 오픈 API에 쉽고 안전하게 접근하세요. 완전한 타입 안전성과
            다양한 HTTP 어댑터를 지원합니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/docs/overview"
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
            <div className="mb-4 text-2xl">📝</div>
            <h3 className="mb-2 text-lg font-semibold">완전한 TypeScript</h3>
            <p className="text-sm text-fd-muted-foreground">
              모든 API에 대한 타입 안전성과 자동완성
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border border-fd-border">
            <div className="mb-4 text-2xl">🔧</div>
            <h3 className="mb-2 text-lg font-semibold">다중 HTTP 어댑터</h3>
            <p className="text-sm text-fd-muted-foreground">
              Fetch, Axios, Got, Node-fetch 어댑터 지원
            </p>
          </div>
        </div>

        {/* Quick Start Code */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">빠른 시작</h2>
          <div className="text-left max-w-2xl mx-auto space-y-4">
            <div>
              <p className="text-sm text-fd-muted-foreground mb-2">설치</p>
              <div className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                <SyntaxHighlighter
                  language="bash"
                  style={{
                    ...oneLight,
                    'pre[class*="language-"]': {
                      ...oneLight['pre[class*="language-"]'],
                      background: 'transparent',
                    },
                  }}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    background: 'transparent',
                  }}
                  className="dark:hidden"
                >
                  npm install neople-sdk-js
                </SyntaxHighlighter>
                <SyntaxHighlighter
                  language="bash"
                  style={{
                    ...oneDark,
                    'pre[class*="language-"]': {
                      ...oneDark['pre[class*="language-"]'],
                      background: 'transparent',
                    },
                  }}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    background: 'transparent',
                  }}
                  className="hidden dark:block"
                >
                  npm install neople-sdk-js
                </SyntaxHighlighter>
              </div>
            </div>
            <div>
              <p className="text-sm text-fd-muted-foreground mb-2">사용법 - 던전앤파이터</p>
              <div className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                <SyntaxHighlighter
                  language="typescript"
                  style={{
                    ...oneLight,
                    'pre[class*="language-"]': {
                      ...oneLight['pre[class*="language-"]'],
                      background: 'transparent',
                    },
                  }}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    background: 'transparent',
                  }}
                  className="dark:hidden"
                >
                  {`import { NeopleDFClient } from 'neople-sdk-js';

const client = new NeopleDFClient(apiKey);
const characters = await client.searchCharacter('홍길동');`}
                </SyntaxHighlighter>
                <SyntaxHighlighter
                  language="typescript"
                  style={{
                    ...oneDark,
                    'pre[class*="language-"]': {
                      ...oneDark['pre[class*="language-"]'],
                      background: 'transparent',
                    },
                  }}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    background: 'transparent',
                  }}
                  className="hidden dark:block"
                >
                  {`import { NeopleDFClient } from 'neople-sdk-js';

const client = new NeopleDFClient(apiKey);
const characters = await client.searchCharacter('홍길동');`}
                </SyntaxHighlighter>
              </div>
            </div>
            <div>
              <p className="text-sm text-fd-muted-foreground mb-2">사용법 - 사이퍼즈</p>
              <div className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                <SyntaxHighlighter
                  language="typescript"
                  style={{
                    ...oneLight,
                    'pre[class*="language-"]': {
                      ...oneLight['pre[class*="language-"]'],
                      background: 'transparent',
                    },
                  }}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    background: 'transparent',
                  }}
                  className="dark:hidden"
                >
                  {`import { NeopleCyphersClient } from 'neople-sdk-js';

const client = new NeopleCyphersClient(apiKey);
const players = await client.searchPlayer('홍길동');`}
                </SyntaxHighlighter>
                <SyntaxHighlighter
                  language="typescript"
                  style={{
                    ...oneDark,
                    'pre[class*="language-"]': {
                      ...oneDark['pre[class*="language-"]'],
                      background: 'transparent',
                    },
                  }}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    background: 'transparent',
                  }}
                  className="hidden dark:block"
                >
                  {`import { NeopleCyphersClient } from 'neople-sdk-js';

const client = new NeopleCyphersClient(apiKey);
const players = await client.searchPlayer('홍길동');`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>

        {/* Neople Attribution */}
        <div className="text-center py-6 border-t border-fd-border mt-8">
          <a
            href="https://developers.neople.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <img
              src={process.env.NODE_ENV === 'production' ? '/neople-sdk-js-docs/images/neople.png' : '/images/neople.png'}
              alt="Neople 오픈 API"
              width={180}
              height={32}
              className="h-8 mx-auto"
            />
          </a>
        </div>
      </div>
    </main>
  );
}
