      {/* --- PRICING SECTION --- */}
      <section id="price" className="relative py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-br from-white via-[#F5F5F5] to-white overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#e3ee6b]/30 to-[#e3ee6b]/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#0A0A0A]/10 to-transparent blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Large accent card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative"
            >
              {/* Main pricing card with gradient border effect */}
              <div className="relative bg-gradient-to-br from-[#e3ee6b] via-[#e3ee6b] to-[#c5d060] p-1 rounded-[3rem] shadow-2xl">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#e3ee6b] to-[#c5d060] rounded-[3rem] opacity-50 blur-xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <div className="relative bg-white rounded-[3rem] p-8 sm:p-12 lg:p-16">
                  {/* Decorative corner badges */}
                  <motion.div
                    className="absolute -top-6 -right-6 bg-gradient-to-br from-[#0A0A0A] to-[#333] text-[#e3ee6b] px-6 py-3 rounded-full shadow-xl"
                    initial={{ rotate: 12, scale: 0 }}
                    whileInView={{ rotate: 12, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                  >
                    <div className="text-center">
                      <div className="text-xs uppercase tracking-wider">Экономия</div>
                      <div className="text-2xl">-75%</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="text-center"
                  >
                    {/* Badge */}
                    <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
                      <motion.span 
                        className="inline-block px-8 py-4 bg-gradient-to-r from-[#e3ee6b] to-[#c5d060] text-[#0A0A0A] rounded-full text-sm sm:text-base uppercase tracking-wider shadow-lg"
                        whileHover={{ scale: 1.1, rotate: [0, -3, 3, -3, 0] }}
                        animate={{ 
                          boxShadow: [
                            '0 10px 30px rgba(227, 238, 107, 0.3)',
                            '0 15px 40px rgba(227, 238, 107, 0.5)',
                            '0 10px 30px rgba(227, 238, 107, 0.3)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🎁 Новогодняя акция
                      </motion.span>
                    </motion.div>

                    {/* Price comparison */}
                    <motion.div variants={fadeInUp} className="mb-8 sm:mb-10">
                      <div className="flex items-center justify-center gap-6 mb-4">
                        <div>
                          <div className="text-sm text-[#999] mb-2">Было</div>
                          <div className="text-3xl sm:text-4xl text-[#999] line-through">10 000 ₽</div>
                        </div>
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-10 h-10 text-[#e3ee6b]" />
                        </motion.div>
                        <div>
                          <div className="text-sm text-[#e3ee6b] mb-2">Стало</div>
                          <div className="text-4xl sm:text-5xl bg-gradient-to-r from-[#e3ee6b] to-[#c5d060] bg-clip-text text-transparent">2 490 ₽</div>
                        </div>
                      </div>
                      <div className="inline-block bg-[#e3ee6b]/10 px-6 py-2 rounded-full">
                        <span className="text-[#0A0A0A]">Вы экономите </span>
                        <span className="text-[#0A0A0A]">7 510 ₽</span>
                      </div>
                    </motion.div>

                    {/* Giant price */}
                    <motion.div variants={fadeInUp} className="mb-8 sm:mb-10">
                      <motion.div 
                        className="text-7xl sm:text-8xl lg:text-9xl tracking-tighter leading-none mb-4"
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                      >
                        <span className="bg-gradient-to-br from-[#0A0A0A] via-[#333] to-[#0A0A0A] bg-clip-text text-transparent">2 490</span>
                        <span className="text-5xl sm:text-6xl text-[#666]"> ₽</span>
                      </motion.div>
                      <div className="text-[#999] text-base sm:text-lg">
                        Навсегда • Без подписок • Единоразовый платеж
                      </div>
                    </motion.div>

                    {/* Benefits grid */}
                    <motion.div 
                      variants={fadeInUp}
                      className="grid sm:grid-cols-3 gap-4 mb-10"
                    >
                      {[
                        { icon: <Check className="w-6 h-6" />, text: "5 модулей контента" },
                        { icon: <Zap className="w-6 h-6" />, text: "Мгновенный доступ" },
                        { icon: <ShieldAlert className="w-6 h-6" />, text: "Гарантия 14 дней" }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#e3ee6b]/10 to-transparent rounded-2xl border border-[#e3ee6b]/20"
                        >
                          <div className="text-[#e3ee6b]">{item.icon}</div>
                          <div className="text-sm text-[#0A0A0A]">{item.text}</div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Value proposition */}
                    <motion.div 
                      variants={fadeInUp}
                      className="relative bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] text-white rounded-3xl p-6 sm:p-8 mb-10 overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#e3ee6b]/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4 text-[#e3ee6b] uppercase text-xs tracking-widest">
                          <Zap className="w-4 h-4" />
                          <span>Математика выгоды</span>
                        </div>
                        <p className="text-lg sm:text-xl leading-relaxed">
                          Один сохраненный клиент на полировку = <span className="text-[#e3ee6b]">15 000–25 000 ₽</span> в кассу.<br/>
                          <span className="text-[#e3ee6b]">Курс окупается в 10 раз</span> с первой же сделки.
                        </p>
                      </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button 
                      variants={fadeInUp}
                      onClick={() => setIsModalOpen(true)}
                      className="w-full sm:w-auto group relative bg-gradient-to-r from-[#e3ee6b] to-[#c5d060] text-[#0A0A0A] px-12 py-6 rounded-full transition-all inline-flex items-center justify-center gap-3 text-lg sm:text-xl touch-manipulation overflow-hidden shadow-2xl"
                      whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(227, 238, 107, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          '0 20px 40px rgba(227, 238, 107, 0.4)',
                          '0 25px 50px rgba(227, 238, 107, 0.6)',
                          '0 20px 40px rgba(227, 238, 107, 0.4)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-[#0A0A0A]"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center gap-3 group-hover:text-[#e3ee6b] transition-colors">
                        <Sparkles className="w-6 h-6" />
                        Получить курс за 2 490 ₽
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </motion.button>

                    <motion.p 
                      variants={fadeInUp}
                      className="mt-6 text-sm text-[#999]"
                    >
                      💳 Оплата картой • Моментальный доступ • Безопасная сделка
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
