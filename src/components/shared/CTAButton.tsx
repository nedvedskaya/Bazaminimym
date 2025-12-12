import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { TELEGRAM_BOT_URL, COLORS } from '../../constants';

/**
 * Переиспользуемая CTA кнопка "Купить курс"
 * Единое место для изменения стилей всех CTA кнопок
 */

interface CTAButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'large' | 'compact';
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ 
  children = 'Купить курс',
  variant = 'primary',
  showArrow = false,
  className = '',
  onClick,
}) => {
  const variantStyles = {
    primary: 'bg-[#e3ee6b] text-[#0A0A0A] px-6 py-2.5 rounded-full hover:bg-[#d4df5a] transition-colors text-sm lg:text-base font-semibold',
    large: 'bg-[#e3ee6b] text-[#0A0A0A] px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-[#d4df5a] transition-all text-base sm:text-lg md:text-xl font-bold touch-manipulation',
    compact: 'bg-[#e3ee6b] text-[#0A0A0A] px-10 py-4 rounded-full text-xl font-semibold',
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // По умолчанию открываем Telegram bot
      window.open(TELEGRAM_BOT_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`${variantStyles[variant]} ${className} inline-flex items-center justify-center gap-2 sm:gap-3`}
      whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(227, 238, 107, 0.4)' }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {showArrow && <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />}
    </motion.button>
  );
};

/**
 * CTA кнопка как ссылка (для случаев когда нужен <a> вместо <button>)
 */
export const CTALink: React.FC<CTAButtonProps & { href?: string }> = ({ 
  children = 'Купить курс',
  variant = 'primary',
  showArrow = false,
  className = '',
  href = TELEGRAM_BOT_URL,
}) => {
  const variantStyles = {
    primary: 'bg-[#e3ee6b] text-[#0A0A0A] px-6 sm:px-8 py-4 sm:py-5 rounded-full hover:bg-[#e8f285] transition-all font-semibold touch-manipulation',
    large: 'bg-[#e3ee6b] text-[#0A0A0A] px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-[#d4df5a] transition-all text-base sm:text-lg md:text-xl font-bold touch-manipulation',
    compact: 'bg-[#e3ee6b] text-[#0A0A0A] px-10 py-4 rounded-full text-xl font-semibold',
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variantStyles[variant]} ${className} inline-flex items-center justify-center gap-2 sm:gap-3 group overflow-hidden w-full sm:w-auto`}
      whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(227, 238, 107, 0.4)' }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {showArrow && (
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
      )}
    </motion.a>
  );
};
