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
  DollarSign,
  Clock,
  Package,
  Heart,
  MapPin,
  Store
} from 'lucide-react';
import { API_BASE_URL } from '../config';

const Customer = ({ signup = false }) => {
  const [isLogin, setIsLogin] = useState(!signup);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loginMethod === 'email') {
        const url = isLogin 
          ? `${API_BASE_URL}/auth/login-user` 
          : `${API_BASE_URL}/auth/register-user`;
          
        const bodyData = isLogin 
          ? { email: formData.email, password: formData.password }
          : { name: formData.name, email: formData.email, phone: formData.phone, password: formData.password, address: "Setup Later" };

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData)
        });
        const data = await res.json();
        
        if (res.ok) {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userId', data._id);
          localStorage.setItem('userType', 'user');
          alert(isLogin ? 'Login Successful!' : 'Account Created Successfully!');
          navigate('/shops'); // go to nearby shops page
        } else {
          alert(`${isLogin ? 'Login' : 'Signup'} Failed: ${data.message}`);
        }
      } else {
        alert('Phone OTP Login not fully implemented yet.');
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

  const features = [
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: 'Save 20-40%',
      description: 'Shop at local prices',
      color: 'text-[#FF6347]',
      bgColor: 'bg-[#FF6347]/10'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: '15-30 Min Delivery',
      description: 'From nearby shops',
      color: 'text-[#FFD700]',
      bgColor: 'bg-[#FFD700]/10'
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: 'Fresh & Local',
      description: 'Authentic products',
      color: 'text-[#32CD32]',
      bgColor: 'bg-[#32CD32]/10'
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: 'Support Local',
      description: 'Strengthen community',
      color: 'text-[#8B4513]',
      bgColor: 'bg-[#8B4513]/10'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF8DC] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Info */}
          <div className="bg-gradient-to-br from-white to-[#FFFAF0] rounded-2xl p-8 lg:p-10 border border-[#F0E68C] shadow-lg">
            <a href="/" className="inline-flex items-center gap-2 text-[#8B4513] mb-8 hover:text-[#FF6347] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
            
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 px-4 py-2 rounded-lg mb-6">
                <ShoppingBag className="w-4 h-4 text-[#FF6347]" />
                <span className="text-sm font-semibold text-[#8B4513]">For Smart Shoppers</span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-[#8B4513]">
                Welcome Back,
                <span className="block bg-gradient-to-r from-[#FF6347] to-[#FFD700] bg-clip-text text-transparent">
                  Smart Shopper!
                </span>
              </h1>
              
              <p className="text-lg text-[#8B4513]/70">
                Access your account and continue shopping from your favorite local stores.
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#8B4513] mb-4">Why Shoppers Love Us</h3>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-[#F0E68C]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 ${feature.bgColor} rounded-lg`}>
                        <div className={feature.color}>
                          {feature.icon}
                        </div>
                      </div>
                      <div className="font-bold text-[#8B4513] text-sm">{feature.title}</div>
                    </div>
                    <p className="text-xs text-[#8B4513]/60">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Shops Preview */}
            <div className="bg-gradient-to-r from-[#FF6347]/5 to-[#FFD700]/5 rounded-lg p-5 border border-[#F0E68C]">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-[#FF6347]" />
                <div>
                  <div className="font-bold text-[#8B4513]">Shops Near You</div>
                  <div className="text-sm text-[#8B4513]/60">Ready to serve you</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-3 border border-[#F0E68C]">
                  <div className="text-xl font-bold text-[#FF6347]">25+</div>
                  <div className="text-xs text-[#8B4513]">Grocery Stores</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-[#F0E68C]">
                  <div className="text-xl font-bold text-[#FFD700]">15+</div>
                  <div className="text-xs text-[#8B4513]">Pharmacies</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-[#F0E68C]">
                  <div className="text-xl font-bold text-[#32CD32]">10+</div>
                  <div className="text-xs text-[#8B4513]">Specialty Shops</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#F0E68C] shadow-lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6347] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#8B4513]">
                {isLogin ? 'Sign in to Your Account' : 'Create an Account'}
              </h2>
              <p className="text-[#8B4513]/60 mt-2">
                {isLogin ? 'Access your orders, addresses, and favorites' : 'Join thousands of smart local shoppers'}
              </p>
            </div>

            {/* Login Method Toggle */}
            <div className={`flex mb-6 bg-[#FFF8DC] rounded-lg p-1 border border-[#F0E68C] ${!isLogin && 'hidden'}`}>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-3 rounded-md transition-all ${loginMethod === 'email' ? 'bg-white shadow-sm border border-[#F0E68C]' : 'hover:bg-white/50'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-[#8B4513]" />
                  <span className="text-sm font-medium text-[#8B4513]">Email</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-3 rounded-md transition-all ${loginMethod === 'phone' ? 'bg-white shadow-sm border border-[#F0E68C]' : 'hover:bg-white/50'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#8B4513]" />
                  <span className="text-sm font-medium text-[#8B4513]">Phone</span>
                </div>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name - Only for Signup */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-[#8B4513] mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FFF8DC] border border-[#F0E68C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              )}
              
              {/* Phone - Only for Signup email method (since phone method has its own input) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-[#8B4513] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FFF8DC] border border-[#F0E68C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent transition-all"
                    placeholder="98765 43210"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Email/Phone Input */}
              <div>
                <label className="block text-sm font-medium text-[#8B4513] mb-2">
                  {loginMethod === 'email' || !isLogin ? 'Email Address' : 'Phone Number'}
                </label>
                <div className="relative">
                  {loginMethod === 'phone' && isLogin && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B4513]/60">
                      +91
                    </div>
                  )}
                  <input
                    type={loginMethod === 'email' || !isLogin ? 'email' : 'tel'}
                    name={loginMethod === 'email' || !isLogin ? 'email' : 'phone'}
                    value={formData[loginMethod === 'email' || !isLogin ? 'email' : 'phone'] || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#FFF8DC] border border-[#F0E68C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent transition-all ${(loginMethod === 'phone' && isLogin) ? 'pl-14' : ''}`}
                    placeholder={loginMethod === 'email' || !isLogin ? 'your@email.com' : '98765 43210'}
                    required
                  />
                </div>
              </div>

              {/* Password - Only for email login or signup */}
              {(loginMethod === 'email' || !isLogin) && (
                <div>
                  <label className="block text-sm font-medium text-[#8B4513] mb-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FFF8DC] border border-[#F0E68C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent transition-all pr-12"
                      placeholder={isLogin ? "Enter your password" : "Create a password"}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B4513]/40 hover:text-[#FF6347] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Button for Phone */}
              {loginMethod === 'phone' && (
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white py-3 rounded-lg font-bold hover:shadow-md transition-all hover:scale-[1.02]"
                  onClick={() => {/* Send OTP logic */}}
                >
                  Send OTP
                </button>
              )}

              {/* Options - Only for email login */}
              {loginMethod === 'email' && isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="w-4 h-4 text-[#FF6347] rounded focus:ring-[#FF6347] focus:ring-2"
                    />
                    <span className="text-sm text-[#8B4513]">Remember me</span>
                  </label>
                  <a href="/forgot-password" className="text-sm text-[#FF6347] hover:text-[#FFD700] transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button for Email */}
              {(loginMethod === 'email' || !isLogin) && (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white py-3 rounded-lg font-bold hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  {isLogin ? 'Sign In to Your Account' : 'Create Account'}
                </button>
              )}

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#F0E68C]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#8B4513]/40">Or continue with</span>
                </div>
              </div>

              {/* Alternative Login */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 border border-[#F0E68C] rounded-lg hover:bg-[#FFF8DC] transition-colors"
                >
                  <Store className="w-5 h-5 text-[#8B4513]" />
                  <span className="text-sm text-[#8B4513] hidden sm:inline">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 border border-[#F0E68C] rounded-lg hover:bg-[#FFF8DC] transition-colors"
                >
                  <Store className="w-5 h-5 text-[#8B4513]" />
                  <span className="text-sm text-[#8B4513] hidden sm:inline">Facebook</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 border border-[#F0E68C] rounded-lg hover:bg-[#FFF8DC] transition-colors"
                >
                  <Smartphone className="w-5 h-5 text-[#8B4513]" />
                  <span className="text-sm text-[#8B4513] hidden sm:inline">Phone</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center pt-6 border-t border-[#F0E68C]">
                <p className="text-[#8B4513]">
                  {isLogin ? 'New to LocalShop? ' : 'Already have an account? '}
                  <button 
                    type="button" 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="text-[#FF6347] font-bold hover:text-[#FFD700] transition-colors"
                  >
                    {isLogin ? 'Create an account' : 'Sign in here'}
                  </button>
                </p>
                {isLogin && (
                  <p className="text-sm text-[#8B4513]/60 mt-2">
                    Get ₹100 off your first order from local shops
                  </p>
                )}
              </div>
            </form>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#FF6347]/5 to-transparent rounded-lg border border-[#F0E68C]">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#FF6347] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#8B4513]">Safe & Secure</div>
                  <div className="text-xs text-[#8B4513]/60">
                    Your personal information and payment details are always protected.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;