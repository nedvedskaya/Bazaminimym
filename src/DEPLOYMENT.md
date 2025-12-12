# 🚀 Инструкция по деплою

## Готовность к production

### ✅ Чеклист перед деплоем

- [x] Мета-теги настроены (index.html)
- [x] Мобильные оптимизации применены (globals.css)
- [x] Viewport height fix добавлен (App.tsx)
- [x] Browser compatibility настроена (.browserslistrc)
- [x] Favicon создан (favicon.svg)
- [x] Touch targets >= 44x44px
- [x] iOS zoom prevention
- [x] Safe area support для notch
- [x] Smooth scroll настроен
- [x] Overflow hidden (нет горизонтального скролла)

### 🔧 Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# Production
VITE_APP_TITLE=Базовый Минимум
VITE_TELEGRAM_BOT=https://t.me/clubmanagers_bot

# Analytics (опционально)
VITE_GA_ID=G-XXXXXXXXXX
VITE_YM_ID=XXXXXXXX
```

## 📦 Build для production

```bash
# Установка зависимостей
npm install

# Build
npm run build

# Preview build локально
npm run preview
```

Результат в папке `dist/`

## 🌐 Платформы для деплоя

### 1. Vercel (рекомендуется)

**Преимущества**:
- Автоматический SSL
- CDN по всему миру
- Автодеплой из GitHub
- Бесплатно для hobby проектов

**Шаги**:
1. Зарегистрироваться на vercel.com
2. Подключить GitHub репозиторий
3. Настроить проект:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!

**Настройки (vercel.json)**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 2. Netlify

**Шаги**:
1. Зарегистрироваться на netlify.com
2. New site from Git → выбрать репозиторий
3. Настройки:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

**Настройки (netlify.toml)**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### 3. GitHub Pages

**Шаги**:
1. Установить gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Добавить в package.json:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/repo-name"
}
```

3. Деплой:
```bash
npm run deploy
```

### 4. Custom VPS (nginx)

**nginx конфигурация**:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/your-app/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

## 🔒 SSL/HTTPS

**Обязательно для production!**

### Vercel/Netlify
- Автоматически предоставляют SSL

### Custom domain
1. Получить бесплатный SSL через Let's Encrypt:
```bash
sudo certbot --nginx -d yourdomain.com
```

2. Auto-renewal:
```bash
sudo certbot renew --dry-run
```

## 📊 Мониторинг и Analytics

### Google Analytics 4

Добавить в `index.html` перед `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Яндекс.Метрика

```html
<!-- Yandex.Metrika -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
```

## ⚡ Оптимизация после деплоя

### 1. Минификация и компрессия
- ✅ Vite автоматически минифицирует в production
- ✅ Включите gzip/brotli на сервере

### 2. CDN
- Vercel/Netlify - встроенный CDN
- Cloudflare - бесплатный CDN для custom domains

### 3. Image optimization
- Используйте WebP формат где возможно
- Lazy loading для изображений
- Responsive images

### 4. Fonts
- Используйте font-display: swap
- Preload критичных шрифтов
- Subset fonts (только нужные символы)

## 🐛 Debugging production

### Source Maps
По умолчанию отключены в production. Для включения:

`vite.config.js`:
```js
export default {
  build: {
    sourcemap: true
  }
}
```

### Error tracking

Рекомендуется Sentry:
```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

## 📱 Progressive Web App (опционально)

### 1. Manifest.json
Уже создан в `/public/manifest.json`

### 2. Service Worker
```bash
npm install vite-plugin-pwa -D
```

`vite.config.js`:
```js
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Базовый Минимум',
        short_name: 'БМ',
        theme_color: '#e3ee6b',
      }
    })
  ]
}
```

## 🎯 Post-Deploy тестирование

### Обязательные проверки:
1. [ ] Открывается на iPhone (Safari)
2. [ ] Открывается на Android (Chrome)
3. [ ] Все кнопки работают
4. [ ] Telegram bot ссылка открывается
5. [ ] Калькулятор работает
6. [ ] Модальные окна открываются
7. [ ] Нет console errors
8. [ ] SSL работает (https://)
9. [ ] Favicon отображается
10. [ ] Meta tags правильные (Open Graph)

### Performance проверка:
- Google PageSpeed Insights
- Lighthouse в Chrome DevTools
- GTmetrix
- WebPageTest

Целевые показатели:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## 🔄 CI/CD (опционально)

### GitHub Actions

`.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test # если есть тесты
```

## 🆘 Troubleshooting

### Проблема: Не работает routing (404)
**Решение**: Настроить SPA fallback (rewrites к index.html)

### Проблема: Белый экран на мобильном
**Решение**: Проверить console errors, возможно JS ошибка

### Проблема: Медленная загрузка
**Решение**: 
1. Включить compression
2. Оптимизировать изображения
3. Использовать CDN

### Проблема: Зум на iOS
**Решение**: Проверить что font-size inputs >= 16px

## 📞 Support

Если возникли проблемы:
1. Проверить `/BROWSER_COMPATIBILITY.md`
2. Проверить `/TESTING.md`
3. Посмотреть browser console errors

---

**Ready to deploy!** 🚀
