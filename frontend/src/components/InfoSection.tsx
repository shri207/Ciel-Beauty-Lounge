import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import api from '../lib/axios';

const InfoSection = () => {
  const [settings, setSettings] = useState<any>({
      general: {
          salonName: 'Ciel Beauty Lounge',
          address: '123 Beauty Blvd, Suite 100, New York, NY 10001',
          phone: '+1 234 567 8900',
          email: 'info@cielbeautylounge.com'
      },
      social: {
          instagram: '#',
          facebook: '#'
      }
  });

  const [hours, setHours] = useState<any[]>([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const [settingsRes, hoursRes] = await Promise.all([
            api.get('/settings'),
            api.get('/working-hours')
        ]);
        if (settingsRes.data.general) setSettings(settingsRes.data);
        if (hoursRes.data) setHours(hoursRes.data);
      } catch (error) {
        console.error("Failed to fetch info section data", error);
      }
    };
    fetchInfo();
  }, []);

  const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <section id="contact" className="py-24 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div>
            <h4 className="text-lg font-medium text-neutral-900 mb-6">{settings.general.salonName}</h4>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Experience the epitome of luxury and relaxation. Our expert team is dedicated to enhancing your natural beauty.
            </p>
            <div className="flex space-x-4">
              <a href={settings.social.instagram} className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={settings.social.facebook} className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-neutral-900 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-neutral-400 mr-3 shrink-0 mt-0.5" />
                <span className="text-neutral-600 text-sm">{settings.general.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-neutral-400 mr-3" />
                <span className="text-neutral-600 text-sm">{settings.general.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-neutral-400 mr-3" />
                <span className="text-neutral-600 text-sm">{settings.general.email}</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-medium text-neutral-900 mb-6">Opening Hours</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {hours.length > 0 ? (
                  hours.map((h: any) => (
                      <div key={h.day_of_week} className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600 text-sm">{daysMap[h.day_of_week]}</span>
                        <span className="text-neutral-900 text-sm font-medium">
                            {h.is_open ? `${h.opening_time.substring(0, 5)} - ${h.closing_time.substring(0, 5)}` : 'Closed'}
                        </span>
                      </div>
                  ))
              ) : (
                  <>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600 text-sm">Mon - Fri</span>
                        <span className="text-neutral-900 text-sm font-medium">9:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600 text-sm">Saturday</span>
                        <span className="text-neutral-900 text-sm font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600 text-sm">Sunday</span>
                        <span className="text-neutral-900 text-sm font-medium">10:00 AM - 4:00 PM</span>
                      </div>
                  </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
