import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Store, 
  Zap, 
  MapPin, 
  ShoppingBag, 
  Clock, 
  ShieldCheck,
  Star
} from 'lucide-react';
import { categories } from '../utils/dummyData';

const Home = () => {
  const navigate = useNavigate();

  const handleFindNearbyShops = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem('userLocation', JSON.stringify({ lat: latitude, lng: longitude }));
          navigate('/shops');
        },
        (error) => {
          console.warn('Location denied:', error.message);
          // Still navigate, shops page will use default location
          navigate('/shops');
        }
      );
    } else {
      navigate('/shops');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6">
                <Zap size={14} className="fill-orange-600" />
                Delivery in 15 minutes
              </div>
              <h1 className="text-6xl sm:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
                Everything you need, <br />
                <span className="text-orange-500 italic">delivered.</span>
              </h1>
              <p className="text-xl text-gray-500 font-medium max-w-lg mb-10 leading-relaxed">
                Phygital connects you with your favorite local shops. Get groceries, fresh meat, and daily essentials at your doorstep in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="px-10 py-5 bg-gray-900 text-white rounded-3xl font-black text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200"
                >
                  Order Now
                  <ArrowRight size={20} />
                </Link>
                <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Location</div>
                    <div className="text-sm font-bold text-gray-900">New Delhi, India</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(n => (
                    <div key={n} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${n}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-gray-500">
                  <span className="text-gray-900 font-black">10k+</span> users trust Phygital
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
                  alt="Store"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-black text-lg">Fresh Mart Select</span>
                    <div className="flex items-center gap-1 bg-white text-gray-900 px-2 py-1 rounded-lg text-xs font-black">
                      <Star size={12} className="fill-gray-900" />
                      4.9
                    </div>
                  </div>
                  <div className="text-white/80 text-sm font-medium italic">"Best organic products in the city!"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-2">Browse by need</h2>
              <h3 className="text-4xl font-black text-gray-900 tracking-tighter">Top Categories</h3>
            </div>
            <Link to="/products" className="text-sm font-black text-gray-400 hover:text-gray-900 flex items-center gap-2 mb-2 transition-colors">
              VIEW ALL <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
            {categories.map((cat, i) => (
              <Link 
                key={cat.id} 
                to={`/products?category=${cat.name.toLowerCase()}`}
                className="group flex flex-col items-center p-6 bg-white rounded-[2rem] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">{cat.icon}</div>
                <span className="text-xs font-black text-gray-800 uppercase tracking-tighter text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: Clock, 
                title: 'Lightning Fast', 
                desc: 'Delivery within 15-20 minutes from the nearest shop.',
                color: 'bg-blue-50 text-blue-600'
              },
              { 
                icon: ShieldCheck, 
                title: 'Verified Shops', 
                desc: 'Every shop is manually verified for quality and hygiene.',
                color: 'bg-green-50 text-green-600'
              },
              { 
                icon: ShoppingBag, 
                title: 'Local Prices', 
                desc: 'No heavy commissions. Pay what the shopkeeper asks.',
                color: 'bg-orange-50 text-orange-600'
              }
            ].map((f, i) => (
              <div key={i} className="p-10 bg-white rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}>
                  <f.icon size={32} />
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{f.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Teaser */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="grid grid-cols-6 gap-4">
                {[...Array(24)].map((_, i) => (
                  <Store key={i} className="text-white w-20 h-20" />
                ))}
              </div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8">
                Ready to shop local?
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/products" className="px-12 py-5 bg-orange-500 text-white rounded-3xl font-black text-lg hover:bg-orange-600 hover:scale-105 transition-all shadow-xl shadow-orange-900/20">
                  Shop Now
                </Link>
                <Link to="/signup" className="px-12 py-5 bg-white text-gray-900 rounded-3xl font-black text-lg hover:bg-gray-100 hover:scale-105 transition-all">
                  Register Store
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Location Suggestion Teaser */}
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={handleFindNearbyShops}
          className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 hover:bg-orange-600 transition-all active:scale-95 group"
        >
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <MapPin size={18} />
          </div>
          <span className="font-black text-sm pr-2">FIND NEARBY SHOPS</span>
        </button>
      </div>
    </div>
  );
};

export default Home;