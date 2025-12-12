# Руководство по оптимизации производительности

## Реализованные оптимизации ✅

### 1. Open Graph разметка ✅
- ✅ Создан `/public/og-image.svg` (1200x630px)
- ✅ Добавлены `og:image`, `og:image:width`, `og:image:height`
- ✅ Добавлен `og:image:alt` для accessibility
- ✅ Twitter Card с изображением
- ✅ Все обязательные OG теги (type, url, title, description)

### 2. Schema.org микроразметка для автобизнеса ✅
Добавлены специализированные схемы:

#### ProfessionalService
- Образовательные услуги для автосервисов
- Охват: Россия
- Целевая аудитория: владельцы автосервисов, детейлинг студий, автомоек, СТО

#### EducationalOrganization
- Образовательная платформа для автобизнеса
- Преподает: техники продаж, работа с клиентами, скрипты, управление базой

#### HowTo Schema
- Пошаговое руководство "Как увеличить продажи в автосервисе"
- 5 шагов с детальным описанием
- Время выполнения: 2 часа

#### ItemList Schema
- Популярные запросы владельцев автосервисов
- 5 основных проблем и решений
- Структурированный список для поисковиков

### 3. Оптимизация изображений ✅

#### Lazy Loading
- ✅ Встроен в `ImageWithFallback` компонент
- ✅ `loading="lazy"` по умолчанию
- ✅ Загрузка только при появлении в viewport

#### Создан OptimizedImage компонент
```tsx
<OptimizedImage
  src="/image.jpg"
  alt="Description"
  lowQualitySrc="/image-low.jpg" // Optional placeholder
  aspectRatio="16/9"
  objectFit="cover"
/>
```

**Возможности:**
- Intersection Observer API для точного контроля загрузки
- Low-quality placeholder для лучшего UX
- Автоматический blur эффект при загрузке
- Поддержка aspect ratio
- Progressive image loading

#### Рекомендации по изображениям
1. **Формат**: Используйте WebP с JPEG fallback
2. **Сжатие**: TinyPNG или ImageOptim перед загрузкой
3. **Размеры**: 
   - Hero: 1920x1080 → 150-300KB
   - Модули: 800x600 → 50-100KB
   - Иконки/декор: SVG (вектор)
4. **Lazy loading**: Все изображения ниже fold
5. **Preload**: Только critical images (hero background)

### 4. Code Splitting и Minification ✅

#### Vite Config оптимизации
- ✅ Terser минификация с агрессивными настройками
- ✅ Удаление console.log в production
- ✅ Code splitting на chunks:
  - `react-vendor`: React, ReactDOM
  - `motion-vendor`: Motion library
  - `icons-vendor`: Lucide icons
- ✅ CSS code splitting
- ✅ Tree shaking (автоматически)
- ✅ ES2015 target для современных браузеров

#### Compression
- ✅ Gzip сжатие
- ✅ Brotli сжатие (лучше gzip)
- ✅ Threshold: 1KB (не сжимаем маленькие файлы)

### 5. Оптимизация загрузки ✅

#### Critical CSS
В `index.html`:
```css
/* Критичные стили для предотвращения layout shift */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui; }
```

#### Preconnect/DNS Prefetch
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://t.me">
```

#### Resource Hints
- `preconnect`: Для критичных доменов
- `dns-prefetch`: Для второстепенных ресурсов
- `prefetch`: Для следующих страниц (если есть)

### 6. Vite Build оптимизации ✅

```typescript
// vite.config.ts
{
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2
      }
    },
    rollupOptions: {
      output: {
        manualChunks: { ... }
      }
    }
  }
}
```

## Метрики производительности

### Целевые показатели (PageSpeed Insights):

#### Desktop
- ✅ Performance: 90+
- ✅ Accessibility: 95+
- ✅ Best Practices: 95+
- ✅ SEO: 100

#### Mobile
- ✅ Performance: 85+
- ✅ Accessibility: 95+
- ✅ Best Practices: 95+
- ✅ SEO: 100

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s ✅
- **FID** (First Input Delay): < 100ms ✅
- **CLS** (Cumulative Layout Shift): < 0.1 ✅
- **FCP** (First Contentful Paint): < 1.8s ✅
- **TTI** (Time to Interactive): < 3.8s ✅

## Дополнительные оптимизации

### 1. Service Worker (PWA)
```javascript
// Кэширование статических ресурсов
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/styles/globals.css',
        '/og-image.svg'
      ]);
    })
  );
});
```

### 2. HTTP/2 Server Push
```
Link: </og-image.svg>; rel=preload; as=image
Link: </styles/globals.css>; rel=preload; as=style
```

### 3. CDN для статики
- Cloudflare
- Vercel Edge Network
- AWS CloudFront

### 4. Image CDN
- Cloudinary
- imgix
- Vercel Image Optimization

## Чек-лист перед деплоем

### Изображения
- [ ] Все изображения сжаты (TinyPNG, ImageOptim)
- [ ] WebP формат с JPEG fallback
- [ ] Lazy loading на всех изображениях ниже fold
- [ ] Alt теги на всех изображениях
- [ ] Responsive images с srcset (опционально)

### JavaScript
- [ ] Bundle size < 200KB (gzipped)
- [ ] Code splitting настроен
- [ ] Удалены console.log
- [ ] Source maps отключены в production
- [ ] Minification включен

### CSS
- [ ] Критичные стили в <head>
- [ ] Неиспользуемые стили удалены
- [ ] CSS минифицирован
- [ ] Tailwind purge настроен

### Fonts
- [ ] System fonts используются (есть ✅)
- [ ] Или WOFF2 формат
- [ ] font-display: swap
- [ ] Preload для критичных шрифтов

### Network
- [ ] Gzip/Brotli сжатие включено
- [ ] HTTP/2 или HTTP/3
- [ ] CDN настроен
- [ ] Browser caching headers
- [ ] Service Worker (опционально)

### SEO & Social
- [x] Open Graph теги
- [x] Twitter Card
- [x] Schema.org разметка
- [x] sitemap.xml
- [x] robots.txt

## Инструменты для проверки

### Автоматизированные
1. **Lighthouse CI**
   ```bash
   npm install -g @lhci/cli
   lhci autorun
   ```

2. **WebPageTest**
   https://www.webpagetest.org/

3. **GTmetrix**
   https://gtmetrix.com/

### Ручные
1. **Chrome DevTools**
   - Performance tab
   - Network tab
   - Lighthouse tab
   - Coverage tab

2. **React DevTools Profiler**
   - Component render times
   - Re-render detection

## Мониторинг в production

### Web Vitals
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Отправка в Google Analytics
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_id: metric.id,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Real User Monitoring (RUM)
- Google Analytics
- Sentry Performance
- New Relic
- Datadog RUM

## Оптимизация по этапам

### Phase 1: Quick Wins ✅ (DONE)
- Image lazy loading
- Minification
- Gzip compression
- Open Graph
- Schema.org

### Phase 2: Advanced
- [ ] Service Worker
- [ ] HTTP/2 Push
- [ ] Image CDN
- [ ] Code splitting по роутам

### Phase 3: Fine-tuning
- [ ] Resource hints optimization
- [ ] Critical CSS extraction
- [ ] Prefetching next pages
- [ ] Bundle analyzer optimization

## Команды для сборки

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production
```bash
npm run preview
```

### Analyze Bundle
```bash
npm run build -- --mode analyze
```

---

**Статус**: ✅ Базовые оптимизации выполнены
**Ожидаемый результат**: PageSpeed Score 90+ Desktop, 85+ Mobile

Дата: 12 декабря 2024
