import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import api from '../lib/axios';

const Booking = () => {
  const [services, setServices] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_id: '',
    package_id: '',
    date: '',
    time: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, packagesRes] = await Promise.all([
          api.get('/services'),
          api.get('/packages')
        ]);
        setServices(servicesRes.data.filter((s: any) => s.status === 'active'));
        setPackages(packagesRes.data.filter((p: any) => p.status === 'active'));
      } catch (error) {
        console.error("Failed to fetch booking options", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value,
        // Reset the other if one is selected
        ...(name === 'service_id' && value !== '' ? { package_id: '' } : {}),
        ...(name === 'package_id' && value !== '' ? { service_id: '' } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await api.post('/appointments', {
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          service_id: formData.service_id || null,
          package_id: formData.package_id || null,
          appointment_date: formData.date,
          appointment_time: formData.time,
          notes: formData.notes
      });

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service_id: '', package_id: '', date: '', time: '', notes: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
        setStatus('error');
        setErrorMessage(error.response?.data?.message || 'Failed to submit booking. Please try again.');
    }
  };

  return (
    <section id="booking" className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <img
          src="https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="Spa background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-medium tracking-widest text-neutral-400 uppercase mb-3">Reserve Your Time</h2>
            <h3 className="text-4xl md:text-5xl font-light mb-6">Book an Appointment</h3>
            <div className="w-16 h-px bg-neutral-700 mb-8"></div>
            <p className="text-neutral-400 leading-relaxed mb-12 max-w-md">
              Schedule your visit to Ciel Beauty Lounge. Our experts are ready to provide you with an exceptional beauty experience tailored to your needs.
            </p>

            <div className="space-y-6">
              <div className="flex items-center text-neutral-300">
                <Clock className="w-5 h-5 mr-4 text-neutral-500" />
                <div>
                  <p className="font-medium text-white">Opening Hours</p>
                  <p className="text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-neutral-900 p-8 md:p-10 rounded-2xl shadow-2xl">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-2xl font-medium mb-2">Booking Requested!</h4>
                <p className="text-neutral-500">We've received your appointment request and will contact you shortly to confirm.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                        {errorMessage}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <select
                      name="service_id"
                      value={formData.service_id}
                      onChange={handleChange}
                      disabled={formData.package_id !== ''}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors appearance-none"
                    >
                      <option value="">Select Service (Optional)</option>
                      {services.map(s => <option key={s.id} value={s.id}>{s.title} (${s.price})</option>)}
                    </select>
                  </div>
                  <div>
                    <select
                      name="package_id"
                      value={formData.package_id}
                      onChange={handleChange}
                      disabled={formData.service_id !== ''}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors appearance-none"
                    >
                      <option value="">Select Package (Optional)</option>
                      {packages.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-neutral-400" />
                  <textarea
                    name="notes"
                    placeholder="Any special requests or notes? (Optional)"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors duration-300 font-medium tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Confirm Booking'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
