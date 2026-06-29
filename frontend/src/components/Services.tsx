import React, { useEffect, useState } from 'react';
import { Sparkles, Scissors, Droplets, Smile } from 'lucide-react';
import api from '../lib/axios';

const iconMap: Record<string, React.ReactNode> = {
  'Hair Care': <Scissors className="w-6 h-6 text-neutral-600" />,
  'Nail Care': <Sparkles className="w-6 h-6 text-neutral-600" />,
  'Skin Care': <Droplets className="w-6 h-6 text-neutral-600" />,
  'Massage': <Smile className="w-6 h-6 text-neutral-600" />,
};

const getImageUrl = (path: string | null) => {
    if (!path) return 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'; // fallback
    return `${import.meta.env.VITE_API_URL?.replace('/api', '')}${path}`;
}

const Services = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services');
        setServices(data.filter((s: any) => s.status === 'active'));
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase mb-3">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-light text-neutral-900 mb-6">Elevate Your Beauty Experience</h3>
          <div className="w-16 h-px bg-neutral-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={service.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-6 aspect-[4/5]">
                <img
                  src={getImageUrl(service.image_url)}
                  alt={service.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-full">
                   {/* We might need a real category mapping if they are in DB, but falling back for now */}
                  <Sparkles className="w-6 h-6 text-neutral-600" />
                </div>
              </div>
              <h4 className="text-xl font-medium text-neutral-900 mb-2">{service.title}</h4>
              <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-900">{service.duration} mins</span>
                <span className="text-lg font-light text-neutral-900">${service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
