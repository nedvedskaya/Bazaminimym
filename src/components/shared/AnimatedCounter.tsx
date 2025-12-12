import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ANIMATION_CONFIG } from '../../constants';

/**
 * Универсальный компонент для анимированного счетчика
 * Заменяет дублирующиеся AnimatedNumber и LiveCounter
 */

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
  animate?: boolean;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  suffix = '', 
  className = '',
  animate = false,
  duration = ANIMATION_CONFIG.duration,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = ANIMATION_CONFIG.steps;
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
  }, [value, duration]);

  if (animate) {
    return (
      <motion.span 
        className={className}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        {count}{suffix}
      </motion.span>
    );
  }

  return <>{count}{suffix}</>;
};
