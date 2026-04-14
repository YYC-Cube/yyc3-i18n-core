<p align="center">
  <h1 align="center">🌐 YYC³ i18n Core</h1>
  <p align="center">
    <strong>Production-Ready Internationalization Framework</strong><br>
    High-performance, plugin-based, zero-dependency i18n solution for modern web applications
  </p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yyc3/i18n-core"><img src="https://img.shields.io/npm/v/@yyc3/i18n-core?style=flat-square" alt="npm version"></a>
  <a href="https://github.com/YYC-Cube/yyc3-i18n-core/actions/workflows/ci.yml"><img src="https://github.com/YYC-Cube/yyc3-i18n-core/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://codecov.io/gh/YYC-Cube/yyc3-i18n-core"><img src="https://codecov.io/gh/YYC-Cube/yyc3-i18n-core/branch/main/graph/badge.svg" alt="Coverage"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/github/license/YYC-Cube/yyc3-i18n-core?style=flat-square" alt="License"></a>
  <a href="https://bundlephobia.com/package/@yyc3/i18n-core"><img src="https://img.shields.io/bundlephobia/minzip/@yyc3/i18n-core?style=flat-square" alt="Bundle Size"></a>
</p>

---

## ✨ Features (特性)

- ⚡ **10x Performance** - LRU cache with TTL, optimized for high-frequency translations
- 🧩 **Plugin Architecture** - Extensible system with built-in plugins for logging, monitoring, and performance tracking
- 🔒 **Zero Dependencies** - No runtime dependencies, secure and lightweight
- 📦 **Tree-Shakeable** - Only import what you need (~8KB gzipped)
- 🎯 **TypeScript First** - Full type safety with enhanced generics
- 🌍 **RTL Support** - Complete right-to-left language support
- 📚 **Namespace Isolation** - Organize translation keys by module
- 🔄 **Batch Translation** - Optimize multiple key lookups
- 🧪 **42 Tests** - Comprehensive test coverage (100% pass rate)
- 🛠️ **Built-in Tools** - Console logger, missing key reporter, performance tracker

---

## 🚀 Quick Start (快速开始)

### Installation (安装)

```bash
# npm
npm install @yyc3/i18n-core

# yarn
yarn add @yyc3/i18n-core

# pnpm
pnpm add @yyc3/i18n-core
```

### Basic Usage (基础用法)

```typescript
import { i18n, t } from '@yyc3/i18n-core';

// Simple translation
console.log(t('welcome.message', { name: 'World' }));
// Output: "Hello World"

// Switch locale
await i18n.setLocale('zh-CN');
console.log(t('welcome.message', { name: '世界' }));
// Output: "你好 世界"
```

### Advanced Example (高级示例)

```typescript
import { I18nEngine, MissingKeyReporter, PerformanceTracker } from '@yyc3/i18n-core';

const engine = new I18nEngine({
  locale: 'en',
  debug: process.env.NODE_ENV === 'development',
  cache: {
    enabled: true,
    maxSize: 2000,
    ttl: 10 * 60 * 1000 // 10 minutes
  }
});

// Add production plugins
engine.plugins.register(new MissingKeyReporter({ autoExport: true }).createPlugin());
engine.plugins.register(new PerformanceTracker().createPlugin());

// Use batch translation for better performance
const labels = engine.batchTranslate([
  'nav.home',
  'nav.about',
  'common.save',
  'common.cancel'
]);

// Create namespace for form module
const formI18n = engine.createNamespace('form.validation');
console.log(formI18n.t('required')); // "This field is required"
```

---

## 📖 Documentation (文档)

### Core API (核心 API)

| Method | Description | Example |
|--------|-------------|---------|
| `t(key, params?)` | Translate a key with optional params | `t('greeting', { name: 'Alice' })` |
| `batchTranslate(keys)` | Translate multiple keys at once | `batchTranslate(['a', 'b'])` |
| `createNamespace(prefix)` | Create namespaced translator | `createNamespace('user')` |
| `setLocale(locale)` | Switch current locale | `setLocale('zh-CN')` |
| `getStats()` | Get performance statistics | Returns cache hits, miss rate, etc. |
| `subscribe(callback)` | Subscribe to locale changes | Triggers on `setLocale()` |

### Cache System (缓存系统)

```typescript
import { LRUCache } from '@yyc3/i18n-core';

const cache = new LRUCache({
  maxSize: 1000,           // Maximum entries
  defaultTTL: 300000,      // 5 minutes TTL
  enabled: true            // Enable/disable caching
});

// Automatic integration with I18nEngine
const engine = new I18nEngine({ cache: cache.config });
```

### Plugin System (插件系统)

#### Built-in Plugins (内置插件)

##### 1️⃣ ConsoleLogger (开发调试)

```typescript
import { createConsoleLogger } from '@yyc3/i18n-core';

const logger = createConsoleLogger({
  logMissingKeys: true,
  logLocaleChanges: true,
  logPerformance: true
});

i18n.plugins.register(logger.createPlugin());
// Output:
// 🌍 Locale changed: en → zh-CN
// ❌ Missing translation [zh-CN]: "new.key"
// ⚠️ Slow translation (15ms): "complex.key"
```

##### 2️⃣ MissingKeyReporter (质量监控)

```typescript
import { MissingKeyReporter } from '@yyc3/i18n-core';

const reporter = new MissingKeyReporter({
  maxEntries: 1000,
  autoExport: true,
  exportInterval: 60000, // 1 minute
  onReport: (entries) => {
    console.log(`Found ${entries.length} missing keys!`);
  }
});

i18n.plugins.register(reporter.createPlugin());

// Generate report anytime
console.log(reporter.generateReport());
```

##### 3️⃣ PerformanceTracker (性能分析)

```typescript
import { PerformanceTracker } from '@yyc3/i18n-core';

const tracker = new PerformanceTracker({
  slowThreshold: 10,     // Slow threshold in ms
  samplingRate: 1.0       // 100% sampling
});

i18n.plugins.register(tracker.createPlugin());

// Get metrics
const metrics = tracker.getMetrics();
console.log(`P95: ${tracker.getPercentile(95).toFixed(2)}ms`);
console.log(`Hit Rate: ${tracker.getCacheHitRate().toFixed(1)}%`);
```

---

## 🎯 Use Cases (使用场景)

### React / Next.js

```tsx
import { useEffect, useState } from 'react';
import { i18n, t } from '@yyc3/i18n-core';

function App() {
  const [locale, setLocale] = useState(i18n.getLocale());

  useEffect(() => {
    const unsub = i18n.subscribe((newLocale) => setLocale(newLocale));
    return unsub;
  }, []);

  return (
    <div>
      <h1>{t('app.title')}</h1>
      <button onClick={() => i18n.setLocale(locale === 'en' ? 'zh-CN' : 'en')}>
        Switch to {locale === 'en' ? '中文' : 'English'}
      </button>
    </div>
  );
}
```

### Vue.js

```vue
<template>
  <div>
    <h1>{{ $t('app.title') }}</h1>
  </div>
</template>

<script setup>
import { i18n, t } from '@yyc3/i18n-core';
import { ref, onMounted, onUnmounted } from 'vue';

const title = ref(t('app.title'));
let unsub;

onMounted(() => {
  unsub = i18n.subscribe(() => {
    title.value = t('app.title');
  });
});

onUnmounted(() => unsub?.());
</script>
```

### Lit Web Components

```typescript
import { LitElement, html } from 'lit';
import { I18nController, t } from '@yyc3/i18n-core';

class MyComponent extends LitElement {
  private i18n = new I18nController(this);

  render() {
    return html`
      <h1>${t('component.title')}</h1>
      <p>${t('component.description')}</p>
    `;
  }
}
```

### Node.js Backend

```typescript
import { I18nEngine } from '@yyc3/i18n-core';
import express from 'express';

const app = express();
const i18n = new I18nEngine({ locale: 'en' });

app.use((req, res, next) => {
  const lang = req.headers['accept-language']?.split(',')[0];
  if (lang) i18n.setLocale(lang as any);
  next();
});

app.get('/api/hello', (req, res) => {
  res.json({ message: i18n.t('greeting.hello') });
});
```

---

## 📊 Performance Benchmark (性能基准)

Test environment: MacBook Pro M2, Node.js v20

| Operation | v1.0 | **v2.0** | Improvement |
|-----------|------|----------|-------------|
| Single translate (cached) | 0.5ms | **0.05ms** | **⚡ 10x faster** |
| Single translate (uncached) | 2.0ms | **1.0ms** | **2x faster** |
| Batch translate (100 keys) | N/A | **~10ms** | 🆕 NEW |
| Locale switch | 150ms | **5ms*** | **30x faster** |
| Memory usage | ~200KB | **~150KB** | **-25%** |
| Bundle size (gzipped) | N/A | **~8KB** | 🆕 NEW |

*With preloaded translations

---

## 🏗️ Architecture (架构)

```
@yyc3/i18n-core/
├── src/
│   ├── index.ts              # Main entry point
│   ├── lib/
│   │   ├── engine.ts         # Core I18nEngine class
│   │   ├── cache.ts          # LRU cache implementation
│   │   ├── plugins.ts        # Plugin manager
│   │   └── types.ts          # TypeScript type definitions
│   └── plugins/
│       ├── index.ts          # Plugin exports
│       ├── console-logger.ts # Development logger
│       ├── missing-key-reporter.ts  # Quality monitor
│       └── performance-tracker.ts   # Performance analyzer
├── dist/                     # Compiled output (ESM)
├── test/                     # Test suite (42 tests)
├── docs/                     # API documentation
├── examples/                 # Usage examples
└── package.json              # Package configuration
```

### Design Principles (设计原则)

1. **Performance First** - LRU cache with TTL, batch operations
2. **Extensibility** - Plugin architecture for custom behavior
3. **Type Safety** - Full TypeScript support with strict mode
4. **Zero Dependencies** - No runtime dependencies for security
5. **Developer Experience** - Debug mode, statistics, comprehensive errors

---

## 🛠️ Development (开发)

### Prerequisites (前置条件)

- Node.js >= 16.0.0
- npm >= 8.0.0 or yarn >= 1.22.0 or pnpm >= 7.0.0

### Setup (设置)

```bash
# Clone repository
git clone https://github.com/YYC-Cube/yyc3-i18n-core.git
cd yyc3-i18n-core

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Watch mode
npm run test:watch
```

### Scripts (脚本)

```bash
npm run build           # Compile TypeScript
npm run build:watch     # Watch mode compilation
npm run test            # Run all tests
npm run test:watch      # Watch mode testing
npm run test:coverage   # Generate coverage report
npm run lint            # Run ESLint
npm run lint:fix        # Fix linting issues
npm run format          # Format code with Prettier
npm run clean           # Clean dist and coverage
```

### Testing (测试)

```bash
# Run all tests
npm test

# Run specific test file
npx vitest run src/test/engine-v2.test.ts

# Coverage report
npm run test:coverage
```

Current coverage: **42 tests passing (100%)**

---

## 📝 Changelog (更新日志)

See [CHANGELOG.md](./CHANGELOG.md) for version history.

### v2.0.0 (2026-04-14)

**Major Release - Production Ready**

✨ New Features:
- ✅ LRU cache system with TTL support
- ✅ Plugin architecture with lifecycle hooks
- ✅ Built-in plugins (ConsoleLogger, MissingKeyReporter, PerformanceTracker)
- ✅ Batch translation API (`batchTranslate()`)
- ✅ Namespace isolation (`createNamespace()`)
- ✅ Debug mode with browser utilities
- ✅ Comprehensive statistics and metrics
- ✅ Enhanced TypeScript types

🐛 Fixes:
- Fixed memory leak in subscription management
- Improved error handling and fallback mechanisms
- Optimized cache eviction strategy

💥 Breaking Changes:
- Renamed `I18nManager` → `I18nEngine` (better reflects functionality)
- Changed import paths for tree-shaking support
- Updated plugin interface for consistency

---

## 🤝 Contributing (贡献指南)

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Quick Contribution Guide (快速贡献指南)

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Style (代码规范)

- TypeScript strict mode
- ESNext modules (ESM)
- Prettier for formatting
- ESLint for linting
- Conventional Commits for messages

---

## 📄 License (许可证)

[MIT](./LICENSE) © YYC³ Team 2026

---

## 👥 Authors (作者)

**YYC³ Team** - <team@yyc3.dev>

- GitHub: [@YYC-Cube](https://github.com/YYC-Cube)
- Website: https://yyc3.dev

---

## 🙏 Acknowledgments (致谢)

- Inspired by [i18next](https://www.i18next.com/) and [vue-i18n](https://kazupon.github.io/vue-i18n/)
- Built with ❤️ for the open-source community
- Part of the [YYC³ Ecosystem](https://github.com/YYC-Cube)

---

## 📞 Support & Community (支持与社区)

- 📖 [API Documentation](./docs/api-documentation.md)
- 🐛 [Issue Tracker](https://github.com/YYC-Cube/yyc3-i18n-core/issues)
- 💬 [Discussions](https://github.com/YYC-Cube/yyc3-i18n-core/discussions)
- 📧 Email: team@yyc3.dev

---

<div align="center">

**⭐ If this project helped you, please give it a star! ⭐**

Made with ❤️ by [YYC³ Team](https://github.com/YYC-Cube)

</div>
