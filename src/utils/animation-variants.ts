/**
 * Переиспользуемые варианты анимаций
 * Оптимизированы для мобильных устройств (только opacity, без transform)
 */

export const fadeInUp = {
  hidden: { opacity: 0.3 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0.3 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05, duration: 0.3 }
  }
};

export const scaleIn = {
  hidden: { opacity: 0.3 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};

export const fadeInViewProps = {
  initial: { opacity: 0.3 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" }
} as const;

export const createStaggeredFadeIn = (delay: number = 0) => ({
  initial: { opacity: 0.3 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { delay, duration: 0.4, ease: "easeOut" }
});
