import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Packages', href: '#packages' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Book', href: '#book' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'py-4' : 'py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className={cn(
          'flex items-center justify-between px-6 py-3 rounded-full mx-auto max-w-6xl transition-all duration-500',
          isScrolled ? 'bg-white/20 backdrop-blur-xl border border-white/40 shadow-sm' : 'bg-transparent'
        )}>
          <a href="#home" className="text-2xl font-serif font-bold tracking-wider text-slate-blue">
            CIEL
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium hover:text-sky transition-colors uppercase tracking-widest text-slate-blue/80 hover:text-slate-blue"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a href="#book" className="px-6 py-2 rounded-full bg-slate-blue text-white text-sm font-medium hover:bg-slate-blue/90 transition-colors">
              Book Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-blue"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 p-4 glass-panel rounded-2xl md:hidden"
          >
            <ul className="flex flex-col space-y-4 text-center">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-slate-blue hover:text-sky transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                 <a href="#book" onClick={() => setIsOpen(false)} className="inline-block px-8 py-3 rounded-full bg-slate-blue text-white font-medium mt-4">
                  Book Now
                 </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
