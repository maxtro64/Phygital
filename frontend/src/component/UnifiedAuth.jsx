import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Smartphone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Shield,
  User,
  Store,
  ShieldCheck
} from 'lucide-react';
import { API_BASE_URL } from '../config';

const UnifiedAuth = ({ initialSignup = false }) => {
  const [isLogin, setIsLogin] = useState(!initialSignup);
  const [role, setRole] = useState('user'); // 'user', 'shopkeeper', 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    shopName: '',
  });

  const navigate = useNavigate();

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem('userLocation', JSON.stringify({ lat: latitude, lng: longitude }));
          console.log('Location saved:', latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          if (error.code === 1) {
            alert("Location permission denied. Nearby shops results might be inaccurate. Please enable location in browser settings.");
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin 
        ? `${API_BASE_URL}/auth/login` 
        : `${API_BASE_URL}/auth/register`;
        
      const bodyData = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone, 
            password: formData.password, 
            role: role,
            shopName: role === 'shopkeeper' ? formData.shopName : undefined,
            address: "Setup Later" 
          };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data._id);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userName', data.name);
        localStorage.getItem('userPic') || localStorage.setItem('userPic', data.profilePic || '');
        
        // Request location after login
        requestLocation();
        
        alert(isLogin ? 'Login Successful!' : 'Account Created Successfully!');
        
        // Role-based redirection
        if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'shopkeeper') {
          navigate('/shopkeeper/dashboard');
        } else {
          navigate('/shops');
        }
      } else {
        alert(`${isLogin ? 'Login' : 'Signup'} Failed: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#F0FFF0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#F0E68C] shadow-2xl relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6347]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#32CD32]/5 rounded-full -ml-16 -mb-16 blur-2xl"></div>

          <a href="/" className="inline-flex items-center gap-2 text-[#8B4513] mb-8 hover:text-[#FF6347] transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>

          <div className="text-center mb-8 relative">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF6347] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg">
              <ShoppingBag className="w-10 h-10 text-white -rotate-3" />
            </div>
            <h2 className="text-3xl font-bold text-[#8B4513]">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-[#8B4513]/60 mt-2 font-medium">
              {isLogin ? 'Access your local shopping world' : 'Join our neighborhood community'}
            </p>
          </div>

          {!isLogin && (
            <div className="flex mb-8 bg-[#FFF8DC]/50 rounded-xl p-1 border border-[#F0E68C]">
              <button
                onClick={() => setRole('user')}
                className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-bold ${role === 'user' ? 'bg-white text-[#FF6347] shadow-md border border-[#F0E68C]' : 'text-[#8B4513]/60 hover:bg-white/30'}`}
              >
                <User className="w-4 h-4" />
                User
              </button>
              <button
                onClick={() => setRole('shopkeeper')}
                className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-bold ${role === 'shopkeeper' ? 'bg-white text-[#32CD32] shadow-md border border-[#F0E68C]' : 'text-[#8B4513]/60 hover:bg-white/30'}`}
              >
                <Store className="w-4 h-4" />
                Shop
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-bold ${role === 'admin' ? 'bg-white text-[#1E90FF] shadow-md border border-[#F0E68C]' : 'text-[#8B4513]/60 hover:bg-white/30'}`}
              >
                <ShieldCheck className="w-4 h-4" />
                Admin
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-bold text-[#8B4513] mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6347] transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            {!isLogin && role === 'shopkeeper' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-bold text-[#8B4513] mb-2">Shop Name</label>
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#32CD32] transition-all"
                  placeholder="Fresh Mart"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-[#8B4513] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6347] transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-[#8B4513] mb-2">Phone Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/40" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6347] transition-all"
                    placeholder="98765 43210"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-[#8B4513] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6347] transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B4513]/40 hover:text-[#FF6347]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 ${role === 'shopkeeper' && !isLogin ? 'bg-gradient-to-r from-[#32CD32] to-[#1E90FF]' : 'bg-gradient-to-r from-[#FF6347] to-[#FFD700]'}`}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="text-center pt-6">
              <p className="text-[#8B4513] text-sm font-medium">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button" 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-[#FF6347] font-bold hover:underline"
                >
                  {isLogin ? 'Sign up here' : 'Login here'}
                </button>
              </p>
            </div>
          </form>

          {/* Trust Badge */}
          <div className="mt-8 pt-6 border-t border-[#F0E68C] flex items-center justify-center gap-2 text-[#8B4513]/40">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Secure Unified Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedAuth;
