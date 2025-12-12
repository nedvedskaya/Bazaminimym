# Favicon Files

## Текущие файлы
- `favicon.svg` - современный SVG favicon для всех браузеров
- `favicon.ico` - нужно создать для старых браузеров

## Генерация favicon.ico

Используйте онлайн-сервис для конвертации SVG в ICO:
1. https://favicon.io/
2. https://realfavicongenerator.net/

Или используйте ImageMagick:
```bash
convert favicon.svg -resize 32x32 favicon.ico
```

## Рекомендуемые размеры

### Базовый набор
- 16x16 - стандартный browser tab
- 32x32 - retina browser tab
- 48x48 - Windows site icon

### Полный набор (опционально)
- 180x180 - Apple touch icon
- 192x192 - Android chrome
- 512x512 - Android chrome (large)

## Apple Touch Icon

Создайте apple-touch-icon.png (180x180):
```html
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Manifest.json для PWA

Если хотите сделать PWA, создайте manifest.json:
```json
{
  "name": "Базовый Минимум",
  "short_name": "БМ",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#e3ee6b",
  "background_color": "#0A0A0A",
  "display": "standalone"
}
```
