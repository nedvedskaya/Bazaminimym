import React from 'react';
import { LucideIcon } from 'lucide-react';
import { COLORS } from '../../constants';

interface IconCircleProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  bgColor?: string;
  iconColor?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10 sm:w-12 sm:h-12',
  lg: 'w-12 h-12 sm:w-14 sm:h-14',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5 sm:w-6 sm:h-6',
  lg: 'w-6 h-6 sm:w-7 sm:h-7',
};

export const IconCircle: React.FC<IconCircleProps> = ({
  icon: Icon,
  size = 'md',
  bgColor = `bg-[${COLORS.primary}]`,
  iconColor = `text-[${COLORS.dark}]`,
  className = '',
}) => {
  return (
    <div 
      className={`${sizeClasses[size]} bg-[#e3ee6b] rounded-full flex items-center justify-center ${className}`}
    >
      <Icon className={`${iconSizeClasses[size]} text-[#0A0A0A]`} />
    </div>
  );
};

export default IconCircle;
