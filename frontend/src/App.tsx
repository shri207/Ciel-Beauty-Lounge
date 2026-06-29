import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import InfoSection from './components/InfoSection';
import Booking from './components/Booking';
import { About } from './components/About';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <Navigation />

      <main>
        <Hero />
        <About />
        <Services />
        <Packages />
        <Gallery />
        <Testimonials />
        <InfoSection />
        <Booking />
      </main>

      <Footer />
    </div>
  );
}

export default App;
