import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8DC] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF6347]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFD700]/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="max-w-lg w-full text-center relative z-10">
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-[#FF6347] rounded-full blur-2xl opacity-20 animate-bounce"></div>
          <Ghost className="w-32 h-32 text-[#FF6347] relative mx-auto" />
          <h1 className="text-9xl font-black text-[#8B4513]/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
            404
          </h1>
        </div>

        <h2 className="text-4xl font-bold text-[#8B4513] mb-4">Oops! Page Lost in the Local Market.</h2>
        <p className="text-[#8B4513]/70 text-lg mb-10 leading-relaxed">
          The page you're looking for seems to have wandered off to a nearby shop. 
          Don't worry, we can help you find your way back home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white font-bold rounded-2xl shadow-xl shadow-[#FF6347]/20 hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Back to Home
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#8B4513] font-bold rounded-2xl border-2 border-[#F0E68C] hover:bg-[#FFF8DC] transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 opacity-50">
          <div className="h-1 bg-gradient-to-r from-transparent via-[#FF6347] to-transparent rounded-full"></div>
          <div className="h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent rounded-full"></div>
          <div className="h-1 bg-gradient-to-r from-transparent via-[#32CD32] to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
