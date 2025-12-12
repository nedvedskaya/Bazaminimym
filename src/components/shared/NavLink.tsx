import React from 'react';
import { motion } from 'motion/react';

/**
 * Переиспользуемая навигационная ссылка
 * Используется в desktop и mobile меню
 */

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  scrolled?: boolean;
  variant?: 'desktop' | 'mobile';
  delay?: number;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  onClick,
  scrolled = false,
  variant = 'desktop',
  delay = 0,
}) => {
  if (variant === 'mobile') {
    return (
      <motion.a
        href={href}
        className="text-white text-2xl font-medium hover:text-[#e3ee6b] transition-colors"
        onClick={onClick}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay }}
      >
        {children}
      </motion.a>
    );
  }

  // Desktop variant
  return (
    <a 
      href={href}
      onClick={onClick}
      className={`text-sm lg:text-base transition-colors font-medium ${
        scrolled 
          ? 'text-[#0A0A0A] hover:text-[#e3ee6b]' 
          : 'text-white/90 hover:text-[#e3ee6b]'
      }`}
    >
      {children}
    </a>
  );
};
