import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { fadeInUp } from '../../utils/animation-variants';

const faqItems = [
  {
    q: "Сколько длится интенсив?",
    a: "Уроки по длительности 10–15 минут. Весь интенсив можно изучить за 2–3 часа."
  },
  {
    q: "Подойдет ли новичку?",
    a: "Да! База упакована так, что разберется и владелец студии, и новичок-менеджер. Стартуем с основ и сразу в практику."
  },
  {
    q: "Есть ли обратная связь?",
    a: "В этом формате — нет. Это самостоятельный спринт для тех, кто хочет быстро забрать инструменты и сразу внедрить их в работу."
  },
  {
    q: "Как получить доступ после оплаты?",
    a: "После оплаты на вашу электронную почту придет письмо со доступом в закрытый тг-канал. Доступ будет под рукой 24/7."
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
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

export const FAQSection: React.FC = () => {
  return (
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
            <FAQItem question={item.q} answer={item.a} index={index} key={index} />
          ))}
        </div>

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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://api.whatsapp.com/send/?phone=79951140299"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 bg-[#0A0A0A] text-[#e3ee6b] px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#1a1a1a] transition-all shadow-lg hover:shadow-xl group border-2 border-[#e3ee6b]/20 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-base sm:text-lg font-medium">Написать в WhatsApp</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="https://t.me/club_manageer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 bg-[#0A0A0A] text-[#e3ee6b] px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#1a1a1a] transition-all shadow-lg hover:shadow-xl group border-2 border-[#e3ee6b]/20 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .33z"/>
              </svg>
              <span className="text-base sm:text-lg font-medium">Написать в Telegram</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
