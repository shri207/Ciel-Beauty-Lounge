import React, { useEffect, useState } from 'react';
import api from '../lib/axios';

const getImageUrl = (path: string | null) => {
    if (!path) return '';
    return `${import.meta.env.VITE_API_URL?.replace('/api', '')}${path}`;
}

const Gallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        setImages(data.filter((img: any) => img.visibility));
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      }
    };
    fetchGallery();
  }, []);

  const categories = ['All', ...new Set(images.map(img => img.category).filter(Boolean))];

  const filteredImages = filter === 'All'
    ? images
    : images.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase mb-3">Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-light text-neutral-900 mb-6">Our Masterpieces</h3>
          <div className="w-16 h-px bg-neutral-300 mx-auto"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === category
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-xl aspect-square">
              <img
                src={getImageUrl(image.image_url)}
                alt={image.caption || 'Gallery Image'}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {image.category || image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
