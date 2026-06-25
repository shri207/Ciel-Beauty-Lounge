import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Shaikha Alomran',
    text: "The staff were incredibly friendly. The manicure and pedicure were excellent, and even the Turkish coffee made the visit memorable.",
    rating: 5
  },
  {
    name: 'Hebah Alhamwi',
    text: "A beautiful, spacious salon with wonderful views. Cathryn has been my trusted hairdresser for years.",
    rating: 5
  },
  {
    name: 'Lulwah Aleisa',
    text: "Professional team and excellent styling. Dana did a fantastic job. Highly recommend this place for a relaxing day.",
    rating: 5
  },
  {
    name: 'Fatima Al-Sabah',
    text: "The facial treatment was heavenly. I felt like I was floating in the clouds. The ambiance is just perfect.",
    rating: 5
  },
  {
    name: 'Sarah K.',
    text: "Best nail art I've ever had! The attention to detail and the premium products they use make all the difference.",
    rating: 5
  },
  {
    name: 'Mona R.',
    text: "I love the airy, bright space. It doesn't feel crowded like other salons. A true sanctuary in the city.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-4 text-slate-blue"
          >
            Client Love
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-blue/70 max-w-2xl mx-auto"
          >
            Read what our wonderful clients have to say about their experience.
          </motion.p>
        </div>

        {/* CSS Scrolling Marquee */}
        <div className="flex overflow-hidden space-x-6 pb-8">
          <motion.div 
            className="flex space-x-6 min-w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div 
                key={i} 
                className="w-[350px] md:w-[450px] glass-panel p-8 rounded-[2rem] rounded-tr-sm relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-sky/40" />
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-champagne text-champagne mr-1" />
                  ))}
                </div>
                <p className="text-slate-blue/80 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="mt-auto">
                  <p className="font-bold font-serif text-slate-blue text-lg">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
