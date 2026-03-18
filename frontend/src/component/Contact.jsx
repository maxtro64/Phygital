import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-8 leading-[0.9]">
              We're here <br />
              <span className="text-orange-500 italic">to help you.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium mb-12 max-w-md italic">
              Whether you're a shopper needing help or a shopkeeper wanting to go digital, 
              our team is ready to support you.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-orange-500">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Call Us</div>
                  <div className="text-xl font-bold text-gray-900">1-800-PHYGITAL</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-blue-500">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Us</div>
                  <div className="text-xl font-bold text-gray-900">hello@phygital.com</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-green-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Visit Us</div>
                  <div className="text-xl font-bold text-gray-900">Local Neighborhoods, India</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 shadow-orange-100/50"
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Email</label>
                  <input type="email" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Message</label>
                <textarea rows="4" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full py-5 bg-gray-900 text-white rounded-3xl font-black text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-3">
                Send Message
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
