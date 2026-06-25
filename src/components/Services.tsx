import { motion } from 'motion/react';
import { Scissors, Sparkles, Smile } from 'lucide-react';

const services = [
  {
    title: 'Hair Studio',
    icon: Scissors,
    items: ['Haircut', 'Hair Styling', 'Hair Treatments', 'Hair Coloring'],
    price: 'Starting KD 8',
    color: 'from-sky/40 to-transparent'
  },
  {
    title: 'Nail Lounge',
    icon: Sparkles,
    items: ['Manicure', 'Pedicure', 'Nail Art', 'Gel Polish'],
    price: 'Starting KD 6',
    color: 'from-lavender/40 to-transparent'
  },
  {
    title: 'Beauty Care',
    icon: Smile,
    items: ['Facial', 'Eyebrow Styling', 'Skin Treatments', 'Hair Wash'],
    price: 'Starting KD 10',
    color: 'from-champagne/40 to-transparent'
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-white/30">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-4 text-slate-blue"
          >
            Signature Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-blue/70 max-w-2xl mx-auto"
          >
            Curated treatments tailored to enhance your natural beauty.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="group relative"
              >
                {/* Floating shadow effect */}
                <div className="absolute -inset-1 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-xl -z-10" />
                
                <div className={`h-full glass-panel p-8 rounded-[2rem] border-t border-l border-white/80 bg-gradient-to-br ${service.color} hover:-translate-y-4 transition-transform duration-500`}>
                  <div className="bg-white/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                    <Icon className="w-8 h-8 text-slate-blue" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif mb-6">{service.title}</h3>
                  <ul className="space-y-4 mb-8">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center text-slate-blue/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-blue/40 mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-white/40">
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-blue/60 mb-1">Pricing</p>
                    <p className="text-xl font-serif font-medium">{service.price}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
