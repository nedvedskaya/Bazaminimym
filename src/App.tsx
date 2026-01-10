import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Layers, 
  Mic, 
  ShieldAlert, 
  BarChart3, 
  Database,
  Menu,
  X,
  Star,
  Users,
  TrendingUp,
  Zap,
  Clock,
  ChevronDown,
  Play,
  Sparkles,
  Banknote,
  Coins,
  Shield,
  AlertTriangle,
  TrendingDown,
  ShoppingCart,
  Eye
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { safeStorage } from './utils/storage';

// Animated Number Component
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

// Live Purchase Notification Component
const LivePurchase = ({ name, city, show }: { name: string; city: string; show: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed left-4 bottom-20 sm:bottom-24 z-40 bg-white rounded-xl shadow-2xl p-4 border-2 border-[#e3ee6b] max-w-[320px] sm:max-w-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#e3ee6b] rounded-full flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-5 h-5 text-[#0A0A0A]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#0A0A0A] mb-1">Новая покупка!</p>
              <p className="text-xs text-[#666]">
                <span className="font-semibold">{name}</span> из {city} купил курс
              </p>
              <p className="text-xs text-[#999] mt-1">3 минуты назад</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Live Counter Component
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
    >
      {count}
    </motion.span>
  );
};

// Live Purchase Counter Component - shows incrementing number
const LivePurchaseCounter = ({ count, setCount }: { count: number; setCount: (value: number | ((prev: number) => number)) => void }) => {
  useEffect(() => {
    // Check once per day (24 hours = 86400000 ms)
    const dailyInterval = 86400000;
    
    const addDailyIncrement = () => {
      // Random increment between 5-15 per day
      const randomIncrement = Math.floor(Math.random() * 11) + 5;
      setCount(prev => {
        const newValue = prev + randomIncrement;
        safeStorage.setNumber('purchaseCount', newValue);
        safeStorage.setNumber('purchaseCountTimestamp', Date.now());
        return newValue;
      });
    };
    
    const timeout = setTimeout(addDailyIncrement, dailyInterval);
    return () => clearTimeout(timeout);
  }, [setCount]);

  return (
    <motion.span
      key={count}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {count}
    </motion.span>
  );
};

// Live Indicator Component
const LiveIndicator = () => {
  return (
    <div className="inline-flex items-center gap-1.5 mt-2">
      <motion.div 
        className="w-1.5 h-1.5 bg-[#e3ee6b] rounded-full"
        animate={{ 
          opacity: [1, 0.4, 1]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="text-[10px] sm:text-xs text-[#666] uppercase tracking-wide">Счетчик обновляется в реальном времени</span>
    </div>
  );
};

// Loss Calculator Component
const LossCalculator = () => {
  const [callsPerDay, setCallsPerDay] = useState<string>('10');
  const [lostClientsPerDay, setLostClientsPerDay] = useState<string>('2');
  const [avgCheck, setAvgCheck] = useState<string>('50000');

  const callsNum = parseInt(callsPerDay) || 0;
  const lostNum = parseInt(lostClientsPerDay) || 0;
  const avgCheckNum = parseInt(avgCheck) || 0;

  // Calculate monthly loss (daily lost clients × 30 days × average check)
  const monthlyLoss = lostNum * 30 * avgCheckNum;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const handleBlur = (value: string, setValue: (v: string) => void, min: number, max: number, defaultVal: string) => {
    const num = parseInt(value);
    if (isNaN(num) || num < min) {
      setValue(defaultVal);
    } else if (num > max) {
      setValue(max.toString());
    }
  };

  return (
    <div 
      className="bg-white border-2 border-[#e3ee6b]/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-8 shadow-2xl"
    >
      {/* Input Fields */}
      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 md:gap-6 mb-8">
        {/* Calls per day */}
        <div>
          <label className="block text-[#0A0A0A]/70 text-xs sm:text-sm mb-2 font-medium text-[13px]">
            Обращений в день <span className="text-[#0A0A0A]/40 text-[10px]">(звонки, соцсети)</span>
          </label>
          <input
            type="number"
            value={callsPerDay}
            onChange={(e) => setCallsPerDay(e.target.value)}
            onBlur={() => handleBlur(callsPerDay, setCallsPerDay, 1, 1000, '10')}
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] text-lg sm:text-xl font-bold focus:outline-none focus:border-[#e3ee6b] focus:bg-white transition-all hover:border-[#e3ee6b]/60"
            min="1"
            max="1000"
          />
        </div>

        {/* Lost clients per day */}
        <div>
          <label className="block text-[#0A0A0A]/70 text-xs sm:text-sm mb-2 font-medium text-[13px]">
            Сколько из них не записалось в день <span className="text-[#0A0A0A]/40 text-[10px]">(не договорились)</span>
          </label>
          <input
            type="number"
            value={lostClientsPerDay}
            onChange={(e) => setLostClientsPerDay(e.target.value)}
            onBlur={() => handleBlur(lostClientsPerDay, setLostClientsPerDay, 1, 100, '2')}
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] text-lg sm:text-xl font-bold focus:outline-none focus:border-[#e3ee6b] focus:bg-white transition-all hover:border-[#e3ee6b]/60"
            min="1"
            max="100"
          />
        </div>

        {/* Average check */}
        <div>
          <label className="block text-[#0A0A0A]/70 text-xs sm:text-sm mb-2 font-medium text-[13px]">
            Средний чек (₽) <span className="text-[#0A0A0A]/40 text-[10px]">(сумма заказа)</span>
          </label>
          <input
            type="number"
            value={avgCheck}
            onChange={(e) => setAvgCheck(e.target.value)}
            onBlur={() => handleBlur(avgCheck, setAvgCheck, 1000, 10000000, '50000')}
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] text-lg sm:text-xl font-bold focus:outline-none focus:border-[#e3ee6b] focus:bg-white transition-all hover:border-[#e3ee6b]/60"
            min="1000"
            max="10000000"
            step="1000"
          />
        </div>
      </div>

      {/* Results */}
      <div 
        className="relative"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-[#e3ee6b] to-transparent mb-8" />
        
        {/* Monthly loss */}
        <div className="text-center">
          <div className="text-[#0A0A0A]/70 text-base sm:text-lg md:text-xl mb-4 font-medium text-[16px]">Ваши потери за месяц</div>
          <div 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4"
          >
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
              -{formatNumber(monthlyLoss)} ₽
            </span>
          </div>
          
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="flex items-center gap-2 text-[#0A0A0A] text-sm sm:text-base md:text-lg">
              <span className="font-semibold">За год это уже</span>
            </div>
            <div 
              className="text-2xl sm:text-3xl md:text-4xl font-black text-red-400/80"
            >
              -{formatNumber(monthlyLoss * 12)} ₽
            </div>
            
            {monthlyLoss >= 1000000 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-4 px-4 sm:px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-xl"
              >
                <p className="text-red-300 text-xs sm:text-sm md:text-base font-semibold text-center">
                  ⚠️ На эти деньги можно купить еще один автосервис!
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = ({ scrollProgress, isMobileMenuOpen, setIsMobileMenuOpen, setIsModalOpen }: {
  scrollProgress: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
}) => {
  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollProgress > 5 ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
              scrollProgress > 5 ? 'bg-[#e3ee6b]' : 'bg-white/20 backdrop-blur-xl'
            } flex items-center justify-center`}>
              <span className={`text-lg sm:text-xl ${
                scrollProgress > 5 ? 'text-[#0A0A0A]' : 'text-white'
              } font-black`}>БМ</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="#modules" 
              className={`text-sm lg:text-base transition-colors font-medium ${
                scrollProgress > 5 
                  ? 'text-[#0A0A0A] hover:text-[#e3ee6b]' 
                  : 'text-white/90 hover:text-[#e3ee6b]'
              }`}
            >
              Программа
            </a>
            <a 
              href="#reviews" 
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
            <motion.a
              href="https://t.me/clubmanagers_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e3ee6b] text-[#0A0A0A] px-6 py-2.5 rounded-full hover:bg-[#d4df5a] transition-colors text-sm lg:text-base font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Купить курс
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X className={`w-7 h-7 ${scrollProgress > 5 ? 'text-[#0A0A0A]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-7 h-7 ${scrollProgress > 5 ? 'text-[#0A0A0A]' : 'text-white'}`} />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0A0A0A] z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {[
                { href: "#modules", text: "Программа" },
                { href: "#reviews", text: "Отзывы" },
                { href: "#price", text: "Цена" },
                { href: "#faq", text: "FAQ" }
              ].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-white text-2xl font-medium hover:text-[#e3ee6b] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * (i + 1) }}
                >
                  {link.text}
                </motion.a>
              ))}
              <motion.a
                href="https://t.me/clubmanagers_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#e3ee6b] text-[#0A0A0A] px-10 py-4 rounded-full text-xl font-semibold mt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.95 }}
              >
                Купить курс
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Cookie Consent Component
const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(() => {
    return !safeStorage.getBoolean('cookieConsent', false);
  });

  const acceptCookies = () => {
    safeStorage.setBoolean('cookieConsent', true);
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-[#0A0A0A] text-sm sm:text-base">
                Мы используем файлы cookie для улучшения работы сайта и анализа трафика. 
                Продолжая использовать сайт, вы соглашаетесь с{' '}
                <a href="https://project2788838.tilda.ws/politica" target="_blank" rel="noopener noreferrer" className="text-[#0A0A0A] underline hover:text-[#666]">
                  политикой конфиденциальности
                </a>.
              </p>
            </div>
            <motion.button
              onClick={acceptCookies}
              className="bg-[#e3ee6b] text-[#0A0A0A] px-6 py-2.5 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap hover:bg-[#d4df5a] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Принять
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showPurchase, setShowPurchase] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState({ name: '', city: '' });
  const [purchaseCount, setPurchaseCount] = useState(() => {
    // Load from localStorage or calculate based on days passed (safely)
    const savedCount = safeStorage.getNumber('purchaseCount', 0);
    const savedTimestamp = safeStorage.getNumber('purchaseCountTimestamp', 0);
    
    if (savedCount > 0 && savedTimestamp > 0) {
      const timePassed = Date.now() - savedTimestamp;
      const daysPassed = Math.floor(timePassed / 86400000); // 24 hours in ms
      
      if (daysPassed > 0) {
        // Add random 5-15 per day for each day passed
        let totalIncrement = 0;
        for (let i = 0; i < daysPassed; i++) {
          totalIncrement += Math.floor(Math.random() * 11) + 5;
        }
        const calculatedCount = savedCount + totalIncrement;
        
        safeStorage.setNumber('purchaseCount', calculatedCount);
        safeStorage.setNumber('purchaseCountTimestamp', Date.now());
        return calculatedCount;
      }
      
      return savedCount;
    }
    
    // First visit - initialize at 155
    safeStorage.setNumber('purchaseCount', 155);
    safeStorage.setNumber('purchaseCountTimestamp', Date.now());
    return 155;
  });
  
  const { scrollYProgress } = useScroll();

  // Fix for mobile viewport height (compensate for address bar)
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date('2025-01-12T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Purchases Simulation
  useEffect(() => {
    const purchases = [
      { name: 'Сергей', city: 'Казани' },
      { name: 'Дмитрий', city: 'Москвы' },
      { name: 'Андрей', city: 'Санкт-Петербурга' },
      { name: 'Алексей', city: 'Краснодара' },
      { name: 'Максим', city: 'Екатеринбурга' },
      { name: 'Игорь', city: 'Новосибирска' },
      { name: 'Владимир', city: 'Казани' },
      { name: 'Роман', city: 'Самары' }
    ];

    let index = 0;
    const showNotification = () => {
      setCurrentPurchase(purchases[index]);
      setShowPurchase(true);
      
      setTimeout(() => setShowPurchase(false), 4000);
      
      index = (index + 1) % purchases.length;
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);
    
    // Then show every 15 seconds
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // --- ANIMATION VARIANTS (optimized for smooth mobile performance) ---
  const fadeInUp = {
    hidden: { opacity: 0.3 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0.3 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05, duration: 0.3 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0.3 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" }
    }
  };

  const programItems = [
    {
      id: 1,
      title: "Студия и менеджер",
      subtitle: "Фундамент высоких чеков",
      desc: "Как выглядеть и позиционировать себя, чтобы цена не пугала, а обосновывала качество.",
      icon: <Layers className="w-5 h-5" />,
      style: "dark",
      image: "https://images.unsplash.com/photo-1754149603303-7dd288629dd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBtZXRhbGxpYyUyMGxpcXVpZCUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NjU0NDg2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Схема разговора",
      subtitle: "Закрываем клиента на услугу",
      desc: "Готовая схема: какие вопросы задавать, чтобы вести клиента, а не следовать за ним.",
      icon: <Mic className="w-5 h-5" />,
      style: "light",
      image: null
    },
    {
      id: 3,
      title: "«Дорого», «Я подумаю»",
      subtitle: "Отработка возражений",
      desc: "Разбор самых популярных барьеров. Как превратить сомнение в сделку.",
      icon: <ShieldAlert className="w-5 h-5" />,
      style: "dark",
      image: "https://images.unsplash.com/photo-1759259738810-0783f5db82bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbWUlMjBtZXRhbCUyMGFic3RyYWN0JTIwd2F2ZXN8ZW58MXx8fHwxNzY1NDQ4NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      title: "Техники допродаж",
      subtitle: "И повышение чека",
      desc: "Как экологично увеличить средний чек, предлагая именно то, что нужно клиенту.",
      icon: <BarChart3 className="w-5 h-5" />,
      style: "light",
      image: null
    },
    {
      id: 5,
      title: "Работа с базой",
      subtitle: "Повторные продажи",
      desc: "Как сделать так, чтобы клиенты возвращались сами. LTV, напоминания и сервисная забота.",
      icon: <Database className="w-5 h-5" />,
      style: "dark",
      image: "https://images.unsplash.com/photo-1732698476659-2e5336bae219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbGxpYyUyMHNpbHZlciUyMDNkJTIwZmx1aWR8ZW58MXx8fHwxNzY1NDQ4NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const stats = [
    { value: 155, label: "Владельцев автобизнеса купили курс", suffix: "" },
    { value: 89, label: "Средний рост конверсии", suffix: "%" },
    { value: 15, label: "Минут в день на обучение", suffix: "" }
  ];

  const testimonials = [
    {
      name: "Алексей",
      studio: "Москва",
      text: "После курса конверсия выросла на 70%. Менеджеры стали увереннее продавать допы.",
      rating: 5
    },
    {
      name: "Дмитрий",
      studio: "Санкт-Петербург",
      text: "Простые схемы разговора работают. Теперь клиенты сами просят дополнительные услуги.",
      rating: 5
    },
    {
      name: "Сергей",
      studio: "Казань",
      text: "Окупил за первые 5 минут. Открыл урок по работе с базой, написал клиенту и он согласился записаться на химчистку.",
      rating: 5
    },
    {
      name: "Михаил",
      studio: "Екатеринбург",
      text: "Интересный формат курса, тем более за такую стоимость. Он должен стоить в десятки раз дороже.",
      rating: 5
    },
    {
      name: "Артем",
      studio: "Новосибирск",
      text: "Отличная структура курса. Все по делу, без воды. Применили сразу и получили результат.",
      rating: 5
    },
    {
      name: "Владимир",
      studio: "Краснодар",
      text: "Раньше теряли половину звонков. Теперь закрываем 8 из 10 благодаря техникам из курса.",
      rating: 5
    },
    {
      name: "Игорь",
      studio: "Самара",
      text: "Стал продавать увереннее, клиенты чаще стали соглашаться на приезд в студию. Работы стало больше.",
      rating: 5
    },
    {
      name: "Павел",
      studio: "Ростов-на-Дону",
      text: "Интересно было послушать опыт Валерия, вдохновился очень.",
      rating: 5
    },
    {
      name: "Андрей",
      studio: "Уфа",
      text: "После обучения команда стала увереннее работать с возражениями. Прибыль выросла на 55%.",
      rating: 5
    },
    {
      name: "Максим",
      studio: "Воронеж",
      text: "Лучшее вложение в бизнес за последний год. Простые техники дают мощный результат.",
      rating: 5
    }
  ];

  const faqItems = [
    {
      q: "Сколько длится курс?",
      a: "Все материалы можно пройти за 2-3 часа, но рекомендуем изучать по модулям."
    },
    {
      q: "Подойдет ли новичку?",
      a: "Да! Курс создан для владельцев студий и менеджеров любого уровня."
    },
    {
      q: "Есть ли обратная связь?",
      a: "Нет, в данном обучении обратная связь не предусмотрена."
    },
    {
      q: "Как получить доступ после оплаты?",
      a: "После оплаты 12 января наш бот-помощник, в котором вы оплачивали обучение, вышлет ссылку на закрытый тг-канал, в котором вас будут ждать уроки."
    }
  ];

  const benefits = [
    "Готовые скрипты разговоров",
    "Схемы работы с возражениями",
    "Техники повышения среднего чека",
    "Система повторных продаж",
    "Чек-листы для менеджеров"
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] antialiased overflow-x-hidden">
      
      {/* --- SCROLL PROGRESS BAR --- */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#e3ee6b] z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* --- NAVIGATION --- */}
      <Navigation
        scrollProgress={scrollProgress}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-[100vh] flex items-center px-4 sm:px-6 py-20 sm:py-24 md:py-32 bg-[#0A0A0A] overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-[#e3ee6b]/20 to-transparent rounded-full blur-3xl"
          />
          
          <motion.div
            animate={{ 
              x: [0, -25, 0],
              y: [0, 25, 0]
            }}
            transition={{ 
              duration: 35, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl"
          />

          <motion.div
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.3, 0.45, 0.3]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-[#e3ee6b]/5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            
            {/* Left - Text */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Countdown Timer Badge */}
              <motion.div variants={fadeInUp} className="inline-block mb-4 sm:mb-6">
                <div className="relative px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden group">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#e3ee6b]/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#e3ee6b]"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="text-sm sm:text-base text-white/90 font-medium">
                      Онлайн-курс • Старт 12 января
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                variants={fadeInUp} 
                className="relative text-6xl xs:text-7xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] 2xl:text-[9rem] mb-1 leading-[0.95] pt-3 pb-8 overflow-visible"
              >
                <motion.span 
                  className="block font-black bg-gradient-to-br from-white via-[#e3ee6b] to-[#e3ee6b]/60 bg-clip-text text-transparent"
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  Базовый
                </motion.span>
                <motion.span 
                  className="block font-black bg-gradient-to-br from-[#e3ee6b] via-white to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                >
                  минимум
                </motion.span>
                {/* Enhanced Glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#e3ee6b]/30 to-transparent blur-3xl -z-10"
                  animate={{ 
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.h1>

              <motion.p 
                variants={fadeInUp} 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-8 sm:mb-10 leading-relaxed max-w-xl"
              >
                База, которая должна быть в голове у каждого, кто отвечает на звонки и продает услуги детейлинга.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.a 
                  href="https://t.me/clubmanagers_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Получить доступ к онлайн-курсу Базовый Минимум"
                  className="group relative bg-[#e3ee6b] text-[#0A0A0A] px-6 sm:px-8 py-4 sm:py-5 rounded-full hover:bg-[#e8f285] transition-all inline-flex items-center justify-center gap-2 sm:gap-3 touch-manipulation overflow-hidden w-full sm:w-auto"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(227, 238, 107, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Subtle glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-[#e3ee6b] rounded-full"
                    animate={{ opacity: [0.8, 0.4, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="relative z-10 text-base sm:text-lg md:text-xl font-semibold font-bold">
                    Получить доступ
                  </span>
                  <ArrowRight className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.button 
                  className="group bg-white/5 border border-white/10 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 sm:gap-3 touch-manipulation backdrop-blur-sm w-full sm:w-auto"
                  whileHover={{ scale: 1.05, borderColor: "rgba(227, 238, 107, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-base sm:text-lg md:text-xl font-medium font-bold">Смотреть программу</span>
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right - Metallic Image with hover effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-[24px] sm:rounded-[40px] overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1754149603303-7dd288629dd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBtZXRhbGxpYyUyMGxpcXVpZCUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NjU0NDg2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Профессиональное обучение продажам для автосервисов"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              
              {/* Floating badge with animation */}
              <motion.div 
                className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-6 py-4"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="relative flex items-center gap-4 bg-gradient-to-r from-white/0 to-white/5 rounded-2xl p-4 border border-white/20">
                    {/* Бейдж со скидкой */}
                    <motion.div
                      className="absolute -top-3 -right-3 bg-[#e3ee6b] text-[#0A0A0A] px-4 py-1.5 rounded-full text-sm sm:text-base font-bold shadow-lg z-10"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      -75%
                    </motion.div>

                    <motion.div 
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-[#e3ee6b] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <span className="text-3xl sm:text-4xl text-[#0A0A0A] font-bold">₽</span>
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                        <span className="text-white/40 text-base sm:text-lg line-through whitespace-nowrap">10 000 ₽</span>
                        <span className="text-[#e3ee6b] text-3xl sm:text-4xl md:text-5xl whitespace-nowrap font-black">2 490 ₽</span>
                      </div>
                      <div className="text-white/70 text-sm sm:text-base font-medium">Новогодняя цена</div>
                    </div>
                  </div>
                  <div className="hidden sm:block text-xs text-white/50 max-w-[100px] text-right">
                    Специальное предложение
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- MARQUEE WITH BENEFITS --- */}
      <div className="relative bg-[#e3ee6b] py-4 overflow-hidden">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...benefits, ...benefits].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[#0A0A0A] text-base sm:text-sm uppercase tracking-wider font-semibold">{benefit}</span>
              <span className="text-[#0A0A0A]/30">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- STATS SECTION --- */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.05, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#F5F5F5] to-white border border-black/5 hover:border-[#e3ee6b]/30 transition-all group will-change-transform"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 sm:mb-2 font-black bg-gradient-to-br from-[#0A0A0A] to-[#333] bg-clip-text text-transparent"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {index === 0 ? <LivePurchaseCounter count={purchaseCount} setCount={setPurchaseCount} /> : `${stat.value}${stat.suffix}`}
                </motion.div>
                <div className="text-base sm:text-sm md:text-base text-[#666] leading-relaxed font-medium">
                  {stat.label}
                  {index === 0 && <LiveIndicator />}
                </div>
                <motion.div 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#e3ee6b]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <TrendingUp className="w-5 h-5 text-[#e3ee6b]" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section id="problem" className="relative py-12 sm:py-14 px-4 bg-gradient-to-br from-[#F5F5F5] to-white overflow-hidden">
        {/* Metallic decorations */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759259738810-0783f5db82bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbWUlMjBtZXRhbCUyMGFic3RyYWN0JTIwd2F2ZXN8ZW58MXx8fHwxNzY1NDQ4NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Декоративный элемент - хромированный металл для детейлинг студии"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1732698476659-2e5336bae219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbGxpYyUyMHNpbHZlciUyMDNkJTIwZmx1aWR8ZW58MXx8fHwxNzY1NDQ4NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Декоративный элемент - металлическая текстура для автосервиса"
            className="w-full h-full object-cover scale-x-[-1]"
          />
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div 
            variants={fadeInUp}
            className="mb-6 sm:mb-8"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#0A0A0A] leading-relaxed mb-6 sm:mb-8">
            <span className="px-3 py-1.5 bg-[#e3ee6b] text-[#0A0A0A] rounded font-bold text-base sm:text-lg md:text-xl">
              Мы научились делать
            </span>
            {" "}крутую полировку, клеить пленку{" "}
            <span className="font-bold underline decoration-[#e3ee6b] decoration-4 underline-offset-4">без пузырей</span>
            , химчистку так, что салон выглядит как новый.
            </p>

            <div className="bg-[#0A0A0A] rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-10 inline-block shadow-xl">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight font-medium">
                Вкладываем{" "}
                <span className="text-[#e3ee6b] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">
                  сотни тысяч
                </span>
                {" "}в оборудование, помещение, материалы
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mb-8 hidden"
          >
              Старый дублированный контент{" "}
              <motion.span 
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <span className="bg-gradient-to-r from-[#e3ee6b] to-[#d4df5a] bg-clip-text text-transparent">
                  крутую полировку
                </span>
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-[#e3ee6b]/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </motion.span>
              , клеить пленку{" "}
              <span className="relative inline-block px-3 py-1 bg-[#e3ee6b]/10 rounded-lg">
                без пузырей и песка
              </span>
              , делать химчистку так, что салон выглядит{" "}
              <motion.span 
                className="relative inline-block"
                whileHover={{ rotate: [-2, 2, -2, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-[#0A0A0A] via-[#333] to-[#0A0A0A] bg-clip-text text-transparent">
                  новее нового
                </span>
              </motion.span>
              .
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mb-6 hidden"
          >
            <motion.div 
              className="relative inline-block"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
            >
              <div className="relative bg-gradient-to-r from-[#0A0A0A] to-[#1a1a1a] rounded-3xl p-8 border-2 border-[#e3ee6b]/20">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#e3ee6b]/5 via-transparent to-[#e3ee6b]/5 rounded-3xl"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                <p className="text-2xl sm:text-3xl lg:text-4xl text-white leading-tight relative z-10">
                  Мы вкладываем{" "}
                  <motion.span 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e3ee6b] via-[#f0f870] to-[#e3ee6b] bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#e3ee6b] inline" />
                    миллионы
                  </motion.span>
                  {" "}в&nbsp;оборудование, помещение, команду, материалы.
                </p>

                {/* Decorative dots */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-[#e3ee6b] rounded-full"
                      animate={{ 
                        opacity: [0.4, 0.9, 0.4]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mb-4 sm:mb-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0A0A0A] mb-6 sm:mb-8 font-bold">Но почему тогда:</h2>
            
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
              {[
                { icon: Mic, text: "Когда звонит клиент, менеджер мямлит в трубку и не может объяснить разницу в услугах?" },
                { icon: ShieldAlert, text: "Боимся назвать реальную цену за свой труд и сразу даем скидку, когда ее даже не просили?" },
                { icon: Users, text: "Клиент отправляется «подумать» и больше не отвечает?" }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                  className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 border-2 border-[#0A0A0A]/20 hover:border-[#e3ee6b] transition-all shadow-sm flex flex-col items-center text-center h-auto"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e3ee6b] rounded-full flex items-center justify-center mb-2 sm:mb-3 flex-shrink-0">
                    <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A0A0A]" />
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-[#0A0A0A] leading-relaxed font-medium">{card.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              className="text-center mt-10 sm:mt-14 max-w-5xl mx-auto"
            >
              {/* Основной заголовок */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0A0A0A] font-bold leading-tight mb-6 sm:mb-8 px-4">
                Мы создали первое в России обучение по продажам, полностью заточенное под специфику и тонкости детейлинга.
              </h2>
              
              {/* Карточка с результатами */}
              <motion.div 
                className="inline-block bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#0A0A0A]/10 shadow-sm mx-4 will-change-transform"
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
              >
                <p className="text-base sm:text-lg md:text-xl text-[#0A0A0A]/70 mb-3 sm:mb-4 font-medium">
                  Уже применяют {purchaseCount} владельцев автобизнеса
                </p>
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-[#e3ee6b] text-[#0A0A0A] rounded-xl font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  +40-100% к чеку
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.a 
            variants={fadeInUp}
            href="https://t.me/clubmanagers_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A0A0A] text-white px-10 py-5 sm:py-6 rounded-full hover:bg-[#1A1A1A] transition-all inline-flex items-center gap-3 group text-lg sm:text-xl md:text-2xl font-semibold touch-manipulation mt-8 sm:mt-10 md:mt-12"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-bold">Присоединиться</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </section>

      {/* --- LOSS CALCULATOR SECTION --- */}
      <section id="calculator" className="relative py-12 sm:py-16 md:py-20 px-4 bg-[#0A0A0A] overflow-hidden">
        {/* Animated background */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 60, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          style={{
            backgroundImage: 'linear-gradient(45deg, #e3ee6b 25%, transparent 25%, transparent 75%, #e3ee6b 75%, #e3ee6b), linear-gradient(45deg, #e3ee6b 25%, transparent 25%, transparent 75%, #e3ee6b 75%, #e3ee6b)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 leading-tight">
              Подсчитайте свои <span className="text-[#e3ee6b] font-bold">реальные потери</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto text-[20px]">
              Введите данные и узнаете, сколько денег теряете каждый месяц
            </p>
          </motion.div>

          <LossCalculator />

          <motion.div
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 text-[rgb(255,255,255)] font-bold">
                А с нами <span className="text-[rgb(230,230,230)] font-bold">вместо потерь, это станет прибылью!</span>
              </p>
            </div>
            
            <motion.a 
              href="https://t.me/clubmanagers_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e3ee6b] text-[#0A0A0A] px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-[#d4df5a] transition-all inline-flex items-center gap-3 group text-base sm:text-lg md:text-xl font-bold touch-manipulation"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(227,238,107,0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Обучиться за 2490 ₽
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>



      {/* --- PROGRAM SECTION --- */}
      <section id="modules" className="relative py-16 sm:py-20 lg:py-24 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 sm:mb-16"
          >
            <motion.span 
              className="text-sm sm:text-base text-[#666] uppercase tracking-wider mb-3 sm:mb-4 block font-semibold"
              variants={fadeInUp}
            >
              Программа обучения
            </motion.span>
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              variants={fadeInUp}
            >
              Что внутри курса
            </motion.h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            
            {programItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.06,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ 
                  scale: 1.02, 
                  transition: { duration: 0.3 }
                }}
                className={`
                  group relative rounded-[32px] overflow-hidden
                  transition-all touch-manipulation cursor-pointer will-change-transform
                  ${item.style === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-[#e3ee6b] text-[#0A0A0A]'}
                  ${index === 0 ? 'sm:col-span-2' : ''}
                  ${index === 4 ? 'sm:col-span-2' : ''}
                `}
                style={{
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                }}
              >
                {/* Background Image for cards with images */}
                {item.image && (
                  <div className="absolute inset-0">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-50"
                      />
                    </motion.div>
                    <div className={`absolute inset-0 ${item.style === 'dark' ? 'bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/60 to-[#0A0A0A]/30' : 'bg-gradient-to-t from-[#e3ee6b] via-[#e3ee6b]/90 to-[#e3ee6b]/70'}`} />
                  </div>
                )}

                <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6 md:p-8">
                  <div>
                    <motion.div 
                      className={`
                        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-6
                        ${item.style === 'dark' ? 'bg-[#e3ee6b] text-[#0A0A0A]' : 'bg-[#0A0A0A] text-[#e3ee6b]'}
                      `}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.icon}
                    </motion.div>

                    <motion.h3 
                      className="text-xl sm:text-2xl md:text-3xl mb-3 font-bold"
                      initial={{ opacity: 0.3 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.4, ease: "easeOut" }}
                    >
                      {item.title}
                    </motion.h3>
                    <div className={`text-sm sm:text-base uppercase tracking-wider mb-3 sm:mb-4 font-semibold ${item.style === 'dark' ? 'text-white/60' : 'text-[#0A0A0A]/60'}`}>
                      {item.subtitle}
                    </div>
                    <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${item.style === 'dark' ? 'text-white/80' : 'text-[#0A0A0A]/80'}`}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <motion.div 
                    className={`mt-4 opacity-0 group-hover:opacity-100 transition-opacity ${item.style === 'dark' ? 'text-[#e3ee6b]' : 'text-[#0A0A0A]'}`}
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="reviews" className="relative py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-white to-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-[#e3ee6b]/10 to-transparent rounded-full blur-3xl"
            animate={{ opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-8 sm:mb-12 text-center"
          >
            <motion.span 
              className="text-sm sm:text-base md:text-lg text-black/60 uppercase tracking-wider mb-3 sm:mb-4 block font-semibold"
              variants={fadeInUp}
            >
              Отзывы
            </motion.span>
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-black font-bold"
              variants={fadeInUp}
            >
              Работает на практике
            </motion.h2>
          </motion.div>

          {/* Horizontal scrollable testimonials */}
          <div className="relative -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(index * 0.05, 0.2), duration: 0.4, ease: "easeOut" }}
                  className="relative p-6 sm:p-8 rounded-2xl bg-white border border-black/10 hover:border-[#e3ee6b]/50 transition-all group shadow-sm hover:shadow-md w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] md:w-[calc(50vw-2rem)] lg:w-[calc(33.333vw-2rem)] snap-center flex-shrink-0 will-change-transform"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i}>
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-[#e3ee6b] text-[#e3ee6b]" />
                      </div>
                    ))}
                  </div>

                  <p className="text-base sm:text-lg md:text-xl text-black/70 mb-5 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e3ee6b] flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A0A0A]" />
                    </div>
                    <div>
                      <div className="text-black text-base sm:text-lg font-medium">{testimonial.name}</div>
                      <div className="text-black/50 text-sm sm:text-base">{testimonial.studio}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Scroll indicator */}
            <motion.div 
              className="text-center mt-4 text-sm text-black/40 flex items-center justify-center gap-2"
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
            >
              <motion.div
                animate={{ x: [-5, 0, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ←
              </motion.div>
              Смахните влево
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- COMPETITOR WARNING SECTION --- */}
      {/* --- PRICING SECTION --- */}
      <section id="price" className="relative py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-b from-white to-[#FAFAFA] overflow-hidden">
        
        {/* Subtle background elements */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#e3ee6b]/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-gradient-to-tr from-black/3 to-transparent rounded-full blur-3xl"
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.span 
                className="inline-block text-black/60 text-sm sm:text-base uppercase tracking-widest mb-4 font-bold"
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                Инвестиция в ваш бизнес
              </motion.span>
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mb-4 leading-tight"
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Стоимость <span className="bg-gradient-to-r from-[#e3ee6b] to-[#c5d060] bg-clip-text text-transparent font-black">курса</span>
              </motion.h2>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative will-change-transform"
            >
              {/* Glowing outline */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-br from-[#e3ee6b]/30 via-[#e3ee6b]/20 to-[#e3ee6b]/10 rounded-[3rem] blur-xl"
                animate={{ 
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-[#FAFAFA] to-white rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 shadow-xl border-[3px] border-[#e3ee6b] shadow-[0_0_40px_rgba(227,238,107,0.3)]">
                
                {/* Discount badge */}
                <motion.div
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-20"
                  initial={{ opacity: 0, rotate: 12 }}
                  whileInView={{ opacity: 1, rotate: 12 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <motion.div
                    className="relative bg-gradient-to-br from-[#e3ee6b] to-[#c5d060] text-[#0A0A0A] px-5 py-3 sm:px-7 sm:py-4 rounded-2xl shadow-2xl"
                    animate={{ 
                      y: [0, -3, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 bg-[#e3ee6b] rounded-2xl blur-md opacity-50" />
                    <div className="relative text-center">
                      <div className="text-xs sm:text-sm uppercase tracking-wider font-bold mb-0.5">Скидка</div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-black">-75%</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="text-center relative">
                  
                  {/* Price display */}
                  <motion.div 
                    className="mb-8 sm:mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Old price */}
                    <div className="mb-4 sm:mb-6">
                      <span className="text-[#999] text-2xl sm:text-3xl md:text-4xl line-through">10 000 ₽</span>
                    </div>
                    
                    {/* New price - MEGA */}
                    <motion.div
                      className="relative inline-block"
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
                    >
                      <div className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none font-black">
                        <span className="text-[#0A0A0A]">
                          2 490
                        </span>
                        <span className="text-5xl sm:text-6xl md:text-7xl text-[#666] ml-2 sm:ml-4">₽</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Value proposition */}
                  <motion.div 
                    className="max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12"
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm">
                      <p className="text-black/90 text-lg sm:text-xl md:text-2xl leading-relaxed mb-4">
                        Мы специально поставили <span className="text-[#0A0A0A] font-bold">цену, над которой не надо думать</span>.
                      </p>
                      <div className="space-y-2 text-black/60 text-base sm:text-lg md:text-xl">
                        <p className="text-[rgb(0,0,0)]">Это <span className="text-[#0A0A0A] font-semibold font-bold font-normal">стоимость одной мойки или одного похода в магазин</span>.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.a
                    href="https://t.me/clubmanagers_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-[#0A0A0A] text-white px-10 sm:px-14 py-5 sm:py-7 rounded-full transition-all inline-flex items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl md:text-3xl touch-manipulation overflow-hidden shadow-2xl border-2 border-[#e3ee6b]"
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 25px 60px rgba(227, 238, 107, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Animated gradient background on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#e3ee6b] via-[#c5d060] to-[#e3ee6b] opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Subtle glow */}
                    <motion.div
                      className="absolute inset-0 bg-[#e3ee6b] rounded-full"
                      animate={{ opacity: [0.15, 0.35, 0.15] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <span className="relative z-10 flex items-center gap-3 sm:gap-4 font-black group-hover:text-[#0A0A0A] transition-colors">
                      Оплатить курс
                      <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </motion.a>

                  {/* Security badge */}
                  <motion.div
                    className="mt-6 sm:mt-8 flex items-center justify-center gap-4 sm:gap-6 text-[#666]"
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#666]" />
                      <span className="text-sm sm:text-base font-medium">Безопасная оплата</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#e3ee6b]/20 rounded-full blur-3xl"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-8 sm:mb-12 md:mb-16 text-center"
          >
            <motion.span 
              className="text-sm sm:text-base text-[#666] uppercase tracking-wider mb-3 sm:mb-4 block font-semibold"
              variants={fadeInUp}
            >
              Остались вопросы?
            </motion.span>
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-bold"
              variants={fadeInUp}
            >
              Частые вопросы
            </motion.h2>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.q} answer={item.a} index={index} />
            ))}
          </div>

          {/* CTA для WhatsApp после FAQ */}
          <motion.div 
            className="mt-12 sm:mt-16 text-center"
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-[#0A0A0A] mb-6 sm:mb-8 font-medium">
              Не нашли ответ, напишите в отдел заботы
            </p>
            <motion.a
              href="https://api.whatsapp.com/send/?phone=79951140299"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 bg-[#0A0A0A] text-[#e3ee6b] px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#1a1a1a] transition-all shadow-lg hover:shadow-xl group border-2 border-[#e3ee6b]/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-base sm:text-lg font-medium">Написать в WhatsApp</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* --- FLOATING CTA BUTTON --- */}
      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-[#e3ee6b] rounded-full shadow-2xl flex items-center justify-center group"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#e3ee6b] rounded-full"
        />
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A0A0A] relative z-10" />
      </motion.button>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateX: -20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[40px] p-6 sm:p-8 md:p-12 max-w-md w-full mx-4 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Animated gradient top bar */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl sm:rounded-t-[40px]"
                animate={{ 
                  background: [
                    'linear-gradient(90deg, #e3ee6b 0%, #e3ee6b 100%)',
                    'linear-gradient(90deg, #e3ee6b 0%, #0A0A0A 50%, #e3ee6b 100%)',
                    'linear-gradient(90deg, #e3ee6b 0%, #e3ee6b 100%)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-[#e3ee6b] rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-8 h-8 text-[#0A0A0A]" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-[#0A0A0A] text-center font-bold">Старт 12 января</h2>
              <p className="text-base sm:text-lg text-[#666] mb-6 sm:mb-8 leading-relaxed text-center">
                Просто возьмите это, проверьте и сообщите сотрудникам. Порядок в кассе гарантирую.
              </p>
              
              <motion.button 
                className="w-full bg-[#0A0A0A] text-[#e3ee6b] py-5 sm:py-6 rounded-full hover:bg-[#1A1A1A] transition-colors text-lg sm:text-xl md:text-2xl mb-4 sm:mb-5 flex items-center justify-center gap-3 group touch-manipulation active:scale-95 relative overflow-hidden font-semibold"
                onClick={() => alert('Переход к оплате...')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-[#e3ee6b]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <Check className="w-6 h-6 sm:w-7 sm:h-7" />
                  Купить за 2 490 ₽
                </span>
                <ArrowRight className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button 
                className="w-full text-[#666] py-4 text-lg sm:text-xl hover:text-[#0A0A0A] transition-colors touch-manipulation font-medium"
                onClick={() => setIsModalOpen(false)}
                whileHover={{ scale: 1.05 }}
              >
                Отмена
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="h-20" />
      
      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number; key?: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border border-black/10 rounded-2xl overflow-hidden bg-white hover:border-[#e3ee6b]/30 transition-all"
    >
      <motion.button
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left touch-manipulation"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(227, 238, 107, 0.05)" }}
      >
        <span className="text-lg sm:text-xl md:text-2xl text-[#0A0A0A] flex-1 font-medium">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-[#e3ee6b] flex-shrink-0" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-base sm:text-lg md:text-xl text-[#666] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;