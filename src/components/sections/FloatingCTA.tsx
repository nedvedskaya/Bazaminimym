import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface FloatingCTAProps {
  onClick: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onClick }) => {
  return (
    <motion.button
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-[#e3ee6b] rounded-full shadow-2xl flex items-center justify-center group"
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
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
  );
};

export default FloatingCTA;
