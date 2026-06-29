import { motion } from 'motion/react';
import { Users, Sparkles, Clock, Star } from 'lucide-react';

const stats = [
  { icon: Users, value: '5000+', label: 'Happy Clients', color: 'bg-sky/50' },
  { icon: Sparkles, value: '10+', label: 'Beauty Specialists', color: 'bg-lavender/50' },
  { icon: Clock, value: '8+', label: 'Years Experience', color: 'bg-champagne/50' },
  { icon: Star, value: '4.8★', label: 'Customer Rating', color: 'bg-sky/50' },
];

export function About() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6 text-slate-blue"
          >
            The Ciel Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-blue/80 leading-relaxed"
          >
            Ciel Beauty Lounge offers personalized beauty experiences in a spacious setting, 
            combining professional expertise with comfort and exceptional service. Step into 
            our sanctuary above the clouds and let us elevate your beauty routine.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="glass-panel p-6 rounded-3xl text-center flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className={`p-4 rounded-full ${stat.color} mb-4 text-slate-blue`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold font-serif mb-2">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-blue/70 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
