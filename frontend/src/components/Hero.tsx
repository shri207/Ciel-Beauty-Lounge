import { motion } from 'motion/react';
import { Star, MapPin, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Particles/Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full glass-panel text-xs font-semibold tracking-widest uppercase mb-6 text-slate-blue/80">
            Welcome to the Sky
          </span>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif text-slate-blue mb-2 leading-[0.9] italic">
            Ciel
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight text-slate-blue mb-6 mt-[-10px]">
            Beauty Lounge
          </h2>
          <p className="text-xl md:text-2xl font-light text-slate-blue/80 mb-8 font-serif italic max-w-2xl mx-auto">
            "Elevate Your Beauty Experience"
          </p>
          <p className="text-base md:text-lg text-slate-blue/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover professional beauty, hair and nail services in a calm, elegant environment designed to help you relax and feel your best.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#book" className="px-8 py-4 rounded-full bg-[#5C6E91] text-white text-sm font-semibold hover:bg-opacity-90 shadow-xl transition-all w-full sm:w-auto">
              Book Appointment
            </a>
            <a href="#services" className="px-8 py-4 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-[#5C6E91] text-sm font-semibold hover:bg-white/60 transition-all w-full sm:w-auto">
              Explore Services
            </a>
          </div>
        </motion.div>

        {/* Floating Info Cards */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-1/3 left-10 xl:left-20 glass-panel p-4 rounded-2xl floating-cloud flex items-center gap-3"
            style={{ animationDelay: '0s' }}
          >
            <div className="bg-champagne p-2 rounded-full text-slate-blue">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-blue">4.8 Rating</p>
              <p className="text-xs text-slate-blue/70">20+ Reviews</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-1/4 right-10 xl:right-20 glass-panel p-4 rounded-2xl floating-cloud flex items-center gap-3"
            style={{ animationDelay: '-3s' }}
          >
            <div className="bg-lavender p-2 rounded-full text-slate-blue">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-blue">Panoramic</p>
              <p className="text-xs text-slate-blue/70">City Views</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-1/4 right-20 xl:right-32 glass-panel p-4 rounded-2xl floating-cloud flex items-center gap-3"
            style={{ animationDelay: '-7s' }}
          >
            <div className="bg-sky p-2 rounded-full text-slate-blue">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-blue">Professional</p>
              <p className="text-xs text-slate-blue/70">Stylists</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
