import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PAYMENT_URL } from '../../constants';

/**
 * Переиспользуемая CTA кнопка
 * Единое место для изменения стилей всех CTA кнопок
 * Использует Tailwind brand colors: bg-brand, text-dark, hover:bg-brand-hover
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
    primary: 'bg-brand text-dark px-6 py-2.5 rounded-full hover:bg-brand-hover transition-colors text-sm lg:text-base font-semibold',
    large: 'bg-brand text-dark px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-brand-hover transition-all text-base sm:text-lg md:text-xl font-bold touch-manipulation',
    compact: 'bg-brand text-dark px-10 py-4 rounded-full text-xl font-semibold',
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(PAYMENT_URL, '_blank', 'noopener,noreferrer');
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
  href = PAYMENT_URL,
}) => {
  const variantStyles = {
    primary: 'bg-brand text-dark px-6 sm:px-8 py-4 sm:py-5 rounded-full hover:bg-brand-light transition-all font-semibold touch-manipulation',
    large: 'bg-brand text-dark px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-brand-hover transition-all text-base sm:text-lg md:text-xl font-bold touch-manipulation',
    compact: 'bg-brand text-dark px-10 py-4 rounded-full text-xl font-semibold',
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
