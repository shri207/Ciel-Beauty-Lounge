import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const features = [
  'Spacious Lounge',
  'Professional Stylists',
  'Premium Hair Treatments',
  'Nail Art Specialists',
  'Relaxing Atmosphere',
  'Personalized Beauty Care',
];

const faqs = [
  {
    question: 'Do I need an appointment?',
    answer: 'While we welcome walk-ins, we highly recommend booking an appointment to ensure minimal wait time and dedicated service.'
  },
  {
    question: 'Do you provide hair treatments?',
    answer: 'Yes, we offer a wide range of premium hair treatments tailored to your hair type and needs.'
  },
  {
    question: 'Can I book nail services separately?',
    answer: 'Absolutely. You can book individual services like manicures, pedicures, or nail art on their own.'
  },
  {
    question: 'Do you offer manicure and pedicure?',
    answer: 'Yes, our Nail Lounge specializes in both standard and luxury manicures and pedicures.'
  },
  {
    question: 'What are your business hours?',
    answer: 'We are open daily from 10 AM to 8 PM.'
  },
  {
    question: 'Which payment methods are accepted?',
    answer: 'We accept cash, K-Net, Visa, and Mastercard.'
  }
];

export function InfoSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden bg-white/30">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Why Choose Us */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-slate-blue">
                Why Choose Ciel
              </h2>
              <p className="text-slate-blue/70 mb-10 max-w-md">
                Experience beauty services in an environment that prioritizes your comfort and peace of mind.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, i) => (
                  <motion.div 
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-slate-blue group-hover:bg-sky/30 transition-colors">
                      <Check className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-slate-blue/90">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* FAQ */}
          <div className="w-full lg:w-1/2">
             <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-10 text-slate-blue">
                Common Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-panel rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between font-medium text-slate-blue focus:outline-none"
                    >
                      {faq.question}
                      <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", openFaq === i ? "rotate-180" : "")} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-5 text-slate-blue/70">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
