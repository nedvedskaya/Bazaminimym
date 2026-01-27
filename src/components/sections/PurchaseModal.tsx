import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { PAYMENT_URL } from '../../constants';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotateX: -20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[40px] p-6 sm:p-8 md:p-12 max-w-md w-full mx-4 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-[#666]" />
            </button>

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

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-[#0A0A0A] text-center">Старт 12 января</h2>
            <p className="text-base sm:text-lg text-[#666] mb-6 sm:mb-8 leading-relaxed text-center">
              Просто возьмите это, проверьте и сообщите сотрудникам. Порядок в кассе гарантирую.
            </p>
            
            <motion.a 
              href={PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0A0A0A] text-[#e3ee6b] py-5 sm:py-6 rounded-full hover:bg-[#1A1A1A] transition-colors text-lg sm:text-xl md:text-2xl mb-4 sm:mb-5 flex items-center justify-center gap-3 group touch-manipulation active:scale-95 relative overflow-hidden font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#e3ee6b]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-[#0A0A0A] transition-colors">Оплатить интенсив</span>
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 group-hover:text-[#0A0A0A] group-hover:translate-x-1 transition-all" />
            </motion.a>
            
            <p className="text-center text-sm sm:text-base text-[#999]">
              Безопасная оплата через Robokassa
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PurchaseModal;
