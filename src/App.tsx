import { motion, useScroll, useSpring } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Packages } from './components/Packages';
import { Testimonials } from './components/Testimonials';
import { InfoSection } from './components/InfoSection';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-cloud min-h-screen text-slate-blue font-sans selection:bg-sky/50 selection:text-slate-blue overflow-x-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#CFE9FF] via-[#D8D4F8] to-[#F5E8D8] opacity-60 pointer-events-none"></div>
      
      {/* Decorative Cloud Shapes */}
      <div className="fixed -top-20 -left-20 w-[400px] h-[400px] bg-white opacity-40 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="fixed top-[40%] right-[-100px] w-[350px] h-[350px] bg-white opacity-50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-100px] left-[20%] w-[500px] h-[500px] bg-white opacity-30 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Altitude Meter / Scroll Progress */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 h-[50vh] w-1 bg-slate-blue/10 rounded-full z-50 hidden md:block">
        <motion.div 
          className="w-full bg-slate-blue rounded-full origin-top"
          style={{ scaleY }}
        />
        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-blue/50 tracking-widest uppercase">
          Altitude
        </div>
      </div>

      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Packages />
        <Testimonials />
        <InfoSection />
        <Booking />
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/96566912126"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 transition-transform duration-300"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>
    </div>
  );
}
