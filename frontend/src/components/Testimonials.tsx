import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import api from '../lib/axios';

const getImageUrl = (path: string | null) => {
    if (!path) return 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'; // fallback
    return `${import.meta.env.VITE_API_URL?.replace('/api', '')}${path}`;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get('/testimonials');
        setTestimonials(data.filter((t: any) => t.status === 'active'));
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-neutral-200/50 blur-3xl"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-neutral-200/50 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase mb-3">Client Stories</h2>
          <h3 className="text-3xl md:text-4xl font-light text-neutral-900 mb-6">What They Say About Us</h3>
          <div className="w-16 h-px bg-neutral-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 relative">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-neutral-100 rotate-180" />
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-neutral-900 fill-neutral-900" />
                ))}
              </div>
              <p className="text-neutral-600 mb-8 leading-relaxed relative z-10">
                "{testimonial.review}"
              </p>
              <div className="flex items-center">
                <img
                  src={getImageUrl(testimonial.image_url)}
                  alt={testimonial.customer_name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-neutral-900">{testimonial.customer_name}</h4>
                  <p className="text-sm text-neutral-500">Client</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
