import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import api from '../lib/axios';

const Packages = () => {
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await api.get('/packages');
        setPackages(data.filter((p: any) => p.status === 'active'));
      } catch (error) {
        console.error("Failed to fetch packages", error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <section className="py-24 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-medium tracking-widest text-neutral-400 uppercase mb-3">Special Offers</h2>
          <h3 className="text-3xl md:text-4xl font-light mb-6">Curated Beauty Packages</h3>
          <div className="w-16 h-px bg-neutral-700 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`p-8 rounded-2xl border ${
                index === 1
                  ? 'border-neutral-500 bg-neutral-800/50 transform md:-translate-y-4 shadow-2xl'
                  : 'border-neutral-800 bg-neutral-900'
              }`}
            >
              {index === 1 && (
                <div className="inline-block px-3 py-1 bg-white text-neutral-900 text-xs font-medium tracking-wider uppercase rounded-full mb-6">
                  Most Popular
                </div>
              )}
              <h4 className="text-2xl font-medium mb-2">{pkg.name}</h4>
              <p className="text-neutral-400 text-sm mb-6 h-10">{pkg.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-light">${pkg.price}</span>
                {pkg.discount > 0 && <span className="text-neutral-500 ml-2">Save ${pkg.discount}</span>}
              </div>
              <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
                    <span className="text-neutral-300">Package services included (configure via admin)</span>
                  </li>
              </ul>
              <a
                href="#booking"
                className={`block w-full py-3 px-4 text-center rounded-lg transition-colors duration-300 ${
                  index === 1
                    ? 'bg-white text-neutral-900 hover:bg-neutral-200'
                    : 'bg-neutral-800 text-white hover:bg-neutral-700'
                }`}
              >
                Book Package
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
