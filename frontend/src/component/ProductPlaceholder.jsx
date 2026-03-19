import React from 'react';

const ProductPlaceholder = ({ name, category, className = "" }) => {
  // Category-based colors and icons
  const config = {
    'Groceries': { 
      icon: '🥦', 
      gradient: 'from-green-400 to-emerald-600',
      bgText: 'text-green-900/10'
    },
    'Fruits & Veggies': { 
      icon: '🍎', 
      gradient: 'from-red-400 to-orange-500',
      bgText: 'text-red-900/10'
    },
    'Dairy & Bread': { 
      icon: '🥛', 
      gradient: 'from-blue-200 to-indigo-400',
      bgText: 'text-indigo-900/10'
    },
    'Meat & Fish': { 
      icon: '🍗', 
      gradient: 'from-amber-600 to-red-700',
      bgText: 'text-amber-900/10'
    },
    'Snacks': { 
      icon: '🍪', 
      gradient: 'from-yellow-400 to-orange-600',
      bgText: 'text-orange-900/10'
    },
    'Electronics': { 
      icon: '📱', 
      gradient: 'from-slate-700 to-slate-900',
      bgText: 'text-white/5'
    },
    'Medicines': { 
      icon: '💊', 
      gradient: 'from-rose-400 to-pink-600',
      bgText: 'text-rose-900/10'
    },
    'Default': { 
      icon: '📦', 
      gradient: 'from-gray-400 to-gray-600',
      bgText: 'text-gray-900/10'
    }
  };

  // Find matching config or use default
  const getCategoryConfig = (cat) => {
    if (!cat) return config.Default;
    const key = Object.keys(config).find(k => 
      cat.toLowerCase().includes(k.toLowerCase().split(' & ')[0]) || 
      cat.toLowerCase().includes(k.toLowerCase())
    );
    return config[key] || config.Default;
  };

  const currentConfig = getCategoryConfig(category);
  const firstLetter = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br ${currentConfig.gradient} ${className}`}>
      {/* Background Watermark Letter */}
      <div className={`absolute -bottom-4 -right-2 text-[120px] font-black leading-none select-none pointer-events-none transform rotate-12 ${currentConfig.bgText}`}>
        {firstLetter}
      </div>
      
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
      
      {/* Central Icon */}
      <div className="relative z-10 text-5xl sm:text-6xl transform group-hover:scale-125 transition-transform duration-500 drop-shadow-2xl">
        {currentConfig.icon}
      </div>
      
      {/* Subtle Shine Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -inset-[100%] rotate-45 bg-gradient-to-r from-transparent via-white to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </div>
    </div>
  );
};

export default ProductPlaceholder;
