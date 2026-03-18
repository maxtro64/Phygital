import React from 'react';
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';

const Legal = ({ type = 'privacy' }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      desc: 'How we protect your data at Phygital.',
      icon: Shield,
      color: 'text-blue-600'
    },
    terms: {
      title: 'Terms of Service',
      desc: 'The rules of using our neighborhood marketplace.',
      icon: FileText,
      color: 'text-orange-600'
    },
    policies: {
      title: 'Shop Policies',
      desc: 'Standards for verified shops on our platform.',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  };

  const active = content[type] || content.privacy;

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <div className={`w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center ${active.color}`}>
            <active.icon size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">{active.title}</h1>
            <p className="text-lg text-gray-500 font-medium mt-2">{active.desc}</p>
          </div>
        </div>

        <div className="prose prose-orange lg:prose-xl max-w-none text-gray-600 font-medium leading-[1.8]">
          <h2 className="text-gray-900 font-black">1. General Information</h2>
          <p>
            Welcome to Phygital. We are committed to protecting your privacy and ensuring transparency in how we operate. 
            This document outlines the standard procedures and agreements between you and Phygital.
          </p>

          <h2 className="text-gray-900 font-black">2. Data Usage</h2>
          <p>
            We collect location data only to connect you with nearby shops within a 1km radius. 
            Your payment information is processed securely through Razorpay and is never stored on our servers.
          </p>

          <h2 className="text-gray-900 font-black">3. Community Standards</h2>
          <p>
            Users and Shopkeepers must treat each other with respect. Phygital reserves the right to remove 
            any user or shop that violates our neighborhood safety and quality standards.
          </p>

          <div className="mt-20 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 italic">
            "We believe that the best commerce is local commerce. Thank you for supporting your neighborhood."
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
