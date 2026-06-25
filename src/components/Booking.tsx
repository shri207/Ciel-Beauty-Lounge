import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';

type BookingFormData = {
  name: string;
  phone: string;
  email: string;
  gender: string;
  service: string;
  date: string;
  time: string;
  messageText: string;
};

export function Booking() {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>();

  const onSubmit = (data: BookingFormData) => {
    const message = `Hello, I would like to book an appointment.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Gender: ${data.gender}
Service: ${data.service}
Date: ${data.date}
Time: ${data.time}
Message: ${data.messageText}

Please confirm my appointment.`;

    window.open(`https://wa.me/96566912126?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="book" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl glass-panel rounded-[3rem] p-8 md:p-14 relative"
        >
          {/* Subtle floating cloud accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-slate-blue">
              Reserve Your Cloud
            </h2>
            <p className="text-slate-blue/70">
              Book your appointment via WhatsApp for a seamless experience.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-blue/80 mb-2">Full Name *</label>
                <input
                  {...register("name", { required: true })}
                  className="w-full bg-white/50 border border-white/60 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky/50 focus:bg-white/80 transition-all text-slate-blue"
                  placeholder="Jane Doe"
                />
                {errors.name && <span className="text-red-400 text-xs mt-1">This field is required</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-blue/80 mb-2">Phone Number *</label>
                <input
                  {...register("phone", { required: true })}
                  className="w-full bg-white/50 border border-white/60 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky/50 focus:bg-white/80 transition-all text-slate-blue"
                  placeholder="+965 XX XX XX"
                />
                {errors.phone && <span className="text-red-400 text-xs mt-1">This field is required</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-blue/80 mb-2">Email</label>
                <input
                  {...register("email")}
                  className="w-full bg-white/50 border border-white/60 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky/50 focus:bg-white/80 transition-all text-slate-blue"
                  placeholder="jane@example.com"
                  type="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-blue/80 mb-2">Gender *</label>
                <select
                  {...register("gender", { required: true })}
                  className="w-full bg-white/50 border border-white/60 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky/50 focus:bg-white/80 transition-all text-slate-blue appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                {errors.gender && <span className="text-red-400 text-xs mt-1">This field is required</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-blue/80 mb-2">Service *</label>
                <select
                  {...register("service", { required: true })}
                  className="w-full bg-white/50 border border-white/60 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky/50 focus:bg-white/80 transition-all text-slate-blue appearance-none"
                >
                  <option value="">Select Service</option>
                  <option value="Hair Studio">Hair Studio</option>
                  <option value="Nail Lounge">Nail Lounge</option>
                  <option value="Beauty Care">Beauty Care</option>
                  <option value="Cloud Care Package">Cloud Care Package</option>
                  <option value="Skyline Experience Package">Skyline Experience Package</option>
                  <option value="Celestial Signature Package">Celestial Signature Package</option>
                </select>
                {errors.service && <span className="text-red-400 text-xs mt-1">This field is required</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-blue/80 mb-2">Date *</label>
                  <input
                    {...register("date", { required: true })}
                    type="date"
                    className="w-full bg-white/50 border border-white/60 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky/50 focus:bg-white/80 transition-all text-slate-blue"
                  />
                  {errors.date && <span className="text-red-400 text-xs mt-1">Required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-blue/80 mb-2">Time *</label>
                  <input
                    {...register("time", { required: true })}
                    type="time"
                    className="w-full bg-white/50 border border-white/60 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky/50 focus:bg-white/80 transition-all text-slate-blue"
                  />
                  {errors.time && <span className="text-red-400 text-xs mt-1">Required</span>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-blue/80 mb-2">Message (Optional)</label>
              <textarea
                {...register("messageText")}
                rows={4}
                className="w-full bg-white/50 border border-white/60 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky/50 focus:bg-white/80 transition-all text-slate-blue resize-none"
                placeholder="Any special requests or details..."
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-10 py-5 rounded-full bg-slate-blue text-white font-medium hover:bg-slate-blue/90 transition-all hover:scale-105 hover:shadow-xl"
              >
                <span>Send Booking via WhatsApp</span>
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
