/**
 * Константы приложения
 * Централизованное хранение всех магических значений
 */

// URLs
export const TELEGRAM_BOT_URL = 'https://t.me/clubmanagers_bot';

// Цвета
export const COLORS = {
  primary: '#e3ee6b',      // Желто-зеленый акцент
  primaryHover: '#d4df5a', // Hover состояние
  primaryLight: '#e8f285', // Светлый вариант
  dark: '#0A0A0A',         // Черный
  white: '#ffffff',        // Белый
  gray: '#666',            // Серый текст
  grayLight: '#999',       // Светло-серый
} as const;

// Навигационные ссылки
export const NAV_LINKS = [
  { href: '#program', label: 'Программа' },
  { href: '#testimonials', label: 'Отзывы' },
  { href: '#price', label: 'Цена' },
  { href: '#faq', label: 'FAQ' },
] as const;

// Цены
export const PRICING = {
  current: 2490,
  original: 4990,
  currency: '₽',
} as const;

// Даты
export const COURSE_START_DATE = '2025-01-12T00:00:00';

// Анимация
export const ANIMATION_CONFIG = {
  duration: 2000,
  steps: 60,
  counterDelay: 15000, // 15 секунд между уведомлениями
  notificationDuration: 4000, // 4 секунды показа уведомления
  initialNotificationDelay: 3000, // 3 секунды до первого уведомления
} as const;

// Z-index слои
export const Z_INDEX = {
  progressBar: 100,
  navigation: 50,
  modal: 60,
  mobileMenu: 40,
  livePurchase: 40,
} as const;
