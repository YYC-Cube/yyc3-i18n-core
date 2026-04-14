/**
 * @fileoverview YYC³ i18n Core - Production-Ready Internationalization Framework
 * @version 2.0.0
 * @author YYC³ Team <team@yyc3.dev>
 * @license MIT
 * @see https://github.com/YYC-Cube/yyc3-i18n-core
 *
 * @description
 * High-performance, plugin-based, zero-dependency i18n solution for modern web applications.
 */

// Core Engine
export { I18nEngine, i18n, t } from "./lib/engine.js";
export type { I18nEngineConfig } from "./lib/engine.js";

// Cache System
export { LRUCache } from "./lib/cache.js";
export type { CacheConfig, CacheStats } from "./lib/cache.js";

// Plugin System
export { PluginManager } from "./lib/plugins.js";
export type { I18nPlugin, I18nContext } from "./lib/plugins.js";

// Built-in Plugins (from plugins/index.ts)
export {
  createConsoleLogger,
  MissingKeyReporter,
  PerformanceTracker,
} from "./lib/plugins/index.js";

// Formatter utilities
export { interpolate, pluralize, formatRelativeTime } from "./lib/formatter.js";
export type { TranslateParams } from "./lib/formatter.js";

// Locale detection
export {
  detectSystemLocale,
  normalizeLocale,
  isChineseLocale,
} from "./lib/detector.js";
export type { LocaleDetectionResult } from "./lib/detector.js";
