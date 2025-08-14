# neople-sdk-js Documentation

[![npm version](https://badge.fury.io/js/neople-sdk-js.svg)](https://www.npmjs.com/package/neople-sdk-js)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

Official documentation site for **neople-sdk-js** - A TypeScript SDK for the Neople Open API.

## Project Structure

This documentation site is a Next.js application built with [Fumadocs](https://fumadocs.dev).

### Directory Structure

```
├── app/
│   ├── (home)/                 # Main page and landing pages
│   ├── docs/                   # Documentation layout and pages
│   ├── layout.config.tsx       # Shared layout options
│   └── api/search/route.ts     # Search API endpoint
├── content/docs/               # MDX documentation files
├── lib/
│   └── source.ts              # Content source adapter
├── source.config.ts           # Fumadocs configuration file
└── README.md                  # Project description (this file)
```

### Key Components

- **`lib/source.ts`**: Content source adapter, provides [`loader()`](https://fumadocs.dev/docs/headless/source-api) interface to access your content
- **`app/layout.config.tsx`**: Shared options for layouts, optional but preferred to keep
- **`source.config.ts`**: Customize different options like frontmatter schema

### Route Structure

| Route                     | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| `app/(home)`              | The route group for your landing page and other pages |
| `app/docs`                | The documentation layout and pages                    |
| `app/api/search/route.ts` | The Route Handler for search                          |

### Fumadocs MDX

- Write documentation using MDX files
- Metadata management through frontmatter
- Automatic table of contents generation and search functionality
- Code highlighting and interactive component support

Read the [Fumadocs Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Development & Build

### Development Environment

```bash
# Install dependencies
yarn install

# Build search index (required for first run)
yarn build-search

# Start development server
yarn dev
```

### Production Build

⚠️ **Important**: This site includes Korean search functionality, so commands must be executed **in order**.

```bash
# 1. Build search index (Convert MDX documents to JSON)
yarn build-search

# 2. Build Next.js (Generate static site)
yarn build

# 3. Start production server (optional)
yarn start
```

**Or build all at once:**

```bash
# Build search index + Next.js build in one command
yarn build:full
```

### Korean Search Features

This documentation site uses a **custom Korean search engine**:

- ✅ **Chosung Search**: `ㄷㅈ` → `던전앤파이터` (Dungeon & Fighter)
- ✅ **Partial Search**: `던전` → `던전앤파이터 API`
- ✅ **Function Search**: `getCharacter` → Function descriptions
- ✅ **Anchor Links**: Click results to jump to exact locations

## Links

- **NPM Package**: [neople-sdk-js](https://www.npmjs.com/package/neople-sdk-js)
- **GitHub Repository**: [neople-sdk-js](https://github.com/crowrish/neople-sdk-js)
- **Type Definitions**: [neople-openapi-types](https://www.npmjs.com/package/neople-openapi-types)
- **한국어**: See [README.md](README.md) for Korean version

## Contributing

This documentation is open source. Feel free to contribute improvements, corrections, or additional examples.
