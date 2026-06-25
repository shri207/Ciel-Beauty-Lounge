import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

const packages = [
  {
    name: 'Cloud Care',
    price: 'KD 15',
    features: ['Hair Wash', 'Styling', 'Basic Manicure'],
    highlighted: false,
    delay: 0.1
  },
  {
    name: 'Skyline Experience',
    price: 'KD 30',
    features: ['Hair Treatment', 'Facial', 'Pedicure'],
    highlighted: true,
    delay: 0.2
  },
  {
    name: 'Celestial Signature',
    price: 'KD 50',
    features: ['Hair Styling', 'Luxury Facial', 'Nail Art', 'Premium Hair Care'],
    highlighted: false,
    delay: 0.3
  }
];

export function Packages() {
  return (
    <section id="packages" className="py-24 relative overflow-hidden bg-gradient-to-b from-white/30 to-cloud">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-4 text-slate-blue"
          >
            Curated Packages
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-blue/70 max-w-2xl mx-auto"
          >
            Indulge in our carefully crafted beauty experiences designed for complete relaxation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pkg.delay, duration: 0.6 }}
              className={cn(
                "relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2",
                pkg.highlighted 
                  ? "glass-panel bg-sky/20 border-sky/30 shadow-[0_20px_40px_rgba(207,233,255,0.4)] md:-translate-y-4 md:hover:-translate-y-6" 
                  : "glass-panel"
              )}
            >
              {pkg.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-blue text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-serif font-bold text-slate-blue mb-2">{pkg.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-slate-blue">{pkg.price}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center text-slate-blue/80">
                    <div className="mr-3 bg-white/50 p-1 rounded-full text-slate-blue">
                      <Check className="w-4 h-4" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href="#book" 
                className={cn(
                  "block w-full text-center py-3 rounded-full font-medium transition-colors",
                  pkg.highlighted 
                    ? "bg-slate-blue text-white hover:bg-slate-blue/90" 
                    : "bg-white/50 text-slate-blue hover:bg-white/80"
                )}
              >
                Book Package
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
