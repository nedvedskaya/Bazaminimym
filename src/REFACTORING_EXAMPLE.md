# 🔧 Пример рефакторинга (До → После)

## Навигация (Desktop Menu)

### ❌ ДО (дублирование кода)

```typescript
<div className="hidden md:flex items-center gap-6">
  <a 
    href="#program" 
    className={`text-sm lg:text-base transition-colors font-medium ${
      scrollProgress > 5 
        ? 'text-[#0A0A0A] hover:text-[#e3ee6b]' 
        : 'text-white/90 hover:text-[#e3ee6b]'
    }`}
  >
    Программа
  </a>
  <a 
    href="#testimonials" 
    className={`text-sm lg:text-base transition-colors font-medium ${
      scrollProgress > 5 
        ? 'text-[#0A0A0A] hover:text-[#e3ee6b]' 
        : 'text-white/90 hover:text-[#e3ee6b]'
    }`}
  >
    Отзывы
  </a>
  <a 
    href="#price" 
    className={`text-sm lg:text-base transition-colors font-medium ${
      scrollProgress > 5 
        ? 'text-[#0A0A0A] hover:text-[#e3ee6b]' 
        : 'text-white/90 hover:text-[#e3ee6b]'
    }`}
  >
    Цена
  </a>
  <a 
    href="#faq" 
    className={`text-sm lg:text-base transition-colors font-medium ${
      scrollProgress > 5 
        ? 'text-[#0A0A0A] hover:text-[#e3ee6b]' 
        : 'text-white/90 hover:text-[#e3ee6b]'
    }`}
  >
    FAQ
  </a>
  <motion.button
    onClick={() => setIsModalOpen(true)}
    className="bg-[#e3ee6b] text-[#0A0A0A] px-6 py-2.5 rounded-full hover:bg-[#d4df5a] transition-colors text-sm lg:text-base font-semibold"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Купить курс
  </motion.button>
</div>
```

**Проблемы:**
- 🔴 4 копии одинакового кода для ссылок
- 🔴 Стили кнопки хардкодятся
- 🔴 ~50 строк кода

---

### ✅ ПОСЛЕ (DRY)

```typescript
import { NAV_LINKS } from './constants';
import { NavLink } from './components/shared/NavLink';
import { CTAButton } from './components/shared/CTAButton';

<div className="hidden md:flex items-center gap-6">
  {NAV_LINKS.map((link) => (
    <NavLink 
      key={link.href}
      href={link.href}
      scrolled={scrollProgress > 5}
    >
      {link.label}
    </NavLink>
  ))}
  <CTAButton onClick={() => setIsModalOpen(true)}>
    Купить курс
  </CTAButton>
</div>
```

**Преимущества:**
- ✅ Всего ~10 строк кода
- ✅ Легко добавить новую ссылку (просто в NAV_LINKS)
- ✅ Стили в одном месте (NavLink компонент)
- ✅ CTA кнопка переиспользуемая

**Экономия:** 40 строк кода (80% уменьшение!)

---

## Hero CTA кнопка

### ❌ ДО

```typescript
<motion.a 
  href="https://t.me/clubmanagers_bot"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative bg-[#e3ee6b] text-[#0A0A0A] px-6 sm:px-8 py-4 sm:py-5 rounded-full hover:bg-[#e8f285] transition-all inline-flex items-center justify-center gap-2 sm:gap-3 touch-manipulation overflow-hidden w-full sm:w-auto"
  whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(227, 238, 107, 0.4)" }}
  whileTap={{ scale: 0.95 }}
>
  <span className=\"relative z-10 text-base sm:text-lg md:text-xl font-bold\">
    Купить курс за 2490₽
  </span>
  <ArrowRight className=\"w-5 h-5 sm:w-6 sm:h-6 text-[#0A0A0A] relative z-10\" />
</motion.a>
```

**Проблемы:**
- 🔴 15+ строк для одной кнопки
- 🔴 URL хардкодится
- 🔴 Цена хардкодится
- 🔴 Стили хардкодятся

---

### ✅ ПОСЛЕ

```typescript
import { PRICING } from './constants';
import { CTALink } from './components/shared/CTAButton';

<CTALink variant="primary" showArrow>
  Купить курс за {PRICING.current}{PRICING.currency}
</CTALink>
```

**Преимущества:**
- ✅ 3 строки вместо 15
- ✅ Цена из константы (легко менять)
- ✅ URL из константы
- ✅ Стили переиспользуются
- ✅ Если нужно изменить дизайн всех CTA - меняем в одном месте

**Экономия:** 12 строк × 5 кнопок = 60 строк!

---

## Счетчики

### ❌ ДО (два дублирующих компонента)

```typescript
// AnimatedNumber компонент (строки 32-55)
const AnimatedNumber = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}{suffix}</>;
};

// LiveCounter компонент (строки 88-117) - ТОЧНО ТАКАЯ ЖЕ ЛОГИКА!
const LiveCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.span 
      className="text-4xl sm:text-5xl md:text-6xl font-black text-[#e3ee6b]"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
    >
      {count}
    </motion.span>
  );
};

// Использование:
<AnimatedNumber value={155} suffix="" />
<LiveCounter target={purchaseCount} />
```

**Проблемы:**
- 🔴 50+ строк дублирующего кода
- 🔴 Два компонента делают одно и то же
- 🔴 Сложно поддерживать (изменения в двух местах)

---

### ✅ ПОСЛЕ (один универсальный компонент)

```typescript
import { AnimatedCounter } from './components/shared/AnimatedCounter';

// Простой счетчик:
<AnimatedCounter value={155} />

// Счетчик с анимацией:
<AnimatedCounter 
  value={purchaseCount} 
  animate 
  className="text-4xl sm:text-5xl md:text-6xl font-black text-[#e3ee6b]"
/>

// С суффиксом:
<AnimatedCounter value={89} suffix="%" />
```

**Преимущества:**
- ✅ Один компонент для всех случаев
- ✅ Опциональная анимация
- ✅ Кастомные стили через className
- ✅ Легко тестировать
- ✅ Легко переиспользовать в других проектах

**Экономия:** 40+ строк кода

---

## Mobile Menu

### ❌ ДО

```typescript
<div className="flex flex-col items-center justify-center h-full gap-8 px-6">
  <motion.a
    href="#program"
    className="text-white text-2xl font-medium hover:text-[#e3ee6b] transition-colors"
    onClick={() => setIsMobileMenuOpen(false)}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.1 }}
  >
    Программа
  </motion.a>
  <motion.a
    href="#testimonials"
    className="text-white text-2xl font-medium hover:text-[#e3ee6b] transition-colors"
    onClick={() => setIsMobileMenuOpen(false)}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    Отзывы
  </motion.a>
  <motion.a
    href="#price"
    className="text-white text-2xl font-medium hover:text-[#e3ee6b] transition-colors"
    onClick={() => setIsMobileMenuOpen(false)}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    Цена
  </motion.a>
  <motion.a
    href="#faq"
    className="text-white text-2xl font-medium hover:text-[#e3ee6b] transition-colors"
    onClick={() => setIsMobileMenuOpen(false)}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.4 }}
  >
    FAQ
  </motion.a>
  <motion.button
    onClick={() => {
      setIsMobileMenuOpen(false);
      setIsModalOpen(true);
    }}
    className="bg-[#e3ee6b] text-[#0A0A0A] px-10 py-4 rounded-full text-xl font-semibold mt-4"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.5 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Купить курс
  </motion.button>
</div>
```

**Проблемы:**
- 🔴 ~70 строк кода
- 🔴 4 копии motion.a с одинаковыми стилями
- 🔴 Хардкод delays (0.1, 0.2, 0.3, 0.4)

---

### ✅ ПОСЛЕ

```typescript
import { NAV_LINKS } from './constants';
import { NavLink } from './components/shared/NavLink';
import { CTAButton } from './components/shared/CTAButton';

<div className="flex flex-col items-center justify-center h-full gap-8 px-6">
  {NAV_LINKS.map((link, index) => (
    <NavLink
      key={link.href}
      href={link.href}
      variant="mobile"
      delay={0.1 * (index + 1)}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {link.label}
    </NavLink>
  ))}
  <CTAButton 
    variant="compact"
    onClick={() => {
      setIsMobileMenuOpen(false);
      setIsModalOpen(true);
    }}
  >
    Купить курс
  </CTAButton>
</div>
```

**Преимущества:**
- ✅ ~15 строк вместо 70
- ✅ Delays вычисляются автоматически
- ✅ Легко добавить/удалить ссылку
- ✅ Стили централизованы

**Экономия:** 55 строк кода (78% уменьшение!)

---

## 📊 Итоговая экономия

### Desktop Menu
- **Было:** 50 строк
- **Стало:** 10 строк
- **Экономия:** 40 строк (80%)

### Mobile Menu
- **Было:** 70 строк
- **Стало:** 15 строк
- **Экономия:** 55 строк (78%)

### CTA Кнопки (5 штук)
- **Было:** 75 строк (15×5)
- **Стало:** 15 строк (3×5)
- **Экономия:** 60 строк (80%)

### Счетчики
- **Было:** 50 строк (два компонента)
- **Стало:** 0 строк (переиспользуемый)
- **Экономия:** 50 строк (100%)

### Animation Variants
- **Было:** 30 строк
- **Стало:** 0 строк (импорт)
- **Экономия:** 30 строк (100%)

---

## 🎯 Общая экономия

**Всего:** ~235 строк кода  
**Процент:** ~12% от всего App.tsx  
**Бонус:** Код стал в 3-4 раза легче поддерживать!

---

## 💡 Как применить эти изменения

1. **Скопируйте созданные файлы** из предыдущих сообщений:
   - `/constants/index.ts`
   - `/components/shared/AnimatedCounter.tsx`
   - `/components/shared/CTAButton.tsx`
   - `/components/shared/NavLink.tsx`
   - `/utils/animation-variants.ts`

2. **Добавьте импорты** в начало App.tsx

3. **Замените код** постепенно, секция за секцией

4. **Тестируйте** после каждой замены

5. **Удалите старый код** когда всё работает

---

**Результат:** Чистый, поддерживаемый код с минимальным дублированием! 🎉
