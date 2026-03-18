import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Store, 
  Smartphone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle,
  ArrowLeft,
  Shield,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { API_BASE_URL } from '../config';

const Shopkeeper = ({ signup = false }) => {
  const [isLogin, setIsLogin] = useState(!signup);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    shopName: '',
    email: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin 
        ? `${API_BASE_URL}/auth/login-shopkeeper` 
        : `${API_BASE_URL}/auth/register-shopkeeper`;
        
      const bodyData = isLogin 
        ? { email: formData.email, password: formData.password }
        : { shopName: formData.shopName, email: formData.email, phone: formData.phone, password: formData.password, address: "Setup Later" };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('shopToken', data.token);
        localStorage.setItem('shopId', data._id);
        localStorage.setItem('userType', 'shopkeeper');
        localStorage.setItem('isVerified', data.isVerified);
        localStorage.setItem('verificationStatus', data.verificationStatus);
        alert(isLogin ? 'Shopkeeper Login Successful!' : 'Shop Registered Successfully!');
        navigate('/shopkeeper/dashboard'); // go to dashboard page
      } else {
        alert(`${isLogin ? 'Login' : 'Registration'} Failed: ${data.message}`);
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

  const benefits = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Grow Your Business',
      description: 'Reach more customers in your neighborhood'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Keep 95% Revenue',
      description: 'Only 5% platform fee, not 25-30%'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Simple Management',
      description: 'Easy-to-use dashboard on your phone'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Secure & Reliable',
      description: 'Your data and payments are protected'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#F0FFF0] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Info */}
          <div className="bg-gradient-to-br from-white to-[#F0FFF0] rounded-3xl p-8 lg:p-12 border border-[#90EE90] shadow-2xl">
            <Link to="/" className="inline-flex items-center gap-2 text-[#2F4F4F] mb-8 hover:text-[#32CD32] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#32CD32]/10 to-[#1E90FF]/10 px-4 py-2 rounded-full mb-6">
                <Store className="w-4 h-4 text-[#32CD32]" />
                <span className="text-sm font-semibold text-[#2F4F4F]">For Local Shopkeepers</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Welcome Back,{' '}
                <span className="bg-gradient-to-r from-[#32CD32] to-[#1E90FF] bg-clip-text text-transparent">
                  Shopkeeper!
                </span>
              </h1>
              
              <p className="text-xl text-[#2F4F4F]/80">
                Access your dashboard and continue serving your neighborhood community.
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-[#2F4F4F] mb-6">Why Shopkeepers Love Us</h3>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/50 rounded-xl p-4 border border-[#90EE90]/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gradient-to-br from-[#32CD32]/10 to-[#1E90FF]/10 rounded-lg">
                        {benefit.icon}
                      </div>
                      <div className="font-bold text-[#2F4F4F] text-sm">{benefit.title}</div>
                    </div>
                    <p className="text-xs text-[#2F4F4F]/60">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-[#32CD32]/5 to-[#1E90FF]/5 rounded-2xl p-6 border border-[#32CD32]/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#32CD32]">5K+</div>
                  <div className="text-sm text-[#2F4F4F]">Shopkeepers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#FFD700]">95%</div>
                  <div className="text-sm text-[#2F4F4F]">Revenue Kept</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1E90FF]">₹50M+</div>
                  <div className="text-sm text-[#2F4F4F]">Orders Processed</div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link 
                  to="/shopkeepers" 
                  className="inline-flex items-center gap-1 text-[#1E90FF] hover:text-[#4169E1] text-sm font-medium"
                >
                  Learn more about shop benefits
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-[#E8F4EA] shadow-2xl">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#32CD32] to-[#1E90FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <Store className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#2F4F4F]">
                {isLogin ? 'Sign in to Your Shop Dashboard' : 'Register Your Shop'}
              </h2>
              <p className="text-[#2F4F4F]/60 mt-2">
                {isLogin ? 'Manage your shop, orders, and customers' : 'Join our local merchant network'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shop Name - Only for Signup */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-[#2F4F4F] mb-2">
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4" />
                      Shop Name
                    </div>
                  </label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#E8F4EA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#32CD32] focus:border-transparent transition-all"
                    placeholder="e.g. Fresh Mart"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Phone - Only for Signup */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-[#2F4F4F] mb-2">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Phone Number
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#E8F4EA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#32CD32] focus:border-transparent transition-all"
                    placeholder="98765 43210"
                    required={!isLogin}
                  />
                </div>
              )}
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#2F4F4F] mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#E8F4EA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#32CD32] focus:border-transparent transition-all"
                  placeholder="your@shop.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[#2F4F4F] mb-2">
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
                    className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#E8F4EA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#32CD32] focus:border-transparent transition-all pr-12"
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2F4F4F]/40 hover:text-[#32CD32] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Options */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="w-4 h-4 text-[#32CD32] rounded focus:ring-[#32CD32] focus:ring-2"
                    />
                    <span className="text-sm text-[#2F4F4F]">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-[#32CD32] hover:text-[#1E90FF] transition-colors">
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#32CD32] to-[#1E90FF] text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#32CD32]/30 transition-all hover:scale-[1.02]"
              >
                {isLogin ? 'Sign In to Dashboard' : 'Create Shop Account'}
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E8F4EA]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#2F4F4F]/40">Or continue with</span>
                </div>
              </div>

              {/* Alternative Login */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 border border-[#E8F4EA] rounded-xl hover:bg-[#F8F8F8] transition-colors"
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="text-sm text-[#2F4F4F]">Phone OTP</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 border border-[#E8F4EA] rounded-xl hover:bg-[#F8F8F8] transition-colors"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  <span className="text-sm text-[#2F4F4F]">Google</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center pt-6 border-t border-[#E8F4EA]">
                <p className="text-[#2F4F4F]">
                  {isLogin ? "Don't have a shop account? " : "Already have a shop account? "}
                  <button 
                    type="button" 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="text-[#32CD32] font-bold hover:text-[#1E90FF] transition-colors"
                  >
                    {isLogin ? 'Register your shop' : 'Sign in to Dashboard'}
                  </button>
                </p>
                {isLogin && (
                  <p className="text-sm text-[#2F4F4F]/60 mt-2">
                    It's free and takes only 5 minutes to get started
                  </p>
                )}
              </div>
            </form>

            {/* Test Account */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#FFD700]/5 to-transparent rounded-xl border border-[#FFD700]/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#2F4F4F]">Want to try first?</div>
                  <div className="text-xs text-[#2F4F4F]/60">
                    Use test account: <span className="font-mono text-[#FF6347]">demo@shop.com</span> / <span className="font-mono text-[#FF6347]">demo123</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="mt-8 p-4 bg-gradient-to-r from-[#32CD32]/5 to-transparent rounded-xl border border-[#32CD32]/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#32CD32] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#2F4F4F]">Secure Login</div>
                  <div className="text-xs text-[#2F4F4F]/60">
                    Your login information is encrypted and protected. We never share your shop data.
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Links */}
            <div className="mt-6 flex flex-col gap-3">
              <Link 
                to="/solution" 
                className="text-sm text-[#2F4F4F]/60 hover:text-[#32CD32] transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3 rotate-180" />
                How our solution helps shopkeepers
              </Link>
              <Link 
                to="/features" 
                className="text-sm text-[#2F4F4F]/60 hover:text-[#FF6347] transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3 rotate-180" />
                View all shop features
              </Link>
              <Link 
                to="/contact" 
                className="text-sm text-[#2F4F4F]/60 hover:text-[#1E90FF] transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3 rotate-180" />
                Need help? Contact support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopkeeper;