import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  Store, 
  Utensils, 
  Home, 
  Heart,
  ShoppingCart,
  ShoppingBag,
  Package,
  Target,
  MessageCircle,
  User,
  CircleUser,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); 
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();

  // Check if active
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Check Auth Status
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (token) {
      setIsLoggedIn(true);
      setUserType(role);
      // For shopkeepers, check verification (simplified for now, usually should come from profile/token)
      if (role === 'shopkeeper') {
        setIsVerified(localStorage.getItem('isVerified') === 'true');
        setVerificationStatus(localStorage.getItem('verificationStatus') || 'Approved');
      }
    } else {
      setIsLoggedIn(false);
      setUserType(null);
      setIsVerified(false);
      setVerificationStatus(null);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isVerified');
    localStorage.removeItem('verificationStatus');
    setIsLoggedIn(false);
    setUserType(null);
    navigate('/');
  };

  const centerTabs = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/products', label: 'Products', icon: <Package size={18} /> },
    { path: '/shops', label: 'Shops', icon: <Store size={18} /> },
    { path: '/features', label: 'Features', icon: <Sparkles size={18} /> },
    { path: '/admin', label: 'Admin', icon: <ShieldCheck size={18} /> },
  ];

  const aboutSubmenu = [
    { path: '/problem', label: 'The Gap', icon: <Utensils size={16} /> },
    { path: '/solution', label: 'Our Solution', icon: <Heart size={16} /> },
    { path: '/mission', label: 'Why Phygital', icon: <Target size={16} /> },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-orange-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900 tracking-tighter leading-none">
                  PHYGITAL
                </span>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Local Commerce</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center bg-gray-100/50 backdrop-blur-md px-2 py-1.5 rounded-[1.25rem] border border-white/20">
              {centerTabs.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm ${
                    isActive(item.path) 
                      ? 'bg-white text-orange-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-100/50 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-white/20 group">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-white transition-all"
                    >
                      <div className="w-9 h-9 rounded-lg bg-orange-500 overflow-hidden flex items-center justify-center text-white shadow-md group-hover:rotate-3 transition-transform">
                        {localStorage.getItem('userPic') ? (
                          <img src={localStorage.getItem('userPic')} alt="User" className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-black text-sm">{localStorage.getItem('userName')?.charAt(0) || 'U'}</span>
                        )}
                      </div>
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-xs font-black text-gray-900 tracking-tight">
                          {localStorage.getItem('userName') || 'My Account'}
                        </span>
                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-0.5">
                          {userType || 'User'}
                        </span>
                      </div>
                    </Link>
                    
                    <div className="w-[1px] h-6 bg-gray-200 mx-1" />
                    
                    <button
                      onClick={handleLogout}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Logout"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-gray-100/50 p-1 rounded-2xl border border-white/20">
                  <Link
                    to="/login"
                    className="px-6 py-2.5 text-gray-700 font-bold text-sm hover:bg-white/50 rounded-xl transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2.5 bg-orange-500 text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95"
                  >
                    Get Started
                  </Link>
                </div>
              )}
              
              <Link
                to="/cart"
                className="relative w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 text-gray-700 hover:text-orange-500 transition-all"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-900"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar (simplified for demo) */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[110] bg-white p-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-black italic">MENU</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-50 rounded-xl"><X /></button>
            </div>
            <div className="space-y-4">
              {centerTabs.map(item => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-2xl font-black text-gray-900 border-b border-gray-100 pb-4"
                >
                  {item.label}
                </Link>
              ))}
              {!isLoggedIn && (
                <div className="pt-10 space-y-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full py-4 text-center font-black bg-gray-50 rounded-2xl">LOGIN</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full py-4 text-center font-black bg-orange-500 text-white rounded-2xl">SIGN UP</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;