import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-white/20 backdrop-blur-xl border-t border-white/40 pt-24 pb-8 overflow-hidden mt-20">
      {/* Decorative Cloud */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-sky/20 rounded-[100%] blur-3xl -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-3xl font-serif font-bold text-slate-blue mb-6 tracking-wider">CIEL</h2>
            <p className="text-slate-blue/70 mb-8 leading-relaxed max-w-sm">
              Elevate your beauty experience in our premium lounge. A serene escape above the clouds.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-blue hover:bg-sky/50 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-blue hover:bg-sky/50 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/96566912126" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-blue hover:bg-sky/50 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-xl text-slate-blue mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Experience', 'Services', 'Gallery', 'Packages'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-blue/70 hover:text-sky transition-colors uppercase tracking-wider text-sm font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className="font-serif font-bold text-xl text-slate-blue mb-6">Contact Us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ul className="space-y-6 text-slate-blue/80">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 shrink-0" />
                  <span>Sanam Tower<br/>Fahad Al-Salem Street<br/>Kuwait City, Kuwait</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 shrink-0" />
                  <a href="tel:+96566912126" className="hover:text-sky transition-colors">+965 6691 2126</a>
                </li>
                <li className="flex items-center gap-4">
                  <Clock className="w-5 h-5 shrink-0" />
                  <span>10 AM – 8 PM Daily</span>
                </li>
              </ul>
              
              <div className="rounded-2xl overflow-hidden glass-panel h-48 sm:h-auto border-white/40">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.623348123687!2d47.9692482!3d29.3621421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf84eba28bd297%3A0xc6a8027599026be1!2sFahad%20Al%20Salem%20St%2C%20Kuwait%20City%2C%20Kuwait!5e0!3m2!1sen!2sus!4v1716900000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-blue/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-blue/60 text-sm font-medium">
            &copy; {new Date().getFullYear()} Ciel Beauty Lounge. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-slate-blue hover:bg-sky/50 transition-colors group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
