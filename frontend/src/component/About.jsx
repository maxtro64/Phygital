import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Award, Store } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-6">
            Our Mission: <br />
            <span className="text-orange-500 italic">Empowering Local Commerce.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
            Phygital is more than just an app. It's a movement to bring your neighborhood 
            shops into the digital age, ensuring that local businesses thrive alongside 
            global platforms.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 mt-20">
          {[
            { 
              icon: Heart, 
              title: 'Community First', 
              desc: 'We prioritize the growth and well-being of local shopkeepers and residents.',
              color: 'bg-red-50 text-red-600'
            },
            { 
              icon: Target, 
              title: 'Hyper-Local', 
              desc: 'Focusing on a 1km radius to ensure the fastest delivery and freshest products.',
              color: 'bg-orange-50 text-orange-600'
            },
            { 
              icon: Award, 
              title: 'Quality Guaranteed', 
              desc: 'Every shop on our platform is personally verified for hygiene and service.',
              color: 'bg-green-50 text-green-600'
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100"
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 mx-auto`}>
                <item.icon size={32} />
              </div>
              <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{item.title}</h4>
              <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
